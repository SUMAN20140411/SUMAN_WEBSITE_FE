import { GetStaticProps } from "next";
import RndPage from "@/pages/business/rnd";
import { rndPage, rndPageContent } from "@/lib/strapi/business/rndPage";

export const getStaticProps: GetStaticProps = async () => {
  try {
    const content = await rndPage.find({
      locale: "en",
      populate: [
        "pageInfo",
        "section1",
        "section1.researchItems.hero",
        "section2"
      ]
    });
    return { props: { content: content?.data } };
  } catch {
    const fallback = await rndPage.find({
      locale: "ko-KR",
      populate: [
        "pageInfo",
        "section1",
        "section1.researchItems.hero",
        "section2"
      ]
    });
    return { props: { content: fallback?.data } };
  }
};

export default function EngRndPage({
  content
}: Readonly<{ content: rndPageContent }>) {
  return <RndPage content={content} />;
}
