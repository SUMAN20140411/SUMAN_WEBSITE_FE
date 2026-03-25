import strapiClient from "../../api/strapiClient";

export const historyPage = strapiClient.single("history-page");

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
      title: string;
      body: string;
    }[];
    salesRecords: {
      amount: number;
      unit: string;
      year: string;
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
