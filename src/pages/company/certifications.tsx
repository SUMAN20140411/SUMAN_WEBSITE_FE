"use client";

import Layout from "@/components/Layout";
import HeroSection from "@/components/HeroSection";
import BreadcrumbSection from "@/components/BreadcrumbSection";
import { motion, AnimatePresence, type Transition } from "framer-motion";
import Head from "next/head";
import Image from "next/image";
import { useLangStore } from "@/stores/langStore";
import { useState } from "react";
import { GetStaticProps } from "next";
import {
  certificatePage,
  certificatePageContent
} from "@/lib/strapi/company/certificatePage";
import {
  certificates,
  certificatesContent
} from "@/lib/strapi/collections/certificate";

const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" } as Transition
  }
};

export const getStaticProps: GetStaticProps = async () => {
  const content = await certificatePage.find({
    locale: "ko-KR",
    populate: ["pageInfo", "section1", "section1.keywords", "certificates"]
  });
  const certificatesData = await certificates.find({
    locale: "ko-KR",
    filters: {
      publishedAt: {
        $notNull: true
      }
    }
  });
  return {
    props: { content: content?.data, certificatesData: certificatesData?.data }
  };
};

export default function CertificationsPage({
  content,
  certificatesData
}: {
  content: certificatePageContent;
  certificatesData: certificatesContent;
}) {
  const { lang } = useLangStore();
  const [showMore, setShowMore] = useState(false);
  const handleToggleMore = () => setShowMore((prev) => !prev);

  const certData = [
    {
      labelKOR: "ISO 9001",
      labelENG: "ISO 9001",
      img: "/images/company/Certifications/ISO_9001.png"
    },
    {
      labelKOR: "ISO 14001",
      labelENG: "ISO 14001",
      img: "/images/company/Certifications/ISO_14001.png"
    },
    {
      labelKOR: "ISO 45001",
      labelENG: "ISO 45001",
      img: "/images/company/Certifications/ISO_45001.png"
    },
    {
      labelKOR: "기업부설연구소",
      labelENG: "Company Research Institute",
      img: "/images/company/Certifications/기업부설연구소 인정서.png"
    },
    {
      labelKOR: "소재 부품 장비 전문기업",
      labelENG: "Materials & Equipment Specialist",
      img: "/images/company/Certifications/소재부품장비 전문기업확인서.png"
    },
    {
      labelKOR: "피스톤링 제조기술 특허",
      labelENG: "Piston Ring Patent",
      img: "/images/company/Certifications/특허_피스톤제조.png"
    },
    {
      labelKOR: "스웰링 측정용 지그 특허",
      labelENG: "Swelling Jig Patent",
      img: "/images/company/Certifications/특허_스웰링측정용지그.png"
    },
    {
      labelKOR: "전력관리시스템 특허",
      labelENG: "Power System Patent",
      img: "/images/company/Certifications/특허_전력관리시스템.png"
    },
    {
      labelKOR: "전선가공장치 특허",
      labelENG: "Cable Processing Patent",
      img: "/images/company/Certifications/특허_전선가공장치.png"
    },
    {
      labelKOR: "주물성형분리장치 특허",
      labelENG: "Casting Separation Patent",
      img: "/images/company/Certifications/특허_주물성형분리장치.png"
    }
  ];

  let certDataToUse =
    content.certificates.length > 0
      ? content.certificates
      : certificatesData.length > 0
      ? certificatesData
      : certData.map((cert) => ({ name: cert.labelKOR, file: cert.img }));

  const visibleCerts = certDataToUse.slice(0, 8);
  const moreCerts = certDataToUse.slice(8);

  return (
    <>
      <Head>
        <title>{content.pageInfo?.title || "인증 현황"}</title>
      </Head>

      <Layout>
        <main className="min-h-screen bg-white pt-[90px] text-slate-900">
          <HeroSection
            title={content.pageInfo?.title || "인증 현황"}
            backgroundImage={
              content.pageInfo?.hero || "/images/sub_banner/company_banner.png"
            }
          />

          <div className="relative z-30 -mt-8 sm:-mt-10">
            <BreadcrumbSection
              path={content.pageInfo?.pageLocation || "회사소개 > 인증 현황"}
            />
          </div>

          <section className="relative z-30 bg-white py-20 px-4 md:px-8 flex justify-center items-center">
            <div className="max-w-7xl mx-auto w-full">
              <motion.div
                className="relative z-20 w-full flex flex-col md:flex-row items-start md:items-center gap-4 mb-10"
                initial="hidden"
                whileInView="visible"
                variants={fadeInVariants}
                viewport={{ once: true, amount: 0.3 }}
              >
                <p className="text-base sm:text-lg lg:text-2xl font-semibold text-black">
                  {content.section1?.title || "Certifications"}
                </p>
                <div className="flex-grow" />
              </motion.div>

              <motion.div
                className="text-left text-black whitespace-pre-line mb-4 w-full"
                initial="hidden"
                whileInView="visible"
                variants={fadeInVariants}
                viewport={{ once: true, amount: 0.3 }}
              >
                <p className="text-xl md:text-2xl lg:text-4xl font-bold mb-4 md:mb-7 tracking-wide leading-[1.3]">
                  {content.section1?.description ||
                    "정부기관의 인증을 비롯해\nISO 품질·환경·안전경영 시스템을 모두 구축하여\n고객 중심의 고신뢰 생산 체계를 갖추고 있습니다."}
                </p>
              </motion.div>

              <motion.div
                className="flex gap-2 mt-1 sm:mt-8 w-full"
                initial="hidden"
                whileInView="visible"
                variants={fadeInVariants}
                viewport={{ once: true, amount: 0.3 }}
              >
                {(
                  content.section1?.keywords?.map(
                    (keyword) => keyword.title
                  ) || ["Technology Certification", "Quality Assurance"]
                ).map((tag, i) => (
                  <span
                    key={`keyword-${i}`}
                    className="bg-gray-100 text-blue-700 px-3 py-0.5 text-xs lg:text-lg font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </motion.div>

              <motion.div
                className="w-full flex justify-end mt-10"
                initial="hidden"
                whileInView="visible"
                variants={fadeInVariants}
                viewport={{ once: true }}
              >
                <button
                  onClick={handleToggleMore}
                  className="text-sm sm:text-base bg-gray-100 text-gray-800 rounded-full px-4 py-2 hover:bg-gray-300 transition"
                >
                  {lang === "KOR"
                    ? "전체 업적 보기"
                    : "Show All Certifications"}
                  <span className="ml-2 text-lg">{showMore ? "-" : "+"}</span>
                </button>
              </motion.div>

              {/* Visible Certs */}
              <div className="grid grid-cols-1 lg:grid-cols-1 gap-15 mt-30 w-full">
                {[0, 1].map((rowIndex) => {
                  const certGroup = visibleCerts.slice(
                    rowIndex * 4,
                    rowIndex * 4 + 4
                  );
                  const fromLeft = rowIndex % 2 === 0;
                  return (
                    <motion.div
                      key={rowIndex}
                      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-20"
                      initial={{ x: fromLeft ? -200 : 200, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      transition={{ duration: 1 }}
                      viewport={{ once: true }}
                    >
                      {certGroup.map((cert, i) => (
                        <div key={i} className="group text-center">
                          <button
                            title={cert.name}
                            className="w-full py-3 px-5 bg-white shadow rounded-full text-lg font-semibold text-gray-800 hover:shadow-lg transition truncate tracking-wide"
                          >
                            {cert.name}
                          </button>
                          <div className="w-48 mx-auto transition-all duration-500 ease-in-out max-h-0 overflow-hidden group-hover:max-h-96">
                            <Image
                              src={cert.file}
                              alt={cert.name}
                              width={192}
                              height={192}
                              className="rounded shadow-xl transform scale-95 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 mt-3"
                            />
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  );
                })}
              </div>

              {/* More */}
              <AnimatePresence initial={false}>
                {showMore && (
                  <motion.div
                    className="overflow-visible w-full mt-15"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                  >
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-20 mt-10 pb-6">
                      {moreCerts.map((cert, i) => (
                        <div key={i} className="group text-center col-span-1">
                          <button
                            title={cert.name}
                            className="w-full py-3 px-5 bg-white shadow rounded-full text-lg font-semibold text-gray-800 hover:shadow-lg transition truncate tracking-wide"
                          >
                            {cert.name}
                          </button>
                          <div className="w-48 mx-auto transition-all duration-500 ease-in-out max-h-0 overflow-hidden group-hover:max-h-96">
                            <Image
                              src={cert.file}
                              alt={cert.name}
                              width={192}
                              height={192}
                              className="rounded shadow-xl transform scale-95 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 mt-3"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </section>

          <hr className="my-6 border-gray-200 w-full" />
        </main>
      </Layout>
    </>
  );
}
