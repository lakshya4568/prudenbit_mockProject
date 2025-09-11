/**
 * API Route: GET /api/data
 *
 * Serves patient data with server-side filtering, sorting, and pagination.
 *
 * Query params:
 * - limit: number (1-100)
 * - page: number (1..)
 * - q: string (global text search across id, name, issue, address, email)
 * - issue: comma-separated list of issue names to include (case-insensitive)
 * - hasEmail: '1' | 'true' to require email
 * - hasPhone: '1' | 'true' to require phone
 * - ageMin, ageMax: numeric range bounds
 * - sortBy: 'id' | 'name' | 'age' | 'issue' | 'email'
 * - order: 'asc' | 'desc'
 */
import { NextResponse } from "next/server";
import rawData from "@/data/data.json";

/** Raw shape in data.json */
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

/** Normalized patient shape returned by the API */
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

/** Converts numeric id to UI-friendly id like ID-0001 */
function idFromNumber(n: number): string {
  return `ID-${String(n).padStart(4, "0")}`;
}

/** Capitalizes each word boundary for consistent labels */
function capitalizeWords(s: string): string {
  return s
    .split(" ")
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ");
}

/** Maps issue keywords to color categories used by the UI */
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

/** Normalize raw dataset once per module load for performance */
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

/** Bounds a number to [min, max] */
function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    // Parse and sanitize query parameters
    const limitParam = parseInt(searchParams.get("limit") || "12", 10);
    const pageParam = parseInt(searchParams.get("page") || "1", 10);
    const q = (searchParams.get("q") || "").trim().toLowerCase();
    const issuesParam = (searchParams.get("issue") || "").trim(); // comma-separated
    const hasEmailParam = searchParams.get("hasEmail");
    const hasPhoneParam = searchParams.get("hasPhone");
    const ageMinParam = searchParams.get("ageMin");
    const ageMaxParam = searchParams.get("ageMax");
    const sortBy = (searchParams.get("sortBy") || "").trim();
    const order = (
      (searchParams.get("order") || "asc").trim().toLowerCase() === "desc"
        ? "desc"
        : "asc"
    ) as "asc" | "desc";

    const limit = clamp(Number.isFinite(limitParam) ? limitParam : 12, 1, 100);
    const page = clamp(
      Number.isFinite(pageParam) ? pageParam : 1,
      1,
      1_000_000
    );

  let rows = allPatients;
  // Advanced Filters
    const issues = issuesParam
      ? issuesParam
          .split(",")
          .map((s) => s.trim().toLowerCase())
          .filter(Boolean)
      : [];
    const hasEmail = hasEmailParam === "1" || hasEmailParam === "true";
    const hasPhone = hasPhoneParam === "1" || hasPhoneParam === "true";
    const ageMin = ageMinParam ? parseInt(ageMinParam, 10) : undefined;
    const ageMax = ageMaxParam ? parseInt(ageMaxParam, 10) : undefined;

    if (issues.length > 0) {
      rows = rows.filter((p) => issues.includes(p.issue.toLowerCase()));
    }
    if (hasEmail) {
      rows = rows.filter((p) => !!p.email);
    }
    if (hasPhone) {
      rows = rows.filter((p) => !!p.phone);
    }
    if (Number.isFinite(ageMin)) {
      rows = rows.filter((p) => p.age >= (ageMin as number));
    }
    if (Number.isFinite(ageMax)) {
      rows = rows.filter((p) => p.age <= (ageMax as number));
    }
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

    // Sorting — applied before pagination for correctness
    if (sortBy) {
      const dir = order === "desc" ? -1 : 1;
      rows = [...rows].sort((a, b) => {
        let va: string | number = "";
        let vb: string | number = "";
        switch (sortBy) {
          case "id":
            va = a.id;
            vb = b.id;
            break;
          case "name":
            va = a.name;
            vb = b.name;
            break;
          case "age":
            va = a.age;
            vb = b.age;
            break;
          case "issue":
            va = a.issue;
            vb = b.issue;
            break;
          case "email":
            va = a.email ?? "";
            vb = b.email ?? "";
            break;
          default:
            return 0;
        }
        if (typeof va === "number" && typeof vb === "number") {
          return (va - vb) * dir;
        }
        return String(va).localeCompare(String(vb)) * dir;
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
    // Hide internal errors from the client
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
