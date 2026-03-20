import { GetStaticProps } from "next";
import TalentPage from "@/pages/careers/philosophy";
import {
  philosophyPage,
  philosophyPageContent
} from "@/lib/strapi/careers/philosophyPage";

export const getStaticProps: GetStaticProps = async () => {
  try {
    const content = await philosophyPage.find({
      locale: "en",
      populate: ["pageInfo", "section1", "keywords"]
    });

    return {
      props: {
        content: content?.data
      }
    };
  } catch {
    const fallback = await philosophyPage.find({
      locale: "ko-KR",
      populate: ["pageInfo", "section1", "keywords"]
    });

    return {
      props: {
        content: fallback?.data
      }
    };
  }
};

export default function EngPhilosophyPage({
  content
}: Readonly<{ content: philosophyPageContent }>) {
  return <TalentPage content={content} />;
}
