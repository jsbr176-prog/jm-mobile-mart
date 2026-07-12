"use client";

import { use, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  subcategory: string;
};

export default function SmartCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: slug } = use(params);

  const category = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      const q = query(
        collection(db, "products"),
        where("category", "==", "Smart Gadgets"),
        where("subcategory", "==", category)
      );

      const snapshot = await getDocs(q);

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Product, "id">),
      }));

      setProducts(data);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-100 pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6">

          <h1 className="text-5xl font-bold text-center mb-3">
            {category}
          </h1>

          <p className="text-center text-gray-500 mb-12">
            {products.length} Products
          </p>

          {loading && (
            <h2 className="text-center text-2xl">Loading...</h2>
          )}

          {!loading && products.length === 0 && (
            <h2 className="text-center text-2xl">No Products Found</h2>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-3xl shadow-xl overflow-hidden"
              >
                <Image
                  src={product.images?.[0] || "/placeholder.png"}
                  alt={product.title}
                  width={500}
                  height={500}
                  className="w-full h-72 object-cover"
                />

                <div className="p-5">

                  <h2 className="text-2xl font-bold">
                    {product.title}
                  </h2>

                  <p className="text-gray-500 mt-2">
                    {product.description}
                  </p>

                  <p className="text-yellow-600 text-3xl font-bold mt-4">
                    ₹{product.price}
                  </p>

                  <Link
                    href={`/product/${product.id}`}
                    className="block mt-5 bg-black text-white text-center py-3 rounded-xl font-bold"
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