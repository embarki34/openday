import React from 'react';
import { Icon } from '@iconify/react';
import Image from 'next/image';
interface RetroStartMenuProps {
  onItemClick: (item: string) => void;
  onClose: () => void;
}

const RetroStartMenu: React.FC<RetroStartMenuProps> = ({ onItemClick, onClose }) => {
  const menuItems = [

      { name: "About Us", icon: "/msg_information-1.png" },
      { name: "Achievements", icon: "/paint_old-0.png" },
      { name: "Contact Us", icon: "/contact.png" },
  ];

  return (
    <div className="fixed bottom-12 left-0 w-64 bg-[#c0c0c0] border-t-2 border-l-2 border-[#ffffff] border-b-2 border-r-2 border-[#808080] shadow-md z-50">
      <div className="bg-[#000080] text-white p-2 font-bold flex items-center">
        <Icon icon="win98:windows-0" className="mr-2" />
        <span>Infiniti Club</span>
      </div>
      <div className="p-1">
        {menuItems.map((item) => (
          <button
            key={item.name}
            className="w-full text-left p-2 flex items-center hover:bg-[#000080] hover:text-white"
            onClick={() => {
              onItemClick(item.name);
              if (item.name !== "Shut Down") {
                onClose();
              }
            }}
          >
            <Image src={item.icon} className="mr-2 text-2xl" alt={item.name} width={24} height={24} />
            <span>{item.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default RetroStartMenu;