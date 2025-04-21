
import React from 'react';

const Trades = () => {
  return (
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
  );
};

export default Trades;
