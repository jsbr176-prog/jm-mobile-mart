"use client";

import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import { db } from "@/lib/firebase";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";

export default function PreOwnedPage() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const loadProducts = async () => {
      const q = query(
        collection(db, "products"),
        where("preOwned", "==", true)
      );

      const snapshot = await getDocs(q);

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setProducts(data);
    };

    loadProducts();
  }, []);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-100 pt-36 pb-20 px-6">
        <div className="max-w-7xl mx-auto">

          <h1 className="text-5xl font-bold text-center text-green-700">
            ♻️ Certified Pre-Owned Phones
          </h1>

          <p className="text-center text-gray-600 mt-4 mb-14">
            Quality Checked • Tested • Best Prices • Warranty Available
          </p>

          <div className="grid md:grid-cols-4 gap-8">

            {products.map((item) => (

              <div
                key={item.id}
                className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition"
              >

                {item.images?.[0] ? (
                  <Image
                    src={item.images[0]}
                    alt={item.title}
                    width={500}
                    height={500}
                    className="w-full h-60 object-cover"
                  />
                ) : (
                  <div className="h-60 bg-gray-200 flex items-center justify-center">
                    No Image
                  </div>
                )}

                <div className="p-6">

                  <h2 className="text-2xl font-bold">
                    {item.title}
                  </h2>

                  <p className="text-gray-500 mt-2">
                    {item.description}
                  </p>

                  <p className="text-green-600 text-2xl font-bold mt-4">
                    ₹{item.price}
                  </p>

                  <Link href={`/product/${item.id}`}>

                    <button className="w-full mt-5 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-bold">

                      View Product

                    </button>

                  </Link>

                </div>

              </div>

            ))}

          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}