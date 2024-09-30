import React from 'react';
import Image from 'next/image';

interface RetroIconProps {
  name: string;
  icon: string;
  onClick: () => void;
}

const RetroIcon: React.FC<RetroIconProps> = ({ name, icon, onClick }) => {
  return (
    <div
      className="flex flex-col items-center cursor-pointer hover:bg-white/10 p-2 rounded transition-colors duration-200"
      onClick={onClick}
    >
      <Image 
        src={icon} 
        width={50} 
        height={50} 
        alt={name}
        style={{ width: 'auto', height: 'auto' }}
      />
      <span className="text-white text-sm mt-1 text-center px-1 bg-[#000080]">{name}</span>
    </div>
  );
};

export default RetroIcon;