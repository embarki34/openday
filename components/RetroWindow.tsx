import React, { useState } from 'react';
import { Rnd } from 'react-rnd';

interface RetroWindowProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}

const RetroWindow: React.FC<RetroWindowProps> = ({ title, children, onClose }) => {
  const [size, setSize] = useState({ width: 400, height: 300 });
  const [position, setPosition] = useState({ x: 100, y: 100 });

  return (
    <Rnd
      size={size}
      position={position}
      onDragStop={(e, d) => setPosition({ x: d.x, y: d.y })}
      onResizeStop={(e, direction, ref, delta, position) => {
        setSize({
          width: parseInt(ref.style.width),
          height: parseInt(ref.style.height),
        });
        setPosition(position);
      }}
      className="bg-[#c0c0c0] border-t-2 border-l-2 border-[#ffffff] border-b-2 border-r-2 border-[#808080] shadow-[inset_-1px_-1px_#0a0a0a]"
    >
      <div className="bg-[#000080] text-white font-bold p-1 flex justify-between items-center">
        <span>{title}</span>
        <button onClick={onClose} className="bg-[#c0c0c0] text-black px-2 border border-[#ffffff] border-r-[#808080] border-b-[#808080]">
          ×
        </button>
      </div>
      <div className="p-4">{children}</div>
    </Rnd>
  );
};

export default RetroWindow;