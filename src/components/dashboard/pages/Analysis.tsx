import React from 'react';

const Analysis = () => {
  return (
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
  );
};

export default Analysis;
