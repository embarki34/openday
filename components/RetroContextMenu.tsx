import React from 'react';

interface RetroContextMenuProps {
  x: number;
  y: number;
  onItemClick: (action: string) => void;
}

const RetroContextMenu: React.FC<RetroContextMenuProps> = ({ x, y, onItemClick }) => {
  const menuItems = [
    "New",
    "Refresh",
    "Paste",
    "Create Shortcut",
    "Properties"
  ];

  return (
    <div 
      className="fixed bg-[#c0c0c0] border-t-2 border-l-2 border-[#ffffff] border-b-2 border-r-2 border-[#808080] shadow-md z-50"
      style={{ left: `${x}px`, top: `${y}px` }}
    >
      {menuItems.map((item) => (
        <button
          key={item}
          className="w-full text-left p-2 hover:bg-[#000080] hover:text-white"
          onClick={() => onItemClick(item)}
        >
          {item}
        </button>
      ))}
    </div>
  );
};

export default RetroContextMenu;