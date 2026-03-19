import React from "react";
import { Handle, Position, type NodeProps } from "@xyflow/react";

export interface DecisionNodeData {
  label: string;
  [key: string]: unknown;
}

export function DecisionNode({ data }: NodeProps) {
  const label = (data as DecisionNodeData).label;

  return (
    <div
      style={{
        position: "relative",
        width: "110px",
        height: "110px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      {/* Outer diamond border */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "transparent",
          border: "2px solid #9CA3AF",
          transform: "rotate(45deg)",
          boxShadow: "0 2px 10px rgba(0,0,0,0.4)"
        }}
      />
      {/* Inner filled diamond */}
      <div
        style={{
          position: "absolute",
          inset: "8px",
          background: "linear-gradient(135deg, #374151, #1F2937)",
          transform: "rotate(45deg)"
        }}
      />
      {/* Text (not rotated) */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          textAlign: "center",
          fontSize: "12px",
          fontWeight: 700,
          color: "#FFFFFF",
          lineHeight: 1.3,
          whiteSpace: "pre-line",
          padding: "4px"
        }}
      >
        {label}
      </div>

      <Handle
        type="source"
        position={Position.Left}
        style={{ opacity: 0, left: 0 }}
        id={`source-left`}
      />
      <Handle
        type="source"
        position={Position.Right}
        style={{ opacity: 0, right: 0 }}
        id={`source-right`}
      />
      <Handle
        type="source"
        position={Position.Top}
        style={{ opacity: 0, top: 0 }}
        id={`source-top`}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        style={{ opacity: 0, bottom: 0 }}
        id={`source-bottom`}
      />
      <Handle
        type="target"
        position={Position.Left}
        style={{ opacity: 0, left: 0 }}
        id={`target-left`}
      />
      <Handle
        type="target"
        position={Position.Right}
        style={{ opacity: 0, right: 0 }}
        id={`target-right`}
      />
      <Handle
        type="target"
        position={Position.Top}
        style={{ opacity: 0, top: 0 }}
        id={`target-top`}
      />
    </div>
  );
}
