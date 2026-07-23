"use client";

import React, { useState, useRef } from "react";
import { FiUploadCloud, FiImage, FiVideo, FiLoader, FiAlertCircle } from "react-icons/fi";

interface ImageUploadProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  placeholder?: string;
}

export default function ImageUpload({
  label,
  value,
  onChange,
  placeholder = "No file uploaded",
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (file: File) => {
    setIsUploading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to upload file.");
      }

      onChange(result.url);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An error occurred during file upload.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleUpload(file);
    }
  };

  const isVideo = (url: string) => {
    return url.match(/\.(mp4|webm|ogg|mov)$/i);
  };

  const isImage = (url: string) => {
    return url.match(/\.(jpeg|jpg|png|gif|webp|svg)$/i) || url.startsWith("/uploads/");
  };

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-xs font-semibold text-zinc-400 font-mono">
        {label}
      </label>

      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-stretch">
        {/* URL Input field */}
        <div className="sm:col-span-8 flex flex-col gap-2">
          <input
            type="text"
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full px-4 py-2.5 rounded-xl border border-zinc-800 bg-zinc-900/40 text-zinc-100 placeholder-zinc-700 focus:border-blue-500/50 focus:outline-none transition-all duration-200 text-sm font-mono"
          />

          {/* Trigger button & upload status */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              disabled={isUploading}
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-1.5 px-4 py-2 bg-zinc-800 hover:bg-zinc-750 disabled:bg-zinc-900 border border-zinc-700 text-xs font-bold text-white rounded-xl cursor-pointer font-mono transition-all"
            >
              {isUploading ? (
                <>
                  <FiLoader className="animate-spin text-blue-400" size={13} />
                  Uploading...
                </>
              ) : (
                <>
                  <FiUploadCloud size={13} className="text-zinc-400" />
                  Upload Local File
                </>
              )}
            </button>

            <span className="text-[10px] text-zinc-600 font-mono italic">
              Images/Videos accepted
            </span>
          </div>

          {error && (
            <div className="flex items-center gap-1.5 text-[10px] font-semibold text-red-400 font-mono">
              <FiAlertCircle size={12} className="shrink-0" />
              {error}
            </div>
          )}
        </div>

        {/* Dynamic preview thumbnail */}
        <div className="sm:col-span-4 flex items-center justify-center border border-zinc-800/80 bg-zinc-900/10 rounded-2xl p-2 min-h-[90px] relative overflow-hidden">
          {value ? (
            <>
              {isVideo(value) ? (
                <div className="flex flex-col items-center justify-center gap-1 text-zinc-400 h-full w-full">
                  <FiVideo size={20} className="text-blue-500" />
                  <span className="text-[9px] font-mono font-semibold max-w-[80px] truncate">{value.split("/").pop()}</span>
                </div>
              ) : (
                <img
                  src={value}
                  alt="Upload Preview"
                  className="max-h-16 max-w-full rounded-lg object-contain"
                  onError={(e) => {
                    // Fallback to placeholder icon if loading fails
                    (e.target as HTMLElement).style.display = "none";
                  }}
                />
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center text-zinc-700 font-mono text-[9px]">
              <FiImage size={20} className="mb-1 text-zinc-800" />
              No Preview
            </div>
          )}
        </div>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*,video/*"
        className="hidden"
      />
    </div>
  );
}
