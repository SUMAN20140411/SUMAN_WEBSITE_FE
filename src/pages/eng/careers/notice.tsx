import { GetStaticProps } from "next";
import RecruitmentBoard from "@/pages/careers/notice";
import { noticePage, noticePageContent } from "@/lib/strapi/careers/noticePage";

export const getStaticProps: GetStaticProps = async () => {
  try {
    const content = await noticePage.find({
      locale: "en",
      populate: [
        "pageInfo",
        "section1",
        "section1.jobSites",
        "section2",
        "section2.forms"
      ]
    });

    return {
      props: {
        content: content?.data
      }
    };
  } catch {
    const fallback = await noticePage.find({
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
      props: {
        content: fallback?.data
      }
    };
  }
};

export default function EngNoticePage({
  content
}: Readonly<{ content: noticePageContent }>) {
  return <RecruitmentBoard content={content} />;
}
