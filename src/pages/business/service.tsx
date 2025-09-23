"use client";

import React, { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import { motion, type Transition, cubicBezier, easeInOut } from "framer-motion";
import Layout from "@/components/Layout";
import HeroSection from "@/components/HeroSection";
import BreadcrumbSection from "@/components/BreadcrumbSection";
import { useLangStore } from "@/stores/langStore";
import { serviceContent } from "@/data/service";

/* =========================
   Process section components
   ========================= */

interface ProcessCardProps {
  children: React.ReactNode;
  type?: "step" | "decision";
  state?: "default" | "active" | "warning";
  className?: string;
  onClick?: () => void;
  processingTime?: number;
}

function ProcessCard({
  children,
  type = "step",
  state = "default",
  className = "",
  onClick,
  processingTime,
}: ProcessCardProps) {
  const [isHover, setIsHover] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const baseStyles =
    "w-[280px] h-[110px] rounded-2xl flex items-center justify-center text-center p-4 cursor-pointer transition-all duration-300 relative overflow-hidden backdrop-blur-sm";

  const typeStyles = {
    step: `bg-gradient-to-br from-[#0B2A63]/90 via-[#1e40af]/80 to-[#0A1F4A]/90 
           border border-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.3)]
           before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:translate-x-[-100%] before:transition-transform before:duration-700
           hover:before:translate-x-[100%] text-white`,
    decision: `bg-gradient-to-br from-slate-100/80 via-slate-200/70 to-slate-300/80 
               border border-slate-400/40 backdrop-blur-md shadow-[0_0_15px_rgba(148,163,184,0.2)]
               text-[#2B2F37]`,
  };

  const stateStyles = {
    default: "",
    active:
      "ring-2 ring-cyan-400 ring-offset-2 shadow-[0_0_30px_rgba(34,211,238,0.4)]",
    warning:
      "ring-2 ring-red-400 ring-offset-2 shadow-[0_0_30px_rgba(248,113,113,0.4)]",
  };

  const hoverStyles = isHover
    ? "scale-[1.02] shadow-[0_20px_40px_rgba(59,130,246,0.4)] translate-y-[-2px]"
    : "";

  useEffect(() => {
    if (state === "active") {
      setIsProcessing(true);
      const timer = setTimeout(
        () => setIsProcessing(false),
        processingTime || 2000
      );
      return () => clearTimeout(timer);
    }
  }, [state, processingTime]);

  return (
    <div
      className={`${baseStyles} ${typeStyles[type]} ${stateStyles[state]} ${hoverStyles} ${className}`}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onClick={onClick}
    >
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="h-full w-full animate-pulse bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent" />
      </div>

      {/* Processing animation */}
      {isProcessing && (
        <div className="absolute inset-0 rounded-2xl border-2 border-cyan-400">
          <div className="absolute inset-0 animate-spin bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 text-lg font-semibold leading-tight">
        {children}
      </div>

      {/* Status indicator */}
      {state === "active" && (
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 transform flex items-center gap-2">
          <div className="flex gap-1">
            <div className="h-2 w-2 animate-pulse rounded-full bg-cyan-400" />
            <div className="h-2 w-2 animate-pulse rounded-full bg-cyan-400 [animation-delay:100ms]" />
            <div className="h-2 w-2 animate-pulse rounded-full bg-cyan-400 [animation-delay:200ms]" />
          </div>
          <span className="text-xs font-medium text-cyan-400">Processing</span>
        </div>
      )}

      {/* Corner indicators */}
      <div className="absolute top-2 right-2 h-2 w-2 animate-ping rounded-full bg-emerald-400 opacity-60" />
    </div>
  );
}

function NGPill({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative rounded-full border border-red-400/50 bg-gradient-to-r from-red-500 to-red-600 px-3 py-1 text-xs font-bold text-white shadow-[0_0_10px_rgba(239,68,68,0.5)] animate-pulse ${className}`}
    >
      <span className="relative z-10">NG</span>
      <div className="absolute inset-0 rounded-full bg-red-400 opacity-30 animate-ping" />
    </div>
  );
}

interface ConnectorProps {
  direction?: "horizontal" | "vertical";
  className?: string;
  showNG?: boolean;
  length?: number;
  animated?: boolean;
}

function Connector({
  direction = "horizontal",
  className = "",
  showNG = false,
  length = 60,
  animated = true,
}: ConnectorProps) {
  return (
    <div className={`relative ${className}`}>
      {direction === "horizontal" && (
        <>
          <div className="relative flex items-center">
            <div
              className="h-[3px] rounded-full bg-gradient-to-r from-[#12386E] via-cyan-400 to-[#12386E] shadow-[0_0_8px_rgba(34,211,238,0.5)]"
              style={{ width: `${length}px` }}
            />
            <div className="h-0 w-0 border-l-[8px] border-l-cyan-400 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent shadow-[0_0_8px_rgba(34,211,238,0.5)]" />

            {animated && (
              <div className="absolute inset-0 overflow-hidden">
                <div
                  className="h-1 rounded-full bg-gradient-to-r from-transparent via-cyan-300 to-transparent"
                  style={{
                    width: "20px",
                    animation: `flowRight 2s linear infinite`,
                  }}
                />
              </div>
            )}
          </div>
          {showNG && (
            <NGPill className="absolute left-1/2 top-1/2 -mt-3 -translate-x-1/2 -translate-y-full transform" />
          )}
        </>
      )}

      {direction === "vertical" && (
        <>
          <div className="relative flex flex-col items-center">
            <div
              className="w-[3px] rounded-full bg-gradient-to-b from-[#12386E] via-cyan-400 to-[#12386E] shadow-[0_0_8px_rgba(34,211,238,0.5)]"
              style={{ height: `${length}px` }}
            />
            <div className="h-0 w-0 border-t-[8px] border-t-cyan-400 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent shadow-[0_0_8px_rgba(34,211,238,0.5)]" />

            {animated && (
              <div className="absolute inset-0 overflow-hidden">
                <div
                  className="w-1 rounded-full bg-gradient-to-b from-transparent via-cyan-300 to-transparent"
                  style={{
                    height: "20px",
                    animation: `flowDown 2s linear infinite`,
                  }}
                />
              </div>
            )}
          </div>
          {showNG && (
            <NGPill className="absolute left-full top-1/2 ml-3 -translate-y-1/2 transform" />
          )}
        </>
      )}
    </div>
  );
}

function DataFlowVisualizer({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`}>
      {/* grid */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" className="text-cyan-400">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* floating dots */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-cyan-400 opacity-60"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 3) * 20}%`,
              animation: `float 3s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

function ProcessFlowChart() {
  // ===== Stage (auto-scale) dengan stroke non-scaling =====
  const DESIGN_W = 3700;
  const DESIGN_H = 560;
  const GRID = 20;
  const ARCH_HEIGHT = 72;       // tinggi arc seragam (NG pendek)
  const LONG_ARCH_HEIGHT = 140; // loop Re-Order → Concept
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [scale, setScale] = React.useState(1);

  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      const w = el.clientWidth;
      setScale(Math.min(w / DESIGN_W, 1));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  type Anchor = "left" | "right" | "top" | "bottom";
  interface FlowNode {
    id: string;
    label: React.ReactNode;
    type?: "step" | "decision";
    x: number; y: number; w?: number; h?: number;
  }
  interface Waypoint { x: number; y: number; }
  interface FlowEdge {
    from: string; to: string;
    fromAnchor?: Anchor; toAnchor?: Anchor;
    via?: Waypoint[];
    dashed?: boolean; animated?: boolean;
    label?: "OK" | string;
    archUp?: boolean;
    showNGPill?: boolean;
  }

  // ===== Dimensi & baris standar =====
  const CARD_W = 300;
  const CARD_H = 108;
  const TOP_Y = 36;
  const BOT_Y = 340;
  const X0 = 40;
  const GAP = 340;

  // ===== Posisi node =====
  const NODES: FlowNode[] = [
    { id: "customer",  label: "Customer", x: X0 + GAP * 0, y: TOP_Y, w: CARD_W, h: CARD_H, type: "step" },
    { id: "concept",   label: <>Concept 설계<br/><span className="text-xs opacity-80">Concept Design</span></>, x: X0 + GAP * 1, y: TOP_Y, type: "step" },
    { id: "dr",        label: "D/R", x: X0 + GAP * 2, y: TOP_Y, type: "decision" },
    { id: "dev",       label: <>개발/가공 설계<br/><span className="text-xs opacity-80">Development / Machining Design</span></>, x: X0 + GAP * 3, y: TOP_Y, type: "step" },
    { id: "review",    label: <>검토승인<br/><span className="text-xs opacity-80">Review Approval</span></>, x: X0 + GAP * 4, y: TOP_Y, type: "decision" },
    { id: "order",     label: <>발주(소재/부품)<br/><span className="text-xs opacity-80">Place Order: Materials/Parts</span></>, x: X0 + GAP * 5, y: TOP_Y, type: "step" },

    { id: "partner",   label: <>협력사<br/><span className="text-xs opacity-80">Supplier</span></>, x: X0 + GAP * 6 + 20, y: 210, w: 220, h: 90, type: "step" },

    { id: "incoming",  label: <>수입검사<br/><span className="text-xs opacity-80">Incoming Inspection</span></>, x: X0 + GAP * 4, y: BOT_Y, type: "decision" },
    { id: "machining", label: <>가공/제작<br/><span className="text-xs opacity-80">Processing / Manufacturing</span></>, x: X0 + GAP * 5 - 20, y: BOT_Y, type: "step" },
    { id: "assyqa",    label: <>조립/측정검사<br/><span className="text-xs opacity-80">Assembly & Measurement Inspection</span></>, x: X0 + GAP * 6, y: BOT_Y, type: "decision" },
    { id: "packing",   label: <>포장<br/><span className="text-xs opacity-80">Packaging</span></>, x: X0 + GAP * 7, y: BOT_Y, type: "step" },
    { id: "delivery",  label: <>고객사 납품<br/><span className="text-xs opacity-80">Delivery to Customer</span></>, x: X0 + GAP * 8, y: BOT_Y, type: "step" },
    { id: "feedback",  label: "고객 Feedback", x: X0 + GAP * 9, y: BOT_Y, type: "step" },
    { id: "reorder",   label: <>Re-Order 개선/반영<br/><span className="text-xs opacity-80">Re-Order & Improvement</span></>, x: X0 + GAP * 10, y: BOT_Y, type: "step" },
  ];

  // ===== Helpers =====
  const nodeById = (id: string) => NODES.find(n => n.id === id)!;
  const anchor = (n: any, where: Anchor) => {
    const w = n.w ?? CARD_W, h = n.h ?? CARD_H;
    const cx = n.x + w / 2, cy = n.y + h / 2;
    if (where === "left")   return { x: n.x,     y: cy };
    if (where === "right")  return { x: n.x + w, y: cy };
    if (where === "top")    return { x: cx,      y: n.y };
    /* bottom */            return { x: cx,      y: n.y + h };
  };
  const snap = (v: number) => Math.round(v / GRID) * GRID;

  // rute ortogonal (H→V→H)
  const hvh = (a: {x:number;y:number}, b: {x:number;y:number}, midX?: number, midY?: number) => {
    const mX = midX !== undefined ? snap(midX) : snap((a.x + b.x) / 2);
    const mY = midY !== undefined ? snap(midY) : undefined;
    if (mY !== undefined) {
      return [`M ${snap(a.x)} ${snap(a.y)}`,
              `L ${snap(mX)} ${snap(a.y)}`,
              `L ${snap(mX)} ${snap(mY)}`,
              `L ${snap(b.x)} ${snap(mY)}`,
              `L ${snap(b.x)} ${snap(b.y)}`].join(" ");
    }
    return [`M ${snap(a.x)} ${snap(a.y)}`,
            `L ${snap(mX)} ${snap(a.y)}`,
            `L ${snap(mX)} ${snap(b.y)}`,
            `L ${snap(b.x)} ${snap(b.y)}`].join(" ");
  };

  // ===== Edges =====
  const EDGES = [
    { from: "customer", to: "concept",    fromAnchor: "right", toAnchor: "left" },
    { from: "concept",  to: "dr",         fromAnchor: "right", toAnchor: "left" },
    { from: "dr",       to: "dev",        fromAnchor: "right", toAnchor: "left", label: "OK" },
    { from: "dev",      to: "review",     fromAnchor: "right", toAnchor: "left" },
    { from: "review",   to: "order",      fromAnchor: "right", toAnchor: "left", label: "OK" },

    { from: "order", to: "incoming", fromAnchor: "bottom", toAnchor: "top",
      via: [{ x: snap(nodeById("order").x + 300 / 2), y: 260 }, { x: snap(nodeById("incoming").x + 300 / 2), y: 260 }] },

    { from: "incoming", to: "machining", fromAnchor: "right", toAnchor: "left", label: "OK" },
    { from: "machining", to: "assyqa",   fromAnchor: "right", toAnchor: "left" },
    { from: "assyqa",   to: "packing",   fromAnchor: "right", toAnchor: "left", label: "OK" },
    { from: "packing",  to: "delivery",  fromAnchor: "right", toAnchor: "left" },
    { from: "delivery", to: "feedback",  fromAnchor: "right", toAnchor: "left" },
    { from: "feedback", to: "reorder",   fromAnchor: "right", toAnchor: "left" },

    { from: "reorder", to: "concept", fromAnchor: "top", toAnchor: "bottom", dashed: true, archUp: true, label: "Improve & Re-Order" },

    { from: "dr",     to: "concept", fromAnchor: "top", toAnchor: "top", dashed: true, archUp: true, showNGPill: true, label: "NG" },
    { from: "review", to: "dev",     fromAnchor: "top", toAnchor: "top", dashed: true, archUp: true, showNGPill: true, label: "NG" },

    { from: "incoming", to: "partner", fromAnchor: "right", toAnchor: "left", dashed: true, showNGPill: true, label: "NG",
      via: [{ x: snap(nodeById("incoming").x + 300 + 40), y: 340 + 108 / 2 }, { x: snap(nodeById("partner").x - 40), y: 340 + 108 / 2 }] },
    { from: "partner", to: "incoming", fromAnchor: "bottom", toAnchor: "top", label: "Re-test / 재검",
      via: [{ x: snap(nodeById("partner").x + (nodeById("partner").w ?? 220) / 2), y: 300 }, { x: snap(nodeById("incoming").x + 300 / 2), y: 300 }] },

    { from: "assyqa", to: "machining", fromAnchor: "left", toAnchor: "right", dashed: true, label: "NG", showNGPill: true },
  ] as any[];

  const dashedEdges = EDGES.filter(e => !!e.dashed);
  const solidEdges  = EDGES.filter(e => !e.dashed);

  const [activeCard, setActiveCard] = React.useState<string | null>(null);
  const [live, setLive] = React.useState({ th: 87, ef: 94, qu: 99.2 });
  React.useEffect(() => {
    const t = setInterval(() => setLive({
      th: Math.floor(Math.random() * 10) + 85,
      ef: Math.floor(Math.random() * 8) + 90,
      qu: Math.floor(Math.random() * 80) / 100 + 98.5,
    }), 3000);
    return () => clearInterval(t);
  }, []);

  const lineCommon = {
    vectorEffect: "non-scaling-stroke" as const,
    shapeRendering: "geometricPrecision" as const,
  };

  const getLabelPos = (start:{x:number;y:number}, end:{x:number;y:number}, isLong:boolean, archUp?:boolean) => {
    const midX = snap((start.x + end.x) / 2);
    if (archUp) {
      const h = isLong ? LONG_ARCH_HEIGHT : ARCH_HEIGHT;
      const y = snap(Math.min(start.y, end.y) - h - 8);
      return { x: midX, y };
    }
    return { x: midX, y: snap((start.y + end.y) / 2) - 8 };
  };

  return (
    <div className="relative w-full overflow-hidden rounded-xl bg-gradient-to-b from-[#0a142b] to-[#0a1633]">
      {/* Header */}
      <div className="relative z-10 py-6 text-center">
        <h2 className="mb-1 text-2xl font-bold tracking-tight text-white">차세대 반도체 제조 프로세스</h2>
        <p className="text-sm text-cyan-200/80">Next-Generation Semiconductor Manufacturing Process</p>
        <div className="mt-3 flex justify-center gap-4 text-xs">
          <div className="rounded-md border border-cyan-500/30 bg-slate-800/50 px-2.5 py-1 leading-none"><span className="text-cyan-300">Throughput</span> <span className="ml-1 font-mono text-white">{live.th}%</span></div>
          <div className="rounded-md border border-emerald-500/30 bg-slate-800/50 px-2.5 py-1 leading-none"><span className="text-emerald-300">Efficiency</span> <span className="ml-1 font-mono text-white">{live.ef}%</span></div>
          <div className="rounded-md border border-purple-500/30 bg-slate-800/50 px-2.5 py-1 leading-none"><span className="text-purple-300">Quality</span> <span className="ml-1 font-mono text-white">{live.qu}%</span></div>
        </div>
      </div>

      {/* Stage */}
      <div ref={containerRef} className="relative z-10 h-[540px] overflow-x-auto overflow-y-hidden px-8">
        <div className="relative origin-top-left" style={{ width: DESIGN_W, height: DESIGN_H, transform: `scale(${scale})` }}>
          {/* Grid */}
          <div className="pointer-events-none absolute inset-0 opacity-[0.06]">
            <svg width={DESIGN_W} height={DESIGN_H} className="text-white">
              <defs><pattern id="g" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" /></pattern></defs>
              <rect width="100%" height="100%" fill="url(#g)" />
            </svg>
          </div>

          {/* EDGES */}
          <svg className="absolute inset-0" width={DESIGN_W} height={DESIGN_H}>
            <defs>
              <marker id="arrowClean" markerWidth="9" markerHeight="7" refX="9" refY="3.5" orient="auto" markerUnits="strokeWidth">
                <polygon points="0 0, 9 3.5, 0 7" className="fill-cyan-300" />
              </marker>
              <linearGradient id="edgeGradClean" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#22d3ee" />
                <stop offset="100%" stopColor="#60a5fa" />
              </linearGradient>
            </defs>

            {/* dashed layer */}
            {dashedEdges.map((e, i) => {
              const A = nodeById(e.from), B = nodeById(e.to);
              const start = anchor(A, e.fromAnchor ?? "right");
              const end   = anchor(B, e.toAnchor   ?? "left");

              let d: string;
              if (e.archUp) {
                const dx = (end.x - start.x);
                const cpPull = Math.max(120, Math.abs(dx) * 0.25);
                const cp1 = { x: snap(start.x + cpPull), y: snap(start.y - ARCH_HEIGHT) };
                const cp2 = { x: snap(end.x - cpPull),   y: snap(end.y   - ARCH_HEIGHT) };
                if (e.from === "reorder" && e.to === "concept") {
                  cp1.y = snap(start.y - LONG_ARCH_HEIGHT);
                  cp2.y = snap(end.y   - LONG_ARCH_HEIGHT);
                }
                d = `M ${snap(start.x)} ${snap(start.y)} C ${cp1.x} ${cp1.y}, ${cp2.x} ${cp2.y}, ${snap(end.x)} ${snap(end.y)}`;
              } else if (e.via && e.via.length) {
                d = hvh(start, end, e.via[0]?.x, e.via[0]?.y);
              } else {
                d = start.y === end.y
                  ? `M ${snap(start.x)} ${snap(start.y)} L ${snap(end.x)} ${snap(end.y)}`
                  : hvh(start, end);
              }

              const isLong = e.from === "reorder" && e.to === "concept";
              const lp = getLabelPos(start, end, isLong, e.archUp);

              return (
                <g key={`d-${i}`}>
                  <path
                    d={d}
                    fill="none"
                    stroke="url(#edgeGradClean)"
                    strokeWidth={2}
                    markerEnd="url(#arrowClean)"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="[stroke-dasharray:6_4]"
                    style={{ filter: "drop-shadow(0 0 5px rgba(34,211,238,0.20))", pointerEvents: "none" }}
                    {...lineCommon}
                  />
                  {e.label && e.label !== "OK" && (
                    <text x={lp.x} y={lp.y} textAnchor="middle" className="fill-cyan-200 text-[11px]" {...lineCommon}>
                      {e.label}
                    </text>
                  )}
                  {e.showNGPill && (
                    <foreignObject x={lp.x - 18} y={lp.y - 18} width="64" height="26">
                      <div className="pointer-events-none"><NGPill /></div>
                    </foreignObject>
                  )}
                </g>
              );
            })}

            {/* solid layer */}
            {solidEdges.map((e, i) => {
              const A = nodeById(e.from), B = nodeById(e.to);
              const start = anchor(A, e.fromAnchor ?? "right");
              const end   = anchor(B, e.toAnchor   ?? "left");

              let d: string;
              if (e.via && e.via.length) {
                d = hvh(start, end, e.via[0]?.x, e.via[0]?.y);
              } else {
                d = start.y === end.y
                  ? `M ${snap(start.x)} ${snap(start.y)} L ${snap(end.x)} ${snap(end.y)}`
                  : hvh(start, end);
              }

              const lp = getLabelPos(start, end, false, false);

              return (
                <g key={`s-${i}`}>
                  <path
                    d={d}
                    fill="none"
                    stroke="url(#edgeGradClean)"
                    strokeWidth={2}
                    markerEnd="url(#arrowClean)"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ filter: "drop-shadow(0 0 8px rgba(94,234,212,0.25))", pointerEvents: "none" }}
                    {...lineCommon}
                  />
                  {e.label === "OK" && (
                    <foreignObject x={lp.x - 16} y={lp.y - 18} width="40" height="24">
                      <div className="pointer-events-none rounded-full border border-emerald-400/40 bg-emerald-500/90 px-2.5 py-0.5 text-[10px] font-bold text-white">OK</div>
                    </foreignObject>
                  )}
                </g>
              );
            })}
          </svg>

          {/* NODES */}
          {NODES.map((n) => {
            const w = n.w ?? 300, h = n.h ?? 108;
            return (
              <div key={n.id} style={{ position: "absolute", left: snap(n.x), top: snap(n.y), width: w, height: h }}>
                <ProcessCard
                  type={n.type ?? "step"}
                  state={activeCard === n.id ? "active" : "default"}
                  onClick={() => setActiveCard(n.id)}
                  processingTime={1200}
                  className="!w-full !h-full"
                >
                  <div className="leading-snug">{n.label}</div>
                </ProcessCard>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer chip */}
      <div className="relative z-10 py-4 text-center">
        <div className="inline-flex items-center gap-3 rounded-full border border-cyan-500/30 bg-slate-900/60 px-5 py-2 backdrop-blur-sm">
          <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
          <span className="text-xs text-cyan-200">Aligned to Grid · Orthogonal Routes</span>
        </div>
      </div>

      <style jsx>{`
        @keyframes dashMove { 0% { stroke-dashoffset: 0 } 100% { stroke-dashoffset: -200 } }
      `}</style>
    </div>
  );
}

/* =========================
   NEW: Core Capabilities Image Section
   ========================= */

function CoreCapabilitiesImageSection() {
  const { lang } = useLangStore();
  const langCode = (lang === "KOR" ? "KOR" : "ENG") as "KOR" | "ENG";

  // replace with your actual image paths
  const coreImgKor = "/images/businerr/process/core-capabilities-kor.png";
  const coreImgEng = "/images/businerr/process/core-capabilities-eng.png";
  const imgSrc = langCode === "KOR" ? coreImgKor : coreImgEng;

  const titleText =
    langCode === "KOR" ? "핵심 기술 및 보유 기술" : "Core Capabilities & Technologies";
  const subtitleText =
    langCode === "KOR"
      ? "정밀가공 · 모듈화 · 장비 기술"
      : "Precision · Modularization · Equipment";

  return (
    <section className="relative overflow-hidden bg-[radial-gradient(ellipse_at_top,_rgba(9,18,42,1)_0%,_rgba(8,14,31,1)_45%,_#070d1f_100%)] py-16 md:py-24">
      {/* soft grid + glow */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.08]">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="cg-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cg-grid)" />
        </svg>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_60%_20%,rgba(56,189,248,0.12),transparent_40%),radial-gradient(circle_at_30%_70%,rgba(192,132,252,0.10),transparent_45%)]" />

      <div className="relative mx-auto max-w-7xl px-4">
        {/* Title with effects */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 text-center md:mb-12"
        >
          <h2 className="inline-block bg-gradient-to-r from-cyan-200 via-white to-fuchsia-200 bg-clip-text text-2xl font-extrabold tracking-tight text-transparent drop-shadow-sm md:text-4xl">
            {titleText}
          </h2>

          {/* animated underline */}
          <div className="mx-auto mt-3 h-[3px] w-24 overflow-hidden rounded-full bg-white/10 md:mt-4">
            <motion.div
              initial={{ x: "-100%" }}
              whileInView={{ x: "100%" }}
              viewport={{ once: true }}
              transition={{ repeat: Infinity, duration: 2.2, ease: "linear" }}
              className="h-full w-1/3 bg-gradient-to-r from-cyan-400 via-white to-fuchsia-400"
            />
          </div>

          <p className="mt-3 text-sm text-slate-300/90 md:text-base">{subtitleText}</p>
        </motion.div>

        {/* Image Frame */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
          className="group relative mx-auto max-w-5xl"
        >
          {/* gradient border frame */}
          <div className="relative rounded-3xl bg-gradient-to-br from-cyan-400/20 via-white/10 to-fuchsia-400/20 p-[2px] shadow-[0_25px_60px_rgba(5,11,25,0.45)]">
            <div className="relative rounded-[calc(1.5rem-2px)] bg-slate-900/60 backdrop-blur-xl">
              {/* light sweep overlay */}
              <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
                <motion.div
                  initial={{ x: "-120%" }}
                  whileInView={{ x: "120%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.8, delay: 0.2, ease: "easeInOut" }}
                  className="h-full w-1/3 skew-x-12 bg-gradient-to-r from-transparent via-white/12 to-transparent"
                />
              </div>

              {/* image with hover tilt & subtle parallax */}
              <motion.div
                whileHover={{ rotateX: 3, rotateY: -3, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 160, damping: 18 }}
                className="relative aspect-[16/9] w-full"
              >
                <Image
                  src={imgSrc}
                  alt={langCode === "KOR" ? "핵심 기술 및 보유 기술" : "Core Capabilities & Technologies"}
                  fill
                  priority
                  className="rounded-[inherit] object-contain"
                />
              </motion.div>
            </div>
          </div>

          {/* corner accent chips */}
          <span className="pointer-events-none absolute -left-3 -top-3 h-6 w-6 rounded-full bg-cyan-400/50 blur-[6px]" />
          <span className="pointer-events-none absolute -right-3 -bottom-3 h-6 w-6 rounded-full bg-fuchsia-400/40 blur-[6px]" />
        </motion.div>
      </div>
    </section>
  );
}

/* =========================
        Page content
   ========================= */

export default function ServicePage() {
  const { lang } = useLangStore();
  const langCode = (lang === "KOR" ? "KOR" : "ENG") as "KOR" | "ENG";
  const { equipmentList, measurementEquipmentList } = serviceContent[langCode];
  const section = serviceContent[langCode].sectionList?.[0];

  const pageVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
  };

  const fadeUp: Record<"hidden" | "visible", any> = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: cubicBezier(0.16, 1, 0.3, 1) } as Transition,
    },
  };

  const CM_TO_PX = 37.8;
  const HERO_TRIM_PX = Math.round(CM_TO_PX);

  return (
    <Layout>
      <Head>
        <title>{langCode === "KOR" ? "기술소개 " : "Technology"}</title>
      </Head>

      <main className="min-h-screen bg-white text-slate-900" style={{ paddingTop: "90px" }}>
        {/* hero trim */}
        <div style={{ marginTop: `-${HERO_TRIM_PX}px`, marginBottom: `-${HERO_TRIM_PX}px` }}>
          <HeroSection
            title={langCode === "KOR" ? "기술 소개" : "Technology"}
            backgroundImage="/images/sub_banner/business_hero.png"
          />
        </div>

        {/* breadcrumb */}
        <div className="relative -mt-2 z-30">
          <BreadcrumbSection path={langCode === "KOR" ? "사업분야 > 기술소개" : "Business > Technology"} />
        </div>

        {/* NEW: Core Capabilities image section (replaces the old Capability Orbit) */}
        <CoreCapabilitiesImageSection />

        {/* Main Equipment */}
        <section className="bg-white px-4 py-12 md:py-20">
          <div className="mx-auto max-w-7xl">
            <motion.h2
              className="mb-6 text-base font-semibold tracking-wide sm:text-lg lg:text-2xl"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
            >
              Main Equipment
            </motion.h2>

            <motion.p
              className="text-xl font-bold tracking-wide leading-[1.3] md:text-2xl lg:text-4xl"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
            >
              {section?.maintitle}
              <br />
              {section?.mainsubtitle}
            </motion.p>
          </div>
        </section>

        {/* 생산가공 / 측정장비 */}
        <section className="relative z-0 bg-[#0a132e] px-4 pb-6 pt-12 md:pb-8 md:pt-20">
          <div className="pointer-events-none absolute inset-0">
            <Image
              src="/images/business/layer.png"
              alt="배경 이미지"
              fill
              style={{ objectFit: "cover", objectPosition: "top" }}
              priority
            />
          </div>

          <div className="mx-auto max-w-7xl">
            <motion.div
              className="relative transition-all"
              variants={pageVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {/* 생산가공 / 조립 */}
              <motion.span
                className="mb-10 inline-block rounded-full bg-white/10 px-6 py-1 text-base text-white sm:text-lg md:mb-16"
                variants={fadeUp}
              >
                {section?.production}
              </motion.span>

              <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
                {equipmentList.map((equipment: any, index: number) => (
                  <motion.div
                    key={`prod-${index}`}
                    className="group relative h-[calc(10rem+114px)] w-full overflow-hidden rounded-xl border-2 border-white/5 bg-white/5 p-2 shadow-lg transition-transform duration-200 hover:scale-[1.02] md:h-[calc(12.5rem+114px)]"
                    variants={fadeUp}
                  >
                    <div className="relative mb-0 h-[calc(5rem+95px)] w-full md:h-[calc(7rem+95px)]">
                      {equipment.image && (
                        <Image
                          src={equipment.image}
                          alt={equipment.name}
                          fill
                          className="rounded-[10px] object-cover"
                        />
                      )}
                    </div>

                    <div className="absolute bottom-0 left-0 flex h-10 w-full items-center justify-center bg-[#1F2432]/70 px-3 md:h-12">
                      <p className="line-clamp-1 text-sm font-medium text-white md:text-base">
                        {equipment.name}
                      </p>
                    </div>

                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1 scale-x-0 bg-gradient-to-r from-cyan-400 to-indigo-400 transition-transform duration-200 group-hover:scale-x-100" />
                  </motion.div>
                ))}
              </div>

              {/* 신뢰성 (측정 / 분석) */}
              <motion.span
                className="mt-16 inline-block rounded-full bg-white/10 px-6 py-1 text-base text-white sm:text-lg md:mb-16 md:mt-28"
                variants={fadeUp}
              >
                {section?.measurement}
              </motion.span>

              <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
                {measurementEquipmentList.map((equipment: any, index: number) => (
                  <motion.div
                    key={`meas-${index}`}
                    className="group relative h-[calc(10rem+114px)] w-full overflow-hidden rounded-xl border-2 border-white/5 bg-white/5 p-2 shadow-lg transition-transform duration-200 hover:scale-[1.02] md:h-[calc(12.5rem+114px)]"
                    variants={fadeUp}
                  >
                    <div className="relative mb-0 h-[calc(5rem+95px)] w-full md:h-[calc(7rem+95px)]">
                      {equipment.image && (
                        <Image
                          src={equipment.image}
                          alt={equipment.name}
                          fill
                          className="rounded-[10px] object-cover"
                        />
                      )}
                    </div>

                    <div className="absolute bottom-0 left-0 flex h-10 w-full items-center justify-center bg-[#1F2432]/70 px-3 md:h-12">
                      <p className="line-clamp-1 text-sm font-medium text-white md:text-base">
                        {equipment.name}
                      </p>
                    </div>

                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1 scale-x-0 bg-gradient-to-r from-teal-400 to-emerald-400 transition-transform duration-200 group-hover:scale-x-100" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* PROCESS (interactive rail) */}
        <section className="bg-white py-20 px-4 md:px-8">
          <div className="mx-auto w-full max-w-7xl">
            <h2 className="mb-6 text-left text-sm font-semibold tracking-wide sm:text-base lg:text-2xl">
              PROCESS
            </h2>
            <ProcessFlowChart />
          </div>
        </section>

        <hr className="my-6 w-full border-gray-200" />
      </main>
    </Layout>
  );
}
