import strapiClient from "../../api/strapiClient";

export const ceoPage = strapiClient.single("ceo-page");

export type ceoPageContent = {
  pageInfo: {
    title: string;
    pageLocation: string;
    hero: string;
  };
  title: string;
  subtitle: string;
  message: string;
  signatures: {
    position: string;
    name: string;
  }[];
  img: string;
};
