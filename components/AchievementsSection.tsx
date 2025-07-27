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
    title: "1st Place – Dartmouth X Hackathon",
    event: "Dartmouth College",
    date: "Apr 2025",
    description:
      "Built Lumina, an AI-powered academic advisor in 24 hours. Won the grand prize among 200+ participants.",
  },
  {
    title: "Finalist – Google Solution Challenge",
    event: "Google Developers",
    date: "Jul 2024",
    description:
      "Developed an AI app recommending healthy food based on medication. Reached final 10 globally.",
  },
  {
    title: "Best Design – UT Austin Hackathon",
    event: "HackTX",
    date: "Oct 2023",
    description:
      "Created a decentralized donation tracker with blockchain integration. Recognized for UI/UX excellence.",
  },
  {
    title: "Top 3 – Shellhacks",
    event: "Florida Intl. Univ.",
    date: "Sept 2023",
    description:
      "Built a real-time facial recognition attendance system using OpenCV and Firebase.",
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
