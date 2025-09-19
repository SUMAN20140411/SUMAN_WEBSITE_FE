"use client";

import Head from "next/head";
import Layout from "@/components/Layout";
import HeroSection from "@/components/HeroSection";
import BreadcrumbSection from "@/components/BreadcrumbSection";
import { motion, type Transition, type Variants } from "framer-motion";
import { useEffect, useState } from "react";
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

export default function Vision2Page() {
  const { lang } = useLangStore();

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
          {
            icon: Target,
            value: 600,
            suffix: "억원",
            label: "목표 매출액",
          },
          {
            icon: LineChart,
            value: 150,
            suffix: "억원",
            label: "목표 순이익",
          },
        ]
      : [
          {
            icon: Target,
            value: 600,
            suffix: "B KRW",
            label: "Target Revenue",
          },
          {
            icon: LineChart,
            value: 150,
            suffix: "B KRW",
            label: "Target Net Profit",
          },
        ];

  const overviewDescription =
    lang === "KOR"
      ? "고객의 니즈를 총체적으로 해결하는 토탈 솔루션 기업으로의 여정을 시각화했습니다."
      : "We visualise our journey toward becoming a total solution partner that answers every customer demand.";

  return (
    <Layout>
      <Head>
        <title>{lang === "KOR" ? "기업 비전" : "Vision"}</title>
      </Head>
      <main className="relative min-h-screen overflow-hidden bg-white text-slate-900 pt-[90px] pb-24">
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

          {/* Vision overview */}
          <motion.section
            className="relative py-14 md:py-20 px-4 md:px-8"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="absolute inset-0 -z-10 bg-gradient-to-b from-sky-50/70 via-white to-white" />
            <div className="max-w-6xl mx-auto">
              <div className="grid gap-10 lg:grid-cols-[1.25fr_1fr] lg:items-center">
                <motion.div className="space-y-6" variants={staggerChildren} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                  <motion.div
                    variants={fadeInUp}
                    className="inline-flex items-center gap-2 rounded-full bg-sky-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-sky-600"
                  >
                    {/*<Sparkles className="h-4 w-4" />*/}
                    {overview.topLabel}
                  </motion.div>
                  <motion.h1
                    variants={fadeInUp}
                    className="text-4xl md:text-5xl font-black leading-tight text-slate-900"
                  >
                    <span className="block text-sky-600">{overview.blueTitle}</span>
                    <span className="block">{overview.blackTitle}</span>
                  </motion.h1>
                  <motion.p
                    variants={fadeInUp}
                    className="text-lg md:text-xl text-slate-600 leading-relaxed"
                  >
                    {overviewDescription}
                  </motion.p>
                </motion.div>

                <motion.div
                  className="grid gap-4 sm:grid-cols-2"
                  variants={staggerChildren}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                >
                  {highlightCards.map((card) => {
                    const Icon = card.icon;
                    return (
                      <motion.div
                        key={card.title}
                        variants={zoomIn}
                        whileHover={{ y: -8, boxShadow: "0px 20px 35px rgba(15, 23, 42, 0.12)" }}
                        className="group relative overflow-hidden rounded-2xl border border-slate-200/70 bg-white/80 p-5 shadow-sm backdrop-blur"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-sky-50 via-transparent to-white opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                        <div className="relative flex items-start gap-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-500/10 text-sky-600">
                            <Icon className="h-6 w-6" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-slate-900">{card.title}</h3>
                            <p className="mt-2 text-sm text-slate-600 leading-relaxed">{card.desc}</p>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </div>
            </div>
          </motion.section>

          {/* Strategy & KPI */}
          <motion.section
            className="relative py-16 md:py-20 px-4 md:px-8"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-slate-50 to-slate-100" />
            <div className="max-w-6xl mx-auto space-y-12">
              <div className="grid gap-10 lg:grid-cols-[1.25fr_1fr] lg:items-start">
                <motion.div className="space-y-6" variants={staggerChildren} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                  <motion.span variants={fadeInUp} className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-600">
                    {strategy.subtitle}
                  </motion.span>
                  <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-slate-900">
                    {strategy.title}
                  </motion.h2>
                  <motion.div
                    variants={zoomIn}
                    className="rounded-3xl border border-sky-100 bg-gradient-to-br from-sky-500/10 via-white to-white p-8 shadow-inner"
                  >
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-500">
                      {strategy.neoTitle}
                    </p>
                    <p className="mt-4 whitespace-pre-line text-base md:text-lg leading-relaxed text-slate-700">
                      {strategy.mainGoal}
                    </p>
                  </motion.div>
                </motion.div>

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
              </div>

              <div>
                <motion.h3
                  variants={fadeInUp}
                  className="text-lg md:text-xl font-semibold text-slate-900"
                >
                  {lang === "KOR" ? "단계별 성장 로드맵" : "Staged Growth Roadmap"}
                </motion.h3>
                <div className="relative mt-8">
                  <motion.span
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="absolute left-6 right-6 top-6 hidden h-1 origin-left rounded-full bg-gradient-to-r from-sky-100 via-sky-300 to-sky-500 md:block"
                  />
                  <div className="relative grid gap-6 md:grid-cols-3">
                    {milestones.map((item, index) => (
                      <motion.div
                        key={item.year}
                        variants={zoomIn}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        className="group relative rounded-2xl border border-slate-200 bg-white/80 p-6 text-left shadow-sm backdrop-blur"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-500/10 text-sky-600">
                            <span className="text-lg font-bold">{index + 1}</span>
                          </div>
                          <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-500">
                              {item.year}
                            </p>
                            <p className="mt-2 whitespace-pre-line text-sm text-slate-600 leading-relaxed">
                              {item.text}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Core values */}
          <section className="relative py-16 md:py-20 px-4 md:px-8">
            <motion.div
              className="pointer-events-none absolute inset-x-0 top-8 -z-10 h-40 bg-gradient-to-r from-sky-100/50 via-white to-emerald-100/40 blur-2xl"
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 8, repeat: Infinity, repeatType: "mirror" }}
            />
            <div className="max-w-6xl mx-auto">
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-2xl md:text-3xl font-semibold text-slate-900"
              >
                {lang === "KOR" ? "핵심 가치" : "Core Values"}
              </motion.h3>
              <motion.div
                className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"
                variants={staggerChildren}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                {coreValues.map((cv, idx) => {
                  const icons = [Users, Lightbulb, Layers, FlaskConical];
                  const Icon = icons[idx % icons.length];
                  return (
                    <motion.div
                      key={cv.title}
                      variants={zoomIn}
                      whileHover={{ y: -6, boxShadow: "0px 16px 30px rgba(15, 23, 42, 0.1)" }}
                      className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white/80 p-6 shadow-sm backdrop-blur"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-white via-sky-50/60 to-white opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      <div className="relative flex flex-col gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-500/10 text-sky-600">
                          <Icon className="h-6 w-6" />
                        </div>
                        <h4 className="text-lg font-semibold text-slate-900">{cv.title}</h4>
                        <p className="text-sm text-slate-600 whitespace-pre-line leading-relaxed">{cv.desc}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </section>

          {/* Biz model */}
          <motion.section
            className="relative py-16 md:py-20 px-4 md:px-8"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
            <div className="absolute inset-0 -z-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.3),_transparent_60%)]" />
            <div className="relative max-w-6xl mx-auto text-white space-y-10">
              <div className="space-y-4 text-center md:text-left">
                <h3 className="text-3xl md:text-4xl font-bold">{strategy.bizModelTitle}</h3>
                <p className="text-base md:text-lg whitespace-pre-line text-slate-200">
                  {strategy.bizModelSubtitle}
                </p>
              </div>

              <motion.div
                className="grid grid-cols-1 gap-6 md:grid-cols-3"
                variants={staggerChildren}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                {[
                  {
                    title: "R&BD / Development",
                    description: strategy.businessAreas.development,
                    icon: ClipboardList,
                  },
                  {
                    title: "Manufacturing",
                    description: strategy.businessAreas.manufacturing,
                    icon: Factory,
                  },
                  {
                    title: "Partnerships",
                    description: strategy.businessAreas.partnerships,
                    icon: Handshake,
                  },
                ].map((card) => {
                  const Icon = card.icon;
                  return (
                    <motion.div
                      key={card.title}
                      variants={zoomIn}
                      whileHover={{ y: -6 }}
                      className="rounded-2xl border border-white/10 bg-white/10 p-6 shadow-lg backdrop-blur"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-sky-200">
                        <Icon className="h-6 w-6" />
                      </div>
                      <h4 className="mt-4 text-lg font-semibold">{card.title}</h4>
                      <p className="mt-3 whitespace-pre-line text-sm text-slate-200 leading-relaxed">
                        {card.description}
                      </p>
                    </motion.div>
                  );
                })}
              </motion.div>

              <motion.div
                variants={zoomIn}
                className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-200">
                  {lang === "KOR" ? "전략 분야" : "Strategic Sectors"}
                </p>
                <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
                  {strategy.businessAreas.sectors.map((sector) => (
                    <motion.div
                      key={sector}
                      whileHover={{ y: -4 }}
                      className="rounded-xl border border-white/10 bg-white/10 p-4 text-center text-sm text-slate-100 backdrop-blur"
                    >
                      <span className="whitespace-pre-line leading-relaxed">{sector}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.section>

          {/* R&D vision */}
          <motion.section
            className="relative overflow-hidden py-16 md:py-20 px-4 md:px-8"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
            <motion.div
              className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-sky-500/30 blur-3xl"
              animate={{ opacity: [0.4, 0.8, 0.4], scale: [0.9, 1.05, 0.95] }}
              transition={{ duration: 10, repeat: Infinity, repeatType: "mirror" }}
            />
            <motion.div
              className="pointer-events-none absolute bottom-[-6rem] right-[-6rem] h-96 w-96 rounded-full bg-emerald-400/20 blur-3xl"
              animate={{ opacity: [0.3, 0.7, 0.3], scale: [0.8, 1.1, 0.9] }}
              transition={{ duration: 12, repeat: Infinity, repeatType: "mirror" }}
            />

            <div className="relative z-10 max-w-6xl mx-auto text-white space-y-12">
              <div className="text-center md:text-left space-y-4">
                <span className="inline-flex items-center justify-center gap-2 rounded-full bg-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-sky-200">
                  {rnd.title}
                </span>
                <h3 className="text-3xl md:text-4xl font-bold leading-tight whitespace-pre-line text-slate-50">
                  {rnd.subtitle}
                </h3>
              </div>

              <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
                <motion.div
                  className="space-y-6"
                  variants={staggerChildren}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                >
                  {[
                    {
                      title: rnd.leftBox1Title,
                      desc: rnd.leftBox1Desc,
                      icon: ClipboardList,
                    },
                    {
                      title: rnd.leftBox2Title,
                      desc: rnd.leftBox2Desc,
                      icon: FlaskConical,
                    },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <motion.div
                        key={item.title}
                        variants={zoomIn}
                        whileHover={{ y: -6 }}
                        className="rounded-3xl border border-white/15 bg-white/10 p-6 shadow-lg backdrop-blur"
                      >
                        <div className="flex items-center gap-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-sky-200">
                            <Icon className="h-6 w-6" />
                          </div>
                          <div>
                            <h4 className="text-lg font-semibold text-white">{item.title}</h4>
                            <p className="mt-2 text-sm whitespace-pre-line text-slate-200 leading-relaxed">
                              {item.desc}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>

                <motion.div
                  variants={zoomIn}
                  className="relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br from-white/15 via-white/10 to-white/5 p-8 shadow-xl backdrop-blur"
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.35),_transparent_65%)]" />
                  <div className="relative space-y-6">
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-200">
                      {rnd.rightBoxTop}
                    </p>
                    <h4 className="text-2xl md:text-3xl font-bold text-white">
                      {rnd.rightBoxTitle}
                    </h4>
                    <p className="text-sm md:text-base whitespace-pre-line text-slate-100 leading-relaxed">
                      {rnd.rightBoxDesc}
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.section>
        </div>
      </main>
      <hr className="my-6 border-gray-200 w-full" />
    </Layout>
  );
}
