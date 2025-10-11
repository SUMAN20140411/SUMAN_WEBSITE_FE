// app/service.tsx
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



/* =========================
   Core Capabilities Image Section
   ========================= */
function CoreCapabilitiesImageSection() {
  const { lang } = useLangStore();
  const langCode = (lang === "KOR" ? "KOR" : "ENG") as "KOR" | "ENG";

  const coreImgKor = "/images/business/process/coreKor2.png";
  const coreImgEng = "/images/business/process/coreEng2.png";
  const imgSrc = langCode === "KOR" ? coreImgKor : coreImgEng;

  // why: bilingual title; paddings+widths ditambah 20% agar section & foto lebih besar
  const titleText =
    langCode === "KOR" ? "핵심 역량 및 기술" : "Core Capabilities & Technologies";
  const subtitleText =
    langCode === "KOR"
      ? "정밀가공 · 모듈화 · 장비 기술"
      : "Precision · Modularization · Equipment";

  return (
    // ↑ Perpanjang section ~20%: pt-12→pt-14, md:pt-20→md:pt-24, pb-6→pb-7, md:pb-8→md:pb-10
    <section className="relative z-0 bg-[#0a132e] px-4 pb-1 pt-14 md:pb-10 md:pt-24 overflow-hidden">
      {/* background */}
      <div className="pointer-events-none absolute inset-0">
        <Image
          src="/images/business/layer.png"
          alt={langCode === "KOR" ? "배경 이미지" : "Background image"}
          fill
          style={{ objectFit: "cover", objectPosition: "top" }}
          priority
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4">
        {/* Title & Subtitle — LEFT ALIGN; title white; no divider */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb- text-left md:mb-"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white drop-shadow-sm">
            {titleText}
          </h2>
          <p className="mt-3 text-base md:text-lg text-slate-300/90">
            {subtitleText}
          </p>
        </motion.div>

        {/* image (+10%): w-[85.2%]→w-[94%], max-w-[76.8rem]→max-w-[84rem] */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1],
            delay: 0.05,
          }}
          className="group relative mx-auto max-w-[84rem] w-[94%]"
        >
          <motion.div
            whileHover={{ rotateX: 3, rotateY: -3, scale: 1.01 }}
            transition={{ type: "spring", stiffness: 160, damping: 18 }}
            className="relative aspect-[16/9] w-full"
          >
            <Image
              src={imgSrc}
              alt={
                langCode === "KOR"
                  ? "핵심 역량 및 기술"
                  : "Core Capabilities & Technologies"
              }
              fill
              priority
              className="object-contain"
              sizes="(min-width: 1280px) 84rem, 94vw" // tetap object-contain agar tidak terpotong
            />
          </motion.div>
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
      transition: {
        duration: 0.6,
        ease: cubicBezier(0.16, 1, 0.3, 1),
      } as Transition,
    },
  };

  return (
    <Layout>
      <Head>
        <title>{langCode === "KOR" ? "기술소개 " : "Technology"}</title>
      </Head>

      <main className="min-h-screen bg-white pt-[90px] text-slate-900">
        <HeroSection
          title={langCode === "KOR" ? "기술 소개" : "Technology"}
          backgroundImage="/images/sub_banner/business_hero.png"
        />

        {/* breadcrumb */}
        <div className="relative z-30 -mt-8 sm:-mt-10">
          <BreadcrumbSection
            path={
              langCode === "KOR"
                ? "사업분야 > 기술소개"
                : "Business > Technology"
            }
          />
        </div>

        {/* Core Capabilities image section (localized title) */}
        <CoreCapabilitiesImageSection />

        {/* Main Equipment */}
        <section className="bg-white px-4 py-12 md:py-20">
          <div className="mx-auto max-w-7xl">
            {/* Title: LEFT, unified title size */}
            <motion.h2
              className="mb-4 text-left text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-wide"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
            >
              {langCode === "KOR" ? "주요 설비" : "Main Equipment"}
            </motion.h2>

            {/* Subtitle block (two lines): LEFT, unified subtitle size */}
            <motion.p
              className="text-left text-base md:text-lg text-slate-700"
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
              alt={langCode === "KOR" ? "배경 이미지" : "Background image"}
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
              {/* 생산가공 / 조립 — LEFT (badge) */}
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

              {/* 신뢰성 (측정 / 분석) — LEFT (badge) */}
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

        {/* PROCESS — LEFT; no divider/animation */}
        <section className="relative py-16 md:py-24">
          <div className="relative mx-auto max-w-7xl px-4">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mb-8 text-left md:mb-12"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900">
                {langCode === "KOR" ? "프로세스" : "Process"}
              </h2>
              <p className="mt-3 text-base md:text-lg text-gray-600">
                {lang === "KOR"
                  ? "제품 제조 및 품질 프로세스"
                  : "Product Manufacturing & Quality Process"}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.05,
              }}
              className="relative mx-auto max-w-5xl"
            >
              <motion.div
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 160, damping: 18 }}
                className="relative aspect-[16/9] w-full"
              >
                <Image
                  src={
                    lang === "KOR"
                      ? "/images/business/process/processKor.png"
                      : "/images/business/process/processEng.png"
                  }
                  alt={
                    lang === "KOR"
                      ? "제품 제조 및 품질 프로세스"
                      : "Product Manufacturing & Quality Process"
                  }
                  fill
                  priority
                  className="object-contain"
                />
              </motion.div>
            </motion.div>
          </div>
        </section>

        <hr className="my-6 w-full border-gray-200" />
      </main>
    </Layout>
  );
}
