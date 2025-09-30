"use client";

import Layout from "@/components/Layout";
import HeroSection from "@/components/HeroSection";
import BreadcrumbSection from "@/components/BreadcrumbSection";
import Image from "next/image";
import Head from "next/head";
import { motion, type Transition } from "framer-motion";
import { ceoText } from "@/data/ceo";
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
  const { closing, signatureTitle, signatureName } = ceoText[lang];

  const heroTitle = lang === "KOR" ? "CEO 인사말" : "CEO Message";
  const fontFamily =
    "'Malgun Gothic', '맑은 고딕', 'Apple SD Gothic Neo', 'Nanum Gothic', sans-serif";

  const ceoSignImg = lang === "KOR" ? "/images/company/ceo/ceoKor.png" : "/images/company/ceo/ceoEng.png";

  return (
    <Layout>
      <Head>
        <title>{lang === "KOR" ? "CEO 인사말 | 수만" : "CEO Message | SUMAN"}</title>
      </Head>

      <main className="min-h-screen bg-white pt-[90px] text-slate-900">
        <HeroSection title={heroTitle} backgroundImage="/images/sub_banner/ceo_hero.png" />

        <div className="relative z-30 -mt-8 sm:-mt-10">
          <BreadcrumbSection path={lang === "KOR" ? "회사 소개 > CEO 인사말" : "Company > CEO Message"} />
        </div>

        <section className="bg-white">
          <div className="mx-auto flex max-w-6xl flex-col gap-12 px-4 py-16 sm:px-6 lg:flex-row lg:items-start lg:gap-16 lg:py-20">
            {/* LEFT */}
            <motion.article
              className="lg:w-1/2"
              variants={textReveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              style={{ fontFamily }}
            >
              {/* Signature image: +4cm frame, align left with Signature, grow 20% via container height */}
              <div className="lg:-ml-[1.5cm] lg:px-[4cm]">
                <div className="relative w-full h-[432px] sm:h-[504px] lg:h-[660px] overflow-visible rounded-md">
                  <Image
                    src={ceoSignImg}
                    alt={lang === "KOR" ? "CEO 서명 이미지" : "CEO signature image"}
                    fill
                    priority
                    className="object-contain transform-gpu will-change-transform" /* why: prevent crop; no scale */
                    sizes="(min-width:1024px) 50vw, 90vw"
                  />
                </div>
              </div>

              {/* Closing text: shift left 1.5cm */}
              {closing && (
                <p className="mt-6 text-base sm:text-lg leading-relaxed tracking-tight text-gray-800 lg:-ml-[1.5cm]">
                  {closing}
                </p>
              )}

              {/* Signature block: shift left 1.5cm */}
              <footer className="mt-6 lg:-ml-[1.5cm] border-t border-gray-200 pt-6 text-lg text-gray-900">
                <div className="text-sm font-semibold uppercase tracking-[0.45em] text-[rgb(70,177,225)]">
                  {lang === "KOR" ? "Signature" : "Signature"}
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-3 text-base sm:text-lg">
                  <span className="text-gray-600">{signatureTitle}</span>
                  <strong className="font-semibold text-slate-900">{signatureName}</strong>
                </div>
              </footer>
            </motion.article>

            {/* RIGHT */}
            <motion.div
              className="ceo-image-column md:w-[48%] lg:translate-x-3 xl:translate-x-4 flex items-center justify-center"
              variants={slideInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="w-full max-h-[550px] h-[360px] sm:h-[420px] lg:h-[550px] overflow-hidden flex items-center justify-center p-2">
                <Image
                  src="/images/company/ceo/ceo.jpeg"
                  alt="SUMAN CEO"
                  className="w-full h-full object-contain"
                  width={700}
                  height={500}
                  priority
                />
              </div>
            </motion.div>
          </div>
        </section>

        <hr className="my-6 border-gray-200" />
      </main>
    </Layout>
  );
}