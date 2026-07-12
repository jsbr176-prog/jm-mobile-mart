"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const gadgets = [
  "Smart Watches",
  "Gaming Gear",
  "VR Headsets",
  "Projector",
  "Drones",
  "Vacuum Cleaners",
  "Massagers",
  "Air Coolers",
  "Unique Gadgets",
];

export default function SmartGadgetsPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-100 pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6">

          <h1 className="text-5xl font-bold text-center mb-4">
            Smart Gadgets
          </h1>

          <p className="text-center text-gray-500 mb-14">
            Explore Latest Smart Gadgets
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

            {gadgets.map((item) => (
              <Link
                key={item}
                href={`/smart-gadgets/${item
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`}
                className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition p-8 text-center hover:-translate-y-2"
              >
                <h2 className="text-2xl font-bold">
                  {item}
                </h2>

                <p className="text-gray-500 mt-3">
                  View Products →
                </p>
              </Link>
            ))}

          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}