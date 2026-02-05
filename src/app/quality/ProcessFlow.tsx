"use client";

import { useEffect, useRef, useState } from "react";
import { Building2, ArrowRight, Sparkles } from "lucide-react";

type Point = { x: number; y: number };

export default function ProcessFlow() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rawRef = useRef<HTMLDivElement>(null);
  const midRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rightRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [paths, setPaths] = useState<string[]>([]);

  function getRightCenter(el: HTMLElement, parent: HTMLElement): Point {
    const r = el.getBoundingClientRect();
    const p = parent.getBoundingClientRect();
    return { x: r.right - p.left + 6, y: r.top - p.top + r.height / 2 };
  }
  function getLeftCenter(el: HTMLElement, parent: HTMLElement): Point {
    const r = el.getBoundingClientRect();
    const p = parent.getBoundingClientRect();
    return { x: r.left - p.left - 6, y: r.top - p.top + r.height / 2 };
  }
  function getTopCenter(el: HTMLElement, parent: HTMLElement): Point {
    const r = el.getBoundingClientRect();
    const p = parent.getBoundingClientRect();

    return {
      x: r.left - p.left + r.width / 2,
      y: r.top - p.top - 6,
    };
  }

  function getBottomCenter(el: HTMLElement, parent: HTMLElement): Point {
    const r = el.getBoundingClientRect();
    const p = parent.getBoundingClientRect();

    return {
      x: r.left - p.left + r.width / 2,
      y: r.bottom - p.top + 6,
    };
  }

  function curve(a: Point, b: Point) {
    const dx = Math.abs(b.x - a.x);
    const dy = Math.abs(b.y - a.y);

    const offset = Math.max(dx, dy) * 0.4;

    return `M ${a.x} ${a.y} 
          C ${a.x} ${a.y + (b.y > a.y ? offset : -offset)},
            ${b.x} ${b.y - (b.y > a.y ? offset : -offset)},
            ${b.x} ${b.y}`;
  }

  function updatePaths() {
    if (!containerRef.current) return;

    const parent = containerRef.current;

    const raw = rawRef.current;
    const sand = midRefs.current[0];
    const carbon = midRefs.current[1];
    const ro = midRefs.current[2];
    const uv = rightRefs.current[0];
    const ozone = rightRefs.current[1];
    const bottling = rightRefs.current[2];

    if (!raw || !sand || !carbon || !ro || !uv || !ozone || !bottling) return;

    const segments: string[] = [];

    // Raw → Sand (side)
    segments.push(
      curve(getRightCenter(raw, parent), getLeftCenter(sand, parent)),
    );

    // Sand → Carbon (vertical)
    segments.push(
      curve(getBottomCenter(sand, parent), getTopCenter(carbon, parent)),
    );

    // Carbon → RO (vertical)
    segments.push(
      curve(getBottomCenter(carbon, parent), getTopCenter(ro, parent)),
    );

    // RO → Bottling (side)
    segments.push(
      curve(getRightCenter(ro, parent), getLeftCenter(bottling, parent)),
    );

    // Bottling → Ozone (upwards)
    segments.push(
      curve(getTopCenter(bottling, parent), getBottomCenter(ozone, parent)),
    );

    // Ozone → UV (upwards)
    segments.push(
      curve(getTopCenter(ozone, parent), getBottomCenter(uv, parent)),
    );

    setPaths([segments.join(" ")]);
  }

  useEffect(() => {
    const t = setTimeout(updatePaths, 120);
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
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(255,255,255,0.10),transparent_40%),radial-gradient(circle_at_70%_30%,rgba(0,200,83,0.10),transparent_45%),radial-gradient(circle_at_85%_85%,rgba(108,99,255,0.10),transparent_45%)]" />

      {/* Header */}
      <div className="relative z-10 mb-8 flex items-center justify-between">
        <h4 className="flex items-center gap-2 text-white text-lg font-bold">
          <Sparkles className="size-4 text-[#00C853] animate-pulse" />
          Process Flow
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
            {/* moving gradient */}
            <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00C853">
                <animate
                  attributeName="offset"
                  values="0;1"
                  dur="3s"
                  repeatCount="indefinite"
                />
              </stop>
              <stop offset="50%" stopColor="#ff4d8d">
                <animate
                  attributeName="offset"
                  values="0.5;1.5"
                  dur="3s"
                  repeatCount="indefinite"
                />
              </stop>
              <stop offset="100%" stopColor="#6C63FF">
                <animate
                  attributeName="offset"
                  values="1;2"
                  dur="3s"
                  repeatCount="indefinite"
                />
              </stop>
            </linearGradient>

            {/* glow filter */}
            <filter id="softGlow">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {paths.length > 0 && (
            <g>
              {/* Base glow pipe */}
              <path
                d={paths[0]}
                stroke="url(#flowGradient)"
                strokeWidth="16"
                fill="none"
                strokeLinecap="round"
                opacity="0.22"
                filter="url(#softGlow)"
              />

              {/* Liquid flow */}
              <path
                d={paths[0]}
                stroke="#00C853"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
                strokeDasharray="30 140"
              />

              {/* Traveling light beam */}
              <path
                d={paths[0]}
                stroke="#ffffff"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
                strokeDasharray="30 140"
                opacity="0.8"
                className="flowPulse"
              />
            </g>
          )}
        </svg>

        {/* Cards */}
        <div className="relative  z-30 grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-10">
          {/* Left */}
          <div className="flex lg:items-start">
            <div
              ref={rawRef}
              className="w-full rounded-2xl bg-white/95 px-6 py-6 shadow-[0_22px_60px_rgba(0,0,0,0.40)] ring-1 ring-white/50"
            >
              <div className="flex items-start gap-4">
                <div className="grid size-11 place-items-center rounded-xl bg-black/5 ring-1 ring-black/10">
                  <Building2 className="size-5 text-black/70" />
                </div>
                <div>
                  <div className="text-sm font-medium text-black/60">
                    Source
                  </div>
                  <div className="text-xl font-extrabold text-black tracking-tight">
                    Raw Water
                  </div>
                  <div className="mt-2 inline-flex rounded-full bg-black/5 px-3 py-1 text-xs font-semibold text-black/60 ring-1 ring-black/10">
                    Intake • Pre-treatment
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Middle */}
          <div className="flex flex-col gap-4 lg:gap-5">
            {[
              {
                title: "Sand Filter",
                value: "Sediment",
                meta: "clarifies turbidity",
              },
              {
                title: "Carbon Filter",
                value: "Odor/Chlorine",
                meta: "taste & smell control",
              },
              {
                title: "RO System",
                value: "TDS Removal",
                meta: "membrane purification",
              },
            ].map((x, i) => (
              <div
                key={i}
                ref={(el) => {
                  midRefs.current[i] = el;
                }}
                className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#ff4d8d]/30 to-[#ff4d8d]/10 px-6 py-5 shadow-[0_18px_50px_rgba(255,77,141,0.18)]"
              >
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium text-white/70">
                    {x.title}
                  </div>
                  <span className="rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white/70">
                    Stage {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="mt-2 text-2xl font-extrabold text-white tracking-tight">
                  {x.value}
                </div>

                <div className="mt-1 text-xs text-white/60">{x.meta}</div>
              </div>
            ))}
          </div>

          {/* Right */}
          <div className="flex flex-col gap-4 lg:gap-5 lg:justify-center">
            {[
              {
                title: "Bottling",
                value: "Final Pack",
                meta: "food-grade filling",
              },
              {
                title: "Ozonization",
                value: "Fresh Seal",
                meta: "long shelf stability",
              },
              {
                title: "UV Sterilization",
                value: "99.99%",
                meta: "microbe neutralization",
              },
            ].map((x, i) => (
              <div
                key={i}
                ref={(el) => {
                  rightRefs.current[i] = el;
                }}
                className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#6C63FF]/28 to-[#6C63FF]/10 px-6 py-5 shadow-[0_18px_55px_rgba(108,99,255,0.20)]"
              >
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium text-white/70">
                    {x.title}
                  </div>
                  <ArrowRight className="size-4 text-white/35" />
                </div>

                <div className="mt-2 text-2xl font-extrabold text-white tracking-tight">
                  {x.value}
                </div>

                <div className="mt-1 text-xs text-white/60">{x.meta}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
