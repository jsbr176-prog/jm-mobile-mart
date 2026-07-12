"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  images?: string[];
};

export default function OffersPage() {
  const [offers, setOffers] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOffers();
  }, []);

  async function loadOffers() {
    try {
      const q = query(
        collection(db, "products"),
        where("offer", "==", true)
      );

      const snapshot = await getDocs(q);

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Product, "id">),
      }));

      setOffers(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-100 pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6">

          <h1 className="text-5xl font-bold text-center text-blue-700 mb-12">
            TODAY'S OFFERS
          </h1>

          {loading ? (
            <h2 className="text-center text-2xl">
              Loading...
            </h2>
          ) : offers.length === 0 ? (
            <h2 className="text-center text-2xl">
              No Offers Found
            </h2>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

              {offers.map((item) => (

                <div
                  key={item.id}
                  className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition"
                >

                  {item.images &&
                  item.images.length > 0 &&
                  item.images[0] ? (

                    <Image
                      src={item.images[0]}
                      alt={item.title}
                      width={500}
                      height={500}
                      className="w-full h-72 object-cover"
                    />

                  ) : (

                    <div className="w-full h-72 bg-gray-200 flex items-center justify-center text-gray-500">
                      No Image
                    </div>

                  )}

                  <div className="p-5">

                    <h2 className="text-2xl font-bold">
                      {item.title}
                    </h2>

                    <p className="text-gray-500 mt-3 line-clamp-2">
                      {item.description}
                    </p>

                    <p className="text-yellow-600 text-3xl font-bold mt-4">
                      ₹{item.price}
                    </p>

                    <Link
                      href={`/product/${item.id}`}
                      className="block mt-6 bg-yellow-500 hover:bg-yellow-600 text-white text-center py-3 rounded-xl font-bold"
                    >
                      View Offer
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