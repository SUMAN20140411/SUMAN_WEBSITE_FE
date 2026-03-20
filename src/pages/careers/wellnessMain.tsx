// src/pages/careers/wellnessMain.tsx

import BreadcrumbSection from "@/components/BreadcrumbSection";
import HeroSection from "@/components/HeroSection";
import Layout from "@/components/Layout";
import { wellnessContent, WellnessData } from "@/data/wellnessData";
import {
  wellnessPage,
  wellnessPageContent
} from "@/lib/strapi/careers/wellnessPage";
import { useLangStore } from "@/stores/langStore";
import { Icon } from "@iconify/react";
import { motion, type Variants } from "framer-motion"; // UPDATED: import Variants
import * as LucideIcons from "lucide-react";
import Head from "next/head";
import Image from "next/image";

// --- Wellness Card Component (keep style & effect) ---
const WellnessCard = ({
  item
}: {
  item: wellnessPageContent["section2"]["benefits"][0];
}) => {
  if (!item.icon.iconName) {
    return (
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="p-6 bg-[#0A1633] rounded-xl shadow-lg border border-gray-100 flex flex-col items-center text-center"
      >
        <div className="w-20 h-20 mb-4 bg-white/10 rounded-full flex items-center justify-center text-white">
          <LucideIcons.Image className="w-12 h-12" />
        </div>
        <h3 className="text-lg font-semibold mb-1 text-white">{item.name}</h3>
        <p className="text-sm text-gray-300">{item.description}</p>
        <p className="text-xs text-red-400 mt-2">Error: Icon not found</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="p-6 bg-[#0A1633] rounded-xl shadow-lg border border-gray-100 flex flex-col items-center text-center"
    >
      <div className="w-20 h-20 mb-4 bg-white/10 rounded-full flex items-center justify-center text-white">
        <Icon icon={item.icon.iconName || "Home"} width={48} height={48} />
      </div>
      <h3 className="text-lg font-semibold mb-1 text-white">{item.name}</h3>
      <p className="text-sm text-gray-300">{item.description}</p>
    </motion.div>
  );
};

// --- Main Wellness Page ---

export const getStaticProps = async () => {
  const content = await wellnessPage.find({
    locale: "ko-KR",
    populate: ["pageInfo", "section1", "section2", "section2.benefits"]
  });
  return { props: { content: content?.data } };
};

export default function WellnessPage({
  content
}: {
  content: wellnessPageContent;
}) {
  const { lang } = useLangStore();
  const currentData: WellnessData =
    wellnessContent[lang] || wellnessContent.KOR;

  // ===================== UPDATED: animasi judul/subtitle ala rnd.tsx =====================
  // Ganti easing string -> cubic-bezier agar cocok dgn tipe Easing pada motion-dom / framer-motion
  const titleFade: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } // UPDATED
    }
  };

  return (
    <Layout>
      <Head>
        <title>{content?.pageInfo?.title || "복리후생 | 수만"}</title>
        <meta
          name="description"
          content={
            lang === "KOR"
              ? "수만의 복리후생 프로그램을 확인해보세요"
              : "Explore SUMAN's employee wellness & benefits"
          }
        />
      </Head>

      <main className="min-h-screen bg-gradient-to-b from-white via-sky-50/30 to-white pt-[90px] text-slate-900">
        <HeroSection
          title={content?.pageInfo?.title || "복리후생"}
          backgroundImage={
            content?.pageInfo?.hero || "/images/sub_banner/careers_hero.png"
          }
        />

        <div className="relative z-30 -mt-8 sm:-mt-10">
          <BreadcrumbSection
            path={content?.pageInfo?.pageLocation || "인재 채용 > 복리후생"}
          />
        </div>

        {/* === PAGE LAYOUT mengikuti product.tsx (BIG LAYOUT ONLY) === */}
        <motion.div className="relative z-10 bg-gradient-to-b from-sky-50/50 via-white to-sky-50/30 pt-20 pb-20 px-4 md:px-8 rounded-none mt-0 overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none flex bg-no-repeat bg-top bg-contain"
            // style={{ backgroundImage: "url('/images/business/layer2.png')" }}
          />

          <div className="max-w-7xl mx-auto relative z-10">
            {/* ===================== UPDATED: Title + Subtitle block ala rnd.tsx ===================== */}
            <motion.div
              className="text-center mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={titleFade}
            >
              <p className="text-slate-600 text-lg max-w-3xl mx-auto leading-relaxed">
                {content?.section1?.title ||
                  "임직원 모두의 행복과 성장을 위해 실질적인 복지 혜택을 제공합니다."}
              </p>
            </motion.div>
            {/* ===================== END UPDATED ==================================================== */}

            {currentData.sections.map((section, sectionIndex) => (
              <div key={section.key} className="mb-20">
                {/* === Keep section style & effect (hero per section) === */}
                <div className="relative h-64 overflow-hidden mb-12 rounded-lg shadow-lg">
                  <Image
                    src={
                      content?.section2?.hero || "/images/wellness/life_bg.png"
                    }
                    alt={content?.section2?.title || "복리후생"}
                    fill
                    className="w-full h-full object-cover object-center brightness-75"
                    priority={sectionIndex === 0}
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
                    {/* ===================== UPDATED: ukuran judul per-section ala rnd.tsx ===================== */}
                    <h2 className="text-3xl md:text-4xl font-bold mb-2">
                      {content?.section2?.title || "복리후생"}
                    </h2>
                    {/* ===================== UPDATED: tampilkan subtitle jika ada, ala rnd.tsx ================ */}
                  </div>
                </div>

                {/* === Keep grid effects exactly as before === */}
                {sectionIndex === 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-7xl mx-auto">
                    {content?.section2?.benefits?.map(
                      (
                        item: wellnessPageContent["section2"]["benefits"][0],
                        idx
                      ) => (
                        <div key={idx}>
                          <WellnessCard item={item} />
                        </div>
                      )
                    )}
                  </div>
                ) : (
                  <motion.div
                    className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-7xl mx-auto"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={{
                      hidden: { opacity: 0 },
                      visible: {
                        opacity: 1,
                        transition: { staggerChildren: 0.1 }
                      }
                    }}
                  >
                    {content?.section2?.benefits?.map(
                      (
                        item: wellnessPageContent["section2"]["benefits"][0],
                        idx
                      ) => (
                        <motion.div
                          key={idx}
                          variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0 }
                          }}
                        >
                          <WellnessCard item={item} />
                        </motion.div>
                      )
                    )}
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Hapus garis pemisah agar blok biru menempel ke footer (seperti product.tsx) */}
        {/* <hr className="my-6 border-gray-200 w-full" /> */}
      </main>
    </Layout>
  );
}
