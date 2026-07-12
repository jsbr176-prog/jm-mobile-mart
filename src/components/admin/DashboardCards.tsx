"use client";

import { useEffect, useState } from "react";
import {
  Smartphone,
  Headphones,
  Cpu,
  Image,
  Star,
  RefreshCcw,
} from "lucide-react";

import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

export default function DashboardCards() {
  const [cards, setCards] = useState([
    {
      title: "Mobiles",
      total: 0,
      icon: Smartphone,
      color: "bg-blue-500",
    },
    {
      title: "Accessories",
      total: 0,
      icon: Headphones,
      color: "bg-green-500",
    },
    {
      title: "Smart Gadgets",
      total: 0,
      icon: Cpu,
      color: "bg-purple-500",
    },
    {
      title: "Banners",
      total: 0,
      icon: Image,
      color: "bg-orange-500",
    },
    {
      title: "Featured",
      total: 0,
      icon: Star,
      color: "bg-yellow-500",
    },
    {
      title: "Pre-Owned",
      total: 0,
      icon: RefreshCcw,
      color: "bg-red-500",
    },
  ]);

  useEffect(() => {
    loadCounts();
  }, []);

  async function loadCounts() {
    try {
      const mobiles = await getDocs(
        query(collection(db, "products"), where("category", "==", "Mobiles"))
      );

      const accessories = await getDocs(
        query(collection(db, "products"), where("category", "==", "Accessories"))
      );

      const gadgets = await getDocs(
        query(collection(db, "products"), where("category", "==", "Smart Gadgets"))
      );

      const featured = await getDocs(
        query(collection(db, "products"), where("featured", "==", true))
      );

      const preOwned = await getDocs(
        query(collection(db, "products"), where("preOwned", "==", true))
      );

      setCards([
        {
          title: "Mobiles",
          total: mobiles.size,
          icon: Smartphone,
          color: "bg-blue-500",
        },
        {
          title: "Accessories",
          total: accessories.size,
          icon: Headphones,
          color: "bg-green-500",
        },
        {
          title: "Smart Gadgets",
          total: gadgets.size,
          icon: Cpu,
          color: "bg-purple-500",
        },
        {
          title: "Banners",
          total: 0,
          icon: Image,
          color: "bg-orange-500",
        },
        {
          title: "Featured",
          total: featured.size,
          icon: Star,
          color: "bg-yellow-500",
        },
        {
          title: "Pre-Owned",
          total: preOwned.size,
          icon: RefreshCcw,
          color: "bg-red-500",
        },
      ]);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="bg-white rounded-xl shadow p-6 flex justify-between items-center"
          >
            <div>
              <p className="text-gray-500">{card.title}</p>

              <h2 className="text-4xl font-bold mt-2">
                {card.total}
              </h2>
            </div>

            <div className={`${card.color} p-4 rounded-xl text-white`}>
              <Icon size={30} />
            </div>
          </div>
        );
      })}
    </div>
  );
}