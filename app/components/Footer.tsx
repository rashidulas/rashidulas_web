"use client";

import React from "react";
import Link from "next/link";
import { FooterCrossAsset } from "./TechAssets";
import { Linkedin, Youtube } from "lucide-react";

// X (Twitter) Logo SVG
const XLogo = () => (
  <svg className="w-5 h-5 fill-neutral-600 group-hover:fill-black transition-colors" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

// Morphing Logo component
function Logo() {
  return (
    <Link href="/" className="group relative flex items-center justify-center cursor-pointer w-8 h-8">
      <div className="grid grid-cols-2 gap-1 transition-all duration-300 group-hover:rotate-90 group-hover:gap-0">
        <div className="w-2.5 h-2.5 bg-black transition-all duration-300 group-hover:w-5 group-hover:h-2" />
        <div className="w-2.5 h-2.5 bg-black transition-all duration-300 group-hover:w-5 group-hover:h-2" />
        <div className="w-2.5 h-2.5 bg-black transition-all duration-300 group-hover:w-5 group-hover:h-2" />
        <div className="w-2.5 h-2.5 bg-black transition-all duration-300 group-hover:w-5 group-hover:h-2" />
      </div>
    </Link>
  );
}

export default function Footer() {
  return (
    <footer className="relative bg-[#faf9f6] border-t border-neutral-200/80 pt-16 pb-8 px-6 mt-32 max-w-7xl mx-auto w-full overflow-hidden">
      {/* Rotating 3D wireframe cross inside the background */}
      <FooterCrossAsset />

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-4 gap-12 max-w-5xl mx-auto pb-12">
        {/* Logo and About column */}
        <div className="space-y-4 md:col-span-2">
          <div className="flex items-center gap-2">
            <Logo />
            <span className="font-mono text-sm font-bold tracking-wider text-neutral-900 uppercase">
              Stackgrid
            </span>
          </div>
          <p className="text-neutral-500 text-xs leading-relaxed max-w-sm font-light">
            This is just some description, I am not sure what to put here really.
          </p>

          {/* Social icons */}
          <div className="flex items-center gap-3 pt-2">
            <a href="#" className="group flex items-center justify-center w-8 h-8 rounded-lg bg-neutral-100 border border-neutral-200 hover:border-neutral-300 hover:bg-neutral-200 transition-colors">
              <Linkedin className="w-4 h-4 text-neutral-600 group-hover:text-black transition-colors" />
            </a>
            <a href="#" className="group flex items-center justify-center w-8 h-8 rounded-lg bg-neutral-100 border border-neutral-200 hover:border-neutral-300 hover:bg-neutral-200 transition-colors">
              <XLogo />
            </a>
            <a href="#" className="group flex items-center justify-center w-8 h-8 rounded-lg bg-neutral-100 border border-neutral-200 hover:border-neutral-300 hover:bg-neutral-200 transition-colors">
              <Youtube className="w-4 h-4 text-neutral-600 group-hover:text-black transition-colors" />
            </a>
          </div>
        </div>

        {/* Pages column */}
        <div className="space-y-4">
          <h4 className="font-mono text-xs font-semibold tracking-wider text-neutral-900">
            Pages
          </h4>
          <ul className="space-y-2 text-xs font-mono text-neutral-500">
            <li>
              <Link href="/" className="hover:text-black transition-colors">
                [Home]
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-black transition-colors">
                [About]
              </Link>
            </li>
            <li>
              <Link href="/portfolio" className="hover:text-black transition-colors">
                [Portfolio]
              </Link>
            </li>
            <li>
              <Link href="/notebook" className="hover:text-black transition-colors">
                [Notebook]
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-black transition-colors">
                [Careers]
              </Link>
            </li>
          </ul>
        </div>

        {/* Support column */}
        <div className="space-y-4">
          <h4 className="font-mono text-xs font-semibold tracking-wider text-neutral-900">
            Support
          </h4>
          <ul className="space-y-2 text-xs font-mono text-neutral-500">
            <li>
              <Link href="/#contact" className="hover:text-black transition-colors">
                [Contact]
              </Link>
            </li>
            <li>
              <a href="#" className="hover:text-black transition-colors">
                [Privacy Policy]
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-black transition-colors">
                [Terms & Conditions]
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-black transition-colors">
                [Acceptable Use]
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Technical Status Timeline Bar (Black bar above copyright) */}
      <div className="w-full max-w-5xl mx-auto bg-neutral-900 text-neutral-400 font-mono text-[9px] sm:text-xs py-3 px-4 flex items-center justify-between overflow-x-auto no-scrollbar border-t border-neutral-800">
        <div className="flex items-center gap-1.5 whitespace-nowrap">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>...Thu 25.......................................................................</span>
        </div>
        <div className="whitespace-nowrap font-semibold">
          <span>12h...24h.......</span>
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-5xl mx-auto pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-neutral-400 gap-4">
        <div>
          &copy; Stackgrid. All Rights Reserved.
        </div>
        <div>
          Built with Next.js, Tailwind CSS &amp; TypeScript.
        </div>
      </div>
    </footer>
  );
}
