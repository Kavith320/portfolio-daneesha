"use client";

import React, { useState } from "react";
import { useAdmin } from "../AdminContext";
import AdminHeader from "../components/AdminHeader";
import { FiPlus, FiTrash2, FiTag } from "react-icons/fi";

export default function SkillsEditor() {
  const { data, updateData } = useAdmin();
  const [newCatName, setNewCatName] = useState("");
  
  // Track inputs for adding skills to specific categories
  const [newSkillInputs, setNewSkillInputs] = useState<Record<string, { name: string; level: "Advanced" | "Intermediate" | "Beginner" }>>({});

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) return;

    // Check if category already exists
    if (data.skills.some(c => c.category.toLowerCase() === newCatName.trim().toLowerCase())) {
      alert("Category already exists!");
      return;
    }

    updateData((prev) => ({
      ...prev,
      skills: [...prev.skills, { category: newCatName.trim(), items: [] }]
    }));
    setNewCatName("");
  };

  const handleRemoveCategory = (catName: string) => {
    if (!window.confirm(`Are you sure you want to remove the category "${catName}" and all its skills?`)) return;
    updateData((prev) => ({
      ...prev,
      skills: prev.skills.filter((c) => c.category !== catName)
    }));
  };

  const handleAddSkill = (catName: string) => {
    const input = newSkillInputs[catName];
    if (!input || !input.name.trim()) return;

    updateData((prev) => ({
      ...prev,
      skills: prev.skills.map((c) => {
        if (c.category !== catName) return c;
        // Check if skill already exists in this category
        if (c.items.some(item => item.name.toLowerCase() === input.name.trim().toLowerCase())) {
          alert("Skill already exists in this category!");
          return c;
        }
        return {
          ...c,
          items: [...c.items, { name: input.name.trim(), level: input.level }]
        };
      })
    }));

    // Reset input for this category
    setNewSkillInputs(prev => ({
      ...prev,
      [catName]: { name: "", level: "Advanced" }
    }));
  };

  const handleRemoveSkill = (catName: string, skillName: string) => {
    updateData((prev) => ({
      ...prev,
      skills: prev.skills.map((c) => {
        if (c.category !== catName) return c;
        return {
          ...c,
          items: c.items.filter((item) => item.name !== skillName)
        };
      })
    }));
  };

  const handleSkillLevelChange = (catName: string, skillName: string, newLevel: "Advanced" | "Intermediate" | "Beginner") => {
    updateData((prev) => ({
      ...prev,
      skills: prev.skills.map((c) => {
        if (c.category !== catName) return c;
        return {
          ...c,
          items: c.items.map((item) => {
            if (item.name !== skillName) return item;
            return { ...item, level: newLevel };
          })
        };
      })
    }));
  };

  const levelColor: Record<string, string> = {
    Advanced: "text-green-400 bg-green-500/10 border-green-500/20",
    Intermediate: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    Beginner: "text-zinc-400 bg-zinc-500/10 border-zinc-500/20",
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <AdminHeader title="Configure Technical Skills" />

      <div className="p-8 max-w-5xl w-full mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">Technical Skills Matrix</h2>
            <p className="text-sm text-zinc-500 mt-1 font-mono">// categories &amp; competence levels</p>
          </div>

          {/* Add Category Form */}
          <form onSubmit={handleAddCategory} className="flex gap-2 shrink-0">
            <input
              type="text"
              value={newCatName}
              onChange={(e) => setNewCatName(e.target.value)}
              placeholder="New category (e.g. Cloud)"
              className="px-3.5 py-2 rounded-xl border border-zinc-800 bg-zinc-900/40 text-zinc-100 placeholder-zinc-700 focus:outline-none focus:border-blue-500/50 text-xs font-mono"
            />
            <button
              type="submit"
              className="flex items-center gap-1.5 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-xs font-bold text-white rounded-xl border border-zinc-700 cursor-pointer font-mono"
            >
              <FiPlus size={13} />
              Add Group
            </button>
          </form>
        </div>

        {/* Categories Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.skills.map((cat) => {
            const currentInput = newSkillInputs[cat.category] || { name: "", level: "Advanced" };

            return (
              <div 
                key={cat.category}
                className="bg-zinc-900/20 border border-zinc-800/80 rounded-2xl p-6 flex flex-col justify-between"
              >
                {/* Category Header */}
                <div className="flex items-center justify-between mb-5 border-b border-zinc-800 pb-3">
                  <div className="flex items-center gap-2 text-white font-bold text-sm tracking-tight font-mono">
                    <FiTag size={13} className="text-zinc-500" />
                    {cat.category}
                    <span className="text-[10px] text-zinc-500 bg-zinc-900 px-2 py-0.5 rounded-full border border-zinc-850 font-normal ml-2">
                      {cat.items.length} items
                    </span>
                  </div>
                  <button
                    onClick={() => handleRemoveCategory(cat.category)}
                    className="p-1.5 rounded-lg border border-transparent hover:border-red-500/10 text-zinc-500 hover:text-red-400 hover:bg-red-500/5 transition-all cursor-pointer"
                    title={`Delete category "${cat.category}"`}
                  >
                    <FiTrash2 size={13} />
                  </button>
                </div>

                {/* Skills list inside category */}
                <div className="flex-1 space-y-2 mb-6 min-h-[60px]">
                  {cat.items.length === 0 ? (
                    <div className="text-xs text-zinc-600 font-mono italic text-center py-4">
                      No skills added yet
                    </div>
                  ) : (
                    cat.items.map((skill) => (
                      <div 
                        key={skill.name}
                        className="flex items-center justify-between px-3 py-2 rounded-xl bg-zinc-900/30 border border-zinc-850 text-xs"
                      >
                        <span className="font-bold text-zinc-300 font-mono">{skill.name}</span>
                        <div className="flex items-center gap-2">
                          <select
                            value={skill.level}
                            onChange={(e) => handleSkillLevelChange(cat.category, skill.name, e.target.value as any)}
                            className="bg-zinc-950 border border-zinc-800 text-zinc-400 text-[10px] font-semibold font-mono rounded px-2 py-0.5 focus:outline-none focus:border-blue-500/50 cursor-pointer"
                          >
                            <option value="Advanced">Advanced</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Beginner">Beginner</option>
                          </select>
                          <button
                            onClick={() => handleRemoveSkill(cat.category, skill.name)}
                            className="p-1 rounded text-zinc-600 hover:text-red-400 hover:bg-red-500/5 transition-all cursor-pointer"
                            title={`Delete ${skill.name}`}
                          >
                            <FiTrash2 size={11} />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Quick Add Skill Form inside Category */}
                <div className="bg-zinc-950/40 border border-zinc-850 rounded-xl p-3 flex flex-col gap-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Skill name (e.g. Kubernetes)"
                      value={currentInput.name}
                      onChange={(e) => setNewSkillInputs(prev => ({
                        ...prev,
                        [cat.category]: { ...currentInput, name: e.target.value }
                      }))}
                      className="flex-1 px-3 py-1.5 rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-200 placeholder-zinc-700 focus:outline-none focus:border-blue-500/30 text-[11px] font-mono"
                    />
                    <select
                      value={currentInput.level}
                      onChange={(e) => setNewSkillInputs(prev => ({
                        ...prev,
                        [cat.category]: { ...currentInput, level: e.target.value as any }
                      }))}
                      className="bg-zinc-900 border border-zinc-800 text-zinc-300 text-[10px] font-semibold font-mono rounded-lg px-2 py-1.5 focus:outline-none cursor-pointer"
                    >
                      <option value="Advanced">Advanced</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Beginner">Beginner</option>
                    </select>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleAddSkill(cat.category)}
                    className="w-full flex items-center justify-center gap-1 py-1.5 rounded-lg bg-zinc-850 hover:bg-zinc-800 border border-zinc-800 text-[10px] font-bold text-white transition-all cursor-pointer font-mono"
                  >
                    <FiPlus size={11} /> Add to {cat.category}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
