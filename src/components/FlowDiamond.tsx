import React from 'react';

interface FlowDiamondProps {
  title: string;
  subtitle?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const FlowDiamond: React.FC<FlowDiamondProps> = ({ 
  title, 
  subtitle, 
  size = 'md',
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-20 h-20',
    md: 'w-28 h-28',
    lg: 'w-36 h-36'
  };

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  return (
    <div className={`relative ${className}`}>
      {/* Diamond shape with gradient */}
      <div 
        className={`
          ${sizeClasses[size]}
          bg-gradient-to-br from-[#1B2B57] to-[#0A1633]
          transform rotate-45
          shadow-[0_8px_24px_rgba(0,0,0,0.12)]
          relative
          transition-all duration-200
          hover:shadow-[0_12px_32px_rgba(0,0,0,0.15)]
        `}
        style={{
          boxShadow: `
            0 8px 24px rgba(0,0,0,0.12),
            inset 0 1px 3px rgba(255,255,255,0.1)
          `
        }}
      >
        {/* Inner glow effect */}
        <div 
          className="absolute inset-1 bg-gradient-to-br from-white/10 to-transparent rounded-sm"
        />
      </div>
      
      {/* Text content - positioned absolutely to avoid rotation */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <div className={`
          ${textSizeClasses[size]}
          font-bold
          text-white
          leading-tight
          px-2
          ${subtitle ? 'mb-0.5' : ''}
        `}>
          {title}
        </div>
        
        {subtitle && (
          <div className={`
            ${size === 'sm' ? 'text-xs' : size === 'md' ? 'text-xs' : 'text-sm'}
            text-white/80
            leading-tight
            px-2
          `}>
            {subtitle}
          </div>
        )}
      </div>
    </div>
  );
};

export { FlowDiamond };