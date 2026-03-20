import strapiClient from "@/lib/api/strapiClient";

export const certificatePage = strapiClient.single("certification-page");

export type certificatePageContent = {
  pageInfo: {
    title: string;
    pageLocation: string;
    hero: string;
  };
  section1: {
    title: string;
    description: string;
    keywords: {
      title: string;
      body: string;
    }[];
  };
  certificates: {
    name: string;
    file: string;
  }[];
};
