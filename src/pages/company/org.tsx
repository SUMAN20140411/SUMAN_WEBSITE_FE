import Layout from "@/components/Layout";
import HeroSection from "@/components/HeroSection";
import BreadcrumbSection from "@/components/BreadcrumbSection";
import Head from "next/head";
import Image from "next/image";
import { motion, type Transition } from "framer-motion";
import { useLangStore } from "@/stores/langStore";
import { GetStaticProps } from "next";
import { orgPage, orgPageContent } from "@/lib/strapi/company/orgPage";

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1 } as Transition }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } as Transition }
};

// Organization data
const orgData = {
  KOR: {
    ceo: "CEO",
    advisor: "고문",
    departments: [
      {
        name: "경영본부",
        teams: ["인사 / 총무"]
      },
      {
        name: "영업본부",
        teams: ["영업 / 영업지원", "영업 / 충방전기"]
      },
      {
        name: "제조본부",
        teams: ["설계", "생산 1 (가공)", "생산 2 (조립)"]
      },
      {
        name: "신사업개발본부",
        teams: ["신사업개발"]
      },
      {
        name: "연구소",
        teams: ["연구개발"]
      }
    ]
  },
  ENG: {
    ceo: "CEO",
    advisor: "Advisor",
    departments: [
      {
        name: "Management",
        teams: ["HR / General Affairs"]
      },
      {
        name: "Sales",
        teams: ["Sales / Sales Support", "Sales / Charging Equipment"]
      },
      {
        name: "Manufacturing",
        teams: [
          "Design",
          "Production 1 (Processing)",
          "Production 2 (Assembly)"
        ]
      },
      {
        name: "New Business",
        teams: ["New Business Development"]
      },
      {
        name: "R&D Center",
        teams: ["R&D"]
      }
    ]
  }
};

export const getStaticProps: GetStaticProps = async () => {
  const content = await orgPage.find({
    locale: "ko-KR",
    populate: ["pageInfo", "orgChart", "orgChart.departments.teams"]
  });
  return {
    props: { content: content?.data }
  };
};

export default function OrgPage({
  content: orgContent
}: {
  content: orgPageContent;
}) {
  const { lang } = useLangStore();

  // Define content based on language
  const content = {
    KOR: {
      title: "조직도",
      breadcrumb: "회사소개 > 조직도",
      pageTitle: "조직도 | 수만"
    },
    ENG: {
      title: "Organization Chart",
      breadcrumb: "Company > Organization",
      pageTitle: "Organization | SUMAN"
    }
  };

  const currentContent = content[lang];
  const currentOrgData = orgData[lang];
  currentOrgData.departments =
    orgContent.orgChart?.departments.map((dept) => ({
      name: dept.name,
      teams: dept.teams.map((team) => team.text)
    })) || currentOrgData.departments;

  return (
    <Layout>
      <Head>
        <title>{orgContent.pageInfo?.title || currentContent.pageTitle}</title>
      </Head>

      <main className="min-h-screen bg-white pt-[90px] text-slate-900">
        <HeroSection
          title={orgContent.pageInfo?.title || currentContent.title}
          backgroundImage={
            orgContent.pageInfo?.hero || "/images/sub_banner/company_banner.png"
          }
        />

        <div className="relative z-30 -mt-8 sm:-mt-10">
          <BreadcrumbSection
            path={
              orgContent.pageInfo?.pageLocation || currentContent.breadcrumb
            }
          />
        </div>

        <section className="bg-white">
          <div className="max-w-6xl mx-auto px-4 md:px-8 py-16 lg:py-20 overflow-x-auto">
            <motion.div
              className="w-full flex flex-col items-center min-w-[900px]"
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              {/* SUMAN Logo Box */}
              <motion.div variants={itemVariants}>
                <div className="bg-gray-50 border border-gray-300 rounded-[30px] px-8 py-4 flex items-center gap-3 shadow-sm">
                  <Image
                    src={orgContent.orgChart?.logo || "/images/logosuman.png"}
                    alt="SUMAN Logo"
                    width={36}
                    height={36}
                    className="object-contain"
                  />
                  <span className="text-lg font-bold text-blue-800">
                    {orgContent.orgChart?.board || "SUMAN"}
                  </span>
                </div>
              </motion.div>

              {/* Vertical line from Logo to CEO */}
              <div className="w-[2px] h-16 bg-gray-400"></div>

              {/* CEO and Advisor */}
              <motion.div
                className="relative flex justify-center w-full"
                variants={itemVariants}
              >
                {/* Advisor positioned absolutely to the right - line behind CEO card */}
                <div className="absolute left-[calc(50%+60px)] top-1/2 -translate-y-1/2 flex items-center z-0">
                  <div className="w-20 h-[2px] bg-gray-400"></div>
                  <div className="border border-gray-400 bg-white px-4 py-2 rounded-lg font-medium text-gray-600 text-sm">
                    {orgContent.orgChart?.advisor || currentOrgData.advisor}
                  </div>
                </div>
                {/* CEO card on top */}
                <div className="bg-[#1E3A5F] max-w-[200px] text-center text-white px-14 py-3 rounded-lg font-semibold text-lg z-10 relative">
                  {orgContent.orgChart?.ceo || currentOrgData.ceo}
                </div>
              </motion.div>

              {/* Vertical line from CEO to horizontal connector */}
              <div className="w-[2px] h-12 bg-gray-400"></div>

              {/* SVG for tree structure lines */}
              <svg width="900" height="50" className="overflow-visible">
                {/* Main horizontal line */}
                <line
                  x1="90"
                  y1="0"
                  x2="810"
                  y2="0"
                  stroke="#9CA3AF"
                  strokeWidth="2"
                />
                {/* Vertical lines down to each department */}
                <line
                  x1="90"
                  y1="0"
                  x2="90"
                  y2="50"
                  stroke="#9CA3AF"
                  strokeWidth="2"
                />
                <line
                  x1="270"
                  y1="0"
                  x2="270"
                  y2="50"
                  stroke="#9CA3AF"
                  strokeWidth="2"
                />
                <line
                  x1="450"
                  y1="0"
                  x2="450"
                  y2="50"
                  stroke="#9CA3AF"
                  strokeWidth="2"
                />
                <line
                  x1="630"
                  y1="0"
                  x2="630"
                  y2="50"
                  stroke="#9CA3AF"
                  strokeWidth="2"
                />
                <line
                  x1="810"
                  y1="0"
                  x2="810"
                  y2="50"
                  stroke="#9CA3AF"
                  strokeWidth="2"
                />
              </svg>

              {/* Departments Grid */}
              <motion.div
                className="grid grid-cols-5 gap-4 w-[900px]"
                variants={itemVariants}
              >
                {currentOrgData.departments.map((dept, index) => (
                  <div key={index} className="flex flex-col">
                    {/* Department Header */}
                    <div className="bg-[#1E3A5F] text-white px-2 py-3 rounded-t-lg font-semibold text-sm text-center flex items-center justify-center min-h-[50px]">
                      {dept.name}
                    </div>

                    {/* Teams Container */}
                    <div className="border border-t-0 border-gray-300 rounded-b-lg bg-white min-h-[120px] flex flex-col justify-center">
                      {dept.teams.map((team, teamIndex) => (
                        <div
                          key={teamIndex}
                          className={`px-2 py-4 text-center text-sm text-gray-700 ${
                            teamIndex !== dept.teams.length - 1
                              ? "border-b border-gray-200"
                              : ""
                          }`}
                        >
                          {team}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        <hr className="my-8 border-gray-200 w-full" />
      </main>
    </Layout>
  );
}
