import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion, cubicBezier, type Variants } from 'framer-motion';

// Types
interface Node {
  id: string;
  label: string;
  type: 'step' | 'decision';
  col: number; // Column position (1-10 for horizontal flow)
  row: number; // Row position (1 for top lane, 3 for main lane)
  stepNumber?: number; // For main flow step numbering
}
interface ProcessFlowProps {
  className?: string;
}

interface Edge {
  from: string;
  to: string;
  kind?: 'main' | 'branch' | 'return';
  ng?: boolean;
}

interface NodePosition {
  x: number;
  y: number;
  width: number;
  height: number;
}

const nodes: Node[] = [
  { id: 'customer', label: 'Customer', type: 'step', col: 1, row: 1 },
  { id: 'partner', label: '협력사', type: 'step', col: 6, row: 1 },
  { id: 'reorder', label: 'Re-Order 개선/반영', type: 'step', col: 9, row: 1 },
  { id: 'feedback', label: '고객 Feedback', type: 'decision', col: 10, row: 1 },
  { id: 'concept', label: 'Concept 설계', type: 'step', col: 1, row: 3 },
  { id: 'dr', label: 'D/R', type: 'decision', col: 2, row: 3 },
  { id: 'dev_design', label: '개발/가공 설계', type: 'step', col: 3, row: 3 },
  { id: 'review', label: '검토승인', type: 'decision', col: 4, row: 3 },
  { id: 'order', label: '발주(소재/부품)', type: 'step', col: 5, row: 3 },
  { id: 'inspection', label: '수입검사', type: 'decision', col: 6, row: 3 },
  { id: 'manufacturing', label: '가공/제작', type: 'step', col: 7, row: 3 },
  { id: 'final_check', label: '출하 및 조립/측정검사', type: 'decision', col: 8, row: 3 },
  { id: 'packaging', label: '포장', type: 'step', col: 9, row: 3 },
  { id: 'delivery', label: '고객사 납품', type: 'step', col: 10, row: 3 },
];
const edges: Edge[] = [
  // top lane / context
  { from: 'customer', to: 'concept', kind: 'main' },
  { from: 'feedback', to: 'reorder', kind: 'main' },
  { from: 'reorder', to: 'concept', kind: 'return' },

  // main flow (horizontal)
  { from: 'concept', to: 'dr', kind: 'main' },
  { from: 'dr', to: 'dev_design', kind: 'main' },
  { from: 'dev_design', to: 'review', kind: 'main' },
  { from: 'review', to: 'order', kind: 'main' },
  { from: 'order', to: 'inspection', kind: 'main' },
  { from: 'inspection', to: 'manufacturing', kind: 'main' },
  { from: 'manufacturing', to: 'final_check', kind: 'main' },
  { from: 'final_check', to: 'packaging', kind: 'main' },
  { from: 'packaging', to: 'delivery', kind: 'main' },

  // NG / branch examples (keep visuals the same)
  { from: 'inspection', to: 'partner', kind: 'branch', ng: true },
  { from: 'manufacturing', to: 'manufacturing', kind: 'return', ng: true },
  { from: 'concept', to: 'concept', kind: 'return', ng: true },
];

// --- Card Components (no step number badge) ---
const ProcessCard: React.FC<{ node: Node; className?: string }> = ({ node, className = '' }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  return (
    <motion.div
      role="group"
      aria-label={`Process step: ${node.label}`}
      className={`
        relative bg-gradient-to-br from-[#E8F1F4] to-[#FFFFFF] text-[#1F2937]
        rounded-2xl px-6 py-4 shadow-md border border-[#D1D5DB]
        hover:scale-105 hover:brightness-105 hover:shadow-lg transition-all duration-300 cursor-pointer
        min-w-[140px] min-h-[60px]
        focus:outline-none focus:ring-2 focus:ring-blue-300
        ${className}
      `}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05, filter: 'brightness(1.08)' }}
      whileFocus={{ scale: 1.05, filter: 'brightness(1.08)' }}
      onClick={() => setShowTooltip(!showTooltip)}
      tabIndex={0}
    >
      <div className="text-center font-bold text-sm leading-tight">{node.label}</div>
      {showTooltip && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 
                     bg-gray-900 text-white text-xs px-3 py-2 rounded-lg shadow-lg z-20
                     max-w-[200px] text-center"
        >
          Process step: {node.label}
          <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
        </motion.div>
      )}
    </motion.div>
  );
};
const NGLabel: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <g transform={`translate(${x}, ${y})`}>
    <rect x={-12} y={-10} width={24} height={16} rx={3} fill="#EF4444" />
    <text
      x={0}
      y={0}
      fill="#FFFFFF"
      fontSize="11"
      fontWeight="bold"
      textAnchor="middle"
      dominantBaseline="middle"
    >
      NG
    </text>
  </g>
);

const DecisionDiamond: React.FC<{ node: Node; className?: string }> = ({ node, className = '' }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  return (
    <motion.div
      role="group"
      aria-label={`Decision point: ${node.label}`}
      className={`relative cursor-pointer ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        filter: 'brightness(1.1) drop-shadow(0 0 6px #6F78B5)',
        scale: 1.05,
      }}
      whileFocus={{
        filter: 'brightness(1.1) drop-shadow(0 0 6px #6F78B5)',
        scale: 1.05,
      }}
      tabIndex={0}
      onClick={() => setShowTooltip(!showTooltip)}
    >
      <div className="w-28 h-28 bg-gradient-to-br from-[#6F78B5] to-[#8B90C9] transform rotate-45 shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="absolute inset-0 flex items-center justify-center transform -rotate-45">
          <div className="text-white text-center font-bold text-sm leading-tight px-2">{node.label}</div>
        </div>
      </div>
      {showTooltip && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full mt-4 left-1/2 transform -translate-x-1/2 
                     bg-gray-900 text-white text-xs px-3 py-2 rounded-lg shadow-lg z-20
                     max-w-[200px] text-center"
        >
          Decision point: {node.label}
          <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
        </motion.div>
      )}
    </motion.div>
  );
};

// --- Main ProcessFlow Component ---
const ProcessFlow: React.FC<ProcessFlowProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [nodePositions, setNodePositions] = useState<{ [key: string]: NodePosition }>({});
  const [isMobile, setIsMobile] = useState(false);
  const [svgDimensions, setSvgDimensions] = useState({ width: 0, height: 0 });

  // Responsive check
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Calculate node positions for arrow paths
  useLayoutEffect(() => {
    if (!containerRef.current) return;
    const positions: { [key: string]: NodePosition } = {};
    const containerRect = containerRef.current.getBoundingClientRect();
    let maxX = 0,
      maxY = 0;
    Object.entries(nodeRefs.current).forEach(([nodeId, ref]) => {
      if (ref) {
        const rect = ref.getBoundingClientRect();
        const x = rect.left - containerRect.left + rect.width / 2;
        const y = rect.top - containerRect.top + rect.height / 2;
        positions[nodeId] = { x, y, width: rect.width, height: rect.height };
        maxX = Math.max(maxX, x + rect.width / 2);
        maxY = Math.max(maxY, y + rect.height / 2);
      }
    });
    setNodePositions(positions);
    setSvgDimensions({
      width: Math.max(maxX + 60, isMobile ? 900 : 1200),
      height: Math.max(maxY + 60, isMobile ? 220 : 400),
    });
  }, [isMobile, nodes.length]);

  // --- Arrow animation variants ---
  const arrowVariants: Variants = {
    initial: { pathLength: 0 },
    animate: {
      pathLength: 1,
      transition: { duration: 1.1, ease: cubicBezier(0.42, 0, 0.58, 1) },
    },
  };

  const ngVariants: Variants = {
    initial: { pathLength: 0 },
    animate: {
      pathLength: 1,
      transition: {
        duration: 1.2,
        ease: [0.42, 0, 0.58, 1] as const,
        repeat: 1,
        repeatType: 'reverse' as const,
      },
    },
  };

  // --- Arrow path generation ---
  const generatePath = (edge: Edge): string => {
    const fromPos = nodePositions[edge.from];
    const toPos = nodePositions[edge.to];
    if (!fromPos || !toPos) return '';
    const { x: x1, y: y1 } = fromPos;
    const { x: x2, y: y2 } = toPos;
    if (edge.kind === 'return') {
      // NG curved return
      const curveX = Math.min(x1, x2) - 80;
      const midY = (y1 + y2) / 2 + (y1 < y2 ? -60 : 60);
      return `M ${x1} ${y1} Q ${curveX} ${midY} ${x2} ${y2}`;
    } else if (edge.kind === 'branch') {
      // Horizontal branch
      return `M ${x1} ${y1} L ${x2} ${y2}`;
    } else {
      // Main flow: straight horizontal
      return `M ${x1} ${y1} L ${x2} ${y2}`;
    }
  };

  // --- NG label positioning ---
  const getPathMidpoint = (edge: Edge): { x: number; y: number } => {
    const fromPos = nodePositions[edge.from];
    const toPos = nodePositions[edge.to];
    if (!fromPos || !toPos) return { x: 0, y: 0 };
    const { x: x1, y: y1 } = fromPos;
    const { x: x2, y: y2 } = toPos;
    if (edge.kind === 'return') {
      const curveX = Math.min(x1, x2) - 80;
      const midY = (y1 + y2) / 2 + (y1 < y2 ? -60 : 60);
      return { x: curveX + 20, y: midY };
    }
    return { x: (x1 + x2) / 2, y: (y1 + y2) / 2 };
  };

  // --- Layout ---
  return (
    <div className={`w-full ${className}`}>
      <div className={isMobile ? 'overflow-x-auto' : 'flex justify-center'}>
        <div
          ref={containerRef}
          className="relative"
          style={{
            minWidth: isMobile ? `${svgDimensions.width}px` : 'auto',
            minHeight: `${svgDimensions.height}px`,
            marginLeft: isMobile ? 0 : 'auto',
            marginRight: isMobile ? 0 : 'auto',
            paddingLeft: isMobile ? 16 : 0,
            paddingRight: isMobile ? 16 : 0,
          }}
        >
          {/* Grid Layout */}
          <div
            className={`
              grid gap-6 py-8
              ${
                isMobile
                  ? 'grid-cols-14 grid-rows-2'
                  : 'grid-cols-10 grid-rows-3 w-full place-items-center'
              }
            `}
            style={{
              minWidth: isMobile ? `${svgDimensions.width}px` : 'auto',
              gridTemplateColumns: isMobile ? 'repeat(14, minmax(140px, 1fr))' : 'repeat(10, 1fr)',
              gridTemplateRows: isMobile ? 'repeat(2, 120px)' : 'auto 50px auto',
              marginLeft: isMobile ? 0 : 'auto',
              marginRight: isMobile ? 0 : 'auto',
            }}
          >
            {nodes.map((node) => {
              const gridCol = isMobile ? node.col : node.col;
              const gridRow = isMobile ? (node.row === 1 ? 1 : 2) : node.row;
              return (
                <div
                  key={node.id}
                  ref={(el) => {
                    nodeRefs.current[node.id] = el;
                  }}
                  style={{
                    gridColumn: gridCol,
                    gridRow: gridRow,
                  }}
                  className={`
                    flex justify-center items-center w-full
                    ${isMobile ? 'mb-0' : ''}
                  `}
                >
                  {node.type === 'step' ? <ProcessCard node={node} /> : <DecisionDiamond node={node} />}
                </div>
              );
            })}
          </div>

          {/* SVG Overlay for Connections */}
          <svg
            className="absolute inset-0 pointer-events-none"
            style={{ zIndex: 1 }}
            width={svgDimensions.width}
            height={svgDimensions.height}
          >
            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#9CA3AF" />
              </marker>
              <marker id="arrowhead-ng" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#EF4444" />
              </marker>
            </defs>
            {edges.map((edge: Edge, index: number) => {
              const path = generatePath(edge);
              const midpoint = getPathMidpoint(edge);
              const isNGPath = edge.ng;
              return (
                <g key={`${edge.from}-${edge.to}-${index}`}>
                  <motion.path
                    d={path}
                    stroke={isNGPath ? '#EF4444' : '#9CA3AF'}
                    strokeWidth={isNGPath ? 3 : 2.5}
                    strokeDasharray={isNGPath ? '8,4' : undefined}
                    fill="none"
                    markerEnd={isNGPath ? 'url(#arrowhead-ng)' : 'url(#arrowhead)'}
                    aria-label={`Connection from ${edge.from} to ${edge.to}${isNGPath ? ' (NG path)' : ''}`}
                    className="drop-shadow-sm"
                    variants={isNGPath ? ngVariants : arrowVariants}
                    initial="initial"
                    animate="animate"
                  />
                  {edge.ng && (
                    <g>
                      <NGLabel x={midpoint.x} y={midpoint.y} />
                      <text
                        x={midpoint.x}
                        y={midpoint.y + 25}
                        fill="#EF4444"
                        fontSize="11"
                        fontWeight="bold"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="drop-shadow-sm"
                      >
                        ↶ Return
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ProcessFlow;
