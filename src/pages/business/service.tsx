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
import { Settings, PenTool, Package, Layers, ClipboardCheck, Gauge } from "lucide-react";

export default function ServicePage() {
  const { lang } = useLangStore();
  const { equipmentList, measurementEquipmentList } = serviceContent[lang];
  const section = serviceContent[lang].sectionList?.[0];
  const technologyOverview = serviceContent[lang].technologyOverview;

  const capabilities = [
    {
      title: "중대형 구조물 가공/제작 기술",
      subtitle: "중대형 구조물 설계, 가공, 제작",
      position: "top",
      angle: 0,
    },
    {
      title: "실내외 협지 주행 기술",
      subtitle: "실시간 하중변형 바퀴/링크 제어",
      position: "topRight",
      angle: 60,
    },
    {
      title: "시스템 아킠텍처 기술",
      subtitle: "실시간 하중변형 바퀴/링크 제어",
      position: "bottomRight",
      angle: 120,
    },
    {
      title: "구조물 가공/제작 기술",
      subtitle: "저동형 자율주행 모듈 구성, 적재용량 최적화",
      position: "bottom",
      angle: 180,
    },
    {
      title: "고정밀 Jig 개발/제작 기술",
      subtitle: "공정 맞춤형 Jig 설계/제작 기술",
      position: "bottomLeft",
      angle: 240,
    },
    {
      title: "시스템 아킠텍처 기술",
      subtitle: "실시간 하중변형 바퀴/링크 제어",
      position: "topLeft",
      angle: 300,
    },
  ];

  const getPositionFromAngle = (angle: number, radius: number) => {
    const radian = (angle * Math.PI) / 180;
    const x = Math.cos(radian) * radius;
    const y = Math.sin(radian) * radius;
    return { x, y };
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const centerVariants = {
    hidden: { scale: 0, rotate: -180, opacity: 0 },
    visible: {
      scale: 1,
      rotate: 0,
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: cubicBezier(0.16, 1, 0.3, 1),
      },
    },
  };

  const ccardVariants = {
    hidden: (angle: number) => ({
      scale: 0,
      opacity: 0,
      x: Math.cos((angle * Math.PI) / 180) * -100,
      y: Math.sin((angle * Math.PI) / 180) * -100,
    }),
    visible: {
      scale: 1,
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.8,
        ease: cubicBezier(0.16, 1, 0.3, 1),
      },
    },
  };

  const floatingAnimation = {
    y: [-5, 5, -5],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: easeInOut,
    },
  };

  const processImages = [
    "/images/business/process/service_design.png",
    "/images/business/process/service_order.png",
    "/images/business/process/service_product.png",
    "/images/business/process/service_test.png",
    "/images/business/process/service_deliver.png",
  ];

  const processImageVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.8, ease: cubicBezier(0.16, 1, 0.3, 1) } as Transition,
    },
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
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: cubicBezier(0.16, 1, 0.3, 1) } as Transition,
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: cubicBezier(0.16, 1, 0.3, 1) } as Transition,
    },
  };

  const CM_TO_PX = 37.8;
  const HERO_TRIM_PX = Math.round(CM_TO_PX);

  const leftAlignTextVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: cubicBezier(0.16, 1, 0.3, 1) } as Transition,
    },
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
        {/*<div className="px-4 sm:px-6 lg:px-8 my-12">
          <CapabilityDiagram />
        </div>*/}
        <div className="flex justify-center items-center py-20 relative overflow-hidden">
          {/* Background Tech Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-10 left-10 w-32 h-32 border border-navy-600 rounded-full"></div>
            <div className="absolute top-20 right-20 w-24 h-24 border border-navy-600 rounded-full"></div>
            <div className="absolute bottom-10 left-20 w-40 h-40 border border-navy-600 rounded-full"></div>
            <div className="absolute bottom-20 right-10 w-28 h-28 border border-navy-600 rounded-full"></div>
          </div>

          <motion.div
            className="relative w-[800px] h-[800px]"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Orbiting Ring */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-gray-200 opacity-20"
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: (t: number) => t }}
            />

            {/* Center Circle */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full flex items-center justify-center overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
                border: "4px solid white",
                boxShadow: "0 20px 40px rgba(15, 23, 42, 0.3), inset 0 2px 4px rgba(255, 255, 255, 0.1)",
              }}
              variants={centerVariants}
              animate={floatingAnimation}
              whileHover={{ scale: 1.05 }}
            >
              {/* Center Circle Glow Effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400/10 to-indigo-400/10 animate-pulse"></div>

              <div className="text-center text-white px-4 relative z-10">
                <motion.div
                  className="font-bold text-lg leading-tight"
                  animate={{ opacity: [0.8, 1, 0.8] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  정밀가공/모듈화
                </motion.div>
                <motion.div
                  className="font-bold text-lg leading-tight"
                  animate={{ opacity: [0.8, 1, 0.8] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                >
                  /장비 기술
                </motion.div>
              </div>
            </motion.div>

            {/* Capability Cards */}
            {capabilities.map((capability, index) => {
              const position = getPositionFromAngle(capability.angle - 90, 300);
              return (
                <motion.div
                  key={index}
                  className="absolute w-[280px] h-[120px] rounded-xl p-4 shadow-lg cursor-pointer"
                  style={{
                    left: `calc(50% + ${position.x}px - 140px)`,
                    top: `calc(50% + ${position.y}px - 60px)`,
                    background: "linear-gradient(135deg, #334155 0%, #1e293b 100%)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                  }}
                  variants={cardVariants}
                  custom={capability.angle}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 25px 50px rgba(15, 23, 42, 0.4)",
                    background: "linear-gradient(135deg, #475569 0%, #334155 100%)",
                  }}
                  animate={{
                    y: [-2, 2, -2],
                  }}
                  transition={{
                    y: {
                      duration: 3 + index * 0.2,
                      repeat: Infinity,
                      ease: easeInOut,
                      delay: index * 0.3,
                    },
                  }}
                >
                  {/* Card Glow Effect */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/5 to-indigo-500/5 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>

                  <div className="flex h-full items-center relative z-10">
                    {/* Tech Icons */}
                    <div className="flex flex-col gap-1 mr-4">
                      <motion.div
                        className="w-[45px] h-[45px] bg-gradient-to-br from-gray-600 to-gray-700 rounded-lg border border-white/10 flex items-center justify-center"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-indigo-500 rounded opacity-80"></div>
                      </motion.div>
                      <motion.div
                        className="w-[45px] h-[20px] bg-gradient-to-r from-gray-700 to-gray-800 rounded border border-white/10 flex items-center justify-center"
                        whileHover={{ scale: 1.1 }}
                      >
                        <div className="w-4 h-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full opacity-80"></div>
                      </motion.div>
                    </div>

                    {/* Text Content */}
                    <div className="flex-1 text-white">
                      <motion.h4 className="font-bold text-sm mb-2 leading-tight" whileHover={{ x: 2 }}>
                        {capability.title}
                      </motion.h4>
                      <motion.p className="text-xs text-gray-300 leading-tight" whileHover={{ x: 2 }}>
                        {capability.subtitle}
                      </motion.p>
                    </div>

                    {/* Connection Indicators */}
                    <div className="flex flex-col gap-2 ml-4">
                      {[1, 2, 3].map((dotIndex) => (
                        <motion.div
                          key={dotIndex}
                          className="w-2 h-2 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full"
                          animate={{
                            opacity: [0.3, 1, 0.3],
                            scale: [0.8, 1.2, 0.8],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: dotIndex * 0.3 + index * 0.1,
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Connection Line to Center */}
                  <motion.div
                    className="absolute w-0.5 h-[100px] bg-gradient-to-b from-transparent via-blue-400/30 to-transparent"
                    style={{
                      left: "50%",
                      top: capability.angle < 180 ? "100%" : "-100px",
                      transformOrigin: "center",
                      transform: `translateX(-50%) rotate(${capability.angle - 90}deg)`,
                    }}
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ delay: 1 + index * 0.1, duration: 0.8 }}
                  />
                </motion.div>
              );
            })}

            {/* Pulsing Tech Rings */}
            {[400, 500, 600].map((size, index) => (
              <motion.div
                key={size}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-400/10"
                style={{ width: size, height: size }}
                animate={{
                  scale: [1, 1.02, 1],
                  opacity: [0.1, 0.3, 0.1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: index * 0.5,
                }}
              />
            ))}
          </motion.div>
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
