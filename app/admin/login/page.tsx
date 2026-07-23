"use client";

import React, { useState } from "react";
import { FiLock, FiAlertCircle } from "react-icons/fi";
import { motion } from "framer-motion";

interface LoginPageProps {
  onLoginSuccess?: () => void;
}

export default function LoginPage({ onLoginSuccess }: LoginPageProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simulate small latency for nice UI feeling
    setTimeout(() => {
      // The default admin password is 'admin' (users can modify this)
      if (password === "admin") {
        sessionStorage.setItem("admin_auth", "true");
        if (onLoginSuccess) {
          onLoginSuccess();
        } else {
          window.location.reload();
        }
      } else {
        setError("Invalid credentials. Please try again.");
        setIsLoading(false);
      }
    }, 400);
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Dynamic ambient backgrounds */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-violet-500/10 rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 15, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md bg-zinc-900/60 border border-zinc-800/80 rounded-3xl p-8 shadow-2xl backdrop-blur-md relative z-10"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-violet-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20 mb-4">
            <FiLock size={20} />
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">System Portal</h2>
          <p className="text-xs text-zinc-500 mt-1 font-mono">portfolio admin interface</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-zinc-400 font-mono" htmlFor="password">
              Admin Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter system password"
              autoFocus
              className="w-full px-4 py-3 rounded-xl border border-zinc-800 bg-zinc-950 text-zinc-100 placeholder-zinc-700 focus:border-blue-500/50 focus:outline-none transition-all duration-200 text-sm"
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 text-xs font-semibold text-red-400 bg-red-500/5 border border-red-500/10 rounded-xl p-3 font-mono">
              <FiAlertCircle size={14} className="shrink-0" />
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:bg-zinc-800 disabled:text-zinc-600 text-sm font-bold text-white shadow-lg shadow-blue-600/15 hover:shadow-blue-500/20 transition-all duration-200 flex items-center justify-center cursor-pointer font-mono"
          >
            {isLoading ? "Unlocking Portal..." : "Authorize"}
          </button>
        </form>

        <div className="mt-8 text-center text-[10px] text-zinc-600 font-mono">
          Hint: Use <code className="text-zinc-500 bg-zinc-950 px-1.5 py-0.5 rounded border border-zinc-900">admin</code> to log in.
        </div>
      </motion.div>
    </div>
  );
}
