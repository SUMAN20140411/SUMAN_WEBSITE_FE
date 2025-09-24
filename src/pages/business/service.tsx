"use client";

import React from "react";
import Head from "next/head";
import Image from "next/image";
import { motion, type Transition, cubicBezier } from "framer-motion";

import Layout from "@/components/Layout";
import HeroSection from "@/components/HeroSection";
import BreadcrumbSection from "@/components/BreadcrumbSection";
import { useLangStore } from "@/stores/langStore";
import { serviceContent } from "@/data/service";

// flow components (named exports)
import { FlowCard } from "@/components/FlowCard";
import { FlowDiamond } from "@/components/FlowDiamond";
import { FlowArrow } from "@/components/FlowArrow";

// data
import { processFlowContent } from "@/data/ProcessFlow";

/* =========================
   Process Flow (inlined)
   ========================= */
const ProcessFlowChart: React.FC = () => {
  const lang = useLangStore((state) => state.lang);
  const content = processFlowContent[lang];
  const steps = content.steps;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  };

  const stepVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring" as const, stiffness: 100, damping: 15, duration: 0.6 },
    },
  };

  // identify steps by id/title
  const isIncomingStep = (step: any) =>
    ["inspection", "incomingInspection", "incoming"].includes(step?.id) ||
    /수입검사/i.test(step?.title || "");

  const isManufacturingStep = (step: any) =>
    ["manufacturing"].includes(step?.id) || /가공\/?제작/i.test(step?.title || "");

  const isReorderStep = (step: any) =>
    ["reorder", "re-order"].includes(step?.id) || /re[-\s]?order/i.test(step?.title || "");

  return (
    <div className="w-full overflow-x-auto relative bg-[#020B24]">
      {/* Title Section */}
      <div className="text-center mb-12 pt-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
          PROCESS
        </h1>
        <p className="text-lg text-cyan-400 mb-6">
          Next-Generation Semiconductor Manufacturing Process
        </p>
        <div className="flex justify-center gap-6">
          <div className="bg-[#0A1836] px-4 py-2 rounded-lg border border-cyan-900/30">
            <span className="text-cyan-400">Throughput</span>
            <span className="text-cyan-400 font-bold ml-2">87%</span>
          </div>
          <div className="bg-[#0A1836] px-4 py-2 rounded-lg border border-emerald-900/30">
            <span className="text-emerald-400">Efficiency</span>
            <span className="text-emerald-400 font-bold ml-2">96%</span>
          </div>
          <div className="bg-[#0A1836] px-4 py-2 rounded-lg border border-purple-900/30">
            <span className="text-purple-400">Quality</span>
            <span className="text-purple-400 font-bold ml-2">99.19%</span>
          </div>
        </div>
      </div>

      {/* Flow Chart Content */}
      <motion.div
        className="min-w-[1800px] p-8 relative z-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Background Lines */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-0.5 bg-gradient-to-r from-transparent via-blue-900/30 to-transparent" />
        
        <div className="flex items-center gap-8 mb-16">
          {steps.map((step: any, index: number) => (
            <React.Fragment key={step.id ?? index}>
              <motion.div
                className="relative"
                variants={stepVariants}
                whileHover={{ scale: 1.02 }}
              >
                {step.type === "card" ? (
                  <div className="bg-white rounded-xl px-6 py-3 shadow-lg">
                    <p className="text-gray-900 font-medium text-sm">
                      {step.title}
                    </p>
                    {step.subtitle && (
                      <p className="text-gray-500 text-xs mt-1">
                        {step.subtitle}
                      </p>
                    )}
                  </div>
                ) : (
                  <>
                    <div className="rotate-45 bg-white p-5 rounded-lg shadow-lg">
                      <div className="-rotate-45">
                        <p className="text-gray-900 font-medium text-sm whitespace-nowrap">
                          {step.title}
                        </p>
                      </div>
                    </div>
                    {/* NG label under diamond */}
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2">
                      <div className="bg-red-600 rounded px-2 py-0.5">
                        <p className="text-[10px] leading-tight font-bold text-white">
                          NG
                          <br />
                          (GO BACK)
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </motion.div>

              {/* Arrows */}
              {index < steps.length - 1 && (
                <motion.div variants={stepVariants}>
                  <div className="w-16 h-16">
                    <svg viewBox="0 0 24 24" className="w-full h-full text-white">
                      <path
                        d="M5 12h14m0 0l-7-7m7 7l-7 7"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                      />
                    </svg>
                  </div>
                </motion.div>
              )}
            </React.Fragment>
          ))}
        </div>
      </motion.div>

      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:30px_30px]" />
    </div>
  );
};

/* =========================
   Core Capabilities Image Section
   ========================= */
function CoreCapabilitiesImageSection() {
  const { lang } = useLangStore();
  const langCode = (lang === "KOR" ? "KOR" : "ENG") as "KOR" | "ENG";

  const coreImgKor = "/images/business/process/core-capabilities-kor.png";
  const coreImgEng = "/images/business/process/core-capabilities-eng.png";
  const imgSrc = langCode === "KOR" ? coreImgKor : coreImgEng;

  const titleText = langCode === "KOR" ? "핵심 기술 및 보유 기술" : "Core Capabilities & Technologies";
  const subtitleText = langCode === "KOR" ? "정밀가공 · 모듈화 · 장비 기술" : "Precision · Modularization · Equipment";

  return (
    <section className="relative overflow-hidden bg-[radial-gradient(ellipse_at_top,_rgba(9,18,42,1)_0%,_rgba(8,14,31,1)_45%,_#070d1f_100%)] py-16 md:py-24">
      <div className="pointer-events-none absolute inset-0 opacity-[0.08]">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="cg-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
        </svg>
      </div>

      <div className="relative mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 text-center md:mb-12"
        >
          <h2 className="inline-block bg-gradient-to-r from-cyan-200 via-white to-fuchsia-200 bg-clip-text text-2xl font-extrabold tracking-tight text-transparent drop-shadow-sm md:text-4xl">
            {titleText}
          </h2>
          <div className="mx-auto mt-3 h-[3px] w-24 overflow-hidden rounded-full bg-white/10 md:mt-4">
            <motion.div
              initial={{ x: "-100%" }}
              whileInView={{ x: "100%" }}
              viewport={{ once: true }}
              transition={{ repeat: Infinity, duration: 2.2, ease: "linear" }}
              className="h-full w-1/3 bg-gradient-to-r from-cyan-400 via-white to-fuchsia-400"
            />
          </div>
          <p className="mt-3 text-sm text-slate-300/90 md:text-base">{subtitleText}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
          className="group relative mx-auto max-w-5xl"
        >
          <div className="relative rounded-3xl bg-gradient-to-br from-cyan-400/20 via-white/10 to-fuchsia-400/20 p-[2px] shadow-[0_25px_60px_rgba(5,11,25,0.45)]">
            <div className="relative rounded-[calc(1.5rem-2px)] bg-slate-900/60 backdrop-blur-xl">
              <motion.div whileHover={{ rotateX: 3, rotateY: -3, scale: 1.01 }} transition={{ type: "spring", stiffness: 160, damping: 18 }} className="relative aspect-[16/9] w-full">
                <Image src={imgSrc} alt={titleText} fill priority className="rounded-[inherit] object-contain" />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* =========================
        Page content
   ========================= */
export default function ServicePage() {
  const { lang } = useLangStore();
  const langCode = (lang === "KOR" ? "KOR" : "ENG") as "KOR" | "ENG";
  const { equipmentList, measurementEquipmentList } = serviceContent[langCode];
  const section = serviceContent[langCode].sectionList?.[0];

  const pageVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.12 } } };

  const fadeUp: Record<"hidden" | "visible", any> = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: cubicBezier(0.16, 1, 0.3, 1) } as Transition,
    },
  };

  const CM_TO_PX = 37.8;
  const HERO_TRIM_PX = Math.round(CM_TO_PX);

  return (
    <Layout>
      <Head>
        <title>{langCode === "KOR" ? "기술소개 " : "Technology"}</title>
      </Head>

      <main className="min-h-screen bg-white text-slate-900" style={{ paddingTop: "90px" }}>
        {/* hero trim */}
        <div style={{ marginTop: `-${HERO_TRIM_PX}px`, marginBottom: `-${HERO_TRIM_PX}px` }}>
          <HeroSection title={langCode === "KOR" ? "기술 소개" : "Technology"} backgroundImage="/images/sub_banner/business_hero.png" />
        </div>

        {/* breadcrumb */}
        <div className="relative -mt-2 z-30">
          <BreadcrumbSection path={langCode === "KOR" ? "사업분야 > 기술소개" : "Business > Technology"} />
        </div>

        {/* Core Capabilities image section */}
        <CoreCapabilitiesImageSection />

        {/* Main Equipment */}
        <section className="bg-white px-4 py-12 md:py-20">
          <div className="mx-auto max-w-7xl">
            <motion.h2 className="mb-6 text-base font-semibold tracking-wide sm:text-lg lg:text-2xl" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }}>
              Main Equipment
            </motion.h2>

            <motion.p className="text-xl font-bold tracking-wide leading-[1.3] md:text-2xl lg:text-4xl" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }}>
              {section?.maintitle}
              <br />
              {section?.mainsubtitle}
            </motion.p>
          </div>
        </section>

        {/* 생산가공 / 측정장비 */}
        <section className="relative z-0 bg-[#0a132e] px-4 pb-6 pt-12 md:pb-8 md:pt-20">
          <div className="pointer-events-none absolute inset-0">
            <Image src="/images/business/layer.png" alt="배경 이미지" fill style={{ objectFit: "cover", objectPosition: "top" }} priority />
          </div>

          <div className="mx-auto max-w-7xl">
            <motion.div className="relative transition-all" variants={pageVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
              {/* 생산가공 / 조립 */}
              <motion.span className="mb-10 inline-block rounded-full bg-white/10 px-6 py-1 text-base text-white sm:text-lg md:mb-16" variants={fadeUp}>
                {section?.production}
              </motion.span>

              <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
                {equipmentList.map((equipment: any, index: number) => (
                  <motion.div
                    key={`prod-${index}`}
                    className="group relative h-[calc(10rem+114px)] w-full overflow-hidden rounded-xl border-2 border-white/5 bg-white/5 p-2 shadow-lg transition-transform duration-200 hover:scale-[1.02] md:h-[calc(12.5rem+114px)]"
                    variants={fadeUp}
                  >
                    <div className="relative mb-0 h-[calc(5rem+95px)] w-full md:h-[calc(7rem+95px)]">
                      {equipment.image && <Image src={equipment.image} alt={equipment.name} fill className="rounded-[10px] object-cover" />}
                    </div>

                    <div className="absolute bottom-0 left-0 flex h-10 w-full items-center justify-center bg-[#1F2432]/70 px-3 md:h-12">
                      <p className="line-clamp-1 text-sm font-medium text-white md:text-base">{equipment.name}</p>
                    </div>

                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1 scale-x-0 bg-gradient-to-r from-cyan-400 to-indigo-400 transition-transform duration-200 group-hover:scale-x-100" />
                  </motion.div>
                ))}
              </div>

              {/* 신뢰성 (측정 / 분석) */}
              <motion.span className="mt-16 inline-block rounded-full bg-white/10 px-6 py-1 text-base text-white sm:text-lg md:mb-16 md:mt-28" variants={fadeUp}>
                {section?.measurement}
              </motion.span>

              <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
                {measurementEquipmentList.map((equipment: any, index: number) => (
                  <motion.div
                    key={`meas-${index}`}
                    className="group relative h-[calc(10rem+114px)] w-full overflow-hidden rounded-xl border-2 border-white/5 bg-white/5 p-2 shadow-lg transition-transform duration-200 hover:scale-[1.02] md:h-[calc(12.5rem+114px)]"
                    variants={fadeUp}
                  >
                    <div className="relative mb-0 h-[calc(5rem+95px)] w-full md:h-[calc(7rem+95px)]">
                      {equipment.image && <Image src={equipment.image} alt={equipment.name} fill className="rounded-[10px] object-cover" />}
                    </div>

                    <div className="absolute bottom-0 left-0 flex h-10 w-full items-center justify-center bg-[#1F2432]/70 px-3 md:h-12">
                      <p className="line-clamp-1 text-sm font-medium text-white md:text-base">{equipment.name}</p>
                    </div>

                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1 scale-x-0 bg-gradient-to-r from-teal-400 to-emerald-400 transition-transform duration-200 group-hover:scale-x-100" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* PROCESS section */}
<section className="bg-[#0a132e] py-20 px-4 md:px-8 relative overflow-hidden">
  {/* Background Grid + Gradients */}
  <div className="pointer-events-none absolute inset-0">
    {/* Grid Pattern */}
    <div className="absolute inset-0 opacity-[0.08]">
      <svg width="100%" height="100%">
        <defs>
          <pattern id="process-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#process-grid)" />
      </svg>
    </div>
    {/* Gradient Overlays */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_20%,rgba(56,189,248,0.12),transparent_40%)]" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(192,132,252,0.10),transparent_45%)]" />
  </div>

  <div className="mx-auto w-full max-w-7xl relative z-10">
    {/* Title Section with Animations */}
    <div className="mb-16 text-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-6"
      >
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white/[0.03] mb-4">
          차세대 반도체 제조 프로세스
        </h2>
        <p className="text-lg md:text-xl lg:text-2xl text-teal-400/10">
          Next-Generation Semiconductor Manufacturing Process
        </p>
      </motion.div>

      {/* Stats Row */}
      <motion.div 
        className="flex justify-center gap-8 mt-6"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center gap-2">
          <span className="text-cyan-400">Throughput</span>
          <span className="text-cyan-400 font-bold">90%</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-emerald-400">Efficiency</span>
          <span className="text-emerald-400 font-bold">94%</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-purple-400">Quality</span>
          <span className="text-purple-400 font-bold">98.98%</span>
        </div>
      </motion.div>
    </div>

    {/* Process Flow Chart */}
    <ProcessFlowChart />
  </div>

  {/* Animated Corner Accents */}
  <motion.div
    className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-cyan-500/20 to-transparent rounded-full blur-3xl"
    animate={{
      scale: [1, 1.2, 1],
      opacity: [0.3, 0.5, 0.3],
    }}
    transition={{
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
  <motion.div
    className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-tr from-purple-500/20 to-transparent rounded-full blur-3xl"
    animate={{
      scale: [1, 1.2, 1],
      opacity: [0.3, 0.5, 0.3],
    }}
    transition={{
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
      delay: 2,
    }}
  />
</section>

        <hr className="my-6 w-full border-gray-200" />
      </main>
    </Layout>
  );
}
