"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSun, FiMoon } from "react-icons/fi";
import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative flex items-center justify-center w-10 h-10 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-zinc-100 transition-colors duration-200 cursor-pointer overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-offset-zinc-950"
      aria-label="Toggle theme"
    >
      <AnimatePresence mode="wait" initial={false}>
        {theme === "dark" ? (
          <motion.div
            key="sun"
            initial={{ y: 15, opacity: 0, rotate: 45 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: -15, opacity: 0, rotate: -45 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <FiSun size={18} />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ y: 15, opacity: 0, rotate: 45 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: -15, opacity: 0, rotate: -45 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <FiMoon size={18} />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}
