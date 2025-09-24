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

// 👇 these files are in the same folder as service.tsx
// pages/business/service.tsx (and anywhere else)
import { FlowCard } from "@/components/FlowCard";
import { FlowDiamond } from "@/components/FlowDiamond";
import { FlowArrow } from "@/components/FlowArrow";
import { NGBox } from "@/components/NGBox";



// use alias so it resolves from src/data
import { processFlowContent } from "@/data/ProcessFlow";

/* =========================
   Process Flow (inlined)
   ========================= */
const ProcessFlowChart: React.FC = () => {
  const lang = useLangStore((state) => state.lang);
  const content = processFlowContent[lang];
  const steps = content.steps;

  const findStepIndex = (id: string) => steps.findIndex((s) => s.id === id);

  const calculateNGDistance = (fromIndex: number, toIndex: number) =>
    Math.max(Math.abs(fromIndex - toIndex) * 200, 120);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const stepVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
        duration: 0.6,
      },
    },
  };

  return (
    <div className="w-full bg-white overflow-x-auto">
      {/* animated background grid */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A1633]/20 via-transparent to-[#1B2B57]/20" />
        <motion.div
          className="absolute inset-0"
          animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
          style={{
            backgroundImage: `
              linear-gradient(90deg, transparent 98%, rgba(10, 22, 51, 0.1) 100%),
              linear-gradient(transparent 98%, rgba(10, 22, 51, 0.1) 100%)
            `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <motion.div
        className="min-w-[1800px] p-8 relative"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex items-center gap-8 mb-16">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <motion.div
                className="relative"
                variants={stepVariants}
                whileHover={{
                  scale: 1.05,
                  transition: { type: "spring", stiffness: 400, damping: 10 },
                }}
              >
                {step.type === "card" ? (
                  <FlowCard
                    title={step.title}
                    subtitle={step.subtitle}
                    variant={step.isPartner ? "navy" : "light"}
                    size={step.isPartner ? "sm" : "md"}
                  />
                ) : (
                  <FlowDiamond title={step.title} subtitle={step.subtitle} />
                )}

                {/* NG indicators for specific steps */}
                {step.hasNG && (
                  <motion.div
                    className="absolute top-full mt-4 left-1/2 -translate-x-1/2"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.4 }}
                  >
                    <NGBox />

                    <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2">
                      {/* D/R -> Concept (NG return) */}
                      {step.id === "dr" && (
                        <motion.div
                          className="flex items-center"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 1.2 }}
                        >
                          <motion.div
                            className="w-0.5 h-8 bg-[#EF4444]"
                            initial={{ scaleY: 0 }}
                            animate={{ scaleY: 1 }}
                            transition={{ delay: 1.2, duration: 0.3 }}
                          />
                          <motion.div
                            className="h-1 bg-[#EF4444]"
                            style={{
                              width: `${calculateNGDistance(
                                index,
                                findStepIndex("concept")
                              )}px`,
                            }}
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{
                              delay: 1.5,
                              duration: 0.8,
                              ease: "easeInOut",
                            }}
                          />
                          <motion.div
                            className="w-0.5 h-8 bg-[#EF4444]"
                            initial={{ scaleY: 0 }}
                            animate={{ scaleY: 1 }}
                            transition={{ delay: 2.3, duration: 0.3 }}
                          />
                          <motion.div className="w-0 h-0 border-t-[6px] border-b-[6px] border-r-[10px] border-transparent border-r-[#EF4444] -ml-1" />
                        </motion.div>
                      )}

                      {/* Partner -> PO (NG return) */}
                      {step.id === "partner" && (
                        <motion.div
                          className="flex items-center"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 1.2 }}
                        >
                          <motion.div
                            className="w-0.5 h-8 bg-[#EF4444]"
                            initial={{ scaleY: 0 }}
                            animate={{ scaleY: 1 }}
                            transition={{ delay: 1.2, duration: 0.3 }}
                          />
                          <motion.div
                            className="h-1 bg-[#EF4444]"
                            style={{
                              width: `${calculateNGDistance(
                                index,
                                findStepIndex("po")
                              )}px`,
                            }}
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{
                              delay: 1.5,
                              duration: 0.8,
                              ease: "easeInOut",
                            }}
                          />
                          <motion.div
                            className="w-0.5 h-8 bg-[#EF4444]"
                            initial={{ scaleY: 0 }}
                            animate={{ scaleY: 1 }}
                            transition={{ delay: 2.3, duration: 0.3 }}
                          />
                          <motion.div className="w-0 h-0 border-t-[6px] border-b-[6px] border-r-[10px] border-transparent border-r-[#EF4444] -ml-1" />
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                )}
              </motion.div>

              {/* main arrow */}
              {index < steps.length - 1 && !step.arrowsTo && (
                <motion.div variants={stepVariants} whileHover={{ scale: 1.1 }}>
                  <FlowArrow />
                </motion.div>
              )}

              {/* special arrow from 수입검사 to 협력사 */}
              {step.arrowsTo && (
                <motion.div
                  variants={stepVariants}
                  className="flex flex-col items-center"
                >
                  <motion.div
                    className="w-0.5 h-16 bg-[#1B2B57]"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                  />
                  <motion.div
                    className="w-16 h-0.5 bg-[#1B2B57]"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 1, duration: 0.5 }}
                  />
                  <motion.div
                    className="w-0.5 h-16 bg-[#1B2B57]"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ delay: 1.5, duration: 0.5 }}
                  />
                  <motion.div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[10px] border-transparent border-t-[#1B2B57] -mt-1" />
                </motion.div>
              )}

              {/* long return arrow for re-order */}
              {step.returnTo && (
                <motion.div className="relative ml-8" variants={stepVariants}>
                  <FlowArrow />
                  <motion.div
                    className="absolute left-8 top-1/2 -translate-y-1/2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                  >
                    <div className="flex flex-col items-center">
                      <motion.div
                        className="w-0.5 h-12 bg-[#1B2B57]"
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        transition={{ delay: 1.5, duration: 0.4 }}
                      />
                      <motion.div
                        className="w-[1400px] h-0.5 bg-[#1B2B57]"
                        initial={{ scaleX: 0, originX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 1.9, duration: 1.2, ease: "easeInOut" }}
                      />
                      <motion.div
                        className="w-0.5 h-12 bg-[#1B2B57]"
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        transition={{ delay: 3.1, duration: 0.4 }}
                      />
                      <motion.div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[10px] border-transparent border-t-[#1B2B57] -mt-3" />
                    </div>
                  </motion.div>
                </motion.div>
              )}
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

  const titleText =
    langCode === "KOR" ? "핵심 기술 및 보유 기술" : "Core Capabilities & Technologies";
  const subtitleText =
    langCode === "KOR"
      ? "정밀가공 · 모듈화 · 장비 기술"
      : "Precision · Modularization · Equipment";

  return (
    <section className="relative overflow-hidden bg-[radial-gradient(ellipse_at_top,_rgba(9,18,42,1)_0%,_rgba(8,14,31,1)_45%,_#070d1f_100%)] py-16 md:py-24">
      <div className="pointer-events-none absolute inset-0 opacity-[0.08]">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="cg-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cg-grid)" />
        </svg>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_60%_20%,rgba(56,189,248,0.12),transparent_40%),radial-gradient(circle_at_30%_70%,rgba(192,132,252,0.10),transparent_45%)]" />

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
              <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
                <motion.div
                  initial={{ x: "-120%" }}
                  whileInView={{ x: "120%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.8, delay: 0.2, ease: "easeInOut" }}
                  className="h-full w-1/3 skew-x-12 bg-gradient-to-r from-transparent via-white/12 to-transparent"
                />
              </div>

              <motion.div
                whileHover={{ rotateX: 3, rotateY: -3, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 160, damping: 18 }}
                className="relative aspect-[16/9] w-full"
              >
                <Image
                  src={imgSrc}
                  alt={langCode === "KOR" ? "핵심 기술 및 보유 기술" : "Core Capabilities & Technologies"}
                  fill
                  priority
                  className="rounded-[inherit] object-contain"
                />
              </motion.div>
            </div>
          </div>

          <span className="pointer-events-none absolute -left-3 -top-3 h-6 w-6 rounded-full bg-cyan-400/50 blur-[6px]" />
          <span className="pointer-events-none absolute -right-3 -bottom-3 h-6 w-6 rounded-full bg-fuchsia-400/40 blur-[6px]" />
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

  const pageVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
  };

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
        <div style={{ marginTop: `-${HERO_TRIM_PX}px`, marginBottom: `-${HERO_TRIM_PX}px` }}>
          <HeroSection title={langCode === "KOR" ? "기술 소개" : "Technology"} backgroundImage="/images/sub_banner/business_hero.png" />
        </div>

        <div className="relative -mt-2 z-30">
          <BreadcrumbSection path={langCode === "KOR" ? "사업분야 > 기술소개" : "Business > Technology"} />
        </div>

        <CoreCapabilitiesImageSection />

        {/* PROCESS (interactive rail) */}
        <section className="bg-white py-20 px-4 md:px-8">
          <div className="mx-auto w-full max-w-7xl">
            <h2 className="mb-6 text-left text-sm font-semibold tracking-wide sm:text-base lg:text-2xl">
              PROCESS
            </h2>
            <ProcessFlowChart />
          </div>
        </section>

        <hr className="my-6 w-full border-gray-200" />
      </main>
    </Layout>
  );
}
