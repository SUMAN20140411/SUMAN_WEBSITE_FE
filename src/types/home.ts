// index.tsx Props 타입 정의
export interface HomePageProps {
  content:{
    section1Text: {
       lines: string[];
      subtitle?: string;
    };
    section2: {
      title: string;
      description: string;
      bgImage: string;
      buttonLabel: string;
      keywords: string[];
      translations?: string[];
    };
  
    section3: {
      title: string;
      subtitle: string;
      cards: Array<{
        img: string;
        title: string;
        subtitle: string;
        description: string;
      }>;
    };

    sectionCertifications: {
      title: string;
      tags: string[];
      certifications: Array<{
        label: string;
        img?: string | null;
      }>;
      legal: string;
    };

    footer_banner: string[];
  }
}
