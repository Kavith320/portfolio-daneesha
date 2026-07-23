"use client";

import React from "react";
import { useAdmin } from "./AdminContext";
import Link from "next/link";
import AdminHeader from "./components/AdminHeader";
import { 
  FiUser, 
  FiCode, 
  FiFolder, 
  FiBriefcase, 
  FiBookOpen, 
  FiAward,
  FiArrowRight
} from "react-icons/fi";

export default function AdminDashboard() {
  const { data } = useAdmin();

  const stats = [
    {
      label: "Profile Settings",
      value: data.developerInfo.name,
      description: data.developerInfo.title,
      icon: FiUser,
      color: "from-blue-600 to-indigo-600",
      shadow: "shadow-blue-500/10",
      href: "/admin/developer"
    },
    {
      label: "Technical Skills",
      value: `${data.skills.reduce((acc, cat) => acc + cat.items.length, 0)} Skills`,
      description: `${data.skills.length} Categories`,
      icon: FiCode,
      color: "from-emerald-600 to-teal-600",
      shadow: "shadow-emerald-500/10",
      href: "/admin/skills"
    },
    {
      label: "Projects Showcase",
      value: `${data.projects.length} Projects`,
      description: "Interactive showcase cards",
      icon: FiFolder,
      color: "from-violet-600 to-fuchsia-600",
      shadow: "shadow-violet-500/10",
      href: "/admin/projects"
    },
    {
      label: "Work Experience",
      value: `${data.experience.length} Roles`,
      description: "Employment history logs",
      icon: FiBriefcase,
      color: "from-amber-600 to-orange-600",
      shadow: "shadow-amber-500/10",
      href: "/admin/experience"
    },
    {
      label: "Education Track",
      value: `${data.education.length} Programs`,
      description: "Academic history logs",
      icon: FiBookOpen,
      color: "from-rose-600 to-pink-600",
      shadow: "shadow-rose-500/10",
      href: "/admin/education"
    },
    {
      label: "Certificates",
      value: `${data.certificates.length} Credentials`,
      description: "Professional licenses",
      icon: FiAward,
      color: "from-cyan-600 to-blue-600",
      shadow: "shadow-cyan-500/10",
      href: "/admin/certificates"
    }
  ];

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <AdminHeader title="Admin Dashboard" />
      
      <div className="p-8 max-w-6xl w-full mx-auto space-y-8">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">System Status Overview</h2>
          <p className="text-sm text-zinc-500 mt-1 font-mono">// real-time configuration manager</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div 
                key={stat.label}
                className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-6 flex flex-col justify-between hover:border-zinc-700/60 transition-all duration-300 group"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-xs font-semibold text-zinc-500 font-mono tracking-wider uppercase">
                      {stat.label}
                    </span>
                    <div className={`w-8 h-8 rounded-xl bg-gradient-to-tr ${stat.color} flex items-center justify-center text-white shadow-lg ${stat.shadow}`}>
                      <Icon size={14} />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-white leading-snug">
                    {stat.value}
                  </h3>
                  <p className="text-xs text-zinc-500 mt-1 font-mono">
                    {stat.description}
                  </p>
                </div>
                
                <div className="mt-6 pt-4 border-t border-zinc-800/60">
                  <Link 
                    href={stat.href}
                    className="flex items-center justify-between text-xs font-bold text-blue-400 group-hover:text-blue-300 transition-colors font-mono cursor-pointer"
                  >
                    Configure Section
                    <FiArrowRight size={13} className="transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Informative system card */}
        <div className="bg-gradient-to-tr from-zinc-900/60 to-zinc-950/20 border border-zinc-800/80 rounded-3xl p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />
          <div className="relative z-10 max-w-2xl">
            <h3 className="text-base font-bold text-white tracking-tight">System Info</h3>
            <p className="text-sm text-zinc-400 mt-3 leading-relaxed">
              This admin panel edits portfolio content live. Your modifications are saved directly inside this browser's 
              <code className="text-zinc-300 bg-zinc-950 px-1.5 py-0.5 rounded border border-zinc-900 mx-1 font-mono text-xs">localStorage</code>. 
              The frontend is hooked up to read these values instantly, so you can test and view edits without re-deploying or editing code.
            </p>
            <div className="mt-6 flex flex-wrap gap-4 text-xs font-mono text-zinc-500">
              <div>
                <span>Database Engine:</span> <span className="text-emerald-400 font-bold">LocalStorage Cache</span>
              </div>
              <div className="hidden sm:block text-zinc-700">|</div>
              <div>
                <span>Client Engine:</span> <span className="text-blue-400 font-bold">Next.js 16 (App Router)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
