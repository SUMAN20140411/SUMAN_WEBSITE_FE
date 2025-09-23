"use client";

import Layout from "@/components/Layout";
import HeroSection from "@/components/HeroSection";
import BreadcrumbSection from "@/components/BreadcrumbSection";
import Image from "next/image";
import Head from "next/head";
import { motion, type Transition } from "framer-motion";
import { ceoText } from "@/data/ceo";
import { useLangStore } from "@/stores/langStore";

const textReveal = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.6, ease: "easeOut" } as Transition,
  },
};

const imageReveal = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.6, ease: "easeOut" } as Transition,
  },
};

export default function CeoPage() {
  const lang = useLangStore((state) => state.lang);
  const { hero, paragraphs, closing, signatureTitle, signatureName } = ceoText[lang];

  const heroTitle = lang === "KOR" ? "CEO 인사말" : "CEO Message";
  const fontFamily = "'Malgun Gothic', '맑은 고딕', 'Apple SD Gothic Neo', 'Nanum Gothic', sans-serif";

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
          <div className="mx-auto flex max-w-6xl flex-col gap-12 px-4 py-16 sm:px-6 lg:flex-row lg:items-start lg:gap-16 lg:py-20">
            <motion.article
              className="lg:w-1/2"
              variants={textReveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              style={{ fontFamily }}
            >
              <span className="inline-block rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-blue-600">
                {lang === "KOR" ? "CEO 인사말" : "Message from the CEO"}
              </span>

              <h2 className="mt-5 text-xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-2xl md:text-3xl">
                {hero.primary && (
                  <span className="block text-blue-600">
                    {hero.primary}
                    {lang === "KOR" && <span className="text-slate-900">을</span>}
                  </span>
                )}
                {hero.secondary && (
                  <span className="mt-2 block text-slate-900">{hero.secondary}</span>
                )}
              </h2>

              <div className="mt-8 space-y-4 text-base leading-relaxed tracking-tight text-gray-700 sm:text-lg">
                {paragraphs.map((paragraph, idx) => {
                  if (paragraph === "") {
                    return <div key={idx} className="h-2" />;
                  }
                  if (paragraph === "감사합니다.") {
                    return (
                      <p key={idx} className="font-medium text-gray-900 mt-6">
                        {paragraph}
                      </p>
                    );
                  }
                  return (
                    <p key={idx} className="leading-relaxed">
                      {paragraph}
                    </p>
                  );
                })}

                {closing && <p className="font-medium text-gray-900 mt-6">{closing}</p>}
              </div>

              <footer className="mt-10 border-t border-gray-200 pt-6 text-lg text-gray-900">
                <div className="text-sm font-semibold uppercase tracking-[0.45em] text-blue-500">
                  {lang === "KOR" ? "Signature" : "Signature"}
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-3 text-base sm:text-lg">
                  <span className="text-gray-600">{signatureTitle}</span>
                  <strong className="font-semibold text-slate-900">{signatureName}</strong>
                </div>
              </footer>
            </motion.article>

            <motion.aside
              className="lg:w-1/2 flex items-center justify-center lg:justify-end"
              variants={imageReveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="
                relative
                overflow-hidden
                rounded-2xl
                border border-gray-100
                shadow-xl
                w-40 h-40
                sm:w-56 sm:h-56
                md:w-64 md:h-64
                lg:w-72 lg:h-72
                xl:w-80 xl:h-80
                flex items-center justify-center
                bg-gradient-to-br from-blue-50 via-white to-blue-100
              ">
                <Image
                  src="/images/company/ceo/ceo.jpeg"
                  alt={lang === "KOR" ? "(주)수만 대표이사 임태형 사진" : "Portrait of Taehyung Lim, CEO of SUMAN"}
                  fill
                  className="object-cover"
                  sizes="(min-width:1280px) 20rem, (min-width:1024px) 18rem, (min-width:768px) 16rem, (min-width:640px) 14rem, 10rem"
                  priority
                />
              </div>
            </motion.aside>
          </div>
        </section>

        <hr className="my-6 border-gray-200" />
      </main>
    </Layout>
  );
}