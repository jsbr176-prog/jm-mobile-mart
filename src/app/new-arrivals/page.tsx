"use client";

import { useEffect, useState } from "react";
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

export default function NewArrivalsPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    const q = query(
      collection(db, "products"),
      where("newArrival", "==", true)
    );

    const snapshot = await getDocs(q);

    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Product, "id">),
    }));

    setProducts(data);
  }

  return (
    <>
      <Navbar />

      <main className="pt-32 min-h-screen bg-gray-100">

        <div className="max-w-7xl mx-auto px-6">

          <h1 className="text-5xl font-black mb-10">
            ⭐ New Arrivals
          </h1>

          <div className="grid md:grid-cols-4 gap-8">

            {products.map((product) => (

              <div
                key={product.id}
                className="bg-white rounded-3xl overflow-hidden shadow-xl"
              >

                <div className="relative h-72">

                  <Image
                    src={product.images[0]}
                    alt={product.title}
                    fill
                    className="object-cover"
                  />

                </div>

                <div className="p-5">

                  <h2 className="text-xl font-bold">
                    {product.title}
                  </h2>

                  <p className="text-gray-500">
                    {product.subcategory}
                  </p>

                  <p className="text-3xl font-bold text-yellow-600 mt-3">
                    ₹{product.price}
                  </p>

                  <Link
                    href={`/product/${product.id}`}
                    className="mt-5 block bg-black text-white text-center py-3 rounded-xl"
                  >
                    View Details
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