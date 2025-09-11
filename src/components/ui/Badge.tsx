"use client";
import React from "react";

/**
 * Badge
 * Small colored label for status/category emphasis.
 */
type BadgeProps = {
  children: React.ReactNode;
  color?:
    | "red"
    | "orange"
    | "yellow"
    | "green"
    | "pink"
    | "cyan"
    | "blue"
    | "gray";
  className?: string;
};

const colorMap: Record<
  NonNullable<BadgeProps["color"]>,
  { bg: string; border: string; text: string }
> = {
  red: {
    bg: "bg-[rgba(220,38,38,0.4)]",
    border: "border-red-500",
    text: "text-black",
  },
  orange: {
    bg: "bg-[rgba(245,124,11,0.5)]",
    border: "border-[#ea7100]",
    text: "text-black",
  },
  yellow: {
    bg: "bg-[rgba(234,179,8,0.5)]",
    border: "border-[#ba8d00]",
    text: "text-black",
  },
  green: {
    bg: "bg-[rgba(16,185,129,0.5)]",
    border: "border-[#03a972]",
    text: "text-black",
  },
  pink: {
    bg: "bg-[rgba(236,72,153,0.5)]",
    border: "border-pink-500",
    text: "text-black",
  },
  cyan: {
    bg: "bg-[rgba(6,182,212,0.5)]",
    border: "border-[#00a2bd]",
    text: "text-black",
  },
  blue: { bg: "bg-blue-100", border: "border-blue-300", text: "text-blue-900" },
  gray: {
    bg: "bg-gray-100/40",
    border: "border-gray-200",
    text: "text-gray-800",
  },
};

export function Badge({
  children,
  color = "gray",
  className = "",
}: BadgeProps) {
  const c = colorMap[color];
  return (
    <span
      className={`inline-flex items-center rounded-[4px] border px-2.5 py-0.5 text-sm font-semibold ${c.bg} ${c.border} ${c.text} ${className}`}
    >
      {children}
    </span>
  );
}

export default Badge;
