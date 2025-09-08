import Layout from "@/components/Layout";
import HeroSection from "@/components/HeroSection";
import BreadcrumbSection from "@/components/BreadcrumbSection";
import { motion, type Transition } from "framer-motion";
import Image from "next/image";
import { serviceContent } from "@/data/service";
import { useLangStore } from "@/stores/langStore";
import Head from "next/head";
// Import the required icons from Lucide React
import {
  Users,
  FileText,
  XCircle,
  Settings,
  Package,
  ArrowLeft,
  Truck,
  RotateCcw,
} from "lucide-react";

export default function ServicePage() {
  const { lang } = useLangStore();
  const { equipmentList, measurementEquipmentList } = serviceContent[lang];
  const section = serviceContent[lang].sectionList?.[0];

  const processImages = [
    "/images/business/process/service_design.png",
    "/images/business/process/service_order.png",
    "/images/business/process/service_product.png",
    "/images/business/process/service_test.png",
    "/images/business/process/service_deliver.png",
  ];

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } as Transition },
  };

  const content = {
    KOR: {
      image: "/images/business/process/gambarKorean.png",
      alt: "조직도",
      pageTitle: "조직도",
    },
    ENG: {
      image: "/images/business/process/gambarEng.png",
      alt: "Organization Chart",
      pageTitle: "Organization",
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" } as Transition,
    },
  };

  const CM_TO_PX = 37.8;
  const HERO_TRIM_PX = Math.round(CM_TO_PX);

  const leftAlignTextVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" } as Transition,
    },
  };

  const currentContent = content[lang as keyof typeof content];

  return (
    <>
      <Layout>
        <Head>
          <title>{lang === "KOR" ? "기술소개 " : "Technology"}</title>
        </Head>

        <main className="min-h-screen bg-white text-slate-900" style={{ paddingTop: "90px" }}>
          {/* Trim hero 1cm top/bottom */}
          <div
            style={{
              marginTop: `-${HERO_TRIM_PX}px`,
              marginBottom: `-${HERO_TRIM_PX}px`,
            }}
          >
            <HeroSection
              title={lang === "KOR" ? "기술 소개" : "Technology"}
              backgroundImage="/images/sub_banner/business_hero.png"
            />
          </div>

          {/* Keep breadcrumb visible and close to hero */}
          <div className="relative z-30 -mt-2">
            <BreadcrumbSection
              path={lang === "KOR" ? "사업분야 > 기술소개" : "Business > Technology"}
            />
          </div>

          {/* 1. Main Equipment Section */}
          <div className="bg-white py-12 md:py-20 px-4">
            <div className="max-w-7xl mx-auto">
              <motion.h2
                className="text-base sm:text-lg lg:text-2xl font-semibold tracking-wide mb-6 md:mb-10"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={leftAlignTextVariants}
              >
                Main Equipment
              </motion.h2>
              <motion.p
                className="text-xl md:text-2xl lg:text-4xl font-bold tracking-wide leading-[1.3]"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={leftAlignTextVariants}
              >
                {section?.maintitle}
                <br />
                {section?.mainsubtitle}
              </motion.p>
            </div>
          </div>

          {/* 2. 생산가공 / 측정장비 Section */}
          <div className="relative z-0 bg-[#000B24] pt-12 md:pt-20 pb-6 md:pb-8 px-4">
            <div className="absolute inset-0 pointer-events-none">
              <Image
                src="/images/business/layer.png"
                alt="배경 이미지"
                fill
                style={{ objectFit: "cover", objectPosition: "top" }}
                priority
              />
            </div>

            <div className="max-w-7xl mx-auto">
              <motion.div className="relative transition-all duration-500 ease-in-out">
                {/* 생산가공 / 조립 */}
                <motion.button
                  className="text-base sm:text-lg bg-[#505050]/40 text-white rounded-full px-6 py-1 mb-10 md:mb-16"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={leftAlignTextVariants}
                >
                  {section?.production}
                </motion.button>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                  {equipmentList.map((equipment, index) => (
                    <motion.div
                      key={`prod-${index}`}
                      className="relative bg-white/10 rounded-lg overflow-hidden shadow-lg w-full p-2 border-2 border-gray-400/10 h-[calc(10rem+114px)] md:h-[calc(12.5rem+114px)]"
                      variants={itemVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.3 }}
                    >
                      <div className="w-full h-[calc(5rem+95px)] md:h-[calc(7rem+95px)] relative mb-0">
                        {equipment.image && (
                          <Image
                            src={equipment.image}
                            alt={equipment.name}
                            fill
                            className="object-cover rounded-[10px]"
                          />
                        )}
                      </div>

                      <div className="absolute bottom-0 left-0 w-full h-10 md:h-12 bg-[#1F2432]/70 px-3 flex items-center justify-center border border-gray-500/10">
                        <p className="text-sm md:text-base font-medium text-white line-clamp-1">
                          {equipment.name}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* 신뢰성 (측정 / 분석) */}
                <button className="text-base sm:text-lg bg-[#505050]/40 text-white rounded-full px-6 py-1 mb-10 md:mb-16 mt-16 md:mt-28">
                  {section?.measurement}
                </button>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                  {measurementEquipmentList.map((equipment, index) => (
                    <motion.div
                      key={`meas-${index}`}
                      className="relative bg-white/10 rounded-lg overflow-hidden shadow-lg w-full p-2 border-2 border-gray-400/10 h-[calc(10rem+114px)] md:h-[calc(12.5rem+114px)]"
                      variants={itemVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.3 }}
                    >
                      <div className="w-full h-[calc(5rem+95px)] md:h-[calc(7rem+95px)] relative mb-0">
                        {equipment.image && (
                          <Image
                            src={equipment.image}
                            alt={equipment.name}
                            fill
                            className="object-cover rounded-[10px]"
                          />
                        )}
                      </div>

                      <div className="absolute bottom-0 left-0 w-full h-10 md:h-12 bg-[#1F2432]/70 px-3 flex items-center justify-center">
                        <p className="text-sm md:text-base font-medium text-white line-clamp-1">
                          {equipment.name}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* 3. Process Section */}
          <div className="content-wrapper py-20 px-4 md:px-8 bg-white flex justify-center items-center">
            <div className="max-w-7xl mx-auto w-full flex flex-col items-center">
              <h2 className="self-start w-full text-left text-sm sm:text-base lg:text-2xl font-semibold tracking-wide mb-4 md:mb-6">
                PROCESS
              </h2>
              <motion.div
                className="w-full"
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                <div className="relative w-full h-auto overflow-hidden rounded-lg px-[7.5%] md:px-[15%] lg:px-[20%]">
                  <Image
                    src={currentContent.image}
                    alt={currentContent.alt}
                    width={1400}
                    height={1000}
                    layout="responsive"
                    objectFit="contain"
                    className="w-full h-auto"
                    priority
                  />
                </div>
              </motion.div>
            </div>
          </div>

          <hr className="my-6 border-gray-200 w-full" />
        </main>
      </Layout>
    </>
  );
}
