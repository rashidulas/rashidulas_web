"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Achievement {
  title: string;
  event: string;
  date: string;
  description: string;
}

const achievements: Achievement[] = [
  {
    title: "Best AI Application Built with Cloudflare",
    event: "HackTX 2024",
    date: "November 2024",
    description:
      "Build FleetPulse, an AI-powered web application that optimizes routes, monitors vehicle health, and educates drivers on eco-friendly practices",
  },
  {
    title: "Main Track Winner & Best AI Project with Databricks Open Source",
    event: "HackUTA 6",
    date: "October 2024",
    description:
      "Developed Waste.0 is a web application that uses AI-driven insights to help food business owners and donation centers minimize food waste.",
  },
  {
    title: "Best Use of MongoDB Atlas",
    event: "HackSMU VI",
    date: "October 2024",
    description:
      "Created LegalAI allows users to upload legal documents and instantly receive a comprehensive analysis powered by advanced AI models.",
  },
  {
    title: "Best Use of MATLAB",
    event: "HackUTA 2023",
    date: "Sept 2023",
    description:
      "Built a is a tool dedicated to the early detection of lung cancer and the cure.",
  },
];

export default function AchievementsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.firstElementChild?.clientWidth || 0;
      scrollRef.current.scrollBy({
        left: direction === "right" ? cardWidth + 16 : -(cardWidth + 16),
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-20 bg-black text-white">
      <div className="max-w-6xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
            ACHIEVEMENTS
          </h2>
          <div className="w-24 h-1 bg-white mx-auto" />
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Left Button */}
          <button
            onClick={() => scroll("left")}
            className="absolute -left-5 top-1/2 transform -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 p-2 rounded-full"
          >
            <ChevronLeft className="text-white w-6 h-6" />
          </button>

          {/* Scrollable List */}
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scroll-smooth scroll-px-6 snap-x snap-mandatory px-1 no-scrollbar"
          >
            {achievements.map((item, i) => (
              <div
                key={i}
                className="min-w-[300px] md:min-w-[360px] snap-start bg-white/5 border border-white/10 rounded-xl p-5 backdrop-blur-sm"
              >
                <p className="text-sm text-gray-400 mb-1">{item.date}</p>
                <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                <p className="text-gray-300 text-sm font-medium mb-2">
                  {item.event}
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          {/* Right Button */}
          <button
            onClick={() => scroll("right")}
            className="absolute -right-5 top-1/2 transform -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 p-2 rounded-full"
          >
            <ChevronRight className="text-white w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
}
