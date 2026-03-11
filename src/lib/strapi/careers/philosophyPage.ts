import { IconHub, Media, PageInfo } from "..";
import strapiClient from "../../api/strapiClient";

export const philosophyPage = strapiClient.single("philosophy-page");

export type philosophyPageContent = {
  pageInfo: PageInfo;
  section1: {
    title: string;
    description: string;
    state: string;
    position: string;
    icon: IconHub;
    submitButton: string;
    isRecruiting: boolean;
  };
  keywords: {
    title: string;
    description: string;
    hero: Media;
  }[];
};
