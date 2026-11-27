import React from "react";
import { type NodeProps } from "@xyflow/react";

export interface SectionFrameNodeData {
  title: string;
  width: number;
  height: number;
  [key: string]: unknown;
}

export function SectionFrameNode({ data }: NodeProps) {
  const { title, width, height } = data as SectionFrameNodeData;

  return (
    <div
      className="section-frame-node"
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      <div className="section-frame-badge">{title}</div>
    </div>
  );
}

export interface SectionPillNodeData {
  title: string;
  [key: string]: unknown;
}

export function SectionPillNode({ data }: NodeProps) {
  const { title } = data as SectionPillNodeData;

  return <div className="section-pill-node">{title}</div>;
}
