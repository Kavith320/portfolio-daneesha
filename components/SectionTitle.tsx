import React from "react";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  description?: string;
  center?: boolean;
}

export default function SectionTitle({
  title,
  subtitle,
  description,
  center = false,
}: SectionTitleProps) {
  return (
    <div className={`mb-14 ${center ? "mx-auto text-center" : "text-left"}`}>
      {subtitle && (
        <span className="text-xs font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-violet-500 uppercase mb-3 block font-mono">
          {subtitle}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-955 dark:text-white">
        {title}
      </h2>
      {description && (
        <p className={`mt-4 text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl ${center ? "mx-auto" : ""}`}>
          {description}
        </p>
      )}
    </div>
  );
}
