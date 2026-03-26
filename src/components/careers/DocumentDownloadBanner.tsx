import { motion, type Transition } from "framer-motion";
import { ArrowDownToLine, FileText } from "lucide-react";
import React from "react";

import type { noticePageContent } from "@/lib/strapi/careers/noticePage";

const accentColors = [
  "from-[#3B82F6] via-[#2563EB] to-[#1D4ED8]",
  "from-[#FB923C] via-[#FB7185] to-[#F43F5E]",
  "from-[#6366F1] via-[#4F46E5] to-[#4338CA]"
];

const getFileExtension = (name: string) => {
  return name.split(".")?.at(-1)?.toUpperCase();
};

const cardAppearTransition: Transition = {
  duration: 0.7,
  ease: [0.22, 1, 0.36, 1]
};

// 📎 Download Banner Section (KOR/ENG Support)
export const DocumentDownloadBanner: React.FC<{
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
    href: `${form.file}` || "#",
    title: form.name,
    description: form.description,
    badge: form.file ? getFileExtension(form.file || "") : "DOCX",
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

