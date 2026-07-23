"use client";

import React from "react";
import { motion } from "framer-motion";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  className?: string;
  href?: string;
  download?: boolean | string;
}

export default function Button({
  variant = "primary",
  size = "md",
  children,
  className = "",
  href,
  download,
  ...props
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center font-semibold rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-offset-zinc-950 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer";
  
  const variants = {
    primary: "bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-md shadow-blue-500/25 hover:shadow-lg hover:shadow-blue-500/40 hover:brightness-105 border border-transparent",
    secondary: "bg-zinc-900/80 dark:bg-white/10 hover:bg-zinc-800 dark:hover:bg-white/15 border border-zinc-700/50 dark:border-white/10 text-white backdrop-blur-sm",
    outline: "border border-zinc-300 dark:border-zinc-800 bg-transparent hover:bg-zinc-50 dark:hover:bg-zinc-900/50 text-zinc-800 dark:text-zinc-200",
    ghost: "bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100"
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-2.5 text-base",
    lg: "px-8 py-3.5 text-lg"
  };

  const combinedClass = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    if (download) {
      return (
        <motion.a
          href={href}
          download={download}
          className={combinedClass}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          {children}
        </motion.a>
      );
    }
    return (
      <motion.a
        href={href}
        className={combinedClass}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      className={combinedClass}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      {...(props as any)}
    >
      {children}
    </motion.button>
  );
}
