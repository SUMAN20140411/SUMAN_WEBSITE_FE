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

  const currentContent = content[lang];

  return (
    <Layout>
      <Head>
        <title>{currentContent.pageTitle}</title>
      </Head>

      <main className="min-h-screen bg-white pt-[90px] text-slate-900">
        <HeroSection
          title={currentContent.title}
          backgroundImage="/images/sub_banner/company_banner.png"
        />

        <div className="relative z-30 -mt-8 sm:-mt-10">
          <BreadcrumbSection path={currentContent.breadcrumb} />
        </div>

        <section className="bg-white">
          <div className="max-w-7xl mx-auto px-6 md:px-[60px] lg:px-[0px] py-16 lg:py-20">
            <motion.div
              className="w-full flex justify-center"
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="relative w-full max-w-6xl">
                <Image
                  src={currentContent.image}
                  alt={currentContent.alt}
                  width={1200}
                  height={800}
                  layout="responsive"
                  objectFit="contain"
                  className="w-full h-auto"
                  sizes="(min-width:1024px) 90vw, 95vw"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </section>

        <hr className="my-8 border-gray-200 w-full" />
      </main>
    </Layout>
  );
}
