"use client";

import React from "react";
import { useAdmin } from "../AdminContext";
import AdminHeader from "../components/AdminHeader";
import FieldInput from "../components/FieldInput";
import ImageUpload from "../components/ImageUpload";

export default function DeveloperInfoEditor() {
  const { data, updateData } = useAdmin();
  const info = data.developerInfo;

  const handleChange = (field: keyof typeof info, value: string) => {
    updateData((prev) => ({
      ...prev,
      developerInfo: {
        ...prev.developerInfo,
        [field]: value,
      },
    }));
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <AdminHeader title="Configure Profile / Info" />

      <div className="p-8 max-w-4xl w-full mx-auto space-y-8">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Personal &amp; Contact Info</h2>
          <p className="text-sm text-zinc-500 mt-1 font-mono">// primary identification data segments</p>
        </div>

        <div className="bg-zinc-900/20 border border-zinc-800/80 rounded-2xl p-6 space-y-6">
          {/* Profile Picture Upload */}
          <div className="border-b border-zinc-800/60 pb-5">
            <ImageUpload
              label="Profile Avatar (Image)"
              value={info.avatarUrl}
              onChange={(val) => handleChange("avatarUrl", val)}
              placeholder="No profile picture selected"
            />
          </div>

          {/* Hero Video Background Upload */}
          <div className="border-b border-zinc-800/60 pb-5">
            <ImageUpload
              label="Hero Section Background Video (MP4 / WebM)"
              value={info.heroVideoUrl || ""}
              onChange={(val) => handleChange("heroVideoUrl", val)}
              placeholder="Upload or paste video URL (e.g. hero_video)"
            />
          </div>

          {/* Two-column layout for basic info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <FieldInput
              label="Developer Name"
              name="name"
              value={info.name}
              onChange={(val) => handleChange("name", val)}
              placeholder="e.g. Daneesha Disanayake"
            />
            <FieldInput
              label="Professional Title"
              name="title"
              value={info.title}
              onChange={(val) => handleChange("title", val)}
              placeholder="e.g. Full Stack Developer"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <FieldInput
              label="Specialty Badge"
              name="specialty"
              value={info.specialty}
              onChange={(val) => handleChange("specialty", val)}
              placeholder="e.g. MERN Stack Specialist"
            />
            <FieldInput
              label="Resume PDF URL"
              name="resumeUrl"
              value={info.resumeUrl}
              onChange={(val) => handleChange("resumeUrl", val)}
              placeholder="e.g. /resume/Daneesha_Resume.pdf"
            />
          </div>

          <FieldInput
            label="Hero Tagline (Sub-Title)"
            name="subTitle"
            value={info.subTitle}
            onChange={(val) => handleChange("subTitle", val)}
            type="textarea"
            rows={2}
            placeholder="e.g. Building high-performance, beautiful, and accessible web applications."
          />

          <FieldInput
            label="Biography (About)"
            name="bio"
            value={info.bio}
            onChange={(val) => handleChange("bio", val)}
            type="textarea"
            rows={4}
            placeholder="Introduce yourself, your background, and experience..."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <FieldInput
              label="Core Philosophy / Goals"
              name="goals"
              value={info.goals}
              onChange={(val) => handleChange("goals", val)}
              type="textarea"
              rows={3}
              placeholder="Describe your engineering values or goals..."
            />
            <FieldInput
              label="Academic Summary"
              name="studies"
              value={info.studies}
              onChange={(val) => handleChange("studies", val)}
              type="textarea"
              rows={3}
              placeholder="Detail your degree, focus, and university..."
            />
          </div>
        </div>

        {/* Social / Contact Grid */}
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Socials &amp; Handles</h2>
          <p className="text-sm text-zinc-500 mt-1 font-mono">// public communications gateways</p>
        </div>

        <div className="bg-zinc-900/20 border border-zinc-800/80 rounded-2xl p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
          <FieldInput
            label="Email Address"
            name="email"
            type="email"
            value={info.email}
            onChange={(val) => handleChange("email", val)}
            placeholder="e.g. yourname@example.com"
          />
          <FieldInput
            label="GitHub URL"
            name="github"
            type="url"
            value={info.github}
            onChange={(val) => handleChange("github", val)}
            placeholder="e.g. https://github.com/..."
          />
          <FieldInput
            label="LinkedIn URL"
            name="linkedin"
            type="url"
            value={info.linkedin}
            onChange={(val) => handleChange("linkedin", val)}
            placeholder="e.g. https://linkedin.com/in/..."
          />
          <FieldInput
            label="Twitter / X URL"
            name="twitter"
            type="url"
            value={info.twitter}
            onChange={(val) => handleChange("twitter", val)}
            placeholder="e.g. https://twitter.com/..."
          />
        </div>
      </div>
    </div>
  );
}
