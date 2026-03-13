import { GetStaticProps } from "next";
import ProductPage from "@/pages/business/product";
import {
  productPage,
  productPageContent
} from "@/lib/strapi/business/productPage";

export const getStaticProps: GetStaticProps = async () => {
  try {
    const content = await productPage.find({
      locale: "en",
      populate: ["pageInfo", "section1", "section1.products"]
    });

    return {
      props: {
        content: content?.data
      }
    };
  } catch {
    const fallback = await productPage.find({
      locale: "ko-KR",
      populate: ["pageInfo", "section1", "section1.products"]
    });
    return { props: { content: fallback?.data } };
  }
};

export default function EngProductPage({
  content
}: Readonly<{ content: productPageContent }>) {
  return <ProductPage content={content} />;
}
