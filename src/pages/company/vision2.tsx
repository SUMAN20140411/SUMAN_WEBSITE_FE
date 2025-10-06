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
        {/* R&D Vision with Image - Large White Triangle + Diagonal Dividers */}
        {/* R&D Vision with Image - Layered Pyramid with Image Backgrounds */}
<section className="bg-[#0A1633] w-full">
  <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-20 lg:py-28 grid grid-cols-1 lg:grid-cols-12 items-center">
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
      <div className="relative w-full aspect-[16/8]">
        {/* SVG Pyramid Layered */}
        <svg
          viewBox="0 0 1540 990"
          className="absolute inset-0 w-full h-full"
          aria-labelledby="bizModelGraphicTitle"
          role="img"
        >
          <title id="bizModelGraphicTitle">Layered Pyramid Biz Model with Images</title>
          <defs>
            {/* Images for each layer */}
            <pattern id="img-top" patternUnits="objectBoundingBox" width="1" height="1">
              <image href="/images/sub_banner/company_banner.png" x="0" y="0" width="420" height="240" preserveAspectRatio="xMidYMid slice" />
            </pattern>
            <pattern id="img-mid" patternUnits="objectBoundingBox" width="1" height="1">
              <image href="/images/business/process/coreKor2.png" x="0" y="0" width="980" height="290" preserveAspectRatio="xMidYMid slice" />
            </pattern>
            <pattern id="img-bot" patternUnits="objectBoundingBox" width="1" height="1">
              <image href="/images/business/process/FLOWKOREA.png" x="0" y="0" width="980" height="290" preserveAspectRatio="xMidYMid slice" />
            </pattern>
          </defs>
          {/* --- Layer 1: Top triangle --- */}
          {/* Rectangle behind triangle */}
          <rect x="520" y="80" width="1000" height="180" fill="#2182a7" opacity="0.7" />
          {/* Triangle with image */}
          <polygon
            points="770,80 1150,370 390,370"
            fill="url(#img-top)"
            stroke="#2182a7"
            strokeWidth="4"
          />
          {/* --- Layer 2: Middle trapezoid --- */}
          {/* Rectangle behind trapezoid */}
          <rect x="520" y="370" width="1000" height="180" fill="#2182a7" opacity="0.7" />
          {/* Trapezoid with image */}
          <polygon
            points="470,370 1070,370 1170,560 370,560"
            fill="url(#img-mid)"
            stroke="#2182a7"
            strokeWidth="4"
          />
          {/* --- Layer 3: Bottom trapezoid --- */}
          {/* Rectangle behind trapezoid */}
          <rect x="520" y="560" width="1000" height="180" fill="#2182a7" opacity="0.7" />
          {/* Trapezoid with image */}
          <polygon
            points="410,560 1130,560 1230,850 310,850"
            fill="url(#img-bot)"
            stroke="#2182a7"
            strokeWidth="4"
          />
          {/* --- Bottom Ribbon --- */}
          <rect x="310" y="880" width="920" height="54" rx="8" fill="#fff" />
          <text
            x="770"
            y="915"
            textAnchor="middle"
            fontFamily="Segoe UI, Arial"
            fontWeight="bold"
            fontSize="38"
            fill="#0A1633"
            letterSpacing="2"
          >
            OPEN INNOVATION
          </text>
        </svg>
        {/* --- Step Texts (absolutely positioned, right side) --- */}
        <div className="absolute top-[110px] left-[1080px] w-[420px]">
          {/* Step 01 */}
          <div className="mb-16">
            <div className="text-white font-bold text-[1.35rem] mb-2">R&BD 조기사업화 · 차세대 성장동력원 확보</div>
            <div className="text-white text-[1.05rem]">단계별 ITEM Launching·사업화</div>
          </div>
          {/* Step 02 */}
          <div className="mb-16">
            <div className="text-white font-bold text-[1.35rem] mb-2">신사업Biz · R&D</div>
            <ul className="text-white text-[1.05rem] space-y-1 pl-1">
              <li>신사업 발굴 TEAM PJT 化</li>
              <li>R&BD Base 차별화</li>
            </ul>
          </div>
          {/* Step 03 */}
          <div>
            <div className="text-white font-bold text-[1.35rem] mb-2">제조본부 · 개발본부</div>
            <ul className="text-white text-[1.05rem] space-y-1 pl-1">
              <li>ITEM 조기 정착</li>
              <li>Mass Product 안정화</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
      </main>
    </Layout>
  );
}