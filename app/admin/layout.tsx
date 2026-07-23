"use client";

import React, { useState, useEffect } from "react";
import { AdminProvider } from "./AdminContext";
import AdminSidebar from "./components/AdminSidebar";
import LoginPage from "./login/page";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // Session state check
    const auth = sessionStorage.getItem("admin_auth");
    setIsAuthenticated(auth === "true");
  }, []);

  // Display loading screen while validating auth state
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-zinc-500 font-mono text-sm">
        Authenticating...
      </div>
    );
  }

  // Gate content via LoginPage if unauthenticated
  if (!isAuthenticated) {
    return <LoginPage onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <AdminProvider>
      <div className="min-h-screen bg-zinc-950 text-zinc-100 flex font-sans">
        <AdminSidebar />
        <div className="flex-1 pl-64 flex flex-col min-h-screen">
          <main className="flex-grow flex flex-col">{children}</main>
        </div>
      </div>
    </AdminProvider>
  );
}
