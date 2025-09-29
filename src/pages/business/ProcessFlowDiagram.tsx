import { processFlowContent } from '@/data/ProcessFlowContent';

type Language = 'KOR' | 'ENG';

interface ProcessFlowDiagramProps {
  language?: Language;
}

export default function ProcessFlowDiagram({ language = 'ENG' }: ProcessFlowDiagramProps) {
  const content = processFlowContent[language];
  
  const renderStep = (step: any) => {
    if (step.type === 'rect') {
      return (
        <g key={step.id}>
          <rect
            x={step.x}
            y={step.y}
            width="120"
            height="60"
            rx="8"
            fill="#E5E7EB"
            stroke="#9CA3AF"
            strokeWidth="2"
          />
          <text
            x={step.x + 60}
            y={step.y + 35}
            textAnchor="middle"
            fill="#1F2937"
            className="text-sm font-medium"
            style={{ fontFamily: 'system-ui, sans-serif' }}
          >
            {step.text.split('\n').map((line: string, index: number) => (
              <tspan key={index} x={step.x + 60} dy={index === 0 ? 0 : 16}>
                {line}
              </tspan>
            ))}
          </text>
        </g>
      );
    } else if (step.type === 'diamond') {
      return (
        <g key={step.id}>
          <path
            d={`M ${step.x + 50} ${step.y} L ${step.x + 80} ${step.y + 30} L ${step.x + 50} ${step.y + 60} L ${step.x + 20} ${step.y + 30} Z`}
            fill="#374151"
            stroke="#111827"
            strokeWidth="2"
          />
          <text
            x={step.x + 50}
            y={step.y + 35}
            textAnchor="middle"
            fill="white"
            className="text-sm font-medium"
            style={{ fontFamily: 'system-ui, sans-serif' }}
          >
            {step.text.split('\n').map((line: string, index: number) => (
              <tspan key={index} x={step.x + 50} dy={index === 0 ? 0 : 14}>
                {line}
              </tspan>
            ))}
          </text>
        </g>
      );
    }
  };

  const renderArrow = (arrow: any) => {
    const fromStep = content.steps.find(s => s.id === arrow.from);
    const toStep = content.steps.find(s => s.id === arrow.to);
    
    if (!fromStep || !toStep) return null;

    let fromX, fromY, toX, toY;
    
    // Calculate connection points based on step type and arrow direction
    if (arrow.direction === 'vertical') {
      // Vertical arrows (down)
      if (fromStep.type === 'rect') {
        fromX = fromStep.x + 60;
        fromY = fromStep.y + 60;
      } else {
        fromX = fromStep.x + 50;
        fromY = fromStep.y + 60;
      }
      
      if (toStep.type === 'rect') {
        toX = toStep.x + 60;
        toY = toStep.y;
      } else {
        toX = toStep.x + 50;
        toY = toStep.y;
      }
    } else {
      // Horizontal arrows
      if (fromStep.type === 'rect') {
        fromX = fromStep.x + 120;
        fromY = fromStep.y + 30;
      } else {
        fromX = fromStep.x + 80;
        fromY = fromStep.y + 30;
      }
      
      if (toStep.type === 'rect') {
        toX = toStep.x;
        toY = toStep.y + 30;
      } else {
        toX = toStep.x + 20;
        toY = toStep.y + 30;
      }
    }

    // Special handling for NG arrows (curved back)
    if (arrow.type === 'ng') {
      const midX = (fromX + toX) / 2;
      const midY = Math.min(fromY, toY) - 40;
      
      return (
        <g key={`${arrow.from}-${arrow.to}`}>
          {/* Curved NG arrow */}
          <path
            d={`M ${fromX} ${fromY - 15} Q ${midX} ${midY} ${toX} ${toY - 15}`}
            fill="none"
            stroke="#EF4444"
            strokeWidth="2"
            markerEnd="url(#arrowhead-red)"
          />
          {/* NG label */}
          <text
            x={midX}
            y={midY - 10}
            textAnchor="middle"
            fill="#EF4444"
            className="text-sm font-medium"
            style={{ fontFamily: 'system-ui, sans-serif' }}
          >
            {arrow.label}
          </text>
        </g>
      );
    }

    // Regular arrow
    return (
      <g key={`${arrow.from}-${arrow.to}`}>
        <line
          x1={fromX}
          y1={fromY}
          x2={toX}
          y2={toY}
          stroke="#6B7280"
          strokeWidth="2"
          markerEnd="url(#arrowhead)"
        />
      </g>
    );
  };

  return (
    <div className="w-full h-full flex items-center justify-center p-8">
      <svg
        width="1000"
        height="650"
        viewBox="0 0 1000 650"
        className="w-full h-full max-w-5xl"
        style={{ background: 'transparent' }}
      >
        <defs>
          {/* Arrow markers */}
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="10"
            refY="3.5"
            orient="auto"
          >
            <polygon
              points="0 0, 10 3.5, 0 7"
              fill="#6B7280"
            />
          </marker>
          
          <marker
            id="arrowhead-red"
            markerWidth="10"
            markerHeight="7"
            refX="10"
            refY="3.5"
            orient="auto"
          >
            <polygon
              points="0 0, 10 3.5, 0 7"
              fill="#EF4444"
            />
          </marker>
        </defs>

        {/* Render all arrows first (behind shapes) */}
        {content.arrows.map(renderArrow)}
        
        {/* Render all steps */}
        {content.steps.map(renderStep)}
      </svg>
    </div>
  );
}