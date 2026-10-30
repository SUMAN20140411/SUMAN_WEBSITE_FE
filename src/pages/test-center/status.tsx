import BreadcrumbSection from "@/components/BreadcrumbSection";
import HeroSection from "@/components/HeroSection";
import Layout from "@/components/Layout";
import TestRequestStatus from "@/components/test-center/TestRequestStatus";
import { testRequestStatusCopy } from "@/content/test-center/equipment";
import { useLangStore } from "@/stores/langStore";
import Head from "next/head";

export default function TestCenterStatusPage() {
  const { lang } = useLangStore();
  const copy = lang === "ENG" ? testRequestStatusCopy.en : testRequestStatusCopy.ko;

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
            <TestRequestStatus />
          </div>
        </div>
      </main>
    </Layout>
  );
}
