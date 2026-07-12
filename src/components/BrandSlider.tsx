"use client";

import Link from "next/link";

const brands = [
  "Apple",
  "Samsung",
  "Vivo",
  "Oppo",
  "Realme",
  "Xiaomi",
  "OnePlus",
  "Nothing",
  "iQOO",
  "Poco",
  "Motorola",
  "Nokia",
  "Infinix",
  "Tecno",
  "Honor",
  "Huawei",
  "Google Pixel",
  "AI+",
];

export default function BrandSlider() {
  return (
    <section className="py-20 bg-white">

      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-5xl font-black text-center text-blue-700">
          SHOP BY BRAND
        </h2>

        <p className="text-center text-gray-500 mt-3 mb-12 text-lg">
          Choose your favourite smartphone brand
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">

          {brands.map((brand) => (
            <Link
              key={brand}
              href={`/mobiles/${brand
                .toLowerCase()
                .replace(/\s+/g, "-")
                .replace("+", "-plus")}`}
            >
              <div className="h-40 bg-white rounded-2xl shadow-lg border border-gray-200 hover:border-yellow-400 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex items-center justify-center">

                <h3 className="text-2xl font-bold text-gray-900 text-center">
                  {brand}
                </h3>

              </div>
            </Link>
          ))}

        </div>

      </div>

    </section>
  );
}