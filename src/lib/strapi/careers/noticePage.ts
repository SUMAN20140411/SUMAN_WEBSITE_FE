import strapiClient from "@/lib/api/strapiClient";
import { PageInfo } from "..";

export const noticePage = strapiClient.single("notice-page");

export type noticePageContent = {
  pageInfo: PageInfo;
  section1: {
    title: string;
    jobSites: {
      name: string;
      description: string;
      link: string;
    }[];
  };
  section2: {
    title: string;
    subtitle: string;
    description: string;
    forms: {
      name: string;
      description: string;
      downloadText: string;
      file: string;
    }[];
  };
};
