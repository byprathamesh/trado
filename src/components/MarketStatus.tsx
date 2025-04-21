
import React, { useState, useEffect } from 'react';

const MarketStatus = () => {
  const [isMarketOpen, setIsMarketOpen] = useState<boolean>(false);
  const [nextMarketTime, setNextMarketTime] = useState<string>("");
  const [countdown, setCountdown] = useState<string>("");
  
  const checkMarketStatus = () => {
    // Get current date and time in IST
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const day = now.getDay(); // 0 is Sunday, 1 is Monday, etc.
    
    // Market is open Monday to Friday, 9:15 AM to 3:30 PM IST
    const isWeekday = day >= 1 && day <= 5;
    
    // Convert to minutes for easier comparison
    const currentTimeInMinutes = hours * 60 + minutes;
    const marketOpenTimeInMinutes = 9 * 60 + 15;
    const marketCloseTimeInMinutes = 15 * 60 + 30;
    
    const marketIsOpen = isWeekday && 
      currentTimeInMinutes >= marketOpenTimeInMinutes && 
      currentTimeInMinutes < marketCloseTimeInMinutes;
    
    setIsMarketOpen(marketIsOpen);

    // Calculate next market open time
    let nextOpenDay = day;
    let nextOpenDate = new Date(now);
    
    if (!isWeekday || currentTimeInMinutes >= marketCloseTimeInMinutes) {
      // If weekend or after market close, set next open to next weekday
      nextOpenDay = day + 1;
      if (nextOpenDay > 5) nextOpenDay = 1; // Skip to Monday if it's Friday or weekend
      
      // Calculate days to add
      let daysToAdd = nextOpenDay - day;
      if (daysToAdd <= 0) daysToAdd += 7;
      
      nextOpenDate = new Date(now);
      nextOpenDate.setDate(now.getDate() + daysToAdd);
    }
    
    // Set next market time string
    nextOpenDate.setHours(9, 15, 0);
    setNextMarketTime(`${nextOpenDate.toLocaleDateString()}, 9:15 AM`);
    
    // Calculate countdown
    const timeDiff = nextOpenDate.getTime() - now.getTime();
    if (timeDiff > 0 && !marketIsOpen) {
      const hours = Math.floor(timeDiff / (1000 * 60 * 60));
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
      
      setCountdown(`${hours}h ${minutes}m ${seconds}s`);
    } else {
      setCountdown("");
    }
  };
  
  useEffect(() => {
    // Initial check
    checkMarketStatus();
    
    // Update every second
    const timer = setInterval(() => {
      checkMarketStatus();
      
      // Also update the current time display
      const now = new Date();
      const timeString = now.toLocaleTimeString();
      const timeElement = document.getElementById('current-time');
      if (timeElement) {
        timeElement.textContent = timeString;
      }
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  return (
    <div className="flex items-center space-x-2">
      <div className={`h-2.5 w-2.5 rounded-full ${isMarketOpen ? 'bg-nifty-green' : 'bg-nifty-red'} animate-pulse-subtle`}></div>
      <div className="text-sm">
        <span className="font-medium">{isMarketOpen ? 'Market Open' : 'Market Closed'}</span>
        {!isMarketOpen && countdown && (
          <div className="text-xs text-gray-400">
            Opens in: {countdown}
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketStatus;
