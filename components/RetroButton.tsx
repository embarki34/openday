import React from 'react';

interface RetroButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const RetroButton: React.FC<RetroButtonProps> = ({ children, onClick }) => {
  return (
    <button
      className="bg-[#c0c0c0] border-t-2 border-l-2 border-[#ffffff] border-b-2 border-r-2 border-[#808080] px-4 py-2 active:border-t-2 active:border-l-2 active:border-[#808080] active:border-b-2 active:border-r-2 active:border-[#ffffff] focus:outline-none"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default RetroButton;