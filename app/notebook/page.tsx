"use client";

import Link from "next/link";
import { FaCamera, FaBook, FaArrowRight } from "react-icons/fa";

export default function NotebookPage() {
  return (
    <main className="w-full bg-white text-gray-800 min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white w-full py-32 px-6 sm:px-10 lg:px-16">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl font-bold mb-6 tracking-tight">
            My Notebook
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            A space for my photography and personal reflections
          </p>
        </div>
      </section>

      {/* Cards */}
      <section className="w-full py-24 px-6 sm:px-10 lg:px-16">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Photography Card */}
          <Link href="/notebook/photography" className="group">
            <div className="relative h-80 rounded-2xl overflow-hidden shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-700 to-gray-900 group-hover:scale-105 transition-transform duration-500" />
              <div className="relative z-10 h-full flex flex-col items-center justify-center text-white p-8">
                <FaCamera size={48} className="mb-6 opacity-80" />
                <h2 className="text-3xl font-bold mb-3 tracking-wide">
                  Photography
                </h2>
                <p className="text-gray-300 text-center mb-6 max-w-xs">
                  Browse my photography collection — filtered by category
                </p>
                <span className="flex items-center gap-2 text-sm tracking-wider uppercase text-gray-400 group-hover:text-white transition-colors">
                  View Gallery <FaArrowRight />
                </span>
              </div>
            </div>
          </Link>

          {/* Journal Card */}
          <Link href="/notebook/journal" className="group">
            <div className="relative h-80 rounded-2xl overflow-hidden shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-900 group-hover:scale-105 transition-transform duration-500" />
              <div className="relative z-10 h-full flex flex-col items-center justify-center text-white p-8">
                <FaBook size={48} className="mb-6 opacity-80" />
                <h2 className="text-3xl font-bold mb-3 tracking-wide">
                  Journal
                </h2>
                <p className="text-gray-300 text-center mb-6 max-w-xs">
                  Personal thoughts, reflections, and diary entries
                </p>
                <span className="flex items-center gap-2 text-sm tracking-wider uppercase text-gray-400 group-hover:text-white transition-colors">
                  Read Entries <FaArrowRight />
                </span>
              </div>
            </div>
          </Link>
        </div>
      </section>
    </main>
  );
}
