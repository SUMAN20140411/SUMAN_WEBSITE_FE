import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

// Types
interface Node {
  id: string;
  label: string;
  type: 'step' | 'decision';
  col: number; // Column position (1-10 for horizontal flow)
  row: number; // Row position (1 for top lane, 3 for main lane)
  stepNumber?: number; // For main flow step numbering
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

// Node data - horizontal layout from left to right
const nodes: Node[] = [
  // Top lane nodes (supporting processes)
  { id: 'customer', label: 'Customer', type: 'step', col: 1, row: 1 },
  { id: 'partner', label: '협력사', type: 'step', col: 6, row: 1 },
  { id: 'reorder', label: 'Re-Order 개선/반영', type: 'step', col: 9, row: 1 },
  { id: 'feedback', label: '고객 Feedback', type: 'decision', col: 10, row: 1 },
  
  // Main lane nodes with step numbers - horizontal flow
  { id: 'concept', label: 'Concept 설계', type: 'step', col: 1, row: 3, stepNumber: 1 },
  { id: 'dr', label: 'D/R', type: 'decision', col: 2, row: 3, stepNumber: 2 },
  { id: 'dev_design', label: '개발/가공 설계', type: 'step', col: 3, row: 3, stepNumber: 3 },
  { id: 'review', label: '검토승인', type: 'decision', col: 4, row: 3, stepNumber: 4 },
  { id: 'order', label: '발주(소재/부품)', type: 'step', col: 5, row: 3, stepNumber: 5 },
  { id: 'inspection', label: '수입검사', type: 'decision', col: 6, row: 3, stepNumber: 6 },
  { id: 'manufacturing', label: '가공/제작', type: 'step', col: 7, row: 3, stepNumber: 7 },
  { id: 'final_check', label: '출하 및 조립/측정검사', type: 'decision', col: 8, row: 3, stepNumber: 8 },
  { id: 'packaging', label: '포장', type: 'step', col: 9, row: 3, stepNumber: 9 },
  { id: 'delivery', label: '고객사 납품', type: 'step', col: 10, row: 3, stepNumber: 10 },
];

// Edge data - connections between nodes
const edges: Edge[] = [
  // Main flow
  { from: 'customer', to: 'concept', kind: 'main' },
  { from: 'concept', to: 'dr', kind: 'main' },
  { from: 'dr', to: 'dev_design', kind: 'main' },
  { from: 'dev_design', to: 'review', kind: 'main' },
  { from: 'review', to: 'order', kind: 'main' },
  { from: 'order', to: 'inspection', kind: 'main' },
  { from: 'inspection', to: 'manufacturing', kind: 'main' },
  { from: 'manufacturing', to: 'final_check', kind: 'main' },
  { from: 'final_check', to: 'packaging', kind: 'main' },
  { from: 'packaging', to: 'delivery', kind: 'main' },
  
  // Branch flows
  { from: 'inspection', to: 'partner', kind: 'branch', ng: true },
  
  // Return flows with NG - detailed return paths
  { from: 'dr', to: 'concept', kind: 'return', ng: true },
  { from: 'review', to: 'dev_design', kind: 'return', ng: true },
  { from: 'final_check', to: 'manufacturing', kind: 'return', ng: true },
  
  // Feedback loop
  { from: 'feedback', to: 'reorder', kind: 'main' },
  { from: 'reorder', to: 'concept', kind: 'return' },
];

// Process Card Component
const ProcessCard: React.FC<{ node: Node; className?: string }> = ({ node, className = '' }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  
  return (
    <motion.div
      role="group"
      aria-label={`Process step: ${node.label}`}
      className={`
        relative bg-gradient-to-br from-[#E8F1F4] to-[#FFFFFF] text-[#1F2937] 
        rounded-2xl px-6 py-4 shadow-md border border-[#D1D5DB]
        hover:scale-105 hover:shadow-lg transition-all duration-300 cursor-pointer
        min-w-[140px] min-h-[60px]
        ${className}
      `}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05 }}
      onClick={() => setShowTooltip(!showTooltip)}
    >
      {/* Step Number Badge */}
      {node.stepNumber && (
        <div className="absolute -top-3 -left-3 w-7 h-7 bg-[#4F46E5] text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg border-2 border-white">
          {node.stepNumber}
        </div>
      )}
      <div className="text-center font-bold text-sm leading-tight">
        {node.label}
      </div>
      
      {/* Tooltip */}
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

// Decision Diamond Component
const DecisionDiamond: React.FC<{ node: Node; className?: string }> = ({ node, className = '' }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  
  return (
    <motion.div
      role="group"
      aria-label={`Decision point: ${node.label}`}
      className={`relative cursor-pointer ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ 
        filter: 'brightness(1.1) drop-shadow(0 0 6px #6F78B5)',
        scale: 1.05 
      }}
      onClick={() => setShowTooltip(!showTooltip)}
    >
      {/* Step Number Badge */}
      {node.stepNumber && (
        <div className="absolute -top-3 -left-3 w-7 h-7 bg-[#4F46E5] text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg border-2 border-white z-10">
          {node.stepNumber}
        </div>
      )}
      {/* Rotated diamond container */}
      <div className="w-28 h-28 bg-gradient-to-br from-[#6F78B5] to-[#8B90C9] transform rotate-45 shadow-lg hover:shadow-xl transition-all duration-300">
        {/* Counter-rotated content */}
        <div className="absolute inset-0 flex items-center justify-center transform -rotate-45">
          <div className="text-white text-center font-bold text-sm leading-tight px-2">
            {node.label}
          </div>
        </div>
      </div>
      
      {/* Tooltip */}
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

// NG Label Component
const NGLabel: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <g>
    {/* Background circle for better visibility */}
    <circle
      cx={x}
      cy={y}
      r="12"
      fill="white"
      stroke="#EF4444"
      strokeWidth="2"
    />
    <text
      x={x}
      y={y}
      fill="#EF4444"
      fontSize="11"
      fontWeight="bold"
      textAnchor="middle"
      dominantBaseline="middle"
    >
      NG
    </text>
  </g>
);

// Main ProcessFlow Component
interface ProcessFlowProps {
  className?: string;
}

const ProcessFlow: React.FC<ProcessFlowProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [nodePositions, setNodePositions] = useState<{ [key: string]: NodePosition }>({});
  const [isMobile, setIsMobile] = useState(false);
  const [svgDimensions, setSvgDimensions] = useState({ width: 0, height: 0 });

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Calculate node positions for horizontal layout
  useLayoutEffect(() => {
    if (!containerRef.current || !gridRef.current) return;

    const positions: { [key: string]: NodePosition } = {};
    const containerRect = containerRef.current.getBoundingClientRect();
    
    // Calculate SVG dimensions
    let maxX = 0;
    let maxY = 0;
    
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
      width: Math.max(maxX + 100, isMobile ? 400 : 1800), 
      height: Math.max(maxY + 100, isMobile ? 800 : 400) 
    });
  }, [isMobile]);

  // Generate SVG path for edge - horizontal flow arrows
  const generatePath = (edge: Edge): string => {
    const fromPos = nodePositions[edge.from];
    const toPos = nodePositions[edge.to];
    
    if (!fromPos || !toPos) return '';

    const { x: x1, y: y1 } = fromPos;
    const { x: x2, y: y2 } = toPos;

    if (edge.kind === 'return') {
      // Return flows - curved arc above or below the main flow
      const isAbove = y1 < y2;
      const arcHeight = isAbove ? -80 : 80;
      const midX = (x1 + x2) / 2;
      const controlY = Math.min(y1, y2) + arcHeight;
      
      return `M ${x1} ${y1} Q ${midX} ${controlY} ${x2} ${y2}`;
    } else if (edge.kind === 'branch') {
      // Branch flows - vertical connections between rows
      if (Math.abs(x1 - x2) < 20) {
        // Same column - direct vertical
        return `M ${x1} ${y1} L ${x2} ${y2}`;
      } else {
        // Different columns - L-shaped path
        return `M ${x1} ${y1} L ${x1} ${y2} L ${x2} ${y2}`;
      }
    } else {
      // Main flow - horizontal arrows
      if (Math.abs(y1 - y2) < 20) {
        // Same row - direct horizontal
        return `M ${x1} ${y1} L ${x2} ${y2}`;
      } else {
        // Different rows - L-shaped path
        return `M ${x1} ${y1} L ${x2} ${y1} L ${x2} ${y2}`;
      }
    }
  };

  // Get path midpoint for NG label positioning
  const getPathMidpoint = (edge: Edge): { x: number; y: number } => {
    const fromPos = nodePositions[edge.from];
    const toPos = nodePositions[edge.to];
    
    if (!fromPos || !toPos) return { x: 0, y: 0 };

    const { x: x1, y: y1 } = fromPos;
    const { x: x2, y: y2 } = toPos;

    if (edge.kind === 'return') {
      // Position label at the curved arc
      const midX = (x1 + x2) / 2;
      const isAbove = y1 < y2;
      const arcHeight = isAbove ? -80 : 80;
      const controlY = Math.min(y1, y2) + arcHeight;
      return { x: midX, y: controlY }; // At the curve peak
    } else if (edge.kind === 'branch') {
      // Position at corner or midpoint
      if (Math.abs(x1 - x2) < 20) {
        return { x: x1 + 15, y: (y1 + y2) / 2 };
      } else {
        return { x: x1, y: (y1 + y2) / 2 };
      }
    } else {
      // Midpoint for straight paths
      if (Math.abs(y1 - y2) < 20) {
        return { x: (x1 + x2) / 2, y: y1 - 15 }; // Offset for horizontal lines
      } else {
        return { x: x2 - 15, y: y1 + 15 }; // Corner position for L-shaped
      }
    }
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Horizontal scroll wrapper for desktop */}
      <div className={isMobile ? '' : 'overflow-x-auto'}>
        <div 
          ref={containerRef}
          className="relative"
          style={{ 
            minWidth: isMobile ? 'auto' : `${svgDimensions.width}px`,
            minHeight: `${svgDimensions.height}px`
          }}
        >
          {/* Grid Layout */}
          <div 
            ref={gridRef}
            className={`
              grid gap-6 p-8
              ${isMobile 
                ? 'grid-cols-1 max-w-md mx-auto' 
                : 'grid-cols-10 grid-rows-3 w-full place-items-center'
              }
            `}
            style={{ 
              minWidth: isMobile ? 'auto' : `${svgDimensions.width - 200}px`,
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(10, 1fr)',
              gridTemplateRows: isMobile ? 'auto' : 'auto 50px auto'
            }}
          >
            {nodes.map((node) => {
              const gridArea = isMobile
                ? `${node.stepNumber || node.row} / 1`
                : `${node.row} / ${node.col}`;
              
              return (
                <div
                  key={node.id}
                  ref={(el) => { nodeRefs.current[node.id] = el; }}
                  style={{ gridArea }}
                  className={`
                    flex justify-center items-center w-full
                    ${isMobile ? 'mb-6' : ''}
                  `}
                >
                  {node.type === 'step' ? (
                    <ProcessCard node={node} />
                  ) : (
                    <DecisionDiamond node={node} />
                  )}
                </div>
              );
            })}
          </div>

          {/* SVG Overlay for Connections */}
          <svg
            className="absolute inset-0 pointer-events-none"
            style={{ zIndex: -1 }}
            width={svgDimensions.width}
            height={svgDimensions.height}
          >
            <defs>
              <marker
                id="arrowhead"
                markerWidth="10"
                markerHeight="7"
                refX="9"
                refY="3.5"
                orient="auto"
              >
                <polygon
                  points="0 0, 10 3.5, 0 7"
                  fill="#9CA3AF"
                />
              </marker>
              <marker
                id="arrowhead-ng"
                markerWidth="10"
                markerHeight="7"
                refX="9"
                refY="3.5"
                orient="auto"
              >
                <polygon
                  points="0 0, 10 3.5, 0 7"
                  fill="#EF4444"
                />
              </marker>
            </defs>
            
            {edges.map((edge, index) => {
              const path = generatePath(edge);
              const midpoint = getPathMidpoint(edge);
              const isNGPath = edge.ng;
              
              return (
                <g key={`${edge.from}-${edge.to}-${index}`}>
                  <path
                    d={path}
                    stroke={isNGPath ? "#EF4444" : "#9CA3AF"}
                    strokeWidth={isNGPath ? "3" : "2.5"}
                    strokeDasharray={isNGPath ? "8,4" : "none"}
                    fill="none"
                    markerEnd={isNGPath ? "url(#arrowhead-ng)" : "url(#arrowhead)"}
                    aria-label={`Connection from ${edge.from} to ${edge.to}${isNGPath ? ' (NG path)' : ''}`}
                    className="drop-shadow-sm"
                  />
                  {edge.ng && (
                    <g>
                      <NGLabel x={midpoint.x} y={midpoint.y} />
                      {/* Add direction indicator for NG paths */}
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