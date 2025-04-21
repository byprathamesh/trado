
import React from 'react';
import PredictionCard from '../../PredictionCard';
import TradingPerformance from '../../TradingPerformance';
import GraphsDisplay from '../../GraphsDisplay';

interface MainProps {
  isMarketOpen: boolean;
  isDemoMode: boolean;
}

const Main = ({ isMarketOpen, isDemoMode }: MainProps) => {
  return (
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
  );
};

export default Main;
