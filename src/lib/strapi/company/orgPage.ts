import strapiClient from "../../api/strapiClient";

export const orgPage = strapiClient.single("organization-page");

export type orgPageContent = {
  pageInfo: {
    title: string;
    pageLocation: string;
    hero: string;
  };
  orgChart: {
    logo: string;
    board: string;
    ceo: string;
    advisor: string;
    departments: {
      name: string;
      teams: {
        text: string;
      }[];
    }[];
  };
};
