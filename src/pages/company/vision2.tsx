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
                {/* Texts (font size +7%, center shift 20%) */}
                <text x="155" y="148" textAnchor="middle" fontSize="22.9" fill="#fff" fontWeight="600">
                  {quadrants[0].label}
                  <tspan x="155" dy="1.2em" fontSize="14.9">{`(${quadrants[0].en})`}</tspan>
                </text>
                <text x="365" y="148" textAnchor="middle" fontSize="22.9" fill="#fff" fontWeight="600">
                  {quadrants[1].label}
                  <tspan x="365" dy="1.2em" fontSize="14.9">{`(${quadrants[1].en})`}</tspan>
                </text>
                <text x="155" y="382" textAnchor="middle" fontSize="22.9" fill="#fff" fontWeight="600">
                  {quadrants[2].label}
                  <tspan x="155" dy="1.2em" fontSize="14.9">{`(${quadrants[2].en})`}</tspan>
                </text>
                <text x="365" y="382" textAnchor="middle" fontSize="22.9" fill="#fff" fontWeight="600">
                  {quadrants[3].label}
                  <tspan x="365" dy="1.2em" fontSize="14.9">{`(${quadrants[3].en})`}</tspan>
                </text>
              </svg>
            </div>
      
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
