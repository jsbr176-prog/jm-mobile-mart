"use client";

import AuthGuard from "@/components/AuthGuard";
import Sidebar from "@/components/admin/Sidebar";
import Topbar from "@/components/admin/Topbar";
import DashboardCards from "@/components/admin/DashboardCards";

export default function Dashboard() {
  return (
    <AuthGuard>

      <div className="flex bg-gray-100 min-h-screen">

        <Sidebar />

        <div className="flex-1">

          <Topbar />

          <main className="p-8">

            <DashboardCards />

          </main>

        </div>

      </div>

    </AuthGuard>
  );
}