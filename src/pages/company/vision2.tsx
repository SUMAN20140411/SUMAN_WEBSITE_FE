"use client";

import { motion, type Transition, type Variants } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useLangStore } from "@/stores/langStore";
import {
  visionHeroText,
  visionMainText,
  visionStrategyText,
  visionCoreValue,
  visionMilestones,
  visionRndText,
  visionCoreTechnology,
  visionBusinessModel,
  visionNetworkData,
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
  Settings,
  Zap,
  CheckCircle,
} from "lucide-react";

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
        <span className="text-lg md:text-xl text-slate-500">{suffix}</span>
      ) : null}
    </motion.span>
  );
};

const CircularProgress = ({
  percentage,
  size = 120,
  strokeWidth = 8,
  className = "",
}: {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`;

  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <svg className="transform -rotate-90" width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          className="text-slate-200"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeLinecap="round"
          className="text-blue-600"
          initial={{ strokeDasharray: `0 ${circumference}` }}
          whileInView={{ strokeDasharray }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xl font-bold text-slate-900">{percentage}%</span>
      </div>
    </div>
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
  const coreTech = visionCoreTechnology[lang];
  const bizModel = visionBusinessModel[lang];
  const networkData = visionNetworkData[lang];

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
    <main className="relative min-h-screen overflow-hidden bg-white text-slate-900">
      <motion.div
        className="pointer-events-none absolute -top-32 -left-20 h-80 w-80 -z-10 rounded-full bg-blue-200/60 blur-3xl"
        animate={{ x: [-20, 30, -15], y: [0, 25, -20] }}
        transition={floatTransition}
      />
      <motion.div
        className="pointer-events-none absolute bottom-[-12rem] right-[-12rem] h-[28rem] w-[28rem] -z-10 rounded-full bg-slate-200/40 blur-3xl"
        animate={{ x: [0, -40, 20], y: [10, -30, 15] }}
        transition={{ ...floatTransition, duration: 16 }}
      />

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="relative py-20 px-4 md:px-8 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.3),_transparent_60%)]" />
          <div className="relative max-w-6xl mx-auto text-center text-white space-y-6">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold"
            >
              {hero.title}
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-4"
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/20 px-4 py-2 text-sm font-semibold uppercase tracking-widest text-blue-200">
                {overview.topLabel}
              </div>
              <h2 className="text-2xl md:text-4xl font-bold">
                <span className="block text-blue-400">{overview.blueTitle}</span>
                <span className="block text-white">{overview.blackTitle}</span>
              </h2>
            </motion.div>
          </div>
        </section>

        {/* Vision overview */}
        <motion.section
          className="relative py-16 md:py-20 px-4 md:px-8"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-blue-50/70 via-white to-white" />
          <div className="max-w-6xl mx-auto">
            <div className="grid gap-10 lg:grid-cols-[1.25fr_1fr] lg:items-center">
              <motion.div
                className="space-y-6"
                variants={staggerChildren}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <motion.p variants={fadeInUp} className="text-lg md:text-xl text-slate-600 leading-relaxed">
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
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-transparent to-white opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      <div className="relative flex items-start gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600">
                          <Icon className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-900">{card.title}</h3>
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

        {/* Core Technology Infographic */}
        <motion.section
          className="relative py-16 md:py-20 px-4 md:px-8"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-slate-50 to-white" />
          <div className="max-w-7xl mx-auto">
            <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center">
              {/* Left side - Content */}
              <motion.div
                className="space-y-8"
                variants={staggerChildren}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <div className="space-y-4">
                  <motion.h2 variants={fadeInUp} className="text-lg font-semibold text-slate-600">
                    {coreTech.title}
                  </motion.h2>
                  <motion.h3
                    variants={fadeInUp}
                    className="text-3xl md:text-4xl font-bold text-slate-900 whitespace-pre-line"
                  >
                    {coreTech.subtitle}
                  </motion.h3>
                </div>

                {/* Technology sections */}
                <motion.div className="space-y-4" variants={staggerChildren}>
                  {coreTech.sections.map((section, index) => {
                    const icons = [Factory, Settings, Zap];
                    const Icon = icons[index];
                    return (
                      <motion.div
                        key={section.title}
                        variants={zoomIn}
                        className="flex items-start gap-4 p-4 rounded-xl border border-blue-100 bg-blue-50/30"
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-900 whitespace-pre-line">{section.title}</h4>
                          <p className="text-sm text-slate-600 mt-1">{section.description}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>

                {/* Detail sections */}
                <motion.div className="grid gap-4 md:grid-cols-3" variants={staggerChildren}>
                  {coreTech.detailTitles.map((title, index) => (
                    <motion.div key={title} variants={zoomIn} className="p-4 rounded-xl border border-slate-200 bg-white shadow-sm">
                      <h5 className="font-semibold text-blue-600 mb-2">{title}</h5>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {coreTech.detailDescriptions[index]}
                      </p>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              {/* Right side - Visual */}
              <motion.div variants={zoomIn} className="relative flex items-center justify-center">
                <Image
                  src="/image/company/vision2/core.png"
                  alt="Core Technology Infographic"
                  width={1600}
                  height={900}
                  className="w-full h-auto max-w-lg rounded-2xl shadow-lg"
                  priority
                />
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Business Model Circular Infographic */}
        <motion.section
          className="relative py-16 md:py-20 px-4 md:px-8"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-900 via-slate-800 to-blue-900" />
          <div className="max-w-7xl mx-auto text-white">
            <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-center">
              {/* Left side - Content */}
              <motion.div
                className="space-y-8"
                variants={staggerChildren}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <div className="space-y-4">
                  <motion.p variants={fadeInUp} className="text-blue-200 text-sm uppercase tracking-wider">
                    {bizModel.subtitle}
                  </motion.p>
                  <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold">
                    {bizModel.title}
                  </motion.h2>
                </div>

                <motion.div className="space-y-4" variants={staggerChildren}>
                  {bizModel.items.map((item) => (
                    <motion.div
                      key={item.label}
                      variants={zoomIn}
                      className="flex items-center gap-6 p-4 rounded-xl border border-white/10 bg-white/5"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white font-bold">
                        {item.label}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold mb-1">{item.title}</h4>
                        <p className="text-sm text-white/80">{item.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue-400">{item.percentage}%</div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              {/* Right side - Visual */}
              <motion.div variants={zoomIn} className="relative flex items-center justify-center">
                <Image
                  src="/image/company/vision2/core.png"
                  alt="Business Model Infographic"
                  width={1600}
                  height={900}
                  className="w-full h-auto max-w-lg"
                />
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Network Visualization */}
        <motion.section
          className="relative py-16 md:py-20 px-4 md:px-8"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-blue-50/30 to-white" />
          <div className="max-w-7xl mx-auto">
            <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center">
              {/* Left side - Visual */}
              <motion.div variants={zoomIn} className="relative flex items-center justify-center">
                <Image
                  src="/image/company/vision2/core.png"
                  alt="Network Visualization"
                  width={1600}
                  height={900}
                  className="w-full h-auto max-w-lg"
                />
              </motion.div>

              {/* Right side - Content */}
              <motion.div
                className="space-y-6"
                variants={staggerChildren}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-slate-900">
                  {lang === "KOR" ? "네트워크 연결성" : "Network Connectivity"}
                </motion.h2>

                <motion.div className="grid gap-4" variants={staggerChildren}>
                  {networkData.nodes.map((node) => (
                    <motion.div
                      key={node.id}
                      variants={zoomIn}
                      whileHover={{ x: 8 }}
                      className={`p-5 rounded-xl border-l-4 ${
                        node.isTarget ? "border-l-green-500 bg-green-50" : "border-l-blue-500 bg-blue-50"
                      } shadow-sm`}
                    >
                      <div className="flex items-center gap-4 mb-3">
                        <div
                          className={`flex h-12 w-12 items-center justify-center rounded-full font-bold text-white ${
                            node.isTarget ? "bg-green-500" : "bg-blue-600"
                          }`}
                        >
                          {node.id}
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-900">{node.title}</h4>
                          {node.isTarget && <CheckCircle className="h-5 w-5 text-green-500 mt-1" />}
                        </div>
                      </div>
                      <p className="text-sm text-slate-600 leading-relaxed">{node.description}</p>
                    </motion.div>
                  ))}
                </motion.div>
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
              <motion.div
                className="space-y-6"
                variants={staggerChildren}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <motion.span variants={fadeInUp} className="text-sm font-semibold uppercase tracking-widest text-blue-600">
                  {strategy.subtitle}
                </motion.span>
                <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-slate-900">
                  {strategy.title}
                </motion.h2>
                <motion.div
                  variants={zoomIn}
                  className="rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-500/10 via-white to-white p-8 shadow-inner"
                >
                  <p className="text-sm font-semibold uppercase tracking-widest text-blue-500">
                    {strategy.neoTitle}
                  </p>
                  <p className="mt-4 whitespace-pre-line leading-relaxed text-slate-700">{strategy.mainGoal}</p>
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
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600">
                          <Icon className="h-6 w-6" />
                        </div>
                        <div>
                          <AnimatedCounter end={card.value} suffix={card.suffix} />
                          <p className="text-sm text-slate-500">{card.label}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </div>

            <div>
              <motion.h3 variants={fadeInUp} className="text-xl font-semibold text-slate-900">
                {lang === "KOR" ? "단계별 성장 로드맵" : "Staged Growth Roadmap"}
              </motion.h3>
              <div className="relative mt-8">
                <motion.span
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  className="absolute left-6 right-6 top-6 hidden h-1 origin-left rounded-full bg-gradient-to-r from-blue-100 via-blue-300 to-blue-500 md:block"
                />
                <div className="relative grid gap-6 md:grid-cols-3">
                  {milestones.map((item, index) => (
                    <motion.div
                      key={item.year}
                      variants={zoomIn}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.3 }}
                      className="group relative rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/10 text-blue-600">
                          <span className="font-bold">{index + 1}</span>
                        </div>
                        <div>
                          <p className="text-sm font-semibold uppercase tracking-wider text-blue-500">{item.year}</p>
                          <p className="mt-2 whitespace-pre-line text-sm text-slate-600 leading-relaxed">{item.text}</p>
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
            className="pointer-events-none absolute inset-x-0 top-8 -z-10 h-40 bg-gradient-to-r from-blue-100/50 via-white to-slate-100/40 blur-2xl"
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
                    <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50/60 to-white opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <div className="relative flex flex-col gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600">
                        <Icon className="h-6 w-6" />
                      </div>
                      <h4 className="font-semibold text-slate-900">{cv.title}</h4>
                      <p className="text-sm text-slate-600 whitespace-pre-line leading-relaxed">{cv.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

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
            className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-500/30 blur-3xl"
            animate={{ opacity: [0.4, 0.8, 0.4], scale: [0.9, 1.05, 0.95] }}
            transition={{ duration: 10, repeat: Infinity, repeatType: "mirror" }}
          />

          <div className="relative z-10 max-w-6xl mx-auto text-white space-y-12">
            <div className="text-center space-y-4">
              <span className="inline-flex items-center justify-center gap-2 rounded-full bg-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-widest text-blue-200">
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
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-blue-200">
                          <Icon className="h-6 w-6" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-white">{item.title}</h4>
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
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.35),_transparent_65%)]" />
                <div className="relative space-y-6">
                  <p className="text-sm font-semibold uppercase tracking-widest text-blue-200">
                    {rnd.rightBoxTop}
                  </p>
                  <h4 className="text-2xl md:text-3xl font-bold text-white">{rnd.rightBoxTitle}</h4>
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
  );
}
