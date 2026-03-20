import { GetStaticProps } from "next";
import ServicePage from "@/pages/business/service";
import {
  servicePage,
  servicePageContent,
} from "@/lib/strapi/business/servicePage";

export const getStaticProps: GetStaticProps = async () => {
  try {
    const content = await servicePage.find({
      locale: "en",
      populate: [
        "pageInfo",
        "section1",
        "section2",
        "section3",
        "section2.deviceCategories",
        "section2.deviceCategories.equipment",
      ],
    });

    return {
      props: {
        content: content?.data,
      },
    };
  } catch {
    const fallback = await servicePage.find({
      locale: "ko-KR",
      populate: [
        "pageInfo",
        "section1",
        "section2",
        "section3",
        "section2.deviceCategories",
        "section2.deviceCategories.equipment",
      ],
    });

    return {
      props: {
        content: fallback?.data,
      },
    };
  }
};

export default function EngServicePage({
  content,
}: Readonly<{ content: servicePageContent }>) {
  return <ServicePage content={content} />;
}