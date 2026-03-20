import strapiClient from "@/lib/api/strapiClient";
import { PageInfo } from "..";

export const productPage = strapiClient.single("product-page");

export type productPageContent = {
  pageInfo: PageInfo;
  section1: {
    title: string;
    description: string;
    footnote: string;
    products: {
      title: string;
      korTitle: string;
      description: string;
      hero: string;
    }[];
  };
};
