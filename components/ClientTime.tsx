'use client'

import React, { useState, useEffect } from 'react';

const ClientTime: React.FC = () => {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }));
    };

    updateTime(); // Set initial time
    const timer = setInterval(updateTime, 1000);

    return () => clearInterval(timer);
  }, []);

  return <span>{time}</span>;
};

export default ClientTime;