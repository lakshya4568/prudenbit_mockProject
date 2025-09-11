"use client";
import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import PatientCard, { Patient } from "@/components/PatientCard";
import HeaderBanner from "@/components/HeaderBanner";
import PatientTable from "@/components/PatientTable";

type ApiPatient = Omit<Patient, "issueColor"> & {
  issueColor: Patient["issueColor"] | "gray";
};
type ApiResponse = {
  data: ApiPatient[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export default function Page() {
  const [view, setView] = useState<"card" | "table">("card");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [patients, setPatients] = useState<Patient[]>([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(12);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const ISSUE_OPTIONS = useMemo(
    () => [
      "Fever",
      "Headache",
      "Sore Throat",
      "Sprained Ankle",
      "Rash",
      "Ear Infection",
      "Allergic Reaction",
      "Stomach Ache",
      "Sinusitis",
      "Broken Arm",
    ],
    []
  );
  type SortField = "" | "name" | "age" | "issue" | "email" | "id";
  const [selectedIssues, setSelectedIssues] = useState<string[]>([]);
  const [hasEmail, setHasEmail] = useState(false);
  const [hasPhone, setHasPhone] = useState(false);
  const [sortBy, setSortBy] = useState<SortField>("");
  const [order, setOrder] = useState<"asc" | "desc">("asc");

  const activeFilters =
    selectedIssues.length + (hasEmail ? 1 : 0) + (hasPhone ? 1 : 0);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(searchQuery.trim()), 250);
    return () => clearTimeout(t);
  }, [searchQuery]);

  useEffect(() => {
    setPage(1);
  }, [debouncedQuery, selectedIssues, hasEmail, hasPhone, sortBy, order]);

  useEffect(() => {
    let abort = false;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams({
          page: String(page),
          limit: String(limit),
        });
        if (debouncedQuery) params.set("q", debouncedQuery);
        if (selectedIssues.length)
          params.set("issue", selectedIssues.join(","));
        if (hasEmail) params.set("hasEmail", "1");
        if (hasPhone) params.set("hasPhone", "1");
        if (sortBy) params.set("sortBy", sortBy);
        if (order) params.set("order", order);
        const res = await fetch(`/api/data?${params.toString()}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json: ApiResponse = await res.json();
        if (abort) return;
        const mapped: Patient[] = json.data.map((p) => ({
          ...p,
          issueColor: (p.issueColor === "gray"
            ? "cyan"
            : p.issueColor) as Patient["issueColor"],
        }));
        setPatients(mapped);
        setTotalPages(json.totalPages || 1);
      } catch (e: any) {
        if (!abort) setError(e?.message ?? "Failed to load data");
      } finally {
        if (!abort) setLoading(false);
      }
    }
    load();
    return () => {
      abort = true;
    };
  }, [
    page,
    limit,
    debouncedQuery,
    selectedIssues,
    hasEmail,
    hasPhone,
    sortBy,
    order,
  ]);

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
              className="w-[18px] h-3"
            />
            <span className="text-sm font-medium text-gray-700">
              Active Filters: {activeFilters}
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
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortField)}
              className="rounded border border-gray-300 px-4 py-2.5 min-w-[160px] text-sm font-medium bg-white hover:bg-gray-50 transition-colors text-gray-700"
            >
              <option value="">None</option>
              <option value="name">Name</option>
              <option value="age">Age</option>
              <option value="issue">Issue</option>
              <option value="email">Email</option>
              <option value="id">ID</option>
            </select>
            <button
              onClick={() => setOrder((o) => (o === "asc" ? "desc" : "asc"))}
              className="inline-flex items-center justify-between gap-3 rounded border border-gray-300 px-4 py-2.5 min-w-[120px] text-sm font-medium bg-white hover:bg-gray-50 transition-colors"
              aria-label="Toggle sort order"
            >
              <span className="text-gray-700 capitalize">{order}</span>
              <Image
                src="/images/sorty.png"
                alt="Sort"
                width={16}
                height={16}
                className={`w-4 h-4 ${order === "desc" ? "rotate-180" : ""}`}
              />
            </button>
          </div>
        </div>

        {/* Filter chips */}
        <div className="flex flex-wrap gap-3 mb-6">
          {[
            {
              label: "Has Email",
              active: hasEmail,
              toggle: () => setHasEmail((v) => !v),
            },
            {
              label: "Has Phone",
              active: hasPhone,
              toggle: () => setHasPhone((v) => !v),
            },
          ].map((chip) => (
            <button
              key={chip.label}
              onClick={chip.toggle}
              className={`inline-flex items-center gap-3 rounded border px-4 py-2.5 text-sm font-medium transition-colors ${
                chip.active
                  ? "border-blue-500 bg-blue-50 text-blue-700"
                  : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              {chip.label}
              {chip.active && (
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  className="text-blue-600"
                >
                  <path
                    d="M10.5 3.5L3.5 10.5M3.5 3.5L10.5 10.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              )}
            </button>
          ))}

          {ISSUE_OPTIONS.map((issue) => {
            const active = selectedIssues.includes(issue);
            return (
              <button
                key={issue}
                onClick={() =>
                  setSelectedIssues((prev) =>
                    prev.includes(issue)
                      ? prev.filter((i) => i !== issue)
                      : [...prev, issue]
                  )
                }
                className={`inline-flex items-center gap-3 rounded border px-4 py-2.5 text-sm font-medium transition-colors ${
                  active
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                {issue}
                {active && (
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    className="text-blue-600"
                  >
                    <path
                      d="M10.5 3.5L3.5 10.5M3.5 3.5L10.5 10.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                )}
              </button>
            );
          })}
        </div>

        {loading ? (
          <div className="py-16 text-center text-gray-500">Loading…</div>
        ) : error ? (
          <div className="py-16 text-center text-red-600">{error}</div>
        ) : patients.length === 0 ? (
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

        <div className="mt-6 flex items-center justify-between">
          <span className="text-sm text-gray-600">
            Page {page} of {totalPages}
          </span>
          <div className="flex gap-3">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1 || loading}
              className={`inline-flex items-center rounded border px-3 py-2 text-sm text-black ${
                page <= 1 || loading
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-50"
              }`}
            >
              Previous
            </button>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages || loading}
              className={`inline-flex items-center rounded border px-3 py-2 text-sm text-black ${
                page >= totalPages || loading
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-50"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
