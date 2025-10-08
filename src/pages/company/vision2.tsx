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
  const visionTitle =
    lang === "KOR" ? (
      <>
        2024 <b>도약의 원년</b>—5년 내
        <br />
        <b>매출 600억·순이익 150억 달성,</b>
        <br />
        <span className="text-sky-400 font-bold">‘확신(Confidence)’의</span>
        <br />
        <span className="text-sky-400 font-bold"> 종합 솔루션 서비스 기업으로 성장</span>
      </>
    ) : (
      <>
        2024 <b>Leap Year</b>—Within 5 Years <b>Revenue 60B KRW·Net Profit 15B Achieved,</b>
        <br />
        <span className="text-sky-400 font-bold">‘Confidence’-based</span>
        <span className="text-sky-400 font-bold"> Total Solution Service Company Growth</span>
      </>
    );

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
  const quadrants =
    lang === "KOR"
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
            <HeroSection title={hero.title} backgroundImage="/images/sub_banner/company_banner.png" />
          </div>

          <div className="relative z-20 -mt-2">
            <BreadcrumbSection path={lang === "KOR" ? "회사소개 > 기업 비전" : "Company > Vision"} />
          </div>
        </div>

        {/* Vision + Core Values Section with Animation & Hover Effects */}
        <section className="w-full flex flex-col items-center justify-center py-20 px-2 md:px-0 bg-white">
          <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.42, 0, 0.58, 1] }}
          className="flex flex-col lg:flex-row items-center justify-center gap-0 w-full max-w-[1400px] mx-auto"
          >
            {/* LEFT: Vision & Timeline */}
            <div className="flex flex-col items-center justify-center w-full lg:w-[700px]">
              <motion.h2
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.7 }}
                className="text-2xl md:text-3xl font-semibold text-slate-700 mb-6 text-left w-full transition-all duration-200 transition: { duration: 0.3 }"
              >
                {lang === "KOR" ? "Our Vision" : "Our Vision"}
              </motion.h2>

              <div className="mb-10 text-left w-full">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.7 }}
                  className="text-3xl md:text-5xl font-bold leading-tight mb-4 text-slate-900 transition-all duration-200 transition: { duration: 0.3 }"
                >
                  {visionTitle}
                </motion.div>
              </div>

              {/* Timeline */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.7 }}
                className="w-full flex flex-col items-center mb-10"
              >
                {/* Target label */}
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.7 }}
                  className="w-full text-center mb-2 transition-all duration-200 hover:text-sky-500"
                >
                  <span className="tracking-[0.3em] text-white text-lg md:text-xl font-semibold">TARGET</span>
                </motion.div>

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
                    <motion.div
                      key={item.year}
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{ duration: 0.7, delay: idx * 0.15 }}
                      className="flex flex-col items-center flex-1"
                    >
                      <div className="text-xl md:text-2xl font-bold text-slate-900 mb-1 text-center transition-all duration-200 hover:text-sky-500">
                        {item.year}
                      </div>
                      <div className="text-xs md:text-sm text-slate-700 text-center whitespace-pre-line transition-all duration-200 hover:text-sky-500">
                        {item.text}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* RIGHT: Quadrant Circle - Hover Effect */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7 }}
              whileHover={{ scale: 1.04, filter: "drop-shadow(0 0 16px #38bdf8)" , transition: { duration: 0.3 } }}
              className="flex items-center justify-center w-full lg:w-[520px] h-[520px] transition-all duration-300"
            >
              <div className="w-full h-full flex items-center justify-center" style={{ maxWidth: 520, maxHeight: 520 }}>
                <svg viewBox="0 0 520 520" width="100%" height="100%" className="max-w-[520px] max-h-[520px]">
                  {/* ...existing SVG code... */}
                  <defs>
                    <radialGradient id="circleGrad" cx="50%" cy="50%" r="70%">
                      <stop offset="0%" stopColor="#e3f4fb" />
                      <stop offset="60%" stopColor="#38bdf8" />
                      <stop offset="100%" stopColor="#009fe3" />
                    </radialGradient>
                  </defs>
                  <circle cx="260" cy="260" r="240" fill="url(#circleGrad)" />
                  <circle cx="260" cy="260" r="130" fill="none" stroke="#fff" strokeWidth="4" />
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
                    <tspan x="120" dy="1.2em" fontSize="14" fontWeight="400">
                      (Enjoy)
                    </tspan>
                  </text>
                  {/* Top Right */}
                  <text x="400" y="140" textAnchor="middle" fontSize="22" fontWeight="600" fill="#fff">
                    새롭게
                    <tspan x="400" dy="1.2em" fontSize="14" fontWeight="400">
                      (Neo)
                    </tspan>
                  </text>
                  {/* Bottom Left */}
                  <text x="120" y="400" textAnchor="middle" fontSize="22" fontWeight="600" fill="#fff">
                    치열하게
                    <tspan x="120" dy="1.2em" fontSize="14" fontWeight="400">
                      (Intensely)
                    </tspan>
                  </text>
                  {/* Bottom Right */}
                  <text x="400" y="400" textAnchor="middle" fontSize="22" fontWeight="600" fill="#fff">
                    빠르게
                    <tspan x="400" dy="1.2em" fontSize="14" fontWeight="400">
                      (Fastly)
                    </tspan>
                  </text>
                </svg>
              </div>
            </motion.div>
          </motion.div>
          {/* Core Values Section - Responsive & Bilingual */}
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.4 }}
    transition={{ duration: 0.7, ease: [0.42, 0, 0.58, 1] }}
    className="w-full max-w-[1200px] mx-auto mt-16"
  >
    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-10 text-center tracking-tight">
      {lang === "KOR" ? "핵심 가치" : "Core Values"}
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {/* 유연조직 / Flexible Organization */}
      <motion.div
        whileHover={{ scale: 1.05, boxShadow: "0 8px 32px #e2e8f0" }}
        className="bg-gradient-to-br from-white to-slate-100 rounded-2xl shadow-lg p-8 flex flex-col items-center text-center border border-slate-200 transition-all duration-300"
      >
        <div className="mb-4 flex items-center justify-center w-14 h-14 rounded-full bg-sky-50 border border-sky-100">
          <Cpu size={32} className="text-sky-400" />
        </div>
        <div className="font-bold text-lg mb-2 text-slate-900 tracking-tight">
          {lang === "KOR" ? "유연조직" : "Flexible Organization"}
        </div>
        <div className="text-gray-600 text-sm leading-relaxed">
          {lang === "KOR"
            ? <>급변하는 시장에 유연하게 반응하며<br />끊임없이 혁신하는 조직입니다.</>
            : <>We flexibly respond to rapidly changing markets<br />and continuously innovate as an organization.</>
          }
        </div>
      </motion.div>
      {/* 전문인력 / Professional Talent */}
      <motion.div
        whileHover={{ scale: 1.05, boxShadow: "0 8px 32px #e2e8f0" }}
        className="bg-gradient-to-br from-white to-slate-100 rounded-2xl shadow-lg p-8 flex flex-col items-center text-center border border-slate-200 transition-all duration-300"
      >
        <div className="mb-4 flex items-center justify-center w-14 h-14 rounded-full bg-emerald-50 border border-emerald-100">
          <Users size={32} className="text-emerald-400" />
        </div>
        <div className="font-bold text-lg mb-2 text-slate-900 tracking-tight">
          {lang === "KOR" ? "전문인력" : "Professional Talent"}
        </div>
        <div className="text-gray-600 text-sm leading-relaxed">
          {lang === "KOR"
            ? <>각 분야 최고의 전문성을 갖춘<br />인력들이 모여<br />차별화된 가치를 제공합니다.</>
            : <>Top experts in each field<br />gather to provide differentiated value.</>
          }
        </div>
      </motion.div>
      {/* 기술융합 / Technology Convergence */}
      <motion.div
        whileHover={{ scale: 1.05, boxShadow: "0 8px 32px #e2e8f0" }}
        className="bg-gradient-to-br from-white to-slate-100 rounded-2xl shadow-lg p-8 flex flex-col items-center text-center border border-slate-200 transition-all duration-300"
      >
        <div className="mb-4 flex items-center justify-center w-14 h-14 rounded-full bg-indigo-50 border border-indigo-100">
          <Layers size={32} className="text-indigo-400" />
        </div>
        <div className="font-bold text-lg mb-2 text-slate-900 tracking-tight">
          {lang === "KOR" ? "기술융합" : "Technology Convergence"}
        </div>
        <div className="text-gray-600 text-sm leading-relaxed">
          {lang === "KOR"
            ? <>기술의 경계를 허물고 융합하여<br />미래를 선도하는<br />기술 혁신을 이루어갑니다</>
            : <>Breaking boundaries and converging technology<br />to lead the future with innovation.</>
          }
        </div>
      </motion.div>
      {/* R&BD */}
      <motion.div
        whileHover={{ scale: 1.05, boxShadow: "0 8px 32px #e2e8f0" }}
        className="bg-gradient-to-br from-white to-slate-100 rounded-2xl shadow-lg p-8 flex flex-col items-center text-center border border-slate-200 transition-all duration-300"
      >
        <div className="mb-4 flex items-center justify-center w-14 h-14 rounded-full bg-pink-50 border border-pink-100">
          <FlaskConical size={32} className="text-pink-400" />
        </div>
        <div className="font-bold text-lg mb-2 text-slate-900 tracking-tight">
          {lang === "KOR" ? "R&BD" : "R&BD"}
        </div>
        <div className="text-gray-600 text-sm leading-relaxed">
          {lang === "KOR"
            ? <>지속적인 R&D 투자를 통해<br />기술 혁신을 넘어 실질적인<br />비즈니스 성과를 창출합니다.</>
            : <>Through continuous R&D investment,<br />we create real business outcomes<br />beyond technological innovation.</>
          }
        </div>
      </motion.div>
    </div>
  </motion.div>
</section>

        
{/* Core Values Section - 핵심 가치 */}
<section className="w-full flex flex-col items-center justify-center py-16 px-2 md:px-0 bg-[#0A1633]">
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.4 }}
    transition={{ duration: 0.7, ease: [0.42, 0, 0.58, 1] }}
    className="w-full max-w-[1200px] mx-auto"
  >
    <h2 className="text-2xl md:text-3xl font-bold text-white mb-10 text-center tracking-tight">
      핵심 가치
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {/* 유연조직 */}
      <motion.div
        whileHover={{ scale: 1.05, boxShadow: "0 8px 32px #17416d" }}
        className="bg-gradient-to-br from-[#1a2747] to-[#233a5e] rounded-2xl shadow-lg p-8 flex flex-col items-center text-center border border-[#233a5e] transition-all duration-300"
      >
        <div className="mb-4 flex items-center justify-center w-14 h-14 rounded-full bg-white/10 border border-white/20">
          <Cpu size={32} className="text-sky-400" />
        </div>
        <div className="font-bold text-lg mb-2 text-white tracking-tight">유연조직</div>
        <div className="text-gray-300 text-sm leading-relaxed">
          급변하는 시장에 유연하게 반응하며<br />
          끊임없이 혁신하는 조직입니다.
        </div>
      </motion.div>
      {/* 전문인력 */}
      <motion.div
        whileHover={{ scale: 1.05, boxShadow: "0 8px 32px #17416d" }}
        className="bg-gradient-to-br from-[#1a2747] to-[#233a5e] rounded-2xl shadow-lg p-8 flex flex-col items-center text-center border border-[#233a5e] transition-all duration-300"
      >
        <div className="mb-4 flex items-center justify-center w-14 h-14 rounded-full bg-white/10 border border-white/20">
          <Users size={32} className="text-emerald-400" />
        </div>
        <div className="font-bold text-lg mb-2 text-white tracking-tight">전문인력</div>
        <div className="text-gray-300 text-sm leading-relaxed">
          각 분야 최고의 전문성을 갖춘<br />
          인력들이 모여<br />
          차별화된 가치를 제공합니다.
        </div>
      </motion.div>
      {/* 기술융합 */}
      <motion.div
        whileHover={{ scale: 1.05, boxShadow: "0 8px 32px #17416d" }}
        className="bg-gradient-to-br from-[#1a2747] to-[#233a5e] rounded-2xl shadow-lg p-8 flex flex-col items-center text-center border border-[#233a5e] transition-all duration-300"
      >
        <div className="mb-4 flex items-center justify-center w-14 h-14 rounded-full bg-white/10 border border-white/20">
          <Layers size={32} className="text-indigo-400" />
        </div>
        <div className="font-bold text-lg mb-2 text-white tracking-tight">기술융합</div>
        <div className="text-gray-300 text-sm leading-relaxed">
          기술의 경계를 허물고 융합하여<br />
          미래를 선도하는<br />
          기술 혁신을 이루어갑니다
        </div>
      </motion.div>
      {/* R&BD */}
      <motion.div
        whileHover={{ scale: 1.05, boxShadow: "0 8px 32px #17416d" }}
        className="bg-gradient-to-br from-[#1a2747] to-[#233a5e] rounded-2xl shadow-lg p-8 flex flex-col items-center text-center border border-[#233a5e] transition-all duration-300"
      >
        <div className="mb-4 flex items-center justify-center w-14 h-14 rounded-full bg-white/10 border border-white/20">
          <FlaskConical size={32} className="text-pink-400" />
        </div>
        <div className="font-bold text-lg mb-2 text-white tracking-tight">R&BD</div>
        <div className="text-gray-300 text-sm leading-relaxed">
          지속적인 R&D 투자를 통해<br />
          기술 혁신을 넘어 실질적인<br />
          비즈니스 성과를 창출합니다.
        </div>
      </motion.div>
    </div>
  </motion.div>
</section>

        {/* R&D Section - Hover Effect on Image & Animation on Text */}
        <section className="bg-[#0A1633] w-full">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-20 lg:py-28 grid grid-cols-1 lg:grid-cols-12 items-center">
            {/* LEFT COLUMN */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, ease: [0.42, 0, 0.58, 1] }}
              className="lg:col-span-5 flex flex-col justify-start"
            >
              <motion.div
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.7 }}
              >
                <div className="text-white text-[1.7rem] font-bold mb-6 transition-all duration-200 hover:scale-1.05 transition: { duration: 0.3 }">
                  Biz Model
                </div>
                <h2 className="text-white text-2xl md:text-4xl font-bold leading-tight mb-4 text-left transition-all duration-200 hover:scale-1.05 transition: { duration: 0.3 }">
                  {lang === "KOR" ? (
                    <>
                      끊임없는 연구개발과 스마트 공정
                      <br />
                      혁신을 통해{" "}
                      <span
                        className="bg-gradient-to-r from-[#45B8E8] to-[#7EE3F6] bg-clip-text text-transparent"
                        style={{ WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
                      >
                        제조 효율의 새로운
                      </span>
                      <br />
                      <span className="text-[#45B8E8] font-bold">기준을 만들어 갑니다</span>
                    </>
                  ) : (
                    <>
                      Continuous R&D and smart process
                      <br />
                      Creating new standards for{" "}
                      <span
                        className="bg-gradient-to-r from-[#45B8E8] to-[#7EE3F6] bg-clip-text text-transparent"
                        style={{ WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
                      >
                        manufacturing efficiency
                      </span>
                      <br />
                      <span className="text-[#45B8E8] font-bold">We set new standards</span>
                    </>
                  )}
                </h2>
              </motion.div>
            </motion.div>

            {/* RIGHT COLUMN */}
            <motion.div
              whileHover={{ scale: 1.04, transition: { duration: 0.3 } }}
              className="lg:col-span-7 flex flex-col items-center justify-center w-full transition-all duration-300"
            >
              <div className="relative w-full" style={{ aspectRatio: "1210/768" }}>
                <Image
                  src={lang === "KOR" ? "/images/company/vision/IO_kor.png" : "/images/company/vision/IO_eng.png"}
                  alt="Biz Model Pyramid"
                  className="w-full h-full object-contain"
                  style={{ width: "110%", height: "110%" }}
                />
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
