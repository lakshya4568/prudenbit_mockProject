"use client";
import React from "react";
import Image from "next/image";
import PatientCard, { Patient } from "@/components/PatientCard";
import HeaderBanner from "@/components/HeaderBanner";

const patients: Patient[] = [
  {
    id: "ID-0001",
    name: "Zoe Normanvill",
    age: 77,
    issue: "Fever",
    issueColor: "red",
    avatarSrc: "/images/Ellipse 1.png",
    address: "5 Moulton Hill",
    phone: "157-677-1133",
    email: "smcneice0@geocities.com",
  },
  {
    id: "ID-0002",
    name: "Kellie Stagg",
    age: 51,
    issue: "Headache",
    issueColor: "orange",
    avatarSrc: "/images/Ellipse 7.svg",
    address: "30112 Esker Center",
    phone: "422-869-2249",
    email: "Ideruagiero0@vk.com",
  },
  {
    id: "ID-0003",
    name: "Bertina Cottem",
    age: 92,
    issue: "Sore throat",
    issueColor: "yellow",
    avatarSrc: "/images/Ellipse 6.svg",
    address: "83316 Buena Vista Alley",
    phone: "359-159-3797",
    email: "bmelonbv0@seattletimes.com",
  },
  {
    id: "ID-0004",
    name: "Dianemarie Goodge",
    age: 75,
    issue: "Sprained ankle",
    issueColor: "green",
    avatarSrc: "/images/Ellipse 8.svg",
    address: "57 Northnort Pass",
    phone: "672-425-6691",
    email: "mhargreave0@ucoz.ru",
  },
];

export default function Page() {
  return (
    <main className="min-h-screen bg-white">
      <HeaderBanner />

      <section className="mx-auto max-w-7xl px-6 py-6">
        {/* View tabs and controls */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex flex-col">
            <div className="flex gap-8 text-gray-900">
              <button className="pb-2 font-semibold text-gray-900">
                Table View
              </button>
              <button className="pb-2 font-semibold text-gray-400">
                Card View
              </button>
            </div>
            <div className="h-[2px] w-20 bg-blue-500" />
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center justify-center w-11 h-11 rounded border border-gray-300 bg-white hover:bg-gray-50">
              <Image
                src="/images/filter.svg"
                alt="Filter"
                width={18}
                height={12}
                className="w-[18px] h-3"
              />
            </button>
            <span className="text-sm font-medium text-gray-700">
              Active Filters: 4
            </span>
          </div>
        </div>

        {/* Sort by section */}
        <div className="flex items-center justify-end gap-3 mb-6">
          <span className="text-blue-500 font-bold text-lg">Sort by:</span>
          <button className="inline-flex items-center justify-between gap-3 rounded border border-gray-300 px-4 py-2.5 min-w-[140px] text-sm font-medium bg-white hover:bg-gray-50 transition-colors">
            <span className="text-gray-700">option 1</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="text-gray-500"
            >
              <path d="M8 3L11 6H5L8 3Z" fill="currentColor" />
              <path d="M8 13L5 10H11L8 13Z" fill="currentColor" />
            </svg>
          </button>
          <button className="inline-flex items-center justify-between gap-3 rounded border border-gray-300 px-4 py-2.5 min-w-[140px] text-sm font-medium bg-white hover:bg-gray-50 transition-colors">
            <span className="text-gray-700">option 1</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="text-gray-500"
            >
              <path d="M8 3L11 6H5L8 3Z" fill="currentColor" />
              <path d="M8 13L5 10H11L8 13Z" fill="currentColor" />
            </svg>
          </button>
        </div>

        {/* Search + filter icon */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex-1 relative rounded border border-gray-300 px-4 py-3 bg-white">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              🔍
            </span>
            <input
              placeholder="Search"
              className="w-full pl-7 bg-transparent outline-none text-gray-700 placeholder:text-gray-400"
            />
          </div>
          <button className="flex items-center justify-center w-12 h-12 rounded border border-gray-300 bg-white hover:bg-gray-50">
            <Image
              src="/images/filter.svg"
              alt="Filter"
              width={18}
              height={12}
              className="w-[18px] h-3"
            />
          </button>
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

        {/* Card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {patients.map((p) => (
            <PatientCard key={p.id} patient={p} />
          ))}
        </div>
      </section>
    </main>
  );
}
