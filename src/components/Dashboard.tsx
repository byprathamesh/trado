
import React, { useState, useEffect } from 'react';
import PredictionCard from './PredictionCard';
import MarketStatus from './MarketStatus';
import TradingPerformance from './TradingPerformance';
import GraphsDisplay from './GraphsDisplay';

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

  // Update current time display
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
      <div className="flex justify-between items-center p-4 border-b border-white">
        <h1 className="text-xl font-bold">Nifty Direction Predictor</h1>
        <div className="flex gap-4">
          <button 
            onClick={() => setCurrentPage('main')} 
            className={`px-3 py-1 rounded ${currentPage === 'main' ? 'bg-black border border-white' : 'hover:bg-gray-900'}`}
          >
            Main
          </button>
          <button 
            onClick={() => setCurrentPage('analysis')} 
            className={`px-3 py-1 rounded ${currentPage === 'analysis' ? 'bg-black border border-white' : 'hover:bg-gray-900'}`}
          >
            Analysis
          </button>
          <button 
            onClick={() => setCurrentPage('trades')} 
            className={`px-3 py-1 rounded ${currentPage === 'trades' ? 'bg-black border border-white' : 'hover:bg-gray-900'}`}
          >
            Trades
          </button>
          <button 
            onClick={() => setCurrentPage('insights')} 
            className={`px-3 py-1 rounded ${currentPage === 'insights' ? 'bg-black border border-white' : 'hover:bg-gray-900'}`}
          >
            Insights
          </button>
          <button 
            onClick={() => setIsDemoMode(!isDemoMode)} 
            className={`px-3 py-1 rounded ${isDemoMode ? 'bg-nifty-green text-black' : 'bg-black border border-white'}`}
          >
            {isDemoMode ? 'Demo: ON' : 'Demo: OFF'}
          </button>
        </div>
        <MarketStatus />
      </div>

      <div className="flex-grow p-4">
        {currentPage === 'main' && (
          <div className="flex flex-col lg:flex-row gap-4 h-full">
            <div className="lg:w-1/4 w-full">
              <PredictionCard />
              <TradingPerformance />
            </div>
            <div className="lg:w-3/4 w-full">
              {!isMarketOpen && !isDemoMode ? (
                <div className="bg-black border border-white rounded-lg p-8 text-center h-full flex flex-col items-center justify-center">
                  <h3 className="text-xl font-bold mb-4">Market is Currently Closed</h3>
                  <p className="mb-6">Live prediction data will be available when the market opens.</p>
                  <button 
                    onClick={() => setIsDemoMode(true)} 
                    className="px-4 py-2 bg-nifty-green text-black rounded hover:opacity-90 transition-colors"
                  >
                    View Demo Data
                  </button>
                </div>
              ) : (
                <GraphsDisplay isDemo={isDemoMode} isMarketOpen={isMarketOpen} />
              )}
            </div>
          </div>
        )}
        
        {currentPage === 'analysis' && (
          <div className="h-full p-4">
            <h2 className="text-2xl font-bold mb-6">Market Analysis</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-black border border-white p-4 rounded-lg">
                <h3 className="text-xl font-bold mb-2">News Impact</h3>
                <ul className="space-y-2">
                  {[
                    { title: "RBI policy announcement", impact: "+4.2%", type: "positive" },
                    { title: "US Fed rate decision", impact: "-2.7%", type: "negative" },
                    { title: "Quarterly earnings beat", impact: "+3.5%", type: "positive" },
                    { title: "Global market rally", impact: "+1.8%", type: "positive" },
                  ].map((item, index) => (
                    <li key={index} className="flex justify-between items-center border-b border-white pb-2">
                      <span>{item.title}</span>
                      <span className={item.type === "positive" ? "text-nifty-green" : "text-nifty-red"}>
                        {item.impact}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-black border border-white p-4 rounded-lg">
                <h3 className="text-xl font-bold mb-2">Technical Indicators</h3>
                <ul className="space-y-2">
                  {[
                    { name: "MACD", signal: "Bullish crossover", impact: "+2.5%" },
                    { name: "RSI", signal: "Overbought (78)", impact: "-1.8%" },
                    { name: "Moving Averages", signal: "Golden cross", impact: "+3.2%" },
                    { name: "Volume Profile", signal: "Above average", impact: "+1.1%" },
                  ].map((item, index) => (
                    <li key={index} className="flex justify-between items-center border-b border-white pb-2">
                      <div>
                        <span className="font-medium">{item.name}</span>
                        <span className="text-white/70 ml-2 text-sm">{item.signal}</span>
                      </div>
                      <span className={parseFloat(item.impact) > 0 ? "text-nifty-green" : "text-nifty-red"}>
                        {item.impact}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-black border border-white p-4 rounded-lg">
                <h3 className="text-xl font-bold mb-2">Algo Bot Activity</h3>
                <ul className="space-y-2">
                  {[
                    { pattern: "Block trades", activity: "High", impact: "-2.1%" },
                    { pattern: "High frequency movement", activity: "Medium", impact: "+1.9%" },
                    { pattern: "Short covering", activity: "High", impact: "+3.5%" },
                    { pattern: "Momentum follow", activity: "Low", impact: "+0.7%" },
                  ].map((item, index) => (
                    <li key={index} className="flex justify-between items-center border-b border-white pb-2">
                      <div>
                        <span className="font-medium">{item.pattern}</span>
                        <span className={`ml-2 px-1 py-0.5 rounded text-xs 
                          ${item.activity === 'High' 
                            ? 'bg-nifty-red/30 text-white' 
                            : item.activity === 'Medium' 
                              ? 'bg-nifty-green/30 text-white' 
                              : 'bg-white/20 text-white'
                          }`}>
                          {item.activity}
                        </span>
                      </div>
                      <span className={parseFloat(item.impact) > 0 ? "text-nifty-green" : "text-nifty-red"}>
                        {item.impact}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-black border border-white p-4 rounded-lg">
                <h3 className="text-xl font-bold mb-2">Institutional Activity</h3>
                <ul className="space-y-2">
                  {[
                    { entity: "FIIs", action: "Net buyers", impact: "+2.7%" },
                    { entity: "DIIs", action: "Net sellers", impact: "-1.4%" },
                    { entity: "Promoters", action: "Increased stake", impact: "+1.8%" },
                    { entity: "Retail", action: "Net buyers", impact: "+0.5%" },
                  ].map((item, index) => (
                    <li key={index} className="flex justify-between items-center border-b border-white pb-2">
                      <div>
                        <span className="font-medium">{item.entity}</span>
                        <span className="text-white/70 ml-2 text-sm">{item.action}</span>
                      </div>
                      <span className={parseFloat(item.impact) > 0 ? "text-nifty-green" : "text-nifty-red"}>
                        {item.impact}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
        
        {currentPage === 'trades' && (
          <div className="h-full p-4">
            <h2 className="text-2xl font-bold mb-6">AI Trading Activity</h2>
            <div className="bg-black border border-white rounded-lg p-4 mb-6">
              <h3 className="text-xl mb-2">Today's Performance</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-3 bg-black border border-white rounded-md">
                  <div className="text-white/70 text-sm">Initial Capital</div>
                  <div className="text-2xl font-bold">₹10,000</div>
                </div>
                <div className="p-3 bg-black border border-white rounded-md">
                  <div className="text-white/70 text-sm">Current Value</div>
                  <div className="text-2xl font-bold text-nifty-green">₹10,850</div>
                </div>
                <div className="p-3 bg-black border border-white rounded-md">
                  <div className="text-white/70 text-sm">Profit/Loss</div>
                  <div className="text-2xl font-bold text-nifty-green">+₹850 (+8.5%)</div>
                </div>
              </div>
            </div>
            
            <div className="bg-black border border-white rounded-lg p-4">
              <h3 className="text-xl mb-4">Today's Trades</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white">
                      <th className="text-left py-2 px-3">Time</th>
                      <th className="text-left py-2 px-3">Action</th>
                      <th className="text-left py-2 px-3">Contract</th>
                      <th className="text-right py-2 px-3">Price</th>
                      <th className="text-right py-2 px-3">Quantity</th>
                      <th className="text-right py-2 px-3">Result</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { time: "09:32", action: "BUY", contract: "NIFTY 22000 CE", price: "145.50", qty: 25, result: "+₹620" },
                      { time: "10:15", action: "SELL", contract: "NIFTY 22000 CE", price: "170.30", qty: 25, result: "+₹620", isSellTrade: true },
                      { time: "11:45", action: "BUY", contract: "NIFTY 21800 CE", price: "92.70", qty: 50, result: "-₹410" },
                      { time: "12:20", action: "SELL", contract: "NIFTY 21800 CE", price: "84.50", qty: 50, result: "-₹410", isSellTrade: true },
                      { time: "13:45", action: "BUY", contract: "NIFTY 22100 CE", price: "110.25", qty: 40, result: "+₹640" },
                      { time: "14:30", action: "SELL", contract: "NIFTY 22100 CE", price: "126.25", qty: 40, result: "+₹640", isSellTrade: true },
                    ].map((trade, index) => (
                      <tr key={index} className={`border-b border-white/30 ${trade.isSellTrade ? 'bg-white/5' : ''}`}>
                        <td className="py-3 px-3">{trade.time}</td>
                        <td className={`py-3 px-3 ${trade.action === 'BUY' ? 'text-nifty-green' : 'text-nifty-red'}`}>
                          {trade.action}
                        </td>
                        <td className="py-3 px-3">{trade.contract}</td>
                        <td className="py-3 px-3 text-right">{trade.price}</td>
                        <td className="py-3 px-3 text-right">{trade.qty}</td>
                        <td className={`py-3 px-3 text-right ${trade.result.startsWith('+') ? 'text-nifty-green' : 'text-nifty-red'}`}>
                          {trade.result}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
        
        {currentPage === 'insights' && (
          <div className="h-full p-4">
            <h2 className="text-2xl font-bold mb-6">AI Insights</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-black border border-white p-4 rounded-lg">
                <h3 className="text-xl font-bold mb-4">Prediction Accuracy</h3>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="text-3xl font-bold">78.5%</div>
                    <div className="text-white/70">30-day accuracy</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-nifty-green">+2.4%</div>
                    <div className="text-white/70">from previous week</div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Today</span>
                      <span className="text-nifty-green">85%</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div className="bg-nifty-green h-2 rounded-full" style={{ width: "85%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>This Week</span>
                      <span className="text-nifty-green">79%</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div className="bg-nifty-green h-2 rounded-full" style={{ width: "79%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>This Month</span>
                      <span className="text-nifty-green">74%</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div className="bg-nifty-green h-2 rounded-full" style={{ width: "74%" }}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-black border border-white p-4 rounded-lg">
                <h3 className="text-xl font-bold mb-4">Learning Progress</h3>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="text-3xl font-bold">+1,245</div>
                    <div className="text-white/70">Reward Points</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-nifty-green">+248</div>
                    <div className="text-white/70">Today's gain</div>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="text-sm font-semibold mb-1">Top Learning Areas</div>
                  <ul className="space-y-2">
                    <li className="flex justify-between">
                      <span>Pattern recognition</span>
                      <span className="text-nifty-green">+320 points</span>
                    </li>
                    <li className="flex justify-between">
                      <span>News sentiment analysis</span>
                      <span className="text-nifty-green">+285 points</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Volume analysis</span>
                      <span className="text-nifty-green">+210 points</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-black border border-white p-4 rounded-lg lg:col-span-2">
                <h3 className="text-xl font-bold mb-4">Market Pattern Recognition</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="bg-black border border-white p-3 rounded">
                    <div className="font-medium">Double Bottom</div>
                    <div className="flex justify-between mt-1">
                      <span className="text-white/70">Confidence</span>
                      <span className="text-nifty-green">92%</span>
                    </div>
                    <div className="text-white/70 text-sm mt-2">Time frame: 30min chart</div>
                  </div>
                  <div className="bg-black border border-white p-3 rounded">
                    <div className="font-medium">Bullish Engulfing</div>
                    <div className="flex justify-between mt-1">
                      <span className="text-white/70">Confidence</span>
                      <span className="text-nifty-green">87%</span>
                    </div>
                    <div className="text-white/70 text-sm mt-2">Time frame: Daily chart</div>
                  </div>
                  <div className="bg-black border border-white p-3 rounded">
                    <div className="font-medium">Resistance Break</div>
                    <div className="flex justify-between mt-1">
                      <span className="text-white/70">Confidence</span>
                      <span className="text-nifty-green">78%</span>
                    </div>
                    <div className="text-white/70 text-sm mt-2">Time frame: 1hr chart</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-white text-sm text-white/60">
        <div className="flex justify-between items-center">
          <div>Nifty Direction Predictor | {isDemoMode ? 'Demo Mode' : 'Live Mode'}</div>
          <div>Last updated: <span id="current-time">--:--:--</span></div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
