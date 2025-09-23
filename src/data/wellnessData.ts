// src/data/wellnessData.ts
import * as LucideIcons from "lucide-react";

// --- Icon Mapping ---
export const iconMap = {
  dormitory: 'Home',
  utensils: 'Utensils', // New icon key for "식사제공"
  lounge: 'Coffee',
  dumbbell: 'Dumbbell', // New icon key for "헬스장"
  award: 'Award',
  commuterBus: 'BusFront',
  carpool: 'Car',
  resort: 'Tent',
  club: 'Users',
  health: 'HeartPulse',
  insurance: 'ShieldPlus',
  anniversary: 'Gift',
  congratulations: 'HeartHandshake',
  alumni: 'Handshake',
} as const;

export type IconKey = keyof typeof iconMap;

// --- Wellness Data Interfaces ---
export interface WellnessItem {
  title: string;
  description: string;
  iconKey: IconKey;
}

export interface WellnessSection {
  key: string;
  title: string;
  //subtitle: string;
  heroImage: string;
  items: WellnessItem[];
}

export interface WellnessData {
  hero: {
    title: string;
    //subtitle: string;
    path: string;
    heroImage: string;
  };
  sections: WellnessSection[];
}

export const wellnessContent: Record<string, WellnessData> = {
  KOR: {
    hero: {
      title: "복리후생",
      //subtitle: "일과 생활의 균형, 즐거운 일터를 만들기 위하여 다양한 복지제도를 시행 중입니다",
      path: "회사소개 > 복리후생",
      heroImage: "/images/wellness/well_bg.png",
    },
    sections: [
      {
        key: "office-life",
        title: "Employee Benefits",
        //subtitle: "회사생활",
        heroImage: "/images/wellness/life_bg.png",
        items: [
          { title: "기숙사", description: "원거리 거주자 지원", iconKey: "dormitory" },
          { title: "식사제공", description: "점심식사 제공", iconKey: "utensils" },
          { title: "휴게시설", description: "헬스장, 휴게실, 샤워실", iconKey: "dumbbell" },
          { title: "상여금", description: "명절 상여 지급", iconKey: "award" },
        ],
      },
    ],
  },
  ENG: {
    hero: {
      title: "EMPLOYEE BENEFITS",
      //subtitle: "To create a balance between work and life, we are implementing various welfare programs.",
      path: "About Us > Employee Benefits",
      heroImage: "/images/wellness/well_bg.png",
    },
    sections: [
      {
        key: "office-life",
        title: "Employee Benefits",
        //subtitle: "Employee Benefits",
        heroImage: "/images/wellness/life_bg.png",
        items: [
          { title: "Dormitory", description: "Support for long-distance residents", iconKey: "dormitory" },
          { title: "Meal Provision", description: "Lunch meal provided", iconKey: "utensils" },
          { title: "Recreation Facilities", description: "Gym, lounges, showers", iconKey: "dumbbell" },
          { title: "Bonus", description: "Holiday bonus provided", iconKey: "award" },
        ],
      },
    ],
  },
};