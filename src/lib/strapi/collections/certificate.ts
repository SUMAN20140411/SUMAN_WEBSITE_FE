import strapiClient from "@/lib/api/strapiClient";

export const certificates = strapiClient.collection("certificates");

export type certificatesContent = {
  name: string;
  file: string;
}[];
