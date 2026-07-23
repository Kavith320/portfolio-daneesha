"use client";

import React, { useState } from "react";
import { useAdmin } from "../AdminContext";
import { FiSave, FiRefreshCw, FiTrash2 } from "react-icons/fi";

export default function AdminHeader({ title }: { title: string }) {
  const { isDirty, saveChanges, resetChanges, clearAllOverrides } = useAdmin();
  const [showConfirmReset, setShowConfirmReset] = useState(false);

  const handleResetToDefault = () => {
    if (window.confirm("Are you sure you want to delete all edits and restore original developer data from code?")) {
      clearAllOverrides();
    }
  };

  return (
    <header className="h-16 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-20">
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-bold text-white font-mono">{title}</h1>
        {isDirty && (
          <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold font-mono animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            Unsaved Changes
          </span>
        )}
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={handleResetToDefault}
          title="Restore factory defaults"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-zinc-800 hover:border-red-500/20 text-xs font-semibold text-zinc-400 hover:text-red-400 hover:bg-red-500/5 transition-all cursor-pointer font-mono"
        >
          <FiTrash2 size={13} />
          Reset Factory Defaults
        </button>

        {isDirty && (
          <>
            <button
              onClick={resetChanges}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl border border-zinc-800 hover:bg-zinc-900 text-xs font-semibold text-zinc-300 transition-all cursor-pointer font-mono"
            >
              <FiRefreshCw size={13} />
              Discard
            </button>
            <button
              onClick={saveChanges}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white shadow-lg shadow-blue-600/15 hover:shadow-blue-500/20 transition-all cursor-pointer font-mono"
            >
              <FiSave size={13} />
              Save Changes
            </button>
          </>
        )}
      </div>
    </header>
  );
}
