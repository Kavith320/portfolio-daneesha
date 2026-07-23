"use client";

import React, { useState } from "react";
import { useAdmin } from "../AdminContext";
import AdminHeader from "../components/AdminHeader";
import FieldInput from "../components/FieldInput";
import { FiPlus, FiEdit2, FiTrash2, FiBriefcase, FiX, FiCheck } from "react-icons/fi";
import { ExperienceItem } from "../../../types/portfolio";

const initialExperienceState: ExperienceItem = {
  company: "",
  role: "",
  duration: "",
  description: [],
};

export default function ExperienceEditor() {
  const { data, updateData } = useAdmin();
  const [editingIndex, setEditingIndex] = useState<number | null>(null); // null = closed, -1 = new, >=0 = edit
  const [formState, setFormState] = useState<ExperienceItem>(initialExperienceState);
  const [bulletInput, setBulletInput] = useState("");

  const handleOpenEdit = (index: number) => {
    const exp = data.experience[index];
    setFormState({ ...exp });
    setEditingIndex(index);
  };

  const handleOpenNew = () => {
    setFormState({ ...initialExperienceState });
    setEditingIndex(-1);
  };

  const handleClose = () => {
    setEditingIndex(null);
  };

  const handleSaveExperience = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.company.trim() || !formState.role.trim()) return;

    updateData((prev) => {
      const updated = [...prev.experience];
      if (editingIndex === -1) {
        updated.push(formState);
      } else if (editingIndex !== null && editingIndex >= 0) {
        updated[editingIndex] = formState;
      }
      return { ...prev, experience: updated };
    });

    handleClose();
  };

  const handleDeleteExperience = (index: number, company: string) => {
    if (!window.confirm(`Are you sure you want to delete the experience at "${company}"?`)) return;
    updateData((prev) => ({
      ...prev,
      experience: prev.experience.filter((_, idx) => idx !== index)
    }));
  };

  const handleAddBullet = () => {
    if (!bulletInput.trim()) return;
    setFormState(prev => ({
      ...prev,
      description: [...prev.description, bulletInput.trim()]
    }));
    setBulletInput("");
  };

  const handleRemoveBullet = (bullet: string) => {
    setFormState(prev => ({
      ...prev,
      description: prev.description.filter(d => d !== bullet)
    }));
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <AdminHeader title="Configure Experience Timeline" />

      <div className="p-8 max-w-5xl w-full mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">Work History</h2>
            <p className="text-sm text-zinc-500 mt-1 font-mono">// professional positions &amp; deliverables</p>
          </div>

          <button
            onClick={handleOpenNew}
            className="flex items-center gap-1.5 px-4.5 py-2.5 bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white rounded-xl shadow-lg shadow-blue-600/10 cursor-pointer font-mono"
          >
            <FiPlus size={13} />
            Add Experience
          </button>
        </div>

        {/* Experience Timeline Grid */}
        <div className="space-y-4">
          {data.experience.map((exp, index) => (
            <div 
              key={`${exp.company}-${index}`}
              className="bg-zinc-900/20 border border-zinc-800/80 rounded-2xl p-6 flex flex-col sm:flex-row justify-between items-start gap-4"
            >
              <div className="flex-1 flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 shrink-0">
                  <FiBriefcase size={16} />
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-sm font-bold text-white font-mono">{exp.role}</h3>
                  <div className="flex items-center gap-2 text-xs font-semibold text-zinc-400 font-mono">
                    <span className="text-blue-400">{exp.company}</span>
                    <span>•</span>
                    <span>{exp.duration}</span>
                  </div>
                  <ul className="list-disc pl-4 space-y-1 mt-3">
                    {exp.description.map((bullet, i) => (
                      <li key={i} className="text-xs text-zinc-400 leading-relaxed font-sans">{bullet}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-start">
                <button
                  onClick={() => handleOpenEdit(index)}
                  className="p-1.5 rounded-lg border border-transparent hover:border-zinc-700 text-zinc-500 hover:text-white hover:bg-zinc-800/50 transition-all cursor-pointer"
                  title="Edit entry"
                >
                  <FiEdit2 size={13} />
                </button>
                <button
                  onClick={() => handleDeleteExperience(index, exp.company)}
                  className="p-1.5 rounded-lg border border-transparent hover:border-red-500/10 text-zinc-500 hover:text-red-400 hover:bg-red-500/5 transition-all cursor-pointer"
                  title="Delete entry"
                >
                  <FiTrash2 size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Editor Modal */}
      {editingIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-sm">
          <div className="w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-2xl flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800 mb-6 shrink-0">
              <h3 className="text-sm font-bold text-white tracking-tight font-mono">
                {editingIndex === -1 ? "New Experience Entry" : `Edit Entry // ${formState.company}`}
              </h3>
              <button 
                onClick={handleClose}
                className="p-1 rounded-lg border border-transparent hover:border-zinc-800 text-zinc-500 hover:text-white hover:bg-zinc-800 transition-all cursor-pointer"
              >
                <FiX size={15} />
              </button>
            </div>

            <form onSubmit={handleSaveExperience} className="flex-1 overflow-y-auto space-y-5 pr-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FieldInput
                  label="Company Name"
                  name="company"
                  value={formState.company}
                  onChange={(val) => setFormState(prev => ({ ...prev, company: val }))}
                  placeholder="e.g. ByteWave Technologies"
                />
                <FieldInput
                  label="Role / Title"
                  name="role"
                  value={formState.role}
                  onChange={(val) => setFormState(prev => ({ ...prev, role: val }))}
                  placeholder="e.g. Full Stack Intern"
                />
              </div>

              <FieldInput
                label="Duration / Timeline"
                name="duration"
                value={formState.duration}
                onChange={(val) => setFormState(prev => ({ ...prev, duration: val }))}
                placeholder="e.g. June 2025 - Present"
              />

              {/* Description Bullets Editor */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-zinc-400 font-mono">Deliverables / Bullet Points</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={bulletInput}
                    onChange={(e) => setBulletInput(e.target.value)}
                    placeholder="e.g. Refactored state management to Redux, decreasing codebase size by 15%."
                    className="flex-1 px-3 py-1.5 rounded-lg border border-zinc-800 bg-zinc-950 text-zinc-200 text-xs focus:outline-none"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddBullet();
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={handleAddBullet}
                    className="px-4 py-1.5 bg-zinc-800 border border-zinc-700 text-xs font-bold text-white rounded-lg cursor-pointer font-mono"
                  >
                    Add
                  </button>
                </div>
                <div className="space-y-1.5 mt-2">
                  {formState.description.length === 0 ? (
                    <span className="text-[10px] text-zinc-600 font-mono italic">No bullet points configured</span>
                  ) : (
                    formState.description.map((bullet, idx) => (
                      <div 
                        key={`${bullet}-${idx}`}
                        className="flex items-start justify-between p-2 rounded-lg bg-zinc-950 border border-zinc-850 text-[11px] text-zinc-300 gap-4"
                      >
                        <span className="font-sans leading-relaxed">{bullet}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveBullet(bullet)}
                          className="text-zinc-500 hover:text-red-400 p-1 cursor-pointer transition-all shrink-0 mt-0.5"
                        >
                          <FiX size={12} />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Submit Controls */}
              <div className="pt-4 border-t border-zinc-800 flex justify-end gap-3 shrink-0">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2 border border-zinc-800 hover:bg-zinc-850 text-xs font-bold rounded-xl cursor-pointer font-mono"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-4.5 py-2 bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white rounded-xl shadow-lg shadow-blue-600/10 cursor-pointer font-mono"
                >
                  <FiCheck size={13} />
                  Keep Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
