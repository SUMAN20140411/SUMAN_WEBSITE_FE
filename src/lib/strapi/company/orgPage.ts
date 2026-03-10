import strapiClient from "../../api/strapiClient";

export const orgPage = strapiClient.single("org-page");

export type orgPageContent = {
  pageInfo: {
    title: string;
    pageLocation: string;
    hero: string;
  };
  orgChart: {
    ceo: string;
    advisor: string;
    departments: {
      name: string;
      teams: string[];
    }[];
  };
};
