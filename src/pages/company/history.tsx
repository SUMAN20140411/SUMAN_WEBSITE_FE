import Layout from "@/components/Layout";
import HeroSection from "@/components/HeroSection";
import BreadcrumbSection from "@/components/BreadcrumbSection";
import { motion, type Transition } from "framer-motion";
import Head from "next/head";
import { useLangStore } from "@/stores/langStore";
import { historyText } from "@/data/history";
import React from "react";

export default function HistoryPage() {
  const { lang } = useLangStore();
  const content = historyText[lang];

  const fadeInRiseVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" } as Transition
    }
  };

  const staggerContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  // Base shift (≈ previously 5cm) & lift up ≈ 3cm -> net ≈ 2cm down.
  // 3cm ≈ 114px (approx). Use clamp to stay responsive across screens.
  const arrowShiftStyle = {
    ["--arrow-shift-down" as any]: "clamp(80px, 10vw, 190px)", // base down shift (~up to 5cm)
    ["--arrow-shift-up" as any]: "clamp(60px, 6vw, 114px)" // lift up (~3cm)
  } as React.CSSProperties;

  return (
    <Layout>
      <Head>
        <title>{lang === "KOR" ? "연혁 | 수만" : "History | SUMAN"}</title>
      </Head>
      <main className="min-h-screen bg-white pt-[90px] text-slate-900">
        <HeroSection
          title={
            <span className="text-5xl font-bold tracking-wide">
              {content.title}
            </span>
          }
          backgroundImage="/images/sub_banner/company_banner.png"
        />

        <div className="relative z-30 -mt-8 sm:-mt-10">
          <BreadcrumbSection path={content.breadcrumb} />
        </div>

        {/* =================== HISTORY HERO BLOCK =================== */}
        <section className="relative w-full min-h-[520px] md:min_h-[620px] md:min-h-[620px]">
          <div
            className="absolute inset-0 bg-cover z-0"
            style={{
              backgroundImage:
                "url('/images/company/history/history_suman.png')",
              backgroundPosition: "center 70%"
            }}
          >
            <div className="absolute inset-0 bg-[#020c23]/85 z-10" />

            {/* Content (title + bullets) */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              viewport={{ once: true }}
              className="relative z-20 max-w-7xl mx-auto px-4 md:px-8 lg:px-8 xl:px-0 py-16 md:py-24 text-white"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
                {/* Left: title + bullets */}
                <div className="lg:col-span-8">
                  <h2 className="text-xl md:text-2xl lg:text-4xl font-bold mb-3 tracking-wide whitespace-pre-line">
                    {content.summaryTitle}
                  </h2>

                  <ul className="text-base md:text-lg lg:text-xl flex flex-col items-start space-y-4 md:space-y-5 mt-6 tracking-wide">
                    {content.bulletList.map((text, index) => (
                      <motion.li
                        key={index}
                        className="relative w-fit bg-white/15 text-white font-medium py-3 px-5 md:py-3.5 md:px-6 rounded-full z-10"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.5,
                          delay: 0.5 + index * 0.2,
                          ease: "easeOut"
                        }}
                        viewport={{ once: true }}
                      >
                        {text}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Arrow overlay — moved UP by ~3cm responsively */}
            <svg
              className="absolute inset-0 w-full h-full mx-auto my-auto z-20 opacity-80 pointer-events-none"
              viewBox="0 0 700 300"
              preserveAspectRatio="xMidYMid meet"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                transform:
                  "translateY(calc(var(--arrow-shift-down) - var(--arrow-shift-up)))",
                ...arrowShiftStyle
              }}
            >
              <defs>
                <linearGradient
                  id="arrow-gradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="white" stopOpacity="0" />
                  <stop offset="100%" stopColor="white" stopOpacity="1" />
                </linearGradient>
              </defs>
              {/* Line - extended a bit more towards the arrow tip */}
              <motion.path
                d="M 150 233 Q 460 220, 555 48"
                stroke="url(#arrow-gradient)"
                strokeWidth="6"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
              {/* Arrow tip - on top of the line */}
              <motion.path
                d="M 566 30 L 561 53 L 549 45 Z"
                fill="white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.9, duration: 0.3 }}
              />
            </svg>

            {/* Metrics pinned to bottom-right corner */}
            <motion.div
              className="absolute z-20 bottom-4 right-4 md:bottom-8 md:right-8 lg:bottom-10 lg:right-12 text-right text-xs sm:text-sm md:text-base space-y-1"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <p className="drop-shadow-md text-gray-200 bg-black/25 px-3 py-1 rounded-md inline-block">
                {content.sales /* e.g., "매출액 88억원 (2024년도 기준)" */}
              </p>
              <p className="drop-shadow-md text-gray-200 bg-black/25 px-3 py-1 rounded-md inline-block">
                {content.staff /* e.g., "임직원 수 45명 (2024년도 기준)" */}
              </p>
            </motion.div>
          </div>
        </section>
        {/* =================== /HISTORY HERO BLOCK =================== */}

        <div className="content-wrapper">
          <section className="main-history-timeline py-28 px-4 md:px-8 bg-white">
            <div className="max-w-7xl mx-auto text-left">
              <motion.h2
                className="text-base sm:text-lg lg:text-2xl font-semibold text-black mb-28"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.3 }}
              >
                {content.timelineTitle}
              </motion.h2>

              <div className="max-w-5xl mx-auto relative pl-6 sm:pl-26 md:pl-36">
                <motion.div
                  className="absolute left-[120px] md:left-[150px] top-12 h-full border-l-2 border-dashed border-gray-300 hidden sm:block"
                  initial={{ opacity: 0, height: 0 }}
                  whileInView={{ opacity: 1, height: "100%" }}
                  transition={{ duration: 1.0, delay: 1.0, ease: "easeOut" }}
                  viewport={{ once: true }}
                />

                <motion.div
                  className="timeline-container relative"
                  variants={staggerContainerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                >
                  {content.timeline.map((entry, index) => (
                    <motion.div key={index} variants={fadeInRiseVariants}>
                      <div className="timeline-entry mt-16 mb-10 relative">
                        <div className="flex items-center sm:absolute sm:-left-2 sm:top-[18px] sm:ml-[-24px] mb-4 sm:mb-0">
                          <h3 className="timeline-year text-xl sm:text-3xl md:text-3xl font-bold text-black bg-white pr-4 z-10 sm:-translate-x-full">
                            {entry.year}
                          </h3>
                        </div>
                        <div className="bg-gray-100 p-6 rounded-[30px] w-full sm:ml-[60px] md:ml-[100px]">
                          <p className="text-2xl font-bold text-black tracking-wide ml-4">
                            {entry.label}
                          </p>
                        </div>
                      </div>

                      {entry.items.map((item, idx) => (
                        <motion.div
                          key={idx}
                          className="timeline-item mb-3 relative ml-[20px] sm:ml-[90px] md:ml-[155px]"
                          initial={{ opacity: 0, x: -30, y: -10 }}
                          whileInView={{ opacity: 1, x: 0, y: 0 }}
                          transition={{
                            duration: 0.25,
                            delay: idx * 0.05,
                            ease: "easeOut"
                          }}
                          viewport={{ once: true }}
                        >
                          <p
                            className={`text-lg font-semibold tracking-wide ${
                              item.includes("⦁")
                                ? "text-black font-bold"
                                : item.includes("➔")
                                ? "text-[#8C8C8C] text-base"
                                : "text-[#4C4C4C]"
                            }`}
                          >
                            {item}
                          </p>
                        </motion.div>
                      ))}
                    </motion.div>
                  ))}
                </motion.div>

                {/* dots */}
                <motion.div
                  className="absolute left-0 top-[1%] w-12 h-12 bg-[#0f172a] rounded-full border-[12px] border-gray-200 ml-28 md:ml-32 hidden sm:block"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.9, ease: "easeOut" }}
                  viewport={{ once: true }}
                />
                <motion.div
                  className="absolute left-0 top-[47.3%] w-12 h-12 bg-[#0f172a] rounded-full border-[12px] border-gray-200 ml-28 md:ml-32 hidden sm:block"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.1, ease: "easeOut" }}
                  viewport={{ once: true }}
                />
                <motion.div
                  className="absolute left-0 top-[86%] w-12 h-12 bg-[#0f172a] rounded-full border-[12px] border-gray-200 ml-28 md:ml-32 hidden sm:block"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
                  viewport={{ once: true }}
                />
              </div>
            </div>
          </section>
        </div>

        <hr className="my-8 border-gray-200" />
      </main>
    </Layout>
  );
}
