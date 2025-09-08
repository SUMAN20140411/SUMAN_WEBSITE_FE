"use client";

import Layout from "@/components/Layout";
import HeroSection from "@/components/HeroSection";
import BreadcrumbSection from "@/components/BreadcrumbSection";
import { motion, type Transition } from "framer-motion";
import { useLangStore } from "@/stores/langStore";
import { heroText, businessAreasData } from "@/data/rnd";
import Image from "next/image";
import { CheckCircle, Cog, Cpu, Car } from "lucide-react";
import { useEffect } from "react";
import Head from "next/head";

export default function App() {
  const { lang } = useLangStore();
  
  // Set document title
  useEffect(() => {
    document.title = lang === "KOR" ? "사업영역" : "Business Areas";
  }, [lang]);
  
  const hero = heroText[lang];
  const businessData = businessAreasData[lang];


  // Animation variants
  const fadeIn: Record<"hidden" | "visible", any> = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } as Transition },
  };

  const cardHover = {
    rest: { scale: 1, y: 0 },
    hover: { scale: 1.02, y: -5, transition: { duration: 0.3 } as Transition }
  };
  const CM_TO_PX = 37.8;                       // UPDATED
  const HERO_TRIM_PX = Math.round(CM_TO_PX);

  return (
    <Layout>
      <Head>
        <title>{lang === "KOR" ? "연구분야 | 수만" : "Research Fields | SUMAN"}</title>
        </Head>
        <main className="min-h-screen bg-white text-slate-900" style={{ paddingTop: '90px' }}>
        {/* === Hero (same pattern as ceo.tsx) === */}
        <div
          style={{
            marginTop: `-${HERO_TRIM_PX}px`,
            marginBottom: `-${HERO_TRIM_PX}px`,
          }}
        >
          <HeroSection
            title={hero.title}
            backgroundImage="/images/sub_banner/business_hero.png"
          />
        </div>

        {/* Breadcrumb close to hero (like ceo.tsx) */}
        <div className="relative z-30 -mt-2">
          <BreadcrumbSection path={lang === "KOR" ? "사업분야 > 연구분야" : "Business > Research Fields"} />
        </div>

        {/* Main Business Areas Section */}
        <motion.section
          className="py-16 md:py-24 px-4 md:px-8 bg-white"
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="text-center mb-16"
              variants={fadeIn}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {lang === 'KOR' ? '핵심 연구 분야' : 'Core Research Fields'}
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {lang === 'KOR' 
                  ? '최첨단 기술과 혁신적인 솔루션으로 다양한 산업 분야에서 고객의 성공을 지원합니다.'
                  : 'Supporting customer success across various industries with cutting-edge technology and innovative solutions.'
                }
              </p>
            </motion.div>

            {/* Business Areas Grid */}
            <motion.div
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {/* Semiconductor */}
              <motion.div
                className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
                variants={itemVariants}
                whileHover="hover"
                initial="rest"
              >
                <motion.div variants={cardHover}>
                  <div className="relative h-64">
                    <Image
                      src="https://images.unsplash.com/photo-1583737097428-af53774819a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZW1pY29uZHVjdG9yJTIwbWFudWZhY3R1cmluZyUyMGVxdWlwbWVudCUyMGZhY3Rvcnl8ZW58MXx8fHwxNzU2MzcyODUxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                      alt="Semiconductor Equipment"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <Cpu className="w-8 h-8 mb-2" />
                      <h3 className="text-lg font-semibold">{businessData.semiconductor.subtitle}</h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-4">{businessData.semiconductor.title}</h4>
                    <div className="space-y-3">
                      {businessData.semiconductor.services.map((service, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-700 leading-relaxed">{service}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 pt-4 border-t border-gray-100">
                      <h5 className="font-semibold text-gray-900 mb-3">
                        {lang === 'KOR' ? '이차전지 제조 및 신뢰성 장비' : 'Secondary Battery & Reliability Equipment'}
                      </h5>
                      <div className="space-y-2">
                        {businessData.semiconductor.additionalServices.map((service, index) => (
                          <div key={index} className="flex items-start space-x-2">
                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                            <span className="text-xs text-gray-600 leading-relaxed">{service}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Factory Automation */}
              <motion.div
                className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
                variants={itemVariants}
                whileHover="hover"
                initial="rest"
              >
                <motion.div variants={cardHover}>
                  <div className="relative h-64">
                    <Image
                      src="https://images.unsplash.com/photo-1716191299980-a6e8827ba10b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYWN0b3J5JTIwYXV0b21hdGlvbiUyMGluZHVzdHJpYWwlMjByb2JvdHN8ZW58MXx8fHwxNzU2MzcyODUxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                      alt="Factory Automation"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <Cog className="w-8 h-8 mb-2" />
                      <h3 className="text-lg font-semibold">{businessData.automation.subtitle}</h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-4">{businessData.automation.title}</h4>
                    <div className="space-y-3 mb-6">
                      {businessData.automation.services.map((service, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-700 leading-relaxed">{service}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 pt-4 border-t border-gray-100">
                      <h5 className="font-semibold text-gray-900 mb-3">
                        {lang === 'KOR' ? '시스템 통합(System Integration)' : 'System Integration'}
                      </h5>
                      <div className="space-y-2">
                        {businessData.automation.systemIntegration.map((service, index) => (
                          <div key={index} className="flex items-start space-x-2">
                            <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0" />
                            <span className="text-xs text-gray-600 leading-relaxed">{service}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Mobility */}
              <motion.div
                className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
                variants={itemVariants}
                whileHover="hover"
                initial="rest"
              >
                <motion.div variants={cardHover}>
                  <div className="relative h-64">
                    <Image
                      src="https://images.unsplash.com/photo-1590038667005-7d82ac6f864b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdXRvbm9tb3VzJTIwbW9iaWxlJTIwcm9ib3QlMjB3YXJlaG91c2V8ZW58MXx8fHwxNzU2MzcyODUxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                      alt="Mobility Robot"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <Car className="w-8 h-8 mb-2" />
                      <h3 className="text-lg font-semibold">{businessData.mobility.subtitle}</h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-4">{businessData.mobility.title}</h4>
                    <div className="space-y-3">
                      {businessData.mobility.services.map((service, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-700 leading-relaxed">{service}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* Additional Info Section */}
        <motion.section
          className="py-16 px-4 md:px-8 bg-gray-50"
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="max-w-6xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              {lang === 'KOR' ? '혁신적인 기술력으로 고객과 함께 성장합니다' : 'Growing together with customers through innovative technology'}
            </h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {lang === 'KOR' 
                ? '반도체, 자동화, 모빌리티 분야에서 축적된 기술력과 경험을 바탕으로 고객의 요구에 맞는 맞춤형 솔루션을 제공하며, 지속적인 연구개발을 통해 미래 기술을 선도하고 있습니다.'
                : 'Based on our accumulated technical expertise and experience in semiconductors, automation, and mobility, we provide customized solutions that meet customer needs and lead future technology through continuous R&D.'
              }
            </p>
          </div>
        </motion.section>
      </main>
    </Layout>
  );
}
