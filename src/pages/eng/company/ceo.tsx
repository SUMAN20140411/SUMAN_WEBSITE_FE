import {
  ceoPage as engCeoPage,
  ceoPageContent
} from "@/lib/strapi/company/ceoPage";
import CeoPage from "@/pages/company/ceo";
import { GetStaticProps } from "next";

export const getStaticProps: GetStaticProps = async () => {
  try {
    const content = await engCeoPage.find({
      locale: "en",
      populate: ["pageInfo", "signatures"] // populates all relations/media 1 level deep
    });
    return { props: { content: content?.data } };
  } catch {
    const fallback = await engCeoPage.find({
      locale: "ko-KR",
      populate: ["pageInfo", "signatures"]
    });
    return { props: { content: fallback?.data } };
  }
};

export default function EnCeoPage({
  content
}: Readonly<{ content: ceoPageContent }>) {
  return <CeoPage content={content} />;
}
