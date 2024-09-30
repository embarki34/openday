import React from 'react';
import { Icon } from '@iconify/react';
import ClientTime from './ClientTime';
import Image from 'next/image';
interface RetroTaskbarProps {
  onStartClick: () => void;
  openWindows: string[];
  onWindowClick: (windowName: string) => void;
}

const RetroTaskbar: React.FC<RetroTaskbarProps> = ({ onStartClick, openWindows, onWindowClick }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#c0c0c0] border-t-2 border-[#ffffff] h-12 flex items-center px-2 z-50">
      <button onClick={onStartClick} className="bg-[#c0c0c0] border-t-2 border-l-2 border-[#ffffff] border-b-3 border-r-2 border-[#808080] px-6 py-2 mr-2 flex items-center">
        <Image src="/start-button.png" alt="Windows logo" width={82} height={180} />

      </button>
      <div className="flex-grow flex overflow-x-auto">
        {openWindows.map(window => (
          <button
            key={window}
            onClick={() => onWindowClick(window)}
            className="bg-[#c0c0c0] border border-[#808080] px-2 py-1 mr-2 text-sm whitespace-nowrap"
          >
            {window}
          </button>
        ))}
      </div>
      <div className="bg-[#c0c0c0] border-t border-l border-[#808080] border-b border-r border-[#ffffff] px-2 py-1 text-sm">
        <ClientTime />
      </div>
    </div>
  );
};

export default RetroTaskbar;