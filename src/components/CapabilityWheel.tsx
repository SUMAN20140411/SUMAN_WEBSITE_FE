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

const WHEEL_SIZE = 420;
const RING_OUTER = 180;
const RING_INNER = 140;
const ARC_WIDTH = RING_OUTER - RING_INNER;
const ARC_RADIUS = (RING_OUTER + RING_INNER) / 2;

// --- Helper: SVG arc path ---
function describeArc(cx: number, cy: number, r: number, start: number, end: number) {
  // Angles in degrees, 0 = right, positive = CCW
  const startRad = ((start - 90) * Math.PI) / 180;
  const endRad = ((end - 90) * Math.PI) / 180;
  const x1 = cx + r * Math.cos(startRad);
  const y1 = cy + r * Math.sin(startRad);
  const x2 = cx + r * Math.cos(endRad);
  const y2 = cy + r * Math.sin(endRad);
  const largeArc = end - start > 180 ? 1 : 0;
  return [
    `M ${x1} ${y1}`,
    `A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}`,
  ].join(" ");
}

// --- Card positions (desktop) ---
const CARD_POSITIONS: Record<
  WheelCard["position"],
  { left: string; top: string; transform?: string }
> = {
  tl: { left: "7%", top: "7%" },
  tr: { left: "62%", top: "4%" },
  r: { left: "78%", top: "38%" },
  br: { left: "62%", top: "72%" },
  bl: { left: "7%", top: "72%" },
  l: { left: "-6%", top: "38%" },
};

// --- Card positions (mobile) ---
const CARD_GRID: Record<WheelCard["position"], string> = {
  tl: "1 / 1",
  tr: "1 / 2",
  r: "2 / 2",
  br: "3 / 2",
  bl: "3 / 1",
  l: "2 / 1",
};

// --- Main Component ---
export default function CapabilityWheel({
  data,
  className,
}: {
  data: CapabilityWheelData;
  className?: string;
}) {
  // Responsive
  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 768);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={`relative flex flex-col items-center justify-center w-full ${className || ""}`}
      style={{ minHeight: isMobile ? 680 : 540 }}
    >
      {/* SVG Wheel */}
      <div
        className="relative flex items-center justify-center"
        style={{
          width: isMobile ? 260 : WHEEL_SIZE,
          height: isMobile ? 260 : WHEEL_SIZE,
        }}
      >
        <svg
          width={isMobile ? 260 : WHEEL_SIZE}
          height={isMobile ? 260 : WHEEL_SIZE}
          viewBox={`0 0 ${WHEEL_SIZE} ${WHEEL_SIZE}`}
          className="absolute left-0 top-0"
          aria-hidden="true"
        >
          {/* Arcs */}
          {!isMobile &&
            data.arcs.map((arc, i) => (
              <path
                key={i}
                d={describeArc(
                  WHEEL_SIZE / 2,
                  WHEEL_SIZE / 2,
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
          {/* Mobile: thin outline */}
          {isMobile && (
            <circle
              cx={130}
              cy={130}
              r={60}
              stroke="#E5E7EB"
              strokeWidth={8}
              fill="none"
            />
          )}
        </svg>
        {/* Center circle */}
        <div
          className="absolute flex flex-col items-center justify-center bg-white rounded-full shadow-lg"
          style={{
            width: isMobile ? 120 : 180,
            height: isMobile ? 120 : 180,
            left: isMobile ? 70 : WHEEL_SIZE / 2 - 90,
            top: isMobile ? 70 : WHEEL_SIZE / 2 - 90,
            zIndex: 2,
          }}
        >
          <Image
            src={data.center.logo}
            alt={data.center.alt}
            width={isMobile ? 38 : 54}
            height={isMobile ? 38 : 54}
            className="mb-2"
            priority
          />
          <h3 className="text-base font-bold text-gray-800 text-center mb-1 leading-tight">
            {data.center.title}
          </h3>
          <div className="text-xs text-gray-700 text-center mb-1 font-medium">
            {data.center.subtitle}
          </div>
          <div className="text-xs text-[#F28C28] text-center font-semibold">
            {data.center.caption}
          </div>
        </div>
        {/* Cards (desktop: absolute, mobile: grid) */}
        {!isMobile &&
          data.cards.map((card) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 24, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              className="absolute"
              style={{
                ...CARD_POSITIONS[card.position],
                width: 190,
                minHeight: 110,
                zIndex: 3,
                ...(card.position === "l" && { width: 170 }),
              }}
            >
              <div
                className="bg-white rounded-xl shadow-lg px-4 py-3 flex flex-col items-start"
                style={{
                  borderTop: `4px solid ${card.color}`,
                  boxShadow: "0 4px 16px 0 rgba(31,41,55,0.08)",
                }}
              >
                <h4
                  className="font-bold text-base mb-2"
                  style={{ color: card.color }}
                >
                  {card.title}
                </h4>
                {card.image && (
                  <Image
                    src={card.image}
                    alt={card.alt || ""}
                    width={80}
                    height={28}
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
        {/* Mobile: grid */}
        {isMobile && (
          <div className="grid grid-rows-3 grid-cols-2 gap-x-2 gap-y-4 w-full mt-2 px-2">
            {data.cards.map((card) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 24, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                className="w-full"
                style={{
                  gridRow: CARD_GRID[card.position].split(" / ")[0],
                  gridColumn: CARD_GRID[card.position].split(" / ")[1],
                }}
              >
                <div
                  className="bg-white rounded-xl shadow-lg px-3 py-2 flex flex-col items-start"
                  style={{
                    borderTop: `3px solid ${card.color}`,
                    boxShadow: "0 2px 8px 0 rgba(31,41,55,0.08)",
                  }}
                >
                  <h4
                    className="font-bold text-sm mb-1"
                    style={{ color: card.color }}
                  >
                    {card.title}
                  </h4>
                  {card.image && (
                    <Image
                      src={card.image}
                      alt={card.alt || ""}
                      width={60}
                      height={20}
                      className="mb-1 rounded"
                    />
                  )}
                  <ul className="text-[11px] text-gray-700 font-medium space-y-1">
                    {card.bullets.map((b, i) => (
                      <li key={i}>▪ {b}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}