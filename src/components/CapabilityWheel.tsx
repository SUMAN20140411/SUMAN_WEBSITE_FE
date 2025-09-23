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

// Card Sizing (+15%)
const CARD_WIDTH = 219;
const CARD_HEIGHT = 127;
const CARD_WIDTH_L = 196;
const CARD_IMG_W = 92;
const CARD_IMG_H = 32;

// --- Helper: SVG arc path ---
function describeArc(cx: number, cy: number, r: number, start: number, end: number) {
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

// --- Polar card positions (desktop/tablet) ---
const POLAR_POSITIONS: Record<
  string,
  { angle: number; align: "left" | "right" }
> = {
  tl: { angle: 170, align: "left" },
  l: { angle: 190, align: "left" },
  bl: { angle: 210, align: "left" },
  tr: { angle: 10, align: "right" },
  r: { angle: 30, align: "right" },
  br: { angle: 350, align: "right" },
};

// --- Card positions (mobile) ---
const CARD_GRID: Record<string, string> = {
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
  const [wheelSize, setWheelSize] = React.useState(WHEEL_SIZE);
  const [placementRadius, setPlacementRadius] = React.useState(ARC_RADIUS + 18);

  React.useEffect(() => {
    function handleResize() {
      const w = window.innerWidth;
      if (w < 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
        if (w >= 1280) {
          setWheelSize(WHEEL_SIZE_LG);
          setPlacementRadius(ARC_RADIUS + 38);
        } else if (w >= 1024) {
          setWheelSize(WHEEL_SIZE_MD);
          setPlacementRadius(ARC_RADIUS + 28);
        } else {
          setWheelSize(WHEEL_SIZE);
          setPlacementRadius(ARC_RADIUS + 18);
        }
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // --- Desktop/Tablet: Polar card placement ---
  function getCardStyle(pos: string) {
    const { angle, align } = POLAR_POSITIONS[pos];
    const rad = (angle * Math.PI) / 180;
    const cx = wheelSize / 2;
    const cy = wheelSize / 2;
    const x = cx + placementRadius * Math.cos(rad);
    const y = cy + placementRadius * Math.sin(rad);

    // Tangential alignment
    if (align === "right") {
      return {
        position: "absolute" as const,
        left: x + 12,
        top: y,
        width: CARD_WIDTH,
        minHeight: CARD_HEIGHT,
        transform: "translate(0,-50%)",
        zIndex: 3,
      };
    } else {
      return {
        position: "absolute" as const,
        left: x - 12,
        top: y,
        width: pos === "l" ? CARD_WIDTH_L : CARD_WIDTH,
        minHeight: CARD_HEIGHT,
        transform: "translate(-100%,-50%)",
        zIndex: 3,
      };
    }
  }

  // --- Mobile: grid style ---
  function getMobileCardStyle(pos: string) {
    const [row, col] = CARD_GRID[pos].split(" / ");
    return {
      gridRow: row,
      gridColumn: col,
    };
  }

  // --- Render ---
  return (
    <div
      className={`relative flex flex-col items-center justify-center w-full ${className || ""}`}
      style={{ minHeight: isMobile ? 680 : wheelSize + 60, overflowX: isMobile ? "visible" : "auto" }}
    >
      {/* Desktop/Tablet: SVG Wheel + Center Circle + Cards */}
      {!isMobile && (
        <div
          className="relative flex items-center justify-center"
          style={{
            width: wheelSize,
            height: wheelSize,
            minWidth: wheelSize,
            minHeight: wheelSize,
          }}
        >
          {/* SVG Wheel */}
          <svg
            width={wheelSize}
            height={wheelSize}
            viewBox={`0 0 ${wheelSize} ${wheelSize}`}
            className="absolute left-0 top-0"
            aria-hidden="true"
            style={{ zIndex: 1 }}
          >
            {/* Arcs */}
            {data.arcs.map((arc, i) => (
              <path
                key={i}
                d={describeArc(
                  wheelSize / 2,
                  wheelSize / 2,
                  ARC_RADIUS + (wheelSize - WHEEL_SIZE) / 10,
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
          {/* Center circle */}
          <div
            className="absolute flex flex-col items-center justify-center bg-white rounded-full shadow-lg"
            style={{
              width: wheelSize > 500 ? 210 : 180,
              height: wheelSize > 500 ? 210 : 180,
              left: wheelSize / 2 - (wheelSize > 500 ? 105 : 90),
              top: wheelSize / 2 - (wheelSize > 500 ? 105 : 90),
              zIndex: 2,
            }}
          >
            <Image
              src={data.center.logo}
              alt={data.center.alt}
              width={wheelSize > 500 ? 62 : 54}
              height={wheelSize > 500 ? 62 : 54}
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
          {/* Cards (polar placement) */}
          {data.cards.map((card) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 24, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              style={getCardStyle(card.position)}
            >
              <div
                className="bg-white rounded-xl shadow-lg px-5 py-4 flex flex-col items-start"
                style={{
                  borderTop: `4px solid ${card.color}`,
                  boxShadow: "0 4px 16px 0 rgba(31,41,55,0.08)",
                  overflow: "hidden",
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

      {/* Mobile: Title Card + Grid Cards */}
      {isMobile && (
        <div className="w-full flex flex-col items-center px-2">
          {/* Title Card */}
          <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-lg px-4 py-4 mb-4 flex flex-col items-center">
            {data.center.logo && (
              <Image
                src={data.center.logo}
                alt={data.center.alt}
                width={38}
                height={38}
                className="mb-2"
                priority
              />
            )}
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
          {/* Cards grid */}
          <div className="grid grid-rows-3 grid-cols-2 gap-x-3 gap-y-4 w-full max-w-md mx-auto">
            {data.cards.map((card) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 24, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                style={getMobileCardStyle(card.position)}
                className="w-full"
              >
                <div
                  className="bg-white rounded-xl shadow-lg px-3 py-2 flex flex-col items-start"
                  style={{
                    borderTop: `3px solid ${card.color}`,
                    boxShadow: "0 2px 8px 0 rgba(31,41,55,0.08)",
                    overflow: "hidden",
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
                      width={CARD_IMG_W * 0.65}
                      height={CARD_IMG_H * 0.65}
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
        </div>
      )}
    </div>
  );
}