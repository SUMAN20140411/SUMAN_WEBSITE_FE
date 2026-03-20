import Layout from "@/components/Layout";
import HeroSection from "@/components/HeroSection";
import BreadcrumbSection from "@/components/BreadcrumbSection";
import { motion } from "framer-motion";
import Head from "next/head";
import { useLangStore } from "@/stores/langStore";
import {
  contactPage,
  contactPageContent
} from "@/lib/strapi/contact/contactPage";

export const getStaticProps = async () => {
  const content = await contactPage.find({
    locale: "ko-KR",
    populate: ["pageInfo", "section1", "section1.contacts"]
  });
  return {
    props: {
      content: content?.data
    }
  };
};

export default function HistoryPage({
  content
}: {
  content: contactPageContent;
}) {
  const { lang } = useLangStore();

  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const
      }
    }
  };

  const contactInfo = [
    {
      label:
        content?.section1?.subtitle ||
        "이름 / 소속 / 연락처 / 문의부서 / 문의내용",
      value: ""
    }
  ];

  return (
    <Layout>
      <Head>
        <title>{content?.pageInfo?.title || "문의하기 | 수만"}</title>
      </Head>
      <main className="min-h-screen bg-white pt-[90px] text-slate-900">
        <HeroSection
          title={content?.pageInfo?.title || "문의하기"}
          backgroundImage={
            content?.pageInfo?.hero || "/images/sub_banner/support_banner.png"
          }
        />

        <div className="relative z-30 -mt-8 sm:-mt-10">
          <BreadcrumbSection
            path={content?.pageInfo?.pageLocation || "고객지원 > 문의하기"}
          />
        </div>

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
                  {content?.section1?.title || "문의하기"}
                </h2>

                <div className="mb-10 p-5 bg-blue-50 rounded-lg border border-blue-100">
                  <p className="text-base md:text-lg text-gray-700 text-center">
                    {content?.section1?.description ||
                      "아래의 내용을 기재하여 하단의 메일주소로 문의 주시면 신속하게 답변드리도록 하겠습니다."}
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
                  {content?.section1?.contacts?.map((item, index) => (
                    <div
                      key={`contact-${Math.random()}`}
                      className="flex items-baseline text-sm md:text-base"
                    >
                      <span className="font-semibold text-blue-600 mr-2">
                        {item.department || "영업 / 마케팅"}
                      </span>
                      {item.mail && (
                        <a
                          href={`mailto:${item.mail}`}
                          className="text-gray-800 no-underline hover:text-blue-600"
                        >
                          {item.mail}
                        </a>
                      )}
                      {item.phone && (
                        <a
                          href={`tel:${item.phone}`}
                          className="text-gray-800 no-underline hover:text-blue-600"
                        >
                          {item.phone}
                        </a>
                      )}
                    </div>
                  ))}
                </div>
                {/* === END UPDATED === */}
              </section>
            </motion.div>
          </div>
        </div>
        <hr className="my-8 border-gray-200 w-full" />
      </main>
    </Layout>
  );
}
