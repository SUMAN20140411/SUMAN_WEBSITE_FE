import { GetStaticProps } from "next";
import ApplyPage from "@/pages/test-center/apply";
import {
  loadTestEquipment,
  type TestEquipmentCatalog,
} from "@/lib/strapi/collections/testEquipment";

export const getStaticProps: GetStaticProps = async () => {
  try {
    return { props: { catalog: await loadTestEquipment("en") } };
  } catch {
    return { props: { catalog: await loadTestEquipment("ko-KR") } };
  }
};

export default function EngTestCenterApplyPage({
  catalog,
}: {
  catalog: TestEquipmentCatalog;
}) {
  return <ApplyPage catalog={catalog} />;
}
