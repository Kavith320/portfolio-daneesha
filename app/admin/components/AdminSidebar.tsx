"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  FiHome, 
  FiUser, 
  FiBriefcase, 
  FiFolder, 
  FiBookOpen, 
  FiAward, 
  FiCode, 
  FiLogOut,
  FiArrowLeft
} from "react-icons/fi";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: FiHome },
  { href: "/admin/developer", label: "Profile / Info", icon: FiUser },
  { href: "/admin/skills", label: "Skills", icon: FiCode },
  { href: "/admin/projects", label: "Projects", icon: FiFolder },
  { href: "/admin/experience", label: "Experience", icon: FiBriefcase },
  { href: "/admin/education", label: "Education", icon: FiBookOpen },
  { href: "/admin/certificates", label: "Certificates", icon: FiAward },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    sessionStorage.removeItem("admin_auth");
    router.push("/admin/login");
    // Force a reload or navigation state update
    window.location.reload();
  };

  return (
    <aside className="w-64 bg-zinc-950 border-r border-zinc-800 text-zinc-400 flex flex-col h-screen fixed left-0 top-0 z-30">
      {/* Brand logo header */}
      <div className="h-16 flex items-center justify-between px-6 border-b border-zinc-900">
        <Link href="/admin" className="text-white font-bold tracking-tight text-base hover:text-blue-400 transition-colors">
          Daneesha Admin<span className="text-blue-500">.</span>
        </Link>
        <Link href="/" className="text-xs flex items-center gap-1 text-zinc-500 hover:text-zinc-300 transition-colors font-mono">
          <FiArrowLeft size={12} /> Live Site
        </Link>
      </div>

      {/* Nav links */}
      <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                isActive 
                  ? "bg-blue-600/10 text-blue-400 border border-blue-500/20" 
                  : "hover:bg-zinc-900 hover:text-zinc-200 border border-transparent"
              }`}
            >
              <Icon size={16} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer / Logout */}
      <div className="p-4 border-t border-zinc-900">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/5 hover:text-red-300 border border-transparent hover:border-red-500/10 transition-all cursor-pointer"
        >
          <FiLogOut size={16} />
          Logout
        </button>
      </div>
    </aside>
  );
}
