import strapiClient from "@/lib/api/strapiClient";

export const locationPage = strapiClient.single("location-page");

export type locationPageContent = {
  pageInfo: {
    title: string;
    pageLocation: string;
    hero: string;
  };
  section1: {
    title: string;
    locations: {
      name: string;
      address: string;
      geoLoc: {
        latitude: number;
        longitude: number;
      };
    }[];
  };
};
