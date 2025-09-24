import React from 'react';

interface FlowCardProps {
  title: string;
  subtitle?: string;
  variant?: 'light' | 'navy';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const FlowCard: React.FC<FlowCardProps> = ({ 
  title, 
  subtitle, 
  variant = 'light', 
  size = 'md',
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'px-3 py-2 min-w-[100px]',
    md: 'px-5 py-3 min-w-[140px]',
    lg: 'px-7 py-5 min-w-[180px]'
  };

  const variantClasses = {
    light: 'bg-[#F3F4F6] border border-[#D1D5DB] text-[#0A1633]',
    navy: 'bg-[#0A1633] border border-[#1B2B57] text-white'
  };

  return (
    <div 
      className={`
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        rounded-2xl
        shadow-[0_8px_24px_rgba(0,0,0,0.12)]
        flex flex-col items-center justify-center
        text-center
        transition-all duration-200
        hover:shadow-[0_12px_32px_rgba(0,0,0,0.15)]
        ${className}
      `}
    >
      <div className={`
        ${size === 'sm' ? 'text-sm' : size === 'md' ? 'text-base' : 'text-lg'}
        font-semibold
        leading-tight
        mb-1
      `}>
        {title}
      </div>
      
      {subtitle && (
        <div className={`
          ${size === 'sm' ? 'text-xs' : 'text-xs'}
          text-[#4B5563]
          ${variant === 'navy' ? 'text-gray-300' : ''}
          leading-tight
        `}>
          {subtitle}
        </div>
      )}
    </div>
  );
};

export { FlowCard };