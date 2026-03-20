import { GetStaticProps } from "next";
import ContactPage from "@/pages/support/contact";
import {
  contactPage,
  contactPageContent
} from "@/lib/strapi/contact/contactPage";

export const getStaticProps: GetStaticProps = async () => {
  try {
    const content = await contactPage.find({
      locale: "en",
      populate: ["pageInfo", "section1", "section1.contacts"]
    });

    return {
      props: {
        content: content?.data
      }
    };
  } catch {
    const fallback = await contactPage.find({
      locale: "ko-KR",
      populate: ["pageInfo", "section1", "section1.contacts"]
    });
    return { props: { content: fallback?.data } };
  }
};

export default function EngContactPage({
  content
}: Readonly<{ content: contactPageContent }>) {
  return <ContactPage content={content} />;
}
