"use client";

import React, { useMemo } from "react";
import {
  ReactFlow,
  Background,
  type Node,
  type Edge,
  MarkerType,
  type NodeTypes,
  SmoothStepEdgeProps
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { ProcessNode } from "./flow/ProcessNode";
import { DecisionNode } from "./flow/DecisionNode";

type Language = "KOR" | "ENG";

interface ReactFlowProcessDiagramProps {
  readonly language?: Language;
}

const nodeTypes: NodeTypes = {
  process: ProcessNode,
  decision: DecisionNode
};

// ─── Layout constants ───────────────────────────────────────────────────────
const ROW1_Y = 0;
const ROW2_Y = 190;
const ROW3_Y = 380;

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

// ─── Edge shared styles ──────────────────────────────────────────────────────
const normalEdgeStyle = { stroke: "#9CA3AF", strokeWidth: 2 };
const ngEdgeStyle = { stroke: "#EF4444", strokeWidth: 2 };
const normalMarker = {
  type: MarkerType.ArrowClosed,
  color: "#9CA3AF",
  width: 14,
  height: 14
};
const ngMarker = {
  type: MarkerType.ArrowClosed,
  color: "#EF4444",
  width: 14,
  height: 14
};

// ─── Bilingual labels ────────────────────────────────────────────────────────
const labels = {
  ENG: {
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
    reorder: "Re-Order"
  },
  KOR: {
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
    reorder: "Re-Order\n개선/반영"
  }
} as const;

function buildNodes(lang: Language): Node[] {
  const l = labels[lang];

  return [
    // ── Row 1 ──────────────────────────────────────────────────────
    {
      id: "customer",
      type: "process",
      position: { x: X_CUSTOMER, y: ROW1_Y },
      data: { label: l.customer }
    },
    {
      id: "concept",
      type: "process",
      position: { x: X_CONCEPT, y: ROW1_Y },
      data: { label: l.concept }
    },
    {
      id: "dr",
      type: "decision",
      position: { x: X_DR, y: ROW1_Y },
      data: { label: l.dr }
    },
    {
      id: "development",
      type: "process",
      position: { x: X_DEV, y: ROW1_Y },
      data: { label: l.development }
    },
    {
      id: "review",
      type: "decision",
      position: { x: X_REVIEW, y: ROW1_Y },
      data: { label: l.review }
    },
    {
      id: "po",
      type: "process",
      position: { x: X_PO, y: ROW1_Y },
      data: { label: l.po }
    },

    // ── Row 2 ──────────────────────────────────────────────────────
    {
      id: "supplier",
      type: "process",
      position: { x: X_SUPPLIER, y: ROW2_Y },
      data: { label: l.supplier }
    },
    {
      id: "inspection",
      type: "decision",
      position: { x: X_INSPECTION, y: ROW2_Y },
      data: { label: l.inspection }
    },

    // ── Row 3 ──────────────────────────────────────────────────────
    {
      id: "manufacturing",
      type: "process",
      position: { x: X_MANUFACTURING, y: ROW3_Y },
      data: { label: l.manufacturing }
    },
    {
      id: "fqc",
      type: "decision",
      position: { x: X_FQC, y: ROW3_Y },
      data: { label: l.fqc }
    },
    {
      id: "packaging",
      type: "process",
      position: { x: X_PACKAGING, y: ROW3_Y },
      data: { label: l.packaging }
    },
    {
      id: "delivery",
      type: "process",
      position: { x: X_DELIVERY, y: ROW3_Y },
      data: { label: l.delivery }
    },
    {
      id: "feedback",
      type: "decision",
      position: { x: X_FEEDBACK, y: ROW3_Y },
      data: { label: l.feedback }
    },
    {
      id: "reorder",
      type: "process",
      position: { x: X_REORDER, y: ROW3_Y },
      data: { label: l.reorder }
    }
  ];
}

function buildEdges(): (Edge | SmoothStepEdgeProps)[] {
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
      animated: true
    },
    {
      id: "e-concept-dr",
      source: "concept",
      target: "dr",
      sourceHandle: "source-right",
      targetHandle: "target-left",
      style: normalEdgeStyle,
      animated: true
    },
    {
      id: "e-dr-development",
      source: "dr",
      target: "development",
      sourceHandle: "source-right",
      targetHandle: "target-left",
      style: normalEdgeStyle,
      markerEnd: normalMarker,
      animated: true
    },
    {
      id: "e-development-review",
      source: "development",
      target: "review",
      sourceHandle: "source-right",
      targetHandle: "target-left",
      style: normalEdgeStyle,
      animated: true
    },
    {
      id: "e-review-po",
      source: "review",
      target: "po",
      sourceHandle: "source-right",
      targetHandle: "target-left",
      style: normalEdgeStyle,
      markerEnd: normalMarker,
      animated: true
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
      animated: true
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
      animated: true
    },

    // ── Row 3: right → left ───────────────────────────────────────
    {
      id: "e-manufacturing-fqc",
      source: "manufacturing",
      target: "fqc",
      sourceHandle: "source-left",
      targetHandle: "target-right",
      style: normalEdgeStyle,
      animated: true
    },
    {
      id: "e-fqc-packaging",
      source: "fqc",
      target: "packaging",
      sourceHandle: "source-left",
      targetHandle: "target-right",
      style: normalEdgeStyle,
      markerEnd: normalMarker,
      animated: true
    },
    {
      id: "e-packaging-delivery",
      source: "packaging",
      target: "delivery",
      sourceHandle: "source-left",
      targetHandle: "target-right",
      style: normalEdgeStyle,
      markerEnd: normalMarker,
      animated: true
    },
    {
      id: "e-delivery-feedback",
      source: "delivery",
      target: "feedback",
      sourceHandle: "source-left",
      targetHandle: "target-right",
      style: normalEdgeStyle,
      animated: true
    },
    {
      id: "e-feedback-reorder",
      source: "feedback",
      target: "reorder",
      sourceHandle: "source-left",
      targetHandle: "target-right",
      style: normalEdgeStyle,
      markerEnd: normalMarker,
      animated: true
    },

    // ── NG: D/R → Concept Design (arc above row 1) ───────────────
    {
      id: "ng-dr-concept",
      source: "dr",
      target: "concept",
      type: "smoothstep",
      pathOptions: {
        offset: 35
      },
      sourceHandle: "source-top",
      targetHandle: "target-top",
      style: ngEdgeStyle,
      markerEnd: ngMarker,
      label: "NG",
      labelStyle: { fill: "#EF4444", fontWeight: 700, fontSize: 13 },
      labelBgStyle: { fill: "white" },
      data: { isNG: true },
      animated: true
    },

    // ── NG: Review Approval → Development (arc above row 1) ──────
    {
      id: "ng-review-development",
      source: "review",
      target: "development",
      type: "smoothstep",
      pathOptions: {
        offset: 35
      },
      sourceHandle: "source-top",
      targetHandle: "target-top",
      style: ngEdgeStyle,
      markerEnd: ngMarker,
      label: "NG",
      labelStyle: { fill: "#EF4444", fontWeight: 700, fontSize: 13 },
      labelBgStyle: { fill: "white" },
      data: { isNG: true },
      animated: true
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
      animated: true
    },

    // ── NG: FQC & Shipping → Manufacturing (arc below row 3) ─────
    {
      id: "ng-fqc-manufacturing",
      source: "fqc",
      target: "manufacturing",
      type: "smoothstep",
      pathOptions: {
        offset: 35
      },
      sourceHandle: "source-bottom",
      targetHandle: "target-bottom",
      style: ngEdgeStyle,
      markerEnd: ngMarker,
      label: "NG",
      labelStyle: { fill: "#EF4444", fontWeight: 700, fontSize: 13 },
      labelBgStyle: { fill: "white" },
      data: { isNG: true },
      animated: true
    }
  ];
}

export default function ReactFlowProcessDiagram({
  language = "ENG"
}: ReactFlowProcessDiagramProps) {
  const nodes = useMemo(() => buildNodes(language), [language]);
  const edges = useMemo(() => buildEdges(), []);

  return (
    <div
      style={{
        width: "100%",
        height: "560px",
        background: "transparent",
        borderRadius: "12px",
        overflow: "hidden"
      }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges as Edge[]}
        nodeTypes={nodeTypes}
        nodeOrigin={[0.5, 0.5]}
        fitView
        fitViewOptions={{ padding: 0.15 }}
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
      />
    </div>
  );
}
