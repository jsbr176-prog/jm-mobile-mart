"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { name: "Home", href: "/" },
    { name: "Mobiles", href: "/mobiles" },
    { name: "Accessories", href: "/accessories" },
    { name: "Smart Gadgets", href: "/smart-gadgets" },
    { name: "Offers", href: "/offers" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-xl transition-all duration-300 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-4">
          <Image
            src="/logo/jm-logo.png"
            alt="JM Mobile Mart"
            width={scrolled ? 55 : 70}
            height={scrolled ? 55 : 70}
            priority
            className="rounded-xl shadow-lg"
          />

          <div>
            <h1
              className={`font-black leading-none tracking-wide transition-all duration-300 ${
                scrolled ? "text-3xl" : "text-5xl"
              } bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-600 bg-clip-text text-transparent`}
            >
              JM Mobile Mart
            </h1>

            <p
              className={`text-gray-500 transition-all duration-300 ${
                scrolled ? "text-xs" : "text-lg"
              }`}
            >
              Smartphones • Accessories • Smart Gadgets
            </p>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="relative font-semibold text-gray-800 hover:text-yellow-600 transition duration-300 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-yellow-500 after:transition-all hover:after:w-full"
            >
              {link.name}
            </Link>
          ))}

          {/* Admin Button */}
          <Link
            href="/admin"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2 rounded-xl shadow-lg transition duration-300"
          >
            Admin
          </Link>
        </nav>

      </div>
    </header>
  );
}