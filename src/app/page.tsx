import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CategorySection from "@/components/CategorySection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <>
      {/* Fixed Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="pt-28 bg-white min-h-screen">

        {/* Hero Banner */}
        <Hero />

        {/* Shop by Category */}
        <CategorySection />

        {/* WhatsApp Floating Button */}
        <WhatsAppButton />

        {/* Footer */}
        <Footer />

      </main>
    </>
  );
}