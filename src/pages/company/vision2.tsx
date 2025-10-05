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

        {/* R&D Vision with Image - dark version of Vision background */}
        <section className="py-16 px-4 md:px-8 bg-gradient-to-br from-[#17416d] via-[#17416d] to-[#38bdf8] text-white">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block rounded-full bg-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-widest text-sky-200 mb-4">
                {rnd.title}
              </span>

              <h3 className="text-3xl md:text-4xl font-bold leading-tight whitespace-pre-line text-slate-50 mb-6">
                {rnd.subtitle}
              </h3>

              <div className="grid gap-6">
                {[rnd.leftBox1Title, rnd.leftBox2Title].map((title, i) => (
                  <div
                    key={title}
                    className="rounded-2xl border border-white/15 bg-white/10 p-6 shadow-lg backdrop-blur flex items-center gap-4"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-sky-200">
                      {i === 0 ? <Cpu className="h-6 w-6" /> : <FlaskConical className="h-6 w-6" />}
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-white">{title}</h4>
                      <p className="mt-2 text-sm text-slate-200 leading-relaxed">
                        {i === 0 ? rnd.leftBox1Desc : rnd.leftBox2Desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden shadow-lg border-4 border-sky-100 bg-white/10">
              {/* Fixed-height wrapper + Image fill → box tidak ikut ukuran gambar */}
              <div className="relative w-full h-[320px] md:h-[420px]">
                <Image
                  src="/images/careers/philosophy/communication.png" // ← gambar asli yang kamu sebut
                  alt="R&D Vision"
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 600px, 100vw"
                />
              </div>

              <div className="p-6">
                <p className="text-sm font-semibold uppercase tracking-widest text-sky-200">
                  {rnd.rightBoxTop}
                </p>
                <h4 className="text-2xl md:text-3xl font-bold text-white mt-2">{rnd.rightBoxTitle}</h4>
                <p className="text-sm md:text-base whitespace-pre-line text-slate-100 leading-relaxed mt-2">
                  {rnd.rightBoxDesc}
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* Biz Model Section aligned with reference design */}
        <section className="relative overflow-hidden bg-[#0c2d52] text-white py-20 px-4 md:px-8">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-32 -left-24 h-72 w-72 rounded-full bg-sky-400/30 blur-[160px]" />
            <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-[#17416d]/40 blur-[160px]" />
          </div>
          <div className="relative z-10 max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16">
            <div className="w-full lg:max-w-xl">
              <motion.span
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, ease: [0.42, 0, 0.58, 1] }}
                className="inline-block text-sm md:text-base uppercase tracking-[0.4em] text-sky-200 mb-6"
              >
                {strategy.bizModelTitle}
              </motion.span>
              <motion.h3
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.7, ease: [0.42, 0, 0.58, 1] }}
                className="text-3xl md:text-4xl font-bold leading-snug whitespace-pre-line text-sky-50"
              >
                {rnd.subtitle}
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.7, ease: [0.42, 0, 0.58, 1], delay: 0.2 }}
                className="mt-6 text-base md:text-lg text-slate-100 whitespace-pre-line"
              >
                {strategy.bizModelSubtitle}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.7, ease: [0.42, 0, 0.58, 1], delay: 0.35 }}
                className="mt-8 grid grid-cols-2 gap-4 text-xs md:text-sm text-slate-200"
              >
                {strategy.businessAreas.sectors.map((sector) => (
                  <div
                    key={sector}
                    className="rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-center leading-relaxed whitespace-pre-line"
                  >
                    {sector}
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Pyramid visual */}
            <div className="w-full lg:flex-1 flex flex-col items-center lg:items-end gap-10">
              <div className="relative w-full max-w-[360px]">
                <svg
                  viewBox="0 0 360 420"
                  className="w-full drop-shadow-[0_25px_45px_rgba(8,35,71,0.45)]"
                  role="img"
                  aria-label={strategy.bizModelTitle}
                >
                  <defs>
                    <linearGradient id="pyramidBase" x1="0%" y1="100%" x2="0%" y2="0%">
                      <stop offset="0%" stopColor="#0a2a4a" />
                      <stop offset="100%" stopColor="#1d5fa5" />
                    </linearGradient>
                    <linearGradient id="pyramidMid" x1="0%" y1="100%" x2="0%" y2="0%">
                      <stop offset="0%" stopColor="#1b5fa1" />
                      <stop offset="100%" stopColor="#4ab7f8" />
                    </linearGradient>
                    <linearGradient id="pyramidTop" x1="0%" y1="100%" x2="0%" y2="0%">
                      <stop offset="0%" stopColor="#e0f4ff" />
                      <stop offset="100%" stopColor="#f9fcff" />
                    </linearGradient>
                  </defs>
                  <polygon points="180,30 350,360 10,360" fill="url(#pyramidBase)" stroke="#2f5f9b" strokeWidth="3" />
                  <polygon points="180,30 300,360 60,360" fill="url(#pyramidMid)" stroke="#4f8fcb" strokeWidth="3" />
                  <polygon points="180,30 250,360 110,360" fill="url(#pyramidTop)" stroke="#7fc5f5" strokeWidth="3" />
                  <circle cx="180" cy="160" r="70" fill="#0d3f73" opacity="0.25" />
                  <text
                    x="180"
                    y="150"
                    textAnchor="middle"
                    fontSize="28"
                    fontWeight="700"
                    fill="#f1f5f9"
                    style={{ letterSpacing: "0.08em" }}
                  >
                    {neoTitleLines.map((line, idx) => (
                      <tspan key={line} x="180" dy={idx === 0 ? 0 : 32}>
                        {line}
                      </tspan>
                    ))}
                  </text>
                  <g fontFamily="'Pretendard', 'Noto Sans KR', sans-serif" fontWeight="600">
                    <text x="295" y="140" fontSize="30" fill="#ffffff" opacity="0.7">
                      01
                    </text>
                    <text x="280" y="240" fontSize="30" fill="#d0ecff">
                      02
                    </text>
                    <text x="230" y="330" fontSize="30" fill="#7cc7ff">
                      03
                    </text>
                  </g>
                  <g>
                    <circle cx="280" cy="120" r="26" fill="#0e3b68" stroke="#8ed4ff" strokeWidth="4" />
                    <circle cx="255" cy="220" r="24" fill="#1d6fb0" stroke="#9ee0ff" strokeWidth="4" />
                    <circle cx="205" cy="305" r="24" fill="#2a9ff2" stroke="#bee8ff" strokeWidth="4" />
                  </g>
                  <text
                    x="180"
                    y="342"
                    textAnchor="middle"
                    fontSize="18"
                    letterSpacing="0.5em"
                    fill="#8ed4ff"
                  >
                    {strategy.openInnovation}
                  </text>
                </svg>
              </div>

              <div className="w-full max-w-[420px] space-y-6 text-sm md:text-base">
                {[
                  {
                    level: "01",
                    title: strategy.businessAreas.development,
                    accent: "bg-[#1e4f80]",
                  },
                  {
                    level: "02",
                    title: strategy.businessAreas.partnerships,
                    accent: "bg-[#2d8bd3]",
                  },
                  {
                    level: "03",
                    title: strategy.businessAreas.manufacturing,
                    accent: "bg-[#134069]",
                  },
                ].map((item) => (
                  <div
                    key={item.level}
                    className="flex items-start gap-4 rounded-2xl border border-white/15 bg-white/5 p-5"
                  >
                    <span
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-lg font-semibold text-white ${item.accent}`}
                    >
                      {item.level}
                    </span>
                    <p className="text-slate-100 leading-relaxed whitespace-pre-line">{item.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}