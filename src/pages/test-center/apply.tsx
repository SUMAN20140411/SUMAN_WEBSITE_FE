import BreadcrumbSection from "@/components/BreadcrumbSection";
import HeroSection from "@/components/HeroSection";
import Layout from "@/components/Layout";
import TestRequestWizard from "@/components/test-center/TestRequestWizard";
import { testCenterCopy } from "@/content/test-center/equipment";
import {
  loadTestEquipment,
  type TestEquipmentCatalog,
} from "@/lib/strapi/collections/testEquipment";
import { useLangStore } from "@/stores/langStore";
import { Download, FileText } from "lucide-react";
import { GetStaticProps } from "next";
import Head from "next/head";

const APPLICATION_FORM_URL =
  "https://res.cloudinary.com/df3dolexd/raw/upload/v1795773223/%EC%8B%9C%ED%97%98%EB%B6%84%EC%84%9D%EC%8B%A0%EC%B2%AD%EC%84%9C_hm9gry.docx";

export const getStaticProps: GetStaticProps = async () => {
  const catalog = await loadTestEquipment("ko-KR");
  return { props: { catalog } };
};

export default function TestCenterApplyPage({
  catalog,
}: {
  catalog: TestEquipmentCatalog;
}) {
  const { lang } = useLangStore();
  const copy = lang === "ENG" ? testCenterCopy.en : testCenterCopy.ko;

  return (
    <Layout>
      <Head>
        <title>{copy.pageTitle}</title>
      </Head>
      <main className="min-h-screen bg-white pt-[90px] text-slate-900">
        <HeroSection
          title={copy.heroTitle}
          subtitle={copy.heroSubtitle}
          backgroundImage="/images/sub_banner/business_hero.png"
        />
        <div className="relative z-30 -mt-8 sm:-mt-10">
          <BreadcrumbSection path={copy.breadcrumb} />
        </div>
        <div className="bg-white py-12 md:py-20">
          <div className="mx-auto max-w-7xl px-6 md:px-[60px] lg:px-[0px]">
            <div className="mb-6 flex flex-col gap-4 rounded-lg border border-slate-200 bg-slate-50/80 p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between md:p-6">
              <div className="flex items-start gap-3.5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#0f294a] text-white shadow-sm">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-base font-bold text-slate-900">
                      {copy.applicationFormTitle}
                    </h2>
                    <span className="rounded bg-blue-100 px-2 py-0.5 text-[11px] font-semibold tracking-wide text-blue-800">
                      DOCX
                    </span>
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">
                    {copy.applicationFormDescription}
                  </p>
                </div>
              </div>

              <a
                href={APPLICATION_FORM_URL}
                download="시험분석신청서.docx"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-[#0f294a] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#193d6b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0f294a]"
              >
                <Download className="h-4 w-4" />
                <span>{copy.applicationFormDownload}</span>
              </a>
            </div>

            <TestRequestWizard catalog={catalog} />
          </div>
        </div>
      </main>
    </Layout>
  );
}
