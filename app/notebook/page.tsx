"use client";

import { useState } from "react";
import { notebookEntries } from "@/data/notebook";
import { FaCamera, FaBook, FaCalendar, FaTags } from "react-icons/fa";

export default function NotebookPage() {
  const [activeTab, setActiveTab] = useState<"all" | "photography" | "journal">(
    "all"
  );

  const filteredEntries =
    activeTab === "all"
      ? notebookEntries
      : notebookEntries.filter((entry) => entry.type === activeTab);

  return (
    <main className="w-full bg-white text-gray-800 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white w-full py-32 px-6 sm:px-10 lg:px-16">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl font-bold mb-6">My Notebook</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            A collection of my photography and personal journals
          </p>
        </div>
      </section>

      {/* Tab Selection */}
      <section className="bg-gray-50 w-full py-8 px-6 sm:px-10 lg:px-16 border-b">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center gap-4 flex-wrap">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2 ${
                activeTab === "all"
                  ? "bg-black text-white shadow-lg"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
              }`}
            >
              <FaBook />
              All
            </button>
            <button
              onClick={() => setActiveTab("photography")}
              className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2 ${
                activeTab === "photography"
                  ? "bg-black text-white shadow-lg"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
              }`}
            >
              <FaCamera />
              Photography
            </button>
            <button
              onClick={() => setActiveTab("journal")}
              className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2 ${
                activeTab === "journal"
                  ? "bg-black text-white shadow-lg"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
              }`}
            >
              <FaBook />
              Journal
            </button>
          </div>
        </div>
      </section>

      {/* Entries Grid */}
      <section className="w-full py-16 px-6 sm:px-10 lg:px-16">
        <div className="max-w-7xl mx-auto">
          {filteredEntries.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">No entries found.</p>
            </div>
          ) : (
            <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {filteredEntries.map((entry) => (
                <div
                  key={entry.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-200"
                >
                  {/* Image for Photography */}
                  {entry.type === "photography" && entry.imageUrl && (
                    <div className="relative h-64 bg-gray-200">
                      <img
                        src={entry.imageUrl}
                        alt={entry.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 right-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                        <FaCamera size={12} />
                        Photography
                      </div>
                    </div>
                  )}

                  {/* Journal Badge */}
                  {entry.type === "journal" && (
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6">
                      <div className="flex items-center justify-center text-white">
                        <FaBook size={32} />
                      </div>
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                      <FaCalendar size={12} />
                      {new Date(entry.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>

                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {entry.title}
                    </h3>

                    {entry.description && (
                      <p className="text-sm text-gray-600 mb-3">
                        {entry.description}
                      </p>
                    )}

                    <p className="text-gray-700 mb-4 line-clamp-3">
                      {entry.content}
                    </p>

                    {entry.tags && (
                      <div className="flex items-start gap-2 text-xs text-gray-500">
                        <FaTags size={12} className="mt-0.5" />
                        <span>{entry.tags}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
