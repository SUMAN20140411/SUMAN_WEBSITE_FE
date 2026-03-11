import strapiClient from "@/lib/api/strapiClient";
import { IconHub, Media, PageInfo } from "..";

export const wellnessPage = strapiClient.single("wellness-page");

export type wellnessPageContent = {
  pageInfo: PageInfo;
  section1: {
    title: string;
    description: string;
  };
  section2: {
    title: string;
    hero: Media;
    benefits: {
      name: string;
      description: string;
      icon: IconHub;
    }[];
  };
};
