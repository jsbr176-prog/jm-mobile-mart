"use client";

import AuthGuard from "@/components/AuthGuard";
import Sidebar from "@/components/admin/Sidebar";
import Topbar from "@/components/admin/Topbar";
import Link from "next/link";

export default function OffersPage() {
  return (
    <AuthGuard>
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />

        <div className="flex-1">
          <Topbar />

          <main className="p-8">
            <h1 className="text-4xl font-bold mb-8">
              🎉 Offers Management
            </h1>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-4">
                Offers are managed from Products
              </h2>

              <p className="text-gray-600 mb-6">
                Upload products from the Products page and tick the
                <strong> "Show in Offers"</strong> checkbox. Those products will
                automatically appear on the public Offers page.
              </p>

              <Link
                href="/admin/products"
                className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white font-bold px-8 py-4 rounded-xl"
              >
                Go to Products
              </Link>
            </div>
          </main>
        </div>
      </div>
    </AuthGuard>
  );
}