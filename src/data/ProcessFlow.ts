export const processFlowContent = {
  KOR: {
    title: "기준업종 공정도",
    subtitle: "제품 제조 및 품질 프로세스",

    topLane: [
      {
        id: "customer",
        type: "card",
        title: "Customer",
      },
      {
        id: "concept",
        type: "card",
        title: "Concept\n설계",
        hasNGFrom: ["dr"]
      },
      {
        id: "dr",
        type: "diamond",
        title: "D/R",
        ngTarget: "concept"
      },
      {
        id: "development",
        type: "card",
        title: "개발/가공\n설계",
        hasNGFrom: ["review"]
      },
      {
        id: "review",
        type: "diamond",
        title: "검토승인",
        ngTarget: "development"
      },
      {
        id: "po",
        type: "card",
        title: "발주\n(소재/부품)",
      }
    ],

    middleSection: [
      {
        id: "inspection",
        type: "diamond",
        title: "수입검사",
        connectsTo: ["partner", "processing"],
        ngTarget: "partner"
      },
      {
        id: "partner",
        type: "card",
        title: "협력사",
        isEndPoint: true
      }
    ],

    bottomLane: [
      {
        id: "processing",
        type: "card",
        title: "가공/제작",
        hasNGFrom: ["shipping"]
      },
      {
        id: "shipping",
        type: "diamond",
        title: "출하 및 조립/\n측정검사",
        ngTarget: "processing"
      },
      {
        id: "packaging",
        type: "card",
        title: "포장"
      },
      {
        id: "delivery",
        type: "card",
        title: "고객사 납품"
      },
      {
        id: "feedback",
        type: "diamond",
        title: "고객 Feedback"
      },
      {
        id: "reorder",
        type: "card",
        title: "Re-Order\n개선/반영"
      }
    ]
  },

  ENG: {
    title: "Standard Industry Process Flow",
    subtitle: "Product Manufacturing and Quality Process",

    topLane: [
      {
        id: "customer",
        type: "card",
        title: "Customer",
      },
      {
        id: "concept",
        type: "card",
        title: "Concept\nDesign",
        hasNGFrom: ["dr"]
      },
      {
        id: "dr",
        type: "diamond",
        title: "D/R",
        ngTarget: "concept"
      },
      {
        id: "development",
        type: "card",
        title: "Development /\nProcessing Design",
        hasNGFrom: ["review"]
      },
      {
        id: "review",
        type: "diamond",
        title: "Review\nApproval",
        ngTarget: "development"
      },
      {
        id: "po",
        type: "card",
        title: "Purchase Order\n(Materials / Parts)",
      }
    ],

    middleSection: [
      {
        id: "inspection",
        type: "diamond",
        title: "Incoming\nInspection",
        connectsTo: ["partner", "processing"],
        ngTarget: "partner"
      },
      {
        id: "partner",
        type: "card",
        title: "Partner\n(Vendor)",
        isEndPoint: true
      }
    ],

    bottomLane: [
      {
        id: "processing",
        type: "card",
        title: "Processing /\nManufacturing",
        hasNGFrom: ["shipping"]
      },
      {
        id: "shipping",
        type: "diamond",
        title: "Shipping & Assembly /\nMeasurement Inspection",
        ngTarget: "processing"
      },
      {
        id: "packaging",
        type: "card",
        title: "Packaging"
      },
      {
        id: "delivery",
        type: "card",
        title: "Customer\nDelivery"
      },
      {
        id: "feedback",
        type: "diamond",
        title: "Customer\nFeedback"
      },
      {
        id: "reorder",
        type: "card",
        title: "Re-Order /\nImprovement"
      }
    ]
  }
};
