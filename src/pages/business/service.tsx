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
  // ===== Fixed design stage (auto-scaled) =====
  const DESIGN_W = 3600; // diperlebar supaya semua node muat
  const DESIGN_H = 560;
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
  type NodeState = "default" | "active" | "warning";
  interface FlowNode {
    id: string;
    label: React.ReactNode;
    type?: "step" | "decision";
    x: number; y: number; w?: number; h?: number; state?: NodeState;
  }
  interface Waypoint { x: number; y: number; }
  interface FlowEdge {
    id?: string;
    from: string; to: string;
    fromAnchor?: Anchor; toAnchor?: Anchor;
    via?: Waypoint[];
    animated?: boolean; dashed?: boolean; showNGPill?: boolean;
    label?: string; curve?: boolean;
  }

  /* ================================
     NODES — sesuai urutan yang diminta
     ================================ */
  const NODES: FlowNode[] = [
    { id: "customer",  label: "Customer",                    x: 40,   y: 40,  type: "step" },
    { id: "concept",   label: <>Concept 설계<br/><span className="text-xs opacity-80">Concept Design</span></>, x: 360,  y: 40,  type: "step" },
    { id: "dr",        label: "D/R",                         x: 680,  y: 40,  type: "decision" },
    { id: "dev",       label: <>개발/가공 설계<br/><span className="text-xs opacity-80">Development / Machining Design</span></>, x: 1000, y: 40, type: "step" },
    { id: "review",    label: <>검토승인<br/><span className="text-xs opacity-80">Review Approval</span></>, x: 1320, y: 40, type: "decision" },
    { id: "order",     label: <>발주(소재/부품)<br/><span className="text-xs opacity-80">Place Order: Materials/Parts</span></>, x: 1640, y: 40, type: "step" },

    // supplier (dipakai untuk loop NG di Incoming Inspection)
    { id: "partner",   label: <>협력사<br/><span className="text-xs opacity-80">Supplier</span></>, x: 1900, y: 210, type: "step", w: 220, h: 90 },

    // baris bawah
    { id: "incoming",  label: <>수입검사<br/><span className="text-xs opacity-80">Incoming Inspection</span></>, x: 1500, y: 360, type: "decision" },
    { id: "machining", label: <>가공/제작<br/><span className="text-xs opacity-80">Processing / Manufacturing</span></>, x: 1800, y: 360, type: "step" },
    { id: "assyqa",    label: <>조립/측정검사<br/><span className="text-xs opacity-80">Assembly & Measurement Inspection</span></>, x: 2100, y: 360, type: "decision" },
    { id: "packing",   label: <>포장<br/><span className="text-xs opacity-80">Packaging</span></>, x: 2400, y: 360, type: "step" },
    { id: "delivery",  label: <>고객사 납품<br/><span className="text-xs opacity-80">Delivery to Customer</span></>, x: 2700, y: 360, type: "step" },
    { id: "feedback",  label: <>고객 Feedback</>,            x: 3000, y: 360, type: "step" },
    { id: "reorder",   label: <>Re-Order 개선/반영<br/><span className="text-xs opacity-80">Re-Order & Improvement</span></>, x: 3300, y: 360, type: "step" },
  ];

  /* ================================
     EDGES — OK path + NG loops
     ================================ */
  const EDGES: FlowEdge[] = [
    // OK main flow (atas)
    { from: "customer", to: "concept", animated: true },
    { from: "concept",  to: "dr",      animated: true },
    { from: "dr",       to: "dev",     animated: true, label: "OK" },
    { from: "dev",      to: "review",  animated: true },
    { from: "review",   to: "order",   animated: true, label: "OK" },

    // turun ke baris bawah: order -> incoming (elbow)
    { from: "order", to: "incoming", animated: true, fromAnchor: "bottom", toAnchor: "top",
      via: [{ x: 1640, y: 260 }, { x: 1500, y: 260 }] },

    // OK main flow (bawah)
    { from: "incoming", to: "machining", animated: true, label: "OK" },
    { from: "machining", to: "assyqa",   animated: true },
    { from: "assyqa",   to: "packing",   animated: true, label: "OK" },
    { from: "packing",  to: "delivery",  animated: true },
    { from: "delivery", to: "feedback",  animated: true },
    { from: "feedback", to: "reorder",   animated: true },

    // continuous improvement loop: Re-Order -> Concept
    { from: "reorder", to: "concept", dashed: true, curve: true, label: "Improve & Re-Order",
      fromAnchor: "top", toAnchor: "bottom" },

    // ===== NG LOOPS =====
    // D/R NG → Concept
    { from: "dr", to: "concept", dashed: true, curve: true, label: "NG", showNGPill: true,
      fromAnchor: "bottom", toAnchor: "top" },

    // 검토승인 NG → 개발/가공 설계
    { from: "review", to: "dev", dashed: true, curve: true, label: "NG", showNGPill: true,
      fromAnchor: "bottom", toAnchor: "top" },

    // 수입검사 NG → 협력사 → (re-test) → 수입검사
    { from: "incoming", to: "partner", dashed: true, label: "NG", showNGPill: true,
      fromAnchor: "right", toAnchor: "left", via: [{ x: 1700, y: 360 }, { x: 1900, y: 360 }] },
    { from: "partner", to: "incoming", animated: true, label: "Re-test / 재검",
      fromAnchor: "bottom", toAnchor: "top", via: [{ x: 1900, y: 300 }, { x: 1500, y: 300 }] },

    // 조립/측정검사 NG → 가공/제작
    { from: "assyqa", to: "machining", dashed: true, curve: true, label: "NG", showNGPill: true,
      fromAnchor: "top", toAnchor: "bottom" },
  ];

  // ====== state & helpers (tetap sama) ======
  const [activeCard, setActiveCard] = React.useState<string | null>(null);
  const [realTimeData, setRealTimeData] = React.useState({ throughput: 87, efficiency: 94, quality: 99.2 });
  React.useEffect(() => {
    const t = setInterval(() => {
      setRealTimeData({
        throughput: Math.floor(Math.random() * 10) + 85,
        efficiency: Math.floor(Math.random() * 8) + 90,
        quality: Math.floor(Math.random() * 80) / 100 + 98.5,
      });
    }, 3000);
    return () => clearInterval(t);
  }, []);

  const defaultW = 280, defaultH = 110;
  const getNode = (id: string) => NODES.find(n => n.id === id)!;
  function anchorPoint(n: FlowNode, anchor?: Anchor) {
    const w = n.w ?? defaultW, h = n.h ?? defaultH;
    const cx = n.x + w/2, cy = n.y + h/2;
    switch (anchor) {
      case "left": return { x: n.x, y: cy };
      case "right": return { x: n.x + w, y: cy };
      case "top": return { x: cx, y: n.y };
      case "bottom": return { x: cx, y: n.y + h };
      default: return { x: cx, y: cy };
    }
  }
  function autoAnchors(a: FlowNode, b: FlowNode): [Anchor, Anchor] {
    const ac = { x: a.x + (a.w ?? defaultW)/2, y: a.y + (a.h ?? defaultH)/2 };
    const bc = { x: b.x + (b.w ?? defaultW)/2, y: b.y + (b.h ?? defaultH)/2 };
    const dx = bc.x - ac.x, dy = bc.y - ac.y;
    if (Math.abs(dx) > Math.abs(dy)) return dx >= 0 ? ["right","left"] : ["left","right"];
    return dy >= 0 ? ["bottom","top"] : ["top","bottom"];
  }
  function midOf(points: {x:number;y:number}[]) {
    if (points.length === 2) return { x:(points[0].x+points[1].x)/2, y:(points[0].y+points[1].y)/2 };
    const i = Math.floor(points.length/2); return points[i];
  }

  return (
    <div className="relative w-full overflow-hidden rounded-xl bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950">
      {/* header */}
      <div className="relative z-10 bg-gradient-to-b from-slate-900/50 to-transparent py-8 text-center backdrop-blur-sm">
        <h2 className="mb-3 bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-3xl font-bold text-transparent">
          차세대 반도체 제조 프로세스
        </h2>
        <p className="mb-4 text-lg text-cyan-200/80">Next-Generation Semiconductor Manufacturing Process</p>
        <div className="flex justify-center gap-6 text-sm">
          <div className="rounded-lg border border-cyan-500/30 bg-slate-800/50 px-3 py-1 backdrop-blur-sm">
            <span className="text-cyan-400">Throughput:</span>
            <span className="ml-1 font-mono text-white">{realTimeData.throughput}%</span>
          </div>
          <div className="rounded-lg border border-emerald-500/30 bg-slate-800/50 px-3 py-1 backdrop-blur-sm">
            <span className="text-emerald-400">Efficiency:</span>
            <span className="ml-1 font-mono text-white">{realTimeData.efficiency}%</span>
          </div>
          <div className="rounded-lg border border-purple-500/30 bg-slate-800/50 px-3 py-1 backdrop-blur-sm">
            <span className="text-purple-400">Quality:</span>
            <span className="ml-1 font-mono text-white">{realTimeData.quality}%</span>
          </div>
        </div>
      </div>

      {/* stage (scaled) */}
      <div ref={containerRef} className="relative z-10 h-[580px] overflow-x-auto overflow-y-hidden px-8">
        <div className="relative origin-top-left" style={{ width: DESIGN_W, height: DESIGN_H, transform: `scale(${scale})` }}>
          {/* grid */}
          <div className="pointer-events-none absolute inset-0 opacity-10">
            <svg width={DESIGN_W} height={DESIGN_H} className="text-cyan-400">
              <defs>
                <pattern id="gridPattern" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#gridPattern)" />
            </svg>
          </div>

          {/* EDGES */}
          <svg className="absolute inset-0" width={DESIGN_W} height={DESIGN_H}>
            <defs>
              <marker id="arrow" markerWidth="10" markerHeight="8" refX="10" refY="4" orient="auto">
                <polygon points="0 0, 10 4, 0 8" className="fill-cyan-400" />
              </marker>
              <linearGradient id="edgeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0ea5e9" />
                <stop offset="50%" stopColor="#22d3ee" />
                <stop offset="100%" stopColor="#0ea5e9" />
              </linearGradient>
            </defs>

            {EDGES.map((e, idx) => {
              const a = getNode(e.from), b = getNode(e.to);
              const [fa, ta] = (e.fromAnchor && e.toAnchor) ? [e.fromAnchor, e.toAnchor] : autoAnchors(a, b);
              const start = anchorPoint(a, fa), end = anchorPoint(b, ta);
              const pts = [start, ...(e.via ?? []), end];

              const pathD = e.curve && (!e.via || e.via.length === 0)
                ? (() => {
                    const cx = (start.x + end.x) / 2;
                    const cy = Math.min(start.y, end.y) - 80;
                    return `M ${start.x} ${start.y} Q ${cx} ${cy} ${end.x} ${end.y}`;
                  })()
                : `M ${pts[0].x} ${pts[0].y}` + pts.slice(1).map(p => ` L ${p.x} ${p.y}`).join("");

              const mid = pts.length === 2
                ? { x: (pts[0].x + pts[1].x) / 2, y: (pts[0].y + pts[1].y) / 2 - 8 }
                : pts[Math.floor(pts.length / 2)];

              return (
                <g key={e.id ?? idx}>
                  <path
                    d={pathD}
                    fill="none"
                    stroke="url(#edgeGrad)"
                    strokeWidth={2}
                    markerEnd="url(#arrow)"
                    className={[
                      e.dashed ? "stroke-[2px] [stroke-dasharray:8_6]" : "",
                      e.animated ? "[animation:dashMove_2s_linear_infinite]" : "",
                    ].join(" ")}
                    style={{ filter: "drop-shadow(0 0 6px rgba(34,211,238,0.5))" }}
                  />
                  {e.label && (
                    <text x={mid.x} y={mid.y} textAnchor="middle" className="fill-cyan-300 text-[12px]">
                      {e.label}
                    </text>
                  )}
                  {e.showNGPill && (
                    <foreignObject x={mid.x - 20} y={(mid.y ?? 0) - 28} width="80" height="26">
                      <div className="pointer-events-none"><NGPill /></div>
                    </foreignObject>
                  )}
                </g>
              );
            })}
          </svg>

          {/* NODES */}
          {NODES.map((n) => {
            const w = n.w ?? 280, h = n.h ?? 110;
            return (
              <div key={n.id} style={{ position: "absolute", left: n.x, top: n.y, width: w, height: h }}>
                <ProcessCard
                  type={n.type ?? "step"}
                  state={activeCard === n.id ? "active" : n.state ?? "default"}
                  onClick={() => setActiveCard(n.id)}
                  processingTime={1600}
                  className="!w-full !h-full"
                >
                  <div className="flex items-center gap-2">{n.label}</div>
                </ProcessCard>
              </div>
            );
          })}
        </div>
      </div>

      {/* footer chip */}
      <div className="relative z-10 py-4 text-center">
        <div className="inline-flex items-center gap-3 rounded-full border border-cyan-500/30 bg-slate-800/50 px-6 py-3 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            <span className="text-sm font-medium text-emerald-400">LIVE</span>
          </div>
          <span className="text-sm text-cyan-200">← Real-time Process Flow →</span>
          <div className="flex items-center gap-1">
            <svg className="h-4 w-4 animate-spin text-cyan-400" fill="none" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
              <path d="M4 12a8 8 0 018-8v8H4z" fill="currentColor" />
            </svg>
            <span className="text-xs text-cyan-400">Processing</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes dashMove { 0% { stroke-dashoffset: 0 } 100% { stroke-dashoffset: -200 } }
      `}</style>
    </div>
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

  // capability data (language-aware)
  const capabilitiesData = {
    KOR: [
      { key: "midLarge", title: "중대형 구조물 가공/ 제작 기술", desc: "중대형 구조물의 금형 설계, 가공, 제작", angle: 0 },
      { key: "coopDriving", title: "실내외 협치 주행 기술", desc: "실시간 하중반영 바퀴/틸트 제어", angle: 60 },
      { key: "sysArchA", title: "시스템 아키텍처 기술", desc: "실시간 하중반영 바퀴/틸트 제어", angle: 120 },
      { key: "structFab", title: "구조물 가공/ 제작 기술", desc: "지능형 자율주행 로봇 구동부 및 적재부 정밀설계", angle: 180 },
      { key: "precisionJig", title: "고정밀 Jig 개발 / 제작 기술", desc: "고객 맞춤형 Jig 설계/개발/제작 기술", angle: 240 },
      { key: "sysArchB", title: "시스템 아키텍처 기술", desc: "실시간 하중반영 바퀴/틸트 제어", angle: 300 },
    ],
    ENG: [
      { key: "midLarge", title: "Mid/Large Structure Machining & Manufacturing", desc: "Mold design, machining, and manufacturing of mid/large structures", angle: 0 },
      { key: "coopDriving", title: "Indoor/Outdoor Cooperative Driving", desc: "Real-time load-adaptive wheel/tilt control", angle: 60 },
      { key: "sysArchA", title: "System Architecture Technology", desc: "Real-time load-adaptive wheel/tilt control", angle: 120 },
      { key: "structFab", title: "Structural Processing & Manufacturing", desc: "Precision design of drive and payload modules for intelligent autonomous robots", angle: 180 },
      { key: "precisionJig", title: "High-Precision Jig Development / Manufacturing", desc: "Custom jig design, development, and fabrication", angle: 240 },
      { key: "sysArchB", title: "System Architecture Technology", desc: "Real-time load-adaptive wheel/tilt control", angle: 300 },
    ],
  } as const;

  const capabilities = capabilitiesData[langCode].map((c) => ({ ...c, subtitle: c.desc }));
  const getPositionFromAngle = (angle: number, radius: number) => {
    const rad = (angle * Math.PI) / 180;
    return { x: Math.cos(rad) * radius, y: Math.sin(rad) * radius };
  };

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

  const ringPulse = {
    scale: [1, 1.02, 1],
    opacity: [0.15, 0.35, 0.15],
    transition: { duration: 4, repeat: Infinity, ease: easeInOut },
  };

  const CM_TO_PX = 37.8;
  const HERO_TRIM_PX = Math.round(CM_TO_PX);
  const orbitRadius = 320;

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

        {/* Capability Orbit */}
        <section className="relative overflow-hidden py-20">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0a1630] via-[#0f1e3e] to-[#0a1630]" />

          <motion.div
            className="relative mx-auto h-[920px] w-full max-w-[1200px]"
            variants={pageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
          >
            {/* orbits */}
            {[420, 560, 700].map((size) => (
              <motion.div
                key={size}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10"
                style={{ width: size, height: size }}
                animate={ringPulse}
              />
            ))}
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5"
              style={{ width: 640, height: 640 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: (t: number) => t }}
            />

            {/* center */}
            <motion.div
              className="absolute left-1/2 top-1/2 z-10 flex h-[230px] w-[230px] -translate-x-1/2 -translate-y-1/2 items-center justify-center overflow-hidden rounded-full"
              variants={fadeUp}
              whileHover={{ scale: 1.04 }}
              style={{
                boxShadow:
                  "0 25px 60px rgba(13,25,49,0.45), inset 0 2px 6px rgba(255,255,255,0.12)",
              }}
            >
              <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(116,76,255,0.35),transparent_60%),radial-gradient(circle_at_70%_70%,rgba(46,165,255,0.35),transparent_55%)]" />
              <div className="absolute inset-[6px] rounded-full border border-white/10 bg-gradient-to-b from-[#0f1e3e] to-[#0a142b]" />
              <div className="relative z-10 text-center text-white drop-shadow">
                <div className="text-xl font-extrabold tracking-tight">
                  {langCode === "KOR" ? "정밀가공/모듈화" : "Precision Machining"}
                </div>
                <div className="mt-1 text-xs opacity-80">
                  {langCode === "KOR" ? "＆ 장비 기술" : "& Systems"}
                </div>
              </div>
            </motion.div>

            {/* cards */}
            {capabilities.map((cap) => {
              const { x, y } = getPositionFromAngle(cap.angle - 90, orbitRadius);
              return (
                <motion.div
                  key={cap.key}
                  className="absolute w-[360px] max-w-[42vw]"
                  style={{
                    left: `calc(50% + ${x}px - 180px)`,
                    top: `calc(50% + ${y}px - 80px)`,
                  }}
                  variants={fadeUp}
                >
                  <div
                    className={[
                      "group relative rounded-2xl border border-white/10 bg-gradient-to-br",
                      "from-slate-800/70 to-slate-900/70 backdrop-blur",
                      "shadow-[0_15px_35px_rgba(5,11,25,0.5)]",
                      "transition-transform duration-200 ease-linear hover:scale-[1.03]",
                    ].join(" ")}
                  >
                    <span className="absolute right-4 top-4 h-2 w-2 rounded-full bg-cyan-300/70 group-hover:bg-cyan-200" />
                    <span className="absolute right-8 top-4 h-2 w-2 rounded-full bg-cyan-300/30 group-hover:bg-cyan-200/60" />
                    <div className="flex gap-4 p-5">
                      <div className="mt-1 grid h-[46px] w-[46px] grid-cols-2 gap-1 rounded-md bg-slate-700/30 p-1">
                        <div className="h-full w-full rounded-[6px] bg-gradient-to-br from-sky-400/40 to-indigo-400/40" />
                        <div className="h-full w-full rounded-[6px] bg-gradient-to-br from-emerald-400/40 to-teal-400/40" />
                        <div className="h-full w-full rounded-[6px] bg-gradient-to-br from-fuchsia-400/40 to-pink-400/40" />
                        <div className="h-full w-full rounded-[6px] bg-gradient-to-br from-amber-400/40 to-orange-400/40" />
                      </div>

                      <div className="min-w-0">
                        <div className="text-lg font-extrabold leading-tight text-white">
                          {cap.title}
                        </div>
                        <p className="mt-1 text-sm leading-snug text-slate-200/80">
                          {cap.subtitle}
                        </p>
                      </div>
                    </div>

                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[6px] scale-x-0 rounded-b-2xl bg-gradient-to-r from-cyan-400 to-fuchsia-400 opacity-90 transition-transform duration-200 group-hover:scale-x-100" />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </section>

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
