"use client";
import Image from "next/image";
import React from "react";
import Badge from "./ui/Badge";
import type { Patient } from "./PatientCard";

type Props = {
  patients: Patient[];
  className?: string;
};

export default function PatientTable({ patients, className = "" }: Props) {
  return (
    <div
      className={`w-full overflow-x-auto bg-white rounded-lg shadow-sm ${className}`}
    >
      <table className="w-full border-separate border-spacing-0">
        <thead>
          <tr className="bg-transparent">
            <Th>ID</Th>
            <Th>Name</Th>
            <Th>Age</Th>
            <Th>Medical Issue</Th>
            <Th>Address</Th>
            <Th>Phone Number</Th>
            <Th>Email ID</Th>
          </tr>
        </thead>
        <tbody>
          {patients.map((p) => (
            <tr key={p.id} className="border-b border-gray-200 last:border-0">
              <Td className="w-[90px] text-center">{p.id}</Td>
              <Td>
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative size-10 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                    {p.avatarSrc ? (
                      <Image
                        src={p.avatarSrc}
                        alt=""
                        width={40}
                        height={40}
                        className="size-10 object-cover"
                      />
                    ) : null}
                  </div>
                  <span className="truncate font-medium text-gray-900">
                    {p.name}
                  </span>
                </div>
              </Td>
              <Td className="w-[90px] text-center">{p.age}</Td>
              <Td>
                <Badge color={p.issueColor}>{p.issue}</Badge>
              </Td>
              <Td className="min-w-[220px]">{naOrValue(p.address)}</Td>
              <Td className="min-w-[160px]">{naOrValue(p.phone)}</Td>
              <Td className="min-w-[240px]">{naOrValue(p.email)}</Td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="text-left py-4 px-4 text-sm font-extrabold text-blue-500 border-b border-gray-200">
      {children}
    </th>
  );
}

function Td({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <td className={`py-4 px-4 text-[16px] text-gray-900 ${className}`}>
      {children}
    </td>
  );
}

function naOrValue(value: string | null): React.ReactNode {
  if (!value) return <span className="text-red-600">N/A</span>;
  return value;
}
