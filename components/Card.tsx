"use client";

import React from "react";
import { motion } from "framer-motion";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  onClick?: () => void;
}

export default function Card({ children, className = "", hoverEffect = true, onClick }: CardProps) {
  return (
    <motion.div
      onClick={onClick}
      className={`relative overflow-hidden rounded-2xl bg-zinc-50/50 dark:bg-zinc-900/30 border border-zinc-200/80 dark:border-zinc-800/60 backdrop-blur-md p-6 ${
        onClick ? "cursor-pointer" : ""
      } ${className}`}
      whileHover={
        hoverEffect
          ? {
              y: -5,
              borderColor: "rgba(59, 130, 246, 0.3)",
              boxShadow: "0 10px 30px -15px rgba(59, 130, 246, 0.15)",
            }
          : undefined
      }
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Dynamic top gradient line for premium visual feel */}
      {hoverEffect && (
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      )}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
