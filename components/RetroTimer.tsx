import React, { useState, useEffect } from 'react';

const RetroTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const eventDate = new Date('2024-10-01T09:00:00'); // Assuming the event starts at 9 AM

    const timer = setInterval(() => {
      const now = new Date();
      const difference = eventDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed top-4 right-4 bg-[#000080] text-[#00ff00] p-4 border-t-2 border-l-2 border-[#ffffff] border-b-2 border-r-2 border-[#808080] shadow-md z-50 font-['Digital']" style={{ display: 'block' }}>
      <h2 className="text-center mb-2 text-xl">Infiniti Club Open Day Countdown</h2>
      <div className="grid grid-cols-4 gap-2 text-center">
        <div>
          <div className="text-2xl">{timeLeft.days.toString().padStart(2, '0')}</div>
          <div className="text-xs">Days</div>
        </div>
        <div>
          <div className="text-2xl">{timeLeft.hours.toString().padStart(2, '0')}</div>
          <div className="text-xs">Hours</div>
        </div>
        <div>
          <div className="text-2xl">{timeLeft.minutes.toString().padStart(2, '0')}</div>
          <div className="text-xs">Minutes</div>
        </div>
        <div>
          <div className="text-2xl">{timeLeft.seconds.toString().padStart(2, '0')}</div>
          <div className="text-xs">Seconds</div>
        </div>
      </div>
    </div>
  );
};

export default RetroTimer;