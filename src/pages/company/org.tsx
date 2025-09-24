import Layout from "@/components/Layout";
import HeroSection from "@/components/HeroSection";
import BreadcrumbSection from "@/components/BreadcrumbSection";
import Image from "next/image";
import Head from "next/head";
import { motion, type Transition } from "framer-motion";
import { useLangStore } from "@/stores/langStore";

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1 } as Transition },
};

export default function OrgPage() {
  const { lang } = useLangStore();

  // Define content based on language
  const content = {
    KOR: {
      title: "조직도",
      // subtitle: "Organization Chart",
      breadcrumb: "회사소개 > 조직도",
      image: "/images/company/organization/organization_suman_korean.png",
      alt: "조직도",
      pageTitle: "조직도 | 수만",
    },
    ENG: {
      title: "Organization Chart",
      // subtitle: "조직도",
      breadcrumb: "Company > Organization",
      image: "/images/company/organization/organization_suman_english.png",
      alt: "Organization Chart",
      pageTitle: "Organization | SUMAN",
    },
  };

  const CM_TO_PX = 37.8; // UPDATED
  const HERO_TRIM_PX = Math.round(CM_TO_PX);
  const currentContent = content[lang];

  return (
    <Layout>
      <Head>
        <title>{currentContent.pageTitle}</title>
      </Head>

      <main
        className="min-h-screen bg-white text-slate-900"
        style={{ paddingTop: "90px" }}
      >
        {/* === UPDATED: Bungkus HeroSection dengan negative margin top/bottom (1cm per sisi) === */}
        <div
          style={{
            marginTop: `-${HERO_TRIM_PX}px`,
            marginBottom: `-${HERO_TRIM_PX}px`,
          }}
        >
          <HeroSection
            title={currentContent.title}
            // subtitle={currentContent.subtitle}
            backgroundImage="/images/sub_banner/company_banner.png"
          />
        </div>

        <div className="relative z-30 -mt-2">
          <BreadcrumbSection path={currentContent.breadcrumb} />
        </div>

        <main className="content-wrapper py-20 px-4 md:px-8 bg-white flex justify-center items-center">
          <div className="max-w-7xl mx-auto w-full flex flex-col items-center">
            <motion.div
              className="w-full"
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              {/* Reduced padding to make image 12% bigger */}
              <div className="relative w-full h-auto overflow-hidden rounded-lg px-0 md:px-[4%] lg:px-[8%]">
                <Image
                  src={currentContent.image}
                  alt={currentContent.alt}
                  width={1200}
                  height={800}
                  layout="responsive"
                  objectFit="contain"
                  className="w-full h-auto scale-110" // Added scale-110 for additional 10% size increase
                  sizes="(min-width:1024px) 84vw, (min-width:768px) 92vw, 100vw" // Adjusted sizes
                  priority
                />
              </div>
            </motion.div>
          </div>
        </main>

        <hr className="my-8 border-gray-200 w-full" />
      </main>
    </Layout>
  );
}
