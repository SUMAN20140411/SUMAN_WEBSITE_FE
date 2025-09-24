import React from 'react';

interface FlowArrowProps {
  direction?: 'right' | 'left' | 'down' | 'up';
  color?: 'navy' | 'red';
  length?: number;
  className?: string;
}

const FlowArrow: React.FC<FlowArrowProps> = ({ 
  direction = 'right',
  color = 'navy',
  length = 48,
  className = '' 
}) => {
  const colorClasses = {
    navy: '#1B2B57',
    red: '#EF4444'
  };

  const arrowColor = colorClasses[color];

  const getArrowPath = () => {
    switch (direction) {
      case 'right':
        return 'M5 12h14m-7-7l7 7-7 7';
      case 'left':
        return 'M19 12H5m7-7l-7 7l7 7';
      case 'down':
        return 'M12 5v14m7-7l-7 7l-7-7';
      case 'up':
        return 'M12 19V5m-7 7l7-7l7 7';
      default:
        return 'M5 12h14m-7-7l7 7-7 7';
    }
  };

  const getContainerClasses = () => {
    switch (direction) {
      case 'right':
      case 'left':
        return `w-[${length}px] h-6 flex items-center`;
      case 'down':
      case 'up':
        return `w-6 h-[${length}px] flex justify-center`;
      default:
        return `w-[${length}px] h-6 flex items-center`;
    }
  };

  return (
    <div className={`${getContainerClasses()} ${className}`}>
      {/* Connector line */}
      <div 
        className={`
          ${direction === 'right' || direction === 'left' ? 'w-full h-0.5' : 'w-0.5 h-full'}
        `}
        style={{ backgroundColor: arrowColor }}
      />
      
      {/* Arrow chevron */}
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke={arrowColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`
          ${direction === 'right' ? '-ml-3' : ''}
          ${direction === 'left' ? '-mr-3' : ''}
          ${direction === 'down' ? '-mt-3' : ''}
          ${direction === 'up' ? '-mb-3' : ''}
        `}
      >
        <path d={getArrowPath()} />
      </svg>
    </div>
  );
};

export { FlowArrow };