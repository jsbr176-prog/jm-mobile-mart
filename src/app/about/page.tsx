import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <main className="pt-36 pb-20 bg-gray-50 min-h-screen">
        <div className="max-w-6xl mx-auto px-6">

          <h1 className="text-6xl font-extrabold text-center text-blue-700">
            ABOUT JM MOBILE MART
          </h1>

          <p className="text-center text-gray-600 mt-5 text-xl">
            Your trusted destination for smartphones, accessories,
            smart gadgets and certified pre-owned phones.
          </p>

          <div className="mt-16 bg-white rounded-3xl shadow-xl p-10">

            <h2 className="text-4xl font-bold text-yellow-500 mb-8">
              Who We Are
            </h2>

            <p className="text-lg leading-9 text-gray-700">
              JM Mobile Mart is your trusted destination for smartphones,
              accessories, smart gadgets and certified pre-owned phones.
              We provide genuine products, affordable pricing,
              reliable after-sales support and complete customer satisfaction.
            </p>

          </div>

          <div className="mt-10 bg-white rounded-3xl shadow-xl p-10">

            <h2 className="text-4xl font-bold text-blue-700 mb-8">
              Why Choose Us?
            </h2>

            <ul className="space-y-4 text-lg text-gray-700">
              <li>✅ 100% Genuine Smartphones</li>
              <li>✅ Best Prices & Offers</li>
              <li>✅ Premium Accessories</li>
              <li>✅ Smart Gadgets</li>
              <li>✅ Certified Pre-Owned Phones</li>
              <li>✅ Friendly Customer Support</li>
            </ul>

          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}