import Link from "next/link";
import Navbar from "@/components/Navbar";

const brands = [
  { name: "Apple", slug: "apple" },
  { name: "Samsung", slug: "samsung" },
  { name: "Vivo", slug: "vivo" },
  { name: "Oppo", slug: "oppo" },
  { name: "Realme", slug: "realme" },
  { name: "Xiaomi", slug: "xiaomi" },
  { name: "OnePlus", slug: "oneplus" },
  { name: "Nothing", slug: "nothing" },
  { name: "iQOO", slug: "iqoo" },
  { name: "Poco", slug: "poco" },
  { name: "Motorola", slug: "motorola" },
  { name: "Nokia", slug: "nokia" },
  { name: "Honor", slug: "honor" },
  { name: "Huawei", slug: "huawei" },
  { name: "Infinix", slug: "infinix" },
  { name: "Tecno", slug: "tecno" },
  { name: "Google Pixel", slug: "google-pixel" },
  { name: "AI+", slug: "ai-plus" },
];

export default function MobilesPage() {
  return (
    <>
      <Navbar />

      <main className="pt-32 min-h-screen bg-gray-100">
        <div className="max-w-7xl mx-auto px-6">

          <h1 className="text-5xl font-bold text-center mb-10">
            Shop By Brand
          </h1>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

            {brands.map((brand) => (
              <Link
                key={brand.slug}
                href={`/mobiles/${brand.slug}`}
                className="bg-white rounded-2xl shadow-lg p-10 text-center hover:scale-105 transition"
              >
                <h2 className="text-2xl font-bold">
                  {brand.name}
                </h2>
              </Link>
            ))}

          </div>

        </div>
      </main>
    </>
  );
}