"use client";

import React, { useState } from "react";
import { useAdmin } from "../AdminContext";
import AdminHeader from "../components/AdminHeader";
import FieldInput from "../components/FieldInput";
import ImageUpload from "../components/ImageUpload";
import { FiPlus, FiEdit2, FiTrash2, FiLink, FiGithub, FiFolder, FiX, FiCheck } from "react-icons/fi";
import { Project } from "../../../types/portfolio";

const initialProjectState: Project = {
  title: "",
  description: "",
  image: "/projects/placeholder.png",
  github: "",
  demo: "",
  tags: [],
  features: [],
};

export default function ProjectsEditor() {
  const { data, updateData } = useAdmin();
  const [editingIndex, setEditingIndex] = useState<number | null>(null); // null = closed, -1 = new, >=0 = edit
  const [formState, setFormState] = useState<Project>(initialProjectState);
  
  // Tag / Feature raw string states
  const [tagInput, setTagInput] = useState("");
  const [featureInput, setFeatureInput] = useState("");

  const handleOpenEdit = (index: number) => {
    const project = data.projects[index];
    setFormState({ ...project });
    setEditingIndex(index);
  };

  const handleOpenNew = () => {
    setFormState({ ...initialProjectState });
    setEditingIndex(-1);
  };

  const handleClose = () => {
    setEditingIndex(null);
  };

  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.title.trim()) return;

    updateData((prev) => {
      const updated = [...prev.projects];
      if (editingIndex === -1) {
        // Add new
        updated.push(formState);
      } else if (editingIndex !== null && editingIndex >= 0) {
        // Update existing
        updated[editingIndex] = formState;
      }
      return { ...prev, projects: updated };
    });

    handleClose();
  };

  const handleDeleteProject = (index: number, title: string) => {
    if (!window.confirm(`Are you sure you want to delete the project "${title}"?`)) return;
    updateData((prev) => ({
      ...prev,
      projects: prev.projects.filter((_, idx) => idx !== index)
    }));
  };

  const handleAddTag = () => {
    if (!tagInput.trim()) return;
    if (formState.tags.includes(tagInput.trim())) return;
    setFormState(prev => ({
      ...prev,
      tags: [...prev.tags, tagInput.trim()]
    }));
    setTagInput("");
  };

  const handleRemoveTag = (tag: string) => {
    setFormState(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }));
  };

  const handleAddFeature = () => {
    if (!featureInput.trim()) return;
    if (formState.features.includes(featureInput.trim())) return;
    setFormState(prev => ({
      ...prev,
      features: [...prev.features, featureInput.trim()]
    }));
    setFeatureInput("");
  };

  const handleRemoveFeature = (feat: string) => {
    setFormState(prev => ({
      ...prev,
      features: prev.features.filter(f => f !== feat)
    }));
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <AdminHeader title="Configure Projects Showcase" />

      <div className="p-8 max-w-6xl w-full mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">Project Entries</h2>
            <p className="text-sm text-zinc-500 mt-1 font-mono">// interactive dashboard components</p>
          </div>

          <button
            onClick={handleOpenNew}
            className="flex items-center gap-1.5 px-4.5 py-2.5 bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white rounded-xl shadow-lg shadow-blue-600/10 cursor-pointer font-mono"
          >
            <FiPlus size={13} />
            Create Project
          </button>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.projects.map((project, index) => (
            <div 
              key={`${project.title}-${index}`}
              className="bg-zinc-900/20 border border-zinc-800/80 rounded-2xl p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-2 text-white font-bold text-sm tracking-tight font-mono">
                    <FiFolder size={14} className="text-zinc-500" />
                    {project.title}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenEdit(index)}
                      className="p-1.5 rounded-lg border border-transparent hover:border-zinc-700 text-zinc-500 hover:text-white hover:bg-zinc-800/50 transition-all cursor-pointer"
                      title="Edit project"
                    >
                      <FiEdit2 size={13} />
                    </button>
                    <button
                      onClick={() => handleDeleteProject(index, project.title)}
                      className="p-1.5 rounded-lg border border-transparent hover:border-red-500/10 text-zinc-500 hover:text-red-400 hover:bg-red-500/5 transition-all cursor-pointer"
                      title="Delete project"
                    >
                      <FiTrash2 size={13} />
                    </button>
                  </div>
                </div>

                <p className="text-xs text-zinc-400 leading-relaxed line-clamp-3 mb-4">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tags.map((t) => (
                    <span 
                      key={t}
                      className="text-[9px] font-bold font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-zinc-800/60 text-xs text-zinc-500 font-mono">
                {project.github && (
                  <a href={project.github} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-white transition-colors">
                    <FiGithub size={12} /> GitHub
                  </a>
                )}
                {project.demo && (
                  <a href={project.demo} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-white transition-colors">
                    <FiLink size={12} /> Live Demo
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Editor Modal */}
      {editingIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-sm">
          <div className="w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-2xl flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800 mb-6 shrink-0">
              <h3 className="text-sm font-bold text-white tracking-tight font-mono">
                {editingIndex === -1 ? "New Project Workspace" : `Edit Workspace // ${formState.title}`}
              </h3>
              <button 
                onClick={handleClose}
                className="p-1 rounded-lg border border-transparent hover:border-zinc-800 text-zinc-500 hover:text-white hover:bg-zinc-800 transition-all cursor-pointer"
              >
                <FiX size={15} />
              </button>
            </div>

            {/* Modal Scrollable Fields */}
            <form onSubmit={handleSaveProject} className="flex-1 overflow-y-auto space-y-5 pr-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FieldInput
                  label="Project Title"
                  name="title"
                  value={formState.title}
                  onChange={(val) => setFormState(prev => ({ ...prev, title: val }))}
                  placeholder="e.g. ApexTask"
                />
                <ImageUpload
                  label="Project Preview (Image / Video)"
                  value={formState.image}
                  onChange={(val) => setFormState(prev => ({ ...prev, image: val }))}
                  placeholder="No project image uploaded"
                />
              </div>

              <FieldInput
                label="Brief Description"
                name="description"
                value={formState.description}
                onChange={(val) => setFormState(prev => ({ ...prev, description: val }))}
                type="textarea"
                rows={3}
                placeholder="Describe the scope, framework stack, and usage..."
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FieldInput
                  label="GitHub Repository Link"
                  name="github"
                  type="url"
                  value={formState.github}
                  onChange={(val) => setFormState(prev => ({ ...prev, github: val }))}
                  placeholder="e.g. https://github.com/..."
                />
                <FieldInput
                  label="Live Demo Link"
                  name="demo"
                  type="url"
                  value={formState.demo}
                  onChange={(val) => setFormState(prev => ({ ...prev, demo: val }))}
                  placeholder="e.g. https://..."
                />
              </div>

              {/* Tags Setup */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-zinc-400 font-mono">Tags / Technology Stack</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    placeholder="e.g. Next.js"
                    className="flex-1 px-3 py-1.5 rounded-lg border border-zinc-800 bg-zinc-950 text-zinc-200 text-xs focus:outline-none"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddTag();
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="px-4 py-1.5 bg-zinc-800 border border-zinc-700 text-xs font-bold text-white rounded-lg cursor-pointer font-mono"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {formState.tags.length === 0 ? (
                    <span className="text-[10px] text-zinc-600 font-mono italic">No tags selected</span>
                  ) : (
                    formState.tags.map((t) => (
                      <span 
                        key={t}
                        onClick={() => handleRemoveTag(t)}
                        className="text-[9px] font-bold font-mono px-2 py-0.5 rounded-md bg-zinc-850 border border-zinc-800 text-zinc-300 hover:border-red-500/30 hover:text-red-400 cursor-pointer flex items-center gap-1 group transition-all"
                        title="Click to remove"
                      >
                        {t} <span className="text-[8px] text-zinc-500 group-hover:text-red-400">×</span>
                      </span>
                    ))
                  )}
                </div>
              </div>

              {/* Features Setup */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-zinc-400 font-mono">Core Highlights / Features</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={featureInput}
                    onChange={(e) => setFeatureInput(e.target.value)}
                    placeholder="e.g. Real-time board transitions with WebSockets."
                    className="flex-1 px-3 py-1.5 rounded-lg border border-zinc-800 bg-zinc-950 text-zinc-200 text-xs focus:outline-none"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddFeature();
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={handleAddFeature}
                    className="px-4 py-1.5 bg-zinc-800 border border-zinc-700 text-xs font-bold text-white rounded-lg cursor-pointer font-mono"
                  >
                    Add
                  </button>
                </div>
                <div className="space-y-1.5 mt-2">
                  {formState.features.length === 0 ? (
                    <span className="text-[10px] text-zinc-600 font-mono italic">No highlights defined</span>
                  ) : (
                    formState.features.map((f, i) => (
                      <div 
                        key={`${f}-${i}`}
                        className="flex items-center justify-between p-2 rounded-lg bg-zinc-950 border border-zinc-850 text-[11px] text-zinc-300"
                      >
                        <span className="font-mono">{f}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveFeature(f)}
                          className="text-zinc-500 hover:text-red-400 p-1 cursor-pointer transition-all"
                        >
                          <FiX size={12} />
                        </button>
                      </div>
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
