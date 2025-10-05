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
                {/* Center Text */}
                <text
                  x="260"
                  y="250"
                  textAnchor="middle"
                  fontSize="48"
                  fontFamily="'Comic Sans MS', 'Comic Sans', cursive"
                  fontWeight="bold"
                  fill="#17416d"
                  style={{ letterSpacing: "2px" }}
                >
                  NEO &#39;24
                </text>
                <text
                  x="260"
                  y="295"
                  textAnchor="middle"
                  fontSize="40"
                  fontFamily="'Comic Sans MS', 'Comic Sans', cursive"
                  fontWeight="bold"
                  fill="#17416d"
                  style={{ letterSpacing: "2px" }}
                >
                  5th 6015
                </text>
                {/* Top Left */}
                <text x="120" y="140" textAnchor="middle" fontSize="28" fontWeight="600" fill="#fff">
                  즐겁게
                  <tspan x="120" dy="1.2em" fontSize="18" fontWeight="400">(Enjoy)</tspan>
                </text>
                {/* Top Right */}
                <text x="400" y="140" textAnchor="middle" fontSize="28" fontWeight="600" fill="#fff">
                  새롭게
                  <tspan x="400" dy="1.2em" fontSize="18" fontWeight="400">(Neo)</tspan>
                </text>
                {/* Bottom Left */}
                <text x="120" y="400" textAnchor="middle" fontSize="28" fontWeight="600" fill="#fff">
                  치열하게
                  <tspan x="120" dy="1.2em" fontSize="18" fontWeight="400">(Intensely)</tspan>
                </text>
                {/* Bottom Right */}
                <text x="400" y="400" textAnchor="middle" fontSize="28" fontWeight="600" fill="#fff">
                  빠르게
                  <tspan x="400" dy="1.2em" fontSize="18" fontWeight="400">(Fastly)</tspan>
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
        {/* R&D Vision with Image - Pyramid Biz Model */}
        <section className="py-16 px-4 md:px-8 bg-gradient-to-br from-[#17416d] via-[#17416d] to-[#38bdf8] text-white">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12 items-center">
            {/* LEFT: Text */}
            <div className="flex-1 flex flex-col justify-center">
              <motion.h2
                initial={{ opacity: 0, x: -32 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.7, ease: [0.42, 0, 0.58, 1] }}
                className="text-2xl md:text-3xl font-semibold text-white mb-6"
              >
                Biz Model
              </motion.h2>
              <motion.h3
                initial={{ opacity: 0, x: -32 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.7, ease: [0.42, 0, 0.58, 1] }}
                className="text-3xl md:text-4xl font-bold leading-tight whitespace-pre-line text-white mb-6"
              >
                {rnd.subtitle}
              </motion.h3>
              <motion.div
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.8, ease: [0.42, 0, 0.58, 1] }}
                className="mt-8"
              >
                <span className="text-sky-300 font-bold text-xl md:text-2xl">
                  제조 효율의 새로운 기준을 만들어 갑니다
                </span>
              </motion.div>
            </div>
            {/* RIGHT: Pyramid SVG */}
            <div className="flex-1 flex justify-center items-center">
              <svg viewBox="0 0 500 500" width="400" height="400" className="max-w-full">
                {/* Pyramid shapes */}
                <polygon points="250,40 470,460 30,460" fill="#f8fafc" stroke="#e5e7eb" strokeWidth="2" />
                <polygon points="250,40 390,460 110,460" fill="#e0f2fe" stroke="#e5e7eb" strokeWidth="2" />
                <polygon points="250,40 320,460 180,460" fill="#38bdf8" stroke="#e5e7eb" strokeWidth="2" />
                <polygon points="250,40 250,460 250,460" fill="#17416d" />
                {/* Circles & icons */}
                <circle cx="250" cy="410" r="32" fill="#002b5c" />
                <circle cx="320" cy="320" r="28" fill="#38bdf8" />
                <circle cx="180" cy="320" r="28" fill="#bae6fd" />
                {/* Lightbulb icon */}
                <text x="250" y="418" textAnchor="middle" fontSize="28" fill="#fff" fontFamily="Arial">&#x1F4A1;</text>
                {/* Magnifier icon */}
                <text x="320" y="328" textAnchor="middle" fontSize="24" fill="#fff" fontFamily="Arial">&#x1F50D;</text>
                {/* User icon */}
                <text x="180" y="328" textAnchor="middle" fontSize="24" fill="#17416d" fontFamily="Arial">&#x1F464;</text>
                {/* Pyramid numbers */}
                <text x="370" y="200" textAnchor="middle" fontSize="32" fill="#bae6fd" fontWeight="bold">01</text>
                <text x="330" y="320" textAnchor="middle" fontSize="32" fill="#38bdf8" fontWeight="bold">02</text>
                <text x="250" y="440" textAnchor="middle" fontSize="32" fill="#002b5c" fontWeight="bold">03</text>
              </svg>
              {/* Pyramid right text */}
              <div className="flex flex-col gap-8 ml-8">
                <div>
                  <div className="text-sky-100 text-lg font-semibold mb-1">R&BD 조기사업화 · 차세대 성장동력 확보</div>
                  <div className="text-sky-100 text-sm">단계별 ITEM Launching·사업화</div>
                </div>
                <div>
                  <div className="text-sky-100 text-lg font-semibold mb-1">신사업Biz · R&D</div>
                  <div className="text-sky-100 text-sm">신사업 발굴<br />TEM PJT 化<br />R&BD Base<br />차별화</div>
                </div>
                <div>
                  <div className="text-sky-100 text-lg font-semibold mb-1">제조본부 · 개발본부</div>
                  <div className="text-sky-100 text-sm">ITEM 조기 정착<br />Mass Product 안정화</div>
                </div>
                <div className="text-sky-300 text-lg font-bold mt-4">OPEN INNOVATION</div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}