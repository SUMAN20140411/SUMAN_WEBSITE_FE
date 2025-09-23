

import Layout from "@/components/Layout";
import HeroSection from "@/components/HeroSection";
import BreadcrumbSection from "@/components/BreadcrumbSection";
import { motion, type Transition } from "framer-motion";
import { useLangStore } from "@/stores/langStore";
import { heroText, businessAreasData } from "@/data/rnd";
import Image from "next/image";
import { CheckCircle, Cog, Cpu, Car, type LucideIcon } from "lucide-react";
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
    hover: {
      scale: 1.02,
      y: -8,
      transition: { duration: 0.35, ease: "easeOut" } as Transition,
    },
  };
  const CM_TO_PX = 37.8;                       // UPDATED
  const HERO_TRIM_PX = Math.round(CM_TO_PX);

  type CardKey = "semiconductor" | "automation" | "mobility";

  type CardAccent = {
    iconWrapper: string;
    badge: string;
    bulletWrapper: string;
    bulletIcon: string;
    highlightContainer: string;
    highlightDot: string;
  };

  type CardConfig = {
    key: CardKey;
    image: string;
    Icon: LucideIcon;
    accent: CardAccent;
    highlightTitle?: string;
    highlightItems?: string[];
  };

  const cards: CardConfig[] = [
    {
      key: "semiconductor",
      image: "/images/business/rnd/semiconductor.png",
      Icon: Cpu,
      accent: {
        iconWrapper: "bg-blue-600 text-white shadow-lg shadow-blue-200/60",
        badge: "bg-blue-50 text-blue-700 border border-blue-100",
        bulletWrapper: "border border-blue-100 bg-blue-50",
        bulletIcon: "text-blue-600",
        highlightContainer: "border border-blue-100 bg-blue-50/70",
        highlightDot: "bg-blue-500",
      },
      highlightTitle:
        lang === "KOR"
          ? "이차전지 제조 및 신뢰성 장비"
          : "Secondary Battery & Reliability Equipment",
      highlightItems: businessData.semiconductor.additionalServices,
    },
    {
      key: "automation",
      image:
        "https://images.unsplash.com/photo-1716191299980-a6e8827ba10b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYWN0b3J5JTIwYXV0b21hdGlvbiUyMGluZHVzdHJpYWwlMjByb2JvdHN8ZW58MXx8fHwxNzU2MzcyODUxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      Icon: Cog,
      accent: {
        iconWrapper: "bg-emerald-600 text-white shadow-lg shadow-emerald-200/60",
        badge: "bg-emerald-50 text-emerald-700 border border-emerald-100",
        bulletWrapper: "border border-emerald-100 bg-emerald-50",
        bulletIcon: "text-emerald-600",
        highlightContainer: "border border-emerald-100 bg-emerald-50/70",
        highlightDot: "bg-emerald-500",
      },
      highlightTitle:
        lang === "KOR"
          ? "시스템 통합(System Integration)"
          : "System Integration",
      highlightItems: businessData.automation.systemIntegration,
    },
    {
      key: "mobility",
      image: "/images/business/rnd/mobilerobot.png",
      Icon: Car,
      accent: {
        iconWrapper: "bg-violet-600 text-white shadow-lg shadow-violet-200/60",
        badge: "bg-violet-50 text-violet-700 border border-violet-100",
        bulletWrapper: "border border-violet-100 bg-violet-50",
        bulletIcon: "text-violet-600",
        highlightContainer: "border border-violet-100 bg-violet-50/70",
        highlightDot: "bg-violet-500",
      },
    },
  ];

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
          className="px-4 py-16 md:px-8 md:py-28 bg-slate-50"
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
              className="grid grid-cols-1 gap-8 lg:grid-cols-3"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {cards.map((card) => {
                const content = businessData[card.key];
                const Icon = card.Icon;

                return (
                  <motion.article
                    key={card.key}
                    className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_22px_45px_rgba(15,23,42,0.08)] transition-shadow duration-300 hover:shadow-[0_28px_60px_rgba(15,23,42,0.14)]"
                    variants={itemVariants}
                  >
                    <motion.div
                      className="flex h-full flex-col"
                      variants={cardHover}
                      initial="rest"
                      whileHover="hover"
                    >
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={card.image}
                          alt={content.title}
                          fill
                          sizes="(min-width: 1024px) 400px, 100vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/65 via-slate-900/10 to-transparent" />
                      </div>
                      <div className="flex h-full flex-col gap-6 p-8 lg:p-10">
                        <div className="flex items-start justify-between gap-4">
                          <span
                            className={`inline-flex items-center rounded-full px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.18em] ${card.accent.badge}`}
                          >
                            {content.subtitle}
                          </span>
                          <span
                            className={`inline-flex h-12 w-12 items-center justify-center rounded-full ${card.accent.iconWrapper}`}
                          >
                            <Icon className="h-5 w-5" />
                          </span>
                        </div>
                        <h4 className="text-2xl font-bold leading-snug text-slate-900">
                          {content.title}
                        </h4>
                        <ul className="space-y-3">
                          {content.services.map((service, index) => (
                            <li key={index} className="flex items-start gap-3">
                              <span
                                className={`mt-1 inline-flex h-8 w-8 items-center justify-center rounded-full ${card.accent.bulletWrapper}`}
                              >
                                <CheckCircle
                                  className={`h-4 w-4 ${card.accent.bulletIcon}`}
                                />
                              </span>
                              <span className="text-sm leading-relaxed text-slate-700">
                                {service}
                              </span>
                            </li>
                          ))}
                        </ul>
                        {card.highlightTitle && card.highlightItems?.length ? (
                          <div
                            className={`rounded-xl p-5 ${card.accent.highlightContainer}`}
                          >
                            <h5 className="text-sm font-semibold text-slate-900">
                              {card.highlightTitle}
                            </h5>
                            <ul className="mt-3 space-y-2">
                              {card.highlightItems.map((item, index) => (
                                <li
                                  key={index}
                                  className="flex items-start gap-2 text-xs leading-relaxed text-slate-600"
                                >
                                  <span
                                    className={`relative top-2 block h-1.5 w-1.5 rounded-full ${card.accent.highlightDot}`}
                                  />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ) : null}
                      </div>
                    </motion.div>
                  </motion.article>
                );
              })}
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
