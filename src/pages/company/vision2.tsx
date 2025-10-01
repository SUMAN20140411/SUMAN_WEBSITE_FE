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
        <b>매출 600억</b>
        <span className="text-sky-400 font-bold">·순이익 150억 달성,</span><br />
        <span className="text-sky-400 font-bold">‘확신(Confidence)’</span>
        <span className="text-sky-400 font-bold">의 종합 솔루션 서비스 기업으로 성장</span>
      </>
    : <>
        2024 <b>Leap Year</b>—Within 5 Years<br />
        <b>Revenue 60B KRW</b>
        <span className="text-sky-400 font-bold">·Net Profit 15B Achieved,</span><br />
        <span className="text-sky-400 font-bold">‘Confidence’</span>
        <span className="text-sky-400 font-bold">-based Total Solution Service Company Growth</span>
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
            <BreadcrumbSection path={lang === "KOR" ? "회사소개 > 기업 비전" : "Company > Vision"} />
          </div>
        </div>
        {/* Vision Section */}
        <section className="w-full flex flex-col lg:flex-row items-center justify-center py-20 px-2 md:px-0 bg-gradient-to-br from-[#e3f4fb] via-white to-[#7fd3f4]">
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
                  <span className="tracking-[0.3em] text-white text-lg md:text-xl font-semibold">TARGET</span>
                </div>
                {/* Arrow above timeline */}
                <div className="flex justify-center w-full relative mb-2">
                  <svg width="100%" height="30" className="block absolute left-0 right-0 mx-auto -top-7 z-10" style={{maxWidth: '100%'}}>
                    <polygon points="50%,0 47%,18 53%,18" fill="#38bdf8" />
                  </svg>
                  <div className="flex justify-between w-full mx-auto max-w-[700px]">
                    {/* 3 gradiasi garis sepanjang container */}
                    {timelineColors.map((color, idx) => (
                      <div
                        key={color}
                        className="flex-1 h-5 rounded-full mx-1"
                        style={{
                          background: idx === 0
                            ? "linear-gradient(90deg,#17416d 60%,#38bdf8 100%)"
                            : idx === 1
                            ? "linear-gradient(90deg,#38bdf8 60%,#b3e0f7 100%)"
                            : "linear-gradient(90deg,#b3e0f7 60%,#e3f4fb 100%)"
                        }}
                      />
                    ))}
                  </div>
                </div>
                {/* Years & Descriptions */}
                <div className="flex justify-between w-full mx-auto max-w-[700px] mt-2">
                  {milestones.map((item, idx) => (
                    <div key={item.year} className="flex flex-col items-center flex-1">
                      <div className="text-xl md:text-2xl font-bold text-slate-900 mb-1 text-center">{item.year}</div>
                      <div className="text-xs md:text-sm text-slate-700 text-center whitespace-pre-line">
                        {item.text}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* RIGHT: Quadrant Circle */}
            <div className="flex items-center justify-center w-full lg:w-[520px] h-[520px]">
              <svg
                viewBox="0 0 520 520"
                width="100%"
                height="100%"
                className="max-w-[520px] max-h-[520px]"
              >
                {/* Gradient for whole circle */}
                <defs>
                  <radialGradient id="quadGradBigAll" cx="50%" cy="50%" r="70%">
                    <stop offset="0%" stopColor="#e3f4fb" />
                    <stop offset="60%" stopColor="#38bdf8" />
                    <stop offset="100%" stopColor="#009fe3" />
                  </radialGradient>
                  <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#fff" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#fff" stopOpacity="0.2" />
                  </linearGradient>
                </defs>
                {/* Full circle with gradient */}
                <circle cx="260" cy="260" r="220" fill="url(#quadGradBigAll)" />
                {/* Cross lines gradiasi */}
                <line x1="260" y1="40" x2="260" y2="480" stroke="url(#lineGrad)" strokeWidth="3"/>
                <line x1="40" y1="260" x2="480" y2="260" stroke="url(#lineGrad)" strokeWidth="3"/>
                {/* Texts (smaller font) */}
                <text x="130" y="160" textAnchor="middle" fontSize="20" fill="#fff" fontWeight="500">
                  {quadrants[0].label}
                  <tspan x="130" dy="1.2em" fontSize="13">{`(${quadrants[0].en})`}</tspan>
                </text>
                <text x="390" y="160" textAnchor="middle" fontSize="20" fill="#fff" fontWeight="500">
                  {quadrants[1].label}
                  <tspan x="390" dy="1.2em" fontSize="13">{`(${quadrants[1].en})`}</tspan>
                </text>
                <text x="130" y="370" textAnchor="middle" fontSize="20" fill="#fff" fontWeight="500">
                  {quadrants[2].label}
                  <tspan x="130" dy="1.2em" fontSize="13">{`(${quadrants[2].en})`}</tspan>
                </text>
                <text x="390" y="370" textAnchor="middle" fontSize="20" fill="#fff" fontWeight="500">
                  {quadrants[3].label}
                  <tspan x="390" dy="1.2em" fontSize="13">{`(${quadrants[3].en})`}</tspan>
                </text>
              </svg>
            </div>
          </div>
        </section>
        
        {/* Vision Section */}
        <section className="w-full flex flex-col lg:flex-row items-center justify-center py-20 px-2 md:px-0">
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
                  <span className="tracking-[0.3em] text-white text-lg md:text-xl font-semibold">TARGET</span>
                </div>
                {/* Arrow above timeline */}
                <div className="flex justify-center w-full relative mb-2">
                  <svg width="340" height="30" className="block absolute left-1/2 -translate-x-1/2 -top-7 z-10">
                    <polygon points="170,0 160,18 180,18" fill="#38bdf8" />
                  </svg>
                  <div className="flex justify-between w-[340px] mx-auto">
                    {/* 3 gradiasi garis */}
                    <div className="w-24 h-5 rounded-full"
                      style={{
                        background: "linear-gradient(90deg,#17416d 60%,#38bdf8 100%)"
                      }}
                    />
                    <div className="w-24 h-5 rounded-full"
                      style={{
                        background: "linear-gradient(90deg,#38bdf8 60%,#b3e0f7 100%)"
                      }}
                    />
                    <div className="w-24 h-5 rounded-full"
                      style={{
                        background: "linear-gradient(90deg,#b3e0f7 60%,#e3f4fb 100%)"
                      }}
                    />
                  </div>
                </div>
                {/* Years & Descriptions */}
                <div className="flex justify-between w-[340px] mx-auto mt-2">
                  {timeline.map((item, idx) => (
                    <div key={item.year} className="flex flex-col items-center w-[100px]">
                      <div className="text-xl md:text-2xl font-bold text-slate-900 mb-1 text-center">{item.year}</div>
                      <div className="text-xs md:text-sm text-slate-700 text-center whitespace-pre-line">
                        {item.text}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* RIGHT: Quadrant Circle */}
            <div className="flex items-center justify-center w-full lg:w-[520px] h-[520px]">
              <svg
                viewBox="0 0 520 520"
                width="100%"
                height="100%"
                className="max-w-[520px] max-h-[520px]"
              >
                {/* Gradient */}
                <defs>
                  <radialGradient id="quadGradBig" cx="50%" cy="50%" r="70%">
                    <stop offset="0%" stopColor="#e3f4fb" />
                    <stop offset="60%" stopColor="#38bdf8" />
                    <stop offset="100%" stopColor="#009fe3" />
                  </radialGradient>
                  <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#fff" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#fff" stopOpacity="0.2" />
                  </linearGradient>
                </defs>
                {/* Four Quadrants */}
                <path d="M260,260 L260,40 A220,220 0 0,1 480,260 Z" fill="url(#quadGradBig)" />
                <path d="M260,260 L480,260 A220,220 0 0,1 260,480 Z" fill="url(#quadGradBig)" />
                <path d="M260,260 L260,480 A220,220 0 0,1 40,260 Z" fill="url(#quadGradBig)" />
                <path d="M260,260 L40,260 A220,220 0 0,1 260,40 Z" fill="url(#quadGradBig)" />
                {/* Cross lines gradiasi */}
                <line x1="260" y1="40" x2="260" y2="480" stroke="url(#lineGrad)" strokeWidth="3"/>
                <line x1="40" y1="260" x2="480" y2="260" stroke="url(#lineGrad)" strokeWidth="3"/>
                {/* Texts (smaller font) */}
                <text x="130" y="160" textAnchor="middle" fontSize="20" fill="#fff" fontWeight="500">
                  {quadrants[0].label}
                  <tspan x="130" dy="1.2em" fontSize="13">{`(${quadrants[0].en})`}</tspan>
                </text>
                <text x="390" y="160" textAnchor="middle" fontSize="20" fill="#fff" fontWeight="500">
                  {quadrants[1].label}
                  <tspan x="390" dy="1.2em" fontSize="13">{`(${quadrants[1].en})`}</tspan>
                </text>
                <text x="130" y="370" textAnchor="middle" fontSize="20" fill="#fff" fontWeight="500">
                  {quadrants[2].label}
                  <tspan x="130" dy="1.2em" fontSize="13">{`(${quadrants[2].en})`}</tspan>
                </text>
                <text x="390" y="370" textAnchor="middle" fontSize="20" fill="#fff" fontWeight="500">
                  {quadrants[3].label}
                  <tspan x="390" dy="1.2em" fontSize="13">{`(${quadrants[3].en})`}</tspan>
                </text>
              </svg>
            </div>
          </div>
        </section>
        

        {/* Vision Modern Section (diagram + values) */}
        <section className="w-full flex flex-col lg:flex-row items-center justify-between py-16 px-4 md:px-12 gap-10">
          {/* Left: Title & Timeline */}
          <div className="flex-1 flex flex-col justify-center items-start w-full max-w-2xl">
            <h2 className="text-lg md:text-xl font-semibold text-slate-700 mb-2">
              {lang === "KOR" ? "Our Vision" : "Our Vision"}
            </h2>
            <div className="mb-8">
              <div className="text-2xl md:text-4xl font-bold leading-tight mb-2 text-slate-900">
                {lang === "KOR" ? (
                  <>
                    2024 <span className="font-extrabold">도약의 원년</span>—5년 내<br />
                    <span className="font-extrabold">매출 600억</span>
                    <span className="text-sky-400 font-extrabold">·순이익 150억 달성</span>,<br />
                    <span className="text-sky-400 font-extrabold">‘확신(Confidence)’</span>
                    <span className="text-sky-400 font-extrabold">의 종합 솔루션 서비스 기업으로 성장.</span>
                  </>
                ) : (
                  <>
                    2024 <span className="font-extrabold">Leap Year</span>—Within 5 Years<br />
                    <span className="font-extrabold">Revenue 60B KRW</span>
                    <span className="text-sky-400 font-extrabold">·Net Profit 15B Achieved</span>,<br />
                    <span className="text-sky-400 font-extrabold">‘Confidence’</span>
                    <span className="text-sky-400 font-extrabold">-based Total Solution Service Company Growth.</span>
                  </>
                )}
              </div>
            </div>
            {/* Timeline */}
            <div className="w-full mb-8">
              <div className="flex items-center w-full mb-2">
                <div className="flex-1 flex items-center">
                  {milestones.map((m, idx) => (
                    <div key={m.year} className="flex-1 flex flex-col items-center">
                      <div className="w-full h-4 flex items-center">
                        <div
                          className="rounded-full"
                          style={{
                            background: timelineColors[idx % timelineColors.length],
                            height: "100%",
                            width: "100%",
                            marginRight: idx < milestones.length - 1 ? 8 : 0,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                {/* Arrow */}
                <svg width="32" height="16" className="ml-2">
                  <line x1="0" y1="8" x2="28" y2="8" stroke="#cbd5e1" strokeWidth="3" />
                  <polygon points="28,4 32,8 28,12" fill="#cbd5e1" />
                </svg>
              </div>
              <div className="flex items-start w-full">
                {milestones.map((m, idx) => (
                  <div key={m.year} className="flex-1 flex flex-col items-center">
                    <div className="text-xl md:text-2xl font-bold text-slate-900 mb-1">{m.year}</div>
                    <div className="text-sm md:text-base text-gray-500 text-center whitespace-pre-line">
                      {m.text}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Right: Circles */}
          <div className="flex-shrink-0 grid grid-cols-2 gap-8">
            {coreValues.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5 + idx * 0.1, ease: [0.42, 0, 0.58, 1] }}
                className="flex flex-col items-center justify-center w-40 h-40 md:w-56 md:h-56 rounded-full bg-[#e3f0fb]"
              >
                <div className="flex items-center justify-center w-32 h-32 md:w-44 md:h-44 rounded-full bg-[#17416d]">
                  <span className="text-white text-lg md:text-2xl font-semibold text-center leading-tight">
                    {item.title}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Timeline Diagram for Milestones */}
        <section className="py-16 px-4 md:px-8 bg-white">
          <div className="max-w-5xl mx-auto">
            <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-8 text-center">
              {lang === "KOR" ? "단계별 성장 로드맵" : "Staged Growth Roadmap"}
            </h3>

            <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
              {milestones.map((item, idx) => (
                <div key={item.year} className="flex flex-col items-center w-full">
                  <div className="relative">
                    <div className="flex items-center justify-center h-14 w-14 rounded-full bg-sky-500/10 text-sky-600 border-2 border-sky-300 shadow-lg">
                      <span className="text-xl font-bold">{item.year}</span>
                    </div>

                    {idx < milestones.length - 1 && (
                      <div className="absolute left-1/2 top-full w-1 h-12 md:w-12 md:h-1 bg-sky-300" />
                    )}
                  </div>

                  <div className="mt-4 text-center">
                    <p className="text-sm text-slate-700 whitespace-pre-line">
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Strategy Section with Diagram */}
        <section className="relative py-16 px-4 md:px-8 bg-gradient-to-br from-sky-50 via-white to-slate-100">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: [0.42, 0, 0.58, 1] }}
              className="space-y-6"
            >
              <span className="text-sm font-semibold uppercase tracking-widest text-sky-600">
                {strategy.subtitle}
              </span>

              <h2 className="text-3xl md:text-4xl font-bold">{strategy.title}</h2>

              <div className="rounded-2xl border border-sky-100 bg-white p-6 shadow">
                <p className="text-sm font-semibold uppercase tracking-widest text-sky-500">
                  {strategy.neoTitle}
                </p>

                <ul className="mt-4 space-y-2 text-base md:text-lg leading-relaxed text-slate-700">
                  {strategy.strategicPoints.map((point, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="inline-block h-2 w-2 rounded-full bg-sky-400" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="rounded-2xl overflow-hidden shadow-lg border-4 border-sky-100 bg-white"
            >
              <Image
                src={images[2]}
                alt="Process Flow"
                width={600}
                height={400}
                className="object-contain w-full h-full"
              />
            </motion.div>
          </div>
        </section>

        {/* KPI Cards */}
        <section className="py-10 px-4 md:px-8 bg-white">
          <div className="max-w-4xl mx-auto grid gap-8 md:grid-cols-2">
            {[
              {
                icon: Target,
                value: lang === "KOR" ? "600억원" : "60B KRW",
                label: lang === "KOR" ? "목표 매출액" : "Target Revenue",
              },
              {
                icon: LineChart,
                value: lang === "KOR" ? "150억원" : "15B KRW",
                label: lang === "KOR" ? "목표 순이익" : "Target Net Profit",
              },
            ].map((card, idx) => {
              const Icon = card.icon;

              return (
                <motion.div
                  key={card.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  className="flex flex-col items-center gap-4 rounded-2xl border border-sky-100 bg-white p-6 shadow"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-sky-500/10 text-sky-600 mb-2">
                    <Icon className="h-7 w-7" />
                  </div>

                  <span className="text-3xl font-extrabold">{card.value}</span>
                  <p className="text-sm text-slate-500">{card.label}</p>
                </motion.div>
              );
            })}
          </div>
        </section>
        <section className="py-16 px-4 md:px-8">
  <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 items-center">
    {/* LEFT: Diagram */}
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: [0.42, 0, 0.58, 1] }}
      className="flex-shrink-0 flex flex-col items-center"
      style={{ minWidth: 340 }}
    >
      {/* Main Cylinder */}
      <div className="relative flex flex-col items-center">
        {/* Top oval */}
        <div className="absolute left-1/2 -translate-x-1/2 -top-8 z-10">
          <div className="bg-gradient-to-br from-green-400 to-green-600 rounded-full px-8 py-3 shadow-lg border-4 border-white text-center">
            <span className="text-2xl font-extrabold text-white drop-shadow-lg tracking-wide">NEO ’24</span>
            <br />
            <span className="text-xl font-bold text-white drop-shadow-lg">5<sup>th</sup> 6015</span>
          </div>
        </div>
        {/* Cylinder */}
        <div className="w-[220px] h-[160px] bg-gradient-to-b from-gray-300 via-gray-100 to-gray-400 rounded-full shadow-lg border-2 border-gray-400 relative flex items-end justify-center overflow-visible">
          {/* Top surface */}
          <div className="absolute left-1/2 -translate-x-1/2 -top-8 w-[220px] h-[50px] bg-gradient-to-r from-orange-400 to-orange-600 rounded-full z-0 opacity-80"></div>
        </div>
        {/* Bottom arc with values */}
        <div className="relative w-[340px] h-[90px] mt-[-30px] flex items-center justify-between">
          {/* Arc background */}
          <svg width="340" height="90" viewBox="0 0 340 90" className="absolute left-0 top-0 z-0">
            <path
              d="M10,80 Q170,-30 330,80"
              fill="none"
              stroke="#1e293b"
              strokeWidth="30"
              opacity="0.25"
            />
          </svg>
          {/* Value circles */}
          {[
            { label: "즐겁게", en: "Enjoy", color: "bg-sky-700", accent: "text-red-500", x: 30 },
            { label: "새롭게", en: "Neo", color: "bg-sky-400", accent: "text-red-500", x: 110 },
            { label: "치열하게", en: "Intensely", color: "bg-gray-700", accent: "text-red-500", x: 200 },
            { label: "빠르게", en: "Fastly", color: "bg-orange-400", accent: "text-red-500", x: 280 },
          ].map((item, idx) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 + idx * 0.1, ease: [0.42, 0, 0.58, 1] }}
              className={`absolute z-10 flex flex-col items-center justify-center w-24 h-24 rounded-full shadow-lg ${item.color} text-white font-bold text-lg`}
              style={{ left: item.x, top: 10 }}
            >
              <span className="leading-tight">{item.label}</span>
              <span className={`text-base font-normal mt-1 ${item.accent}`}>({item.en})</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>

    {/* RIGHT: Title & Cards */}
    <div className="flex-1 flex flex-col items-start">
      {/* Big Title */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.42, 0, 0.58, 1] }}
        className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 leading-tight drop-shadow-lg"
        style={{ letterSpacing: '0.02em' }}
      >
        새롭게 도약하고 성장하는 원년 2024년<br />
        5년후 매출액 600억원, 순이익 150억을 달성하는<br />
        <span className="text-sky-600">“확신(Confidence)”</span>의 <span className="text-blue-700">“종합 솔루션 서비스 회사”</span>로 성장
      </motion.h2>
      {/* Cards */}
      <div className="flex flex-col gap-4 w-full mt-2">
        {[
          "2nd시험센터/반도체정밀가공진입(‘24)",
          "2nd전지모듈/장비, 모빌리티 진입(‘26)",
          "매출 600억/순이익 150억 달성(’28)",
        ].map((text, idx) => (
          <motion.div
            key={text}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 + idx * 0.1, ease: [0.42, 0, 0.58, 1] }}
            className="rounded-xl bg-white shadow border border-sky-100 px-6 py-4 text-lg font-semibold text-slate-700"
          >
            {text}
          </motion.div>
        ))}
      </div>
    </div>
  </div>
</section>
        <section className="py-16 px-4 md:px-8 bg-gradient-to-br from-sky-50 via-white to-slate-100">
          <div className="max-w-5xl mx-auto">
            {/* Diagram utama */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={{
                hidden: { opacity: 0, scale: 0.95 },
                visible: {
                  opacity: 1,
                  scale: 1,
                  transition: { duration: 0.8, ease: [0.42, 0, 0.58, 1] },
                },
              }}
              className="flex flex-col items-center mb-12"
            >
              <div className="flex flex-col items-center">
                <div className="rounded-full bg-green-400 px-8 py-2 text-white font-bold text-2xl shadow mb-2">
                  NEO &apos;24 5th 6015
                </div>

                <div className="bg-white/80 rounded-xl shadow p-6 text-center max-w-xl">
                  <h2 className="font-bold text-lg md:text-xl mb-2 text-slate-900">
                    {lang === "KOR"
                      ? "새롭게 도약하고 성장하는 원년 2024년\n5년후 매출액 600억원, 순이익 150억 달성하는\n“확신(Confidence)”의 “종합 솔루션 서비스 회사”로 성장"
                      : "Leap and grow in 2024\nAchieve 60B KRW revenue & 15B KRW profit in 5 years\nGrow as a 'Confidence' Total Solution Service Company"}
                  </h2>

                  <ul className="mt-4 text-slate-700 text-sm text-left space-y-2">
                    <li>• 2nd 시험센터/반도체정밀가공 진입(&apos;24)</li>
                    <li>• 2nd 전지모듈/장비, 모빌리티 진입(&apos;26)</li>
                    <li>• 매출 600억/순이익 150억 달성(&apos;28)</li>
                  </ul>
                </div>
              </div>

              {/* Diagram value */}
              <div className="flex flex-wrap justify-center gap-6 mt-10">
                {[
                  { label: lang === "KOR" ? "즐겁게" : "Enjoy", color: "bg-sky-400", en: "Enjoy" },
                  { label: lang === "KOR" ? "새롭게" : "Neo", color: "bg-blue-500", en: "Neo" },
                  { label: lang === "KOR" ? "치열하게" : "Intensely", color: "bg-gray-700", en: "Intensely" },
                  { label: lang === "KOR" ? "빠르게" : "Fastly", color: "bg-orange-400", en: "Fastly" },
                ].map((item, idx) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5 + idx * 0.1,
                      ease: [0.42, 0, 0.58, 1],
                    }}
                    className={`flex flex-col items-center justify-center w-36 h-36 rounded-full shadow-lg ${item.color} text-white font-bold text-lg`}
                  >
                    <span>{item.label}</span>
                    <span className="text-base font-normal mt-1">({item.en})</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Core Values */}
            <h3 className="text-2xl md:text-3xl font-semibold text-slate-900 mb-8 text-center">
              {lang === "KOR" ? "핵심 가치" : "Core Values"}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {coreValues.map((cv, idx) => {
                const icons = [Users, Lightbulb, Layers, FlaskConical];
                const Icon = icons[idx % icons.length];

                return (
                  <motion.div
                    key={cv.title}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 + idx * 0.1, ease: [0.42, 0, 0.58, 1] }}
                    className="rounded-2xl border border-sky-100 bg-white p-6 shadow flex flex-col items-center"
                  >
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-sky-500/10 text-sky-600 mb-3">
                      <Icon className="h-7 w-7" />
                    </div>

                    <h4 className="text-lg font-semibold text-center text-slate-900">
                      {cv.title}
                    </h4>

                    <p className="text-sm text-slate-600 text-center whitespace-pre-line mt-2">
                      {cv.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* R&D Vision with Image */}
        <section className="py-16 px-4 md:px-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
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
              <Image
                src={images[3]}
                alt="R&D Vision"
                width={600}
                height={400}
                className="object-cover w-full h-full"
              />

              <div className="p-6">
                <p className="text-sm font-semibold uppercase tracking-widest text-sky-200">
                  {rnd.rightBoxTop}
                </p>

                <h4 className="text-2xl md:text-3xl font-bold text-white mt-2">
                  {rnd.rightBoxTitle}
                </h4>

                <p className="text-sm md:text-base whitespace-pre-line text-slate-100 leading-relaxed mt-2">
                  {rnd.rightBoxDesc}
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
