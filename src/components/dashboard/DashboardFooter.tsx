
import React from 'react';

interface DashboardFooterProps {
  isDemoMode: boolean;
}

const DashboardFooter = ({ isDemoMode }: DashboardFooterProps) => {
  return (
    <div className="p-4 border-t border-white text-sm text-white/60">
      <div className="flex justify-between items-center">
        <div>Nifty Direction Predictor | {isDemoMode ? 'Demo Mode' : 'Live Mode'}</div>
        <div>Last updated: <span id="current-time">--:--:--</span></div>
      </div>
    </div>
  );
};

export default DashboardFooter;
