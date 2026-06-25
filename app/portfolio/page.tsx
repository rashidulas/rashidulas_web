"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Zap, Globe, Workflow, ArrowRight } from "lucide-react";

interface Project {
  id: string;
  title: string;
  client: string;
  period: string;
  icon: React.ReactNode;
  brief: string;
  description: string;
  impact: string[];
  techStack: string[];
  image: string;
}

const PROJECTS: Project[] = [
  {
    id: "simplify",
    title: "Event-Driven Supply Chain Invoicing",
    client: "Simplify Digital Co.",
    period: "Q3 2025",
    icon: <Zap className="w-5 h-5 text-neutral-800" />,
    brief: "Bypassed manual invoicing friction for a global supply chain firm by deploying an event-driven middleware orchestration layer.",
    description: "Manual supply chain invoicing was a massive bottleneck that held up daily transactions. We engineered a deterministic middleware orchestration layer that automated the ingestion, parsing, verification, and database sync for complex logistics invoices. The system relies on isolated runner pipelines to validate data structures and calculate balances with zero float errors.",
    impact: [
      "Reduced processing runtime from 48 hours to 11 minutes",
      "Achieved zero-fault billing transaction logs across 100k+ runs",
      "Eliminated manual validation data entry completely"
    ],
    techStack: ["Node.js", "TypeScript", "Event-Driven Queue", "PostgreSQL", "Docker"],
    image: "/kevin_mccallister.png"
  },
  {
    id: "coretech",
    title: "Deterministic Conversational AI Architecture",
    client: "CoreTech Systems",
    period: "Q1 2026",
    icon: <Globe className="w-5 h-5 text-neutral-800" />,
    brief: "Engineered a stateful conversational AI agent trained strictly on proprietary banking databases to autonomously resolve helpdesk tickets.",
    description: "Designed a secure and deterministic conversational AI interface for resolving tier-1 client banking tickets. To bypass compliance hazards and hallucinations, we built a schema-locked query middleware that maps user intent directly to specific database functions under mathematically defined boundaries. The interface acts as a sandbox, resolving queries instantly while ensuring absolute compliance.",
    impact: [
      "Successfully resolved 62% of Tier-1 helpdesk tickets autonomously",
      "Enforced zero-hallucination guardrails via schema-locked boundaries",
      "Maintained 100% compliance with financial security regulations"
    ],
    techStack: ["Next.js", "Python", "LLM Orchestration", "MongoDB", "OAuth2.0"],
    image: "/cata_giraldo.png"
  },
  {
    id: "velosite",
    title: "Predictive Product Telemetry Engine",
    client: "Velosite",
    period: "Q4 2025",
    icon: <Workflow className="w-5 h-5 text-neutral-800" />,
    brief: "Engineered a predictive AI middleware pipeline that analyzes product telemetry to trigger onboarding interventions.",
    description: "User retention is critical in SaaS. We built a predictive product telemetry pipeline that intercepts real-time user event streams, runs them against behavioral risk models, and dynamically triggers micro-targeted onboarding paths inside the app. This proactive orchestration validates user engagement and helps them reach activation landmarks faster.",
    impact: [
      "Trial-to-paid conversion rates increased by 22%",
      "Reduced customer onboarding churn by 34% in two quarters",
      "Processed 10M+ product telemetry events daily with sub-second latency"
    ],
    techStack: ["React", "Go", "Apache Kafka", "Redis", "Tailwind CSS"],
    image: "/aman_patel.png"
  }
];

export default function PortfolioPage() {
  const [selectedProject, setSelectedProject] = useState<Project>(PROJECTS[0]);

  return (
    <main className="max-w-5xl mx-auto px-6 py-16 space-y-16">
      {/* Page Title */}
      <div className="space-y-4 text-center">
        <h1 className="font-serif text-5xl sm:text-6xl tracking-tight text-neutral-900 leading-none">
          Portfolio
        </h1>
        <p className="max-w-xl mx-auto text-neutral-500 text-xs sm:text-sm font-mono uppercase tracking-widest">
          Selected Architecture Case Studies
        </p>
      </div>

      {/* Selector Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {PROJECTS.map((project) => {
          const isActive = selectedProject.id === project.id;
          return (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className={`cursor-pointer p-6 flex flex-col justify-between space-y-6 relative transition-all duration-300 ${
                isActive 
                  ? "border border-black border-dashed bg-white shadow-xl shadow-neutral-100" 
                  : "border border-neutral-200 hover:border-neutral-400 bg-[#fbfbfb]"
              }`}
            >
              {/* Figma Corner Handles */}
              {isActive && (
                <>
                  <div className="w-1.5 h-1.5 bg-black absolute -top-1 -left-1"></div>
                  <div className="w-1.5 h-1.5 bg-black absolute -top-1 -right-1"></div>
                  <div className="w-1.5 h-1.5 bg-black absolute -bottom-1 -left-1"></div>
                  <div className="w-1.5 h-1.5 bg-black absolute -bottom-1 -right-1"></div>
                </>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-neutral-100 rounded-lg">
                    {project.icon}
                  </div>
                  <span className="text-xs font-mono font-bold text-neutral-900">
                    {project.client}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-neutral-400">
                  {project.period}
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-neutral-900">
                  {project.title}
                </h3>
                <p className="text-xs text-neutral-500 leading-relaxed font-light">
                  {project.brief}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Project Deep Dive Panel */}
      <div className="border border-neutral-200 bg-[#fbfbfb]/50 p-6 sm:p-10 md:p-12 relative flex flex-col md:flex-row gap-8 items-stretch">
        <div className="tech-bracket-tl"></div>
        <div className="tech-bracket-tr"></div>
        <div className="tech-bracket-bl"></div>
        <div className="tech-bracket-br"></div>

        {/* Project Image */}
        <div className="w-full md:w-2/5 aspect-[4/5] relative bg-neutral-100 border border-neutral-200 overflow-hidden shrink-0">
          <Image
            src={selectedProject.image}
            alt={selectedProject.title}
            fill
            className="object-cover filter grayscale contrast-110"
            sizes="(max-w-768px) 100vw, 40vw"
            priority
          />
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#fbfbfb] to-transparent pointer-events-none" />
        </div>

        {/* Project Details */}
        <div className="w-full md:w-3/5 flex flex-col justify-between py-2 space-y-6 md:space-y-0">
          <div className="space-y-6">
            <div>
              <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest">
                Client &bull; {selectedProject.client}
              </span>
              <h2 className="text-2xl font-bold text-neutral-900 tracking-tight">
                {selectedProject.title}
              </h2>
            </div>

            <p className="text-neutral-700 text-sm leading-relaxed font-light">
              {selectedProject.description}
            </p>

            {/* Impact List */}
            <div className="space-y-2.5">
              <h4 className="font-mono text-xs font-semibold tracking-wider text-neutral-900 uppercase">
                Proven Impact / Outcomes
              </h4>
              <ul className="space-y-2 text-xs text-neutral-600 font-light">
                {selectedProject.impact.map((imp, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-black font-semibold mt-0.5">•</span>
                    <span>{imp}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Tech Stack tags */}
          <div className="pt-6 border-t border-neutral-200/60 flex flex-wrap gap-2">
            {selectedProject.techStack.map((tech) => (
              <span
                key={tech}
                className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-neutral-100 border border-neutral-200 text-neutral-600"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
