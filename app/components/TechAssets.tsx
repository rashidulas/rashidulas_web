"use client";

import React, { useEffect, useState } from "react";

// Helper hook to prevent SSR hydration mismatches on animations
function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return mounted;
}

// Headset Matrix (18x18)
const HEADSET_MATRIX = [
  [0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0],
  [0,0,0,1,1,1,0,0,0,0,1,1,1,0,0,0],
  [0,0,1,1,0,0,0,0,0,0,0,0,1,1,0,0],
  [0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,0],
  [0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,0],
  [1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
  [1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
  [1,1,0,0,1,1,1,0,0,1,1,1,0,0,1,1],
  [1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1],
  [0,1,1,1,1,1,1,0,0,1,1,1,1,1,1,0],
  [0,0,1,1,1,1,0,0,0,0,1,1,1,1,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0],
];

export function HeadsetAsset() {
  const [pulse, setPulse] = useState(0);
  const mounted = useMounted();

  useEffect(() => {
    if (!mounted) return;
    const interval = setInterval(() => {
      setPulse((p) => (p + 1) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, [mounted]);

  if (!mounted) {
    return <div className="relative w-full h-48 flex items-center justify-center bg-transparent" />;
  }

  return (
    <div className="relative w-full h-48 flex items-center justify-center bg-transparent">
      {/* Radial glow background */}
      <div className="absolute w-32 h-32 bg-blue-500/10 rounded-full blur-2xl" />
      
      <svg
        width="160"
        height="170"
        viewBox="0 0 160 170"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]"
      >
        {HEADSET_MATRIX.map((row, rIdx) =>
          row.map((val, cIdx) => {
            if (val === 0) return null;
            
            // Grid positions
            const x = cIdx * 9 + 12;
            const y = rIdx * 9 + 12;
            
            // Calculate a wave animation
            const distance = Math.sqrt((cIdx - 8) ** 2 + (rIdx - 8) ** 2);
            const wave = Math.sin(distance * 0.4 - pulse * 0.1) * 0.5 + 0.5;
            const radius = 2.5 + wave * 1.2;
            
            return (
              <circle
                key={`${rIdx}-${cIdx}`}
                cx={x}
                cy={y}
                r={radius.toFixed(2)}
                fill="#3b82f6"
                className="transition-all duration-300"
                style={{
                  fillOpacity: parseFloat((0.3 + wave * 0.7).toFixed(4)),
                }}
              />
            );
          })
        )}
      </svg>
    </div>
  );
}

export function PipelineAsset() {
  const [offset, setOffset] = useState(0);
  const mounted = useMounted();

  useEffect(() => {
    if (!mounted) return;
    const interval = setInterval(() => {
      setOffset((o) => (o + 0.15) % (Math.PI * 2));
    }, 30);
    return () => clearInterval(interval);
  }, [mounted]);

  if (!mounted) {
    return <div className="relative w-full h-48 flex items-center justify-center bg-transparent" />;
  }

  const numRings = 14;
  const dotsPerRing = 16;
  const rx = 24;
  const ry = 11;
  const width = 200;
  const height = 180;
  
  // Center coordinates
  const cx = width / 2;
  const cy = height / 2;

  const dots: { x: number; y: number; opacity: number; key: string }[] = [];

  for (let r = 0; r < numRings; r++) {
    // Rings are stacked along an axis
    const t = r / (numRings - 1);
    
    // Line path for a 3D pipeline bend/cylinder
    const rxOffset = (t - 0.5) * 45;
    const ryOffset = -(t - 0.5) * 45;
    
    for (let d = 0; d < dotsPerRing; d++) {
      const theta = (d / dotsPerRing) * Math.PI * 2;
      
      // Ellipse formula
      let dx = rx * Math.cos(theta);
      let dy = ry * Math.sin(theta);
      
      // Rotate ellipse slightly for 3D appearance
      const cos30 = Math.cos(Math.PI / 6);
      const sin30 = Math.sin(Math.PI / 6);
      const rxRot = dx * cos30 - dy * sin30;
      const ryRot = dx * sin30 + dy * cos30;
      
      const x = cx + rxRot + rxOffset;
      const y = cy + ryRot + ryOffset;
      
      // Pulse animation along the tube length
      const flow = Math.sin(t * 5 - offset + theta) * 0.5 + 0.5;
      
      dots.push({
        x,
        y,
        opacity: 0.25 + flow * 0.75,
        key: `${r}-${d}`,
      });
    }
  }

  return (
    <div className="relative w-full h-48 flex items-center justify-center bg-transparent">
      {/* Radial glow background */}
      <div className="absolute w-32 h-32 bg-pink-500/10 rounded-full blur-2xl" />
      
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-[0_0_8px_rgba(236,72,153,0.6)]"
      >
        {dots.map((dot) => (
          <circle
            key={dot.key}
            cx={dot.x.toFixed(2)}
            cy={dot.y.toFixed(2)}
            r="2.5"
            fill="#ec4899"
            style={{
              fillOpacity: parseFloat(dot.opacity.toFixed(4)),
            }}
          />
        ))}
      </svg>
    </div>
  );
}

export function FooterCrossAsset() {
  const [angle, setAngle] = useState(0);
  const mounted = useMounted();

  useEffect(() => {
    if (!mounted) return;
    let frameId: number;
    const update = () => {
      setAngle((a) => (a + 0.005) % (Math.PI * 2));
      frameId = requestAnimationFrame(update);
    };
    frameId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frameId);
  }, [mounted]);

  if (!mounted) return null;

  const size = 300;
  const cx = size / 2;
  const cy = size / 2;

  // Let's define the 3D vertices of a 3D Cross
  const armLength = 55;

  // Let's create lines along the arms
  const dots: { x: number; y: number; opacity: number }[] = [];
  const dotsPerArm = 14;

  // Render rotation matrices
  const cosA = Math.cos(angle);
  const sinA = Math.sin(angle);
  const cosB = Math.cos(angle * 0.7);
  const sinB = Math.sin(angle * 0.7);

  // Helper to project 3D to 2D (isometric projection)
  const project = (x3d: number, y3d: number, z3d: number) => {
    // Rotate around Y
    let x1 = x3d * cosA - z3d * sinA;
    let z1 = x3d * sinA + z3d * cosA;
    
    // Rotate around X
    let y2 = y3d * cosB - z1 * sinB;
    let z2 = y3d * sinB + z1 * cosB;

    // Isometric projection
    const screenX = cx + (x1 - z2) * Math.cos(Math.PI / 6);
    const screenY = cy + (y2 + (x1 + z2) * Math.sin(Math.PI / 6)) * 0.55;
    
    return { x: screenX, y: screenY };
  };

  // Generate dots along the 6 arms
  const axes = [
    { dx: 1, dy: 0, dz: 0 },
    { dx: -1, dy: 0, dz: 0 },
    { dx: 0, dy: 1, dz: 0 },
    { dx: 0, dy: -1, dz: 0 },
    { dx: 0, dy: 0, dz: 1 },
    { dx: 0, dy: 0, dz: -1 },
  ];

  axes.forEach((axis) => {
    for (let i = 1; i <= dotsPerArm; i++) {
      const factor = (i / dotsPerArm) * armLength;
      const x3d = axis.dx * factor;
      const y3d = axis.dy * factor;
      const z3d = axis.dz * factor;
      
      const { x, y } = project(x3d, y3d, z3d);
      
      // Calculate opacity based on depth
      const depth = axis.dx * sinA + axis.dz * cosA;
      const opacity = 0.15 + ((depth + armLength) / (armLength * 2)) * 0.45;

      dots.push({ x, y, opacity });
    }
  });

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-transparent pointer-events-none opacity-20 select-none">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {dots.map((dot, idx) => (
          <circle
            key={idx}
            cx={dot.x.toFixed(2)}
            cy={dot.y.toFixed(2)}
            r="2"
            fill="#a3a3a3"
            style={{
              fillOpacity: parseFloat(dot.opacity.toFixed(4)),
            }}
          />
        ))}
      </svg>
    </div>
  );
}
