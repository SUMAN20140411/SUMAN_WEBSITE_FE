import strapiClient from "@/lib/api/strapiClient";
import { PageInfo } from "..";

export const contactPage = strapiClient.single("contact-page");

export type contactPageContent = {
  pageInfo: PageInfo;
  section1: {
    title: string;
    description: string;
    subtitle: string;
    contacts: {
      name?: string;
      mail?: string;
      department?: string;
      phone?: string;
    }[];
  };
};
