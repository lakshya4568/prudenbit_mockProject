"use client";
import Image from "next/image";
import React from "react";
import Badge from "./ui/Badge";

export type Patient = {
  id: string;
  name: string;
  age: number;
  issue: string;
  issueColor: "red" | "orange" | "yellow" | "green" | "pink" | "cyan";
  avatarSrc?: string;
  address: string;
  phone: string | null;
  email: string | null;
};

export function PatientCard({ patient }: { patient: Patient }) {
  const { id, name, age, issue, issueColor, avatarSrc, address, phone, email } = patient;
  return (
    <div className="rounded-xl shadow-sm bg-white ring-1 ring-gray-100/80 overflow-hidden">
      <div className="flex items-center justify-between bg-blue-500/20 px-4 py-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="size-10 rounded-full overflow-hidden bg-white/60 ring-2 ring-white">
            {avatarSrc ? (
              <Image src={avatarSrc} alt="" width={40} height={40} className="size-10 object-cover" />
            ) : (
              <div className="size-10" />
            )}
          </div>
          <div className="min-w-0">
            <div className="text-gray-200/90 text-sm">{id}</div>
            <div className="text-gray-900 font-semibold truncate text-base">{name}</div>
          </div>
        </div>
        <Badge color="blue" className="text-xs font-semibold bg-blue-500 text-white border-blue-500">Age:{age}</Badge>
      </div>
      <div className="px-5 py-4 space-y-3">
        <Badge color={issueColor}>{issue}</Badge>
        <div className="space-y-2 text-gray-800 text-sm">
          <div>
            <span className="text-gray-500 mr-2">Address:</span>
            <span>{address}</span>
          </div>
          <div>
            <span className="text-gray-500 mr-2">Phone:</span>
            <span>{phone ?? <span className="text-red-600">N/A</span>}</span>
          </div>
          <div>
            <span className="text-gray-500 mr-2">Email:</span>
            <span>{email ?? <span className="text-red-600">N/A</span>}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientCard;
