"use client";

import React from "react";
import Image from "next/image";

export default function AboutPage() {
  const skills = [
    { category: "Languages", items: ["TypeScript", "JavaScript", "Python", "HTML/CSS", "SQL"] },
    { category: "Frameworks & Core", items: ["Next.js", "React", "Node.js", "Express", "Tailwind CSS"] },
    { category: "Architecture & Data", items: ["RESTful APIs", "GraphQL", "MongoDB", "PostgreSQL", "Event-Driven Systems"] },
    { category: "Tooling & Platform", items: ["Git", "Docker", "Vercel", "AWS", "CI/CD Pipelines"] },
  ];

  const experience = [
    {
      period: "2024 - Present",
      role: "Lead Systems Architect",
      company: "Stackgrid",
      description: "Architecting deterministic middleware orchestrations and custom AI agent integrations. Reduced customer invoicing runtimes from 48 hours to 11 minutes.",
    },
    {
      period: "2022 - 2024",
      role: "Senior Full Stack Engineer",
      company: "CoreTech Systems",
      description: "Engineered banking database interfaces and stateful conversational helpdesk automations adhering strictly to regulatory compliance rules.",
    },
    {
      period: "2020 - 2022",
      role: "Software Developer",
      company: "Simplify Digital Co",
      description: "Designed core data pipelines and customer management systems. Integrated event-driven workflow validation components.",
    },
  ];

  return (
    <main className="max-w-4xl mx-auto px-6 py-16 space-y-20">
      {/* Editorial Title */}
      <div className="space-y-4 text-center">
        <h1 className="font-serif text-5xl sm:text-6xl tracking-tight text-neutral-900 leading-none">
          About me
        </h1>
        <p className="max-w-xl mx-auto text-neutral-500 text-xs sm:text-sm font-mono uppercase tracking-widest">
          Systems &bull; Architecture &bull; Automation
        </p>
      </div>

      {/* Main Intro Panel */}
      <div className="border border-neutral-200 bg-[#fbfbfb]/50 p-8 sm:p-12 relative flex flex-col md:flex-row gap-8 items-center md:items-start shadow-sm">
        <div className="tech-bracket-tl"></div>
        <div className="tech-bracket-tr"></div>
        <div className="tech-bracket-bl"></div>
        <div className="tech-bracket-br"></div>

        {/* Profile Image Wrapper */}
        <div className="w-48 h-48 relative bg-neutral-100 border border-neutral-200 overflow-hidden shrink-0">
          <Image
            src="/cata_giraldo.png"
            alt="Author portrait"
            fill
            className="object-cover filter grayscale contrast-110"
            priority
          />
          <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-[#fbfbfb] to-transparent pointer-events-none" />
        </div>

        {/* Profile Bio */}
        <div className="space-y-4 text-neutral-700">
          <h2 className="text-xl font-semibold text-neutral-900 tracking-tight">Krutik Maru</h2>
          <p className="text-xs font-mono text-neutral-400">ROLE // Lead Systems Architect</p>
          <p className="text-sm leading-relaxed font-light">
            I build high-performance, deterministic systems that connect disparate APIs, automate data pipelines, and eliminate administrative friction. Drawing inspiration from technical drafts and blueprints, I focus on clean layouts, structured interfaces, and scalable backend orchestration layers.
          </p>
          <p className="text-sm leading-relaxed font-light">
            My philosophy is simple: software should not guess. It should function precisely within mathematical guardrails, ensuring reliability, transparency, and operational velocity.
          </p>
        </div>
      </div>

      {/* Skills Grid */}
      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <h3 className="font-mono text-xs font-semibold tracking-wider text-neutral-900 uppercase">
            Technical Stack
          </h3>
          <div className="flex-1 border-t border-neutral-200 border-dashed"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {skills.map((skillGroup, idx) => (
            <div key={idx} className="tech-border-dashed p-6 relative">
              <div className="tech-bracket-tl"></div>
              <div className="tech-bracket-tr"></div>
              <div className="tech-bracket-bl"></div>
              <div className="tech-bracket-br"></div>
              
              <h4 className="font-mono text-[10px] text-neutral-400 tracking-wider uppercase mb-3">
                {skillGroup.category}
              </h4>
              <ul className="space-y-1 text-xs text-neutral-700 font-light">
                {skillGroup.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="flex items-center gap-1.5">
                    <span className="w-1 h-1 bg-black rounded-full"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Experience Timeline */}
      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <h3 className="font-mono text-xs font-semibold tracking-wider text-neutral-900 uppercase">
            Professional Experience
          </h3>
          <div className="flex-1 border-t border-neutral-200 border-dashed"></div>
        </div>

        <div className="space-y-6">
          {experience.map((exp, idx) => (
            <div key={idx} className="border border-neutral-200 bg-[#fbfbfb]/30 p-6 relative hover:border-neutral-400 transition-all duration-300">
              <div className="tech-bracket-tl"></div>
              <div className="tech-bracket-tr"></div>
              <div className="tech-bracket-bl"></div>
              <div className="tech-bracket-br"></div>

              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 mb-4">
                <div>
                  <h4 className="text-sm font-semibold text-neutral-900">{exp.role}</h4>
                  <p className="text-xs text-neutral-500 font-mono tracking-tight">{exp.company}</p>
                </div>
                <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-neutral-100 border border-neutral-200 text-neutral-600 self-start sm:self-auto">
                  {exp.period}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-light">
                {exp.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
