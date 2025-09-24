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
    <div className="w-full overflow-x-auto relative">
      <motion.div
        className="min-w-[1800px] p-8 relative z-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex items-center gap-8 mb-16">
          {steps.map((step: any, index: number) => (
            <React.Fragment key={step.id ?? index}>
              <motion.div
                className="relative"
                variants={stepVariants}
                whileHover={{ scale: 1.05, transition: { type: "spring", stiffness: 400, damping: 10 } }}
              >
                {step.type === "card" ? (
                  <FlowCard
                    title={step.title}
                    subtitle={step.subtitle}
                    variant={step.isPartner ? "navy" : "light"}
                    size={step.isPartner ? "sm" : "md"}
                  />
                ) : (
                  <>
                    <FlowDiamond title={step.title} subtitle={step.subtitle} />
                    {/* NG label under diamond - wider by 10% */}
                    {!isIncomingStep(step) && (
                      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2">
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex flex-col items-center"
                        >
                          <div className="bg-red-600 rounded-md px-3.5 py-1 shadow-sm w-[110%]">
                            <div className="text-[10px] leading-[12px] font-bold text-white text-center tracking-wide">
                              NG
                              <br />
                              (GO BACK)
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    )}
                  </>
                )}

                {/* special: vertical NG under '수입검사' down to 협력사 */}
                {isIncomingStep(step) && (
                  <motion.div
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-3"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="flex flex-col items-center">
                      <div className="bg-red-600 rounded-md px-3.5 py-1 mb-2 shadow-sm w-[110%]">
                        <div className="text-[10px] leading-[12px] font-bold text-white text-center tracking-wide">
                          NG
                          <br />
                          (GO BACK)
                        </div>
                      </div>
                      <motion.div
                        className="w-0.5 h-16 bg-red-600"
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        transition={{ delay: 0.45, duration: 0.4 }}
                      />
                      <motion.div
                        className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[10px] border-transparent border-t-red-600"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.85 }}
                      />
                      <motion.div className="mt-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0 }}>
                        <FlowCard title="협력사" variant="navy" size="sm" />
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </React.Fragment>
          ))}
        </div>
      </motion.div>
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

        {/* PROCESS (animated tech) */}
        <section className="relative bg-[#08142c] py-16 md:py-20 px-4 md:px-8 overflow-hidden">
          {/* navy gradient + grid + sweep */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(34,211,238,0.12)_0%,_transparent_45%)]" />
            <div className="absolute inset-0 opacity-[0.07]">
              <svg width="100%" height="100%">
                <defs>
                  <pattern id="process-grid" width="44" height="44" patternUnits="userSpaceOnUse">
                    <path d="M 44 0 L 0 0 0 44" fill="none" stroke="white" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#process-grid)" />
              </svg>
            </div>
            <motion.div
              className="absolute inset-0"
              animate={{ backgroundPosition: ["0% 0%", "120% 120%"] }}
              transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
              style={{ backgroundImage: "linear-gradient(45deg, transparent 60%, rgba(59,130,246,0.08) 62%, transparent 64%)", backgroundSize: "32px 32px" }}
            />
          </div>

          {/* header seperti gambar */}
<div className="relative z-10 mx-auto w-full max-w-7xl text-center mb-6 md:mb-10">
  <motion.h3
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="text-[22px] md:text-3xl lg:text-4xl font-extrabold text-white"
  >
    {lang === "KOR" 
      ? "제품 제조 및 품질 프로세스"
      : "Product Manufacturing & Quality Process"
    }
  </motion.h3>
  <motion.p
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: 0.1 }}
    className="text-sky-200/90 text-sm md:text-base mt-2"
  >
    {lang === "KOR"
      ? "차세대 반도체 제조 프로세스"
      : "Next-Generation Semiconductor Manufacturing Process"
    }
  </motion.p>

            <div className="mt-4 flex items-center justify-center gap-3">
              {[
                { label: "Throughput", bg: "from-cyan-500/20 to-cyan-400/10", ring: "ring-cyan-400/40" },
                { label: "Efficiency", bg: "from-emerald-500/20 to-emerald-400/10", ring: "ring-emerald-400/40" },
                { label: "Quality",  bg: "from-fuchsia-500/20 to-fuchsia-400/10", ring: "ring-fuchsia-400/40" },
              ].map((pill, i) => (
                <motion.div
                  key={pill.label}
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
                  className={`rounded-full px-3 py-1 text-[12px] md:text-[13px] text-slate-100 ring-1 ${pill.ring} bg-gradient-to-br ${pill.bg} backdrop-blur-sm`}
                >
                  <span className="opacity-90">{pill.label}</span>{" "}
                </motion.div>
              ))}
            </div>
          </div>

          {/* chart */}
          <div className="relative z-10 mx-auto w-full max-w-7xl">
            <ProcessFlowChart />
          </div>
        </section>

        <hr className="my-6 w-full border-gray-200" />
      </main>
    </Layout>
  );
}
