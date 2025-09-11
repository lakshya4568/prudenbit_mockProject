"use client";
import React from "react";
import PatientCard, { Patient } from "@/components/PatientCard";

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
			{/* Header banner */}
			<section className="relative bg-blue-500 text-white">
				<div className="mx-auto max-w-7xl px-6 py-6">
					<h1 className="text-3xl md:text-4xl font-bold">Patient Directory</h1>
					<p className="text-lg">1000 Patient Found</p>
				</div>
				{/* decorative background shapes intentionally omitted for brevity */}
			</section>

			<section className="mx-auto max-w-7xl px-6 py-6 space-y-4">
				{/* View tabs */}
				<div className="flex items-end justify-between">
					<div>
						<div className="flex gap-6 text-gray-900">
							<button className="px-2 py-2">Table View</button>
							<button className="px-2 py-2">Card View</button>
						</div>
						<div className="h-0.5 w-28 bg-blue-500 mt-1" />
					</div>
					<div className="flex flex-col items-end gap-2">
						<div className="flex items-center gap-2 text-gray-900">
							<button className="p-2 rounded-md border border-gray-300">⚙️</button>
							<span>Active Filters: 4</span>
						</div>
						<div className="flex items-center gap-2">
							<span className="text-blue-500 font-extrabold text-lg">Sort by:</span>
							<button className="inline-flex items-center gap-2 rounded border border-gray-300 px-4 py-2">option 1 <span>⇅</span></button>
							<button className="inline-flex items-center gap-2 rounded border border-gray-300 px-4 py-2">option 1 <span>⇅</span></button>
						</div>
					</div>
				</div>

				{/* Search + filter icon */}
				<div className="flex items-center gap-4">
					<div className="flex-1 relative rounded border border-gray-300 px-4 py-3">
						<span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
						<input placeholder="Search" className="w-full pl-7 bg-transparent outline-none text-blue-500" />
					</div>
					<button className="p-4 rounded border border-gray-300">⚙️</button>
				</div>

				{/* Filter chips */}
				<div className="flex flex-wrap gap-3">
					{Array.from({ length: 4 }, (_, i) => (
						<button key={i} className="inline-flex items-center gap-2 rounded border border-gray-300 px-6 py-2 text-sm">
							Option {i + 1}
							<span aria-hidden>✕</span>
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

