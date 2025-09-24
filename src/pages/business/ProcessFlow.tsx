"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import LanguageSwitcher from "../../components/LanguageSwitcher";
import { useLangStore } from "@/stores/langStore";

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
    type === "decision"
      ? "w-[350px] h-[140px] cursor-pointer transition-all duration-300 relative overflow-hidden backdrop-blur-sm"
      : "w-[350px] h-[140px] rounded-2xl flex items-center justify-center text-center p-5 cursor-pointer transition-all duration-300 relative overflow-hidden backdrop-blur-sm";

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

  const uniqueId = React.useId();

  if (type === "decision") {
    return (
      <div
        className={`relative ${stateStyles[state]} ${hoverStyles} ${className}`}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        onClick={onClick}
      >
        <svg width="350" height="140" className="absolute inset-0">
          <defs>
            <linearGradient
              id={`diamond-grad-${uniqueId}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="rgba(248, 250, 252, 0.8)" />
              <stop offset="50%" stopColor="rgba(226, 232, 240, 0.7)" />
              <stop offset="100%" stopColor="rgba(203, 213, 225, 0.8)" />
            </linearGradient>
          </defs>
          <path
            d={`M 175 10 L 330 70 L 175 130 L 20 70 Z`}
            fill={`url(#diamond-grad-${uniqueId})`}
            stroke="rgba(148, 163, 184, 0.4)"
            strokeWidth="2"
            className="drop-shadow-[0_0_15px_rgba(148,163,184,0.2)]"
          />
        </svg>

        {isProcessing && (
          <svg width="350" height="140" className="absolute inset-0">
            <path
              d={`M 175 10 L 330 70 L 175 130 L 20 70 Z`}
              fill="none"
              stroke="#22d3ee"
              strokeWidth="2"
              className="animate-pulse"
            />
          </svg>
        )}

        <div className="absolute inset-0 flex items-center justify-center text-center p-5">
          <div className="relative z-10 text-xs font-medium leading-tight text-[#2B2F37]">
            {children}
          </div>
        </div>

        <div className="absolute top-2 right-2 h-2 w-2 animate-ping rounded-full bg-emerald-400 opacity-60" />
      </div>
    );
  }

  return (
    <div
      className={`${baseStyles} ${typeStyles[type]} ${stateStyles[state]} ${hoverStyles} ${className}`}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onClick={onClick}
    >
      <div className="absolute inset-0 opacity-20">
        <div className="h-full w-full animate-pulse bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent" />
      </div>

      {isProcessing && (
        <div className="absolute inset-0 rounded-2xl border-2 border-cyan-400">
          <div className="absolute inset-0 animate-spin bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />
        </div>
      )}

      <div className="relative z-10 text-xs font-medium leading-tight">
        {children}
      </div>

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

      <div className="absolute top-2 right-2 h-2 w-2 animate-ping rounded-full bg-emerald-400 opacity-60" />
    </div>
  );
}

function NGPill({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative rounded-full border border-red-400/50 bg-gradient-to-r from-red-500 to-red-600 px-3 py-1 text-xs font-bold text-white shadow-[0_0_10px_rgba(239,68,68,0.5)] animate-pulse ${className}`}
    >
      <span className="relative z-10 text-xs">NG</span>
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
  // === Read language from global store (same pattern as other pages)
  const { lang } = useLangStore(); // "KOR" | "ENG"

  // ===== Stage (auto-scale) =====
  const DESIGN_W = 2100;
  const DESIGN_H = 1200;
  const GRID = 20;
  const ARCH_HEIGHT = 72;
  const LONG_ARCH_HEIGHT = 140;
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [scale, setScale] = React.useState(1);

  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      const w = el.clientWidth;
      setScale(w / DESIGN_W);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  type Anchor = "left" | "right" | "top" | "bottom";
  interface FlowNode {
    id: string;
    label: React.ReactNode;
    type?: "step" | "decision";
    x: number;
    y: number;
    w?: number;
    h?: number;
  }
  interface Waypoint {
    x: number;
    y: number;
  }
  interface FlowEdge {
    from: string;
    to: string;
    fromAnchor?: Anchor;
    toAnchor?: Anchor;
    via?: Waypoint[];
    dashed?: boolean;
    animated?: boolean;
    label?: "OK" | string;
    archUp?: boolean;
    showNGPill?: boolean;
  }

  // ===== 5-5-3 layout =====
  const CARD_W = 350;
  const CARD_H = 140;
  const VERTICAL_OFFSET = 240;
  const TOP_Y = 20 + VERTICAL_OFFSET;
  const MID_Y = 500 + VERTICAL_OFFSET;
  const BOT_Y = 980 + VERTICAL_OFFSET;
  const PARTNER_Y = 840 + VERTICAL_OFFSET;
  const X0 = 90;
  const GAP = 400;

  // ===== i18n labels =====
  const getNodeContent = (nodeId: string) => {
    const content = {
      KOR: {
        customer: "고객사",
        concept: (
          <>
            Concept 설계
            <br />
            <span className="text-[10px] opacity-80">제품 기획</span>
          </>
        ),
        dr: "D/R",
        dev: (
          <>
            개발/가공 설계
            <br />
            <span className="text-[10px] opacity-80">상세 설계</span>
          </>
        ),
        review: (
          <>
            검토승인
            <br />
            <span className="text-[10px] opacity-80">승인 프로세스</span>
          </>
        ),
        order: (
          <>
            발주(소재/부품)
            <br />
            <span className="text-[10px] opacity-80">자재 주문</span>
          </>
        ),
        incoming: (
          <>
            수입검사
            <br />
            <span className="text-[10px] opacity-80">품질 검사</span>
          </>
        ),
        machining: (
          <>
            가공/제작
            <br />
            <span className="text-[10px] opacity-80">제조 공정</span>
          </>
        ),
        assyqa: (
          <>
            조립/측정검사
            <br />
            <span className="text-[10px] opacity-80">최종 검사</span>
          </>
        ),
        packing: (
          <>
            포장
            <br />
            <span className="text-[10px] opacity-80">완제품 포장</span>
          </>
        ),
        delivery: (
          <>
            고객사 납품
            <br />
            <span className="text-[10px] opacity-80">제품 배송</span>
          </>
        ),
        reorder: (
          <>
            Re-Order 개선/반영
            <br />
            <span className="text-[10px] opacity-80">지속개선</span>
          </>
        ),
        partner: (
          <>
            협력사
            <br />
            <span className="text-[10px] opacity-80">공급업체</span>
          </>
        ),
      },
      ENG: {
        customer: "Customer",
        concept: (
          <>
            Concept Design
            <br />
            <span className="text-[10px] opacity-80">Product Planning</span>
          </>
        ),
        dr: "D/R",
        dev: (
          <>
            Development Design
            <br />
            <span className="text-[10px] opacity-80">Detailed Design</span>
          </>
        ),
        review: (
          <>
            Review Approval
            <br />
            <span className="text-[10px] opacity-80">Approval Process</span>
          </>
        ),
        order: (
          <>
            Material Order
            <br />
            <span className="text-[10px] opacity-80">Parts Procurement</span>
          </>
        ),
        incoming: (
          <>
            Incoming Inspection
            <br />
            <span className="text-[10px] opacity-80">Quality Check</span>
          </>
        ),
        machining: (
          <>
            Processing
            <br />
            <span className="text-[10px] opacity-80">Manufacturing</span>
          </>
        ),
        assyqa: (
          <>
            Assembly & QA
            <br />
            <span className="text-[10px] opacity-80">Final Inspection</span>
          </>
        ),
        packing: (
          <>
            Packaging
            <br />
            <span className="text-[10px] opacity-80">Product Packing</span>
          </>
        ),
        delivery: (
          <>
            Delivery
            <br />
            <span className="text-[10px] opacity-80">Product Shipping</span>
          </>
        ),
        reorder: (
          <>
            Re-Order & Improvement
            <br />
            <span className="text-[10px] opacity-80">
              Continuous Improvement
            </span>
          </>
        ),
        partner: (
          <>
            Supplier
            <br />
            <span className="text-[10px] opacity-80">Partner Company</span>
          </>
        ),
      },
    } as const;

    return content[lang as "KOR" | "ENG"][
      nodeId as keyof typeof content.KOR
    ];
  };

  // ===== Nodes =====
  const NODES: FlowNode[] = [
    // Row 1
    {
      id: "customer",
      label: getNodeContent("customer"),
      x: X0 + GAP * 0,
      y: TOP_Y,
      w: CARD_W,
      h: CARD_H,
      type: "step",
    },
    { id: "concept", label: getNodeContent("concept"), x: X0 + GAP * 1, y: TOP_Y, type: "step" },
    { id: "dr", label: getNodeContent("dr"), x: X0 + GAP * 2, y: TOP_Y, type: "decision" },
    { id: "dev", label: getNodeContent("dev"), x: X0 + GAP * 3, y: TOP_Y, type: "step" },
    { id: "review", label: getNodeContent("review"), x: X0 + GAP * 4, y: TOP_Y, type: "decision" },

    // Row 2
    { id: "order", label: getNodeContent("order"), x: X0 + GAP * 0, y: MID_Y, type: "step" },
    { id: "incoming", label: getNodeContent("incoming"), x: X0 + GAP * 1, y: MID_Y, type: "decision" },
    { id: "machining", label: getNodeContent("machining"), x: X0 + GAP * 2, y: MID_Y, type: "step" },
    { id: "assyqa", label: getNodeContent("assyqa"), x: X0 + GAP * 3, y: MID_Y, type: "decision" },
    { id: "packing", label: getNodeContent("packing"), x: X0 + GAP * 4, y: MID_Y, type: "step" },

    // 협력사
    {
      id: "partner",
      label: getNodeContent("partner"),
      x: X0 + GAP * 1,
      y: PARTNER_Y,
      w: CARD_W,
      h: CARD_H,
      type: "step",
    },

    // Row 3
    { id: "delivery", label: getNodeContent("delivery"), x: X0 + GAP * 0, y: BOT_Y, type: "step" },
    { id: "reorder", label: getNodeContent("reorder"), x: X0 + GAP * 1, y: BOT_Y, type: "step" },
  ];

  // ===== Helpers =====
  const nodeById = (id: string) => NODES.find((n) => n.id === id)!;
  const anchor = (n: any, where: Anchor) => {
    const w = n.w ?? CARD_W,
      h = n.h ?? CARD_H;
    const cx = n.x + w / 2,
      cy = n.y + h / 2;
    if (where === "left") return { x: n.x, y: cy };
    if (where === "right") return { x: n.x + w, y: cy };
    if (where === "top") return { x: cx, y: n.y };
    return { x: cx, y: n.y + h }; // bottom
  };
  const snap = (v: number) => Math.round(v / GRID) * GRID;

  const hvh = (
    a: { x: number; y: number },
    b: { x: number; y: number },
    midX?: number,
    midY?: number
  ) => {
    const mX = midX !== undefined ? snap(midX) : snap((a.x + b.x) / 2);
    const mY = midY !== undefined ? snap(midY) : undefined;
    if (mY !== undefined) {
      return [
        `M ${snap(a.x)} ${snap(a.y)}`,
        `L ${snap(mX)} ${snap(a.y)}`,
        `L ${snap(mX)} ${snap(mY)}`,
        `L ${snap(b.x)} ${snap(mY)}`,
        `L ${snap(b.x)} ${snap(b.y)}`,
      ].join(" ");
    }
    return [
      `M ${snap(a.x)} ${snap(a.y)}`,
      `L ${snap(mX)} ${snap(a.y)}`,
      `L ${snap(mX)} ${snap(b.y)}`,
      `L ${snap(b.x)} ${snap(b.y)}`,
    ].join(" ");
  };

  // ===== Edges (unchanged logic) =====
  const EDGES = [
    { from: "customer", to: "concept", fromAnchor: "right", toAnchor: "left" },
    { from: "concept", to: "dr", fromAnchor: "right", toAnchor: "left" },
    { from: "dr", to: "dev", fromAnchor: "right", toAnchor: "left", label: "OK" },
    { from: "dev", to: "review", fromAnchor: "right", toAnchor: "left" },

    // Review ↓ Packing
    { from: "review", to: "packing", fromAnchor: "bottom", toAnchor: "top", label: "OK" },

    // Row 2 ← ← ← ←
    { from: "packing", to: "assyqa", fromAnchor: "left", toAnchor: "right" },
    { from: "assyqa", to: "machining", fromAnchor: "left", toAnchor: "right", label: "OK" },
    { from: "machining", to: "incoming", fromAnchor: "left", toAnchor: "right" },
    { from: "incoming", to: "order", fromAnchor: "left", toAnchor: "right", label: "OK" },

    // Order ↓ Delivery
    { from: "order", to: "delivery", fromAnchor: "bottom", toAnchor: "top" },

    // Row 3 →
    { from: "delivery", to: "reorder", fromAnchor: "right", toAnchor: "left" },

    // NGs
    { from: "dr", to: "concept", fromAnchor: "top", toAnchor: "top", dashed: true, archUp: true, showNGPill: true, label: "NG" },
    { from: "review", to: "dev", fromAnchor: "top", toAnchor: "top", dashed: true, archUp: true, showNGPill: true, label: "NG" },

    // Incoming NG → Partner
    { from: "incoming", to: "partner", fromAnchor: "bottom", toAnchor: "top", dashed: true, showNGPill: true, label: "NG" },

    // Assy/QA NG → Machining
    { from: "assyqa", to: "machining", fromAnchor: "bottom", toAnchor: "bottom", dashed: true, showNGPill: true, label: "NG", archUp: true },
  ] as FlowEdge[];

  const dashedEdges = EDGES.filter((e) => !!e.dashed);
  const solidEdges = EDGES.filter((e) => !e.dashed);

  const [activeCard, setActiveCard] = React.useState<string | null>(null);
  const [live, setLive] = React.useState({ th: 87, ef: 94, qu: 99.2 });
  React.useEffect(() => {
    const t = setInterval(
      () =>
        setLive({
          th: Math.floor(Math.random() * 10) + 85,
          ef: Math.floor(Math.random() * 8) + 90,
          qu: Math.floor(Math.random() * 80) / 100 + 98.5,
        }),
      3000
    );
    return () => clearInterval(t);
  }, []);

  const lineCommon = {
    vectorEffect: "non-scaling-stroke" as const,
    shapeRendering: "geometricPrecision" as const,
  };

  const getLabelPos = (
    start: { x: number; y: number },
    end: { x: number; y: number },
    isLong: boolean,
    archUp?: boolean
  ) => {
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
        <div className="absolute right-4 top-4">
          {/* No props — store-driven */}
          <LanguageSwitcher />
        </div>

        <h2 className="mb-2 text-3xl font-bold tracking-tight text-white">
          {lang === "KOR"
            ? "차세대 반도체 제조 프로세스"
            : "Next-Generation Semiconductor Manufacturing Process"}
        </h2>
        <p className="text-base text-cyan-200/80">
          {lang === "KOR"
            ? "스마트 제조 통합 워크플로우"
            : "Smart Manufacturing Integrated Workflow"}
        </p>
        <div className="mt-4 flex justify-center gap-4 text-sm">
          <div className="rounded-md border border-cyan-500/30 bg-slate-800/50 px-3 py-1.5 leading-none">
            <span className="text-cyan-300">
              {lang === "KOR" ? "처리량" : "Throughput"}
            </span>
            <span className="ml-2 font-mono text-white">{live.th}%</span>
          </div>
          <div className="rounded-md border border-emerald-500/30 bg-slate-800/50 px-3 py-1.5 leading-none">
            <span className="text-emerald-300">
              {lang === "KOR" ? "효율성" : "Efficiency"}
            </span>
            <span className="ml-2 font-mono text-white">{live.ef}%</span>
          </div>
          <div className="rounded-md border border-purple-500/30 bg-slate-800/50 px-3 py-1.5 leading-none">
            <span className="text-purple-300">
              {lang === "KOR" ? "품질" : "Quality"}
            </span>
            <span className="ml-2 font-mono text-white">{live.qu}%</span>
          </div>
        </div>
      </div>

      {/* Stage */}
      <div
        ref={containerRef}
        className="relative z-10 h-[800px] overflow-hidden px-8 flex items-center justify-center"
      >
        <div
          className="relative origin-center"
          style={{
            width: DESIGN_W,
            height: DESIGN_H,
            transform: `scale(${scale})`,
          }}
        >
          {/* Grid */}
          <div className="pointer-events-none absolute inset-0 opacity-[0.06]">
            <svg width={DESIGN_W} height={DESIGN_H} className="text-white">
              <defs>
                <pattern id="g" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path
                    d="M 40 0 L 0 0 0 40"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#g)" />
            </svg>
          </div>

          {/* EDGES */}
          <svg className="absolute inset-0" width={DESIGN_W} height={DESIGN_H}>
            <defs>
              <marker
                id="arrowClean"
                markerWidth="12"
                markerHeight="10"
                refX="12"
                refY="5"
                orient="auto"
                markerUnits="strokeWidth"
              >
                <polygon points="0 0, 12 5, 0 10" className="fill-cyan-300" />
              </marker>
              <linearGradient id="edgeGradClean" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#22d3ee" />
                <stop offset="100%" stopColor="#60a5fa" />
              </linearGradient>
            </defs>

            {/* dashed layer */}
            {dashedEdges.map((e, i) => {
              const A = nodeById(e.from),
                B = nodeById(e.to);
              const start = anchor(A, e.fromAnchor ?? "right");
              const end = anchor(B, e.toAnchor ?? "left");

              let d: string;
              if (e.archUp) {
                const dx = end.x - start.x;
                const cpPull = Math.max(120, Math.abs(dx) * 0.25);
                const cp1 = { x: snap(start.x + cpPull), y: snap(start.y - ARCH_HEIGHT) };
                const cp2 = { x: snap(end.x - cpPull), y: snap(end.y - ARCH_HEIGHT) };
                if (e.from === "reorder" && e.to === "concept") {
                  cp1.y = snap(start.y - LONG_ARCH_HEIGHT);
                  cp2.y = snap(end.y - LONG_ARCH_HEIGHT);
                }
                d = `M ${snap(start.x)} ${snap(start.y)} C ${cp1.x} ${cp1.y}, ${cp2.x} ${cp2.y}, ${snap(end.x)} ${snap(end.y)}`;
              } else if (e.via && e.via.length) {
                d = hvh(start, end, e.via[0]?.x, e.via[0]?.y);
              } else {
                d =
                  start.y === end.y
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
                    strokeWidth={3}
                    markerEnd="url(#arrowClean)"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="[stroke-dasharray:8_5]"
                    style={{
                      filter: "drop-shadow(0 0 8px rgba(34,211,238,0.30))",
                      pointerEvents: "none",
                    }}
                    {...lineCommon}
                  />
                  {e.label && e.label !== "OK" && (
                    <text
                      x={lp.x}
                      y={lp.y}
                      textAnchor="middle"
                      className="fill-cyan-200 text-xs font-medium"
                      {...lineCommon}
                    >
                      {e.label}
                    </text>
                  )}
                  {e.showNGPill && (
                    <foreignObject x={lp.x - 18} y={lp.y - 18} width="64" height="26">
                      <div className="pointer-events-none">
                        <NGPill />
                      </div>
                    </foreignObject>
                  )}
                </g>
              );
            })}

            {/* solid layer */}
            {solidEdges.map((e, i) => {
              const A = nodeById(e.from),
                B = nodeById(e.to);
              const start = anchor(A, e.fromAnchor ?? "right");
              const end = anchor(B, e.toAnchor ?? "left");

              let d: string;
              if (e.via && e.via.length) {
                d = hvh(start, end, e.via[0]?.x, e.via[0]?.y);
              } else {
                d =
                  start.y === end.y
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
                    strokeWidth={3}
                    markerEnd="url(#arrowClean)"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      filter: "drop-shadow(0 0 10px rgba(94,234,212,0.35))",
                      pointerEvents: "none",
                    }}
                    {...lineCommon}
                  />
                  {e.label === "OK" && (
                    <foreignObject x={lp.x - 16} y={lp.y - 18} width="40" height="24">
                      <div className="pointer-events-none rounded-full border border-emerald-400/40 bg-emerald-500/90 px-2.5 py-0.5 text-xs font-bold text-white">
                        OK
                      </div>
                    </foreignObject>
                  )}
                </g>
              );
            })}
          </svg>

          {/* NODES */}
          {NODES.map((n) => {
            const w = n.w ?? CARD_W,
              h = n.h ?? CARD_H;
            return (
              <div
                key={`${n.id}-${lang}`}
                style={{
                  position: "absolute",
                  left: snap(n.x),
                  top: snap(n.y),
                  width: w,
                  height: h,
                }}
              >
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
          <span className="text-sm text-cyan-200">
            {lang === "KOR" ? "5-5-3 레이아웃 · 스마트 연결" : "5-5-3 Layout · Smart Connections"}
          </span>
        </div>
      </div>

      <style jsx>{`
        @keyframes dashMove {
          0% {
            stroke-dashoffset: 0;
          }
          100% {
            stroke-dashoffset: -200;
          }
        }
        @keyframes flowRight {
          0% {
            transform: translateX(-120px);
          }
          100% {
            transform: translateX(200px);
          }
        }
        @keyframes flowDown {
          0% {
            transform: translateY(-120px);
          }
          100% {
            transform: translateY(200px);
          }
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </div>
  );
}

export default ProcessFlowChart;
