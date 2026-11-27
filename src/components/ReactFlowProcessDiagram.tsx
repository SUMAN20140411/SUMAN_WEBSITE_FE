"use client";

import React, { useEffect, useMemo, useRef } from "react";
import {
  ReactFlow,
  useReactFlow,
  type Node,
  type Edge,
  MarkerType,
  type NodeTypes,
  SmoothStepEdgeProps,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { ProcessNode } from "./flow/ProcessNode";
import { DecisionNode } from "./flow/DecisionNode";
import { SectionFrameNode, SectionPillNode } from "./flow/SectionFrameNode";

type Language = "KOR" | "ENG";

interface ReactFlowProcessDiagramProps {
  readonly language?: Language;
}

const nodeTypes: NodeTypes = {
  process: ProcessNode,
  decision: DecisionNode,
  sectionFrame: SectionFrameNode,
  sectionPill: SectionPillNode,
};

// ─── Layout constants ───────────────────────────────────────────────────────
const ROW1_Y = 0;
const ROW2_Y = 190;
const ROW3_Y = 380;
const ROW4_Y = 635;

// Top row X positions
const X_CUSTOMER = 0;
const X_CONCEPT = 190;
const X_DR = 380;
const X_DEV = 580;
const X_REVIEW = 790;
const X_PO = 1010;

// Middle row X positions
const X_SUPPLIER = 780;
const X_INSPECTION = 1010;

// Bottom row X positions (right to left)
const X_MANUFACTURING = 1010;
const X_FQC = 790;
const X_PACKAGING = 580;
const X_DELIVERY = 390;
const X_FEEDBACK = 180;
const X_REORDER = 0;

// Testing & Verification Center row X positions (left to right)
const X_SAMPLE_ARRIVAL = -60;
const X_JIG_ASSEMBLY = 130;
const X_TEST_PREP = 320;
const X_TEST_EXECUTION = 510;
const X_STATUS_CHECK = 700;
const X_REPORT_COMPLETE = 900;
const X_CUSTOMER_PROPOSAL = 1090;

// ─── Edge shared styles ──────────────────────────────────────────────────────
const normalEdgeStyle = { stroke: "#9CA3AF", strokeWidth: 2 };
const ngEdgeStyle = { stroke: "#EF4444", strokeWidth: 2 };
const ngDashedEdgeStyle = {
  stroke: "#EF4444",
  strokeWidth: 2,
  strokeDasharray: "5 5",
};
const okDashedEdgeStyle = {
  stroke: "#10B981",
  strokeWidth: 2,
  strokeDasharray: "5 5",
};
const feedbackEdgeStyle = {
  stroke: "#1E3A8A",
  strokeWidth: 2.25,
  strokeDasharray: "6 4",
};
const normalMarker = {
  type: MarkerType.ArrowClosed,
  color: "#9CA3AF",
  width: 14,
  height: 14,
};
const ngMarker = {
  type: MarkerType.ArrowClosed,
  color: "#EF4444",
  width: 14,
  height: 14,
};
const okMarker = {
  type: MarkerType.ArrowClosed,
  color: "#10B981",
  width: 14,
  height: 14,
};
const feedbackMarker = {
  type: MarkerType.ArrowClosed,
  color: "#1E3A8A",
  width: 14,
  height: 14,
};

// ─── Bilingual labels ────────────────────────────────────────────────────────
const labels = {
  ENG: {
    manufacturingSectionTitle: "Product Manufacturing & Quality Process",
    testingSectionTitle: "Testing & Verification Center Process",
    testingFeedback: "Testing & Verification Feedback",
    customer: "Customer",
    concept: "Concept\nDesign",
    dr: "D/R",
    development: "Development /\nProcessing Design",
    review: "Review\nApproval",
    po: "Purchase Order\n(Material / Parts)",
    supplier: "Supplier",
    inspection: "Inspection",
    manufacturing: "Processing /\nManufacturing",
    fqc: "FQC &\nShipping",
    packaging: "Packaging",
    delivery: "Delivery",
    feedback: "Customer\nFeedback",
    reorder: "Re-Order",
    sampleArrival: "Customer Sample\nArrival",
    sampleArrivalSub: "Request Intake",
    jigAssembly: "Jig Assembly /\nCell & Pack Setup",
    jigAssemblySub: "Test Preparation",
    testPrep: "Evaluation /\nTest Prep",
    testPrepSub: "Test Planning",
    testExecution: "Testing &\nVerification",
    testExecutionSub: "Perf. / Safety / Rel.",
    statusCheck: "Status\nCheck",
    statusCheckSub: "Result Review",
    reportComplete: "Evaluation\nReport",
    reportCompleteSub: "Result Reporting",
    customerProposal: "Customer Feedback /\nProposal",
    customerProposalSub: "Improvement Plan",
  },
  KOR: {
    manufacturingSectionTitle: "제품 제조 및 품질 프로세스",
    testingSectionTitle: "시험/실증센터 프로세스",
    testingFeedback: "시험/실증 결과 피드백",
    customer: "CUSTOMER",
    concept: "CONCEPT\n설계",
    dr: "D/R",
    development: "개발/가공 설계",
    review: "검토승인",
    po: "발주\n(소재/부품)",
    supplier: "협력사",
    inspection: "수입검사",
    manufacturing: "가공/제작",
    fqc: "출하 및 조립/\n측정검사",
    packaging: "포장",
    delivery: "고객사 납품",
    feedback: "고객\nFeedback",
    reorder: "Re-Order\n개선/반영",
    sampleArrival: "고객 샘플 도착",
    sampleArrivalSub: "요청 접수",
    jigAssembly: "지그 조립 /\n셀·팩 구성",
    jigAssemblySub: "시험 준비",
    testPrep: "평가/시험 준비",
    testPrepSub: "시험 계획 수립",
    testExecution: "시험·실증 진행",
    testExecutionSub: "성능 / 안전 / 신뢰성",
    statusCheck: "상태 확인",
    statusCheckSub: "결과 검토",
    reportComplete: "평가 완료\n(리포트)",
    reportCompleteSub: "결과 보고",
    customerProposal: "고객 피드백 /\n개선 제안",
    customerProposalSub: "개선 방향 도출",
  },
} as const;

function buildNodes(lang: Language): Node[] {
  const l = labels[lang];

  return [
    // ── Section headers / frames ───────────────────────────────────
    {
      id: "section-manufacturing-pill",
      type: "sectionPill",
      position: { x: 45, y: -88 },
      data: { title: l.manufacturingSectionTitle },
      selectable: false,
      draggable: false,
      focusable: false,
      zIndex: -1,
    },
    {
      id: "section-testing-frame",
      type: "sectionFrame",
      position: { x: 515, y: 655 },
      data: {
        title: l.testingSectionTitle,
        width: 1360,
        height: 245,
      },
      selectable: false,
      draggable: false,
      focusable: false,
      zIndex: -1,
    },

    // ── Row 1 ──────────────────────────────────────────────────────
    {
      id: "customer",
      type: "process",
      position: { x: X_CUSTOMER, y: ROW1_Y },
      data: { label: l.customer },
    },
    {
      id: "concept",
      type: "process",
      position: { x: X_CONCEPT, y: ROW1_Y },
      data: { label: l.concept },
    },
    {
      id: "dr",
      type: "decision",
      position: { x: X_DR, y: ROW1_Y },
      data: { label: l.dr },
    },
    {
      id: "development",
      type: "process",
      position: { x: X_DEV, y: ROW1_Y },
      data: { label: l.development },
    },
    {
      id: "review",
      type: "decision",
      position: { x: X_REVIEW, y: ROW1_Y },
      data: { label: l.review },
    },
    {
      id: "po",
      type: "process",
      position: { x: X_PO, y: ROW1_Y },
      data: { label: l.po },
    },

    // ── Row 2 ──────────────────────────────────────────────────────
    {
      id: "supplier",
      type: "process",
      position: { x: X_SUPPLIER, y: ROW2_Y },
      data: { label: l.supplier },
    },
    {
      id: "inspection",
      type: "decision",
      position: { x: X_INSPECTION, y: ROW2_Y },
      data: { label: l.inspection },
    },

    // ── Row 3 ──────────────────────────────────────────────────────
    {
      id: "manufacturing",
      type: "process",
      position: { x: X_MANUFACTURING, y: ROW3_Y },
      data: { label: l.manufacturing },
    },
    {
      id: "fqc",
      type: "decision",
      position: { x: X_FQC, y: ROW3_Y },
      data: { label: l.fqc },
    },
    {
      id: "packaging",
      type: "process",
      position: { x: X_PACKAGING, y: ROW3_Y },
      data: { label: l.packaging },
    },
    {
      id: "delivery",
      type: "process",
      position: { x: X_DELIVERY, y: ROW3_Y },
      data: { label: l.delivery },
    },
    {
      id: "feedback",
      type: "decision",
      position: { x: X_FEEDBACK, y: ROW3_Y },
      data: { label: l.feedback },
    },
    {
      id: "reorder",
      type: "process",
      position: { x: X_REORDER, y: ROW3_Y },
      data: { label: l.reorder },
    },

    // ── Row 4: Testing & Verification Center Process (left → right) ─
    {
      id: "sampleArrival",
      type: "process",
      position: { x: X_SAMPLE_ARRIVAL, y: ROW4_Y },
      data: { label: l.sampleArrival, subLabel: l.sampleArrivalSub },
    },
    {
      id: "jigAssembly",
      type: "process",
      position: { x: X_JIG_ASSEMBLY, y: ROW4_Y },
      data: { label: l.jigAssembly, subLabel: l.jigAssemblySub },
    },
    {
      id: "testPrep",
      type: "process",
      position: { x: X_TEST_PREP, y: ROW4_Y },
      data: { label: l.testPrep, subLabel: l.testPrepSub },
    },
    {
      id: "testExecution",
      type: "process",
      position: { x: X_TEST_EXECUTION, y: ROW4_Y },
      data: { label: l.testExecution, subLabel: l.testExecutionSub },
    },
    {
      id: "statusCheck",
      type: "decision",
      position: { x: X_STATUS_CHECK, y: ROW4_Y },
      data: { label: l.statusCheck, subLabel: l.statusCheckSub },
    },
    {
      id: "reportComplete",
      type: "process",
      position: { x: X_REPORT_COMPLETE, y: ROW4_Y },
      data: { label: l.reportComplete, subLabel: l.reportCompleteSub },
    },
    {
      id: "customerProposal",
      type: "process",
      position: { x: X_CUSTOMER_PROPOSAL, y: ROW4_Y },
      data: { label: l.customerProposal, subLabel: l.customerProposalSub },
    },
  ];
}

function buildEdges(lang: Language): (Edge | SmoothStepEdgeProps)[] {
  const l = labels[lang];

  return [
    // ── Row 1: left → right ───────────────────────────────────────
    {
      id: "e-customer-concept",
      source: "customer",
      target: "concept",
      sourceHandle: "source-right",
      targetHandle: "target-left",
      style: normalEdgeStyle,
      markerEnd: normalMarker,
      animated: true,
    },
    {
      id: "e-concept-dr",
      source: "concept",
      target: "dr",
      sourceHandle: "source-right",
      targetHandle: "target-left",
      style: normalEdgeStyle,
      animated: true,
    },
    {
      id: "e-dr-development",
      source: "dr",
      target: "development",
      sourceHandle: "source-right",
      targetHandle: "target-left",
      style: normalEdgeStyle,
      markerEnd: normalMarker,
      animated: true,
    },
    {
      id: "e-development-review",
      source: "development",
      target: "review",
      sourceHandle: "source-right",
      targetHandle: "target-left",
      style: normalEdgeStyle,
      animated: true,
    },
    {
      id: "e-review-po",
      source: "review",
      target: "po",
      sourceHandle: "source-right",
      targetHandle: "target-left",
      style: normalEdgeStyle,
      markerEnd: normalMarker,
      animated: true,
    },

    // ── Vertical: PO → Inspection (via supplier side) ─────────────
    {
      id: "e-po-inspection",
      source: "po",
      target: "inspection",
      type: "smoothstep",
      sourceHandle: "source-bottom",
      targetHandle: "target-top",
      style: normalEdgeStyle,
      animated: true,
    },

    // ── Vertical: Inspection → Manufacturing ─────────────────────
    {
      id: "e-inspection-manufacturing",
      source: "inspection",
      target: "manufacturing",
      type: "smoothstep",
      sourceHandle: "source-bottom",
      targetHandle: "target-top",
      style: normalEdgeStyle,
      markerEnd: normalMarker,
      animated: true,
    },

    // ── Row 3: right → left ───────────────────────────────────────
    {
      id: "e-manufacturing-fqc",
      source: "manufacturing",
      target: "fqc",
      sourceHandle: "source-left",
      targetHandle: "target-right",
      style: normalEdgeStyle,
      animated: true,
    },
    {
      id: "e-fqc-packaging",
      source: "fqc",
      target: "packaging",
      sourceHandle: "source-left",
      targetHandle: "target-right",
      style: normalEdgeStyle,
      markerEnd: normalMarker,
      animated: true,
    },
    {
      id: "e-packaging-delivery",
      source: "packaging",
      target: "delivery",
      sourceHandle: "source-left",
      targetHandle: "target-right",
      style: normalEdgeStyle,
      markerEnd: normalMarker,
      animated: true,
    },
    {
      id: "e-delivery-feedback",
      source: "delivery",
      target: "feedback",
      sourceHandle: "source-left",
      targetHandle: "target-right",
      style: normalEdgeStyle,
      animated: true,
    },
    {
      id: "e-feedback-reorder",
      source: "feedback",
      target: "reorder",
      sourceHandle: "source-left",
      targetHandle: "target-right",
      style: normalEdgeStyle,
      markerEnd: normalMarker,
      animated: true,
    },

    // ── NG: D/R → Concept Design (arc above row 1) ───────────────
    {
      id: "ng-dr-concept",
      source: "dr",
      target: "concept",
      type: "smoothstep",
      pathOptions: {
        offset: 35,
      },
      sourceHandle: "source-top",
      targetHandle: "target-top",
      style: ngEdgeStyle,
      markerEnd: ngMarker,
      label: "NG",
      labelStyle: { fill: "#EF4444", fontWeight: 700, fontSize: 13 },
      labelBgStyle: { fill: "white" },
      data: { isNG: true },
      animated: true,
    },

    // ── NG: Review Approval → Development (arc above row 1) ──────
    {
      id: "ng-review-development",
      source: "review",
      target: "development",
      type: "smoothstep",
      pathOptions: {
        offset: 35,
      },
      sourceHandle: "source-top",
      targetHandle: "target-top",
      style: ngEdgeStyle,
      markerEnd: ngMarker,
      label: "NG",
      labelStyle: { fill: "#EF4444", fontWeight: 700, fontSize: 13 },
      labelBgStyle: { fill: "white" },
      data: { isNG: true },
      animated: true,
    },

    // ── NG: Inspection → Supplier ─────────────────────────────────
    {
      id: "ng-inspection-supplier",
      source: "inspection",
      target: "supplier",
      type: "bezier",
      sourceHandle: "source-left",
      targetHandle: "target-right",
      style: ngEdgeStyle,
      markerEnd: ngMarker,
      label: "NG",
      labelStyle: { fill: "#EF4444", fontWeight: 700, fontSize: 13 },
      labelBgStyle: { fill: "white" },
      data: { isNG: true },
      animated: true,
    },

    // ── NG: FQC & Shipping → Manufacturing (arc below row 3) ─────
    {
      id: "ng-fqc-manufacturing",
      source: "fqc",
      target: "manufacturing",
      type: "smoothstep",
      pathOptions: {
        offset: 35,
      },
      sourceHandle: "source-bottom",
      targetHandle: "target-bottom",
      style: ngEdgeStyle,
      markerEnd: ngMarker,
      label: "NG",
      labelStyle: { fill: "#EF4444", fontWeight: 700, fontSize: 13 },
      labelBgStyle: { fill: "white" },
      data: { isNG: true },
      animated: true,
    },

    // ── Cross-process: Manufacturing → Testing Center Prep ────────
    {
      id: "e-manufacturing-testPrep",
      source: "manufacturing",
      target: "testPrep",
      type: "smoothstep",
      pathOptions: {
        borderRadius: 14,
      },
      sourceHandle: "source-bottom",
      targetHandle: "target-top",
      style: feedbackEdgeStyle,
      markerEnd: feedbackMarker,
      label: l.testingFeedback,
      labelStyle: { fill: "#1E3A8A", fontWeight: 700, fontSize: 12 },
      labelBgStyle: {
        fill: "#EFF6FF",
        stroke: "#BFDBFE",
        strokeWidth: 1,
      },
      labelBgPadding: [8, 4],
      labelBgBorderRadius: 999,
      animated: true,
    },

    // ── Row 4: Testing & Verification Center (left → right) ──────
    {
      id: "e-sampleArrival-jigAssembly",
      source: "sampleArrival",
      target: "jigAssembly",
      sourceHandle: "source-right",
      targetHandle: "target-left",
      style: normalEdgeStyle,
      markerEnd: normalMarker,
      animated: true,
    },
    {
      id: "e-jigAssembly-testPrep",
      source: "jigAssembly",
      target: "testPrep",
      sourceHandle: "source-right",
      targetHandle: "target-left",
      style: normalEdgeStyle,
      markerEnd: normalMarker,
      animated: true,
    },
    {
      id: "e-testPrep-testExecution",
      source: "testPrep",
      target: "testExecution",
      sourceHandle: "source-right",
      targetHandle: "target-left",
      style: normalEdgeStyle,
      markerEnd: normalMarker,
      animated: true,
    },
    {
      id: "e-testExecution-statusCheck",
      source: "testExecution",
      target: "statusCheck",
      sourceHandle: "source-right",
      targetHandle: "target-left",
      style: normalEdgeStyle,
      animated: true,
    },
    {
      id: "ok-statusCheck-reportComplete",
      source: "statusCheck",
      target: "reportComplete",
      sourceHandle: "source-right",
      targetHandle: "target-left",
      style: okDashedEdgeStyle,
      markerEnd: okMarker,
      label: "OK",
      labelStyle: { fill: "#10B981", fontWeight: 700, fontSize: 12 },
      labelBgStyle: { fill: "white" },
      animated: true,
    },
    {
      id: "e-reportComplete-customerProposal",
      source: "reportComplete",
      target: "customerProposal",
      sourceHandle: "source-right",
      targetHandle: "target-left",
      style: normalEdgeStyle,
      markerEnd: normalMarker,
      animated: true,
    },

    // ── NG: Status Check → Testing Execution (arc below row 4) ────
    {
      id: "ng-statusCheck-testExecution",
      source: "statusCheck",
      target: "testExecution",
      type: "smoothstep",
      pathOptions: {
        offset: 35,
      },
      sourceHandle: "source-bottom",
      targetHandle: "target-bottom",
      style: ngDashedEdgeStyle,
      markerEnd: ngMarker,
      label: "NG",
      labelStyle: { fill: "#EF4444", fontWeight: 700, fontSize: 13 },
      labelBgStyle: { fill: "white" },
      data: { isNG: true },
      animated: true,
    },
  ];
}

function FitViewOnResize({
  containerRef,
}: {
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const { fitView } = useReactFlow();

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new ResizeObserver(() => {
      if (el.clientWidth > 0 && el.clientHeight > 0) {
        fitView({ padding: 0.12 });
      }
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, [containerRef, fitView]);

  return null;
}

export default function ReactFlowProcessDiagram({
  language = "ENG",
}: ReactFlowProcessDiagramProps) {
  const nodes = useMemo(() => buildNodes(language), [language]);
  const edges = useMemo(() => buildEdges(language), [language]);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="w-full">
      <div className="mb-2 flex items-center justify-center gap-1.5 text-xs font-medium text-slate-500 md:hidden">
        <span aria-hidden="true">←</span>
        <span>
          {language === "KOR"
            ? "좌우로 스크롤하여 전체 공정도를 확인하세요"
            : "Swipe horizontally to view the full process"}
        </span>
        <span aria-hidden="true">→</span>
      </div>

      <div className="w-full overflow-x-auto pb-2">
        <div
          ref={containerRef}
          className="process-flow-scrollable min-w-[900px] md:min-w-0 w-full h-[620px] md:h-[680px] lg:h-[820px] rounded-xl overflow-hidden bg-transparent"
        >
          <ReactFlow
            nodes={nodes}
            edges={edges as Edge[]}
            nodeTypes={nodeTypes}
            nodeOrigin={[0.5, 0.5]}
            minZoom={0.2}
            fitView
            fitViewOptions={{ padding: 0.12 }}
            nodesDraggable={false}
            nodesConnectable={false}
            elementsSelectable={true}
            panOnDrag={false}
            panOnScroll={false}
            zoomOnScroll={false}
            zoomOnPinch={false}
            zoomOnDoubleClick={false}
            preventScrolling={false}
            proOptions={{ hideAttribution: true }}
            style={{ background: "transparent" }}
          >
            <FitViewOnResize containerRef={containerRef} />
          </ReactFlow>
        </div>
      </div>
    </div>
  );
}
