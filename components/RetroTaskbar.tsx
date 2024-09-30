import React from 'react';
import { Icon } from '@iconify/react';
import Image from 'next/image';
interface RetroTaskbarProps {
  currentTime: string;
  onStartClick: () => void;
  openWindows: string[];
  onWindowClick: (windowName: string) => void;
}

const RetroTaskbar: React.FC<RetroTaskbarProps> = ({ currentTime, onStartClick, openWindows, onWindowClick }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#c0c0c0] border-t-2 border-[#ffffff] h-12 flex items-center px-2 z-50">
      <button onClick={onStartClick} className="bg-[#c0c0c0] border-t-2 border-l-2 border-[#ffffff] border-b-2 border-r-2 border-[#808080] px-4 py-1 mr-2 flex items-center">
        <Image src="/start-button.png" alt="Start" width={84} height={84} />
        
      </button>
      <div className="flex-grow flex">
        {openWindows.map(window => (
          <button
            key={window}
            onClick={() => onWindowClick(window)}
            className="bg-[#c0c0c0] border border-[#808080] px-2 py-1 mr-2 text-sm"
          >
            {window}
          </button>
        ))}
      </div>
      <div className="bg-[#c0c0c0] border-t border-l border-[#808080] border-b border-r border-[#ffffff] px-2 py-1">
        {currentTime}
      </div>
    </div>
  );
};

export default RetroTaskbar;