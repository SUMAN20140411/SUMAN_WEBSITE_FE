import React from "react";
import { Handle, Position, type NodeProps } from "@xyflow/react";

export interface ProcessNodeData {
  label: string;
  [key: string]: unknown;
}

export function ProcessNode({ data }: NodeProps) {
  const label = (data as ProcessNodeData).label;

  return (
    <div className="process-node">
      <Handle
        type="target"
        position={Position.Left}
        style={{ opacity: 0 }}
        id={"target-left"}
      />
      <Handle
        type="target"
        position={Position.Right}
        style={{ opacity: 0 }}
        id={"target-right"}
      />
      <Handle
        type="target"
        position={Position.Top}
        style={{ opacity: 0 }}
        id={"target-top"}
      />
      <Handle
        type="target"
        position={Position.Bottom}
        style={{ opacity: 0 }}
        id={"target-bottom"}
      />
      {label}
      <Handle
        type="source"
        position={Position.Left}
        style={{ opacity: 0 }}
        id={"source-left"}
      />
      <Handle
        type="source"
        position={Position.Right}
        style={{ opacity: 0 }}
        id={"source-right"}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        style={{ opacity: 0 }}
        id={"source-bottom"}
      />
    </div>
  );
}
