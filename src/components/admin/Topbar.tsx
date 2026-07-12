"use client";

import { Bell, Search, LogOut } from "lucide-react";

export default function Topbar() {
  return (
    <header className="h-20 bg-white border-b flex items-center justify-between px-8 shadow-sm">

      <div>
        <h1 className="text-2xl font-bold">
          Dashboard
        </h1>

        <p className="text-gray-500 text-sm">
          Welcome back, Admin
        </p>
      </div>

      <div className="flex items-center gap-5">

        <div className="relative">

          <Search
            className="absolute left-3 top-3 text-gray-400"
            size={18}
          />

          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 border rounded-lg w-72 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />

        </div>

        <Bell className="cursor-pointer" />

        <button className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">

          <LogOut size={18} />

          Logout

        </button>

      </div>

    </header>
  );
}