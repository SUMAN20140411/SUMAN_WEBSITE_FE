"use client";

import Head from "next/head";
import Layout from "@/components/Layout";
import HeroSection from "@/components/HeroSection";
import BreadcrumbSection from "@/components/BreadcrumbSection";
import { motion } from "framer-motion";
import Image from "next/image";
import { useLangStore } from "@/stores/langStore";
import {
  visionHeroText,
  visionMainText,
  visionStrategyText,
  visionCoreValue,
  visionMilestones,
  visionRndText,
} from "@/data/vision2";
import {
  Cpu,
  Handshake,
  Globe2,
  Leaf,
  Target,
  LineChart,
  Users,
  Lightbulb,
  Layers,
  FlaskConical,
} from "lucide-react";
const HERO_TRIM_PX = 38;
import type { Transition } from "framer-motion";

const floatTransition: Transition = {
  duration: 12,
  repeat: Infinity,
  repeatType: "mirror",
  ease: "easeInOut",
};

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.42, 0, 0.58, 1] }, // FIXED
  },
};

const stagger = {
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

export default function Vision2Page() {
  const { lang } = useLangStore();
  const hero = visionHeroText[lang];
  const overview = visionMainText[lang];
  const strategy = visionStrategyText[lang];
  const coreValues = visionCoreValue[lang];
  const milestones = visionMilestones[lang];
  const rnd = visionRndText[lang];

  // Example images
  const images = [
    "/images/company/vision_banner.jpg",
    "/images/business/process/coreKor2.png",
    "/images/business/process/FLOWKOREA.png",
    "/images/company/vision_factory.jpg",
  ];
  

// Vision title and subtitle
  const visionTitle = lang === "KOR"
    ? <>
        2024 <b>도약의 원년</b>—5년 내<br />
        <b>매출 600억·순이익 150억 달성,</b><br />
        <span className="text-sky-400 font-bold">‘확신(Confidence)’의</span><br />
        <span className="text-sky-400 font-bold"> 종합 솔루션 서비스 기업으로 성장</span>
      </>
    : <>
        2024 <b>Leap Year</b>—Within 5 Years <b>Revenue 60B KRW·Net Profit 15B Achieved,</b><br />
        <span className="text-sky-400 font-bold">‘Confidence’-based</span>
        <span className="text-sky-400 font-bold"> Total Solution Service Company Growth</span>
      </>;

  // Timeline data
  const C = {
    bgNavy: "#0A1633",
    panelWhite: "#F5F7FA",
    panelShade: "#E7EBF2",
    deepBlue: "#00215C",
    midBlue: "#0D70C0",
    lightBlue: "#CFE8FF",
    white: "#FFFFFF",
  };


  // Quadrant values
  const quadrants = lang === "KOR"
    ? [
        { label: "즐겁게", en: "Enjoy" },
        { label: "새롭게", en: "Neo" },
        { label: "치열하게", en: "Intensely" },
        { label: "빠르게", en: "Fastly" },
      ]
    : [
        { label: "Enjoy", en: "Enjoy" },
        { label: "Neo", en: "Neo" },
        { label: "Intensely", en: "Intensely" },
        { label: "Fastly", en: "Fastly" },
      ];
   const timeline = milestones;

  // Timeline colors
  const timelineColors = ["#17416d", "#38bdf8", "#bae6fd"];
  const neoTitleLines = strategy.neoTitle.replace(" 5th", "\n5th").split("\n");
  return (
    <Layout>
      <Head>
        <title>{lang === "KOR" ? "기업 비전" : "Vision"}</title>
      </Head>

      <main className="relative min-h-screen overflow-hidden bg-white text-slate-900 pt-[90px]">
        <motion.div
          className="pointer-events-none absolute -top-32 -left-20 h-80 w-80 -z-10 rounded-full bg-sky-200/60 blur-3xl"
          animate={{ x: [-20, 30, -15], y: [0, 25, -20] }}
          transition={floatTransition}
        />
        <motion.div
          className="pointer-events-none absolute bottom-[-12rem] right-[-12rem] h-[28rem] w-[28rem] -z-10 rounded-full bg-emerald-200/40 blur-3xl"
          animate={{ x: [0, -40, 20], y: [10, -30, 15] }}
          transition={{ ...floatTransition, duration: 16 }}
        />

        <div className="relative z-10">
          <div
            style={{
              marginTop: `-${HERO_TRIM_PX}px`,
              marginBottom: `-${HERO_TRIM_PX}px`,
            }}
          >
            <HeroSection
              title={hero.title}
              backgroundImage="/images/sub_banner/company_banner.png"
            />
          </div>

          <div className="relative z-20 -mt-2">
            <BreadcrumbSection
              path={lang === "KOR" ? "회사소개 > 기업 비전" : "Company > Vision"}
            />
          </div>
        </div>

        {/* Vision + Core Values Section */}
        <section className="w-full flex flex-col items-center justify-center py-20 px-2 md:px-0">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-0 w-full max-w-[1400px] mx-auto">
            {/* LEFT: Vision & Timeline */}
            <div className="flex flex-col items-center justify-center w-full lg:w-[700px]">
              <h2 className="text-2xl md:text-3xl font-semibold text-slate-700 mb-6 text-left w-full">
                {lang === "KOR" ? "Our Vision" : "Our Vision"}
              </h2>

              <div className="mb-10 text-left w-full">
                <div className="text-3xl md:text-5xl font-bold leading-tight mb-4 text-slate-900">
                  {visionTitle}
                </div>
              </div>

              {/* Timeline */}
              <div className="w-full flex flex-col items-center mb-10">
                {/* Target label */}
                <div className="w-full text-center mb-2">
                  <span className="tracking-[0.3em] text-white text-lg md:text-xl font-semibold">
                    TARGET
                  </span>
                </div>

                {/* Arrow above timeline */}
                <div className="flex justify-center w-full relative mb-2">
                  <svg
                    width="100%"
                    height="30"
                    className="block absolute left-0 right-0 mx-auto -top-7 z-10"
                    style={{ maxWidth: "100%" }}
                  >
                    <polygon points="50%,0 47%,18 53%,18" fill="#38bdf8" />
                  </svg>

                  <div className="flex justify-between w-full mx-auto max-w-[700px]">
                    {/* 3 gradiasi garis sepanjang container */}
                    {timelineColors.map((color, idx) => (
                      <div
                        key={color}
                        className="flex-1 h-5 rounded-full mx-1"
                        style={{
                          background:
                            idx === 0
                              ? "linear-gradient(90deg,#17416d 60%,#38bdf8 100%)"
                              : idx === 1
                              ? "linear-gradient(90deg,#38bdf8 60%,#b3e0f7 100%)"
                              : "linear-gradient(90deg,#b3e0f7 60%,#e3f4fb 100%)",
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Years & Descriptions */}
                <div className="flex justify-between w-full mx-auto max-w-[700px] mt-2">
                  {milestones.map((item, idx) => (
                    <div key={item.year} className="flex flex-col items-center flex-1">
                      <div className="text-xl md:text-2xl font-bold text-slate-900 mb-1 text-center">
                        {item.year}
                      </div>
                      <div className="text-xs md:text-sm text-slate-700 text-center whitespace-pre-line">
                        {item.text}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT: Quadrant Circle - LOOK EXACTLY LIKE THE PASTED IMAGE */}
            <div className="flex items-center justify-center w-full lg:w-[520px] h-[520px]">
              <svg
                viewBox="0 0 520 520"
                width="100%"
                height="100%"
                className="max-w-[520px] max-h-[520px]"
              >
                {/* Outer Gradient Circle */}
                <defs>
                  <radialGradient id="circleGrad" cx="50%" cy="50%" r="70%">
                    <stop offset="0%" stopColor="#e3f4fb" />
                    <stop offset="60%" stopColor="#38bdf8" />
                    <stop offset="100%" stopColor="#009fe3" />
                  </radialGradient>
                </defs>
                <circle cx="260" cy="260" r="240" fill="url(#circleGrad)" />
                {/* Inner white circle outline */}
                <circle cx="260" cy="260" r="130" fill="none" stroke="#fff" strokeWidth="4" />
                {/* Center Text - font size dikurangi, warna putih, style simple */}
                <text
                  x="260"
                  y="250"
                  textAnchor="middle"
                  fontSize="40"
                  fontFamily="'Segoe UI', Arial, sans-serif"
                  fontWeight="bold"
                  fill="#fff"
                  style={{ letterSpacing: "2px" }}
                >
                  NEO &#39;24
                </text>
                <text
                  x="260"
                  y="285"
                  textAnchor="middle"
                  fontSize="32"
                  fontFamily="'Segoe UI', Arial, sans-serif"
                  fontWeight="bold"
                  fill="#fff"
                  style={{ letterSpacing: "2px" }}
                >
                  5th 6015
                </text>
                {/* Top Left */}
                <text x="120" y="140" textAnchor="middle" fontSize="22" fontWeight="600" fill="#fff">
                  즐겁게
                  <tspan x="120" dy="1.2em" fontSize="14" fontWeight="400">(Enjoy)</tspan>
                </text>
                {/* Top Right */}
                <text x="400" y="140" textAnchor="middle" fontSize="22" fontWeight="600" fill="#fff">
                  새롭게
                  <tspan x="400" dy="1.2em" fontSize="14" fontWeight="400">(Neo)</tspan>
                </text>
                {/* Bottom Left */}
                <text x="120" y="400" textAnchor="middle" fontSize="22" fontWeight="600" fill="#fff">
                  치열하게
                  <tspan x="120" dy="1.2em" fontSize="14" fontWeight="400">(Intensely)</tspan>
                </text>
                {/* Bottom Right */}
                <text x="400" y="400" textAnchor="middle" fontSize="22" fontWeight="600" fill="#fff">
                  빠르게
                  <tspan x="400" dy="1.2em" fontSize="14" fontWeight="400">(Fastly)</tspan>
                </text>
              </svg>
            </div>
          </div>
        </section>

        {/* R&D Vision with Image - Layered Triangle Biz Model */}
<section className="bg-[#0A1633] w-full">
  <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-20 lg:py-28 grid grid-cols-1 lg:grid-cols-12 gap-y-16 items-center">
    {/* LEFT COLUMN */}
    <div className="lg:col-span-5 flex flex-col justify-center">
      <div className="text-white text-[1.7rem] font-bold mb-6">Biz Model</div>
      <h2 className="text-white text-2xl md:text-3xl font-bold leading-tight mb-4">
        끊임없는 연구개발과 스마트 공정<br />
        혁신을 통해{" "}
        <span
          className="bg-gradient-to-r from-[#45B8E8] to-[#7EE3F6] bg-clip-text text-transparent"
          style={{ WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
        >
          제조 효율의 새로운
        </span>
        <br />
        기준을 만들어 갑니다
      </h2>
    </div>
    {/* RIGHT COLUMN */}
    <div className="lg:col-span-7 flex flex-col items-center justify-center w-full">
      <div className="relative w-full">
        <div className="relative w-full aspect-[16/11]">
          <svg
            viewBox="0 0 1200 825"
            className="absolute inset-0 h-full w-full"
            aria-labelledby="bizModelGraphicTitle"
            role="img"
          >
            <title id="bizModelGraphicTitle">Layered Triangle Biz Model Graphic</title>
            {/* ====== Definitions: shadows & icons ====== */}
            <defs>
              {/* soft drop shadow */}
              <filter id="ds" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="6" />
                <feOffset dx="0" dy="8" result="off" />
                <feColorMatrix
                  in="off"
                  type="matrix"
                  values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0   0 0 0 0.18 0"
                />
                <feBlend in="SourceGraphic" mode="normal" />
              </filter>
              {/* bulb icon */}
              <symbol id="ic-bulb" viewBox="0 0 24 24">
                <path
                  d="M9 20h6m-5-3h4c0-1.657 3-2.5 3-6a5 5 0 10-10 0c0 3.5 3 4.343 3 6z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </symbol>
              {/* search icon */}
              <symbol id="ic-search" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
                <path d="M20 20l-4.2-4.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </symbol>
              {/* user icon */}
              <symbol id="ic-user" viewBox="0 0 24 24">
                <path
                  d="M12 13.5c3.59 0 6.5 2.02 6.5 4.5V20H5.5v-2c0-2.48 2.91-4.5 6.5-4.5z"
                  fill="currentColor"
                />
                <circle cx="12" cy="7.5" r="3.3" fill="currentColor" />
              </symbol>
            </defs>
            {/* ====== Triangle stack (white mountains) ====== */}
            {/* Small (left) */}
            <path
              d="M160 370 L10 620 L320 620 Z"
              fill="#FFFFFF"
              filter="url(#ds)"
            />
            {/* Medium (middle-left) */}
            <path
              d="M360 140 L160 540 L580 540 Z"
              fill="#FFFFFF"
              filter="url(#ds)"
            />
            {/* Large (main) */}
            <g filter="url(#ds)">
              <path
                d="M600 30 L80 760 L1120 760 Z"
                fill="#F5F7FA"
              />
              {/* inner fold along the left slope */}
              <path
                d="M600 30 L470 260 L320 760 L80 760 Z"
                fill="#E7EBF2"
                opacity="0.75"
              />
            </g>
            {/* Apex cap */}
            <path d="M600 30 L545 125 L655 125 Z" fill="#00215C" />
            {/* ====== Right-edge steps (trapezoids) ====== */}
            {/* 01 - top light blue */}
            <path
              d="M660 120 L880 120 L930 212 L660 212 Z"
              fill="#CFE8FF"
            />
            {/* 02 - middle midBlue */}
            <path
              d="M660 260 L950 260 L1000 370 L660 370 Z"
              fill="#0D70C0"
            />
            {/* 03 - bottom deepBlue */}
            <path
              d="M660 430 L980 430 L1060 600 L660 600 Z"
              fill="#00215C"
            />
            {/* ====== Step numbers ====== */}
            <g
              fontFamily="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto"
              fontWeight="700"
              fontSize="38"
              fill="#FFFFFF"
            >
              <text x="720" y="185">01</text>
              <text x="765" y="330">02</text>
              <text x="840" y="520">03</text>
            </g>
            {/* ====== Icon disks along inner diagonal ====== */}
            {/* Bulb */}
            <g transform="translate(420,620)">
              <circle r="40" fill="#00215C" />
              <use href="#ic-bulb" x="-12" y="-12" width="24" height="24" fill="#FFFFFF" />
            </g>
            {/* Search */}
            <g transform="translate(560,510)">
              <circle r="40" fill="#0D70C0" />
              <use href="#ic-search" x="-12" y="-12" width="24" height="24" fill="#FFFFFF" />
            </g>
            {/* User */}
            <g transform="translate(700,360)" opacity="0.9">
              <circle r="40" fill="#CFE8FF" />
              <use href="#ic-user" x="-12" y="-12" width="24" height="24" fill="#FFFFFF" />
            </g>
            {/* ====== Bottom ribbon ====== */}
            <g>
              <rect x="180" y="740" width="770" height="46" rx="2" fill="#FFFFFF" />
              <text
                x="565"
                y="771"
                textAnchor="middle"
                fontFamily="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto"
                fontWeight="800"
                fontSize="24"
                fill="#0A1633"
                letterSpacing="0.25em"
              >
                OPEN INNOVATION
              </text>
            </g>
            {/* ====== Right-side labels (aligned to steps) ====== */}
            <g
              fontFamily="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto"
              fill="#FFFFFF"
            >
              {/* 01 */}
              <text x="820" y="90" fontSize="24" fontWeight="800">
                R&amp;BD 조기사업화 · 차세대 성장동력원 확보
              </text>
              <text x="820" y="128" fontSize="18" opacity="0.9">
                단계별 ITEM Launching·사업화
              </text>
              {/* 02 */}
              <text x="920" y="215" fontSize="24" fontWeight="800">
                신사업Biz · R&amp;D
              </text>
              <text x="920" y="250" fontSize="18" opacity="0.9">신사업 발굴</text>
              <text x="920" y="282" fontSize="18" opacity="0.9">TEM PJT 化</text>
              <text x="920" y="314" fontSize="18" opacity="0.9">R&amp;BD Base</text>
              <text x="920" y="346" fontSize="18" opacity="0.9">차별화</text>
              {/* 03 */}
              <text x="980" y="420" fontSize="24" fontWeight="800">
                제조본부 · 개발본부
              </text>
              <text x="980" y="455" fontSize="18" opacity="0.9">ITEM 조기 정착</text>
              <text x="980" y="487" fontSize="18" opacity="0.9">Mass Product 안정화</text>
            </g>
          </svg>
        </div>
      </div>
    </div>
  </div>
</section>
      </main>
    </Layout>
  );
}