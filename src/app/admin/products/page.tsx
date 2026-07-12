"use client";

import { useEffect, useMemo, useState } from "react";

import AuthGuard from "@/components/AuthGuard";
import Sidebar from "@/components/admin/Sidebar";
import Topbar from "@/components/admin/Topbar";

import { db } from "@/lib/firebase";

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";

const categoryData = {
  Mobiles: [
    "Apple",
    "Samsung",
    "Vivo",
    "Oppo",
    "Realme",
    "Xiaomi",
    "OnePlus",
    "Nothing",
    "Motorola",
    "Google Pixel",
    "iQOO",
    "Poco",
    "Honor",
    "Nokia",
  ],

  Accessories: [
    "Chargers",
    "Earbuds",
    "Neckbands",
    "Power Banks",
    "Tempered Glass",
    "Mobile Covers",
    "Data Cables",
    "Memory Cards",
    "OTG Adapter",
  ],

  "Smart Gadgets": [
    "Smart Watches",
    "Bluetooth Speakers",
    "Tablets",
    "Projectors",
    "Gaming Gear",
    "Ring Lights",
    "Drones",
  ],

  "Pre-Owned": [
    "Used Mobiles",
  ],
};

export default function ProductsPage() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const [images, setImages] = useState<File[]>([]);

  const [uploading, setUploading] = useState(false);

  const [newArrival, setNewArrival] = useState(false);
  const [offer, setOffer] = useState(false);

const [featured, setFeatured] = useState(false);

const [preOwned, setPreOwned] = useState(false);

  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    const snapshot = await getDocs(
      collection(db, "products")
    );

    const data = snapshot.docs.map((item) => ({
      id: item.id,
      ...item.data(),
    }));

    setProducts(data);
  }

  async function deleteProduct(id: string) {
    if (!confirm("Delete this product?")) return;

    await deleteDoc(doc(db, "products", id));

    loadProducts();
  }

  const subcategories = useMemo(() => {
    return (
      categoryData[
        category as keyof typeof categoryData
      ] || []
    );
  }, [category]);

  function handleImages(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    if (!e.target.files) return;

    const files = Array.from(e.target.files);

    if (files.length > 6) {
      alert("Maximum 6 images allowed");
      return;
    }

    setImages(files);
  }

  async function uploadProduct() {
    try {
      setUploading(true);

      if (!title) {
        setUploading(false);
        return alert("Enter product title");
      }

      if (!category) {
        setUploading(false);
        return alert("Select category");
      }

      if (!subcategory) {
        setUploading(false);
        return alert("Select subcategory");
      }

      if (!price) {
        setUploading(false);
        return alert("Enter price");
      }

      if (images.length === 0) {
        setUploading(false);
        return alert("Select at least one image");
      }

      const imageUrls: string[] = [];

      for (const image of images) {
        const formData = new FormData();

        formData.append("file", image);

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();

        if (data.success) {
          imageUrls.push(data.url);
        }
      }
await addDoc(collection(db, "products"), {
  title,
  description,
  category,
  subcategory,
  price,
  images: imageUrls,

  // Visibility
  newArrival: newArrival,
  offer: offer,
  featured: featured,
  preOwned: preOwned,

  createdAt: serverTimestamp(),
});
      alert("✅ Product Uploaded Successfully");

      setTitle("");
      setCategory("");
      setSubcategory("");
      setPrice("");
      setDescription("");
      setImages([]);
     setNewArrival(false);
setOffer(false);
setFeatured(false);
setPreOwned(false);

      loadProducts();

    } catch (error) {
      console.error(error);
      alert("Upload Failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <AuthGuard>
      <div className="flex min-h-screen bg-gray-100">

        <Sidebar />

        <div className="flex-1">

          <Topbar />

          <main className="p-8">

            <div className="bg-white rounded-2xl shadow-lg p-8">

              <h1 className="text-3xl font-bold">
                Add New Product
              </h1>

              <p className="text-gray-500 mt-2 mb-8">
                Fill product information below.
              </p>

              <div className="grid md:grid-cols-2 gap-6">

                {/* Product Title */}

                <div>
                  <label className="font-semibold block mb-2">
                    Product Title
                  </label>

                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="iPhone 17 Pro Max"
                    className="w-full border rounded-xl p-3"
                  />
                </div>

                {/* Category */}

                <div>
                  <label className="font-semibold block mb-2">
                    Category
                  </label>

                  <select
                    value={category}
                    onChange={(e) => {
                      setCategory(e.target.value);
                      setSubcategory("");
                    }}
                    className="w-full border rounded-xl p-3"
                  >
                    <option value="">
                      Select Category
                    </option>

                    {Object.keys(categoryData).map((item) => (
                      <option
                        key={item}
                        value={item}
                      >
                        {item}
                      </option>
                    ))}

                  </select>
                </div>

                {/* Sub Category */}

                <div>
                  <label className="font-semibold block mb-2">
                    Sub Category
                  </label>

                  <select
                    value={subcategory}
                    onChange={(e) =>
                      setSubcategory(e.target.value)
                    }
                    disabled={!category}
                    className="w-full border rounded-xl p-3"
                  >
                    <option value="">
                      Select Sub Category
                    </option>

                    {subcategories.map((item) => (
                      <option
                        key={item}
                        value={item}
                      >
                        {item}
                      </option>
                    ))}

                  </select>
                </div>

                {/* Price */}

                <div>
                  <label className="font-semibold block mb-2">
                    Price (₹)
                  </label>

                  <input
                    type="number"
                    value={price}
                    onChange={(e) =>
                      setPrice(e.target.value)
                    }
                    placeholder="129999"
                    className="w-full border rounded-xl p-3"
                  />
                </div>

                {/* Product Visibility */}

<div className="md:col-span-2">

  <label className="font-semibold block mb-4 text-lg">
    Product Visibility
  </label>

  <div className="grid md:grid-cols-2 gap-4">

    <label className="flex items-center gap-3 border rounded-xl p-4 cursor-pointer hover:bg-gray-50">

      <input
        type="checkbox"
        checked={newArrival}
        onChange={(e) => setNewArrival(e.target.checked)}
      />

      <span className="font-medium">
        ⭐ Show in New Arrivals
      </span>

    </label>

    <label className="flex items-center gap-3 border rounded-xl p-4 cursor-pointer hover:bg-gray-50">

      <input
        type="checkbox"
        checked={offer}
        onChange={(e) => setOffer(e.target.checked)}
      />

      <span className="font-medium">
        🔥 Show in Offers
      </span>

    </label>

    <label className="flex items-center gap-3 border rounded-xl p-4 cursor-pointer hover:bg-gray-50">

      <input
        type="checkbox"
        checked={featured}
        onChange={(e) => setFeatured(e.target.checked)}
      />

      <span className="font-medium">
        ⭐ Show in Featured
      </span>

    </label>

    <label className="flex items-center gap-3 border rounded-xl p-4 cursor-pointer hover:bg-gray-50">

      <input
        type="checkbox"
        checked={preOwned}
        onChange={(e) => setPreOwned(e.target.checked)}
      />

      <span className="font-medium">
        ♻ Show in Pre-Owned
      </span>

    </label>

  </div>

</div>
                                {/* Product Description */}

                <div className="md:col-span-2">

                  <label className="font-semibold block mb-2">
                    Product Description
                  </label>

                  <textarea
                    rows={6}
                    value={description}
                    onChange={(e) =>
                      setDescription(e.target.value)
                    }
                    placeholder="Write product description..."
                    className="w-full border rounded-xl p-3"
                  />

                </div>

                {/* Upload Images */}

                <div className="md:col-span-2">

                  <label className="font-semibold block mb-3">
                    Upload Images (Maximum 6)
                  </label>

                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImages}
                    className="block"
                  />

                  <p className="text-gray-500 text-sm mt-2">
                    Selected Images: {images.length} / 6
                  </p>

                  {images.length > 0 && (

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-6">

                      {images.map((image, index) => (

                        <div
                          key={index}
                          className="border rounded-xl p-2 bg-gray-50"
                        >

                          <img
                            src={URL.createObjectURL(image)}
                            alt="Preview"
                            className="w-full h-28 object-cover rounded-lg"
                          />

                          <p className="text-xs mt-2 truncate">
                            {image.name}
                          </p>

                        </div>

                      ))}

                    </div>

                  )}

                </div>

                {/* Upload Button */}

                <div className="md:col-span-2 flex justify-end">

                  <button
                    onClick={uploadProduct}
                    disabled={uploading}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold px-10 py-3 rounded-xl"
                  >
                    {uploading
                      ? "Uploading..."
                      : "Upload Product"}
                  </button>

                </div>

              </div>

            </div>

            {/* Manage Products */}

            <div className="mt-10 bg-white rounded-2xl shadow-lg p-8">

              <h2 className="text-3xl font-bold mb-8">
                Manage Products
              </h2>

              {products.length === 0 ? (

                <p className="text-gray-500">
                  No products found.
                </p>

              ) : (

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

                  {products.map((product) => (

                    <div
                      key={product.id}
                      className="border rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition"
                    >

                      <img
                        src={product.images?.[0]}
                        alt={product.title}
                        className="w-full h-60 object-cover"
                      />

                      <div className="p-5">

                        <h3 className="text-xl font-bold">
                          {product.title}
                        </h3>

                        <p className="text-gray-500 mt-2">
                          {product.category}
                        </p>

                        <p className="text-gray-500">
                          {product.subcategory}
                        </p>

                        <p className="text-yellow-600 font-bold text-xl mt-3">
                          ₹{product.price}
                        </p>

                        {product.newArrival && (
                          <span className="inline-block mt-3 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                            ⭐ New Arrival
                          </span>
                        )}

                        <p className="text-gray-600 mt-4 line-clamp-3">
                          {product.description}
                        </p>

                        <button
                          onClick={() =>
                            deleteProduct(product.id)
                          }
                          className="mt-6 w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-bold"
                        >
                          🗑 Delete Product
                        </button>

                      </div>

                    </div>

                  ))}

                </div>

              )}

            </div>

          </main>

        </div>

      </div>

    </AuthGuard>
  );
}