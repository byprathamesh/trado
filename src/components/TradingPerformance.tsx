
import React, { useState, useEffect } from 'react';

const TradingPerformance = () => {
  const [performanceData, setPerformanceData] = useState({
    initialCapital: 10000,
    currentValue: 10000,
    todayProfit: 0,
    todayPercentage: 0,
    tradesCount: 0,
    positions: [] as {id: number, entry: number, time: string, contract: string}[]
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
      
      const randomAction = Math.random();
      
      // BUY trade (if we have less than 3 active positions)
      if (randomAction > 0.98 && performanceData.positions.length < 3) {
        // Create a new position (always BUY trades)
        const newPosition = {
          id: Date.now(),
          entry: Math.random() * 100 + 50,
          time: `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`,
          contract: `NIFTY ${Math.floor(Math.random() * 1000) + 21000} CE`
        };
        
        setPerformanceData(prev => ({
          ...prev,
          positions: [...prev.positions, newPosition],
          tradesCount: prev.tradesCount + 1
        }));
      }
      // SELL an existing position
      else if (randomAction < 0.02 && performanceData.positions.length > 0) {
        // Sell a random position
        const positionIndex = Math.floor(Math.random() * performanceData.positions.length);
        const position = performanceData.positions[positionIndex];
        
        // Calculate profit/loss (60% chance of profit)
        const isProfit = Math.random() > 0.4;
        const tradeResult = isProfit ? 
          Math.random() * 200 + 50 : // Winning trade
          -Math.random() * 150 - 50; // Losing trade
        
        setPerformanceData(prev => {
          const newPositions = [...prev.positions];
          newPositions.splice(positionIndex, 1);
          
          const newValue = prev.currentValue + tradeResult;
          const newProfit = newValue - prev.initialCapital;
          const newPercentage = (newProfit / prev.initialCapital) * 100;
          
          return {
            ...prev,
            positions: newPositions,
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
  }, [performanceData.positions]);
  
  return (
    <div className="bg-gray-900 rounded-lg p-4 mt-4">
      <h3 className="text-lg font-bold mb-3">Today's Trading</h3>
      
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="bg-gray-800 p-3 rounded">
          <div className="text-sm text-gray-400">Current P&L</div>
          <div className={`text-xl font-bold ${performanceData.todayProfit >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            ₹{performanceData.todayProfit.toFixed(0)}
          </div>
        </div>
        
        <div className="bg-gray-800 p-3 rounded">
          <div className="text-sm text-gray-400">Return</div>
          <div className={`text-xl font-bold ${performanceData.todayPercentage >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {performanceData.todayPercentage.toFixed(1)}%
          </div>
        </div>
      </div>
      
      {performanceData.positions.length > 0 && (
        <div className="mb-3">
          <h4 className="text-sm font-semibold mb-2 text-gray-400">Active Positions</h4>
          <div className="space-y-2">
            {performanceData.positions.map(pos => (
              <div key={pos.id} className="bg-gray-800 p-2 rounded flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="text-xs text-green-500">BUY</span>
                  <span>{pos.contract}</span>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-400">@ ₹{pos.entry.toFixed(1)}</div>
                  <div className="text-xs text-gray-400">{pos.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
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
