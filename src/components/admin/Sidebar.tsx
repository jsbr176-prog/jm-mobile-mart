"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  PackagePlus,
  Smartphone,
  Headphones,
  Cpu,
  RefreshCcw,
  Image,
  Star,
  Settings,
  User,
} from "lucide-react";

const menu = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/admin/dashboard",
  },
  {
    title: "Products",
    icon: PackagePlus,
    href: "/admin/products",
  },
  {
    title: "Mobiles",
    icon: Smartphone,
    href: "/admin/products",
  },
  {
    title: "Accessories",
    icon: Headphones,
    href: "/admin/products",
  },
  {
    title: "Smart Gadgets",
    icon: Cpu,
    href: "/admin/products",
  },
  {
    title: "Pre-Owned",
    icon: RefreshCcw,
    href: "/admin/products",
  },
  {
    title: "Banners",
    icon: Image,
    href: "/admin/banners",
  },
  {
    title: "Featured",
    icon: Star,
    href: "/admin/featured",
  },
  {
    title: "Website Settings",
    icon: Settings,
    href: "/admin/settings",
  },
  {
    title: "Admin Profile",
    icon: User,
    href: "/admin/profile",
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-72 min-h-screen bg-gray-900 text-white flex flex-col">

      <div className="p-6 border-b border-gray-700">
        <h1 className="text-2xl font-bold text-yellow-400">
          JM Mobile Mart
        </h1>

        <p className="text-gray-400 text-sm mt-2">
          Admin Panel
        </p>
      </div>

      <nav className="flex-1 p-4 space-y-2">

        {menu.map((item) => {
          const Icon = item.icon;

          const active =
            pathname === item.href ||
            (pathname.startsWith("/admin/products") &&
              item.href === "/admin/products");

          return (
            <Link
              key={item.title}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                active
                  ? "bg-yellow-500 text-black font-semibold"
                  : "hover:bg-yellow-500 hover:text-black"
              }`}
            >
              <Icon size={20} />
              <span>{item.title}</span>
            </Link>
          );
        })}

      </nav>

      <div className="border-t border-gray-700 p-4 text-center text-sm text-gray-400">
        © 2026 JM Mobile Mart
      </div>

    </aside>
  );
}