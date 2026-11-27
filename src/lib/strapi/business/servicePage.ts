import { PageInfo } from "..";
import strapiClient from "../../api/strapiClient";

export const servicePage = strapiClient.single("service-page");

export type EquipmentSpecification = {
  id?: number;
  label: string;
  value: string;
};

export type EquipmentItem = {
  id?: number;
  documentId?: string;
  name: string;
  img?: string | null;
  description?: string | null;
  specification?: EquipmentSpecification[] | null;
};

export type servicePageContent = {
  pageInfo: PageInfo;
  section1: {
    title: string;
    subtitle: string;
    img: string;
  };
  section2: {
    title: string;
    subtitle: string;
    deviceCategories: {
      title: string;
      equipment: EquipmentItem[];
    }[];
  };
  section3: {
    title: string;
    subtitle: string;
    img: string;
  };
};
