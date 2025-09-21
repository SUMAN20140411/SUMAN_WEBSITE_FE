"use client";

import React from "react";
import Head from "next/head";
import Image from "next/image";
import { motion, type Transition, cubicBezier, easeInOut } from "framer-motion";
import Layout from "@/components/Layout";
import HeroSection from "@/components/HeroSection";
import BreadcrumbSection from "@/components/BreadcrumbSection";
import { useLangStore } from "@/stores/langStore";
import { serviceContent } from "@/data/service";

export default function ServicePage() {
  function ProcessFlow({ lang }: { lang: "KOR" | "ENG" }) {
  // 0..100 logical canvas
  type Node = {
    id: string;
    type: "rect" | "diamond";
    x: number; y: number; w: number; h: number;
    title: string; subtitle?: string;
  };

  const T = (ko: string, en: string) => (lang === "KOR" ? ko : en);

  const nodes: Node[] = [
    { id: "customer", type: "rect", x: 4,  y: 12, w: 18, h: 12, title: T("Customer", "Customer") },
    { id: "concept",  type: "rect", x: 26, y: 12, w: 22, h: 12, title: T("Concept 설계", "Concept Design") },
    { id: "dr",       type: "diamond", x: 50, y: 12, w: 10, h: 12, title: "D/R" },

    { id: "develop",  type: "rect", x: 68, y: 12, w: 22, h: 12, title: T("개발/가공 설계", "Dev/Machining Design") },
    { id: "review",   type: "diamond", x: 68, y: 30, w: 12, h: 12, title: T("검토승인", "Review") },

    { id: "order",    type: "rect", x: 68, y: 48, w: 22, h: 12, title: T("발주(소재/부품)", "Order (Material/Parts)") },
    { id: "inspect",  type: "diamond", x: 56, y: 52, w: 12, h: 12, title: T("수입검사", "Incoming Insp.") },
    { id: "partner",  type: "rect", x: 78, y: 30, w: 18, h: 12, title: T("협력사", "Partner") },

    { id: "machine",  type: "rect", x: 38, y: 48, w: 22, h: 12, title: T("가공/제작", "Machining/Fabrication") },
    { id: "assmchk",  type: "diamond", x: 26, y: 56, w: 14, h: 14, title: T("출하 및\n조립/측정검사", "Assembly/Inspection") },

    { id: "pack",     type: "rect", x: 16, y: 76, w: 20, h: 12, title: T("포장", "Packing") },
    { id: "deliver",  type: "rect", x: 38, y: 76, w: 20, h: 12, title: T("고객사 납품", "Delivery") },
    { id: "feedback", type: "diamond", x: 58, y: 76, w: 12, h: 12, title: T("고객 Feedback", "Customer Feedback") },
    { id: "reorder",  type: "rect", x: 74, y: 76, w: 22, h: 12, title: T("Re-Order 개선/반영", "Re-Order & Improvements") },
  ];

  const byId = Object.fromEntries(nodes.map(n => [n.id, n]));
  const edge = (n: Node, side: "l" | "r" | "t" | "b") => {
    const cx = n.x + n.w / 2, cy = n.y + n.h / 2;
    if (side === "l") return [n.x, cy];
    if (side === "r") return [n.x + n.w, cy];
    if (side === "t") return [cx, n.y];
    return [cx, n.y + n.h];
  };

  type Link = {
    from: [string, "l"|"r"|"t"|"b"];
    to:   [string, "l"|"r"|"t"|"b"];
    curved?: boolean;
    label?: string;
  };

  const links: Link[] = [
    { from: ["customer","r"], to: ["concept","l"] },
    { from: ["concept","r"],  to: ["dr","l"] },
    { from: ["dr","r"],       to: ["develop","l"] },

    { from: ["develop","b"],  to: ["review","t"] },
    { from: ["review","b"],   to: ["order","t"] },

    { from: ["order","l"],    to: ["machine","r"] },
    { from: ["inspect","l"],  to: ["machine","r"] },
    { from: ["inspect","t"],  to: ["partner","b"] },

    { from: ["machine","b"],  to: ["assmchk","t"] },
    { from: ["assmchk","b"],  to: ["pack","t"] },
    { from: ["pack","r"],     to: ["deliver","l"] },
    { from: ["deliver","r"],  to: ["feedback","l"] },
    { from: ["feedback","r"], to: ["reorder","l"] },

    // NG loops
    { from: ["dr","t"],       to: ["concept","t"],  curved: true, label: "NG" },
    { from: ["review","t"],   to: ["develop","t"],  curved: true, label: "NG" },
    { from: ["assmchk","l"],  to: ["machine","t"],  curved: true, label: "NG" },
  ];

  const arrow = "rgba(15, 23, 42, 0.9)"; // slate-900-ish

  const fadeUp = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1, y: 0,
      transition: { duration: 0.45, ease: (t: number) => t },
    },
  };

  return (
    <div className="relative mx-auto w-full max-w-6xl rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="relative aspect-[16/9]">
        {/* connectors */}
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="6" markerHeight="6" orient="auto" markerUnits="userSpaceOnUse">
              <path d="M0 0 L10 5 L0 10 Z" fill={arrow} />
            </marker>
          </defs>

          {links.map((lk, i) => {
            const s = edge(byId[lk.from[0]], lk.from[1]);
            const e = edge(byId[lk.to[0]],   lk.to[1]);
            const [sx, sy, ex, ey] = [s[0], s[1], e[0], e[1]];

            let d: string;
            if (lk.curved) {
              const mx = (sx + ex) / 2;
              const lift = 10; // curve height
              const cp1 = `${mx} ${sy - lift}`;
              const cp2 = `${mx} ${ey - lift}`;
              d = `M ${sx} ${sy} C ${cp1}, ${cp2}, ${ex} ${ey}`;
            } else {
              // small horizontal/vertical “soft” elbow (Cubic) to look neat
              const dx = (ex - sx) * 0.3;
              const dy = (ey - sy) * 0.3;
              d = `M ${sx} ${sy} C ${sx + dx} ${sy}, ${ex - dx} ${ey}, ${ex} ${ey}`;
            }

            return (
              <g key={i}>
                <path
                  d={d}
                  fill="none"
                  stroke={arrow}
                  strokeWidth={1.4}
                  strokeLinecap="round"
                  markerEnd="url(#arrow)"
                  vectorEffect="non-scaling-stroke"
                />
                {lk.label && (
                  <text
                    x={(sx + ex) / 2}
                    y={(sy + ey) / 2 - 2}
                    fontSize={3.5}
                    fontWeight={700}
                    fill="#ef4444"
                  >
                    {lk.label}
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        {/* nodes */}
        {nodes.map((n) => (
          <motion.div
            key={n.id}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="absolute"
            style={{ left: `${n.x}%`, top: `${n.y}%`, width: `${n.w}%`, height: `${n.h}%` }}
          >
            {n.type === "rect" ? (
              <div
                className="group flex h-full w-full items-center justify-center rounded-[18px] bg-gradient-to-br from-[#0b2a63] to-[#0a1f4a] text-white shadow-[0_10px_24px_rgba(2,6,23,0.25)] transition-transform duration-150 hover:scale-[1.03] hover:from-[#11377f] hover:to-[#0f2b60]"
              >
                <div className="px-4 text-center">
                  <div className="text-[min(1.05rem,3.5vw)] font-extrabold leading-tight">{n.title}</div>
                  {n.subtitle && <div className="mt-1 text-[min(0.85rem,3vw)] opacity-85">{n.subtitle}</div>}
                </div>
              </div>
            ) : (
              <div className="relative h-full w-full">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="group relative flex h-[85%] w-[85%] -rotate-45 items-center justify-center rounded-lg bg-slate-100 text-slate-800 shadow-md ring-1 ring-slate-200 transition-transform duration-150 hover:scale-[1.05]"
                  >
                    <div className="rotate-45 px-2 text-center text-[min(0.82rem,3vw)] font-semibold leading-tight whitespace-pre-line">
                      {n.title}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

  const { lang } = useLangStore();
  const { equipmentList, measurementEquipmentList } = serviceContent[lang];
  const section = serviceContent[lang].sectionList?.[0];

  const capabilities = [
    {
      title: "정밀 가공/제작 기술",
      subtitle:
        lang === "KOR"
          ? "중대형 구조물 가공, 제작 기술과 고정밀 정밀 가공 기술을 보유하고 있습니다."
          : "Designing and manufacturing mid/large structures with precision machining.",
      angle: 0,
    },
    {
      title: "실내외 협치 주행 기술",
      subtitle:
        lang === "KOR"
          ? "실시간 하중변경 바퀴/링크 제어 시스템과 지능형 협업 기술."
          : "Indoor/outdoor cooperative driving with real-time wheel/link control.",
      angle: 60,
    },
    {
      title: "시스템 아키텍처 기술",
      subtitle:
        lang === "KOR"
          ? "실시간 하중변경 바퀴/바닥 제어와 통합 시스템 아키텍처."
          : "Integrated system architecture with real-time load variation control.",
      angle: 120,
    },
    {
      title: "구조물 가공/제작 기술",
      subtitle:
        lang === "KOR"
          ? "저동형 자율주행 모듈 구성과 적재용량 최적화."
          : "Modular structures for mobile robots and payload optimization.",
      angle: 180,
    },
    {
      title: "고정밀 Jig 개발/제작 기술",
      subtitle:
        lang === "KOR"
          ? "공정 맞춤형 Jig 설계/개발/제작으로 정밀도와 효율성 극대화."
          : "Custom jigs for processes to maximize precision and efficiency.",
      angle: 240,
    },
    {
      title: "지능형 시스템 기술",
      subtitle:
        lang === "KOR"
          ? "실시간 하중변경 바퀴/바닥 제어 지능형 로봇 시스템."
          : "Intelligent robot systems with real-time control.",
      angle: 300,
    },
  ] as const;

  const getPositionFromAngle = (angle: number, radius: number) => {
    const rad = (angle * Math.PI) / 180;
    return { x: Math.cos(rad) * radius, y: Math.sin(rad) * radius };
  };

  /** Page & element animations (v11-safe) */
  const pageVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
    },
  };

  const fadeUp: Record<"hidden" | "visible", any> = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: cubicBezier(0.16, 1, 0.3, 1) } as Transition,
    },
  };

  const ringPulse = {
    scale: [1, 1.02, 1],
    opacity: [0.15, 0.35, 0.15],
    transition: { duration: 4, repeat: Infinity, ease: easeInOut },
  };

  const CM_TO_PX = 37.8;
  const HERO_TRIM_PX = Math.round(CM_TO_PX);

  const processImageVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.7, ease: cubicBezier(0.2, 0.8, 0.2, 1) } as Transition,
    },
  };

  const orbitRadius = 320;

  return (
    <Layout>
      <Head>
        <title>{lang === "KOR" ? "기술소개 " : "Technology"}</title>
      </Head>

      <main className="min-h-screen bg-white text-slate-900" style={{ paddingTop: "90px" }}>
        {/* Trim hero 1cm top/bottom */}
        <div style={{ marginTop: `-${HERO_TRIM_PX}px`, marginBottom: `-${HERO_TRIM_PX}px` }}>
          <HeroSection title={lang === "KOR" ? "기술 소개" : "Technology"} backgroundImage="/images/sub_banner/business_hero.png" />
        </div>

        {/* Breadcrumb */}
        <div className="relative z-30 -mt-2">
          <BreadcrumbSection path={lang === "KOR" ? "사업분야 > 기술소개" : "Business > Technology"} />
        </div>

        {/* ===== Capability Orbit (matches attached design) ===== */}
        <section className="relative overflow-hidden py-20">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0a1630] via-[#0f1e3e] to-[#0a1630]" />

          <motion.div
            className="relative mx-auto h-[920px] w-full max-w-[1200px]"
            variants={pageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
          >
            {/* subtle stars */}
            <div className="absolute inset-0">
              <div className="absolute left-6 top-10 h-1 w-1 rounded-full bg-white/30" />
              <div className="absolute right-12 top-24 h-1 w-1 rounded-full bg-white/30" />
              <div className="absolute bottom-32 left-10 h-1 w-1 rounded-full bg-white/30" />
              <div className="absolute bottom-20 right-24 h-1 w-1 rounded-full bg-white/30" />
            </div>

            {/* orbits */}
            {[420, 560, 700].map((size, i) => (
              <motion.div
                key={size}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10"
                style={{ width: size, height: size }}
                animate={ringPulse}
              />
            ))}

            {/* rotating thin ring */}
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5"
              style={{ width: 640, height: 640 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: (t: number) => t }}
            />

            {/* center orb */}
            <motion.div
              className="absolute left-1/2 top-1/2 z-10 flex h-[230px] w-[230px] -translate-x-1/2 -translate-y-1/2 items-center justify-center overflow-hidden rounded-full"
              variants={fadeUp}
              whileHover={{ scale: 1.04 }}
              style={{
                boxShadow:
                  "0 25px 60px rgba(13,25,49,0.45), inset 0 2px 6px rgba(255,255,255,0.12)",
              }}
            >
              <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(116,76,255,0.35),transparent_60%),radial-gradient(circle_at_70%_70%,rgba(46,165,255,0.35),transparent_55%)]" />
              <div className="absolute inset-[6px] rounded-full bg-gradient-to-b from-[#0f1e3e] to-[#0a142b] border border-white/10" />
              <div className="relative z-10 text-center text-white drop-shadow">
                <div className="text-xl font-extrabold tracking-tight">
                  {lang === "KOR" ? "정밀가공/모듈화" : "Precision Machining"}
                </div>
                <div className="mt-1 text-xs opacity-80">
                  {lang === "KOR" ? "＆ 장비 기술" : "& Systems"}
                </div>
              </div>
            </motion.div>

            {/* capability cards */}
            {capabilities.map((cap, idx) => {
              const { x, y } = getPositionFromAngle(cap.angle - 90, orbitRadius);
              return (
                <motion.div
                  key={cap.title}
                  className="absolute w-[360px] max-w-[42vw]"
                  style={{
                    left: `calc(50% + ${x}px - 180px)`,
                    top: `calc(50% + ${y}px - 80px)`,
                  }}
                  variants={fadeUp}
                >
                  <div
                    className={[
                      "group relative rounded-2xl border border-white/10 bg-gradient-to-br",
                      "from-slate-800/70 to-slate-900/70 backdrop-blur",
                      "shadow-[0_15px_35px_rgba(5,11,25,0.5)]",
                      "transition-transform duration-200 ease-linear hover:scale-[1.03]",
                    ].join(" ")}
                  >
                    {/* decorative corner dots */}
                    <span className="absolute right-4 top-4 h-2 w-2 rounded-full bg-cyan-300/70 group-hover:bg-cyan-200" />
                    <span className="absolute right-8 top-4 h-2 w-2 rounded-full bg-cyan-300/30 group-hover:bg-cyan-200/60" />
                    {/* content */}
                    <div className="flex gap-4 p-5">
                      {/* tiny thumbnail grid to mimic figma shots */}
                      <div className="mt-1 grid h-[46px] w-[46px] grid-cols-2 gap-1 rounded-md bg-slate-700/30 p-1">
                        <div className="h-full w-full rounded-[6px] bg-gradient-to-br from-sky-400/40 to-indigo-400/40" />
                        <div className="h-full w-full rounded-[6px] bg-gradient-to-br from-emerald-400/40 to-teal-400/40" />
                        <div className="h-full w-full rounded-[6px] bg-gradient-to-br from-fuchsia-400/40 to-pink-400/40" />
                        <div className="h-full w-full rounded-[6px] bg-gradient-to-br from-amber-400/40 to-orange-400/40" />
                      </div>

                      <div className="min-w-0">
                        <div className="text-white text-lg font-extrabold leading-tight">
                          {cap.title}
                        </div>
                        <p className="mt-1 text-sm leading-snug text-slate-200/80">
                          {cap.subtitle}
                        </p>
                      </div>
                    </div>

                    {/* bottom gradient bar on hover */}
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[6px] scale-x-0 rounded-b-2xl bg-gradient-to-r from-cyan-400 to-fuchsia-400 opacity-90 transition-transform duration-200 group-hover:scale-x-100" />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </section>

        {/* ===== Main Equipment ===== */}
        <section className="bg-white py-12 md:py-20 px-4">
          <div className="mx-auto max-w-7xl">
            <motion.h2
              className="text-base sm:text-lg lg:text-2xl font-semibold tracking-wide mb-6 md:mb-10"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
            >
              Main Equipment
            </motion.h2>

            <motion.p
              className="text-xl md:text-2xl lg:text-4xl font-bold tracking-wide leading-[1.3]"
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

        {/* ===== 생산가공 / 측정장비 ===== */}
        <section className="relative z-0 bg-[#0a132e] pt-12 md:pt-20 pb-6 md:pb-8 px-4">
          <div className="absolute inset-0 pointer-events-none">
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
                className="inline-block text-base sm:text-lg bg-white/10 text-white rounded-full px-6 py-1 mb-10 md:mb-16"
                variants={fadeUp}
              >
                {section?.production}
              </motion.span>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
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
                className="mt-16 inline-block text-base sm:text-lg rounded-full bg-white/10 px-6 py-1 text-white md:mt-28 md:mb-16"
                variants={fadeUp}
              >
                {section?.measurement}
              </motion.span>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
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
        {/* ===== PROCESS (Flow UI on white bg) ===== */}
        <section className="bg-white py-20 px-4 md:px-8">
          <div className="mx-auto w-full max-w-7xl">
            <h2 className="mb-6 text-left text-sm font-semibold tracking-wide sm:text-base lg:text-2xl">
              PROCESS</h2>
              <ProcessFlow lang={lang as "KOR" | "ENG"} />
              </div>
              </section>


        <hr className="my-6 w-full border-gray-200" />
      </main>
    </Layout>
  );
}
