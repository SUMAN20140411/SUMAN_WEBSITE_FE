"use client";

import Head from "next/head";
import Layout from "@/components/Layout";
import HeroSection from "@/components/HeroSection";
import BreadcrumbSection from "@/components/BreadcrumbSection";
import { motion, Variants, Transition } from "framer-motion";
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
  Heart,
  Star,
  Brain,
  Zap,
} from "lucide-react";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const staggerChildren: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { 
      staggerChildren: 0.2, 
      delayChildren: 0.3,
      duration: 0.6
    } 
  },
};

const zoomIn: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { duration: 0.8, ease: "easeOut" } 
  },
};

const slideInRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { duration: 0.8, ease: "easeOut", delay: 0.4 } 
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
          <HeroSection
            title={hero.title}
            backgroundImage="/images/sub_banner/company_banner.png"
          />

          <div className="relative z-20 -mt-8 sm:-mt-10">
            <BreadcrumbSection path={lang === "KOR" ? "회사소개 > 기업 비전" : "Company > Vision"} />
          </div>

          {/* Our Value Section */}
          <motion.section
            className="bg-white"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="max-w-7xl mx-auto px-6 md:px-[60px] lg:px-[0px] py-8 lg:py-12 ">
              <div className="space-y-4 text-left">
                <h3 className="text-3xl md:text-4xl font-bold text-slate-800">
                  {lang === "KOR" ? "Our Vision" : "Our Vision"}
                </h3>
              </div>
            </div>
          </motion.section>

          {/* Strategy & KPI */}
          <motion.section
            className="relative bg-white"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
          >
            <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-slate-50 to-slate-100" />
            <div className="max-w-7xl mx-auto px-6 md:px-[60px] lg:px-[0px] pb-16 lg:pb-20 space-y-16">
              <div className="grid gap-10 lg:grid-cols-[1.25fr_1fr] lg:items-start">
                <motion.div 
                  className="space-y-8" 
                  variants={slideInLeft}
                  initial="hidden" 
                  animate="visible"
                >
                  <motion.div
                    variants={staggerChildren}
                    initial="hidden"
                    animate="visible"
                    className="space-y-6"
                  >
                   
                    <motion.h1
                      variants={fadeInUp}
                      className="text-4xl md:text-5xl font-black leading-tight text-slate-900 mb-8 "
                    >
                      <span className="block text-sky-600">{overview.blueTitle}</span>
                      <span className="block">{overview.blackTitle}</span>
                    </motion.h1>
                  </motion.div>
                  
                  <motion.div
                    variants={zoomIn}
                    className="rounded-3xl border border-sky-100 bg-gradient-to-br from-sky-500/10 via-white to-white p-8 shadow-inner "
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
                  variants={slideInRight}
                  initial="hidden"
                  animate="visible"
                  className="rounded-3xl border border-sky-100 bg-gradient-to-br from-sky-500/10 via-white to-white p-8 shadow-inner mt- lg:mt-1"
                >
                  <motion.div 
                    className="space-y-6"
                    variants={staggerChildren}
                    initial="hidden"
                    animate="visible"
                  >
                    {kpiCards.map((card, index) => {
                      const Icon = card.icon;
                      return (
                        <motion.div
                          key={card.label}
                          variants={zoomIn}
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
                  </motion.div>
                </motion.div>
              </div>

              <div>
                <motion.h3
                  variants={fadeInUp}
                  className="text-xl md:text-2xl font-semibold text-slate-900"
                >
                  {lang === "KOR" ? "단계별 성장 로드맵" : "Staged Growth Roadmap"}
                </motion.h3>
                <div className="relative mt-16">
                  {/* Vision Timeline Above Cards */}
                  <div className="relative mb-12 hidden md:block">
                    {/* Timeline line with year markers */}
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                      className="relative h-1 mx-6 rounded-full bg-gradient-to-r from-sky-200 via-sky-300 to-sky-400 origin-left"
                    >
                      {/* Timeline markers */}
                      <div className="absolute left-0 top-1/2 transform -translate-y-1/2">
                        <div className="w-3 h-3 rounded-full bg-sky-300 border-2 border-white shadow-md"></div>
                        <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-semibold text-sky-600">2024</span>
                      </div>
                      
                      <div className="absolute left-1/2 top-1/2 transform -translate-y-1/2 -translate-x-1/2">
                        <div className="w-3 h-3 rounded-full bg-sky-400 border-2 border-white shadow-md"></div>
                        <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-semibold text-sky-600">2026</span>
                      </div>
                      
                      <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
                        <div className="w-3 h-3 rounded-full bg-sky-500 border-2 border-white shadow-md"></div>
                        <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-semibold text-sky-600">2028</span>
                      </div>
                    </motion.div>
                  </div>
                  
                  <div className="relative grid gap-6 md:grid-cols-3">
                    {milestones.map((item, index) => (
                      <motion.div
                        key={item.year}
                        variants={zoomIn}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        className="group relative rounded-2xl bg-gradient-to-b from-white via-sky-50/30 to-sky-100/60 p-6 text-left shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-500/10 text-sky-600">
                            <span className="text-lg font-bold">{index + 1}</span>
                          </div>
                          <div className="flex-1">
                            <p className="whitespace-pre-line text-sm text-slate-600 leading-relaxed">
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
            <motion.div
              className="pointer-events-none absolute inset-x-0 top-8 -z-10 h-40 bg-gradient-to-r from-sky-100/50 via-white to-emerald-100/40 blur-2xl"
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 8, repeat: Infinity, repeatType: "mirror" }}
            />
            <div className="relative mt-8 max-w-7xl mx-auto px-6 md:px-[60px] lg:px-[0px]">
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-xl md:text-2xl font-semibold text-slate-900"
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
                  const icons = [Handshake, Star, Brain, Zap];
                  const Icon = icons[idx % icons.length];
                  return (
                    <motion.div
                      key={cv.title}
                      variants={zoomIn}
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.3 }}
                      className="group relative rounded-2xl bg-gradient-to-b from-white via-sky-50/30 to-sky-100/60 p-6 text-left shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                    >
                      <div className="flex flex-col text-left">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-500/10 text-sky-600 mb-3">
                          <Icon className="h-6 w-6" />
                        </div>
                        <h4 className="text-lg font-semibold text-slate-900 mb-2 whitespace-pre-line leading-tight">
                          {cv.title}
                        </h4>
                        <p className="whitespace-pre-line text-sm text-slate-600 leading-relaxed">
                          {cv.desc}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
            {/* Tambah spacing di bawah core values */}
            <div className="pb-12"></div>
          </motion.section>
          {/* Biz model */}
          <motion.section 
            className="bg-[#010104] text-white py-20 px-4 md:px-8 rounded-t-3xl overflow-hidden relative"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            style={{
              backgroundImage: 'url("/images/vision_R&D_bg.png")',
              backgroundSize: "cover",
              backgroundPosition: "center 245px",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="max-w-7xl mx-auto px-6 md:px-[60px] lg:px-[0px] py-8 lg:py-12 text-white space-y-10 relative z-10">
              <div className="space-y-4 text-left">
                <h3 className="text-xl md:text-2xl font-semibold text-white">{lang === "KOR" ? "비즈니스 모델" : "Business Model"}</h3>
                <p className="text-base md:text-lg font-medium text-white italic">
                  {lang === "KOR" ? "개방형 혁신으로 미래를 선도합니다" : "Leading the future through open innovation"}
                </p>
              </div>

                {/* Bottom Four Cards - New Style (10% shorter) */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-x-12 gap-y-8 w-full max-w-6xl">
                  {[
                    { title: "자동차 정밀부품가공", desc: "고정밀 자동차 부품\n제조 및 가공 기술" },
                    { title: "이차전지", desc: "차세대 배터리\n기술 개발 및 생산" }, 
                    { title: "반도체·전기전자", desc: "정밀 전자부품\n설계 및 제조" },
                    { title: "차세대 기술·제품", desc: "미래 기술 융합\n혁신 제품 개발" }
                  ].map((sector, index) => (
                    <motion.div
                      key={sector.title}
                      variants={zoomIn}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.3 }}
                      className="relative flex flex-col justify-end p-4 shadow-md overflow-hidden hover:scale-105 transition-transform duration-300 ease-out min-h-[342px]"
                      style={{
                        backgroundImage: `url(/images/vision_${
                          ["Flex", "pro", "tek", "rnbd"][index]
                        }.png)`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        clipPath:
                          "polygon(30px 0%, 100% 0%, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0% 100%, 0% 30px)",
                      }}
                    >
                      <div
                        className="absolute inset-0 bg-black opacity-40"
                        style={{
                          clipPath:
                            "polygon(30px 0%, 100% 0%, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0% 100%, 0% 30px)",
                        }}
                      ></div>
                      <div className="relative text-white flex flex-col flex-grow justify-start pt-54">
                        <h3 className="text-[23px] font-semibold mb-2">
                          {sector.title}
                        </h3>
                        <p className="text-[14px] whitespace-pre-line">
                          {sector.desc}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
            </div>
          </motion.section>
        </div>
      </main>
      <hr className="w-full border-gray-200 mt-0 mb-0" />
    </Layout>
  );
}
