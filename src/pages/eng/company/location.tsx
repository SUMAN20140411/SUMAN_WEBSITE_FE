import { GetStaticProps } from "next";
import LocationPage from "@/pages/company/location";
import {
  locationPage,
  locationPageContent,
} from "@/lib/strapi/company/locationPage";

export const getStaticProps: GetStaticProps = async () => {
  try {
    const content = await locationPage.find({
      locale: "en",
      populate: ["pageInfo", "section1", "section1.locations"],
    });

    return {
      props: {
        content: content?.data,
      },
    };
  } catch {
    const fallback = await locationPage.find({
      locale: "ko-KR",
      populate: ["pageInfo", "section1", "section1.locations"],
    });

    return {
      props: {
        content: fallback?.data,
      },
    };
  }
};

export default function EngLocationPage({
  content,
}: Readonly<{ content: locationPageContent }>) {
  return <LocationPage content={content} />;
}