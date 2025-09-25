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

// data
import { processFlowContent } from "@/data/ProcessFlow";

/* =========================
   Process Flow (inlined)
   ========================= */
const ProcessFlowChart: React.FC = () => {
  const lang = useLangStore((state) => state.lang);
  const content = processFlowContent[lang];

  return (
    <div className="relative mx-auto w-full max-w-5xl">
      <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_18px_42px_rgba(15,23,42,0.08)]">
        <div className="relative max-h-[520px] overflow-hidden">
          <div className="custom-scrollbar max-h-[520px] overflow-y-auto overflow-x-hidden px-6 py-10 sm:px-10">
            <div className="mx-auto flex w-[920px] origin-top scale-[0.82] flex-col items-center gap-20 sm:scale-90 md:scale-100">
              {/* Top Lane */}
              <div className="flex w-full flex-nowrap items-center justify-center gap-5">
                {content.topLane.map((step, index) => (
                  <React.Fragment key={step.id}>
                    <div className="relative flex flex-col items-center gap-3">
                      {step.type === "diamond" ? (
                        <div className="relative flex h-28 w-28 flex-shrink-0 rotate-45 items-center justify-center bg-gradient-to-br from-[#1B2B57] to-[#0A1633] shadow-[0_12px_28px_rgba(10,20,56,0.28)]">
                          <div className="-rotate-45 px-2 text-center text-sm font-semibold text-white whitespace-pre-line">
                            {step.title}
                          </div>
                        </div>
                      ) : (
                        <div className="flex min-w-[160px] flex-shrink-0 flex-col items-center justify-center rounded-2xl border border-slate-200 bg-[#F3F4F8] px-5 py-4 text-center shadow-[0_10px_24px_rgba(15,23,42,0.08)]">
                          <div className="text-sm font-semibold text-slate-800 whitespace-pre-line">
                            {step.title}
                          </div>
                        </div>
                      )}
                      {step.hasNGFrom && (
                        <div className="flex flex-col items-center gap-2">
                          <span className="rounded-full bg-red-600 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                            NG
                          </span>
                          <div className="h-10 w-0.5 bg-red-500" />
                          <Arrow direction="up" className="text-red-500" />
                        </div>
                      )}
                      {step.ngTarget && (
                        <div className="absolute -top-12 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1">
                          <span className="rounded-full bg-red-600 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                            NG
                          </span>
                          <Arrow direction="left" className="text-red-500" />
                        </div>
                      )}
                    </div>
                    {index < content.topLane.length - 1 && (
                      <Arrow direction="right" className="text-[#1B2B57]" />
                    )}
                  </React.Fragment>
                ))}
              </div>

              {/* Middle Section - Inspection and Partner */}
              <div className="flex w-full flex-col items-center gap-10">
                <div className="flex flex-col items-center">
                  <div className="h-16 w-0.5 bg-[#1B2B57]" />
                  <Arrow direction="down" className="text-[#1B2B57]" />
                </div>
                <div className="relative flex items-center gap-8">
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col items-center gap-2">
                      <span className="rounded-full bg-red-600 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                        NG
                      </span>
                      <Arrow direction="left" className="text-red-500" />
                    </div>
                    <div className="flex min-w-[160px] flex-col items-center justify-center rounded-2xl border border-slate-200 bg-[#F3F4F8] px-5 py-4 text-center shadow-[0_10px_24px_rgba(15,23,42,0.08)]">
                      <div className="text-sm font-semibold text-slate-800">
                        협력사
                      </div>
                    </div>
                  </div>
                  <div className="relative flex h-28 w-28 flex-shrink-0 rotate-45 items-center justify-center bg-gradient-to-br from-[#1B2B57] to-[#0A1633] shadow-[0_12px_28px_rgba(10,20,56,0.28)]">
                    <div className="-rotate-45 px-2 text-center text-sm font-semibold text-white">
                      수입검사
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="h-16 w-0.5 bg-[#1B2B57]" />
                  <Arrow direction="down" className="text-[#1B2B57]" />
                </div>
              </div>

              {/* Bottom Lane - Left to Right Flow */}
              <div className="flex w-full flex-nowrap items-center justify-center gap-5">
                {content.bottomLane.map((step, index) => (
                  <React.Fragment key={step.id}>
                    <div className="relative flex flex-col items-center gap-3">
                      {step.type === "diamond" ? (
                        <div className="relative flex h-28 w-28 flex-shrink-0 rotate-45 items-center justify-center bg-gradient-to-br from-[#1B2B57] to-[#0A1633] shadow-[0_12px_28px_rgba(10,20,56,0.28)]">
                          <div className="-rotate-45 px-2 text-center text-sm font-semibold text-white whitespace-pre-line">
                            {step.title}
                          </div>
                        </div>
                      ) : (
                        <div className="flex min-w-[160px] flex-shrink-0 flex-col items-center justify-center rounded-2xl border border-slate-200 bg-[#F3F4F8] px-5 py-4 text-center shadow-[0_10px_24px_rgba(15,23,42,0.08)]">
                          <div className="text-sm font-semibold text-slate-800 whitespace-pre-line">
                            {step.title}
                          </div>
                        </div>
                      )}
                      {step.hasNGFrom && (
                        <div className="flex flex-col items-center gap-2">
                          <span className="rounded-full bg-red-600 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                            NG
                          </span>
                          <div className="h-10 w-0.5 bg-red-500" />
                          <Arrow direction="up" className="text-red-500" />
                        </div>
                      )}
                    </div>
                    {index < content.bottomLane.length - 1 && (
                      <Arrow direction="right" className="text-[#1B2B57]" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Arrow component
const Arrow: React.FC<{
  direction: "left" | "right" | "up" | "down";
  className?: string;
}> = ({
  direction,
  className = "text-slate-400",
}) => (
  <svg
    className={`h-6 w-6 ${
      direction === "left"
        ? "rotate-180"
        : direction === "up"
        ? "-rotate-90"
        : direction === "down"
        ? "rotate-90"
        : ""
    } ${className}`}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M5 12h14m0 0l-6-6m6 6l-6 6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
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
        {/* hero trim */}
        <div style={{ marginTop: `-${HERO_TRIM_PX}px`, marginBottom: `-${HERO_TRIM_PX}px` }}>
          <HeroSection
            title={langCode === "KOR" ? "기술 소개" : "Technology"}
            backgroundImage="/images/sub_banner/business_hero.png"
          />
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
            <motion.h2
              className="mb-6 text-base font-semibold tracking-wide sm:text-lg lg:text-2xl"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
            >
              Main Equipment
            </motion.h2>

            <motion.p
              className="text-xl font-bold tracking-wide leading-[1.3] md:text-2xl lg:text-4xl"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
            >
              {section?.maintitle}
              <br />
              {section?.mainsubtitle}
            </motion.p>
          </div>
        </section>

        {/* 생산가공 / 측정장비 */}
        <section className="relative z-0 bg-[#0a132e] px-4 pb-6 pt-12 md:pb-8 md:pt-20">
          <div className="pointer-events-none absolute inset-0">
            <Image
              src="/images/business/layer.png"
              alt="배경 이미지"
              fill
              style={{ objectFit: "cover", objectPosition: "top" }}
              priority
            />
          </div>

          <div className="mx-auto max-w-7xl">
            <motion.div
              className="relative transition-all"
              variants={pageVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {/* 생산가공 / 조립 */}
              <motion.span
                className="mb-10 inline-block rounded-full bg-white/10 px-6 py-1 text-base text-white sm:text-lg md:mb-16"
                variants={fadeUp}
              >
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
                      {equipment.image && (
                        <Image
                          src={equipment.image}
                          alt={equipment.name}
                          fill
                          className="rounded-[10px] object-cover"
                        />
                      )}
                    </div>

                    <div className="absolute bottom-0 left-0 flex h-10 w-full items-center justify-center bg-[#1F2432]/70 px-3 md:h-12">
                      <p className="line-clamp-1 text-sm font-medium text-white md:text-base">
                        {equipment.name}
                      </p>
                    </div>

                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1 scale-x-0 bg-gradient-to-r from-cyan-400 to-indigo-400 transition-transform duration-200 group-hover:scale-x-100" />
                  </motion.div>
                ))}
              </div>

              {/* 신뢰성 (측정 / 분석) */}
              <motion.span
                className="mt-16 inline-block rounded-full bg-white/10 px-6 py-1 text-base text-white sm:text-lg md:mb-16 md:mt-28"
                variants={fadeUp}
              >
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
                      {equipment.image && (
                        <Image
                          src={equipment.image}
                          alt={equipment.name}
                          fill
                          className="rounded-[10px] object-cover"
                        />
                      )}
                    </div>

                    <div className="absolute bottom-0 left-0 flex h-10 w-full items-center justify-center bg-[#1F2432]/70 px-3 md:h-12">
                      <p className="line-clamp-1 text-sm font-medium text-white md:text-base">
                        {equipment.name}
                      </p>
                    </div>

                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1 scale-x-0 bg-gradient-to-r from-teal-400 to-emerald-400 transition-transform duration-200 group-hover:scale-x-100" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* PROCESS (interactive rail) */}
        <section className="bg-white py-20 px-4 md:px-8 min-h-[calc(100vh-12rem)]"> {/* Added min-height */}
          <div className="mx-auto w-full max-w-7xl">
            <h2 className="mb-10 text-left text-sm font-semibold tracking-wide sm:text-base lg:text-2xl">
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
