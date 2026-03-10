// app/company/ceo/page.tsx
"use client";

import BreadcrumbSection from "@/components/BreadcrumbSection";
import HeroSection from "@/components/HeroSection";
import Layout from "@/components/Layout";
import { ceoPage, ceoPageContent } from "@/lib/strapi/company/ceoPage";
import { useLangStore } from "@/stores/langStore";
import { motion, type Transition } from "framer-motion";
import { GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";

const slideInRight = {
  hidden: { opacity: 0, y: 80 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 2, ease: "easeOut" } as Transition
  }
};

const textReveal = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.6, ease: "easeOut" } as Transition
  }
};

export const getStaticProps: GetStaticProps = async () => {
  const content = await ceoPage.find({
    locale: "ko-KR",
    populate: ["pageInfo", "messages", "signatures"] // populates all relations/media 1 level deep
  });
  return { props: { content: content?.data } };
};

export default function CeoPage({ content }: { content: ceoPageContent }) {
  const lang = useLangStore((state) => state.lang);

  const heroTitle =
    content.pageInfo.title || (lang === "KOR" ? "CEO 인사말" : "CEO Message");
  const fontFamily =
    "'Malgun Gothic', '맑은 고딕', 'Apple SD Gothic Neo', 'Nanum Gothic', sans-serif";

  return (
    <Layout>
      <Head>
        <title>
          {content.pageInfo.title ||
            (lang === "KOR" ? "CEO 인사말 | 수만" : "CEO Message | SUMAN")}
        </title>
      </Head>

      <main className="min-h-screen bg-white pt-[90px] text-slate-900">
        <HeroSection
          title={heroTitle}
          backgroundImage={
            content.pageInfo.hero || "/images/sub_banner/ceo_hero.png"
          }
        />

        <div className="relative z-30 -mt-8 sm:-mt-10">
          <BreadcrumbSection
            path={
              content.pageInfo.pageLocation ||
              (lang === "KOR"
                ? "회사 소개 > CEO 인사말"
                : "Company > CEO Message")
            }
          />
        </div>

        <section className="bg-white">
          <div className="max-w-7xl mx-auto px-6 md:px-[60px] lg:px-[0px] py-16 lg:py-20 flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-16">
            {/* LEFT - Text Content */}
            <motion.article
              className="lg:w-1/2 flex flex-col"
              variants={textReveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              style={{ fontFamily }}
            >
              <div className="w-full max-w-[550px]">
                {/* Hero Text */}
                <h2 className="text-2xl md:text-3xl font-bold text-gray-500 mb-1">
                  {content.title}
                </h2>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">
                  {content.subtitle}
                </h3>

                {/* Paragraphs */}
                <div className="space-y-4 text-gray-700 text-sm md:text-base leading-relaxed">
                  {content.messages.map((paragraph, index) => (
                    <p key={Math.random()}>{paragraph.text}</p>
                  ))}
                </div>

                {/* Signature */}
                <div className="mt-6">
                  <p className="text-xs text-gray-400 tracking-widest mb-2">
                    SIGNATURE
                  </p>
                  <p className="text-gray-700">
                    {content.signatures[0].position}{" "}
                    <span className="font-bold text-gray-900">
                      {content.signatures[0].name}
                    </span>
                  </p>
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
                    src={content.img || "/images/company/ceo/ceo.jpeg"}
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
