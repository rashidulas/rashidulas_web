"use client";

import { MapPin, Star, BookOpen } from "lucide-react";

const education = [
  {
    degree: "Bachelor of Science in Computer Science",
    institution: "The University of Texas at Arlington",
    location: "Arlington, TX",
    period: "2022 - Present",
    description:
      "Focused on software engineering, algorithms, and data structures. Graduated with honors and participated in various research projects.",
    achievements: [
      "Dean's List",
      "Maverick Academic Scholarship",
      "Freshman Honor Roll",
    ],
    image: "/uta.jpg",
    gpa: "3.7/4.0",
  },
  {
    degree: "Science",
    institution: "Notre Dame College",
    location: "Dhaka, Bangladesh",
    period: "2019-2021",

    image: "/ndc.jpeg", // Replace with your image
  },
  {
    degree: "Science",
    institution: "Dhaka Residential Model College",
    location: "Dhaka, Bangladesh",
    period: "2011-2019",

    image: "/drmc.jpeg",
  },
];

export function EducationSection() {
  return (
    <section className="py-20 bg-white text-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-px bg-black" />
            <BookOpen className="w-6 h-6" />
            <div className="w-12 h-px bg-black" />
          </div>
          <h2 className="text-4xl font-bold mb-2">
            EDUCATION & CERTIFICATIONS
          </h2>
          <p className="text-gray-500 text-lg">
            Academic journey and professional certifications that shaped my
            expertise
          </p>
        </div>

        {/* Timeline */}
        <div className="space-y-20 relative">
          {/* Vertical line (centered under numbers) */}
          <div className="absolute left-6 top-14 bottom-0 w-px bg-gray-300 hidden sm:block" />

          {education.map((edu, i) => (
            <div
              key={i}
              className="flex flex-col lg:flex-row lg:items-start gap-10"
            >
              {/* Left: Timeline + Content */}
              <div className="relative flex-1">
                {/* Numbered dot */}
                <div className="relative z-10 flex items-center gap-3 mb-4 sm:mb-0 sm:ml-[-6px]">
                  <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-bold z-20">
                    {i + 1}
                  </div>
                  <span className="bg-black text-white text-sm px-3 py-1 font-medium">
                    {edu.period}
                  </span>
                </div>

                {/* Vertical line segment under this dot (only if not last) */}
                {i < education.length - 1 && (
                  <div className="absolute top-10 left-[1.125rem] h-[calc(100%-2.5rem)] w-px bg-gray-300 hidden sm:block" />
                )}

                {/* Degree Details */}
                <div className="mt-6 space-y-3 sm:mt-0 sm:ml-16">
                  <h3 className="text-xl font-bold">{edu.degree}</h3>
                  <h4 className="text-lg">{edu.institution}</h4>

                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {edu.location}
                    </div>
                    {edu.gpa && (
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4" />
                        GPA: {edu.gpa}
                      </div>
                    )}
                  </div>

                  <p className="text-gray-700 leading-relaxed text-[15px]">
                    {edu.description}
                  </p>

                  {edu.achievements && (
                    <div>
                      <p className="text-sm font-semibold">Key Achievements:</p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {edu.achievements.map((a) => (
                          <span
                            key={a}
                            className="text-xs border border-gray-400 px-3 py-1 rounded uppercase tracking-wide"
                          >
                            {a}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right: Image */}
              <div className="w-full lg:w-[40%] mt-6 lg:mt-0">
                <div className="relative group overflow-hidden rounded-md">
                  <img
                    src={edu.image}
                    alt={edu.institution}
                    className="w-full h-48 object-cover grayscale group-hover:grayscale-0 transition duration-500"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent text-white p-3 text-sm font-medium">
                    {edu.institution}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
