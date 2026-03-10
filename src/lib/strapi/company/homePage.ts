import strapiClient from "../../api/strapiClient";

export type homePageContent = {
  section1: {
    hero: string;
    title: string;
    description: string;
  };
  section2: {
    title: string;
    buttonLabel: string;
    subTitle: string;
    description: string;
    hero: string;
    keywords: {
      title: string;
      korTitle: string;
    }[];
  };
  section3: {
    title: string;
    buttonLabel: string;
    description: string;
    solutions: {
      hero: string;
      title: string;
      korTitle: string;
      description: string;
    }[];
  };
  section4: {
    title: string;
    subtitle: string;
    description: string;
    services: {
      hero: string;
      title: string;
    }[];
  };
};

export const homePage = strapiClient.single("home-page");
