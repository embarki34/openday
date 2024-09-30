import React from 'react';
import Image from 'next/image';

interface RetroIconProps {
  style?: React.CSSProperties;
}

const RetroIcon: React.FC<RetroIconProps> = ({ style }) => {
  const icons = [
    '/my-computer.png',
    '/my-documents.png',
    '/recycle_bin.png',
    '/overlay_share-1.png',
  ];

  const randomIcon = icons[Math.floor(Math.random() * icons.length)];

  return (
    <div className="absolute animate-float" style={style}>
      <Image src={randomIcon} alt="Retro Icon" width={32} height={32} />
    </div>
  );
};

export default RetroIcon;