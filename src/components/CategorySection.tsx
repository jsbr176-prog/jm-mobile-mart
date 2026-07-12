"use client";

import Link from "next/link";
import Image from "next/image";

export default function CategorySection() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <h2 className="text-5xl font-extrabold text-center text-blue-700">
          SHOP BY CATEGORY
        </h2>

        <p className="text-center text-gray-500 mt-3 mb-14 text-lg">
          Find the latest mobiles, accessories and smart gadgets.
        </p>

        {/* ================= Row 1 ================= */}

        <div className="grid md:grid-cols-2 gap-8">

          {/* Smartphones */}
          <Link href="/mobiles">
            <div className="relative h-80 rounded-3xl overflow-hidden border-2 border-yellow-400 shadow-xl hover:scale-[1.02] transition">

              <Image
                src="/category/smartphones.jpg"
                alt="Smartphones"
                fill
                sizes="(max-width:768px) 100vw, 50vw"
                className="object-cover"
              />

              <div className="absolute inset-0 bg-black/40" />

              <div className="absolute inset-0 flex flex-col justify-center items-center text-center">

                <h3 className="text-5xl font-bold text-white">
                  Smartphones
                </h3>

                <p className="mt-4 text-white text-lg">
                  Apple • Samsung • Vivo • Oppo • Xiaomi
                </p>

              </div>

            </div>
          </Link>

          {/* Accessories */}
          <Link href="/accessories">
            <div className="relative h-80 rounded-3xl overflow-hidden border-2 border-yellow-400 shadow-xl hover:scale-[1.02] transition">

              <Image
                src="/category/accessories.jpg"
                alt="Accessories"
                fill
                sizes="(max-width:768px) 100vw, 50vw"
                className="object-cover"
              />

              <div className="absolute inset-0 bg-black/40" />

              <div className="absolute inset-0 flex flex-col justify-center items-center text-center">

                <h3 className="text-5xl font-bold text-white">
                  Accessories
                </h3>

                <p className="mt-4 text-white text-lg">
                  Covers • Chargers • Earbuds • Power Banks
                </p>

              </div>

            </div>
          </Link>

        </div>

        {/* ================= Row 2 ================= */}

        <div className="grid md:grid-cols-2 gap-8 mt-10">

          {/* Smart Gadgets */}
          <Link href="/smart-gadgets">
            <div className="relative h-80 rounded-3xl overflow-hidden border-2 border-yellow-400 shadow-xl hover:scale-[1.02] transition">

              <Image
                src="/category/smart-gadgets.jpg"
                alt="Smart Gadgets"
                fill
                sizes="(max-width:768px) 100vw, 50vw"
                className="object-cover"
              />

              <div className="absolute inset-0 bg-black/40" />

              <div className="absolute inset-0 flex flex-col justify-center items-center text-center">

                <h3 className="text-5xl font-bold text-white">
                  Smart Gadgets
                </h3>

                <p className="mt-4 text-white text-lg">
                  Tablets • Watches • Speakers • Gaming Gear
                </p>

              </div>

            </div>
          </Link>

          {/* Pre-Owned */}
          <Link href="/pre-owned">
            <div className="relative h-80 rounded-3xl overflow-hidden border-2 border-green-500 shadow-xl hover:scale-[1.02] transition">

              <Image
                src="/category/pre-owned.jpg"
                alt="Pre-Owned Phones"
                fill
                sizes="(max-width:768px) 100vw, 50vw"
                className="object-cover"
              />

              <div className="absolute inset-0 bg-black/40" />

              <div className="absolute inset-0 flex flex-col justify-center items-center text-center">

                <h3 className="text-4xl font-bold text-white">
                  ♻️ Certified
                </h3>

                <h3 className="text-4xl font-bold text-white">
                  Pre-Owned Phones
                </h3>

                <p className="mt-4 text-white text-lg">
                  Quality Checked • Warranty • Best Prices
                </p>

              </div>

            </div>
          </Link>

        </div>

        {/* ================= Offers Banner ================= */}

        <div className="mt-12">

          <Link href="/offers">

            <div className="relative h-72 rounded-3xl overflow-hidden shadow-xl hover:scale-[1.02] transition">

              <Image
                src="/category/offers.jpg"
                alt="Today's Offers"
                fill
                sizes="100vw"
                className="object-cover"
              />

              <div className="absolute inset-0 bg-black/40" />

              <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6">

                <h3 className="text-5xl font-bold text-white">
                  Today's Offers & Best Deals
                </h3>

                <p className="mt-4 text-white text-xl">
                  Festival Sale • Exchange Bonus • EMI Available
                </p>

              </div>

            </div>

          </Link>

        </div>

        {/* ================= NEW ARRIVALS ================= */}

        <div className="mt-12">

          <Link href="/new-arrivals">

            <div className="relative h-72 rounded-3xl overflow-hidden shadow-xl hover:scale-[1.02] transition">

              <Image
                src="/category/new-arrivals.jpg"
                alt="New Arrivals"
                fill
                sizes="100vw"
                className="object-cover"
              />

              <div className="absolute inset-0 bg-black/40" />

              <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6">

                <h3 className="text-5xl font-bold text-white">
                  NEW ARRIVALS
                </h3>

                <p className="mt-4 text-white text-xl">
                  Latest Smartphones • Accessories • Smart Gadgets
                </p>

              </div>

            </div>

          </Link>

        </div>

      </div>
    </section>
  );
}