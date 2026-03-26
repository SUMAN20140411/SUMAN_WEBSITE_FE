import BreadcrumbSection from "@/components/BreadcrumbSection";
import HeroSection from "@/components/HeroSection";
import Layout from "@/components/Layout";
import { DocumentDownloadBanner } from "@/components/careers/DocumentDownloadBanner";
import { JobApplicationUploadForm } from "@/components/careers/JobApplicationUploadForm";
import { noticePage, noticePageContent } from "@/lib/strapi/careers/noticePage";
import { useLangStore } from "@/stores/langStore";
import Head from "next/head";
import Link from "next/link";
import React from "react";

export const getStaticProps = async () => {
  const content = await noticePage.find({
    locale: "ko-KR",
    populate: [
      "pageInfo",
      "section1",
      "section1.jobSites",
      "section2",
      "section2.forms"
    ]
  });
  return {
    props: { content: content?.data }
  };
};

const RecruitmentBoard: React.FC<{ content: noticePageContent }> = ({
  content
}) => {
  const lang = useLangStore((state) => state.lang) || "KOR";

  return (
    <Layout>
      <Head>
        <title>{content?.pageInfo?.title || "채용공고 | 수만"}</title>
      </Head>

      <main className="min-h-screen bg-gradient-to-b from-white via-sky-50/30 to-white pt-[90px] text-slate-900">
        <HeroSection
          title={content?.pageInfo?.title || "채용공고"}
          backgroundImage={
            content?.pageInfo?.hero || "/images/sub_banner/careers_hero.png"
          }
        />

        <div className="relative z-30 -mt-8 sm:-mt-10">
          <BreadcrumbSection
            path={content?.pageInfo?.pageLocation || "인재채용 > 채용공고"}
          />
        </div>

        {/* 🔽 Platform Cards */}
        <div className="max-w-7xl mx-auto px-6 md:px-[60px] lg:px-[0px]">
          <section className="py-16 md:py-20 bg-gradient-to-b from-slate-50/50 via-white to-slate-50/30">
            <div className="max-w-7xl mx-auto px-6 md:px-[60px] lg:px-[0px]">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-10 text-left">
                {content?.section1?.title || "채용 사이트"}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {content?.section1?.jobSites?.map((site) => (
                  <RecruitmentCard
                    key={site.link}
                    title={site.name}
                    description={site.description}
                    link={site.link}
                  />
                ))}
              </div>
            </div>
          </section>

          <DocumentDownloadBanner content={content?.section2} />
          <JobApplicationUploadForm lang={lang} />
        </div>

        <hr className="my-6 border-gray-200 w-full" />
      </main>
      {/* ===================== END UPDATED ================================================ */}
    </Layout>
  );
};

// 💼 Recruitment Card Component
const RecruitmentCard: React.FC<{
  title: string;
  description?: string;
  link: string;
  highlight?: string;
}> = ({ title, description, link, highlight = "gray-800" }) => {
  return (
    <div className="flex flex-col bg-[#0A1633] rounded-xl p-6 md:p-8 text-white min-h-[220px]">
      <div className="flex-grow">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-sm text-gray-300 mb-6">
          {description || "지금 바로 지원해 보세요"}
        </p>
      </div>
      <Link
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full bg-white border border-gray-200 text-gray-800 px-4 py-3 rounded-lg flex items-center justify-between font-semibold hover:bg-gray-100 transition-colors"
      >
        <span className={`text-xl font-bold text-${highlight}`}>{title}</span>
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
          />
        </svg>
      </Link>
    </div>
  );
};

export default RecruitmentBoard;
