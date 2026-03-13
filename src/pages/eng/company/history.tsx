import { GetStaticProps } from "next";
import HistoryPage from "@/pages/company/history";
import {
  historyPage,
  historyPageContent
} from "@/lib/strapi/company/historyPage";

export const getStaticProps: GetStaticProps = async () => {
  try {
    const content = await historyPage.find({
      locale: "en",
      populate: [
        "pageInfo",
        "section1",
        "section1.keywords",
        "section2",
        "section2.historyList"
      ]
    });

    return {
      props: {
        content: content?.data
      }
    };
  } catch {
    const fallback = await historyPage.find({
      locale: "ko-KR",
      populate: [
        "pageInfo",
        "section1",
        "section1.keywords",
        "section2",
        "section2.historyList"
      ]
    });
    return { props: { content: fallback?.data } };
  }
};

export default function EngHistoryPage({
  content
}: Readonly<{ content: historyPageContent }>) {
  return <HistoryPage content={content} />;
}
