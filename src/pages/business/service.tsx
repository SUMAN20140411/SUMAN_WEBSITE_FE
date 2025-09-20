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

interface CapabilityDiagramProps {
  className?: string;
}

const CapabilityDiagram: React.FC<CapabilityDiagramProps> = ({ className = "" }) => {
  const { lang } = useLangStore();
  const data = serviceContent[lang];

  if (!data.sections) {
    return null;
  }

  return (
    <div className={`w-full max-w-6xl mx-auto py-12 ${className}`}>
      <div className="relative min-h-[800px] bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500 rounded-full blur-3xl"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-purple-500 rounded-full blur-2xl"></div>
          <div className="absolute bottom-20 left-40 w-28 h-28 bg-green-500 rounded-full blur-3xl"></div>
        </div>

        {/* Center Circle */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30">
          <div className="w-48 h-48 bg-white rounded-full border-4 border-gray-200 shadow-2xl flex flex-col items-center justify-center p-6">
            <div className="text-center">
              <div className="text-red-500 text-xl font-bold">Field</div>
              <div className="text-red-500 text-xl font-bold mb-2">Ro</div>
              <div className="text-gray-600 text-xs leading-tight">
                <div>{data.centerText.line1}</div>
                <div>{data.centerText.line2}</div>
              </div>
              <div className="text-red-500 text-xs mt-2 font-semibold">
                {data.centerText.subtitle}
              </div>
            </div>
          </div>
        </div>

        {/* Top Section - Automated Algorithm */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-72 z-20">
          <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4 shadow-lg">
            <div className="text-red-600 font-bold text-sm mb-1">{data.sections.automated.title}</div>
            <div className="text-red-500 text-xs mb-3">{data.sections.automated.subtitle}</div>
            <div className="flex gap-1 mb-2 justify-center">
              {data.sections.automated.images.slice(0,3).map((_, index) => (
                <div key={index} className="w-12 h-12 bg-gray-200 rounded border"></div>
              ))}
            </div>
            <ul className="text-xs text-gray-700 space-y-1">
              {data.sections.automated.features.map((feature, index) => (
                <li key={index} className="text-xs">• {feature}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Top Right - Real-time Process */}
        <div className="absolute top-16 right-4 w-72 z-20">
          <div className="bg-purple-50 border-l-4 border-purple-500 rounded-lg p-4 shadow-lg">
            <div className="text-purple-600 font-bold text-sm mb-1">{data.sections.realtime.title}</div>
            <div className="text-purple-500 text-xs mb-3">{data.sections.realtime.subtitle}</div>
            <div className="flex gap-1 mb-2 justify-center">
              {data.sections.realtime.images.slice(0,2).map((_, index) => (
                <div key={index} className="w-12 h-12 bg-gray-200 rounded border"></div>
              ))}
            </div>
            <ul className="text-xs text-gray-700 space-y-1">
              {data.sections.realtime.features.map((feature, index) => (
                <li key={index} className="text-xs">• {feature}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right - System Architecture */}
        <div className="absolute top-1/2 right-4 transform -translate-y-1/2 w-72 z-20">
          <div className="bg-orange-50 border-l-4 border-orange-500 rounded-lg p-4 shadow-lg">
            <div className="text-orange-600 font-bold text-sm mb-3">{data.sections.architecture.title}</div>
            <div className="flex gap-1 mb-2 justify-center">
              {data.sections.architecture.images.slice(0,2).map((_, index) => (
                <div key={index} className="w-12 h-12 bg-gray-200 rounded border"></div>
              ))}
            </div>
            <ul className="text-xs text-gray-700 space-y-1">
              {data.sections.architecture.features.map((feature, index) => (
                <li key={index} className="text-xs">• {feature}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Right - Performance */}
        <div className="absolute bottom-16 right-4 w-72 z-20">
          <div className="bg-blue-50 border-l-4 border-blue-700 rounded-lg p-4 shadow-lg">
            <div className="text-blue-700 font-bold text-sm mb-1">{data.sections.performance.title}</div>
            <div className="text-blue-600 text-xs mb-3">{data.sections.performance.subtitle}</div>
            <div className="flex gap-1 mb-2 justify-center">
              {data.sections.performance.images.slice(0,2).map((_, index) => (
                <div key={index} className="w-12 h-12 bg-gray-200 rounded border"></div>
              ))}
            </div>
            <ul className="text-xs text-gray-700 space-y-1">
              {data.sections.performance.features.map((feature, index) => (
                <li key={index} className="text-xs">• {feature}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom - Manufacturing */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-72 z-20">
          <div className="bg-green-50 border-l-4 border-green-600 rounded-lg p-4 shadow-lg">
            <div className="text-green-600 font-bold text-sm mb-3">{data.sections.manufacturing.title}</div>
            <div className="flex gap-1 mb-2 justify-center">
              {data.sections.manufacturing.images.slice(0,4).map((_, index) => (
                <div key={index} className="w-10 h-10 bg-gray-200 rounded border"></div>
              ))}
            </div>
            <ul className="text-xs text-gray-700 space-y-1">
              {data.sections.manufacturing.features.map((feature, index) => (
                <li key={index} className="text-xs">• {feature}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Left - Deep Learning */}
        <div className="absolute bottom-16 left-4 w-72 z-20">
          <div className="bg-yellow-50 border-l-4 border-yellow-500 rounded-lg p-4 shadow-lg">
            <div className="text-yellow-600 font-bold text-sm mb-1">{data.sections.deeplearning.title}</div>
            <div className="text-yellow-500 text-xs mb-3">{data.sections.deeplearning.subtitle}</div>
            <div className="flex gap-1 mb-2 justify-center">
              {data.sections.deeplearning.images.slice(0,2).map((_, index) => (
                <div key={index} className="w-12 h-12 bg-gray-200 rounded border"></div>
              ))}
            </div>
            <ul className="text-xs text-gray-700 space-y-1">
              {data.sections.deeplearning.features.map((feature, index) => (
                <li key={index} className="text-xs">• {feature}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Left - Modularization */}
        <div className="absolute top-1/2 left-4 transform -translate-y-1/2 w-72 z-20">
          <div className="bg-blue-50 border-l-4 border-blue-400 rounded-lg p-4 shadow-lg">
            <div className="text-blue-600 font-bold text-sm mb-1">{data.sections.modularization.title}</div>
            <div className="text-blue-500 text-xs mb-3">{data.sections.modularization.subtitle}</div>
            <div className="flex gap-1 mb-2 justify-center">
              {data.sections.modularization.images.slice(0,2).map((_, index) => (
                <div key={index} className="w-12 h-12 bg-gray-200 rounded border"></div>
              ))}
            </div>
            <ul className="text-xs text-gray-700 space-y-1">
              {data.sections.modularization.features.map((feature, index) => (
                <li key={index} className="text-xs">• {feature}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Connecting Lines - SVG */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 800 600">
          {/* Red to Purple */}
          <path d="M400 100 Q500 80 550 140" stroke="#ef4444" strokeWidth="6" fill="none" opacity="0.6" />
          {/* Purple to Orange */}
          <path d="M580 180 Q650 220 620 300" stroke="#8b5cf6" strokeWidth="6" fill="none" opacity="0.6" />
          {/* Orange to Blue */}
          <path d="M580 360 Q520 420 480 400" stroke="#f97316" strokeWidth="6" fill="none" opacity="0.6" />
          {/* Blue to Green */}
          <path d="M450 440 Q400 480 350 450" stroke="#1e40af" strokeWidth="6" fill="none" opacity="0.6" />
          {/* Green to Yellow */}
          <path d="M320 430 Q250 420 280 360" stroke="#16a34a" strokeWidth="6" fill="none" opacity="0.6" />
          {/* Yellow to Light Blue */}
          <path d="M250 320 Q200 280 220 220" stroke="#eab308" strokeWidth="6" fill="none" opacity="0.6" />
          {/* Light Blue to Red */}
          <path d="M280 180 Q320 120 360 140" stroke="#3b82f6" strokeWidth="6" fill="none" opacity="0.6" />
        </svg>
      </div>
    </div>
  );
};

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

        {/* Capability Diagram */}
        <div className="px-4 sm:px-6 lg:px-8 my-12">
          <CapabilityDiagram />
        </div>

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