import { BlocksContent } from "@strapi/blocks-react-renderer";
import strapiClient from "../../api/strapiClient";

export const vision = strapiClient.single("vision-page");

export type visionPageContent = {
  pageInfo: {
    title: string;
    pageLocation: string;
    hero: string;
  };
  section1: {
    title: string;
    emphasizedSubtitle: string;
    subtitle: string;
    targetSales: string;
    targetIncome: string;
    subsection: {
      title: string;
      description: BlocksContent[];
    };
  };
  section2: {
    title: string;
    subsection: {
      title: string;
      description: BlocksContent[];
    }[];
  };
  section3: {
    title: string;
    subsection: {
      title: string;
      description: BlocksContent[];
    }[];
  };
  section4: {
    title: string;
    subtitle: string;
    img: string;
  };
};
