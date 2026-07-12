"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  doc,
  getDoc,
  collection,
  getDocs,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ProductPage() {
  const { id } = useParams();

  const [product, setProduct] = useState<any>(null);
  const [related, setRelated] = useState<any[]>([]);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    if (!id) return;

    async function loadProduct() {
      const ref = doc(db, "products", id as string);
      const snap = await getDoc(ref);

      if (!snap.exists()) return;

    const data: any = {
  id: snap.id,
  ...snap.data(),
};

      setProduct(data);

      if (data.images?.length) {
        setSelectedImage(data.images[0]);
      }

      const querySnapshot = await getDocs(collection(db, "products"));

      const list: any[] = querySnapshot.docs.map((d: any) => ({
  id: d.id,
  ...d.data(),
}));

const filtered = list.filter(
  (p: any) =>
    p.category === data.category &&
    p.id !== data.id
);

setRelated(filtered.slice(0, 4));
    }

    loadProduct();
  }, [id]);

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center text-3xl font-bold">
          Loading Product...
        </div>
        <Footer />
      </>
    );
  }

const whatsappNumber = "918727016663";

const website =
  typeof window !== "undefined"
    ? window.location.origin
    : "";

const productLink = `${website}/product/${product.id}`;

const message = `Hi JM Mobile Mart,

🛒 New Order Request

━━━━━━━━━━━━━━

📱 Product: ${product.title}

💰 Price: ₹${product.price}

📂 Category: ${product.category}

🏷️ Sub Category: ${product.subcategory}

━━━━━━━━━━━━━━

🔗 Product Link:
${productLink}

━━━━━━━━━━━━━━

Hello,

I would like to buy this product.

Please contact me with the availability and payment details.

Thank you.`;

const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
  message
)}`;

  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto pt-36 pb-20 px-6">

        <div className="grid lg:grid-cols-2 gap-12">

          {/* Images */}
          <div>

            <div className="border rounded-3xl overflow-hidden">

              <Image
                src={selectedImage}
                alt={product.title}
                width={700}
                height={700}
                className="w-full h-[500px] object-contain bg-white"
              />

            </div>

            <div className="flex gap-4 mt-5 flex-wrap">

              {product.images?.map((img: string) => (

                <button
                  key={img}
                  onClick={() => setSelectedImage(img)}
                >
                  <Image
                    src={img}
                    alt=""
                    width={90}
                    height={90}
                    className="rounded-xl border object-cover"
                  />
                </button>

              ))}

            </div>

          </div>

          {/* Details */}
          <div>

            <h1 className="text-5xl font-bold">
              {product.title}
            </h1>

            <p className="text-yellow-600 text-4xl font-bold mt-5">
              ₹{product.price}
            </p>

            <div className="mt-8 space-y-3">

              <p>
                <strong>Category:</strong> {product.category}
              </p>

              <p>
                <strong>Sub Category:</strong> {product.subcategory}
              </p>

              <p>
                <strong>Availability:</strong> In Stock
              </p>

              <p>
                <strong>Warranty:</strong> Manufacturer Warranty
              </p>

            </div>

            <div className="mt-10">

              <h2 className="text-2xl font-bold mb-3">
                Description
              </h2>

              <p className="text-gray-700 leading-8">
                {product.description}
              </p>

            </div>

            <a
              href={whatsappLink}
              target="_blank"
              className="block mt-10 bg-green-600 hover:bg-green-700 text-white text-center py-5 rounded-2xl text-2xl font-bold"
            >
              Buy on WhatsApp
            </a>

          </div>

        </div>

        {/* Related Products */}

        <div className="mt-24">

          <h2 className="text-4xl font-bold mb-10">
            Related Products
          </h2>

          <div className="grid md:grid-cols-4 gap-8">

            {related.map((item: any) => (

              <Link
                key={item.id}
                href={`/product/${item.id}`}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >

                <Image
                  src={item.images?.[0] || "/placeholder.png"}
                  alt={item.title}
                  width={400}
                  height={400}
                  className="w-full h-60 object-cover"
                />

                <div className="p-5">

                  <h3 className="font-bold text-xl">
                    {item.title}
                  </h3>

                  <p className="text-yellow-600 font-bold text-2xl mt-3">
                    ₹{item.price}
                  </p>

                </div>

              </Link>

            ))}

          </div>

        </div>

      </main>

      <Footer />
    </>
  );
}