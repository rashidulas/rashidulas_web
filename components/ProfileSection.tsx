"use client";

import Image from "next/image";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export default function AboutSection() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center px-6 py-12 md:flex-row md:gap-20 bg-white text-gray-900">
      {/* Profile Image with grayscale hover effect */}
      <div className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-lg shadow-lg overflow-hidden group">
        <Image
          src="/ras.JPG" // replace with your image
          alt="Profile"
          fill
          className="transition-all duration-500 ease-in-out grayscale group-hover:grayscale-0 group-hover:scale-105 object-cover"
        />
      </div>

      {/* Text Content */}
      <div className="max-w-xl mt-10 md:mt-0 text-center md:text-left px-2 sm:px-0">
        <h2 className="text-xs sm:text-sm uppercase tracking-widest text-gray-500 mb-1">
          Software Developer
        </h2>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
          Md Rashidul Alam <br /> Sami
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 mt-2">Arlington, TX</p>

        {/* Tag Badges */}
        <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-4">
          {[
            "Full Stack Developer",
            "React Specialist",
            "Mobile App Developer",
          ].map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 sm:px-4 border border-black rounded-full text-xs sm:text-sm font-medium transition duration-300 hover:bg-black hover:text-white cursor-pointer"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Description */}
        <p className="mt-6 text-gray-700 text-sm sm:text-base leading-relaxed px-1 sm:px-0">
          I’m a full-stack developer with 4 years of experience building
          scalable, modern web applications—now focused on creating AI-powered
          solutions. I combine clean, efficient code with intuitive UI/UX to
          develop products that not only work seamlessly but also deliver
          meaningful impact.
        </p>
        <p className="mt-4 text-gray-700 text-sm sm:text-base leading-relaxed px-1 sm:px-0">
          I enjoy turning innovative ideas into polished, real-world products.
          Driven by curiosity and purpose, I’m always exploring new technologies
          and seeking projects that solve real problems and push the boundaries
          of what’s possible with AI.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 justify-center md:justify-start">
          <a
            href="https://github.com/rashidulas"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 border border-black px-4 py-2 rounded transition hover:bg-black hover:text-white text-sm sm:text-base"
          >
            <FaGithub />
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/rashidulas"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 border border-black px-4 py-2 rounded transition hover:bg-black hover:text-white text-sm sm:text-base"
          >
            <FaLinkedin />
            LinkedIn
          </a>
          <a
            href="mailto:rashidul321alam@gmail.com"
            className="flex items-center justify-center gap-2 border border-black px-4 py-2 rounded transition hover:bg-black hover:text-white text-sm sm:text-base"
          >
            <MdEmail />
            Contact
          </a>
        </div>
      </div>
    </section>
  );
}
