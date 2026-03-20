// app/rnd.tsx  (updated)
import BreadcrumbSection from "@/components/BreadcrumbSection";
import HeroSection from "@/components/HeroSection";
import Layout from "@/components/Layout";
import { businessAreasData, heroText } from "@/data/rnd";
import { rndPage, rndPageContent } from "@/lib/strapi/business/rndPage";
import { useLangStore } from "@/stores/langStore";
import { Icon } from "@iconify/react";
import { motion, type Transition } from "framer-motion";
import { CheckCircle, Cpu } from "lucide-react";
import Head from "next/head";
import Image from "next/image";
import { useEffect } from "react";
import Markdown, { Components } from "react-markdown";

const colors = ["text-blue-600", "text-green-600", "text-purple-600"];

const h2Component: Components["h2"] = ({ children }) => (
  <h4 className="text-xl font-bold text-gray-900 mb-4">{children}</h4>
);

export const getStaticProps = async () => {
  const rndPageContent = await rndPage.find({
    locale: "ko-KR",
    populate: ["pageInfo", "section1", "section1.researchItems", "section2"]
  });
  return {
    props: {
      content: rndPageContent?.data
    }
  };
};

export default function App({ content }: { content: rndPageContent }) {
  const { lang } = useLangStore();

  useEffect(() => {
    document.title = lang === "KOR" ? "사업영역" : "Business Areas";
  }, [lang]);

  const hero = heroText[lang];
  const businessData = businessAreasData[lang];

  const fadeIn: Record<"hidden" | "visible", any> = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" } as Transition
    }
  };

  const cardHover = {
    rest: { scale: 1, y: 0 },
    hover: { scale: 1.02, y: -5, transition: { duration: 0.3 } as Transition }
  };

  return (
    <Layout>
      <Head>
        <title>{content?.pageInfo?.title || "연구분야 | 수만"}</title>
      </Head>

      <main className="min-h-screen bg-white pt-[90px] text-slate-900">
        <HeroSection
          title={content?.pageInfo?.title || "연구분야"}
          backgroundImage={
            content?.pageInfo?.hero || "/images/sub_banner/business_hero.png"
          }
        />

        {/* Breadcrumb */}
        <div className="relative z-30 -mt-8 sm:-mt-10">
          <BreadcrumbSection
            path={content?.pageInfo?.pageLocation || "사업분야 > 연구분야"}
          />
        </div>

        {/* Main Business Areas Section */}
        <motion.section
          className="bg-white"
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="max-w-7xl mx-auto px-6 md:px-[60px] lg:px-[0px] py-16 lg:py-20">
            {/* ⬇ Left-aligned & bigger title */}
            <motion.div className="text-left mb-16" variants={fadeIn}>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                {content?.section1?.title || "핵심 연구 분야"}
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl">
                {content?.section1?.description ||
                  "최첨단 기술과 혁신적인 솔루션으로 다양한 산업 분야에서 고객의 성공을 지원합니다."}
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
              {content?.section1?.researchItems.map((item, index) => (
                <motion.div
                  key={`research-item-${index}`}
                  className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
                  variants={itemVariants}
                  whileHover="hover"
                  initial="rest"
                >
                  <motion.div variants={cardHover}>
                    <div className="relative h-64">
                      <Image
                        src={
                          item.hero || "/images/business/rnd/semiconductor.png"
                        }
                        alt={item.title || "Semiconductor Equipment"}
                        className="w-full h-full object-cover"
                        fill
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <div className="absolute bottom-4 left-4 text-white">
                        {item.icon ? (
                          <Icon
                            icon={item.icon.iconName || "Home"}
                            width={32}
                            height={32}
                            className="mb-2"
                          />
                        ) : (
                          <Cpu className="w-8 h-8 mb-2" />
                        )}
                        <h3 className="text-lg font-semibold">{item.title}</h3>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="space-y-3">
                        <Markdown
                          components={{
                            h2: h2Component,
                            h3: ({ children }) => (
                              <div className="flex items-start space-x-3">
                                <CheckCircle
                                  className={`w-5 h-5 ${
                                    colors[index % colors.length]
                                  } mt-0.5 flex-shrink-0`}
                                />
                                <span className="text-sm text-gray-700 leading-relaxed">
                                  {children}
                                </span>
                              </div>
                            ),
                            hr: () => <hr className="my-4 border-gray-200" />
                          }}
                        >
                          {item.description}
                        </Markdown>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Additional Info Section */}
        <motion.section
          className="bg-gray-50"
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="max-w-7xl mx-auto px-6 md:px-[60px] lg:px-[0px] py-16 lg:py-20">
            <div className="text-center">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                {content?.section2?.title ||
                  "혁신적인 기술력으로 고객과 함께 성장합니다"}
              </h3>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                {content?.section2?.description ||
                  "반도체, 자동화, 모빌리티 분야에서 축적된 기술력과 경험을 바탕으로 고객의 요구에 맞는 맞춤형 솔루션을 제공하며, 지속적인 연구개발을 통해 미래 기술을 선도하고 있습니다."}
              </p>
            </div>
          </div>
        </motion.section>
      </main>
    </Layout>
  );
}
