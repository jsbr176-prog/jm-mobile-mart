"use client";

import { use, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { db } from "@/lib/firebase";

import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  subcategory: string;
  newArrival?: boolean;
};

export default function BrandPage({
  params,
}: {
  params: Promise<{ brand: string }>;
}) {
  const { brand: slug } = use(params);

  const brandMap: Record<string, string> = {
  apple: "Apple",
  samsung: "Samsung",
  vivo: "Vivo",
  oppo: "Oppo",
  realme: "Realme",
  xiaomi: "Xiaomi",
  oneplus: "OnePlus",
  nothing: "Nothing",
  iqoo: "iQOO",
  poco: "Poco",
  motorola: "Motorola",
  nokia: "Nokia",
  infinix: "Infinix",
  tecno: "Tecno",
  honor: "Honor",
  huawei: "Huawei",
  "google-pixel": "Google Pixel",
  "ai-plus": "AI+",
};

const brand = brandMap[slug] || slug;

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      const q = query(
        collection(db, "products"),
        where("category", "==", "Mobiles"),
        where("subcategory", "==", brand)
      );

      const snapshot = await getDocs(q);

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Product, "id">),
      }));

      setProducts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-100 pt-28">

        <div className="max-w-7xl mx-auto px-6">

          {/* Hero Banner */}

          <div className="relative h-[350px] rounded-3xl overflow-hidden shadow-xl">

            <Image
              src="/banners/mobile-banner.jpg"
              alt={brand}
              fill
              priority
              className="object-cover"
            />

            <div className="absolute inset-0 bg-black/50" />

            <div className="absolute inset-0 flex flex-col items-center justify-center">
                              <h1 className="text-6xl font-black text-white">
                {brand}
              </h1>

              <p className="text-2xl text-white mt-4">
                Latest {brand} Smartphones
              </p>

            </div>

          </div>

          <div className="flex justify-between items-center mt-10">

            <h2 className="text-4xl font-bold">
              {brand} Collection
            </h2>

            <span className="bg-black text-white px-5 py-2 rounded-full">
              {products.length} Products
            </span>

          </div>

          {loading && (

            <div className="text-center py-20 text-2xl">
              Loading Products...
            </div>

          )}

          {!loading && products.length === 0 && (

            <div className="text-center py-20">

              <h2 className="text-4xl font-bold">
                No Products Found
              </h2>

              <p className="text-gray-500 mt-3">
                Upload products from Admin Panel.
              </p>

            </div>

          )}

          {!loading && products.length > 0 && (

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">

              {products.map((product) => (

                <div
                  key={product.id}
                  className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition duration-300"
                >

                  <div className="relative h-72">

                    <Image
                      src={product.images?.[0] || "/placeholder.png"}
                      alt={product.title}
                      fill
                      sizes="(max-width:768px) 100vw, 25vw"
                      className="object-cover hover:scale-105 transition duration-300"
                    />

                    {product.newArrival && (

                      <span className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                        ⭐ New Arrival
                      </span>

                    )}
                                      </div>

                  <div className="p-5">

                    <h3 className="text-xl font-bold line-clamp-2">
                      {product.title}
                    </h3>

                    <p className="text-gray-500 mt-2">
                      {product.subcategory}
                    </p>

                    <p className="text-3xl font-bold text-yellow-600 mt-4">
                      ₹{product.price.toLocaleString()}
                    </p>

                    <p className="text-gray-600 mt-4 line-clamp-3">
                      {product.description}
                    </p>

                  <Link
  href={`/product/${product.id}`}
>
  <button className="mt-6 w-full bg-black hover:bg-gray-800 text-white py-3 rounded-xl font-bold transition">
    View Details
  </button>
</Link>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      </main>

      <Footer />

    </>
  );
}