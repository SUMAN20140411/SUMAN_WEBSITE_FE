import strapiClient from "@/lib/api/strapiClient";

export const locations = strapiClient.collection("location");

export type locationsContent = {
  name: string;
  address: string;
  latitude?: number;
  longitude?: number;
}[];
