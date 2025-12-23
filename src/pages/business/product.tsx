// app/product/service.tsx (updated)
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

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" } as Transition,
    },
  };
  
  const leftAlignTextVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" } as Transition,
    },
  };

  const productTitle = lang === "KOR" ? "제품" : "Products"; // bilingual title

  return (
    <>
      <Layout>
        <Head>
          <title>{lang === "KOR" ? "제품 소개 " : "Product "}</title>
        </Head>
        <main className="min-h-screen bg-white pt-[90px] text-slate-900">
          <HeroSection
            title={lang === "KOR" ? "제품 소개" : "Products"}
            backgroundImage="/images/sub_banner/business_hero.png"
          />

          <div className="relative z-30 -mt-8 sm:-mt-10">
            <BreadcrumbSection
              path={lang === "KOR" ? "사업분야 > 제품 소개" : "Business > Products"}
            />
          </div>

          {/* Products Section */}
          {section && (
            <section className="relative z-0 bg-gradient-to-b from-slate-100/50 via-[#f0f5ff] to-slate-50/60 px-4 pb-20 pt-20 md:pb-20 md:pt-20">
              <div className="absolute inset-0 -z-10 bg-gradient-to-b from-slate-100/50 via-[#f0f5ff] to-slate-50/60" />
              
              <div className="max-w-7xl mx-auto relative z-10">
                {/* Title: bilingual & same size as '핵심 연구 분야' */}
                <motion.h2
                  className="text-slate-800 text-4xl md:text-5xl font-bold tracking-tight mb-4"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={leftAlignTextVariants}
                >
                  {productTitle}
                </motion.h2>

                {/* Tagline: subtitle sizing like R&D subtitle */}
                <motion.p
                  className="text-slate-600 text-base md:text-lg leading-relaxed max-w-3xl"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={leftAlignTextVariants}
                >
                  {section.production2}
                  <br />
                  {section.production2sub}
                </motion.p>

                {/* Grid */}
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-5"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
                >
                  {productCategories.map((product, index) => (
                    <motion.div
                      key={index}
                      className="rounded-[30px] overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out group mt-5"
                      style={{ backgroundColor: '#ffffff' }}
                      variants={itemVariants}
                    >
                      <div className="relative w-full h-44 mx-auto mt-4">
                        <Image src={product.image} alt={product.name} fill className="object-contain" />
                      </div>
                      <div className="p-4">
                        {product.label && (
                          <span className="tracking-wide font-light text-slate-500 text-base">
                            {product.label}
                          </span>
                        )}
                        <h3 className="tracking-wide text-2xl font-semibold text-slate-900 mb-1 mt-5">
                          {product.name}
                        </h3>
                        <p className="tracking-wide font-light text-slate-600 text-sm mb-7">
                          {product.subtitle}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Footer */}
                <motion.p
                  className="text-slate-500 font-light text-sm md:text-base mt-7 text-right tracking-wide"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={leftAlignTextVariants}
                >
                  {footerText}
                </motion.p>
              </div>
            </section>
          )}
        </main>
      </Layout>
    </>
  );
}
