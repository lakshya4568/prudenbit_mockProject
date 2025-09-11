"use client";
import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import PatientCard, { Patient } from "@/components/PatientCard";
import HeaderBanner from "@/components/HeaderBanner";
import PatientTable from "@/components/PatientTable";
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
  return "gray" as unknown as Patient["issueColor"]; // fallback, not used in type
}

const allPatientsFromJson: Patient[] = (rawData as RawPatient[]).map((rp) => {
  const c = rp.contact?.[0];
  const issue = capitalizeWords(rp.medical_issue);
  return {
    id: idFromNumber(rp.patient_id),
    name: rp.patient_name,
    age: rp.age,
    issue,
    issueColor: issueColorFor(issue),
    // Avoid using remote avatars to prevent domain config; leave undefined
    avatarSrc: undefined,
    address: c?.address ?? "N/A",
    phone: c?.number ?? null,
    email: c?.email ?? null,
  } satisfies Patient;
});

export default function Page() {
  const [view, setView] = useState<"card" | "table">("card");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(searchQuery.trim()), 250);
    return () => clearTimeout(t);
  }, [searchQuery]);

  const patients = useMemo(() => {
    if (!debouncedQuery) return allPatientsFromJson;
    const q = debouncedQuery.toLowerCase();
    return allPatientsFromJson.filter((p) => {
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
  }, [debouncedQuery]);
  return (
    <main className="min-h-screen bg-white">
      <HeaderBanner />

      <section className="mx-auto max-w-7xl px-6 py-6">
        {/* View tabs and Active Filters */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-8 text-gray-900">
            <button
              className={`pb-2 font-semibold border-b-2 transition-colors ${
                view === "table"
                  ? "text-[#191d23] border-blue-500"
                  : "text-gray-400 border-transparent"
              }`}
              onClick={() => setView("table")}
            >
              Table View
            </button>
            <button
              className={`pb-2 font-semibold border-b-2 transition-colors ${
                view === "card"
                  ? "text-[#191d23] border-blue-500"
                  : "text-gray-400 border-transparent"
              }`}
              onClick={() => setView("card")}
            >
              Card View
            </button>
          </div>
          <div className="flex items-center gap-3">
            <Image
              src="/images/filter.svg"
              alt="Filter"
              width={18}
              height={12}
              className="w-[18px] h-3 text-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">
              Active Filters: 4
            </span>
          </div>
        </div>

        {/* Search bar with Sort by section */}
        <div className="flex items-center gap-6 mb-4">
          <div className="flex-1 relative">
            <div className="flex items-center border border-[#8f8f8f] rounded px-4 py-3 bg-white">
              <div className="flex items-center gap-3 flex-1">
                <Image
                  src="/images/Icons.svg"
                  alt="Search"
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
                <input
                  placeholder="Search"
                  className="flex-1 bg-transparent outline-none text-blue-500 placeholder:text-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button className="flex items-center justify-center p-2 hover:bg-gray-50 rounded">
                <Image
                  src="/images/filter.svg"
                  alt="Filter"
                  width={18}
                  height={12}
                  className="w-[18px] h-3"
                />
              </button>
            </div>
          </div>

          {/* Sort by section */}
          <div className="flex items-center gap-3">
            <span className="text-blue-500 font-bold text-lg whitespace-nowrap">
              Sort by:
            </span>
            <button className="inline-flex items-center justify-between gap-3 rounded border border-gray-300 px-4 py-2.5 min-w-[140px] text-sm font-medium bg-white hover:bg-gray-50 transition-colors">
              <span className="text-gray-700">option 1</span>
              <Image
                src="/images/sorty.png"
                alt="Sort"
                width={16}
                height={16}
                className="w-4 h-4"
              />
            </button>
            <button className="inline-flex items-center justify-between gap-3 rounded border border-gray-300 px-4 py-2.5 min-w-[140px] text-sm font-medium bg-white hover:bg-gray-50 transition-colors">
              <span className="text-gray-700">option 1</span>
              <Image
                src="/images/sorty.png"
                alt="Sort"
                width={16}
                height={16}
                className="w-4 h-4"
              />
            </button>
          </div>
        </div>

        {/* Filter chips */}
        <div className="flex flex-wrap gap-3 mb-6">
          {["Option 1", "Option 2", "Option 3", "Option 4"].map((filter, i) => (
            <button
              key={i}
              className="inline-flex items-center gap-3 rounded border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              {filter}
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                className="text-gray-400 hover:text-gray-600"
              >
                <path
                  d="M10.5 3.5L3.5 10.5M3.5 3.5L10.5 10.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          ))}
        </div>

        {/* View content */}
        {patients.length === 0 ? (
          <div className="py-16 text-center text-gray-500">
            No results found.
          </div>
        ) : view === "card" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {patients.map((p) => (
              <PatientCard key={p.id} patient={p} />
            ))}
          </div>
        ) : (
          <PatientTable patients={patients} />
        )}
      </section>
    </main>
  );
}
