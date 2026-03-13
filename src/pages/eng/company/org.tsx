import { GetStaticProps } from "next";
import OrgPage from "@/pages/company/org";
import {
  orgPage,
  orgPageContent,
} from "@/lib/strapi/company/orgPage";

export const getStaticProps: GetStaticProps = async () => {
  try {
    const content = await orgPage.find({
      locale: "en",
      populate: ["pageInfo", "orgChart", "orgChart.departments.teams"],
    });

    return {
      props: {
        content: content?.data,
      },
    };
  } catch {
    const fallback = await orgPage.find({
      locale: "ko-KR",
      populate: ["pageInfo", "orgChart", "orgChart.departments.teams"],
    });

    return {
      props: {
        content: fallback?.data,
      },
    };
  }
};

export default function EngOrgPage({
  content,
}: Readonly<{ content: orgPageContent }>) {
  return <OrgPage content={content} />;
}