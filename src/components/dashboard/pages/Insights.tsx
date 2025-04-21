import React from 'react';

const Insights = () => {
  return (
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
  );
};

export default Insights;
