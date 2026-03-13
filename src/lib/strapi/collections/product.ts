import strapiClient from "@/lib/api/strapiClient";

export const product = strapiClient.collection("products");

export type Product = {
  id: string;
  name: string;
  engName: string;
  description: string;
  img: string;
};
