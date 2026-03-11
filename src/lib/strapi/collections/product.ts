import strapiClient from "@/lib/api/strapiClient";
import { Media } from "..";

export const product = strapiClient.collection("products");

export type Product = {
  id: string;
  name: string;
  engName: string;
  description: string;
  files: Media;
};
