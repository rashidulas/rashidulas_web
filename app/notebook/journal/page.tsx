"use client";

import { notebookEntries } from "@/data/notebook";
import { FaCalendar, FaTags } from "react-icons/fa";

export default function JournalPage() {
  const journals = notebookEntries.filter((e) => e.type === "journal");

  return (
    <main className="w-full bg-white text-gray-800 min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-900 text-white w-full py-32 px-6 sm:px-10 lg:px-16">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl font-bold mb-6 tracking-tight">
            Journal
          </h1>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto">
            Personal thoughts, reflections, and diary entries
          </p>
        </div>
      </section>

      {/* Journal Entries */}
      <section className="w-full py-16 px-6 sm:px-10 lg:px-16">
        <div className="max-w-3xl mx-auto">
          {journals.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">
                No journal entries yet.
              </p>
            </div>
          ) : (
            <div className="space-y-10">
              {journals.map((entry) => (
                <article
                  key={entry.id}
                  className="border-b border-gray-200 pb-10 last:border-0"
                >
                  <div className="flex items-center gap-3 text-xs text-gray-500 mb-4">
                    <FaCalendar size={12} />
                    {new Date(entry.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>

                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {entry.title}
                  </h2>

                  {entry.description && (
                    <p className="text-gray-500 mb-4 italic">
                      {entry.description}
                    </p>
                  )}

                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {entry.content}
                  </p>

                  {entry.tags && (
                    <div className="flex items-center gap-2 text-xs text-gray-400 mt-6">
                      <FaTags size={12} />
                      {entry.tags
                        .split(",")
                        .map((t) => t.trim())
                        .map((tag) => (
                          <span
                            key={tag}
                            className="bg-gray-100 px-2 py-1 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                    </div>
                  )}
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
