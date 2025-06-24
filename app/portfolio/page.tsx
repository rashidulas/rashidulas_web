"use client";

import { useState } from "react";
import { projects } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";

export default function PortfolioPage() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const allTags = Array.from(
    new Set(
      projects.flatMap(
        (p) => p.tags?.split(",").map((tag) => tag.trim().toLowerCase()) || []
      )
    )
  );

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const filteredProjects = selectedTags.length
    ? projects.filter((project) => {
        const projectTags =
          project.tags?.split(",").map((tag) => tag.trim().toLowerCase()) || [];
        return selectedTags.every((tag) => projectTags.includes(tag));
      })
    : projects;

  return (
    <main className="w-full bg-white text-gray-800 min-h-screen">
      {/* Tech Stack Filter Section */}
      <section className="bg-gray-50 w-full py-16 px-6 sm:px-10 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-6">
            <h3 className="text-sm font-semibold text-gray-500 tracking-wide uppercase mb-1">
              Tech Stack
            </h3>
            <h2 className="text-4xl font-bold text-gray-800 mb-2">
              Explore Projects
            </h2>
            <p className="text-sm text-gray-500">
              Filter projects by the technologies used
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center sm:justify-start gap-3">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-4 py-2 rounded-full border text-sm font-medium transition-all ${
                  selectedTags.includes(tag)
                    ? "bg-black text-white border-black shadow-sm"
                    : "bg-white text-black border-gray-300 hover:bg-gray-100"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="w-full py-20 px-6 sm:px-10 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">
            Projects
          </h2>
          <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} {...project} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
