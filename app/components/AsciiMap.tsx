"use client";

import React, { useState, useRef, useEffect } from "react";

const MAP_ART = `
                                                                       o
                                                                     ooo
                                                                  .ooooooo.
                                                                .o000000000o.
                                                              .o000000000000o.
                                                             .o00000000000000o.
                                     ..                     .o0000000000000000o.
                                  .ooooo.                  .o000000000000000000o.
                              .oooo00000ooo.              .o00000000000000000000o.
                           .ooo0000000000000oo.          .o0000000000000000000000o.
                         .oo0000000000000000000o.        .o0000000000000000000000o.
                       .oo00000000000000000000000o.      o000000000000000000000000o.
                      .o00000000000000000000000000o.    .o000000000000000000000000o.
                       .oo00000000000000000000000o.      .o0000000000000000000000o.
                         .o00000000000000000000o.          .o000000000000000000o.
                          .o00000000000000000o.             .o00000000000000o.
                           .o00000000000000o.                 .o0000000000o.
                            .o00000000000o.                     .ooooooo.
                             .o00000000o.                         .ooo.
                              .o0000oo.                             .
                               .oooo.
                                 ..
`;

export default function AsciiMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
    }
    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, []);

  const lines = MAP_ART.split("\n").filter((line) => line.length > 0);

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePos({ x: -1000, y: -1000 });
      }}
      className="relative select-none font-mono text-[8px] sm:text-[10px] md:text-[12px] leading-[1.1] tracking-[0.2em] whitespace-pre text-neutral-400 p-8 md:p-12 w-full flex flex-col items-center overflow-x-auto no-scrollbar"
    >
      {/* Blueprint Corner Brackets */}
      <div className="tech-bracket-tl"></div>
      <div className="tech-bracket-tr"></div>
      <div className="tech-bracket-bl"></div>
      <div className="tech-bracket-br"></div>

      <div className="inline-block mx-auto text-left">
        {lines.map((line, lineIdx) => (
          <div key={lineIdx} className="flex justify-start">
            {line.split("").map((char, charIdx) => {
              if (char === " ") {
                return <span key={charIdx} className="inline-block w-[0.6em]">&nbsp;</span>;
              }

              // Calculate character position in container (approximate)
              // Width of font-mono character is roughly 0.6em of font-size
              // Height is roughly 1.1em of font-size
              const charWidth = 9; // approximate pixels in MD view
              const charHeight = 13;
              const charX = charIdx * charWidth + 40;
              const charY = lineIdx * charHeight + 40;

              // Distance to mouse
              const dx = mousePos.x - charX;
              const dy = mousePos.y - charY;
              const dist = Math.sqrt(dx * dx + dy * dy);
              const maxDist = 80;

              let scale = 1;
              let opacity = 0.6;
              let color = "text-neutral-500";

              if (isHovered && dist < maxDist) {
                const ratio = 1 - dist / maxDist;
                scale = 1 + ratio * 0.4;
                opacity = 0.6 + ratio * 0.4;
                // Alternate coloring based on coordinates
                color = (charIdx + lineIdx) % 2 === 0 ? "text-blue-500 font-bold" : "text-purple-500 font-bold";
              } else {
                // Default shading based on character
                if (char === "o") {
                  color = "text-neutral-400";
                  opacity = 0.5;
                } else if (char === "0") {
                  color = "text-neutral-700";
                  opacity = 0.8;
                } else if (char === ".") {
                  color = "text-neutral-300";
                  opacity = 0.3;
                }
              }

              return (
                <span
                  key={charIdx}
                  style={{
                    transform: `scale(${scale})`,
                    opacity: opacity,
                    transition: "transform 0.15s cubic-bezier(0.16, 1, 0.3, 1), color 0.15s ease",
                  }}
                  className={`inline-block w-[0.6em] text-center ${color}`}
                >
                  {char}
                </span>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
