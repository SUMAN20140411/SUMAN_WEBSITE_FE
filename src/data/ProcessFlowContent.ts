export const processFlowContent = {
  KOR: {
    title: "기준업종 공정도",
    subtitle: "제품 제조 및 품질 프로세스",
    
    steps: [
      // Top row
      { id: "customer", type: "rect", text: "CUSTOMER", x: 50, y: 80 },
      { id: "concept", type: "rect", text: "CONCEPT\n설계", x: 200, y: 80 },
      { id: "dr", type: "diamond", text: "D/R", x: 350, y: 80 },
      { id: "development", type: "rect", text: "개발/가공 설계", x: 500, y: 80 },
      { id: "review", type: "diamond", text: "검토승인", x: 650, y: 80 },
      { id: "po", type: "rect", text: "발주\n(소재/부품)", x: 800, y: 80 },
      
      // Middle right side
      { id: "partner", type: "rect", text: "협력사", x: 700, y: 200 },
      { id: "inspection", type: "diamond", text: "수입검사", x: 550, y: 200 },
      
      // Bottom row (right to left)
      { id: "processing", type: "rect", text: "가공/제작", x: 800, y: 320 },
      { id: "shipping", type: "diamond", text: "출하 및 조립/\n측정검사", x: 650, y: 320 },
      { id: "packaging", type: "rect", text: "포장", x: 500, y: 320 },
      { id: "delivery", type: "rect", text: "고객사 납품", x: 350, y: 320 },
      { id: "feedback", type: "diamond", text: "고객\nFeedback", x: 200, y: 320 },
      { id: "reorder", type: "rect", text: "Re-Order\n개선/반영", x: 50, y: 320 }
    ],
    
    arrows: [
      // Top flow (left to right)
      { from: "customer", to: "concept" },
      { from: "concept", to: "dr" },
      { from: "dr", to: "development" },
      { from: "development", to: "review" },
      { from: "review", to: "po" },
      
      // Down from PO to partner
      { from: "po", to: "partner", direction: "vertical" },
      { from: "partner", to: "inspection" },
      
      // Down from inspection to processing
      { from: "inspection", to: "processing", direction: "vertical" },
      
      // Bottom flow (right to left)
      { from: "processing", to: "shipping" },
      { from: "shipping", to: "packaging" },
      { from: "packaging", to: "delivery" },
      { from: "delivery", to: "feedback" },
      { from: "feedback", to: "reorder" },
      
      // NG paths
      { from: "dr", to: "concept", type: "ng", label: "NG" },
      { from: "review", to: "development", type: "ng", label: "NG" },
      { from: "inspection", to: "partner", type: "ng", label: "NG" },
      { from: "shipping", to: "processing", type: "ng", label: "NG" }
    ]
  },
  
  ENG: {
    title: "Standard Industry Process Flow",
    subtitle: "Product Manufacturing and Quality Process",
    
    steps: [
      // Top row
      { id: "customer", type: "rect", text: "Customer", x: 50, y: 80 },
      { id: "concept", type: "rect", text: "Concept\nDesign", x: 200, y: 80 },
      { id: "dr", type: "diamond", text: "D/R", x: 350, y: 80 },
      { id: "development", type: "rect", text: "Development /\nProcessing Design", x: 500, y: 80 },
      { id: "review", type: "diamond", text: "Review\nApproval", x: 650, y: 80 },
      { id: "po", type: "rect", text: "Purchase Order\n(Material / Parts)", x: 800, y: 80 },
      
      // Middle right side
      { id: "partner", type: "rect", text: "Partner", x: 700, y: 200 },
      { id: "inspection", type: "diamond", text: "Incoming\nInspection", x: 550, y: 200 },
      
      // Bottom row (right to left)
      { id: "processing", type: "rect", text: "Processing /\nManufacturing", x: 800, y: 320 },
      { id: "shipping", type: "diamond", text: "Shipping &\nAssembly /\nMeasure\nInspection", x: 650, y: 320 },
      { id: "packaging", type: "rect", text: "Packaging", x: 500, y: 320 },
      { id: "delivery", type: "rect", text: "Customer\nDelivery", x: 350, y: 320 },
      { id: "feedback", type: "diamond", text: "Customer\nFeedback", x: 200, y: 320 },
      { id: "reorder", type: "rect", text: "Re-Order /\nImprovement", x: 50, y: 320 }
    ],
    
    arrows: [
      // Top flow (left to right)
      { from: "customer", to: "concept" },
      { from: "concept", to: "dr" },
      { from: "dr", to: "development" },
      { from: "development", to: "review" },
      { from: "review", to: "po" },
      
      // Down from PO to partner
      { from: "po", to: "partner", direction: "vertical" },
      { from: "partner", to: "inspection" },
      
      // Down from inspection to processing
      { from: "inspection", to: "processing", direction: "vertical" },
      
      // Bottom flow (right to left)
      { from: "processing", to: "shipping" },
      { from: "shipping", to: "packaging" },
      { from: "packaging", to: "delivery" },
      { from: "delivery", to: "feedback" },
      { from: "feedback", to: "reorder" },
      
      // NG paths
      { from: "dr", to: "concept", type: "ng", label: "NG" },
      { from: "review", to: "development", type: "ng", label: "NG" },
      { from: "inspection", to: "partner", type: "ng", label: "NG" },
      { from: "shipping", to: "processing", type: "ng", label: "NG" }
    ]
  }
};