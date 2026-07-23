"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { PortfolioData } from "../types/portfolio";
import { FiWifiOff } from "react-icons/fi";

interface PortfolioContextType {
  data: PortfolioData;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/api/portfolio");
      if (!res.ok) throw new Error("Failed to connect to database");
      const json = await res.json();
      setData(json);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Could not retrieve portfolio data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    // Listen for custom portfolio update events (dispatched on admin save in same tab)
    const handlePortfolioUpdate = () => {
      fetchData();
    };

    window.addEventListener("portfolio_update", handlePortfolioUpdate);
    return () => {
      window.removeEventListener("portfolio_update", handlePortfolioUpdate);
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#09090B] text-zinc-100 flex flex-col items-center justify-center font-sans relative overflow-hidden">
        {/* Abstract Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-violet-500/5 rounded-full blur-3xl" />

        <div className="relative z-10 flex flex-col items-center text-center px-6">
          {/* Glowing Animated Loading Spindle */}
          <div className="relative mb-6">
            <div className="w-16 h-16 rounded-full border-t-2 border-r-2 border-blue-500 animate-spin" />
            <div className="absolute inset-0 w-16 h-16 rounded-full border-b-2 border-l-2 border-violet-500 animate-spin opacity-50 [animation-direction:reverse] [animation-duration:1.5s]" />
          </div>
          
          <h2 className="text-xl font-bold tracking-tight text-white mb-2 font-sans">
            Daneesha Disanayake
          </h2>
          <p className="text-xs font-mono text-zinc-500">
            // loading dynamic database profile...
          </p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-[#09090B] text-zinc-100 flex flex-col items-center justify-center font-sans relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-500/5 rounded-full blur-3xl" />

        <div className="relative z-10 flex flex-col items-center text-center max-w-md px-6">
          <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 shadow-lg shadow-red-500/5 mb-6">
            <FiWifiOff size={24} />
          </div>
          
          <h2 className="text-xl font-bold tracking-tight text-white mb-2">
            Database Connection Error
          </h2>
          <p className="text-sm text-zinc-400 mb-6 leading-relaxed">
            The application was unable to fetch the portfolio content from the database. Please ensure your MongoDB cluster is online and environment credentials are configured.
          </p>
          <button
            onClick={fetchData}
            className="flex items-center gap-2 px-5 py-2.5 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-xs font-bold text-white rounded-xl shadow-lg transition-all cursor-pointer font-mono"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  return (
    <PortfolioContext.Provider value={{ data }}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
}
