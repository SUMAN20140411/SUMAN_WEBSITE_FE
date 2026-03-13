import { GetStaticProps } from "next";
import CiPage from "@/pages/company/ci";
import {
  ciPage,
  ciPageContent,
} from "@/lib/strapi/company/ciPage";

export const getStaticProps: GetStaticProps = async () => {
  try {
    const content = await ciPage.find({
      locale: "en",
      populate: [
        "pageInfo",
        "section1",
        "section2",
        "section2.logoFiles",
        "colors",
      ],
    });

    return {
      props: {
        content: content?.data,
      },
    };
  } catch {
    const fallback = await ciPage.find({
      locale: "ko-KR",
      populate: [
        "pageInfo",
        "section1",
        "section2",
        "section2.logoFiles",
        "colors",
      ],
    });

    return {
      props: {
        content: fallback?.data,
      },
    };
  }
};

export default function EngCiPage({
  content,
}: Readonly<{ content: ciPageContent }>) {
  return <CiPage content={content} />;
}