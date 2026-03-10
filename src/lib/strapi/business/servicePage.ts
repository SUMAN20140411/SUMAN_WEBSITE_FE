import { PageInfo } from "..";
import strapiClient from "../../api/strapiClient";

export const servicePage = strapiClient.single("service-page");

export type servicePageContent = {
  pageInfo: PageInfo;
  section1: {
    title: string;
    subtitle: string;
    img: string;
  };
  section2: {
    title: string;
    subtitle: string;
    deviceCategories: {
      title: string;
      equipment: {
        name: string;
        img: string;
      }[];
    }[];
  };
  section3: {
    title: string;
    subtitle: string;
    img: string;
  };
};
