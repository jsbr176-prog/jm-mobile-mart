"use client";

import { useEffect, useState } from "react";
import AuthGuard from "@/components/AuthGuard";
import Sidebar from "@/components/admin/Sidebar";
import Topbar from "@/components/admin/Topbar";

import { db } from "@/lib/firebase";
import {
  addDoc,
  collection,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

export default function BannersPage() {
  const [image, setImage] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [banners, setBanners] = useState<any[]>([]);

  useEffect(() => {
    loadBanners();
  }, []);

  async function loadBanners() {
    const snapshot = await getDocs(collection(db, "banners"));

    const data = snapshot.docs.map((item) => ({
      id: item.id,
      ...item.data(),
    }));

    setBanners(data);
  }

  async function uploadBanner() {
    try {
      if (!image) {
        alert("Please select a banner.");
        return;
      }

      setUploading(true);

      const formData = new FormData();
      formData.append("file", image);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error("Upload failed");
      }

      await addDoc(collection(db, "banners"), {
        image: data.url,
        createdAt: new Date(),
      });

      alert("✅ Banner Uploaded Successfully");

      setImage(null);

      loadBanners();
    } catch (error) {
      console.error(error);
      alert("Banner Upload Failed");
    } finally {
      setUploading(false);
    }
  }

  async function deleteBanner(id: string) {
    const confirmDelete = confirm(
      "Are you sure you want to delete this banner?"
    );

    if (!confirmDelete) return;

    await deleteDoc(doc(db, "banners", id));

    loadBanners();
  }

  return (
    <AuthGuard>
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />

        <div className="flex-1">
          <Topbar />

          <main className="p-8">
            <h1 className="text-3xl font-bold mb-8">
              Banner Management
            </h1>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-xl font-semibold mb-6">
                Upload Banner
              </h2>

              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    setImage(e.target.files[0]);
                  }
                }}
              />

              {image && (
                <div className="mt-6">
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Preview"
                    className="w-full max-w-2xl rounded-xl border"
                  />
                </div>
              )}

              <button
                onClick={uploadBanner}
                disabled={uploading}
                className="mt-6 bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3 rounded-xl font-bold"
              >
                {uploading ? "Uploading..." : "Upload Banner"}
              </button>

              <hr className="my-10" />

              <h2 className="text-2xl font-bold mb-6">
                Uploaded Banners
              </h2>

              {banners.length === 0 ? (
                <p className="text-gray-500">
                  No banners uploaded yet.
                </p>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {banners.map((banner) => (
                    <div
                      key={banner.id}
                      className="bg-gray-50 border rounded-xl p-4 shadow"
                    >
                      <img
                        src={banner.image}
                        alt="Banner"
                        className="w-full h-56 object-cover rounded-lg"
                      />

                      <button
                        onClick={() => deleteBanner(banner.id)}
                        className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-bold"
                      >
                        🗑 Delete Banner
                      </button>
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