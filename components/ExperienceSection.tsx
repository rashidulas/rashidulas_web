"use client";

import { MapPin } from "lucide-react";
import Image from "next/image";

interface ExperienceItem {
  title: string;
  company: string;
  location: string;
  period: string;
  description: string;
  technologies: string[];
  image: string;
}

const experiences: ExperienceItem[] = [
  {
    title: "Lead IT Support Specialist",
    company: "Office of Information Technology, UTA",
    location: "Arlington, TX",
    period: "Oct 2022 - Present",
    description:
      "Orchestrated tech support for 42,000+ users, reducing resolution time by 30% through optimized hardware/software setup and migrating 39,000+ records to ServiceNow; led a team of 6 to deploy Adobe Intune, Azure AD, and Jamf Connect across 500+ devices, cutting onboarding time by 50%.",
    technologies: ["Microsoft Entra ID", "ServiceNow", "Intune", "Jamf Connec"],
    image: "/oit.jpg",
  },
  {
    title: "ACM Create Director",
    company: "Association for Computing Machinery",
    location: "Arlington, TX",
    period: "Aug 2024 - Present",
    description:
      "Facilitated workshops and hands-on training for a team of 30 students, enhancing their technical and project management skills, leading to a improvement in project completion rates by 40% throughout the semester.",
    technologies: ["Next JS", "React Native", "React", "SQL"],
    image: "/acm.jpg",
  },
  {
    title: "Undergraduate Research Assistant",
    company: "Abacus Cloud and Edge Systems Lab (ACES)",
    location: "Arlington, TX",
    period: "May 2023 - Sept 2023",
    description:
      "Directed and designed network architecture projects using Kubernetes and K3s on Raspberry Pis to boost speed by 35%, and built a web app visualizing weather data for 50+ counties via a JSON-powered interactive map.",
    technologies: ["Kubernetes", "Python", "Next JS", "JSON"],
    image: "/aces.jpg",
  },
];

export function ExperienceSection() {
  return (
    <div className="py-20 bg-black text-white relative overflow-hidden">
      {/* Background dots */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(255,255,255,0.05)_1px,_transparent_1px)] bg-[length:50px_50px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        {/* Title */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            PROFESSIONAL EXPERIENCE
          </h2>
          <div className="w-24 h-1 bg-white mx-auto" />
        </div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-px h-full bg-white/30 hidden lg:block" />

          {experiences.map((exp, index) => {
            const isEven = index % 2 === 0;
            return (
              <div key={index} className="relative mb-20 last:mb-0">
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white rounded-full hidden lg:block z-10 border-4 border-black" />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  {/* Text Side */}
                  <div
                    className={`space-y-6 ${
                      isEven
                        ? "lg:pr-16 lg:text-right"
                        : "lg:pl-16 lg:col-start-2"
                    }`}
                  >
                    {/* Date */}
                    <div
                      className={`${
                        isEven ? "lg:justify-end" : ""
                      } inline-block`}
                    >
                      <div className="bg-white text-black px-6 py-3 text-sm font-bold tracking-wider uppercase inline-block">
                        {exp.period}
                      </div>
                    </div>

                    {/* Title, Company, Location */}
                    <div className="space-y-3">
                      <h3 className="text-3xl font-bold">{exp.title}</h3>
                      <h4 className="text-xl text-gray-300">{exp.company}</h4>
                      <div
                        className={`flex items-center gap-2 text-gray-400 ${
                          isEven ? "lg:justify-end" : ""
                        }`}
                      >
                        <MapPin className="w-4 h-4" />
                        <span>{exp.location}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-300 leading-relaxed text-lg max-w-lg">
                      {exp.description}
                    </p>

                    {/* Tech Stack */}
                    <div
                      className={`flex flex-wrap gap-3 ${
                        isEven ? "lg:justify-end" : ""
                      }`}
                    >
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs bg-white/10 border border-white/20 text-white px-4 py-2 font-medium tracking-wider uppercase backdrop-blur-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Image Side */}
                  <div
                    className={`relative ${
                      isEven
                        ? "lg:col-start-2"
                        : "lg:col-start-1 lg:row-start-1"
                    }`}
                  >
                    <div className="relative group cursor-pointer">
                      {/* Hover BG */}
                      <div className="absolute -inset-4 bg-gradient-to-br from-white/10 to-transparent transform rotate-3 group-hover:rotate-6 transition-transform duration-500 pointer-events-none" />
                      <div className="absolute -top-6 -right-6 w-20 h-20 bg-white/10 transform rotate-45" />

                      {/* Image */}
                      <img
                        src={exp.image}
                        alt={exp.company}
                        className="relative w-full h-80 object-cover grayscale group-hover:grayscale-0 transition-all duration-700 border border-white/20"
                      />

                      {/* Overlay Text */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                        <p className="text-sm font-medium opacity-80">
                          Experience at
                        </p>
                        <h4 className="text-lg font-bold">{exp.company}</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-20 text-center">
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent mx-auto" />
        </div>
      </div>
    </div>
  );
}
