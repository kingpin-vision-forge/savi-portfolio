"use client";

import { useEffect, useRef, useState } from "react";
import { Sparkles } from "lucide-react";

type Point = { x: number; y: number };
type ConnectionSide = "right" | "left" | "top" | "bottom";
type FlowPath = { key: string; d: string; accent: string };

const steps = [
  { title: "Raw Water Tank", value: "Source", meta: "intake & pre-treatment" },
  { title: "Sand Filtration", value: "Sediment", meta: "clarifies turbidity" },
  {
    title: "Carbon Filter",
    value: "Odor/Chlorine",
    meta: "taste & smell control",
  },
  {
    title: "12 Candle Micron",
    value: "Fine Filter",
    meta: "micro-sediment removal",
  },
  {
    title: "Reverse Osmosis",
    value: "TDS Removal",
    meta: "membrane purification",
  },
  {
    title: "24 Candle Micron",
    value: "Ultra Filter",
    meta: "particulate-free purity",
  },
  { title: "U.V. Treatment", value: "99.99%", meta: "microbe neutralization" },
  { title: "Ozonization", value: "Fresh Seal", meta: "long shelf stability" },
  { title: "Bottling", value: "Final Pack", meta: "food-grade filling" },
];

const gridOrder = [
  [0, 1, 2],
  [5, 4, 3],
  [6, 7, 8],
];

const connections: {
  from: number;
  to: number;
  fromSide: ConnectionSide;
  toSide: ConnectionSide;
}[] = [
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
  {
    accent: "#00C853",
    from: "rgba(0,200,83,0.30)",
    to: "rgba(0,200,83,0.10)",
    shadow: "rgba(0,200,83,0.18)",
  },
  {
    accent: "#FF4D8D",
    from: "rgba(255,77,141,0.30)",
    to: "rgba(255,77,141,0.10)",
    shadow: "rgba(255,77,141,0.18)",
  },
  {
    accent: "#6C63FF",
    from: "rgba(108,99,255,0.28)",
    to: "rgba(108,99,255,0.10)",
    shadow: "rgba(108,99,255,0.20)",
  },
];

const connAccents = [
  "#00C853",
  "#00C853",
  "#FF4D8D",
  "#FF4D8D",
  "#FF4D8D",
  "#6C63FF",
  "#6C63FF",
  "#6C63FF",
];

function getRowColor(stepIdx: number) {
  if (stepIdx < 3) return rowColors[0];
  if (stepIdx < 6) return rowColors[1];
  return rowColors[2];
}

/**
 * Walks up the DOM from `el` accumulating offsetLeft/offsetTop
 * until it hits `ancestor`, giving position relative to ancestor.
 * This avoids getBoundingClientRect scroll/transform issues.
 */
function getOffsetRelativeTo(
  el: HTMLElement,
  ancestor: HTMLElement,
): { x: number; y: number; w: number; h: number } {
  let x = 0;
  let y = 0;
  let cur: HTMLElement | null = el;
  while (cur && cur !== ancestor) {
    x += cur.offsetLeft;
    y += cur.offsetTop;
    cur = cur.offsetParent as HTMLElement | null;
  }
  return { x, y, w: el.offsetWidth, h: el.offsetHeight };
}

const GAP = 12; // px gap from card edge to path endpoint

function edgePoint(
  pos: { x: number; y: number; w: number; h: number },
  side: ConnectionSide,
): Point {
  const cx = pos.x + pos.w / 2;
  const cy = pos.y + pos.h / 2;
  switch (side) {
    case "right":
      return { x: pos.x + pos.w + GAP, y: cy };
    case "left":
      return { x: pos.x - GAP, y: cy };
    case "top":
      return { x: cx, y: pos.y - GAP };
    case "bottom":
      return { x: cx, y: pos.y + pos.h + GAP };
  }
}

function cubicBezier(a: Point, b: Point, horizontal: boolean): string {
  if (horizontal) {
    const ctrl = Math.max(Math.abs(b.x - a.x) * 0.45, 24);
    const cx1 = a.x + (b.x >= a.x ? ctrl : -ctrl);
    const cx2 = b.x + (b.x >= a.x ? -ctrl : ctrl);
    return `M ${a.x} ${a.y} C ${cx1} ${a.y}, ${cx2} ${b.y}, ${b.x} ${b.y}`;
  } else {
    const ctrl = Math.max(Math.abs(b.y - a.y) * 0.45, 24);
    const cy1 = a.y + (b.y >= a.y ? ctrl : -ctrl);
    const cy2 = b.y + (b.y >= a.y ? -ctrl : ctrl);
    return `M ${a.x} ${a.y} C ${a.x} ${cy1}, ${b.x} ${cy2}, ${b.x} ${b.y}`;
  }
}

export default function ProcessFlow() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [paths, setPaths] = useState<FlowPath[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [svgSize, setSvgSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  function updatePaths() {
    const parent = containerRef.current;
    if (!parent || isMobile) {
      setPaths([]);
      return;
    }

    // Use offsetWidth/offsetHeight — no scroll offset contamination
    setSvgSize({ w: parent.offsetWidth, h: parent.offsetHeight });

    const segments: FlowPath[] = [];

    connections.forEach((conn, idx) => {
      const fromEl = cardRefs.current[conn.from];
      const toEl = cardRefs.current[conn.to];
      if (!fromEl || !toEl) return;

      const fromPos = getOffsetRelativeTo(fromEl, parent);
      const toPos = getOffsetRelativeTo(toEl, parent);

      const a = edgePoint(fromPos, conn.fromSide);
      const b = edgePoint(toPos, conn.toSide);
      const horizontal = conn.fromSide === "right" || conn.fromSide === "left";

      segments.push({
        key: `${conn.from}-${conn.to}`,
        d: cubicBezier(a, b, horizontal),
        accent: connAccents[idx],
      });
    });

    setPaths(segments);
  }

  useEffect(() => {
    let rafId: number;
    const schedule = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => requestAnimationFrame(updatePaths));
    };

    schedule();
    window.addEventListener("resize", schedule);

    const ro = new ResizeObserver(schedule);
    if (containerRef.current) ro.observe(containerRef.current);
    cardRefs.current.forEach((c) => {
      if (c) ro.observe(c);
    });
    document.fonts?.ready.then(schedule).catch(() => {});

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      window.removeEventListener("resize", schedule);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile]);

  return (
    <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-6 md:p-8 shadow-[0_30px_80px_rgba(0,0,0,0.55)]">
      {/* Ambient glows */}
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

      {/* Flow container — position:relative so offsetParent chain resolves here */}
      <div ref={containerRef} style={{ position: "relative" }}>
        {/* SVG at z-index 1 — behind cards */}
        {!isMobile && svgSize.w > 0 && (
          <svg
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: svgSize.w,
              height: svgSize.h,
              zIndex: 1,
              overflow: "visible",
              pointerEvents: "none",
            }}
          >
            <defs>
              <filter
                id="flowGlow"
                x="-40%"
                y="-40%"
                width="180%"
                height="180%"
              >
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {paths.map((path, idx) => (
              <g key={path.key}>
                {/* Wide halo */}
                <path
                  d={path.d}
                  fill="none"
                  stroke="rgba(255,255,255,0.08)"
                  strokeWidth="16"
                  strokeLinecap="round"
                />
                {/* Glow */}
                <path
                  d={path.d}
                  fill="none"
                  stroke={path.accent}
                  strokeWidth="10"
                  strokeLinecap="round"
                  opacity="0.22"
                  filter="url(#flowGlow)"
                />
                {/* Solid accent */}
                <path
                  d={path.d}
                  fill="none"
                  stroke={path.accent}
                  strokeWidth="3"
                  strokeLinecap="round"
                  opacity="0.75"
                />
                {/* Animated moving dash */}
                <path
                  d={path.d}
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeDasharray="28 142"
                  opacity="0.95"
                  style={{
                    animation: `flowMove ${1.7 + idx * 0.12}s linear infinite`,
                    filter: `drop-shadow(0 0 8px ${path.accent})`,
                  }}
                />
              </g>
            ))}
          </svg>
        )}

        {/* Mobile: vertical list */}
        {isMobile ? (
          <div
            style={{ position: "relative", zIndex: 2 }}
            className="flex flex-col items-center"
          >
            {steps.map((step, idx) => {
              const color = getRowColor(idx);
              return (
                <div key={idx} className="w-full flex flex-col items-center">
                  <div
                    className="w-full rounded-2xl border border-white/10 px-5 py-4"
                    style={{
                      background: `linear-gradient(135deg, ${color.from}, ${color.to})`,
                      boxShadow: `0 18px 50px ${color.shadow}`,
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium text-white/70">
                        {step.title}
                      </div>
                      <span className="rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white/70">
                        Stage {String(idx + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div className="mt-2 text-2xl font-extrabold text-white tracking-tight">
                      {step.value}
                    </div>
                    <div className="mt-1 text-xs text-white/60">
                      {step.meta}
                    </div>
                  </div>
                  {idx < steps.length - 1 && (
                    <div className="flex flex-col items-center py-1">
                      <div className="w-px h-6 bg-gradient-to-b from-[#00C853]/60 to-[#00C853]/20" />
                      <div className="size-2 rounded-full bg-[#00C853]/40" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          /* Desktop 3×3 snake grid — z-index 2, sits above SVG */
          <div
            style={{ position: "relative", zIndex: 2 }}
            className="flex flex-col gap-6 lg:gap-8"
          >
            {gridOrder.map((row, rowIdx) => (
              <div key={rowIdx} className="grid grid-cols-3 gap-4 lg:gap-6">
                {row.map((stepIdx) => {
                  const step = steps[stepIdx];
                  const color = rowColors[rowIdx];
                  return (
                    <div
                      key={stepIdx}
                      ref={(el) => {
                        cardRefs.current[stepIdx] = el;
                      }}
                      className="rounded-2xl border border-white/10 px-6 py-5"
                      style={{
                        background: `linear-gradient(135deg, ${color.from}, ${color.to})`,
                        boxShadow: `0 18px 50px ${color.shadow}`,
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-medium text-white/70">
                          {step.title}
                        </div>
                        <span className="rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white/70">
                          Stage {String(stepIdx + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <div className="mt-2 text-2xl font-extrabold text-white tracking-tight">
                        {step.value}
                      </div>
                      <div className="mt-1 text-xs text-white/60">
                        {step.meta}
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`@keyframes flowMove { to { stroke-dashoffset: -170; } }`}</style>
    </div>
  );
}
