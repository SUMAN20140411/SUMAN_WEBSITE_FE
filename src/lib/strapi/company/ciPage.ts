import strapiClient from "@/lib/api/strapiClient";

export const ciPage = strapiClient.single("ci-page");

export type ciPageContent = {
  pageInfo: {
    title: string;
    pageLocation: string;
    hero: string;
  };
  section1: {
    title: string;
    description: string;
  };
  section2: {
    title: string;
    description: string;
    logoFiles: string[];
  };
  colors: {
    name: string;
    pantoneColor: string;
    color: string;
  }[];
};
