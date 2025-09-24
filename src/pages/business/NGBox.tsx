import React from 'react';

interface NGBoxProps {
  className?: string;
}

const NGBox: React.FC<NGBoxProps> = ({ className = '' }) => {
  return (
    <div className={`
      bg-[#EF4444] 
      text-white 
      px-2 py-1 
      rounded 
      text-xs 
      font-medium
      shadow-sm
      ${className}
    `}>
      NG
    </div>
  );
};

export { NGBox };