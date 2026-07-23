"use client";

import React from "react";

interface FieldInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "email" | "url" | "textarea";
  placeholder?: string;
  rows?: number;
}

export default function FieldInput({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder = "",
  rows = 3,
}: FieldInputProps) {
  const inputClasses = 
    "w-full px-4 py-2.5 rounded-xl border border-zinc-800 bg-zinc-900/40 text-zinc-100 placeholder-zinc-600 focus:border-blue-500/50 focus:bg-zinc-900/70 focus:outline-none transition-all duration-200 text-sm";

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label htmlFor={name} className="text-xs font-semibold text-zinc-400 font-mono">
        {label}
      </label>
      {type === "textarea" ? (
        <textarea
          id={name}
          name={name}
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
          className={inputClasses}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={inputClasses}
        />
      )}
    </div>
  );
}
