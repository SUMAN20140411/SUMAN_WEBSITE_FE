import React from "react";
import { Handle, Position, type NodeProps } from "@xyflow/react";

export interface DecisionNodeData {
  label: string;
  [key: string]: unknown;
}

export function DecisionNode({ data }: NodeProps) {
  const label = (data as DecisionNodeData).label;

  return (
    <div className="decision-node">
      {/* Outer diamond border */}
      <div className="decision-node-outer" />
      {/* Inner filled diamond */}
      <div className="decision-node-inner" />
      {/* Text (not rotated) */}
      <div className="decision-node-label">{label}</div>

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
