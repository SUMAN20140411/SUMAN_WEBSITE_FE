"use client";

import Head from "next/head";
import Layout from "@/components/Layout";
import HeroSection from "@/components/HeroSection";
import BreadcrumbSection from "@/components/BreadcrumbSection";
import { motion } from "framer-motion";
import Image from "next/image";
import { useLangStore } from "@/stores/langStore";
import {
  visionHeroText,
  visionMainText,
  visionStrategyText,
  visionCoreValue,
  visionMilestones,
  visionRndText,
} from "@/data/vision2";
import { Cpu, Handshake, Globe2, Leaf, Target, LineChart, Users, Lightbulb, Layers, FlaskConical } from "lucide-react";

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.42, 0, 0.58, 1] }, // FIXED
  },
};
const stagger = {
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.2 }
  },
};
export default function Vision2Page() {
  const { lang } = useLangStore();

  // Data
  const hero = visionHeroText[lang];
  const overview = visionMainText[lang];
  const strategy = visionStrategyText[lang];
  const coreValues = visionCoreValue[lang];
  const milestones = visionMilestones[lang];
  const rnd = visionRndText[lang];

  // Example images (replace with your actual images)
  const images = [
    "/images/company/vision_banner.jpg",
    "/images/company/vision_team.jpg",
    "/images/business/process/coreKor2.png",
    "/images/business/process/FLOWKOREA.png",
    "/images/company/vision_factory.jpg",
  ];

  return (
    <Layout>
      <Head>
        <title>{hero.title}</title>
      </Head>
      <main className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-slate-100 text-slate-900 pt-[90px]">
        {/* Hero Section */}
        <section className="relative">
          <HeroSection
            title={hero.title}
            backgroundImage={images[0]}
          />
          <BreadcrumbSection path={lang === "KOR" ? "회사소개 > 기업 비전" : "Company > Vision"} />
        </section>

        {/* Vision Overview with Image */}
        <section className="relative py-16 px-4 md:px-8">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: [0.42, 0, 0.58, 1] }} // FIX
              className="space-y-6"
            >
              <span className="inline-block rounded-full bg-sky-100 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-sky-600 mb-4">
                {overview.topLabel}
              </span>
              <h1 className="text-4xl md:text-5xl font-black leading-tight mb-2">
                <span className="block text-sky-600">{overview.blueTitle}</span>
                <span className="block text-slate-900">{overview.blackTitle}</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-600 leading-relaxed mt-4">
                {lang === "KOR"
                  ? "고객의 니즈를 총체적으로 해결하는 토탈 솔루션 기업으로의 여정을 시각화했습니다."
                  : "We visualise our journey toward becoming a total solution partner that answers every customer demand."}
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="rounded-2xl overflow-hidden shadow-lg border-4 border-sky-100"
            >
              <Image
                src={images[1]}
                alt="Vision Team"
                width={600}
                height={400}
                className="object-cover w-full h-full"
              />
            </motion.div>
          </div>
        </section>

        {/* Highlight Cards with Icons */}
        <section className="py-10 px-4 md:px-8 bg-gradient-to-r from-white via-sky-50 to-slate-100">
          <motion.div
            className="grid gap-6 sm:grid-cols-2 md:grid-cols-4 max-w-6xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
          >
            {(lang === "KOR"
              ? [
                  { icon: Globe2, title: "글로벌 기술 확장", desc: "핵심 역량을 기반으로 글로벌 솔루션 네트워크를 구축합니다." },
                  { icon: Handshake, title: "파트너십 강화", desc: "산학연 협업으로 혁신적인 비즈니스 기회를 발굴합니다." },
                  { icon: Cpu, title: "스마트 제조 혁신", desc: "스마트 공정과 데이터 기반 운영으로 생산성을 높입니다." },
                  { icon: Leaf, title: "지속 가능한 가치", desc: "ESG와 품질 중심 경영으로 장기적인 신뢰를 만들어갑니다." },
                ]
              : [
                  { icon: Globe2, title: "Global Technology Reach", desc: "Build a worldwide solution network anchored in our core capabilities." },
                  { icon: Handshake, title: "Stronger Partnerships", desc: "Create innovative business opportunities through strategic collaborations." },
                  { icon: Cpu, title: "Smart Manufacturing", desc: "Boost productivity with smart processes and data-driven operations." },
                  { icon: Leaf, title: "Sustainable Value", desc: "Deliver long-term trust with ESG- and quality-focused management." },
                ]
            ).map((card, idx) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.title}
                  transition={{ duration: 0.7, ease: [0.42, 0, 0.58, 1] }} // FIX
                  className="rounded-2xl border border-sky-100 bg-white p-6 shadow hover:shadow-lg transition-shadow flex flex-col items-center"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-sky-500/10 text-sky-600 mb-3">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-lg font-semibold text-center">{card.title}</h3>
                  <p className="text-sm text-slate-600 text-center mt-2">{card.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </section>

        {/* Timeline Diagram for Milestones */}
        <section className="py-16 px-4 md:px-8 bg-white">
          <div className="max-w-5xl mx-auto">
            <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-8 text-center">
              {lang === "KOR" ? "단계별 성장 로드맵" : "Staged Growth Roadmap"}
            </h3>
            <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
              {milestones.map((item, idx) => (
                <div key={item.year} className="flex flex-col items-center w-full">
                  <div className="relative">
                    <div className="flex items-center justify-center h-14 w-14 rounded-full bg-sky-500/10 text-sky-600 border-2 border-sky-300 shadow-lg">
                      <span className="text-xl font-bold">{item.year}</span>
                    </div>
                    {idx < milestones.length - 1 && (
                      <div className="absolute left-1/2 top-full w-1 h-12 md:w-12 md:h-1 bg-sky-300" />
                    )}
                  </div>
                  <div className="mt-4 text-center">
                    <p className="text-sm text-slate-700 whitespace-pre-line">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Strategy Section with Image */}
        <section className="relative py-16 px-4 md:px-8 bg-gradient-to-br from-sky-50 via-white to-slate-100">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: [0.42, 0, 0.58, 1] }} // FIX
              className="space-y-6"
            >
              <span className="text-sm font-semibold uppercase tracking-widest text-sky-600">
                {strategy.subtitle}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold">{strategy.title}</h2>
              <div className="rounded-2xl border border-sky-100 bg-white p-6 shadow">
                <p className="text-sm font-semibold uppercase tracking-widest text-sky-500">
                  {strategy.neoTitle}
                </p>
                <p className="mt-4 whitespace-pre-line text-base md:text-lg leading-relaxed text-slate-700">
                  {strategy.mainGoal}
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="rounded-2xl overflow-hidden shadow-lg border-4 border-sky-100"
            >
              <Image
                src={images[2]}
                alt="Core Capabilities"
                width={600}
                height={400}
                className="object-contain w-full h-full bg-white"
              />
            </motion.div>
          </div>
        </section>

        {/* KPI Cards */}
        <section className="py-10 px-4 md:px-8 bg-white">
          <div className="max-w-4xl mx-auto grid gap-8 md:grid-cols-2">
            {[
              {
                icon: Target,
                value: lang === "KOR" ? "600억원" : "600B KRW",
                label: lang === "KOR" ? "목표 매출액" : "Target Revenue",
                image: images[3],
              },
              {
                icon: LineChart,
                value: lang === "KOR" ? "150억원" : "150B KRW",
                label: lang === "KOR" ? "목표 순이익" : "Target Net Profit",
                image: images[4],
              },
            ].map((card, idx) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  className="flex flex-col md:flex-row items-center gap-6 rounded-2xl border border-sky-100 bg-white p-6 shadow"
                >
                  <div className="flex flex-col items-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-sky-500/10 text-sky-600 mb-2">
                      <Icon className="h-7 w-7" />
                    </div>
                    <span className="text-3xl font-extrabold">{card.value}</span>
                    <p className="text-sm text-slate-500">{card.label}</p>
                  </div>
                  <div className="w-full md:w-40 h-32 rounded-xl overflow-hidden border border-sky-100">
                    <Image
                      src={card.image}
                      alt={card.label}
                      width={160}
                      height={128}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Core Values Cards */}
        <section className="py-16 px-4 md:px-8 bg-gradient-to-r from-sky-50 via-white to-slate-100">
          <div className="max-w-6xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-semibold text-slate-900 mb-8 text-center">
              {lang === "KOR" ? "핵심 가치" : "Core Values"}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {coreValues.map((cv, idx) => {
                const icons = [Users, Lightbulb, Layers, FlaskConical];
                const Icon = icons[idx % icons.length];
                return (
                  <div key={cv.title} className="rounded-2xl border border-sky-100 bg-white p-6 shadow flex flex-col items-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-sky-500/10 text-sky-600 mb-3">
                      <Icon className="h-7 w-7" />
                    </div>
                    <h4 className="text-lg font-semibold text-center text-slate-900">{cv.title}</h4>
                    <p className="text-sm text-slate-600 text-center whitespace-pre-line mt-2">{cv.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* R&D Vision with Image */}
        <section className="py-16 px-4 md:px-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block rounded-full bg-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-widest text-sky-200 mb-4">
                {rnd.title}
              </span>
              <h3 className="text-3xl md:text-4xl font-bold leading-tight whitespace-pre-line text-slate-50 mb-6">
                {rnd.subtitle}
              </h3>
              <div className="grid gap-6">
                {[rnd.leftBox1Title, rnd.leftBox2Title].map((title, i) => (
                  <div key={title} className="rounded-2xl border border-white/15 bg-white/10 p-6 shadow-lg backdrop-blur flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-sky-200">
                      {i === 0 ? <Cpu className="h-6 w-6" /> : <FlaskConical className="h-6 w-6" />}
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white">{title}</h4>
                      <p className="mt-2 text-sm text-slate-200 leading-relaxed">{i === 0 ? rnd.leftBox1Desc : rnd.leftBox2Desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg border-4 border-sky-100 bg-white/10">
              <Image
                src={images[4]}
                alt="R&D Vision"
                width={600}
                height={400}
                className="object-cover w-full h-full"
              />
              <div className="p-6">
                <p className="text-sm font-semibold uppercase tracking-widest text-sky-200">
                  {rnd.rightBoxTop}
                </p>
                <h4 className="text-2xl md:text-3xl font-bold text-white mt-2">
                  {rnd.rightBoxTitle}
                </h4>
                <p className="text-sm md:text-base whitespace-pre-line text-slate-100 leading-relaxed mt-2">
                  {rnd.rightBoxDesc}
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}