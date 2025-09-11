"use client";
import React from "react";

type ChipProps = {
  children: React.ReactNode;
  onRemove?: () => void;
  className?: string;
};

export default function Chip({ children, onRemove, className = "" }: ChipProps) {
  return (
    <span className={`inline-flex items-center gap-2 rounded border border-gray-300 px-4 py-2 text-sm bg-white ${className}`}>
      {children}
      {onRemove && (
        <button type="button" onClick={onRemove} aria-label="Remove" className="text-gray-500 hover:text-gray-700">
          ✕
        </button>
      )}
    </span>
  );
}
