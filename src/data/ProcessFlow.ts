export const processFlowContent = {
  // ----------------------------------------------
  //                       KOR
  // ----------------------------------------------
  KOR: {
    title: "프로세스 플로우 - 수평형 v1",
    subtitle: "이중언어(한/영) 제조 공정 워크플로우 - 반응형 디자인",
    
    steps: [
      {
        id: "customer",
        type: "card",
        title: "Customer",
        hasNG: false
      },
      {
        id: "concept",
        type: "card", 
        title: "Concept 설계",
        hasNG: false
      },
      {
        id: "dr",
        type: "diamond",
        title: "D/R",
        hasNG: true,
        ngTarget: "concept"
      },
      {
        id: "development",
        type: "card",
        title: "개발/가공 설계", 
        hasNG: false
      },
      {
        id: "review",
        type: "diamond",
        title: "검토승인",
        hasNG: false
      },
      {
        id: "po",
        type: "card",
        title: "발주(소재/부품)",
        hasNG: false
      },
      {
        id: "inspection",
        type: "diamond", 
        title: "수입검사",
        hasNG: false,
        arrowsTo: "partner"
      },
      {
        id: "partner",
        type: "card",
        title: "협력사",
        hasNG: true,
        ngTarget: "po",
        isPartner: true
      },
      {
        id: "processing",
        type: "card",
        title: "가공/제작",
        hasNG: false
      },
      {
        id: "shipping",
        type: "diamond",
        title: "출하 및 조립/측정검사",
        hasNG: false
      },
      {
        id: "packaging", 
        type: "card",
        title: "포장",
        hasNG: false
      },
      {
        id: "delivery",
        type: "card",
        title: "고객사 납품", 
        hasNG: false
      },
      {
        id: "feedback",
        type: "diamond",
        title: "고객 Feedback",
        hasNG: false
      },
      {
        id: "reorder",
        type: "card",
        title: "Re-Order 개선/반영",
        hasNG: false,
        returnTo: "concept"
      }
    ],

    specs: {
      colorTokens: "색상 토큰",
      typography: "타이포그래피", 
      components: "컴포넌트",
      spacingLayout: "간격 및 레이아웃",
      cardTitles: "카드 제목",
      englishSubtitles: "영어 부제목",
      diamondLabels: "다이아몬드 라벨",
      flowCard: "플로우 카드",
      flowDiamond: "플로우 다이아몬드", 
      flowArrow: "플로우 화살표",
      processFlow: "프로세스 플로우",
      roundedRectangles: "둥근 사각형, 16px 반지름",
      decisionPoints: "결정 지점, 네이비 그라데이션",
      connectors: "연결선과 화살표",
      mainContainer: "메인 컨테이너, 반응형"
    }
  },

  // ----------------------------------------------  
  //                       ENG
  // ----------------------------------------------
  ENG: {
    title: "Process Flow - Horizontal v1",
    subtitle: "Bilingual (KR/EN) manufacturing process workflow with responsive design",
    
    steps: [
      {
        id: "customer",
        type: "card",
        title: "Customer", 
        hasNG: false
      },
      {
        id: "concept",
        type: "card",
        title: "Concept Design",
        hasNG: false
      },
      {
        id: "dr", 
        type: "diamond",
        title: "D/R",
        hasNG: true,
        ngTarget: "concept"
      },
      {
        id: "development",
        type: "card",
        title: "Dev / Machining Design",
        hasNG: false
      },
      {
        id: "review",
        type: "diamond", 
        title: "Review & Approval",
        hasNG: false
      },
      {
        id: "po",
        type: "card",
        title: "PO (Materials/Parts)", 
        hasNG: false
      },
      {
        id: "inspection",
        type: "diamond",
        title: "Incoming Inspection",
        hasNG: false,
        arrowsTo: "partner"
      },
      {
        id: "partner",
        type: "card",
        title: "Partner",
        hasNG: true,
        ngTarget: "po",
        isPartner: true
      },
      {
        id: "processing",
        type: "card",
        title: "Processing/Manufacturing",
        hasNG: false
      },
      {
        id: "shipping", 
        type: "diamond",
        title: "Shipping & Assembly/Measurement Inspection", 
        hasNG: false
      },
      {
        id: "packaging",
        type: "card",
        title: "Packaging",
        hasNG: false
      },
      {
        id: "delivery",
        type: "card", 
        title: "Delivery to Customer",
        hasNG: false
      },
      {
        id: "feedback",
        type: "diamond",
        title: "Customer Feedback",
        hasNG: false
      },
      {
        id: "reorder",
        type: "card",
        title: "Re-Order Improvement/Reflection", 
        hasNG: false,
        returnTo: "concept"
      }
    ],

    specs: {
      colorTokens: "Color Tokens",
      typography: "Typography",
      components: "Components", 
      spacingLayout: "Spacing & Layout",
      cardTitles: "Card Titles",
      englishSubtitles: "English Subtitles",
      diamondLabels: "Diamond Labels",
      flowCard: "FlowCard",
      flowDiamond: "FlowDiamond",
      flowArrow: "FlowArrow", 
      processFlow: "ProcessFlow",
      roundedRectangles: "Rounded rectangles, 16px radius",
      decisionPoints: "Decision points, navy gradient", 
      connectors: "Connectors with chevrons",
      mainContainer: "Main container, responsive"
    }
  }
};