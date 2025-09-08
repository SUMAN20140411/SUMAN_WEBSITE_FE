import Layout from "@/components/Layout";
import HeroSection from "@/components/HeroSection";
import BreadcrumbSection from "@/components/BreadcrumbSection";
import { motion, type Transition } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { serviceContent } from "@/data/product";
import { useLangStore } from "@/stores/langStore";
import Head from "next/head";

export default function ServicePage() {
  const [showAllEquipment, setShowAllEquipment] = useState(false);
  const { lang } = useLangStore();
  const { productCategories, footerText } = serviceContent[lang];
  const section = serviceContent[lang].sectionList?.[0];

  // === Animations (match service.tsx) ===
  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" } as Transition,
    },
  };
  const CM_TO_PX = 37.8; // UPDATED
  const HERO_TRIM_PX = Math.round(CM_TO_PX);
  const leftAlignTextVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" } as Transition,
    },
  };

  return (
    <>
      <Layout>
        <Head>
          <title>{lang === "KOR" ? "제품 소개 " : "Product "}</title>
        </Head>
        <main className="min-h-screen bg-white text-slate-900" style={{ paddingTop: "90px" }}>
          {/* === UPDATED: Bungkus HeroSection dengan negative margin top/bottom (1cm per sisi) === */}
          <div
            style={{
              marginTop: `-${HERO_TRIM_PX}px`,
              marginBottom: `-${HERO_TRIM_PX}px`,
            }}
          >
            <HeroSection
              title={lang === "KOR" ? "제품 소개" : "Product"}
              backgroundImage="/images/sub_banner/business_hero.png"
            />
          </div>

          {/* Keep breadcrumb visible and above blue section */}
          <div className="relative z-30 -mt-2">
            <BreadcrumbSection
              path={lang === "KOR" ? "사업분야 > 제품소개" : "Business > Product"}
            />
          </div>

          {/* Products Section (blue block) */}
          {section && (
            <motion.div className="relative z-10 bg-[#000B24] pt-20 pb-20 px-4 md:px-8 rounded-none mt-0 overflow-hidden">
              <div
                className="absolute inset-0 pointer-events-none flex bg-no-repeat bg-top bg-contain"
                style={{ backgroundImage: "url('/images/business/layer2.png')" }}
              ></div>

              <div className="max-w-7xl mx-auto relative z-10">
                {/* Headings with same effects as service.tsx */}
                <motion.h2
                  className="text-white text-base sm:text-lg lg:text-2xl font-semibold tracking-wide mb-10"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={leftAlignTextVariants}
                >
                  Products
                </motion.h2>

                <motion.p
                  className="text-white text-xl md:text-2xl lg:text-4xl font-bold tracking-wide leading-[1.3] mb-12"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={leftAlignTextVariants}
                >
                  {section.production2}
                  <br />
                  {section.production2sub}
                </motion.p>

                {/* Grid with staggered children like service.tsx */}
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
                >
                  {productCategories.map((product, index) => (
                    <motion.div
                      key={index}
                      className="bg-[#7E7E7E]/25 rounded-[30px] overflow-hidden shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out group mt-15 hover:bg-white"
                      variants={itemVariants}
                    >
                      <div className="relative w-full h-44 mx-auto mt-4">
                        <Image src={product.image} alt={product.name} fill className="object-contain" />
                      </div>
                      <div className="p-4">
                        {product.label && (
                          <span className="tracking-wide font-light text-[#CACACA] text-base transition-colors duration-300 group-hover:text-gray-700">
                            {product.label}
                          </span>
                        )}
                        <h3 className="tracking-wide text-2xl font-semibold text-white mb-1 mt-5 transition-colors duration-300 group-hover:text-black">
                          {product.name}
                        </h3>
                        <p className="tracking-wide font-light text-[#CACACA] text-sm mb-7 transition-colors duration-300 group-hover:text-gray-700">
                          {product.subtitle}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Footer text animation same style */}
                <motion.p
                  className="text-[#B2B2B2] font-light text-sm md:text-base mt-7 text-right tracking-wide"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={leftAlignTextVariants}
                >
                  {footerText}
                </motion.p>
              </div>
            </motion.div>
          )}
        </main>
      </Layout>
    </>
  );
}
