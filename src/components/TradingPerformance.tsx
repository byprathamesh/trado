
import React, { useState, useEffect } from 'react';

const TradingPerformance = () => {
  const [performanceData, setPerformanceData] = useState({
    initialCapital: 100000, // More realistic initial capital
    currentValue: 100000,
    todayProfit: 0,
    todayPercentage: 0,
    tradesCount: 0,
    positions: [] as {id: number, entry: number, time: string, contract: string, quantity: number}[]
  });
  
  useEffect(() => {
    // For realistic trading simulation
    const updatePerformance = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const day = now.getDay();
      
      // Real market hours check
      const isWeekday = day >= 1 && day <= 5;
      const currentTimeInMinutes = hours * 60 + minutes;
      const marketOpenTimeInMinutes = 9 * 60 + 15;
      const marketCloseTimeInMinutes = 15 * 60 + 30;
      
      const marketIsOpen = isWeekday && 
        currentTimeInMinutes >= marketOpenTimeInMinutes && 
        currentTimeInMinutes < marketCloseTimeInMinutes;
      
      if (!marketIsOpen) {
        return;
      }
      
      // Trade execution logic
      const shouldTrade = Math.random() > 0.97; // Realistic trading frequency
      
      if (shouldTrade) {
        if (performanceData.positions.length < 3) { // Maximum 3 concurrent positions
          // Calculate realistic contract details
          const basePrice = 21000 + Math.floor(Math.random() * 2000);
          const isCallOption = Math.random() > 0.3; // 70% calls in bullish market
          const strikePrice = basePrice + (isCallOption ? 200 : -200);
          const quantity = Math.floor(Math.random() * 3 + 1) * 25; // Realistic lot sizes
          
          // Create new position with realistic values
          const newPosition = {
            id: Date.now(),
            entry: Math.floor(Math.random() * 150 + 50), // Realistic premium
            time: `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`,
            contract: `NIFTY ${strikePrice} ${isCallOption ? 'CE' : 'PE'}`,
            quantity
          };
          
          setPerformanceData(prev => ({
            ...prev,
            positions: [...prev.positions, newPosition],
            tradesCount: prev.tradesCount + 1
          }));
        }
        // Position exit logic
        else if (performanceData.positions.length > 0 && Math.random() > 0.5) {
          const positionIndex = Math.floor(Math.random() * performanceData.positions.length);
          const position = performanceData.positions[positionIndex];
          
          // Calculate realistic P&L
          const exitPrice = position.entry * (1 + (Math.random() > 0.6 ? 1 : -0.5) * Math.random());
          const tradeResult = (exitPrice - position.entry) * position.quantity;
          
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
      }
    };
    
    const interval = setInterval(updatePerformance, 1000);
    return () => clearInterval(interval);
  }, [performanceData.positions]);
  
  return (
    <div className="bg-black border border-white rounded-lg p-4 mt-4">
      <h3 className="text-lg font-bold mb-3">Today's Trading</h3>
      
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="bg-black border border-white p-3 rounded">
          <div className="text-sm text-white/70">Current P&L</div>
          <div className={`text-xl font-bold ${performanceData.todayProfit >= 0 ? 'text-[#00FF00]' : 'text-[#FF4D4D]'}`}>
            ₹{performanceData.todayProfit.toFixed(0)}
          </div>
        </div>
        
        <div className="bg-black border border-white p-3 rounded">
          <div className="text-sm text-white/70">Return</div>
          <div className={`text-xl font-bold ${performanceData.todayPercentage >= 0 ? 'text-[#00FF00]' : 'text-[#FF4D4D]'}`}>
            {performanceData.todayPercentage.toFixed(2)}%
          </div>
        </div>
      </div>
      
      {performanceData.positions.length > 0 && (
        <div className="mb-3">
          <h4 className="text-sm font-semibold mb-2 text-white/70">Active Positions</h4>
          <div className="space-y-2">
            {performanceData.positions.map(pos => (
              <div key={pos.id} className="bg-black border border-white p-2 rounded flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="text-xs text-[#00FF00]">BUY</span>
                  <span>{pos.contract}</span>
                </div>
                <div className="text-right">
                  <div className="text-xs text-white/70">@ ₹{pos.entry.toFixed(1)}</div>
                  <div className="text-xs text-white/70">{pos.time} • {pos.quantity} qty</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="flex justify-between text-sm mt-2 border-t border-white/70 pt-2">
        <div>
          <span className="text-white/70">Initial: </span>
          <span>₹{performanceData.initialCapital.toFixed(0)}</span>
        </div>
        <div>
          <span className="text-white/70">Trades: </span>
          <span>{performanceData.tradesCount}</span>
        </div>
      </div>
    </div>
  );
};

export default TradingPerformance;
