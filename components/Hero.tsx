"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Load WebGL component only on the client to avoid SSR hydration issues
const WebGLRipple = dynamic(() => import("./WebGLRipple"), { ssr: false });

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section
      className="relative h-[80vh] flex items-center justify-center text-white text-center overflow-hidden"
    >
      {/*
        WebGL canvas renders the background WITH displacement baked in.
        It is absolutely positioned to cover the entire section.
        The Next.js <Image> behind it acts only as a fallback for
        browsers without WebGL (also ensures the image is preloaded).
      */}

      {/* Fallback / preload image (hidden once WebGL is ready) */}
      <div className={`absolute inset-0 transition-opacity duration-700 ${mounted ? "opacity-0" : "opacity-100"}`}>
        <Image
          src="/bg/bnw.jpg"
          alt="Background"
          fill
          style={{ objectFit: "cover" }}
          quality={100}
          priority
        />
      </div>

      {/* Dark overlay for text legibility */}
      <div className="absolute inset-0 bg-black/42 z-10 pointer-events-none" />

      {/* GPU-accelerated WebGL ripple (draws the image + displacement) */}
      {mounted && (
        <WebGLRipple
          src="/bg/bnw.jpg"
          className="z-[5]"
        />
      )}

      {/* Hero content – sits above everything */}
      <div className="relative z-20 flex flex-col items-center px-4 pointer-events-none select-none">
        <div className="w-44 h-44 md:w-52 md:h-52 border-4 border-white rounded-full overflow-hidden mb-6 shadow-2xl">
          <Image
            src="/ras.jpg"
            alt="Profile"
            width={250}
            height={250}
            style={{ objectFit: "cover" }}
          />
        </div>
        <h1 className="text-2xl md:text-4xl font-bold drop-shadow-lg">
          Hello I&apos;m Md Rashidul Alam Sami
        </h1>
        <p className="text-base md:text-lg mt-2 drop-shadow-md">
          I&apos;m a passionate Software Engineer
        </p>
      </div>
    </section>
  );
}
