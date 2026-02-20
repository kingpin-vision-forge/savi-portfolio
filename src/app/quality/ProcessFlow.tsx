"use client";

import { useEffect, useRef, useState } from "react";
import { Sparkles } from "lucide-react";

type Point = { x: number; y: number };

const steps = [
  { title: "Raw Water Tank", value: "Source", meta: "intake & pre-treatment" },
  { title: "Sand Filtration", value: "Sediment", meta: "clarifies turbidity" },
  { title: "Carbon Filter", value: "Odor/Chlorine", meta: "taste & smell control" },
  { title: "12 Candle Micron", value: "Fine Filter", meta: "micro-sediment removal" },
  { title: "Reverse Osmosis", value: "TDS Removal", meta: "membrane purification" },
  { title: "24 Candle Micron", value: "Ultra Filter", meta: "particulate-free purity" },
  { title: "U.V. Treatment", value: "99.99%", meta: "microbe neutralization" },
  { title: "Ozonization", value: "Fresh Seal", meta: "long shelf stability" },
  { title: "Bottling", value: "Final Pack", meta: "food-grade filling" },
];

// Snake layout:
// Row 1 (L→R): 0, 1, 2
//                       |
// Row 2 (R→L): 5, 4, 3
//              |
// Row 3 (L→R): 6, 7, 8
//
// Grid positions (row, col):
// [0]=r0c0  [1]=r0c1  [2]=r0c2
// [5]=r1c0  [4]=r1c1  [3]=r1c2
// [6]=r2c0  [7]=r2c1  [8]=r2c2

// Visual order in the grid (by row, left to right):
const gridOrder = [
  [0, 1, 2], // row 1
  [5, 4, 3], // row 2 (reversed)
  [6, 7, 8], // row 3
];

// Connection sequence: 0→1→2→3→4→5→6→7→8
// Directions:
// 0→1: right, 1→2: right, 2→3: down
// 3→4: left, 4→5: left, 5→6: down
// 6→7: right, 7→8: right
const connections: { from: number; to: number; fromSide: string; toSide: string }[] = [
  { from: 0, to: 1, fromSide: "right", toSide: "left" },
  { from: 1, to: 2, fromSide: "right", toSide: "left" },
  { from: 2, to: 3, fromSide: "bottom", toSide: "top" },
  { from: 3, to: 4, fromSide: "left", toSide: "right" },
  { from: 4, to: 5, fromSide: "left", toSide: "right" },
  { from: 5, to: 6, fromSide: "bottom", toSide: "top" },
  { from: 6, to: 7, fromSide: "right", toSide: "left" },
  { from: 7, to: 8, fromSide: "right", toSide: "left" },
];

const rowColors = [
  { from: "rgba(0,200,83,0.30)", to: "rgba(0,200,83,0.10)", shadow: "rgba(0,200,83,0.18)" },
  { from: "rgba(255,77,141,0.30)", to: "rgba(255,77,141,0.10)", shadow: "rgba(255,77,141,0.18)" },
  { from: "rgba(108,99,255,0.28)", to: "rgba(108,99,255,0.10)", shadow: "rgba(108,99,255,0.20)" },
];

export default function ProcessFlow() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [paths, setPaths] = useState<string[]>([]);

  function getPoint(el: HTMLElement, parent: HTMLElement, side: string): Point {
    const r = el.getBoundingClientRect();
    const p = parent.getBoundingClientRect();
    switch (side) {
      case "right": return { x: r.right - p.left + 4, y: r.top - p.top + r.height / 2 };
      case "left": return { x: r.left - p.left - 4, y: r.top - p.top + r.height / 2 };
      case "top": return { x: r.left - p.left + r.width / 2, y: r.top - p.top - 4 };
      case "bottom": return { x: r.left - p.left + r.width / 2, y: r.bottom - p.top + 4 };
      default: return { x: 0, y: 0 };
    }
  }

  function curve(a: Point, b: Point, horizontal: boolean) {
    const offset = horizontal
      ? Math.abs(b.x - a.x) * 0.35
      : Math.abs(b.y - a.y) * 0.35;
    if (horizontal) {
      return `M ${a.x} ${a.y} C ${a.x + (b.x > a.x ? offset : -offset)} ${a.y}, ${b.x - (b.x > a.x ? offset : -offset)} ${b.y}, ${b.x} ${b.y}`;
    }
    return `M ${a.x} ${a.y} C ${a.x} ${a.y + offset}, ${b.x} ${b.y - offset}, ${b.x} ${b.y}`;
  }

  function updatePaths() {
    if (!containerRef.current) return;
    const parent = containerRef.current;
    const segments: string[] = [];

    for (const conn of connections) {
      const fromEl = cardRefs.current[conn.from];
      const toEl = cardRefs.current[conn.to];
      if (!fromEl || !toEl) continue;

      const a = getPoint(fromEl, parent, conn.fromSide);
      const b = getPoint(toEl, parent, conn.toSide);
      const horizontal = conn.fromSide === "right" || conn.fromSide === "left";
      segments.push(curve(a, b, horizontal));
    }

    setPaths([segments.join(" ")]);
  }

  useEffect(() => {
    const t = setTimeout(updatePaths, 150);
    window.addEventListener("resize", updatePaths);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", updatePaths);
    };
  }, []);

  return (
    <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-6 md:p-8 shadow-[0_30px_80px_rgba(0,0,0,0.55)]">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-[#00C853]/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 -right-28 h-80 w-80 rounded-full bg-[#6C63FF]/15 blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-60 w-60 rounded-full bg-[#ff4d8d]/10 blur-3xl" />

      {/* Header */}
      <div className="relative z-10 mb-8 flex items-center justify-between">
        <h4 className="flex items-center gap-2 text-white text-lg font-bold">
          <Sparkles className="size-4 text-[#00C853] animate-pulse" />
          9-Stage Purification
          <span className="ml-2 rounded-full border border-[#00C853]/25 bg-[#00C853]/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-[#00C853]/80">
            Live
          </span>
        </h4>
        <div className="hidden md:flex items-center gap-2 text-xs text-white/50">
          <span className="inline-flex h-2 w-2 rounded-full bg-[#00C853] shadow-[0_0_12px_rgba(0,200,83,0.8)]" />
          animated stream
        </div>
      </div>

      {/* Flow container */}
      <div ref={containerRef} className="relative z-10 isolate">
        {/* SVG ribbons */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <defs>
            <linearGradient id="flowGrad9" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00C853">
                <animate attributeName="offset" values="0;1" dur="3s" repeatCount="indefinite" />
              </stop>
              <stop offset="50%" stopColor="#ff4d8d">
                <animate attributeName="offset" values="0.5;1.5" dur="3s" repeatCount="indefinite" />
              </stop>
              <stop offset="100%" stopColor="#6C63FF">
                <animate attributeName="offset" values="1;2" dur="3s" repeatCount="indefinite" />
              </stop>
            </linearGradient>
            <filter id="glow9">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {paths.length > 0 && (
            <g>
              <path d={paths[0]} stroke="url(#flowGrad9)" strokeWidth="16" fill="none" strokeLinecap="round" opacity="0.22" filter="url(#glow9)" />
              <path d={paths[0]} stroke="#00C853" strokeWidth="4" fill="none" strokeLinecap="round" strokeDasharray="30 140" />
              <path d={paths[0]} stroke="#ffffff" strokeWidth="4" fill="none" strokeLinecap="round" strokeDasharray="30 140" opacity="0.8" className="flowPulse" />
            </g>
          )}
        </svg>

        {/* Snake grid: 3 rows × 3 cols */}
        <div className="relative z-30 flex flex-col gap-6 lg:gap-8">
          {gridOrder.map((row, rowIdx) => (
            <div key={rowIdx} className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
              {row.map((stepIdx) => {
                const step = steps[stepIdx];
                const color = rowColors[rowIdx];
                return (
                  <div
                    key={stepIdx}
                    ref={(el) => { cardRefs.current[stepIdx] = el; }}
                    className="rounded-2xl border border-white/10 px-6 py-5"
                    style={{
                      background: `linear-gradient(135deg, ${color.from}, ${color.to})`,
                      boxShadow: `0 18px 50px ${color.shadow}`,
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium text-white/70">{step.title}</div>
                      <span className="rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white/70">
                        Stage {String(stepIdx + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div className="mt-2 text-2xl font-extrabold text-white tracking-tight">{step.value}</div>
                    <div className="mt-1 text-xs text-white/60">{step.meta}</div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
