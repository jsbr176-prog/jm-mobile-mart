"use client";

import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  ExternalLink,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-white mt-16">
      <div className="max-w-7xl mx-auto px-6 py-14">

        <div className="grid md:grid-cols-3 gap-10">

          {/* Shop Info */}
          <div>
            <h2 className="text-3xl font-bold text-yellow-400">
              JM Mobile Mart
            </h2>

            <p className="mt-4 text-gray-300 leading-7">
              Your trusted destination for smartphones,
              accessories, smart gadgets, and certified
              pre-owned phones.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-2xl font-semibold text-yellow-400 mb-6">
              Contact Us
            </h3>

            <div className="space-y-5">

              <div className="flex items-center gap-3">
                <Phone className="text-green-400" size={22} />

                <a
                  href="tel:+918727016663"
                  className="hover:text-yellow-400 transition"
                >
                  +91 87270 16663
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="text-red-400" size={22} />

                <a
                  href="mailto:jsbr176@gmail.com"
                  className="hover:text-yellow-400 transition"
                >
                  jsbr176@gmail.com
                </a>
              </div>

            </div>
          </div>

          {/* Location */}
          <div>

            <h3 className="text-2xl font-semibold text-yellow-400 mb-6">
              Our Location
            </h3>

            <div className="flex items-start gap-3">

              <MapPin
                className="text-blue-400 mt-1"
                size={22}
              />

              <div>

                <p className="text-gray-300 leading-7">
                  Bhangala,<br />
                  Mukerian,<br />
                  Punjab 144306
                </p>

                <Link
                  href="https://maps.app.goo.gl/ssoJJedGrQquP4kU7"
                  target="_blank"
                  className="inline-flex items-center gap-2 mt-5 bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-xl transition"
                >
                  Open in Google Maps

                  <ExternalLink size={18} />
                </Link>

              </div>

            </div>

          </div>

        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
          © 2026 JM Mobile Mart • All Rights Reserved
        </div>

      </div>
    </footer>
  );
}