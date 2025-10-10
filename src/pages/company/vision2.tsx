"use client";

import React, { useState, useEffect } from "react";
import Head from "next/head";
import Layout from "@/components/Layout";
import HeroSection from "@/components/HeroSection";
import BreadcrumbSection from "@/components/BreadcrumbSection";
import { motion } from "framer-motion";
import type { Variants, Transition } from "framer-motion";
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
import type { LucideIcon } from "lucide-react";
import {
  ClipboardList,
  Cpu,
  Factory,
  FlaskConical,
  Globe2,
  Handshake,
  Leaf,
  Lightbulb,
  LineChart,
  Sparkles,
  Target,
  Users,
  Layers,
} from "lucide-react";

const HERO_TRIM_PX = 38;

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerChildren: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

const zoomIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const floatTransition: Transition = {
  duration: 12,
  repeat: Infinity,
  repeatType: "mirror",
  ease: "easeInOut",
};

type AnimatedCounterProps = {
  end: number;
  duration?: number;
  suffix?: string;
};

type HighlightCard = {
  icon: LucideIcon;
  title: string;
  desc: string;
};

type KpiCard = {
  icon: LucideIcon;
  value: number;
  suffix: string;
  label: string;
};

const AnimatedCounter = ({ end, duration = 2, suffix = "" }: AnimatedCounterProps) => {
  const [count, setCount] = useState(0);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    if (!seen) return;
    let startTs = 0;
    const step = (timestamp: number) => {
      if (!startTs) startTs = timestamp;
      const progress = Math.min((timestamp - startTs) / (duration * 1000), 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [seen, end, duration]);

  return (
    <motion.span
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onViewportEnter={() => setSeen(true)}
      className="inline-flex items-baseline gap-2"
    >
      <span className="text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900">
        {count}
      </span>
      {suffix ? (
        <span className="text-lg md:text-xl font-semibold text-slate-500">{suffix}</span>
      ) : null}
    </motion.span>
  );
};

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.42, 0, 0.58, 1] },
  },
};

const stagger = {
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

export default function Vision2Page() {
  const lang = useLangStore((s) => s.lang);
  const hero = visionHeroText[lang];
  const overview = visionMainText[lang];
  const strategy = visionStrategyText[lang];
  const coreValues = visionCoreValue[lang];
  const milestones = visionMilestones[lang];
  const rnd = visionRndText[lang];

  const highlightCards: HighlightCard[] =
    lang === "KOR"
      ? [
          {
            icon: Globe2,
            title: "글로벌 기술 확장",
            desc: "핵심 역량을 기반으로 글로벌 솔루션 네트워크를 구축합니다.",
          },
          {
            icon: Handshake,
            title: "파트너십 강화",
            desc: "산학연 협업으로 혁신적인 비즈니스 기회를 발굴합니다.",
          },
          {
            icon: Cpu,
            title: "스마트 제조 혁신",
            desc: "스마트 공정과 데이터 기반 운영으로 생산성을 높입니다.",
          },
          {
            icon: Leaf,
            title: "지속 가능한 가치",
            desc: "ESG와 품질 중심 경영으로 장기적인 신뢰를 만들어갑니다.",
          },
        ]
      : [
          {
            icon: Globe2,
            title: "Global Technology Reach",
            desc: "Build a worldwide solution network anchored in our core capabilities.",
          },
          {
            icon: Handshake,
            title: "Stronger Partnerships",
            desc: "Create innovative business opportunities through strategic collaborations.",
          },
          {
            icon: Cpu,
            title: "Smart Manufacturing",
            desc: "Boost productivity with smart processes and data-driven operations.",
          },
          {
            icon: Leaf,
            title: "Sustainable Value",
            desc: "Deliver long-term trust with ESG- and quality-focused management.",
          },
        ];

  const kpiCards: KpiCard[] =
    lang === "KOR"
      ? [
          { icon: Target, value: 600, suffix: "억원", label: "목표 매출액" },
          { icon: LineChart, value: 150, suffix: "억원", label: "목표 순이익" },
        ]
      : [
          { icon: Target, value: 600, suffix: "B KRW", label: "Target Revenue" },
          { icon: LineChart, value: 150, suffix: "B KRW", label: "Target Net Profit" },
        ];

  const images = [
    "/images/company/vision_banner.jpg",
    "/images/business/process/coreKor2.png",
    "/images/business/process/FLOWKOREA.png",
    "/images/company/vision_factory.jpg",
  ];

  const visionTitle =
    lang === "KOR" ? (
      <>
        <b>도약과 성장의 원년 2024년 —</b>
        <br />
        <b>5년 후 매출 600억 순이익 150억 달성,</b>
        <br />
        <span className="text-sky-400 font-bold">‘확신(Confidence)’의</span>
        <br />
        <span className="text-sky-400 font-bold"> 종합 솔루션 서비스 기업으로 성장</span>
      </>
    ) : (
      <>
        <b>2024, The First Year of Leap and Growth —</b>
        <br />
        <b>Achieve 60 Billion Revenue & 15 Billion Net Profit in 5 Years,</b>
        <br />
        <span className="text-sky-400 font-bold">A ‘Confidence’-based</span>
        <br />
        <span className="text-sky-400 font-bold"> Total Solution Service Company</span>
      </>
    );

  const C = {
    bgNavy: "#0A1633",
    panelWhite: "#F5F7FA",
    panelShade: "#E7EBF2",
    deepBlue: "#00215C",
    midBlue: "#0D70C0",
    lightBlue: "#CFE8FF",
    white: "#FFFFFF",
  };

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

        {/* Vision + Core Values Section */}
        <section className="w-full flex flex-col items-center justify-center py-20 px-2 md:px-0 bg-white">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: [0.42, 0, 0.58, 1] }}
            className="flex flex-col lg:flex-row items-center justify-center gap-0 w-full max-w-[1400px] mx-auto"
          >
            {/* LEFT */}
            <div className="flex flex-col items-center justify-center w-full lg:w-[700px]">
              <motion.h2
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.7 }}
                className="text-2xl md:text-3xl font-bold text-slate-700 mb-6 text-left w-full"
              >
                {lang === "KOR" ? "Our Vision" : "Our Vision"}
              </motion.h2>

              <div className="mb-10 text-left w-full">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.7 }}
                  className="text-2xl md:text-4xl font-bold leading-tight mb-4 text-slate-900"
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
                  className="w-full text-center mb-2"
                >
                  <span className="tracking-[0.3em] text-slate-500 text-lg md:text-xl font-light">TARGET</span>
                </motion.div>

                {/* Arrow above timeline */}
                <div className="flex justify-center w-full relative mb-2">
                  <svg
                    width="100%"
                    height="30"
                    className="block absolute left-0 right-0 mx-auto -top-7 z-10"
                    style={{ maxWidth: "100%" }}
                  >
                    <polygon points="50,0 47,18 53,18" fill="#38bdf8" />
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
                      <div className="text-xl md:text-2xl font-bold text-slate-900 mb-1 text-center">
                        {item.year}
                      </div>
                      <div className="text-xs md:text-sm text-slate-700 text-center whitespace-pre-line">
                        {item.text}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* RIGHT KPI Cards */}
            <motion.div
              variants={zoomIn}
              className="rounded-3xl border border-slate-200/70 bg-white/80 p-8 shadow-xl backdrop-blur"
            >
              <div className="space-y-6">
                {kpiCards.map((card) => {
                  const Icon = card.icon;
                  return (
                    <motion.div
                      key={card.label}
                      whileHover={{ y: -4 }}
                      className="flex items-center gap-5 rounded-2xl border border-slate-100 bg-slate-50/60 p-5 transition-transform"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-500/10 text-sky-600">
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <AnimatedCounter end={card.value} suffix={card.suffix} />
                        <p className="text-sm font-medium text-slate-500">{card.label}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>

          {/* Core Values Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: [0.42, 0, 0.58, 1] }}
            className="w-full max-w-[1200px] mx-auto mt-16"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-10 text-left tracking-tight">
              {lang === "KOR" ? "Core Values" : "Core Values"}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Flexible Organization */}
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
                  {lang === "KOR" ? (
                    <>
                      급변하는 시장에 유연하게 반응하며
                      <br />
                      끊임없이 혁신하는 조직입니다.
                    </>
                  ) : (
                    <>
                      We flexibly respond to rapidly changing markets
                      <br />
                      and continuously innovate as an organization.
                    </>
                  )}
                </div>
              </motion.div>

              {/* Professional Talent */}
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
                  {lang === "KOR" ? (
                    <>
                      각 분야 최고의 전문성을 갖춘
                      <br />
                      인력들이 모여
                      <br />
                      차별화된 가치를 제공합니다.
                    </>
                  ) : (
                    <>Top experts in each field<br />gather to provide differentiated value.</>
                  )}
                </div>
              </motion.div>

              {/* Technology Convergence */}
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
                  {lang === "KOR" ? (
                    <>
                      기술의 경계를 허물고 융합하여
                      <br />
                      미래를 선도하는
                      <br />
                      기술 혁신을 이루어갑니다
                    </>
                  ) : (
                    <>Breaking boundaries and converging technology<br />to lead the future with innovation.</>
                  )}
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
                  {lang === "KOR" ? (
                    <>
                      지속적인 R&D 투자를 통해
                      <br />
                      기술 혁신을 넘어 실질적인
                      <br />
                      비즈니스 성과를 창출합니다.
                    </>
                  ) : (
                    <>
                      Through continuous R&D investment,
                      <br />
                      we create real business outcomes
                      <br />
                      beyond technological innovation.
                    </>
                  )}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* R&D Section */}
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
                <div className="text-white text-[1.7rem] font-bold mb-6">
                  Biz Model
                </div>
                <h2 className="text-white text-2xl md:text-4xl font-bold leading-tight mb-4 text-left">
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
                  width={1210}
                  height={768}
                />
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
