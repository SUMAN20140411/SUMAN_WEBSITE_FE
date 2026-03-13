import strapiClient from "@/lib/api/strapiClient";
import { IconHub, PageInfo } from "..";

export const rndPage = strapiClient.single("rnd-page");

export type rndPageContent = {
  pageInfo: PageInfo;
  section1: {
    title: string;
    description: string;
    researchItems: {
      hero: string;
      title: string;
      description: string;
      icon: IconHub;
    }[];
  };
  section2: {
    title: string;
    description: string;
  };
};
