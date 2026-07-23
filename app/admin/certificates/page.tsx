"use client";

import React, { useState } from "react";
import { useAdmin } from "../AdminContext";
import AdminHeader from "../components/AdminHeader";
import FieldInput from "../components/FieldInput";
import ImageUpload from "../components/ImageUpload";
import { FiPlus, FiEdit2, FiTrash2, FiAward, FiX, FiCheck, FiLink } from "react-icons/fi";
import { Certificate } from "../../../types/portfolio";

const initialCertificateState: Certificate = {
  title: "",
  issuer: "",
  date: "",
  link: "",
  image: "/certificates/placeholder.png",
};

export default function CertificatesEditor() {
  const { data, updateData } = useAdmin();
  const [editingIndex, setEditingIndex] = useState<number | null>(null); // null = closed, -1 = new, >=0 = edit
  const [formState, setFormState] = useState<Certificate>(initialCertificateState);

  const handleOpenEdit = (index: number) => {
    const cert = data.certificates[index];
    setFormState({ ...cert });
    setEditingIndex(index);
  };

  const handleOpenNew = () => {
    setFormState({ ...initialCertificateState });
    setEditingIndex(-1);
  };

  const handleClose = () => {
    setEditingIndex(null);
  };

  const handleSaveCertificate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.title.trim() || !formState.issuer.trim()) return;

    updateData((prev) => {
      const updated = [...prev.certificates];
      if (editingIndex === -1) {
        updated.push(formState);
      } else if (editingIndex !== null && editingIndex >= 0) {
        updated[editingIndex] = formState;
      }
      return { ...prev, certificates: updated };
    });

    handleClose();
  };

  const handleDeleteCertificate = (index: number, title: string) => {
    if (!window.confirm(`Are you sure you want to delete the certificate for "${title}"?`)) return;
    updateData((prev) => ({
      ...prev,
      certificates: prev.certificates.filter((_, idx) => idx !== index)
    }));
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <AdminHeader title="Configure Certificates" />

      <div className="p-8 max-w-5xl w-full mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">Credentials &amp; Badges</h2>
            <p className="text-sm text-zinc-500 mt-1 font-mono">// professional verifications &amp; certificates</p>
          </div>

          <button
            onClick={handleOpenNew}
            className="flex items-center gap-1.5 px-4.5 py-2.5 bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white rounded-xl shadow-lg shadow-blue-600/10 cursor-pointer font-mono"
          >
            <FiPlus size={13} />
            Add Certificate
          </button>
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.certificates.map((cert, index) => (
            <div 
              key={`${cert.title}-${index}`}
              className="bg-zinc-900/20 border border-zinc-800/80 rounded-2xl p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-2 text-white font-bold text-sm tracking-tight font-mono">
                    <FiAward size={14} className="text-zinc-500" />
                    {cert.title}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenEdit(index)}
                      className="p-1.5 rounded-lg border border-transparent hover:border-zinc-700 text-zinc-500 hover:text-white hover:bg-zinc-800/50 transition-all cursor-pointer"
                      title="Edit certificate"
                    >
                      <FiEdit2 size={13} />
                    </button>
                    <button
                      onClick={() => handleDeleteCertificate(index, cert.title)}
                      className="p-1.5 rounded-lg border border-transparent hover:border-red-500/10 text-zinc-500 hover:text-red-400 hover:bg-red-500/5 transition-all cursor-pointer"
                      title="Delete certificate"
                    >
                      <FiTrash2 size={13} />
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-1 text-xs font-semibold text-zinc-400 font-mono">
                  <div>
                    <span>Issuer:</span> <span className="text-zinc-300">{cert.issuer}</span>
                  </div>
                  <div>
                    <span>Granted:</span> <span className="text-zinc-350">{cert.date}</span>
                  </div>
                </div>
              </div>

              {cert.link && (
                <div className="pt-4 mt-4 border-t border-zinc-800/60 flex text-xs text-zinc-500 font-mono">
                  <a href={cert.link} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-white transition-colors">
                    <FiLink size={12} /> Verification URL
                  </a>
                </div>
              )}
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
                {editingIndex === -1 ? "New Professional Certificate" : `Edit Certificate // ${formState.title}`}
              </h3>
              <button 
                onClick={handleClose}
                className="p-1 rounded-lg border border-transparent hover:border-zinc-800 text-zinc-500 hover:text-white hover:bg-zinc-800 transition-all cursor-pointer"
              >
                <FiX size={15} />
              </button>
            </div>

            <form onSubmit={handleSaveCertificate} className="flex-1 overflow-y-auto space-y-5 pr-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FieldInput
                  label="Certificate Title"
                  name="title"
                  value={formState.title}
                  onChange={(val) => setFormState(prev => ({ ...prev, title: val }))}
                  placeholder="e.g. AWS Certified Cloud Practitioner"
                />
                <FieldInput
                  label="Credential Issuer"
                  name="issuer"
                  value={formState.issuer}
                  onChange={(val) => setFormState(prev => ({ ...prev, issuer: val }))}
                  placeholder="e.g. Amazon Web Services (AWS)"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FieldInput
                  label="Date Issued"
                  name="date"
                  value={formState.date}
                  onChange={(val) => setFormState(prev => ({ ...prev, date: val }))}
                  placeholder="e.g. December 2025"
                />
                <FieldInput
                  label="Verification / Certificate Link"
                  name="link"
                  type="url"
                  value={formState.link}
                  onChange={(val) => setFormState(prev => ({ ...prev, link: val }))}
                  placeholder="e.g. https://aws.amazon.com"
                />
              </div>

              <ImageUpload
                label="Certificate Logo Badge Image"
                value={formState.image}
                onChange={(val) => setFormState(prev => ({ ...prev, image: val }))}
                placeholder="No badge image uploaded"
              />

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
