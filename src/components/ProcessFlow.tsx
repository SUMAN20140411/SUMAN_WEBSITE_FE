"use client";

import React, {
  useRef,
  useLayoutEffect,
  useState,
  useMemo,
  RefObject,
} from "react";
import { motion } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";

// --- Types ---
type NodeType = "step" | "decision";
type Node = {
  id: string;
  label: string;
  type: NodeType;
  col: 1 | 3;
  row: number;
};
type EdgeKind = "main" | "branch" | "return";
type Edge = {
  id: string;
  from: string;
  to: string;
  kind?: EdgeKind;
  ng?: boolean;
};

// --- Data: Nodes & Edges ---
const nodes: Node[] = [
  // Left lane
  { id: "customer", label: "Customer", type: "step", col: 1, row: 1 },
  { id: "partner", label: "협력사", type: "step", col: 1, row: 6 },
  { id: "reorder", label: "Re-Order 개선/반영", type: "step", col: 1, row: 13 },
  { id: "feedback", label: "고객 Feedback", type: "decision", col: 1, row: 14 },
  // Main lane
  { id: "concept", label: "Concept 설계", type: "step", col: 3, row: 1 },
  { id: "dr", label: "D/R", type: "decision", col: 3, row: 2 },
  { id: "dev", label: "개발/가공 설계", type: "step", col: 3, row: 3 },
  { id: "review", label: "검토승인", type: "decision", col: 3, row: 4 },
  { id: "order", label: "발주(소재/부품)", type: "step", col: 3, row: 5 },
  { id: "import", label: "수입검사", type: "decision", col: 3, row: 6 },
  { id: "manufacture", label: "가공/제작", type: "step", col: 3, row: 7 },
  {
    id: "inspect",
    label: "출하 및\n조립/측정검사",
    type: "decision",
    col: 3,
    row: 8,
  },
  { id: "pack", label: "포장", type: "step", col: 3, row: 9 },
  { id: "deliver", label: "고객사 납품", type: "step", col: 3, row: 10 },
];

const edges: Edge[] = [
  // Main flow
  { id: "e1", from: "customer", to: "concept", kind: "main" },
  { id: "e2", from: "concept", to: "dr", kind: "main" },
  { id: "e2r", from: "concept", to: "concept", kind: "return", ng: true }, // NG return
  { id: "e3", from: "dr", to: "dev", kind: "main" },
  { id: "e4", from: "dev", to: "review", kind: "main" },
  { id: "e5", from: "review", to: "order", kind: "main" },
  { id: "e6", from: "order", to: "import", kind: "main" },
  { id: "e7", from: "import", to: "manufacture", kind: "main" },
  { id: "e7b", from: "import", to: "partner", kind: "branch", ng: true }, // NG branch
  { id: "e8", from: "manufacture", to: "inspect", kind: "main" },
  { id: "e8r", from: "manufacture", to: "manufacture", kind: "return", ng: true }, // NG return
  { id: "e9", from: "inspect", to: "pack", kind: "main" },
  { id: "e10", from: "pack", to: "deliver", kind: "main" },
  // Feedback loop
  { id: "e11", from: "feedback", to: "reorder", kind: "main" },
  {
    id: "e12",
    from: "reorder",
    to: "concept",
    kind: "return",
    ng: false,
  }, // upward return
];

// --- Layout Constants ---
const COLS = 3;
const ROWS = 15; // enough for spacing
const GRID_GAP_Y = 36; // px, desktop
const GRID_GAP_Y_MOBILE = 20; // px, mobile
const CARD_W = 210;
const CARD_W_MOBILE = 95;
const CARD_H = 54;
const DIAMOND_SIZE = 70;
const DIAMOND_SIZE_MOBILE = 48;
const GUTTER_W = 44;

// --- Responsive helpers ---
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useLayoutEffect(() => {
    function onResize() {
      setIsMobile(window.innerWidth < 1024);
    }
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return isMobile;
}

// --- Node positioning ---
type NodePos = {
  x: number;
  y: number;
  w: number;
  h: number;
  ref: RefObject<HTMLDivElement | null>;
  node: Node;
};

function getNodePositions(isMobile: boolean): Record<string, NodePos> {
  // On mobile, all nodes are in a single column, interleaved by row
  const colX = (col: number) =>
    isMobile ? 0 : col === 1 ? 0 : CARD_W + GUTTER_W; // left or right
  const cardW = isMobile ? CARD_W_MOBILE : CARD_W;
  const cardH = CARD_H;
  const diamond = isMobile ? DIAMOND_SIZE_MOBILE : DIAMOND_SIZE;
  const yGap = isMobile ? GRID_GAP_Y_MOBILE : GRID_GAP_Y;

  // For mobile, stack by row order (ignore col)
  const sorted = isMobile ? [...nodes].sort((a, b) => a.row - b.row) : nodes;

  const pos: Record<string, NodePos> = {};
  sorted.forEach((node) => {
    const x = colX(isMobile ? 1 : node.col);
    const y = (node.row - 1) * (cardH + yGap);
    pos[node.id] = {
      x,
      y,
      w: node.type === "decision" ? diamond : cardW,
      h: node.type === "decision" ? diamond : cardH,
      ref: React.createRef<HTMLDivElement>(),
      node,
    };
  });
  return pos;
}

// --- Helper: get center of node ---
function getCenter(pos: NodePos) {
  return {
    x: pos.x + pos.w / 2,
    y: pos.y + pos.h / 2,
  };
}

// --- Helper: get SVG path for edge ---
function getEdgePath(
  from: NodePos,
  to: NodePos,
  kind: EdgeKind | undefined,
  isMobile: boolean
) {
  const a = getCenter(from);
  const b = getCenter(to);

  // Main: straight vertical/horizontal
  if (kind === "main") {
    if (Math.abs(a.x - b.x) < 2) return `M${a.x},${a.y} L${b.x},${b.y}`; // vertical
    if (Math.abs(a.y - b.y) < 2) return `M${a.x},${a.y} L${b.x},${b.y}`; // horizontal
    const mx = (a.x + b.x) / 2;
    return `M${a.x},${a.y} Q${mx},${a.y} ${b.x},${b.y}`;
  }

  // Branch: curve left/right
  if (kind === "branch") {
    const curve = isMobile
      ? `C${a.x - 30},${a.y} ${b.x + 30},${b.y} ${b.x},${b.y}`
      : `C${a.x - 60},${a.y} ${b.x + 60},${b.y} ${b.x},${b.y}`;
    return `M${a.x},${a.y} ${curve}`;
  }

  // Return: self-loop or big upward curve
  if (kind === "return") {
    if (from.node.id === to.node.id) {
      const dx = from.node.col === 3 ? 38 : -38;
      const up = isMobile ? 28 : 38;
      return `M${a.x},${a.y} q${dx},-${up} 0,-${up * 2}`;
    }
    const minY = Math.min(a.y, b.y) - (isMobile ? 80 : 180);
    return `M${a.x},${a.y} C${a.x},${minY} ${b.x},${minY} ${b.x},${b.y}`;
  }

  return `M${a.x},${a.y} L${b.x},${b.y}`;
}

// --- Helper: get point at t along SVG path ---
function getPointAtPath(path: string, t: number): { x: number; y: number } {
  if (typeof window === "undefined") return { x: 0, y: 0 };
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  const p = document.createElementNS("http://www.w3.org/2000/svg", "path");
  p.setAttribute("d", path);
  svg.appendChild(p);
  document.body.appendChild(svg);
  const len = p.getTotalLength();
  const pt = p.getPointAtLength(len * t);
  document.body.removeChild(svg);
  return { x: pt.x, y: pt.y };
}

// --- Card & Diamond Components ---
function ProcessCard({
  label,
  className,
  ...props
}: HTMLMotionProps<"div"> & { label: string }) {
  return (
    <motion.div
      role="group"
      tabIndex={0}
      aria-label={label}
      className={`bg-[#E8F1F4] text-[#1F2937] rounded-2xl shadow-md px-6 py-3 font-semibold text-center text-base select-none transition-all duration-150 border border-gray-200 hover:scale-105 hover:brightness-105 focus:outline-none focus:ring-2 focus:ring-blue-300 ${
        className || ""
      }`}
      whileHover={{ scale: 1.05, filter: "brightness(1.08)" }}
      {...props}
    >
      {label}
    </motion.div>
  );
}

function DecisionDiamond({
  label,
  className,
  ...props
}: HTMLMotionProps<"div"> & { label: string }) {
  return (
    <motion.div
      role="group"
      tabIndex={0}
      aria-label={label}
      className={`relative flex items-center justify-center select-none ${className || ""}`}
      style={{ width: "100%", height: "100%" }}
      whileHover={{ scale: 1.07, filter: "drop-shadow(0 0 8px #6F78B5)" }}
      {...props}
    >
      <div
        className="absolute inset-0"
        style={{
          transform: "rotate(45deg)",
          background: "linear-gradient(180deg, #6F78B5 0%, #8B90C9 100%)",
          borderRadius: 16,
          boxShadow: "0 2px 12px 0 rgba(31,41,55,0.10)",
        }}
      />
      <div
        className="relative z-10 w-full h-full flex items-center justify-center text-white font-semibold text-base"
        style={{
          transform: "rotate(-45deg)",
          whiteSpace: "pre-line",
          userSelect: "none",
        }}
      >
        {label}
      </div>
    </motion.div>
  );
}

// --- Main Component ---
export default function ProcessFlow({ className }: { className?: string }) {
  const isMobile = useIsMobile();

  // --- Node positions & refs ---
  const [nodeRects, setNodeRects] = useState<Record<string, NodePos>>({});
  const nodePositions = useMemo(() => getNodePositions(isMobile), [isMobile]);

  // --- Layout effect: measure node positions after render ---
  useLayoutEffect(() => {
    function measure() {
      const updated: Record<string, NodePos> = {};
      for (const id in nodePositions) {
        const pos = nodePositions[id];
        const el = pos.ref.current;
        if (el) {
          const rect = el.getBoundingClientRect();
          updated[id] = {
            ...pos,
            x: el.offsetLeft,
            y: el.offsetTop,
            w: rect.width,
            h: rect.height,
            ref: pos.ref,
            node: pos.node,
          };
        } else {
          updated[id] = pos;
        }
      }
      setNodeRects(updated);
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [nodePositions, isMobile]);

  // --- SVG size ---
  const svgW = (isMobile ? CARD_W_MOBILE : CARD_W * 2 + GUTTER_W + 16) + 32;
  const svgH =
    Math.max(...Object.values(nodePositions).map((p) => p.y + p.h)) + 60;

  // --- Animation variants ---
  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.08, duration: 0.6 },
    }),
  };

  // --- Render ---
  return (
    <div
      className={`relative w-full flex justify-center ${className || ""}`}
      style={{ minHeight: svgH }}
    >
      {/* SVG connectors */}
      <svg
        className="absolute left-0 top-0 pointer-events-none"
        width={svgW}
        height={svgH}
        style={{ zIndex: 1 }}
        aria-hidden="true"
      >
        <defs>
          <marker
            id="arrow"
            markerWidth="10"
            markerHeight="10"
            refX="7"
            refY="5"
            orient="auto"
            markerUnits="strokeWidth"
          >
            <polygon points="0,2 10,5 0,8" fill="#9CA3AF" />
          </marker>
        </defs>
        {edges.map((edge) => {
          const from = nodeRects[edge.from] || nodePositions[edge.from];
          const to = nodeRects[edge.to] || nodePositions[edge.to];
          if (!from || !to) return null;
          const path = getEdgePath(from, to, edge.kind, isMobile);
          const fromLabel = from.node.label.replace(/\n/g, " ");
          const toLabel = to.node.label.replace(/\n/g, " ");
          return (
            <g key={edge.id}>
              <path
                d={path}
                stroke="#9CA3AF"
                strokeWidth={2}
                fill="none"
                markerEnd="url(#arrow)"
                aria-label={`${fromLabel}에서 ${toLabel}로 이동`}
                tabIndex={-1}
              />
              {edge.ng &&
                typeof window !== "undefined" &&
                (() => {
                  const pt = getPointAtPath(path, 0.5);
                  return (
                    <text
                      x={pt.x + (isMobile ? 8 : 12)}
                      y={pt.y - (isMobile ? 6 : 10)}
                      fontSize={isMobile ? 11 : 13}
                      fontWeight={700}
                      fill="#EF4444"
                      style={{
                        textShadow: "0 1px 2px #fff",
                        fontFamily: "inherit",
                        pointerEvents: "none",
                        userSelect: "none",
                      }}
                    >
                      NG
                    </text>
                  );
                })()}
            </g>
          );
        })}
      </svg>

      {/* Grid container */}
      <div
        className={`grid w-full`}
        style={{
          maxWidth: `${svgW}px`,
          gridTemplateColumns: isMobile
            ? `1fr`
            : `${CARD_W}px ${GUTTER_W}px ${CARD_W}px`,
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* Place nodes */}
        {nodes.map((node, i) => {
          const pos = nodePositions[node.id];
          const gridCol = isMobile ? 1 : node.col;
          const gridRow = node.row;
          const style: React.CSSProperties = {
            gridColumn: gridCol,
            gridRow,
            justifySelf: "center",
            alignSelf: "center",
            width:
              node.type === "decision"
                ? isMobile
                  ? DIAMOND_SIZE_MOBILE
                  : DIAMOND_SIZE
                : isMobile
                ? CARD_W_MOBILE
                : CARD_W,
            height:
              node.type === "decision"
                ? isMobile
                  ? DIAMOND_SIZE_MOBILE
                  : DIAMOND_SIZE
                : CARD_H,
            zIndex: 3,
          };
          const label =
            node.id === "inspect" ? "출하 및\n조립/측정검사" : node.label;

          return (
            <motion.div
              key={node.id}
              ref={(el) => {
                pos.ref.current = el as HTMLDivElement;
              }}
              style={style}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={fadeUp}
              custom={i}
            >
              {node.type === "step" ? (
                <ProcessCard label={label} />
              ) : (
                <DecisionDiamond label={label} />
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
