// app/company/ceo/page.tsx
"use client";

import Layout from "@/components/Layout";
import HeroSection from "@/components/HeroSection";
import BreadcrumbSection from "@/components/BreadcrumbSection";
import Image from "next/image";
import Head from "next/head";
import { motion, type Transition } from "framer-motion";
import { useLangStore } from "@/stores/langStore";

const slideInRight = {
  hidden: { opacity: 0, y: 80 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 2, ease: "easeOut" } as Transition,
  },
};

const textReveal = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.6, ease: "easeOut" } as Transition,
  },
};

export default function CeoPage() {
  const lang = useLangStore((state) => state.lang);

  const heroTitle = lang === "KOR" ? "CEO 인사말" : "CEO Message";
  const fontFamily =
    "'Malgun Gothic', '맑은 고딕', 'Apple SD Gothic Neo', 'Nanum Gothic', sans-serif";

  const ceoSignImg =
    lang === "KOR"
      ? "/images/company/ceo/ceoKor.png"
      : "/images/company/ceo/ceoEng.png";

  return (
    <Layout>
      <Head>
        <title>{lang === "KOR" ? "CEO 인사말 | 수만" : "CEO Message | SUMAN"}</title>
      </Head>

      <main className="min-h-screen bg-white pt-[90px] text-slate-900">
        <HeroSection title={heroTitle} backgroundImage="/images/sub_banner/ceo_hero.png" />

        <div className="relative z-30 -mt-8 sm:-mt-10">
          <BreadcrumbSection
            path={lang === "KOR" ? "회사 소개 > CEO 인사말" : "Company > CEO Message"}
          />
        </div>

        <section className="bg-white">
          <div className="max-w-7xl mx-auto px-6 md:px-[60px] lg:px-[0px] py-16 lg:py-20 flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-16">
            
            {/* LEFT - Gambar Pertama (Signature) - Align Kiri */}
            <motion.article
              className="lg:w-1/2 flex justify-start"
              variants={textReveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              style={{ fontFamily }}
            >
              <div className="w-full">
                <div className="relative w-full aspect-square max-w-[550px]">
                  <Image
                    src={ceoSignImg}
                    alt={lang === "KOR" ? "CEO 서명 이미지" : "CEO signature image"}
                    fill
                    priority
                    className="object-contain object-left"
                    sizes="(min-width:1024px) 50vw, 90vw"
                  />
                </div>
              </div>
            </motion.article>

            {/* Border - Responsive */}
            <div className="w-full h-px lg:w-px lg:h-auto lg:min-h-[480px] bg-gray-200"></div>

            {/* RIGHT - Gambar Kedua (CEO Photo) - Align Kanan desktop, Center mobile */}
            <motion.div
              className="lg:w-1/2 flex justify-center lg:justify-end"
              variants={slideInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="w-full flex items-center justify-center lg:justify-end">
                <div className="relative aspect-square w-full max-w-[450px]">
                  <Image
                    src="/images/company/ceo/ceo.jpeg"
                    alt="SUMAN CEO"
                    fill
                    priority
                    className="object-cover object-center lg:object-right rounded-lg"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <hr className="my-6 border-gray-200" />
      </main>
    </Layout>
  );
}
