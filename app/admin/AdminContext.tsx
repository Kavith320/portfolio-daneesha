"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { PortfolioData } from "../../types/portfolio";
import { defaultPortfolioData } from "../../lib/adminStorage";

interface AdminContextType {
  data: PortfolioData;
  updateData: (updater: (prev: PortfolioData) => PortfolioData) => void;
  isDirty: boolean;
  saveChanges: () => Promise<void>;
  resetChanges: () => void;
  clearAllOverrides: () => Promise<void>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [dbData, setDbData] = useState<PortfolioData | null>(null);
  const [data, setData] = useState<PortfolioData | null>(null);
  const [isDirty, setIsDirty] = useState(false);

  // Load initially
  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const res = await fetch("/api/portfolio");
        if (!res.ok) throw new Error("Failed to load portfolio data from database");
        const json = await res.json();
        if (json.error) throw new Error(json.error);
        if (active) {
          setDbData(json);
          setData(JSON.parse(JSON.stringify(json))); // Deep clone for local edits
        }
      } catch (err: any) {
        console.error("Failed to load portfolio data from MongoDB:", err);
      }
    };
    load();
    return () => {
      active = false;
    };
  }, []);

  // Check dirtiness
  useEffect(() => {
    if (!data || !dbData) {
      setIsDirty(false);
      return;
    }
    setIsDirty(JSON.stringify(data) !== JSON.stringify(dbData));
  }, [data, dbData]);

  const updateData = (updater: (prev: PortfolioData) => PortfolioData) => {
    setData((prev) => {
      if (!prev) return prev;
      return updater(prev);
    });
  };

  const saveChanges = async () => {
    if (!data) return;
    try {
      const res = await fetch("/api/portfolio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": "admin", // Matches the admin portal password
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(errJson.error || "Failed to save changes to database");
      }

      const updated = await res.json();
      setDbData(JSON.parse(JSON.stringify(updated)));
      setData(JSON.parse(JSON.stringify(updated)));
      setIsDirty(false);
      // Dispatch custom event to notify all components in the same window
      window.dispatchEvent(new CustomEvent("portfolio_update"));
    } catch (err: any) {
      alert("Error saving changes: " + err.message);
    }
  };

  const resetChanges = () => {
    if (!dbData) return;
    setData(JSON.parse(JSON.stringify(dbData)));
    setIsDirty(false);
  };

  const clearAllOverrides = async () => {
    try {
      const res = await fetch("/api/portfolio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": "admin",
        },
        body: JSON.stringify(defaultPortfolioData),
      });

      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(errJson.error || "Failed to reset defaults in database");
      }

      const updated = await res.json();
      setDbData(JSON.parse(JSON.stringify(updated)));
      setData(JSON.parse(JSON.stringify(updated)));
      setIsDirty(false);
      window.dispatchEvent(new CustomEvent("portfolio_update"));
    } catch (err: any) {
      alert("Error resetting database defaults: " + err.message);
    }
  };

  if (!data) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-zinc-400 font-mono text-sm">
        Loading Admin Workspace...
      </div>
    );
  }

  return (
    <AdminContext.Provider
      value={{
        data,
        updateData,
        isDirty,
        saveChanges,
        resetChanges,
        clearAllOverrides,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
}
