import React from "react";
import Layout from "@/components/Layout";
import BreadcrumbSection from "@/components/BreadcrumbSection";
import HeroSection from "@/components/HeroSection";
import Link from "next/link";
import { useLangStore } from "@/stores/langStore";
import Head from "next/head";
import { motion, type Transition } from "framer-motion";
import { ArrowDownToLine, FileText } from "lucide-react";

const cardAppearTransition: Transition = {
  duration: 0.7,
  ease: [0.22, 1, 0.36, 1],
};

const RecruitmentBoard: React.FC = () => {
  const lang = useLangStore((state) => state.lang) || "KOR";

  return (
    <Layout>
      <Head>
        <title>{lang === "KOR" ? "채용공고 | 수만" : "Recruit Notice | SUMAN"}</title>
      </Head>

      <main className="min-h-screen bg-white pt-[90px] text-slate-900">
        <HeroSection
          title={lang === "KOR" ? "채용공고" : "Recruit Notice"}
          backgroundImage="/images/sub_banner/careers_hero.png"
        />

        <div className="relative z-30 -mt-8 sm:-mt-10">
          <BreadcrumbSection
            path={
              lang === "KOR"
                ? "인재채용 > 채용공고"
                : "Recruitment > Recruit Notice"
            }
          />
        </div>

        {/* 🔽 Platform Cards */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <section className="py-16 md:py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-10 text-left">
                {lang === "KOR" ? "채용 사이트" : "Recruitment Site"}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <RecruitmentCard
                  title="Saramin"
                  link="https://m.saramin.co.kr/job-search/company-info-view/recruit?csn=ZDVyVitYUjJKUno3Y2NmWXl6K0pWQT09&t_ref_content=generic"
                />
                <RecruitmentCard
                  title="JOB KOREA"
                  link="https://www.jobkorea.co.kr/net/company/45215125/Recruit"
                  highlight="blue-600"
                />
                <RecruitmentCard
                  title="고용24"
                  link="https://www.work24.go.kr"
                />
              </div>
            </div>
          </section>

          <DocumentDownloadBanner />
        </div>

        <hr className="my-6 border-gray-200 w-full" />
      </main>
      {/* ===================== END UPDATED ================================================ */}
    </Layout>
  );
};

// 📎 Download Banner Section (KOR/ENG Support)
const DocumentDownloadBanner: React.FC = () => {
  const lang = useLangStore((state) => state.lang) || "KOR";

  const sectionCopy =
    lang === "KOR"
      ? {
          heading: "자료실",
          highlight: "지원서 양식",
          description: "지원서를 준비할 때 필요한 양식을 원하는 포맷으로 다운로드하세요.",
        }
      : {
          heading: "Related Document",
          highlight: "Application Forms",
          description: "Choose the application template you need and download it instantly.",
        };

  const documents =
    lang === "KOR"
      ? [
          {
            id: "word",
            href: "/images/입사지원서 양식 다운로드(Word).docx",
            title: "입사지원서 양식 (Word)",
            description: "간편하게 수정 가능한 Microsoft Word 양식입니다.",
            badge: "DOCX",
            accent: "from-[#3B82F6] via-[#2563EB] to-[#1D4ED8]",
            buttonLabel: "Word 파일 받기",
          },
          {
            id: "hwp",
            href: "/images/입사지원서 양식 다운로드(한글).hwp",
            title: "입사지원서 양식 (HWP)",
            description: "한글 전용 문서 편집기에 최적화된 양식입니다.",
            badge: "HWP",
            accent: "from-[#FB923C] via-[#FB7185] to-[#F43F5E]",
            buttonLabel: "HWP 파일 받기",
          },
          {
            id: "notice",
            href: "/images/부문 신입 및 경력직 채용 공고문_2025.00.00.docx",
            title: "채용 공고문",
            description: "현재 채용 진행중인 내부 공고가 없습니다.",
            badge: "DOCX",
            accent: "from-[#6366F1] via-[#4F46E5] to-[#4338CA]",
            buttonLabel: "공고문 다운로드",
          },
        ]
      : [
          {
            id: "word",
            href: "/images/입사지원서 양식 다운로드(Word).docx",
            title: "Application Form Template (Word)",
            description: "Editable Microsoft Word version of the application form.",
            badge: "DOCX",
            accent: "from-[#38BDF8] via-[#2563EB] to-[#1D4ED8]",
            buttonLabel: "Download Word Template",
          },
          {
            id: "hwp",
            href: "/images/입사지원서 양식 다운로드(한글).hwp",
            title: "Application Form Template (HWP)",
            description: "Hangul word processor version of the application form.",
            badge: "HWP",
            accent: "from-[#FB923C] via-[#FB7185] to-[#F43F5E]",
            buttonLabel: "Download HWP Template",
          },
          {
            id: "notice",
            href: "/images/부문 신입 및 경력직 채용 공고문_2025.00.00.docx",
            title: "Recruitment Notice",
            description: "Download the latest recruitment announcement document.",
            badge: "DOCX",
            accent: "from-[#6366F1] via-[#4F46E5] to-[#4338CA]",
            buttonLabel: "Download Notice",
          },
        ];

  return (
    <section className="bg-white mt-2 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="relative overflow-hidden rounded-3xl border border-[#d9e2ff] bg-gradient-to-br from-white via-[#f5f7ff] to-white p-8 sm:p-10 shadow-[0_30px_80px_-40px_rgba(29,55,98,0.35)]"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0, transition: cardAppearTransition }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.span
            aria-hidden="true"
            className="absolute -right-20 -top-24 h-48 w-48 rounded-full bg-sky-200/50 blur-3xl"
            animate={{ y: [0, -14, 0], scale: [1, 1.06, 1] }}
            transition={{ duration: 9, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
          />
          <motion.span
            aria-hidden="true"
            className="absolute -bottom-24 left-10 h-52 w-52 rounded-full bg-indigo-200/40 blur-[120px]"
            animate={{ y: [0, 16, 0], scale: [1, 1.05, 1] }}
            transition={{ duration: 10, repeat: Infinity, repeatType: "mirror", ease: "easeInOut", delay: 0.8 }}
          />

          <div className="relative z-10 flex flex-col gap-8">
            <div className="space-y-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#1D3762]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-[#1D3762]/70">
                {/*<Sparkles className="h-4 w-4 text-[#1D3762]" />*/}
                {sectionCopy.highlight}
              </span>
              <h2 className="text-2xl font-bold text-[#0A1633] sm:text-3xl">{sectionCopy.heading}</h2>
              <p className="max-w-2xl text-sm text-[#3B4B77] sm:text-base">{sectionCopy.description}</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {documents.map((doc) => (
                <motion.a
                  key={doc.id}
                  href={doc.href}
                  download
                  aria-label={`${doc.buttonLabel} - ${doc.title}`}
                  className="group relative overflow-hidden rounded-2xl border border-[#d7def5] bg-white/80 p-6 shadow-lg shadow-[#1d3762]/10 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#1d3762]/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D3762]/40"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0, transition: cardAppearTransition }}
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
                      <h3 className="text-lg font-semibold text-[#102042] sm:text-xl">{doc.title}</h3>
                      <p className="mt-2 text-sm text-[#42527A]">{doc.description}</p>
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
  link: string;
  highlight?: string;
}> = ({ title, link, highlight = "gray-800" }) => {
  const lang = useLangStore((state) => state.lang) || "KOR";

  return (
    <div className="flex flex-col bg-[#0A1633] rounded-xl p-6 md:p-8 text-white min-h-[220px]">
      <div className="flex-grow">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-sm text-gray-300 mb-6">
          {lang === "KOR" ? "지금 바로 지원해 보세요" : "Apply now"}
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
