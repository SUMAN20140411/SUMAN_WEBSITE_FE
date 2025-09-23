"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

// --- Data Types ---
type WheelArc = { color: string; start: number; end: number };
type WheelCard = {
  id: string;
  title: string;
  color: string;
  bullets: string[];
  image?: string;
  alt?: string;
  position: "tl" | "tr" | "r" | "br" | "bl" | "l";
};
export type CapabilityWheelData = {
  center: {
    logo: string;
    alt: string;
    title: string;
    subtitle: string;
    caption: string;
  };
  arcs: WheelArc[];
  cards: WheelCard[];
};

// --- Sizing & Layout ---
const WHEEL_SIZE = 420;
const WHEEL_SIZE_MD = 520;
const WHEEL_SIZE_LG = 620;
const RING_OUTER = 180;
const RING_INNER = 140;
const ARC_WIDTH = RING_OUTER - RING_INNER;
const ARC_RADIUS = (RING_OUTER + RING_INNER) / 2;

// Uniform card sizing
const CARD_W = 220;
const CARD_H = 132;
const CARD_IMG_W = 92;
const CARD_IMG_H = 32;
const TANGENT_GAP = 10;

// --- Helper: SVG arc path ---
function describeArc(cx: number, cy: number, r: number, start: number, end: number) {
  const startRad = ((start - 90) * Math.PI) / 180;
  const endRad = ((end - 90) * Math.PI) / 180;
  const x1 = cx + r * Math.cos(startRad);
  const y1 = cy + r * Math.sin(startRad);
  const x2 = cx + r * Math.cos(endRad);
  const y2 = cy + r * Math.sin(endRad);
  const largeArc = end - start > 180 ? 1 : 0;
  return [`M ${x1} ${y1}`, `A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}`].join(" ");
}

// --- Card positions mapping ---
const CARD_PLACEMENTS: Record<string, { angle: number; anchor: "br" | "mr" | "tr" | "tl" | "ml" | "bl" }> = {
  tl: { angle: 150, anchor: "br" }, // Left Top
  l: { angle: 180, anchor: "mr" },  // Left Middle
  bl: { angle: 210, anchor: "tr" }, // Left Bottom
  tr: { angle: 30, anchor: "tl" },  // Right Top
  r: { angle: 0, anchor: "ml" },    // Right Middle
  br: { angle: 330, anchor: "bl" }, // Right Bottom
};

// --- Mobile grid layout ---
const CARD_GRID: Record<string, string> = {
  tl: "1 / 1",    // Top row, left column
  tr: "1 / 2",    // Top row, right column
  l: "2 / 1",     // Middle row, left column
  r: "2 / 2",     // Middle row, right column
  bl: "3 / 1",    // Bottom row, left column
  br: "3 / 2",    // Bottom row, right column
};

function getCardStyle(pos: string, wheelSize: number): React.CSSProperties {
  const placement = CARD_PLACEMENTS[pos];
  const cx = wheelSize / 2;
  const cy = wheelSize / 2;
  const r = ARC_RADIUS + TANGENT_GAP;
  const rad = (Math.PI * placement.angle) / 180;
  const x = cx + r * Math.cos(rad);
  const y = cy + r * Math.sin(rad);

  const transforms = {
    br: "translate(-100%, -100%)",
    mr: "translate(-100%, -50%)",
    tr: "translate(-100%, 0)",
    tl: "translate(0, 0)",
    ml: "translate(0, -50%)",
    bl: "translate(0, -100%)",
  } as const;

  return {
    position: "absolute",
    left: x,
    top: y,
    width: CARD_W,
    minHeight: CARD_H,
    transform: transforms[placement.anchor],
    zIndex: 3,
  };
}

// --- Main Component ---
export default function CapabilityWheel({
  data,
  className,
}: {
  data: CapabilityWheelData;
  className?: string;
}) {
  const [isMobile, setIsMobile] = React.useState(false);
  const [wheelSize, setWheelSize] = React.useState(WHEEL_SIZE);

  React.useEffect(() => {
    function handleResize() {
      const w = window.innerWidth;
      if (w < 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
        if (w >= 1280) {
          setWheelSize(WHEEL_SIZE_LG);
        } else if (w >= 1024) {
          setWheelSize(WHEEL_SIZE_MD);
        } else {
          setWheelSize(WHEEL_SIZE);
        }
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={`relative flex flex-col items-center justify-center w-full ${className || ""}`}
      style={{ 
        minHeight: isMobile ? 680 : wheelSize + 40,
        padding: isMobile ? "1rem" : "0.5rem",
      }}
    >
      {/* Desktop/Tablet Layout */}
      {!isMobile && (
        <div
          className="relative flex items-center justify-center"
          style={{
            width: wheelSize,
            height: wheelSize,
          }}
        >
          {/* SVG Wheel */}
          <svg
            width={wheelSize}
            height={wheelSize}
            viewBox={`0 0 ${wheelSize} ${wheelSize}`}
            className="absolute left-0 top-0"
            aria-hidden="true"
          >
            {data.arcs.map((arc, i) => (
              <path
                key={i}
                d={describeArc(
                  wheelSize / 2,
                  wheelSize / 2,
                  ARC_RADIUS,
                  arc.start,
                  arc.end
                )}
                stroke={arc.color}
                strokeWidth={ARC_WIDTH}
                strokeLinecap="round"
                fill="none"
              />
            ))}
          </svg>

          {/* Center Circle */}
          <div
            className="absolute flex flex-col items-center justify-center bg-white rounded-full shadow-lg"
            style={{
              width: 180,
              height: 180,
              left: wheelSize / 2 - 90,
              top: wheelSize / 2 - 90,
              zIndex: 2,
            }}
          >
            <Image
              src={data.center.logo}
              alt={data.center.alt}
              width={54}
              height={54}
              className="mb-2"
              priority
            />
            <h3 className="text-base font-bold text-gray-800 text-center mb-1">
              {data.center.title}
            </h3>
            <div className="text-xs text-gray-700 text-center mb-1">
              {data.center.subtitle}
            </div>
            <div className="text-xs text-[#F28C28] text-center font-semibold">
              {data.center.caption}
            </div>
          </div>

          {/* Cards */}
          {data.cards.map((card) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 24, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              style={getCardStyle(card.position, wheelSize)}
            >
              <div
                className="bg-white rounded-xl shadow-lg px-5 py-4 flex flex-col items-start"
                style={{
                  borderTop: `4px solid ${card.color}`,
                  boxShadow: "0 4px 16px 0 rgba(31,41,55,0.08)",
                }}
              >
                <h4 className="font-bold text-base mb-2" style={{ color: card.color }}>
                  {card.title}
                </h4>
                {card.image && (
                  <Image
                    src={card.image}
                    alt={card.alt || ""}
                    width={CARD_IMG_W}
                    height={CARD_IMG_H}
                    className="mb-2 rounded"
                  />
                )}
                <ul className="text-xs text-gray-700 font-medium space-y-1">
                  {card.bullets.map((b, i) => (
                    <li key={i}>▪ {b}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Mobile Layout */}
      {isMobile && (
        <div className="w-full max-w-md mx-auto">
          {/* Mobile Wheel */}
          <div className="relative flex items-center justify-center mb-8">
            <svg
              width={260}
              height={260}
              viewBox="0 0 260 260"
              className="absolute left-0 top-0"
            >
              <circle
                cx={130}
                cy={130}
                r={60}
                stroke="#E5E7EB"
                strokeWidth={8}
                fill="none"
              />
            </svg>
            {/* Mobile Center */}
            <div
              className="relative flex flex-col items-center justify-center bg-white rounded-full shadow-lg"
              style={{
                width: 120,
                height: 120,
              }}
            >
              <Image
                src={data.center.logo}
                alt={data.center.alt}
                width={38}
                height={38}
                className="mb-2"
                priority
              />
              <h3 className="text-sm font-bold text-gray-800 text-center mb-1">
                {data.center.title}
              </h3>
              <div className="text-xs text-gray-700 text-center">
                {data.center.subtitle}
              </div>
            </div>
          </div>

          {/* Mobile Cards Grid */}
          <div className="grid grid-cols-2 gap-4">
            {data.cards.map((card) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                style={{ gridArea: CARD_GRID[card.position] }}
              >
                <div
                  className="bg-white rounded-lg shadow p-3"
                  style={{
                    borderTop: `3px solid ${card.color}`,
                  }}
                >
                  <h4 className="text-sm font-bold mb-2" style={{ color: card.color }}>
                    {card.title}
                  </h4>
                  {card.image && (
                    <Image
                      src={card.image}
                      alt={card.alt || ""}
                      width={60}
                      height={20}
                      className="mb-2 rounded"
                    />
                  )}
                  <ul className="text-[11px] text-gray-700 space-y-1">
                    {card.bullets.map((b, i) => (
                      <li key={i}>▪ {b}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}