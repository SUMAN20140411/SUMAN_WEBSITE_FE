import { BlocksContent } from "@strapi/blocks-react-renderer";
import strapiClient from "../../api/strapiClient";

export const history = strapiClient.single("history-page");

export type historyPageContent = {
  pageInfo: {
    title: string;
    pageLocation: string;
    hero: string;
  };
  section1: {
    title: string;
    sales: string;
    worker: string;
    hero: string;
    keywords: {
      text: string;
      body: string;
    }[];
  };
  section2: {
    title: string;
    historyList: {
      period: string;
      title: string;
      description: string;
    }[];
  };
};
