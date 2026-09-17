"use client";

import React, { useState } from "react";
import { useAdmin } from "../AdminContext";
import AdminHeader from "../components/AdminHeader";
import FieldInput from "../components/FieldInput";
import { FiPlus, FiEdit2, FiTrash2, FiBookOpen, FiX, FiCheck } from "react-icons/fi";
import { EducationItem } from "../../../types/portfolio";

const initialEducationState: EducationItem = {
  institution: "",
  degree: "",
  duration: "",
  details: "",
  coursework: [],
};

export default function EducationEditor() {
  const { data, updateData } = useAdmin();
  const [editingIndex, setEditingIndex] = useState<number | null>(null); // null = closed, -1 = new, >=0 = edit
  const [formState, setFormState] = useState<EducationItem>(initialEducationState);
  const [courseInput, setCourseInput] = useState("");

  const handleOpenEdit = (index: number) => {
    const edu = data.education[index];
    setFormState({ ...edu });
    setEditingIndex(index);
  };

  const handleOpenNew = () => {
    setFormState({ ...initialEducationState });
    setEditingIndex(-1);
  };

  const handleClose = () => {
    setEditingIndex(null);
  };

  const handleSaveEducation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.institution.trim() || !formState.degree.trim()) return;

    updateData((prev) => {
      const updated = [...prev.education];
      if (editingIndex === -1) {
        updated.push(formState);
      } else if (editingIndex !== null && editingIndex >= 0) {
        updated[editingIndex] = formState;
      }
      return { ...prev, education: updated };
    });

    handleClose();
  };

  const handleDeleteEducation = (index: number, institution: string) => {
    if (!window.confirm(`Are you sure you want to delete the education timeline for "${institution}"?`)) return;
    updateData((prev) => ({
      ...prev,
      education: prev.education.filter((_, idx) => idx !== index)
    }));
  };

  const handleAddCourse = () => {
    if (!courseInput.trim()) return;
    if (formState.coursework.includes(courseInput.trim())) return;
    setFormState(prev => ({
      ...prev,
      coursework: [...prev.coursework, courseInput.trim()]
    }));
    setCourseInput("");
  };

  const handleRemoveCourse = (course: string) => {
    setFormState(prev => ({
      ...prev,
      coursework: prev.coursework.filter(c => c !== course)
    }));
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <AdminHeader title="Configure Education Timeline" />

      <div className="p-8 max-w-5xl w-full mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">Academic History</h2>
            <p className="text-sm text-zinc-500 mt-1 font-mono">// institutions &amp; course tracks</p>
          </div>

          <button
            onClick={handleOpenNew}
            className="flex items-center gap-1.5 px-4.5 py-2.5 bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white rounded-xl shadow-lg shadow-blue-600/10 cursor-pointer font-mono"
          >
            <FiPlus size={13} />
            Add Education
          </button>
        </div>

        {/* Education Timeline Cards */}
        <div className="space-y-4">
          {data.education.map((edu, index) => (
            <div 
              key={`${edu.institution}-${index}`}
              className="bg-zinc-900/20 border border-zinc-800/80 rounded-2xl p-6 flex flex-col sm:flex-row justify-between items-start gap-4"
            >
              <div className="flex-1 flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 shrink-0">
                  <FiBookOpen size={16} />
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-sm font-bold text-white font-mono">{edu.degree}</h3>
                  <div className="flex items-center gap-2 text-xs font-semibold text-zinc-400 font-mono">
                    <span className="text-blue-400">{edu.institution}</span>
                    <span>•</span>
                    <span>{edu.duration}</span>
                  </div>
                  {edu.details && (
                    <p className="text-xs text-zinc-400 italic mt-2">{edu.details}</p>
                  )}
                  {edu.coursework.length > 0 && (
                    <div className="mt-3">
                      <span className="text-[10px] font-bold text-zinc-500 font-mono tracking-wide uppercase">Core Coursework:</span>
                      <div className="flex flex-wrap gap-1.5 mt-1.5">
                        {edu.coursework.map((course, i) => (
                          <span key={i} className="text-[9px] font-bold font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400">
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
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
                  onClick={() => handleDeleteEducation(index, edu.institution)}
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
                {editingIndex === -1 ? "New Academic Profile" : `Edit Profile // ${formState.institution}`}
              </h3>
              <button 
                onClick={handleClose}
                className="p-1 rounded-lg border border-transparent hover:border-zinc-800 text-zinc-500 hover:text-white hover:bg-zinc-800 transition-all cursor-pointer"
              >
                <FiX size={15} />
              </button>
            </div>

            <form onSubmit={handleSaveEducation} className="flex-1 overflow-y-auto space-y-5 pr-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FieldInput
                  label="Institution"
                  name="institution"
                  value={formState.institution}
                  onChange={(val) => setFormState(prev => ({ ...prev, institution: val }))}
                  placeholder="e.g. Tech State University"
                />
                <FieldInput
                  label="Degree / Major"
                  name="degree"
                  value={formState.degree}
                  onChange={(val) => setFormState(prev => ({ ...prev, degree: val }))}
                  placeholder="e.g. B.S. in Computer Science"
                />
              </div>

              <FieldInput
                label="Duration / Class Year"
                name="duration"
                value={formState.duration}
                onChange={(val) => setFormState(prev => ({ ...prev, duration: val }))}
                placeholder="e.g. 2023 - 2027 (Expected)"
              />

              <FieldInput
                label="Details (Clubs, Activities)"
                name="details"
                value={formState.details}
                onChange={(val) => setFormState(prev => ({ ...prev, details: val }))}
                type="textarea"
                rows={2}
                placeholder="Active member of Computer Science Association..."
              />

              {/* Coursework Editor */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-zinc-400 font-mono">Core Coursework</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={courseInput}
                    onChange={(e) => setCourseInput(e.target.value)}
                    placeholder="e.g. Data Structures & Algorithms"
                    className="flex-1 px-3 py-1.5 rounded-lg border border-zinc-800 bg-zinc-950 text-zinc-200 text-xs focus:outline-none"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddCourse();
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={handleAddCourse}
                    className="px-4 py-1.5 bg-zinc-800 border border-zinc-700 text-xs font-bold text-white rounded-lg cursor-pointer font-mono"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {formState.coursework.length === 0 ? (
                    <span className="text-[10px] text-zinc-600 font-mono italic">No courses recorded</span>
                  ) : (
                    formState.coursework.map((course) => (
                      <span 
                        key={course}
                        onClick={() => handleRemoveCourse(course)}
                        className="text-[9px] font-bold font-mono px-2 py-0.5 rounded-md bg-zinc-850 border border-zinc-800 text-zinc-300 hover:border-red-500/30 hover:text-red-400 cursor-pointer flex items-center gap-1 group transition-all"
                        title="Click to remove"
                      >
                        {course} <span className="text-[8px] text-zinc-500 group-hover:text-red-400">×</span>
                      </span>
                    ))
                  )}
                </div>
              </div>

              {/* Submit Buttons */}
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
