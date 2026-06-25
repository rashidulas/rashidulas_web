"use client";

import React, { useState } from "react";
import Image from "next/image";
import AsciiMap from "./components/AsciiMap";
import { HeadsetAsset, PipelineAsset, FooterCrossAsset } from "./components/TechAssets";
import { 
  Zap, 
  Globe, 
  Workflow, 
  Linkedin, 
  Youtube, 
  ArrowRight,
  Sparkles,
  Phone,
  Mail,
  User,
  MessageSquare
} from "lucide-react";

// X (Twitter) Logo SVG
const XLogo = () => (
  <svg className="w-5 h-5 fill-neutral-600 group-hover:fill-black transition-colors" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

// Morphing Logo component
function Logo() {
  return (
    <div className="group relative flex items-center justify-center cursor-pointer w-8 h-8">
      <div className="grid grid-cols-2 gap-1 transition-all duration-300 group-hover:rotate-90 group-hover:gap-0">
        <div className="w-2.5 h-2.5 bg-black transition-all duration-300 group-hover:w-5 group-hover:h-2" />
        <div className="w-2.5 h-2.5 bg-black transition-all duration-300 group-hover:w-5 group-hover:h-2" />
        <div className="w-2.5 h-2.5 bg-black transition-all duration-300 group-hover:w-5 group-hover:h-2" />
        <div className="w-2.5 h-2.5 bg-black transition-all duration-300 group-hover:w-5 group-hover:h-2" />
      </div>
    </div>
  );
}

// Testimonials data
interface Testimonial {
  id: string;
  clientName: string;
  companyName: string;
  role: string;
  logo: React.ReactNode;
  summary: string;
  quote: string;
  image: string;
  url: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: "simplify",
    clientName: "Kevin McCallister",
    companyName: "Simplify Digital Co",
    role: "Chief Operating Officer",
    logo: <Zap className="w-5 h-5 text-neutral-800" />,
    summary: "Bypassed manual invoicing friction for a global supply chain firm by deploying an event-driven middleware orchestration layer that cuts processing time from 48 hours to 11 minutes.",
    quote: "Our manual supply chain invoicing was a massive bottleneck that held up millions in daily transactions. Stackgrid engineered a deterministic middleware orchestration layer that automated the entire ingestion and validation pipeline. We went from a 48-hour cycle to just 11 minutes, reducing administrative overhead while maintaining zero-fault transaction logs. This is not just automation—it's industrial-grade engineering.",
    image: "/kevin_mccallister.png",
    url: "#case-study-simplify",
  },
  {
    id: "coretech",
    clientName: "Cata Giraldo",
    companyName: "CoreTech Systems",
    role: "VP of Engineering",
    logo: <Globe className="w-5 h-5 text-neutral-800" />,
    summary: "Engineered a stateful conversational AI agent trained strictly on proprietary banking databases to autonomously resolve Tier-1 helpdesk tickets without regulatory breaches.",
    quote: "We were terrified of customer-facing AI hallucinations that could land us in regulatory hot water or expose financial data. Stackgrid didn't just build a chatbot; they built a deterministic infrastructure. This architecture doesn't guess—it functions exactly within the mathematical guardrails defined, solving user problems instantly while keeping our legal and compliance teams entirely comfortable.",
    image: "/cata_giraldo.png",
    url: "#case-study-coretech",
  },
  {
    id: "velosite",
    clientName: "Aman Patel",
    companyName: "Velosite",
    role: "Director of Customer Success",
    logo: <Workflow className="w-5 h-5 text-neutral-800" />,
    summary: "Engineered a predictive AI middleware pipeline that analyzes real-time product telemetry to autonomously trigger personalized onboarding interventions, drastically reducing enterprise user churn.",
    quote: "User churn is the silent killer of enterprise SaaS. Stackgrid designed and built a predictive AI middleware pipeline that intercepts real-time product telemetry, matches it against behavioral risk profiles, and triggers micro-targeted onboarding paths dynamically. Our trial-to-paid conversion increased by 22% and customer churn dropped by 34% within the first six months. It has become an essential pillar of our product led growth strategy.",
    image: "/aman_patel.png",
    url: "#case-study-velosite",
  },
];

export default function Home() {
  const [activeTestimonial, setActiveTestimonial] = useState<Testimonial>(TESTIMONIALS[1]); // Default CoreTech Systems
  const [formData, setFormData] = useState({
    firstName: "Krutik",
    lastName: "Maru",
    email: "krutik@framer.com",
    phone: "+1-555-010-2345",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
      });
    }, 4000);
  };

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow max-w-7xl mx-auto w-full px-6 py-12 space-y-32">
        {/* HERO SECTION */}
        <section id="about" className="flex flex-col items-center text-center space-y-8 pt-8 relative">
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-neutral-900 leading-none">
            The all new AI Era
          </h1>
          <p className="max-w-xl text-neutral-600 text-sm sm:text-base md:text-lg leading-relaxed font-sans font-light">
            Make custom AI agents and secure data pipelines to eliminate your manual workflows.
          </p>

          <div className="flex items-center justify-center gap-4">
            <a 
              href="#about"
              className="px-6 py-2.5 text-xs font-mono tracking-wider font-semibold rounded-full bg-neutral-100 hover:bg-neutral-200 border border-neutral-200 text-neutral-800 transition duration-200"
            >
              Why us?
            </a>
            <a 
              href="#contact"
              onClick={(e) => handleScroll(e, "contact")}
              className="px-6 py-2.5 text-xs font-mono tracking-wider font-semibold rounded-full bg-black hover:opacity-90 text-white transition duration-200 shadow-md shadow-neutral-400/20"
            >
              Start now
            </a>
          </div>

          {/* DOTTED ASCII MAP */}
          <div className="w-full max-w-4xl mx-auto pt-6">
            <AsciiMap />
          </div>
        </section>

        {/* FEATURES SECTION */}
        <section id="pricing" className="flex flex-col items-center space-y-12">
          {/* Badge with corner pluses */}
          <div className="relative px-6 py-2 bg-black text-white text-[10px] sm:text-xs font-mono tracking-widest uppercase">
            <div className="tech-plus-tl"></div>
            <div className="tech-plus-tr"></div>
            <div className="tech-plus-bl"></div>
            <div className="tech-plus-br"></div>
            Features
          </div>

          <div className="text-center space-y-4 max-w-2xl">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-semibold tracking-tight text-neutral-900 leading-tight">
              Engineered Core Capabilities.
            </h2>
            <p className="text-neutral-500 text-xs sm:text-sm md:text-base leading-relaxed max-w-xl mx-auto font-light">
              From isolated language model agents to private, secure database environments—we architect the structural foundation of your automated enterprise.
            </p>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl pt-4">
            {/* Card 1: Customer Support Agents */}
            <div className="tech-border-dashed p-6 sm:p-8 flex flex-col justify-between space-y-6 relative hover:border-neutral-400 hover:shadow-lg hover:shadow-blue-500/5 transition duration-300">
              <div className="tech-bracket-tl"></div>
              <div className="tech-bracket-tr"></div>
              <div className="tech-bracket-bl"></div>
              <div className="tech-bracket-br"></div>

              {/* Headset Asset */}
              <HeadsetAsset />

              <div className="space-y-2">
                <h3 className="text-lg font-semibold tracking-tight text-neutral-900 font-sans">
                  Customer Support Agents
                </h3>
                <p className="text-neutral-500 text-xs sm:text-sm leading-relaxed font-light">
                  Deploy custom LLM agents trained directly on your internal company knowledge base.
                </p>
              </div>
            </div>

            {/* Card 2: Automated Data Pipelines */}
            <div className="tech-border-dashed p-6 sm:p-8 flex flex-col justify-between space-y-6 relative hover:border-neutral-400 hover:shadow-lg hover:shadow-pink-500/5 transition duration-300">
              <div className="tech-bracket-tl"></div>
              <div className="tech-bracket-tr"></div>
              <div className="tech-bracket-bl"></div>
              <div className="tech-bracket-br"></div>

              {/* Pipeline Asset */}
              <PipelineAsset />

              <div className="space-y-2">
                <h3 className="text-lg font-semibold tracking-tight text-neutral-900 font-sans">
                  Automated Data Pipelines
                </h3>
                <p className="text-neutral-500 text-xs sm:text-sm leading-relaxed font-light">
                  Connect disparate APIs and legacy systems to eliminate manual data entry entirely.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* OUTCOMES / TESTIMONIALS SECTION */}
        <section id="case-studies" className="flex flex-col items-center space-y-12">
          <div className="text-center space-y-4 max-w-2xl">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-semibold tracking-tight text-neutral-900 leading-tight">
              Proven Deployment Outcomes
            </h2>
            <p className="text-neutral-500 text-xs sm:text-sm md:text-base leading-relaxed max-w-xl mx-auto font-light">
              Below is the exact operational impact and ROI our custom automation pipelines have delivered across enterprise infrastructures.
            </p>
          </div>

          {/* Testimonial Select Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
            {TESTIMONIALS.map((t) => {
              const isActive = activeTestimonial.id === t.id;
              return (
                <div
                  key={t.id}
                  onClick={() => setActiveTestimonial(t)}
                  className={`cursor-pointer p-6 sm:p-8 flex flex-col justify-between space-y-8 relative select-none transition-all duration-300 ${
                    isActive 
                      ? "border border-black border-dashed bg-white shadow-xl shadow-neutral-100" 
                      : "border border-neutral-200 hover:border-neutral-400 bg-[#fbfbfb]"
                  }`}
                >
                  {/* Figma Selection Corners (Only visible on active card) */}
                  {isActive && (
                    <>
                      <div className="w-1.5 h-1.5 bg-black absolute -top-1 -left-1"></div>
                      <div className="w-1.5 h-1.5 bg-black absolute -top-1 -right-1"></div>
                      <div className="w-1.5 h-1.5 bg-black absolute -bottom-1 -left-1"></div>
                      <div className="w-1.5 h-1.5 bg-black absolute -bottom-1 -right-1"></div>
                    </>
                  )}

                  {/* Header / Client Icon */}
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-neutral-100 rounded-lg">
                      {t.logo}
                    </div>
                    <span className="text-xs font-mono font-bold tracking-tight text-neutral-900">
                      {t.companyName}
                    </span>
                  </div>

                  {/* Short Summary text */}
                  <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed font-light">
                    {t.summary}
                  </p>

                  {/* Profile info footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
                    <div>
                      <h4 className="text-xs font-semibold text-neutral-900">{t.clientName}</h4>
                      <p className="text-[10px] text-neutral-500 font-light">{t.role}</p>
                    </div>

                    <div className="relative w-8 h-8 rounded-full overflow-hidden border border-neutral-200 filter grayscale contrast-125">
                      {/* Avatar preview */}
                      <div className="w-full h-full bg-neutral-200 relative flex items-center justify-center">
                        <span className="text-[10px] font-mono font-bold text-neutral-500">
                          {t.clientName.split(" ").map(w => w[0]).join("")}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ACTIVE TESTIMONIAL DISPLAY PANEL */}
          <div className="w-full max-w-5xl border border-neutral-200 bg-[#fbfbfb]/50 p-6 sm:p-8 md:p-12 relative flex flex-col md:flex-row gap-8 items-center md:items-stretch transition-all duration-300">
            <div className="tech-bracket-tl"></div>
            <div className="tech-bracket-tr"></div>
            <div className="tech-bracket-bl"></div>
            <div className="tech-bracket-br"></div>

            {/* Left Column: Portrait photo */}
            <div className="w-full md:w-2/5 aspect-[4/5] relative bg-neutral-100 border border-neutral-200 overflow-hidden group">
              <Image
                src={activeTestimonial.image}
                alt={activeTestimonial.clientName}
                fill
                className="object-cover transition duration-500 filter grayscale contrast-110"
                sizes="(max-w-768px) 100vw, 40vw"
                priority
              />
              {/* Technical fade at bottom */}
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#fbfbfb] to-transparent pointer-events-none" />
            </div>

            {/* Right Column: Detailed Quote */}
            <div className="w-full md:w-3/5 flex flex-col justify-between py-2 space-y-6 md:space-y-0">
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-neutral-900">{activeTestimonial.clientName}</h3>
                  <p className="text-xs text-neutral-500 tracking-wider font-mono">{activeTestimonial.role} &bull; {activeTestimonial.companyName}</p>
                </div>
                
                <p className="text-neutral-700 text-sm sm:text-base leading-relaxed font-sans italic font-light relative pt-4 pl-4 border-l-2 border-neutral-300">
                  &ldquo;{activeTestimonial.quote}&rdquo;
                </p>
              </div>

              <div className="pt-4">
                <a 
                  href={activeTestimonial.url}
                  className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-mono tracking-wider font-bold rounded-full bg-neutral-200/60 hover:bg-neutral-200 text-neutral-600 hover:text-black transition duration-200 border border-neutral-300/40"
                >
                  Read Case Study
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT US SECTION */}
        <section id="contact" className="flex flex-col items-center space-y-12">
          <div className="text-center space-y-4 max-w-2xl">
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl tracking-tight text-neutral-900">
              Contact us
            </h2>
            <p className="text-neutral-500 text-xs sm:text-sm md:text-base leading-relaxed max-w-xl mx-auto font-light">
              Drop your technical parameters below, and an engineering lead will review your architecture layout within 24 hours.
            </p>
          </div>

          {/* Contact form inside a custom technical grid box */}
          <div className="w-full max-w-lg border border-neutral-200/80 bg-white p-6 sm:p-8 md:p-10 relative shadow-sm">
            <div className="tech-bracket-tl"></div>
            <div className="tech-bracket-tr"></div>
            <div className="tech-bracket-bl"></div>
            <div className="tech-bracket-br"></div>

            {submitted ? (
              <div className="py-16 text-center space-y-4 animate-fade-in">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-black text-white rounded-full mx-auto">
                  <Sparkles className="w-5 h-5 animate-pulse" />
                </div>
                <h3 className="text-lg font-bold text-neutral-900">Architecture Logged</h3>
                <p className="text-neutral-500 text-xs sm:text-sm font-light">
                  Thank you! Our engineering lead will contact you at <span className="font-mono text-black font-semibold">{formData.email}</span> within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* First name */}
                  <div className="space-y-1.5">
                    <label htmlFor="firstName" className="block text-[10px] font-mono tracking-wider text-neutral-400 uppercase">
                      First Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 w-4 h-4 text-neutral-400" />
                      <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="Krutik"
                        className="w-full pl-9 pr-4 py-2.5 bg-neutral-50/50 border border-neutral-200 rounded-lg text-sm text-neutral-900 focus:outline-none focus:border-neutral-500 focus:bg-white transition duration-200 font-light"
                      />
                    </div>
                  </div>

                  {/* Last name */}
                  <div className="space-y-1.5">
                    <label htmlFor="lastName" className="block text-[10px] font-mono tracking-wider text-neutral-400 uppercase">
                      Last Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 w-4 h-4 text-neutral-400" />
                      <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Maru"
                        className="w-full pl-9 pr-4 py-2.5 bg-neutral-50/50 border border-neutral-200 rounded-lg text-sm text-neutral-900 focus:outline-none focus:border-neutral-500 focus:bg-white transition duration-200 font-light"
                      />
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label htmlFor="email" className="block text-[10px] font-mono tracking-wider text-neutral-400 uppercase">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-4 h-4 text-neutral-400" />
                    <input
                      type="email"
                      name="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="krutik@framer.com"
                      className="w-full pl-9 pr-4 py-2.5 bg-neutral-50/50 border border-neutral-200 rounded-lg text-sm text-neutral-900 focus:outline-none focus:border-neutral-500 focus:bg-white transition duration-200 font-light"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="space-y-1.5">
                  <label htmlFor="phone" className="block text-[10px] font-mono tracking-wider text-neutral-400 uppercase">
                    Phone
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 w-4 h-4 text-neutral-400" />
                    <input
                      type="text"
                      name="phone"
                      id="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+1-555-010-2345"
                      className="w-full pl-9 pr-4 py-2.5 bg-neutral-50/50 border border-neutral-200 rounded-lg text-sm text-neutral-900 focus:outline-none focus:border-neutral-500 focus:bg-white transition duration-200 font-light"
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label htmlFor="message" className="block text-[10px] font-mono tracking-wider text-neutral-400 uppercase">
                    Message
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-neutral-400" />
                    <textarea
                      name="message"
                      id="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Type your message here..."
                      className="w-full pl-9 pr-4 py-2.5 bg-neutral-50/50 border border-neutral-200 rounded-lg text-sm text-neutral-900 focus:outline-none focus:border-neutral-500 focus:bg-white transition duration-200 font-light"
                    />
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full py-3 text-sm font-mono tracking-wider font-semibold rounded-full bg-[#737373] hover:bg-[#525252] text-white transition duration-200 shadow-md shadow-neutral-400/20"
                >
                  Submit
                </button>
              </form>
            )}
          </div>
        </section>
      </main>

    </div>
  );
}
