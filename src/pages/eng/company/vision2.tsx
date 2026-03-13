import { GetStaticProps } from "next";
import Vision2Page from "@/pages/company/vision2";
import {
  visionPage,
  visionPageContent,
} from "@/lib/strapi/company/visionPage";

export const getStaticProps: GetStaticProps = async () => {
  try {
    const content = await visionPage.find({
      locale: "en",
      populate: [
        "pageInfo",
        "section1",
        "section1.subsection",
        "section2",
        "section2.subsection",
        "section3",
        "section3.subsection",
        "section4",
      ],
    });

    return {
      props: {
        content: content?.data,
      },
    };
  } catch {
    const fallback = await visionPage.find({
      locale: "ko-KR",
      populate: [
        "pageInfo",
        "section1",
        "section1.subsection",
        "section2",
        "section2.subsection",
        "section3",
        "section3.subsection",
        "section4",
      ],
    });

    return {
      props: {
        content: fallback?.data,
      },
    };
  }
};

export default function EngVision2Page({
  content,
}: Readonly<{ content: visionPageContent }>) {
  return <Vision2Page content={content} />;
}