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
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: "easeOut" } as Transition,
  },
};

const imageReveal = {
  hidden: { opacity: 0, y: 24, scale: 0.94 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 1.05, ease: "easeOut" } as Transition,
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
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
            <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
              <motion.article
                className="space-y-8 text-left lg:pr-12"
                variants={textReveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                style={{ fontFamily }}
              >
                <header className="space-y-5">
                  <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-blue-600">
                    {lang === "KOR" ? "CEO 메시지" : "Message from the CEO"}
                  </span>
                  <h2 className="flex flex-wrap items-baseline text-3xl font-extrabold leading-snug tracking-tight text-slate-900 sm:text-4xl md:text-[2.75rem]">
                    <span className="text-blue-600">{hero.primary}</span>
                    <span className="ml-2 text-slate-900">{hero.secondary}</span>
                  </h2>
                </header>

                <div className="max-w-2xl space-y-5 text-[1.05rem] leading-8 tracking-tight text-gray-800 sm:text-lg">
                  {paragraphs.map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                  {closing ? <p className="text-gray-900">{closing}</p> : null}
                </div>

                <footer className="pt-6 text-base text-gray-900 sm:text-lg">
                  <div className="font-medium text-gray-700">
                    {signatureTitle}
                    <span className="ml-3 font-semibold text-slate-900">{signatureName}</span>
                  </div>
                </footer>
              </motion.article>

              <motion.aside
                className="relative flex w-full items-start justify-center lg:justify-end"
                variants={imageReveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                <div className="relative aspect-[5/6] w-full max-w-[460px] overflow-hidden border border-slate-200 bg-white shadow-[0_28px_60px_rgba(15,23,42,0.12)]">
                  <Image
                    src="/images/company/ceo/ceo.jpeg"
                    alt={
                      lang === "KOR"
                        ? "(주)수만 대표이사 임태형 사진"
                        : "Portrait of Taehyung Lim, CEO of SUMAN"
                    }
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 460px, (min-width: 768px) 60vw, 90vw"
                    priority
                  />
                  <span className="pointer-events-none absolute inset-0 border border-white/20" aria-hidden="true" />
                </div>
              </motion.aside>
            </div>
          </div>
        </section>

        <hr className="my-6 border-gray-200" />
      </main>
    </Layout>
  );
}
