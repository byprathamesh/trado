
import React, { useState, useEffect } from 'react';
import DashboardNav from './dashboard/DashboardNav';
import DashboardFooter from './dashboard/DashboardFooter';
import Main from './dashboard/pages/Main';
import Analysis from './dashboard/pages/Analysis';
import Trades from './dashboard/pages/Trades';
import Insights from './dashboard/pages/Insights';

const Dashboard = () => {
  const [currentPage, setCurrentPage] = useState<'main' | 'analysis' | 'trades' | 'insights'>('main');
  const [isDemoMode, setIsDemoMode] = useState<boolean>(false);
  const [isMarketOpen, setIsMarketOpen] = useState<boolean>(false);
  
  useEffect(() => {
    const checkMarketStatus = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const day = now.getDay();
      
      const isWeekday = day >= 1 && day <= 5;
      const currentTimeInMinutes = hours * 60 + minutes;
      const marketOpenTimeInMinutes = 9 * 60 + 15;
      const marketCloseTimeInMinutes = 15 * 60 + 30;
      
      const marketOpen = isWeekday && 
        currentTimeInMinutes >= marketOpenTimeInMinutes && 
        currentTimeInMinutes < marketCloseTimeInMinutes;
      
      setIsMarketOpen(marketOpen);
    };
    
    checkMarketStatus();
    const interval = setInterval(checkMarketStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeElement = document.getElementById('current-time');
      if (timeElement) {
        timeElement.textContent = now.toLocaleTimeString();
      }
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="flex flex-col h-full min-h-screen w-full bg-black text-white">
      <DashboardNav
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        isDemoMode={isDemoMode}
        setIsDemoMode={setIsDemoMode}
      />

      <div className="flex-grow p-4">
        {currentPage === 'main' && <Main isMarketOpen={isMarketOpen} isDemoMode={isDemoMode} />}
        {currentPage === 'analysis' && <Analysis />}
        {currentPage === 'trades' && <Trades />}
        {currentPage === 'insights' && <Insights />}
      </div>

      <DashboardFooter isDemoMode={isDemoMode} />
    </div>
  );
};

export default Dashboard;
