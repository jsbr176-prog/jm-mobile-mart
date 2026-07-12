"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const accessories = [
  "Chargers",
  "Wireless Chargers",
  "Power Banks",
  "Covers",
  "Tempered Glass",
  "Earbuds",
  "Headphones",
  "Neckbands",
  "Bluetooth Speaker",
  "Smart Watches",
  "Phone Coolers",
  "Selfie Sticks",
  "Tripods",
  "Memory Cards",
  "Pendrives",
  "OTG Adapters",
  "Microphones",
  "Tablet Covers",
  "Laptop Skins",
  "Mobile Skins",
  "Camera Protectors",
];

export default function AccessoriesPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-100 pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6">

          <h1 className="text-5xl font-bold text-center mb-4">
            Mobile Accessories
          </h1>

          <p className="text-center text-gray-500 mb-14">
            Explore All Accessories
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

            {accessories.map((item) => (
              <Link
                key={item}
                href={`/accessories/${item
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