import { GetStaticProps } from "next";
import WellnessPage from "@/pages/careers/wellnessMain";
import {
  wellnessPage,
  wellnessPageContent
} from "@/lib/strapi/careers/wellnessPage";

export const getStaticProps: GetStaticProps = async () => {
  try {
    const content = await wellnessPage.find({
      locale: "en",
      populate: ["pageInfo", "section1", "section2", "section2.benefits"]
    });

    return {
      props: {
        content: content?.data
      }
    };
  } catch {
    const fallback = await wellnessPage.find({
      locale: "ko-KR",
      populate: ["pageInfo", "section1", "section2", "section2.benefits"]
    });
    return { props: { content: fallback?.data } };
  }
};

export default function EngWellnessPage({
  content
}: Readonly<{ content: wellnessPageContent }>) {
  return <WellnessPage content={content} />;
}
