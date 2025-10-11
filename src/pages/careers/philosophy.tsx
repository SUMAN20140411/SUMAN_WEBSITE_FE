import Layout from "@/components/Layout";
import HeroSection from "@/components/HeroSection";
import BreadcrumbSection from "@/components/BreadcrumbSection";
import { motion, type Transition } from "framer-motion";
import Image from "next/image";
import { Herotext, traits as traitData } from "@/data/philosophy";
import { useLangStore } from "@/stores/langStore";
import Head from "next/head";
import Link from "next/link";

// TalentCard component
function TalentCard({
  traitData,
  bgImage,
  className = "",
}: {
  traitData: { title: string; desc: string };
  bgImage: string;
  className?: string;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`relative flex flex-col justify-end rounded-2xl overflow-hidden shadow-xl group ${className}`}
      style={{ aspectRatio: '1/1' }}
    >
      <Image
        src={bgImage}
        alt={traitData.title}
        fill
        className="object-cover object-center absolute inset-0 z-0 transition-transform duration-500 group-hover:scale-105 brightness-110 contrast-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10"></div>
      <div className="relative z-20 p-4 sm:p-5 text-white">
        <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-1 sm:mb-2 whitespace-pre-line drop-shadow-md">
          {traitData.title}
        </h3>
        <p className="text-xs sm:text-sm whitespace-pre-line leading-relaxed text-white/90 drop-shadow-sm">
          {traitData.desc}
        </p>
      </div>
    </motion.div>
  );
}

export default function TalentPage() {
  const lang = useLangStore((state) => state.lang);
  const currentText = Herotext[lang];
  const traits = traitData[lang];
  
  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" } as Transition,
    },
  };

  const staggerContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemRiseVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" } as Transition,
    },
  };

  return (
    <>
    <Layout>
      <Head>
        <title>{lang === "KOR" ? "인재상" : "Ideal Candidate "}</title>
        <meta
          name="description"
          content={
            lang === "KOR"
              ? "수만의 인재상과 핵심 가치를 확인해보세요"
              : "Discover SUMAN's Ideal Candidate and core values"
          }
        />
      </Head>
      <main className="min-h-screen bg-white pt-[90px] text-slate-900">
        <HeroSection
          title={lang === "KOR" ? "인재상" : "Ideal Candidate"}
          backgroundImage="/images/sub_banner/careers_hero.png"
        />
        
        <div className="relative z-30 -mt-8 sm:-mt-10">
          <BreadcrumbSection
            path={lang === "KOR" ? "인재 채용 > 인재상" : "Recruitment > Ideal Candidate"}
          />
        </div>

        <div className="content-wrapper py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 sm:mb-16 md:mb-20 w-full">
              <div className="group relative max-w-4xl w-full mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-10 md:py-12 bg-white rounded-2xl shadow-lg">
                <div className="relative z-10">
                  <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-4 sm:mb-5 md:mb-6 shadow-lg">
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>

                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 md:mb-5 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent leading-tight">
                    {currentText.title}
                  </h2>

                  <div className="w-12 sm:w-14 md:w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-3 sm:mb-4 md:mb-5"></div>

                  <p className="text-sm sm:text-base md:text-lg leading-relaxed text-gray-600 max-w-3xl mx-auto font-light px-2 sm:px-0">
                    {currentText.desc}
                  </p>

                  {/* Interactive elements */}
                  <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 md:gap-5 mt-6 sm:mt-7 md:mt-8">
                    <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-500">
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span>{currentText.state}</span>
                    </div>
                    <div className="hidden sm:block w-px h-4 sm:h-5 bg-gray-200"></div>
                    <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-500">
                      <svg
                        className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                      <span>{currentText.position}</span>
                    </div>
                  </div>
                  <div className="mt-6 sm:mt-7 md:mt-8">
                    <Link
                      href="/careers/notice"
                      className="inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 md:px-6 py-1.5 sm:py-2 md:py-2.5 bg-gray-900 text-white text-xs sm:text-sm md:text-base font-semibold rounded-full hover:bg-gray-800 transition-colors duration-200"
                    >
                      <span>{lang === "KOR" ? "지원하기" : "Apply Now"}</span>
                      <svg
                        className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Enlarged card grid for better visibility across devices */}
            <div className="w-full max-w-7xl mx-auto">
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 sm:gap-6 md:gap-7 justify-items-center"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={staggerContainerVariants}
              >
                {traits.map((trait) => (
                  <motion.div 
                    key={trait.key} 
                    className="flex justify-center w-full"
                    variants={itemRiseVariants}
                  >
                    <TalentCard
                      traitData={{ title: trait.title, desc: trait.desc }}
                      bgImage={trait.bgImage}
                      className="w-full max-w-[308px] sm:max-w-[330px] md:max-w-[352px] xl:max-w-[374px]"
                    />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 w-full" />
        </main>
      </Layout>
    </>
  );
}