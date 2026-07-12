"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
} from "firebase/firestore";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function Hero() {
  const [slides, setSlides] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBanners() {
      try {
        const snapshot = await getDocs(collection(db, "banners"));

        const bannerList = snapshot.docs.map(
          (doc) => doc.data().image as string
        );

        setSlides(bannerList);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadBanners();
  }, []);

  if (loading) {
    return (
      <section className="pt-28 bg-gray-100">
        <div className="max-w-7xl mx-auto h-[550px] flex items-center justify-center">
          <h2 className="text-2xl font-bold">
            Loading Banners...
          </h2>
        </div>
      </section>
    );
  }

  if (slides.length === 0) {
    return (
      <section className="pt-28 bg-gray-100">
        <div className="max-w-7xl mx-auto h-[550px] flex items-center justify-center">
          <h2 className="text-2xl font-bold text-red-500">
            No Banners Uploaded
          </h2>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-28 bg-gray-100">
      <div className="max-w-7xl mx-auto px-6">

        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          loop={true}
          pagination={{ clickable: true }}
          navigation
          className="rounded-3xl overflow-hidden shadow-2xl"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="relative h-[550px]">

                <Image
                  src={slide}
                  alt={`Banner ${index + 1}`}
                  fill
                  priority={index === 0}
                  sizes="100vw"
                  className="object-cover"
                />

                <div className="absolute inset-0 bg-black/30" />

                <div className="absolute left-10 bottom-10">

                  <h1 className="text-5xl font-extrabold text-white">
                    JM Mobile Mart
                  </h1>

                  <p className="mt-3 text-xl text-white">
                    Latest Smartphones • Accessories • Smart Gadgets
                  </p>

                  <div className="mt-8 flex gap-4">

                    <Link
                      href="/mobiles"
                      className="bg-yellow-500 hover:bg-yellow-600 text-black px-7 py-3 rounded-xl font-bold"
                    >
                      Shop Now
                    </Link>

                    <Link
                      href="/contact"
                      className="bg-white text-black px-7 py-3 rounded-xl font-bold"
                    >
                      Contact Us
                    </Link>

                  </div>

                </div>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  );
}