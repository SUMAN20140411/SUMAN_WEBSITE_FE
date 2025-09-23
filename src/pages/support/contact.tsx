import Layout from "@/components/Layout";
import HeroSection from "@/components/HeroSection";
import BreadcrumbSection from "@/components/BreadcrumbSection";
import { motion } from "framer-motion";
import Head from "next/head";
import { useLangStore } from "@/stores/langStore";

export default function HistoryPage() {
  const { lang } = useLangStore();

  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const,
      },
    },
  };
  const CM_TO_PX = 37.8;                       // UPDATED
  const HERO_TRIM_PX = Math.round(CM_TO_PX); 
  const contactInfo = [
    { label: lang === "KOR" ? "이름 / 소속 / 연락처 / 문의부서 / 문의내용" : "Name / Affiliation / Phone / Department / Inquiry Contents", value: "" },
  ];

  return (
    <>
    <Layout>
      <Head>
        <title>{lang === "KOR" ? "문의하기 | 수만" : "Contact Us | SUMAN"}</title>
      </Head>
      <main className="min-h-screen bg-white text-slate-900" style={{ paddingTop: "90px" }}>
        {/* === UPDATED: Bungkus HeroSection dengan negative margin top/bottom (1cm per sisi) === */}
        <div                                       // UPDATED
          style={{                                 // UPDATED
            marginTop: `-${HERO_TRIM_PX}px`,       // UPDATED
            marginBottom: `-${HERO_TRIM_PX}px`,    // UPDATED
          }}                                       // UPDATED
        >
        <HeroSection
          title={lang === "KOR" ? "문의하기" : "Contact Us"}
          backgroundImage="/images/sub_banner/support_banner.png"
        /> </div>
        {/* === UPDATED: Nempelin breadcrumb ke hero (sedikit -mt agar benar-benar rapat) === */}
        <div className="relative z-30 -mt-2">    
        <BreadcrumbSection
          path={lang === "KOR" ? "고객지원 > 문의하기" : "Support > Contact Us"}
        /></div>

        <div className="content-wrapper py-12 md:py-20 px-4 md:px-8 bg-white">
          <div className="max-w-4xl mx-auto w-full">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInVariants}
              className="bg-white rounded-lg p-6 md:p-8 shadow-lg border border-gray-100"
            >
              <section className="w-full">
                <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-gray-800">
                  {lang === "KOR" ? "문의하기" : "Inquiry"}
                </h2>

                <div className="mb-10 p-5 bg-blue-50 rounded-lg border border-blue-100">
                  <p className="text-base md:text-lg text-gray-700 text-center">
                    {lang === "KOR"
                      ? "아래의 내용을 기재하여 하단의 메일주소로 문의 주시면 신속하게 답변드리도록 하겠습니다."
                      : "Please fill out the information below and send it to the email address below. \We will respond promptly."}
                  </p>
                </div>

                {/* Form rows dengan ":" rata kiri */}
                <div className="space-y-6 mb-6">
                  {contactInfo.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-baseline border-b border-gray-200 pb-4"
                    >
                      {/* Label (lebar tetap) */}
                      <div className="shrink-0 w-28 sm:w-40 md:w-56 lg:w-64 font-semibold text-gray-800 text-lg whitespace-nowrap">
                        {item.label}
                      </div>

                      {/* Nilai */}
                      <div className="flex-1 min-h-[1.75rem] text-gray-600">
                        {item.value}
                      </div>
                    </div>
                  ))}
                </div>

                {/* === UPDATED: Bagian bawah disesuaikan seperti screenshot === */}
                <div className="mt-1 space-y-1">
                  <div className="flex items-baseline text-sm md:text-base">
                    <span className="font-semibold text-blue-600 mr-2">
                      {lang === "KOR" ? "영업" : "Sales"}
                    </span>
                    <a
                      href="mailto:bksikk@suman.co.kr"
                      className="text-gray-800 no-underline hover:text-blue-600"
                    >
                      bksikk@suman.co.kr
                    </a>
                  </div>
                  <div className="flex items-baseline text-sm md:text-base">
                    <span className="font-semibold text-blue-600 mr-2">
                      {lang === "KOR" ? "기술" : "Technical"}
                    </span>
                    <a
                      href="mailto:nsmyoung@suman.co.kr"
                      className="text-gray-800 no-underline hover:text-blue-600"
                    >
                      nsmyoung@suman.co.kr
                    </a>
                  </div>
                  <div className="flex items-baseline text-sm md:text-base">
                    <span className="font-semibold text-blue-600 mr-2">
                      {lang === "KOR" ? "인사" : "HR"}
                    </span>
                    <a
                      href="mailto:suman5713@suman.co.kr"
                      className="text-gray-800 no-underline hover:text-blue-600"
                    >
                      suman5713@suman.co.kr
                    </a>
                  </div>
                  <div className="flex items-baseline text-sm md:text-base">
                    <span className="font-semibold text-blue-600 mr-2">
                      {lang === "KOR" ? "대표 연락처" : "CEO Contact Information"}
                    </span>
                    <a
                      href="042 - 434 - 1517"
                      className="text-gray-800 no-underline hover:text-blue-600"
                    >
                      042-934-1517
                    </a>
                  </div>
                </div>
                {/* === END UPDATED === */}
              </section>
            </motion.div>
          </div>
        </div>
        <hr className="my-8 border-gray-200 w-full" />
        </main>
      </Layout>
    </>
  );
}
