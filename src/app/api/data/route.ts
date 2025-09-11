import { NextResponse } from "next/server";
import rawData from "@/data/data.json";

type RawPatient = {
  patient_id: number;
  patient_name: string;
  age: number;
  photo_url: string | null;
  contact: Array<{
    address: string | null;
    number: string | null;
    email: string | null;
  }>;
  medical_issue: string;
};

type Patient = {
  id: string;
  name: string;
  age: number;
  issue: string;
  issueColor: "red" | "orange" | "yellow" | "green" | "pink" | "cyan" | "gray";
  avatarSrc?: string;
  address: string;
  phone: string | null;
  email: string | null;
};

function idFromNumber(n: number): string {
  return `ID-${String(n).padStart(4, "0")}`;
}

function capitalizeWords(s: string): string {
  return s
    .split(" ")
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ");
}

function issueColorFor(issue: string): Patient["issueColor"] {
  const key = issue.toLowerCase();
  if (key.includes("fever")) return "red";
  if (key.includes("headache")) return "orange";
  if (key.includes("sore")) return "yellow";
  if (key.includes("sprained") || key.includes("ankle")) return "green";
  if (key.includes("ear")) return "cyan";
  if (key.includes("rash")) return "pink";
  if (key.includes("allergic")) return "orange";
  if (key.includes("stomach")) return "yellow";
  if (key.includes("sinus")) return "cyan";
  if (key.includes("broken")) return "red";
  return "gray";
}

const allPatients: Patient[] = (rawData as RawPatient[]).map((rp) => {
  const c = rp.contact?.[0];
  const issue = capitalizeWords(rp.medical_issue);
  return {
    id: idFromNumber(rp.patient_id),
    name: rp.patient_name,
    age: rp.age,
    issue,
    issueColor: issueColorFor(issue),
    avatarSrc: undefined,
    address: c?.address ?? "N/A",
    phone: c?.number ?? null,
    email: c?.email ?? null,
  } satisfies Patient;
});

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limitParam = parseInt(searchParams.get("limit") || "12", 10);
    const pageParam = parseInt(searchParams.get("page") || "1", 10);
    const q = (searchParams.get("q") || "").trim().toLowerCase();

    const limit = clamp(Number.isFinite(limitParam) ? limitParam : 12, 1, 100);
    const page = clamp(
      Number.isFinite(pageParam) ? pageParam : 1,
      1,
      1_000_000
    );

    let rows = allPatients;
    if (q) {
      rows = rows.filter((p) => {
        const id = p.id.toLowerCase();
        const name = p.name.toLowerCase();
        const issue = p.issue.toLowerCase();
        const address = (p.address ?? "").toLowerCase();
        const email = (p.email ?? "").toLowerCase();
        return (
          id.includes(q) ||
          name.includes(q) ||
          issue.includes(q) ||
          address.includes(q) ||
          email.includes(q)
        );
      });
    }

    const total = rows.length;
    const totalPages = Math.max(1, Math.ceil(total / limit));
    const safePage = Math.min(page, totalPages);
    const start = (safePage - 1) * limit;
    const data = rows.slice(start, start + limit);

    return NextResponse.json({
      data,
      total,
      page: safePage,
      limit,
      totalPages,
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
