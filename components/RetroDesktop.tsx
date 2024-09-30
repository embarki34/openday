import React from 'react';
import { Icon } from '@iconify/react';
import Image from 'next/image';
interface DesktopIcon {
  name: string;
  icon: string;
}

interface RetroDesktopProps {
  icons: DesktopIcon[];
  onIconClick: (name: string) => void;
}

const RetroDesktop: React.FC<RetroDesktopProps> = ({ icons, onIconClick }) => {
  return (
    <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4 p-4">
      {icons.map((icon) => (
        <div
          key={icon.name}
          className="flex flex-col items-center cursor-pointer hover:bg-white/10 p-2 rounded transition-colors duration-200"
          onClick={() => onIconClick(icon.name)}
          onDoubleClick={() => onIconClick(icon.name)}
        >
         
            <Image 
              src={icon.icon} 
              className="text-4xl text-[#000080]" 
              width={icon.name === "Contact Us" ? 100 : 50} 
              height={icon.name === "Contact Us" ? 100 : 50} 
              alt={icon.name} 
            />
          
          <span className="text-white text-sm mt-1 text-center px-1 bg-[#000080]">{icon.name}</span>
        </div>
      ))}
    </div>
  );
};

export default RetroDesktop;