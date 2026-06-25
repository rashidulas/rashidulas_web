"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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

export default function Header() {
  const pathname = usePathname();

  const getLinkClass = (path: string) => {
    const isActive = pathname === path;
    return `hover:text-black transition-colors px-1 sm:px-2 py-1 ${
      isActive ? "text-black font-semibold" : "text-neutral-600"
    }`;
  };

  return (
    <header className="sticky top-0 z-50 bg-[#fbfbfb]/85 backdrop-blur-md border-b border-neutral-100 px-6 py-4 flex items-center justify-between max-w-7xl mx-auto w-full">
      <nav className="flex items-center gap-1 sm:gap-4 text-xs font-mono tracking-wider">
        <Link href="/about" className={getLinkClass("/about")}>
          [About]
        </Link>
        <Link href="/portfolio" className={getLinkClass("/portfolio")}>
          [Portfolio]
        </Link>
      </nav>

      <div className="flex items-center justify-center">
        <Logo />
      </div>

      <nav className="flex items-center gap-1 sm:gap-4 text-xs font-mono tracking-wider">
        <Link href="/notebook" className={getLinkClass("/notebook")}>
          [Notebook]
        </Link>
        <Link href="/#contact" className={getLinkClass("/#contact")}>
          [Contact]
        </Link>
      </nav>
    </header>
  );
}
