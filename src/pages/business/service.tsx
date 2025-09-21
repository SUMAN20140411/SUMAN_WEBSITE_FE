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


/** Exact flowchart that scales perfectly and supports KOR/ENG */
function ProcessFlowExact({ lang }: { lang: "KOR" | "ENG" }) {
  const T = (ko: string, en: string) => (lang === "KOR" ? ko : en);

  // Canvas reference size — keeps all geometry aligned while scaling
  const W = 1600;
  const H = 900;

  // Colors / sizes
  const navy = "#0b2a63";
  const navyDark = "#0a1f4a";
  const line = "#12386e";
  const diamondFill = "#E8EBF0"; // soft light gray
  const textWhite = "#ffffff";

  /** helpers */
  const rect = (
    id: string,
    x: number,
    y: number,
    w: number,
    h: number,
    label: string
  ) => (
    <g key={id} style={{ filter: "drop-shadow(0 10px 18px rgba(2,6,23,0.25))" }}>
      <rect
        x={x}
        y={y}
        rx={28}
        ry={28}
        width={w}
        height={h}
        fill={`url(#${id}-grad)`}
        stroke="none"
      />
      {/* gradient per-rect for subtle depth */}
      <defs>
        <linearGradient id={`${id}-grad`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={navy} />
          <stop offset="100%" stopColor={navyDark} />
        </linearGradient>
      </defs>
      <text
        x={x + w / 2}
        y={y + h / 2}
        textAnchor="middle"
        dominantBaseline="middle"
        fill={textWhite}
        fontWeight={800}
        fontSize="44"
      >
        {label}
      </text>
    </g>
  );

  // diamond from bounding box
  const diamond = (
    id: string,
    x: number,
    y: number,
    w: number,
    h: number,
    label: string
  ) => {
    const cx = x + w / 2;
    const cy = y + h / 2;
    const pts = `${cx},${y} ${x + w},${cy} ${cx},${y + h} ${x},${cy}`;
    const lines = label.split("\n");
    return (
      <g key={id} style={{ filter: "drop-shadow(0 6px 12px rgba(2,6,23,0.18))" }}>
        <polygon points={pts} fill={diamondFill} />
        <text
          x={cx}
          y={cy - (lines.length - 1) * 18}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#2b2f37"
          fontWeight={700}
          fontSize="34"
        >
          {lines.map((ln, i) => (
            <tspan key={i} x={cx} dy={i === 0 ? 0 : 36}>
              {ln}
            </tspan>
          ))}
        </text>
      </g>
    );
  };

  /** Nodes (positions tuned to match your image) */
  const nodes = [
    rect("customer", 140, 170, 340, 100, T("Customer", "Customer")),
    rect("concept",  520, 170, 380, 100, T("Concept 설계", "Concept Design")),
    diamond("dr",    935, 160, 140, 120, "D/R"),
    rect("develop", 1120, 170, 380, 100, T("개발/가공 설계", "Dev / Machining Design")),

    rect("partner",  900, 330, 380, 100, T("협력사", "Partner")),
    diamond("review",1125, 370, 190, 130, T("검토승인", "Review Approval")),

    rect("order",   1140, 520, 380, 100, T("발주(소재/부품)", "Order (Material/Parts)")),
    diamond("ininsp", 900, 540, 170, 130, T("수입검사", "Incoming Inspection")),
    rect("machine",  620, 520, 380, 100, T("가공/제작", "Machining / Fabrication")),
    diamond("assm",  300, 520, 260, 160, T("출하 및\n조립/측정검사", "Shipping &\nAssembly / Inspection")),

    rect("pack",     220, 720, 360, 100, T("포장", "Packing")),
    rect("deliver",  620, 720, 360, 100, T("고객사 납품", "Delivery to Customer")),
    diamond("cfeed", 1000, 720, 180, 130, T("고객 Feedback", "Customer Feedback")),
    rect("reorder", 1210, 720, 360, 100, T("Re-Order 개선/반영", "Re-Order / Improve")),
  ];

  /** Links (arrows + NG loops) */
  const links = [
    // top row
    { d: `M 480 220 L 520 220`, label: "" },                          // Customer -> Concept
    { d: `M 900 220 L 935 220`, label: "" },                          // Concept -> D/R
    { d: `M 1075 220 L 1120 220`, label: "" },                        // D/R -> Develop

    // D/R NG: up -> left -> down to Concept top
    { d: `M 1005 160 L 1005 90 L 710 90 L 710 170`, label: "NG", lx: 860, ly: 70 },

    // Develop -> Review (vertical)
    { d: `M 1310 270 L 1310 370`, label: "" },
    { d: `M 1310 500 L 1310 520`, label: "" },                        // Review -> Order (down)

    // Review NG loop: Review top -> right up -> over -> down to Develop top
    { d: `M 1310 370 L 1480 370 L 1480 140 L 1310 140 L 1310 170`, label: "NG", lx: 1460, ly: 150 },

    // Order -> Incoming Insp (left)
    { d: `M 1140 570 L 985 570`, label: "" },
    // Incoming Insp -> Partner (up)
    { d: `M 985 540 L 985 430`, label: "NG", lx: 1005, ly: 470, small: true },
    // Incoming Insp -> Machine (left)
    { d: `M 900 570 L 1000 570 L 1000 570 M 900 570 L 740 570`, label: "" },

    // Machine -> Assm/Inspection (left)
    { d: `M 620 570 L 435 570`, label: "" },

    // Assm -> Pack (down)
    { d: `M 300 680 L 300 720`, label: "" },

    // Assm NG loop: Assm top -> up -> across -> down to Machine top
    { d: `M 300 520 L 300 400 L 810 400 L 810 520`, label: "NG", lx: 560, ly: 380 },

    // Pack -> Deliver -> Feedback -> Reorder
    { d: `M 580 770 L 620 770`, label: "" },
    { d: `M 980 770 L 1000 770`, label: "" },
    { d: `M 1090 770 L 1210 770`, label: "" },
  ] as Array<{ d: string; label: string; lx?: number; ly?: number; small?: boolean }>;

  // simple fade-in for the whole chart
  const appear = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6, ease: easeInOut } },
  };

  return (
    <motion.svg
      viewBox={`0 0 ${W} ${H}`}
      className="w-full rounded-xl border border-gray-200 bg-white shadow-sm"
      variants={appear}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
    >
      {/* Arrow marker */}
      <defs>
        <marker id="arrow-blue" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="12" markerHeight="12" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" fill={line} />
        </marker>
      </defs>

      {/* Connectors */}
      <g stroke={line} strokeWidth={6} fill="none" markerEnd="url(#arrow-blue)" strokeLinecap="round">
        {links.map((l, i) => (
          <g key={i}>
            <path d={l.d} />
            {l.label && (
              <text
                x={l.lx ?? 0}
                y={l.ly ?? 0}
                fontSize={l.small ? 30 : 36}
                fontWeight={800}
                fill="#ef4444"
                textAnchor="middle"
              >
                {l.label}
              </text>
            )}
          </g>
        ))}
      </g>

      {/* Nodes */}
      {nodes}
    </motion.svg>
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

        {/* ===== PROCESS (exact flowchart) ===== */}
<section className="bg-white py-20 px-4 md:px-8">
  <div className="mx-auto w-full max-w-7xl">
    <h2 className="mb-6 text-left text-sm font-semibold tracking-wide sm:text-base lg:text-2xl">
      PROCESS
    </h2>
    <ProcessFlowExact lang={lang as "KOR" | "ENG"} />
  </div>
</section>


        <hr className="my-6 w-full border-gray-200" />
      </main>
    </Layout>
  );
}
