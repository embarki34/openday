"use client"
import { useState, useEffect } from "react";
import RetroDesktop from "@/components/RetroDesktop";
import RetroTaskbar from "@/components/RetroTaskbar";
import RetroWindow from "@/components/RetroWindow";
import RetroStartMenu from "@/components/RetroStartMenu";
import RetroContextMenu from "@/components/RetroContextMenu";
import RetroTimer from "@/components/RetroTimer";


export default function Home() {
  const [openWindows, setOpenWindows] = useState<string[]>(["Open Day Announcement"]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState<{ x: number; y: number } | null>(null);
  const [isEventDay, setIsEventDay] = useState(false);
  const [openDayMessage, setOpenDayMessage] = useState("");
  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      const eventDate = new Date(2024, 9, 1, 10, 0, 0); // October 1, 2024, 10:00 AM
      setIsEventDay(now.getFullYear() === 2024 && now.getMonth() === 9 && now.getDate() === 1);
      
      const timeDiff = eventDate.getTime() - now.getTime();
      if (timeDiff > 0) {
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
        setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`);
        setOpenDayMessage(`Open Day is on October 1, 2024 at 10:00 AM (${countdown} remaining)`);
      } else if (timeDiff <= 0 && timeDiff > -24 * 60 * 60 * 1000) {
        setOpenDayMessage("Open Day is today!");
      } else {
        setOpenDayMessage("Open Day has passed.");
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  const toggleWindow = (windowName: string) => {
    setOpenWindows(prev => 
      prev.includes(windowName) 
        ? prev.filter(w => w !== windowName) 
        : [...prev, windowName]
    );
  };

  const handleStartClick = () => {
    setIsStartMenuOpen(!isStartMenuOpen);
    if (isEventDay) {
      // Show welcome message on event day
      alert("Welcome to Infiniti Club Open Day!");
    }
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenuPosition({ x: e.clientX, y: e.clientY });
  };

  const closeContextMenu = () => {
    setContextMenuPosition(null);
  };

  const desktopIcons = [
    { name: "About Us", icon: "/msg_information-1.png" },
    { name: "Achievements", icon: "/paint_old-0.png" },
    { name: "Contact Us", icon: "/contact.png" },
  ];

  return (
    <div 
      className="bg-[#008080] min-h-screen font-[family-name:var(--font-ms-sans-serif)] relative overflow-hidden"
      onContextMenu={handleContextMenu}
      onClick={closeContextMenu}
    >
      <RetroDesktop icons={desktopIcons} onIconClick={toggleWindow} />
      
      {openWindows.map(window => (
        <RetroWindow key={window} title={window} onClose={() => toggleWindow(window)}>
          {window === "About Us" && (
            <p className="text-[#000080]">
              Infiniti Club was created by students for students in 2023 at the University of Bordj Bou Arréridj's IT Department (MI). Our goal? To inspire and unite future developers.
            </p>
          )}
          {window === "Achievements" && (
            <ul className="list-disc pl-5 text-[#008000]">
              <li>Hacktivia Hackathon: 1st Place</li>
              <li>Msila Hackathon: 2nd Place</li>
              <li>National Developers Competition: 4th Place</li>
              <li>AI Open Days: Hosted successful events</li>
            </ul>
          )}
          {window === "Contact Us" && (
            <form className="flex flex-col gap-2">
              <input type="text" placeholder="Name" className="retro-input" />
              <input type="email" placeholder="Email" className="retro-input" />
              <textarea placeholder="Message" rows={4} className="retro-input" />
              <button type="submit" className="retro-button">Send</button>
            </form>
          )}
          {window === "AI Open Days" && (
            <p className="text-[#000080]">
              Join us for exciting AI-themed events and workshops!
            </p>
          )}
          {window === "Open Day Announcement" && (
            <p className="text-[#000080] text-2xl font-bold">
              {openDayMessage}
            </p>
          )}
        </RetroWindow>
      ))}

      {isEventDay && <RetroTimer />}
      <RetroTaskbar 
        currentTime={currentTime.toLocaleTimeString()}
        onStartClick={handleStartClick} 
        openWindows={openWindows}
        onWindowClick={toggleWindow}
      />

      {isStartMenuOpen && (
        <RetroStartMenu 
          onItemClick={(item) => {
            toggleWindow(item);
            setIsStartMenuOpen(false);
          }}
          onClose={() => setIsStartMenuOpen(false)}
        />
      )}

      {contextMenuPosition && (
        <RetroContextMenu 
          x={contextMenuPosition.x} 
          y={contextMenuPosition.y}
          onItemClick={(action) => {
            // Handle context menu actions
            closeContextMenu();
          }}
        />
      )}
    </div>
  );
}