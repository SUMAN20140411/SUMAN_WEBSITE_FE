import BreadcrumbSection from "@/components/BreadcrumbSection";
import HeroSection from "@/components/HeroSection";
import Layout from "@/components/Layout";
import { noticePage, noticePageContent } from "@/lib/strapi/careers/noticePage";
import { useLangStore } from "@/stores/langStore";
import { motion, type Transition } from "framer-motion";
import { ArrowDownToLine, FileText } from "lucide-react";
import Head from "next/head";
import Link from "next/link";
import React from "react";

const cardAppearTransition: Transition = {
  duration: 0.7,
  ease: [0.22, 1, 0.36, 1]
};

export const getStaticProps = async () => {
  const content = await noticePage.find({
    locale: "ko-KR",
    populate: [
      "pageInfo",
      "section1",
      "section1.jobSites",
      "section2",
      "section2.forms",
      "section2.forms.file"
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
        </div>

        <hr className="my-6 border-gray-200 w-full" />
      </main>
      {/* ===================== END UPDATED ================================================ */}
    </Layout>
  );
};

const accentColors = [
  "from-[#3B82F6] via-[#2563EB] to-[#1D4ED8]",
  "from-[#FB923C] via-[#FB7185] to-[#F43F5E]",
  "from-[#6366F1] via-[#4F46E5] to-[#4338CA]"
];

const getFileExtension = (name: string) => {
  return name.split(".")?.at(-1)?.toUpperCase();
};

// 📎 Download Banner Section (KOR/ENG Support)
const DocumentDownloadBanner: React.FC<{
  content: noticePageContent["section2"];
}> = ({ content }) => {
  const sectionCopy = {
    heading: content?.title || "자료실",
    highlight: content?.subtitle || "지원서 양식",
    description:
      content?.description ||
      "지원서를 준비할 때 필요한 양식을 원하는 포맷으로 다운로드하세요."
  };

  const documents = content?.forms?.map((form, index) => ({
    id: form.name,
    href:
      `${process.env.NEXT_PUBLIC_STRAPI_UPLOAD_URL}${form.file?.url}` || "#",
    title: form.name,
    description: form.description,
    badge: form.file?.name ? getFileExtension(form.file.name) : "DOCX",
    accent: accentColors[index % accentColors.length],
    buttonLabel: form.downloadText
  }));

  return (
    <section className="bg-gradient-to-b from-slate-100/50 via-[#f0f5ff] to-slate-50/60 mt-2 px-6 md:px-[60px] lg:px-[0px]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#f5f8ff] via-[#eef3ff] to-[#f0f5ff] p-8 sm:p-10 shadow-[0_30px_80px_-40px_rgba(30,64,175,0.35)]"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0, transition: cardAppearTransition }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.span
            aria-hidden="true"
            className="absolute -right-20 -top-24 h-48 w-48 rounded-full bg-blue-300/40 blur-3xl"
            animate={{ y: [0, -14, 0], scale: [1, 1.06, 1] }}
            transition={{
              duration: 9,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut"
            }}
          />
          <motion.span
            aria-hidden="true"
            className="absolute -bottom-24 left-10 h-52 w-52 rounded-full bg-blue-200/30 blur-[120px]"
            animate={{ y: [0, 16, 0], scale: [1, 1.05, 1] }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
              delay: 0.8
            }}
          />

          <div className="relative z-10 flex flex-col gap-8">
            <div className="space-y-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#1D3762]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-[#1D3762]/70">
                {/*<Sparkles className="h-4 w-4 text-[#1D3762]" />*/}
                {sectionCopy.highlight}
              </span>
              <h2 className="text-2xl font-bold text-[#0A1633] sm:text-3xl">
                {sectionCopy.heading}
              </h2>
              <p className="max-w-2xl text-sm text-[#3B4B77] sm:text-base">
                {sectionCopy.description}
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {documents.map((doc) => (
                <motion.a
                  key={doc.id}
                  href={doc.href}
                  download={doc.href !== "#" ? doc.title : undefined}
                  aria-label={`${doc.buttonLabel} - ${doc.title}`}
                  className="group relative overflow-hidden rounded-2xl border border-[#d7def5] bg-white/80 p-6 shadow-lg shadow-[#1d3762]/10 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#1d3762]/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D3762]/40"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    transition: cardAppearTransition
                  }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white via-transparent to-white opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    aria-hidden="true"
                  />
                  <div className="relative z-10 flex items-start gap-4">
                    <div
                      className={`relative flex h-14 w-14 flex-col items-center justify-center rounded-2xl bg-gradient-to-br ${doc.accent} text-white shadow-lg shadow-[#1d3762]/20`}
                    >
                      <FileText className="h-6 w-6" />
                      <span className="mt-1 text-[11px] font-semibold tracking-[0.25em] text-white/80">
                        {doc.badge}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-[#102042] sm:text-xl">
                        {doc.title}
                      </h3>
                      <p className="mt-2 text-sm text-[#42527A]">
                        {doc.description}
                      </p>
                    </div>
                  </div>
                  <div className="relative z-10 mt-6 flex items-center justify-between text-sm font-semibold text-[#1D3762]">
                    <span className="transition-colors duration-300 group-hover:text-[#0A1633]">
                      {doc.buttonLabel}
                    </span>
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#1D3762]/10 text-[#1D3762] transition-all duration-300 group-hover:bg-[#1D3762] group-hover:text-white">
                      <ArrowDownToLine className="h-5 w-5 transition-transform duration-300 group-hover:translate-y-1" />
                    </span>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
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
