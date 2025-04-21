
import React, { useState, useEffect } from 'react';

const TradingPerformance = () => {
  const [performanceData, setPerformanceData] = useState({
    initialCapital: 10000,
    currentValue: 10000,
    todayProfit: 0,
    todayPercentage: 0,
    tradesCount: 0
  });
  
  useEffect(() => {
    // For demo purposes, simulate trading performance changes
    const updatePerformance = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const day = now.getDay(); // 0 is Sunday, 1 is Monday, etc.
      
      // Check if market is open (Mon-Fri, 9:15 AM - 3:30 PM)
      const isWeekday = day >= 1 && day <= 5;
      const currentTimeInMinutes = hours * 60 + minutes;
      const marketOpenTimeInMinutes = 9 * 60 + 15;
      const marketCloseTimeInMinutes = 15 * 60 + 30;
      
      const marketIsOpen = isWeekday && 
        currentTimeInMinutes >= marketOpenTimeInMinutes && 
        currentTimeInMinutes < marketCloseTimeInMinutes;
      
      if (!marketIsOpen) {
        // If market is closed, don't update
        return;
      }
      
      // Simulate a trade being made occasionally
      const shouldTrade = Math.random() > 0.98; // Low probability per second
      
      if (shouldTrade) {
        // Simulate trade result
        const tradeResult = Math.random() > 0.6 ? 
          Math.random() * 200 + 50 : // Winning trade
          -Math.random() * 150 - 50; // Losing trade
        
        setPerformanceData(prev => {
          const newValue = prev.currentValue + tradeResult;
          const newProfit = newValue - prev.initialCapital;
          const newPercentage = (newProfit / prev.initialCapital) * 100;
          
          return {
            ...prev,
            currentValue: newValue,
            todayProfit: newProfit,
            todayPercentage: newPercentage,
            tradesCount: prev.tradesCount + 1
          };
        });
      }
    };
    
    const interval = setInterval(updatePerformance, 1000);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="bg-gray-900 rounded-lg p-4">
      <h3 className="text-lg font-bold mb-3">Today's Trading</h3>
      
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="bg-gray-800 p-3 rounded">
          <div className="text-sm text-gray-400">Current P&L</div>
          <div className={`text-xl font-bold ${performanceData.todayProfit >= 0 ? 'text-nifty-green' : 'text-nifty-red'}`}>
            ₹{performanceData.todayProfit.toFixed(0)}
          </div>
        </div>
        
        <div className="bg-gray-800 p-3 rounded">
          <div className="text-sm text-gray-400">Return</div>
          <div className={`text-xl font-bold ${performanceData.todayPercentage >= 0 ? 'text-nifty-green' : 'text-nifty-red'}`}>
            {performanceData.todayPercentage.toFixed(1)}%
          </div>
        </div>
      </div>
      
      <div className="flex justify-between text-sm mt-2 border-t border-gray-800 pt-2">
        <div>
          <span className="text-gray-400">Initial: </span>
          <span>₹{performanceData.initialCapital.toFixed(0)}</span>
        </div>
        <div>
          <span className="text-gray-400">Trades: </span>
          <span>{performanceData.tradesCount}</span>
        </div>
      </div>
    </div>
  );
};

export default TradingPerformance;
