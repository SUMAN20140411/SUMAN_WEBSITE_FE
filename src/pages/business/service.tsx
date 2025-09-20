"use client";

import React from "react";
import Head from "next/head";
import Image from "next/image";
import { motion, type Transition } from "framer-motion";
import Layout from "@/components/Layout";
import HeroSection from "@/components/HeroSection";
import BreadcrumbSection from "@/components/BreadcrumbSection";
import { useLangStore } from "@/stores/langStore";
import { serviceContent } from "@/data/service";
import { Settings, PenTool, Package, Layers, ClipboardCheck, Gauge } from "lucide-react";

/* ------------------------------------------------------------------ */
/* CapabilityDiagram (uses same data shape as serviceContent)          */
/* ------------------------------------------------------------------ */
const capabilityData = serviceContent;

interface CapabilityDiagramProps {
  className?: string;
}

const CapabilityDiagram: React.FC<CapabilityDiagramProps> = ({ className = "" }) => {
  const { lang } = useLangStore();
  const data = capabilityData[lang];

  return (
    <div className={`capability-diagram-container ${className}`}>
      <h2 className="text-red-600 text-2xl font-bold mb-8">{data.title}</h2>

      <div className="relative w-full max-w-4xl mx-auto bg-gray-100 rounded-lg p-8">
        {/* Center Circle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
          <div className="w-48 h-48 bg-white rounded-full border-4 border-gray-300 flex flex-col items-center justify-center text-center p-4 shadow-lg">
            <div className="text-red-600 text-xl font-bold mb-1">Field</div>
            <div className="text-red-600 text-xl font-bold mb-2">Ro</div>
            <div className="text-gray-600 text-sm mb-1">{data.centerText.line1}</div>
            <div className="text-gray-600 text-sm mb-1">{data.centerText.line2}</div>
            <div className="text-gray-600 text-sm">{data.centerText.line3}</div>
            <div className="text-red-600 text-xs mt-2 font-bold">{data.centerText.subtitle}</div>
          </div>
        </div>

        {/* Automated Algorithm Technology - Red Section (Top) */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
          <div className="bg-red-100 rounded-lg p-4 w-80 text-center border-l-8 border-red-500">
            <h3 className="text-red-600 font-bold text-lg mb-2">{data.sections.automated.title}</h3>
            <h4 className="text-red-600 font-semibold mb-3">{data.sections.automated.subtitle}</h4>
            <div className="flex justify-center gap-2 mb-3">
              {data.sections.automated.images.map((img: string, index: number) => (
                <div key={index} className="w-16 h-16 bg-gray-300 rounded border">
                  <Image src={img} alt="" width={64} height={64} className="w-full h-full object-cover rounded" />
                </div>
              ))}
            </div>
            <ul className="text-xs text-gray-700 text-left">
              {data.sections.automated.features.map((feature: string, index: number) => (
                <li key={index} className="mb-1">• {feature}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Real-time Process Technology - Purple Section (Top Right) */}
        <div className="absolute top-16 right-4 z-10">
          <div className="bg-purple-100 rounded-lg p-4 w-80 text-center border-l-8 border-purple-500">
            <h3 className="text-purple-600 font-bold text-lg mb-2">{data.sections.realtime.title}</h3>
            <h4 className="text-purple-600 font-semibold mb-3">{data.sections.realtime.subtitle}</h4>
            <div className="flex justify-center gap-2 mb-3">
              {data.sections.realtime.images.map((img: string, index: number) => (
                <div key={index} className="w-16 h-16 bg-gray-300 rounded border">
                  <Image src={img} alt="" width={64} height={64} className="w-full h-full object-cover rounded" />
                </div>
              ))}
            </div>
            <ul className="text-xs text-gray-700 text-left">
              {data.sections.realtime.features.map((feature: string, index: number) => (
                <li key={index} className="mb-1">• {feature}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* System Architecture Technology - Orange Section (Right) */}
        <div className="absolute top-32 right-0 z-10">
          <div className="bg-orange-100 rounded-lg p-4 w-80 text-center border-l-8 border-orange-500">
            <h3 className="text-orange-600 font-bold text-lg mb-2">{data.sections.architecture.title}</h3>
            <h4 className="text-orange-600 font-semibold mb-3">{data.sections.architecture.subtitle}</h4>
            <div className="flex justify-center gap-2 mb-3">
              {data.sections.architecture.images.map((img: string, index: number) => (
                <div key={index} className="w-16 h-16 bg-gray-300 rounded border">
                  <Image src={img} alt="" width={64} height={64} className="w-full h-full object-cover rounded" />
                </div>
              ))}
            </div>
            <ul className="text-xs text-gray-700 text-left">
              {data.sections.architecture.features.map((feature: string, index: number) => (
                <li key={index} className="mb-1">• {feature}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* High Performance Evaluation Technology - Navy Section (Bottom Right) */}
        <div className="absolute bottom-16 right-4 z-10">
          <div className="bg-blue-100 rounded-lg p-4 w-80 text-center border-l-8 border-blue-800">
            <h3 className="text-blue-800 font-bold text-lg mb-2">{data.sections.performance.title}</h3>
            <h4 className="text-blue-800 font-semibold mb-3">{data.sections.performance.subtitle}</h4>
            <div className="flex justify-center gap-2 mb-3">
              {data.sections.performance.images.map((img: string, index: number) => (
                <div key={index} className="w-16 h-16 bg-gray-300 rounded border">
                  <Image src={img} alt="" width={64} height={64} className="w-full h-full object-cover rounded" />
                </div>
              ))}
            </div>
            <ul className="text-xs text-gray-700 text-left">
              {data.sections.performance.features.map((feature: string, index: number) => (
                <li key={index} className="mb-1">• {feature}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* System Manufacturing Technology - Green Section (Bottom) */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
          <div className="bg-green-100 rounded-lg p-4 w-80 text-center border-l-8 border-green-600">
            <h3 className="text-green-600 font-bold text-lg mb-2">{data.sections.manufacturing.title}</h3>
            <div className="flex justify-center gap-2 mb-3">
              {data.sections.manufacturing.images.map((img: string, index: number) => (
                <div key={index} className="w-16 h-16 bg-gray-300 rounded border">
                  <Image src={img} alt="" width={64} height={64} className="w-full h-full object-cover rounded" />
                </div>
              ))}
            </div>
            <ul className="text-xs text-gray-700 text-left">
              {data.sections.manufacturing.features.map((feature: string, index: number) => (
                <li key={index} className="mb-1">• {feature}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Deep Learning Based Optimization - Yellow Section (Bottom Left) */}
        <div className="absolute bottom-16 left-4 z-10">
          <div className="bg-yellow-100 rounded-lg p-4 w-80 text-center border-l-8 border-yellow-500">
            <h3 className="text-yellow-600 font-bold text-lg mb-2">{data.sections.deeplearning.title}</h3>
            <h4 className="text-yellow-600 font-semibold mb-3">{data.sections.deeplearning.subtitle}</h4>
            <div className="flex justify-center gap-2 mb-3">
              {data.sections.deeplearning.images.map((img: string, index: number) => (
                <div key={index} className="w-16 h-16 bg-gray-300 rounded border">
                  <Image src={img} alt="" width={64} height={64} className="w-full h-full object-cover rounded" />
                </div>
              ))}
            </div>
            <ul className="text-xs text-gray-700 text-left">
              {data.sections.deeplearning.features.map((feature: string, index: number) => (
                <li key={index} className="mb-1">• {feature}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Custom Modularization Technology - Blue Section (Left) */}
        <div className="absolute top-32 left-0 z-10">
          <div className="bg-blue-50 rounded-lg p-4 w-80 text-center border-l-8 border-blue-400">
            <h3 className="text-blue-600 font-bold text-lg mb-2">{data.sections.modularization.title}</h3>
            <h4 className="text-blue-600 font-semibold mb-3">{data.sections.modularization.subtitle}</h4>
            <div className="flex justify-center gap-2 mb-3">
              {data.sections.modularization.images.map((img: string, index: number) => (
                <div key={index} className="w-16 h-16 bg-gray-300 rounded border">
                  <Image src={img} alt="" width={64} height={64} className="w-full h-full object-cover rounded" />
                </div>
              ))}
            </div>
            <ul className="text-xs text-gray-700 text-left">
              {data.sections.modularization.features.map((feature: string, index: number) => (
                <li key={index} className="mb-1">• {feature}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Connecting Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-5" viewBox="0 0 800 600">
          <path d="M400 150 Q500 100 600 120" stroke="#ef4444" strokeWidth="8" fill="none" opacity="0.7" />
          <path d="M600 200 Q700 250 650 350" stroke="#8b5cf6" strokeWidth="8" fill="none" opacity="0.7" />
          <path d="M600 400 Q550 500 500 480" stroke="#f97316" strokeWidth="8" fill="none" opacity="0.7" />
          <path d="M450 500 Q400 550 350 520" stroke="#1e40af" strokeWidth="8" fill="none" opacity="0.7" />
          <path d="M300 480 Q200 500 250 400" stroke="#16a34a" strokeWidth="8" fill="none" opacity="0.7" />
          <path d="M200 350 Q150 250 200 200" stroke="#eab308" strokeWidth="8" fill="none" opacity="0.7" />
          <path d="M250 150 Q300 100 350 120" stroke="#3b82f6" strokeWidth="8" fill="none" opacity="0.7" />
        </svg>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* ServicePage                                                         */
/* ------------------------------------------------------------------ */
export default function ServicePage() {
  const { lang } = useLangStore();
  const { equipmentList, measurementEquipmentList } = serviceContent[lang];
  const section = serviceContent[lang].sectionList?.[0];
  const technologyOverview = serviceContent[lang].technologyOverview;

  const processImages = [
    "/images/business/process/service_design.png",
    "/images/business/process/service_order.png",
    "/images/business/process/service_product.png",
    "/images/business/process/service_test.png",
    "/images/business/process/service_deliver.png",
  ];

  const processImageVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: "easeOut" } as Transition },
  };

  const iconComponents = {
    manufacturing: Package,
    design: PenTool,
    jig: Settings,
    integration: Layers,
    equipment: ClipboardCheck,
    quality: Gauge,
  } as const;

  const content = {
    KOR: { image: "/images/business/process/gambarKorean.png", alt: "조직도", pageTitle: "조직도" },
    ENG: { image: "/images/business/process/gambarEng.png", alt: "Organization Chart", pageTitle: "Organization" },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } as Transition },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } as Transition },
  };

  const CM_TO_PX = 37.8;
  const HERO_TRIM_PX = Math.round(CM_TO_PX);
  const leftAlignTextVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } as Transition },
  };

  const currentContent = content[lang as keyof typeof content];

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

        {/* Capability Diagram (from the first component) */}
        <div className="px-4 sm:px-6 lg:px-8 my-12">
          <CapabilityDiagram />
        </div>

        {/* Technology Overview */}
        {technologyOverview && (
          <section className="relative overflow-hidden bg-[#050B1A] py-14 text-white sm:py-16 lg:py-20">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -top-32 -left-32 h-64 w-64 rounded-full bg-cyan-500/25 blur-3xl" />
              <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-indigo-500/25 blur-3xl" />
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-80" />
            </div>

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <motion.div className="max-w-3xl" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.4 }} variants={leftAlignTextVariants}>
                <span className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200">
                  {technologyOverview.badge}
                </span>
                <h2 className="mt-6 text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-4xl">
                  {technologyOverview.title}
                </h2>
              </motion.div>

              <div className="mt-12 grid gap-6 lg:mt-16 lg:grid-cols-12 lg:gap-8">
                <motion.div
                  className="flex flex-col justify-between rounded-3xl border border-white/10 bg-white/10 p-8 shadow-xl backdrop-blur lg:col-span-5"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.4 }}
                  variants={leftAlignTextVariants}
                >
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.4em] text-cyan-200/80">
                      {technologyOverview.subtitle}
                    </p>
                    <p className="mt-4 text-base leading-relaxed text-white/80">
                      {technologyOverview.description}
                    </p>
                  </div>
                  <div className="mt-8 rounded-2xl bg-gradient-to-r from-cyan-500/25 via-indigo-500/20 to-transparent p-6">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.45em] text-cyan-100/80">
                      {lang === "KOR" ? "핵심 메시지" : "Core Message"}
                    </p>
                    <p className="mt-3 text-lg font-semibold text-white">
                      {technologyOverview.coreMessage}
                    </p>
                  </div>
                </motion.div>

                <div className="lg:col-span-7">
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    {technologyOverview.highlights?.map((highlight: any, index: number) => {
                      const Icon = iconComponents[highlight.icon as keyof typeof iconComponents] ?? Settings;
                      return (
                        <motion.article
                          key={`${highlight.title}-${index}`}
                          className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-lg backdrop-blur"
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true, amount: 0.3 }}
                          variants={cardVariants}
                        >
                          <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/0 via-cyan-400/5 to-indigo-500/15 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                          <div className="relative flex items-center justify-between gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-500/15 text-cyan-300">
                              <Icon className="h-6 w-6" strokeWidth={1.75} />
                            </div>
                            <span className="text-xs font-semibold uppercase tracking-[0.4em] text-white/40">
                              {String(index + 1).padStart(2, "0")}
                            </span>
                          </div>
                          <div className="relative mt-5 space-y-3">
                            <h3 className="text-lg font-semibold text-white">{highlight.title}</h3>
                            <p className="text-sm leading-relaxed text-white/70">{highlight.description}</p>
                            <ul className="space-y-2 text-sm text-white/80">
                              {highlight.features?.map((feature: string, featureIndex: number) => (
                                <li key={`${highlight.title}-feature-${featureIndex}`} className="flex items-start gap-2">
                                  <span className="mt-[6px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-cyan-300" />
                                  <span>{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </motion.article>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 1. Main Equipment Section */}
        <div className="bg-white py-12 md:py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.h2
              className="text-base sm:text-lg lg:text-2xl font-semibold tracking-wide mb-6 md:mb-10"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={leftAlignTextVariants}
            >
              Main Equipment
            </motion.h2>
            <motion.p
              className="text-xl md:text-2xl lg:text-4xl font-bold tracking-wide leading-[1.3]"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={leftAlignTextVariants}
            >
              {section?.maintitle}
              <br />
              {section?.mainsubtitle}
            </motion.p>
          </div>
        </div>

        {/* 2. 생산가공 / 측정장비 Section */}
        <div className="relative z-0 bg-[#000B24] pt-12 md:pt-20 pb-6 md:pb-8 px-4">
          <div className="absolute inset-0 pointer-events-none">
            <Image src="/images/business/layer.png" alt="배경 이미지" fill style={{ objectFit: "cover", objectPosition: "top" }} priority />
          </div>

          <div className="max-w-7xl mx-auto">
            <motion.div className="relative transition-all duration-500 ease-in-out">
              {/* 생산가공 / 조립 */}
              <motion.button
                className="text-base sm:text-lg bg-[#505050]/40 text-white rounded-full px-6 py-1 mb-10 md:mb-16"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={leftAlignTextVariants}
              >
                {section?.production}
              </motion.button>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {equipmentList.map((equipment: any, index: number) => (
                  <motion.div
                    key={`prod-${index}`}
                    className="relative bg-white/10 rounded-lg overflow-hidden shadow-lg w-full p-2 border-2 border-gray-400/10 h-[calc(10rem+114px)] md:h-[calc(12.5rem+114px)]"
                    variants={itemVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                  >
                    <div className="w-full h-[calc(5rem+95px)] md:h-[calc(7rem+95px)] relative mb-0">
                      {equipment.image && <Image src={equipment.image} alt={equipment.name} fill className="object-cover rounded-[10px]" />}
                    </div>

                    <div className="absolute bottom-0 left-0 w-full h-10 md:h-12 bg-[#1F2432]/70 px-3 flex items-center justify-center border border-gray-500/10">
                      <p className="text-sm md:text-base font-medium text-white line-clamp-1">{equipment.name}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* 신뢰성 (측정 / 분석) */}
              <button className="text-base sm:text-lg bg-[#505050]/40 text-white rounded-full px-6 py-1 mb-10 md:mb-16 mt-16 md:mt-28">
                {section?.measurement}
              </button>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {measurementEquipmentList.map((equipment: any, index: number) => (
                  <motion.div
                    key={`meas-${index}`}
                    className="relative bg-white/10 rounded-lg overflow-hidden shadow-lg w-full p-2 border-2 border-gray-400/10 h-[calc(10rem+114px)] md:h-[calc(12.5rem+114px)]"
                    variants={itemVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                  >
                    <div className="w-full h-[calc(5rem+95px)] md:h-[calc(7rem+95px)] relative mb-0">
                      {equipment.image && <Image src={equipment.image} alt={equipment.name} fill className="object-cover rounded-[10px]" />}
                    </div>

                    <div className="absolute bottom-0 left-0 w-full h-10 md:h-12 bg-[#1F2432]/70 px-3 flex items-center justify-center">
                      <p className="text-sm md:text-base font-medium text-white line-clamp-1">{equipment.name}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* 3. Process Section */}
        <div className="content-wrapper py-20 px-4 md:px-8 bg-white flex justify-center items-center">
          <div className="max-w-7xl mx-auto w-full flex flex-col items-center">
            <h2 className="self-start w-full text-left text-sm sm:text-base lg:text-2xl font-semibold tracking-wide mb-4 md:mb-6">
              PROCESS
            </h2>
            <motion.div className="w-full" variants={processImageVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
              <div className="relative w-full h-auto overflow-hidden rounded-lg px-[7.5%] md:px-[15%] lg:px-[20%]">
                {/* Note: layout/objectFit props are deprecated in Next 13+; keeping as-is if your project supports them. */}
                <Image
                  src={currentContent.image}
                  alt={currentContent.alt}
                  width={1400}
                  height={1000}
                  className="w-full h-auto"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </div>

        <hr className="my-6 border-gray-200 w-full" />
      </main>
    </Layout>
  );
}
