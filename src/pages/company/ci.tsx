"use client";

import BreadcrumbSection from "@/components/BreadcrumbSection";
import Layout from "@/components/Layout";
import Image from "next/image";
import Head from "next/head";
import { motion, type Transition } from "framer-motion";
import HeroSection from "@/components/HeroSection";
import { useLangStore } from "@/stores/langStore";

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1 } as Transition },
};

export default function OrgPage() {
  const { lang } = useLangStore();

  const heroTitle = "CI";
  //const heroSubtitle = lang === "KOR" ? "회사소개" : "Company";
  const breadcrumbPath = lang === "KOR" ? "회사소개 > CI" : "Company > CI";
  const pageTitle = lang === "KOR" ? "CI | 수만" : "CI | SUMAN";

  const sectionTitle = lang === "KOR" ? "Coporate Identity" : "Corporate Identity";
  const sectionDesc =
    lang === "KOR"
      ? "수만(SUMAN)의 CI는 기업의 핵심 가치인 신뢰, 기술, 정밀성을 시각적으로 표현하고 있습니다."
      : "SUMAN's CI visually represents the core corporate values of trust, technology, and precision.";

  const logoTitle = "Logo";
  const logoDesc =
    lang === "KOR"
      ? "붉은 S는 열정과 에너지, 파란 M은 기술력과 신뢰를 의미하며, 두 문자의 결합은 기술을 통해 가치를 연결하는 수만의 철학을 상징합니다."
      : "The red S symbolizes passion and energy, while the blue M represents technology and trust. The combination embodies SUMAN's philosophy of connecting value through technology.";

  const monoAlt = lang === "KOR" ? "SUMAN 흑백 로고" : "SUMAN Mono Logo";
  const colorAlt = lang === "KOR" ? "SUMAN 컬러 로고" : "SUMAN Color Logo";
  
  return (
    <Layout>
      <Head>
        <title>{pageTitle}</title>
      </Head>

      <main className="min-h-screen bg-white pt-[90px] text-slate-900">
        <HeroSection
          title={heroTitle}
          backgroundImage="/images/sub_banner/company_banner.png"
        />

        <div className="relative z-30 -mt-8 sm:-mt-10">
          <BreadcrumbSection path={breadcrumbPath} />
        </div>

        {/* Page content (unchanged) */}
        <section className="content-wrapper py-24 px-4 md:px-8 bg-white flex justify-center items-center overflow-x-hidden">
          <div className="max-w-7xl mx-auto w-full flex flex-col items-center">
            <motion.div
              className="w-full max-w-7xl"
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              {/* Coporate Identity Section */}
              <div className="mb-24 sm:mb-32">
                <h2 className="text-base sm:text-lg lg:text-2xl font-semibold tracking-wide">
                  {sectionTitle}
                </h2>
                <div className="h-2 mt-3 w-1/4 bg-gradient-to-r from-[#2E3092] to-[#ED1B23]"></div>
                <p className="text-sm sm:text-base md:text-lg tracking-wide text-gray-700 mt-5">
                  {sectionDesc}
                </p>
              </div>

              {/* Logo Section */}
              <div className="mb-16">
                {/* 제목 + 버튼 한 줄 */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-5 gap-4">
                  <h3 className="text-base sm:text-lg lg:text-2xl font-semibold tracking-wide">
                    {logoTitle}
                  </h3>
                </div>

                <p className="text-sm sm:text-base md:text-lg tracking-wide text-gray-700 mb-10">
                  {logoDesc}
                </p>

                {/* 로고 이미지 영역 */}
                <div className="flex flex-col md:flex-row justify-center items-center gap-10 sm:gap-20 xl:gap-90">
                  <div className="relative w-64 h-64">
                    <Image
                      src="/images/company/ci/ci.png"
                      alt={monoAlt}
                      layout="fill"
                      objectFit="contain"
                    />
                  </div>
                  <div className="relative w-64 h-64 flex items-center justify-center rounded-lg">
                    <Image
                      src="/images/company/ci/ci_color.png"
                      alt={colorAlt}
                      layout="fill"
                      objectFit="contain"
                    />
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <a
                    href="/images/logo_suman.png"
                    download="SUMAN_logo.png"
                    className="text-sm sm:text-base font-medium bg-white text-black px-3 py-0.3 rounded-full border-2 border-gray-300 
                            hover:bg-gray-300 hover:text-black transition duration-200 tracking-wide"
                  >
                    PNG ↓
                  </a>
                </div>
              </div>

              {/* Color Code Section */}
              <div className="flex flex-col md:flex-row justify-center items-stretch gap-60 mt-65 w-full">
                {/* RED */}
                <div className="w-full max-w-sm p-5 shadow-md flex flex-col justify-between bg-[#ED1B23] relative">
                  <div className="mb-2 tracking-wide">
                    <h4 className="text-white text-2xl font-medium leading-tight">
                      SUMAN
                      <br />
                      RED
                    </h4>
                    <div className="absolute top-[40px] left-[130px] w-24 h-0.5 bg-white"></div>
                  </div>
                  <div className="text-right text-white tracking-wide">
                    <p>PANTONE 485 C</p>
                    <p>CMYK 0/100/100/0</p>
                    <p>RGB 237/27/35</p>
                    <p>HEX #ED1B23</p>
                  </div>
                </div>

                {/* BLUE */}
                <div className="w-full max-w-sm p-5 shadow-md flex flex-col justify-between bg-[#2E3092] relative">
                  <div className="mb-2 tracking-wide">
                    <h4 className="text-white text-2xl font-medium leading-tight">
                      SUMAN
                      <br />
                      BLUE
                    </h4>
                    <div className="absolute top-[40px] left-[130px] w-24 h-0.5 bg-white"></div>
                  </div>
                  <div className="text-right text-white tracking-wide">
                    <p>PANTONE 2736 C</p>
                    <p>CMYK 100/100/0/39</p>
                    <p>RGB 46/48/146</p>
                    <p>HEX #2E3092</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <hr className="my-6 border-gray-200 w-full" />
      </main>
    </Layout>
  );
}
