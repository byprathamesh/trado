
import React from 'react';

interface DashboardNavProps {
  currentPage: 'main' | 'analysis' | 'trades' | 'insights';
  setCurrentPage: (page: 'main' | 'analysis' | 'trades' | 'insights') => void;
  isDemoMode: boolean;
  setIsDemoMode: (mode: boolean) => void;
}

const DashboardNav = ({ currentPage, setCurrentPage, isDemoMode, setIsDemoMode }: DashboardNavProps) => {
  return (
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
  );
};

export default DashboardNav;
