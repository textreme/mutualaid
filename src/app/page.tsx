"use client";

import Link from "next/link";
import Image from "next/image";
import Footer from "@/app/components/Footer";

export default function Home() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Link
          href="/cawildfires"
          className="px-4 py-2 bg-white text-black font-bold rounded hover:bg-red-200 transition"
        >
          CA Wildfires
        </Link>
      </main>
      <Footer /> {/* Reusable Footer Component */}
    </div>
  );
}
