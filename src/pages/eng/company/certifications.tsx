import { GetStaticProps } from "next";
import CertificationsPage from "@/pages/company/certifications";
import {
  certificatePage,
  certificatePageContent
} from "@/lib/strapi/company/certificatePage";
import {
  certificates,
  certificatesContent
} from "@/lib/strapi/collections/certificate";

export const getStaticProps: GetStaticProps = async () => {
  try {
    const content = await certificatePage.find({
      locale: "en",
      populate: ["pageInfo", "section1", "section1.keywords", "certificates"]
    });

    const certificatesData = await certificates.find({
      locale: "en",
      filters: {
        publishedAt: {
          $notNull: true
        }
      }
    });

    return {
      props: {
        content: content?.data,
        certificatesData: certificatesData?.data
      }
    };
  } catch {
    const fallback = await certificatePage.find({
      locale: "ko-KR",
      populate: ["pageInfo", "section1", "section1.keywords", "certificates"]
    });
    const certificatesData = await certificates.find({
      locale: "ko-KR",
      filters: {
        publishedAt: {
          $notNull: true
        }
      }
    });
    return {
      props: {
        content: fallback?.data,
        certificatesData: certificatesData?.data
      }
    };
  }
};

export default function EngCertificationsPage({
  content,
  certificatesData
}: Readonly<{
  content: certificatePageContent;
  certificatesData: certificatesContent;
}>) {
  return (
    <CertificationsPage content={content} certificatesData={certificatesData} />
  );
}
