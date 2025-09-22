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
  type NodeState = "default" | "active" | "warning";
  type NodeType = "step" | "decision";

  // ====== GRID & SCALES ======
  const CELL_W = 320;    // lebar 1 kolom
  const CELL_H = 160;    // tinggi 1 baris
  const GAP_X  = 64;     // jarak antar kolom
  const GAP_Y  = 48;     // jarak antar baris
  const PADDING = 24;    // padding area gambar

  // helper untuk dapatkan posisi pixel dari row/col
  const toXY = (row: number, col: number) => ({
    x: PADDING + col * (CELL_W + GAP_X),
    y: PADDING + row * (CELL_H + GAP_Y),
  });

  // ====== NODES (atur di sini supaya match gambar kamu) ======
  // Snake 3 baris:
  // Row 0: Customer → Concept → D/R → Development
  // Turun di kanan → Review → Order → Partner
  // Turun → Incoming Insp → Machining → Shipping/Assembly → Packing → Delivery → Feedback
  // Naik → Re-Order → balik ke Concept (loop perbaikan)
  const FLOW_NODES: Array<{
    id: string;
    title: string | React.ReactNode;
    type: NodeType;
    row: number;
    col: number;
    w?: number; // opsional, default 280..360
    h?: number; // opsional
    pillNG?: boolean;
  }> = [
    { id: "customer",   title: "Customer",                 type: "step",     row: 0, col: 0 },
    { id: "concept",    title: "Concept 설계",            type: "step",     row: 0, col: 1 },
    { id: "dr",         title: "D/R",                      type: "decision", row: 0, col: 2, pillNG: true },
    { id: "dev",        title: "개발/기공 설계",           type: "step",     row: 0, col: 3 },

    { id: "review",     title: "검토승인",                 type: "decision", row: 1, col: 3 },
    { id: "order",      title: "발주(소재/부품)",          type: "step",     row: 1, col: 4 },
    { id: "partner",    title: (<>협력사<br/><span className="text-xs opacity-80">Partner</span></>), type: "step", row: 1, col: 5, pillNG: true },

    { id: "inspIn",     title: "수입검사",                 type: "step",     row: 2, col: 5, pillNG: true },
    { id: "machining",  title: "가공/제작",                type: "step",     row: 2, col: 4 },
    { id: "shipping",   title: "출하 및 조립/품질검사",     type: "decision", row: 2, col: 3, pillNG: true },
    { id: "packing",    title: "포장",                     type: "step",     row: 2, col: 2 },
    { id: "delivery",   title: "고객사 납품",              type: "step",     row: 2, col: 1 },
    { id: "feedback",   title: "고객 Feedback",            type: "decision", row: 2, col: 0 },
    { id: "reorder",    title: "Re-Order 개선/반영",       type: "step",     row: 1, col: 0 },
  ];

  // ====== EDGES (arah panah; straight / elbow / curve / loop) ======
  type EdgeKind = "straight" | "elbow" | "curve";
  const FLOW_EDGES: Array<{
    from: string;
    to: string;
    kind?: EdgeKind;
    // untuk "elbow": arah belok ("h" lalu "v" atau sebaliknya)
    elbowHV?: "hv" | "vh";
    dashed?: boolean;
    glow?: boolean;
  }> = [
    { from: "customer", to: "concept" },
    { from: "concept",  to: "dr" },
    { from: "dr",       to: "dev" },
    { from: "dev",      to: "review", kind: "straight" },           // vertikal (beda row, same col)
    { from: "review",   to: "order" },
    { from: "order",    to: "partner" },
    { from: "partner",  to: "inspIn", kind: "straight" },           // vertikal
    { from: "inspIn",   to: "machining" },
    { from: "machining",to: "shipping" },
    { from: "shipping", to: "packing" },
    { from: "packing",  to: "delivery" },
    { from: "delivery", to: "feedback" },

    // loop naik: feedback → reorder (vertikal)
    { from: "feedback", to: "reorder", kind: "straight", dashed: true, glow: true },

    // reorder → concept (siku/“L”): kanan lalu atas (elbow "hv")
    { from: "reorder",  to: "concept", kind: "elbow", elbowHV: "hv", dashed: true, glow: true },
  ];

  // ====== STATE (klik card untuk highlight) ======
  const [activeId, setActiveId] = React.useState<string | null>(null);
  const isActive = (id: string): NodeState => (activeId === id ? "active" : "default");

  // ====== MAP id → pos (center) ======
  const nodePos = FLOW_NODES.reduce<Record<string, { x: number; y: number }>>((acc, n) => {
    const { x, y } = toXY(n.row, n.col);
    // center titik untuk panah (card default 280x110 dari komponenmu)
    const w = n.w ?? 280;
    const h = n.h ?? 110;
    acc[n.id] = { x: x + w / 2, y: y + h / 2 };
    return acc;
  }, {});

  // ====== LAYOUT SIZE ======
  const maxCol = Math.max(...FLOW_NODES.map(n => n.col));
  const maxRow = Math.max(...FLOW_NODES.map(n => n.row));
  const contentW = PADDING * 2 + (maxCol + 1) * (CELL_W + GAP_X) - GAP_X;
  const contentH = PADDING * 2 + (maxRow + 1) * (CELL_H + GAP_Y) - GAP_Y;

  // ====== Edge drawing helpers ======
  const arrowId = React.useId();
  const glowId  = React.useId();

  const edgePath = (e: typeof FLOW_EDGES[number]) => {
    const a = nodePos[e.from];
    const b = nodePos[e.to];
    if (!a || !b) return "";

    if (e.kind === "elbow") {
      // elbow hv: horizontal lalu vertical; vh: sebaliknya
      if (e.elbowHV === "vh") {
        const midY = b.y;
        return `M ${a.x} ${a.y} V ${midY} H ${b.x}`;
      }
      // default "hv"
      const midX = b.x;
      return `M ${a.x} ${a.y} H ${midX} V ${b.y}`;
    }

    if (e.kind === "curve") {
      const mx = (a.x + b.x) / 2;
      return `M ${a.x} ${a.y} C ${mx} ${a.y}, ${mx} ${b.y}, ${b.x} ${b.y}`;
    }

    // straight: kalau col sama → vertical; kalau row sama → horizontal; kalau diagonal → line
    return `M ${a.x} ${a.y} L ${b.x} ${b.y}`;
  };

  // ====== Realtime chips (dipertahankan) ======
  const [realTimeData, setRealTimeData] = React.useState({
    throughput: 87,
    efficiency: 94,
    quality: 99.2,
  });
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

  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 rounded-xl">
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

      {/* scrollable rail */}
      <div className="relative z-10 overflow-x-auto overflow-y-hidden px-8 pb-8">
        <div
          className="relative"
          style={{ width: Math.max(contentW, 1200), height: Math.max(contentH, 520) }}
        >
          {/* SVG edges layer */}
          <svg className="absolute inset-0" width={Math.max(contentW, 1200)} height={Math.max(contentH, 520)}>
            <defs>
              <marker id={arrowId} markerWidth="12" markerHeight="10" refX="12" refY="5" orient="auto">
                <polygon points="0 0, 12 5, 0 10" fill="currentColor" />
              </marker>
              <filter id={glowId}>
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {FLOW_EDGES.map((e, i) => {
              const d = edgePath(e);
              if (!d) return null;
              return (
                <path
                  key={i}
                  d={d}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  style={{ color: e.glow ? "#06b6d4" : "#67e8f9" }}
                  markerEnd={`url(#${arrowId})`}
                  strokeDasharray={e.dashed ? "8 6" : undefined}
                  className={e.dashed ? "animate-[dash_2.4s_linear_infinite]" : "animate-[dash_2s_linear_infinite]"}
                  filter={e.glow ? `url(#${glowId})` : undefined}
                />
              );
            })}
          </svg>

          {/* Nodes layer */}
          {FLOW_NODES.map((n) => {
            const { x, y } = toXY(n.row, n.col);
            const w = n.w ?? 280;
            const h = n.h ?? 110;

            return (
              <div
                key={n.id}
                className="absolute"
                style={{ left: x, top: y, width: w, height: h }}
              >
                <div className="relative">
                  <ProcessCard
                    type={n.type}
                    state={isActive(n.id)}
                    onClick={() => setActiveId(n.id)}
                    processingTime={1500}
                    className="!w-full !h-full"
                  >
                    {typeof n.title === "string" ? <span>{n.title}</span> : n.title}
                  </ProcessCard>

                  {n.pillNG && (
                    <div className="absolute -top-10 right-2">
                      {/* pakai NGPill milikmu */}
                      <NGPill />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* live status footer */}
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

      {/* keyframes untuk animasi garis */}
      <style jsx>{`
        @keyframes dash {
          to { stroke-dashoffset: -56; }
        }
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
