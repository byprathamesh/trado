import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Area } from 'recharts';
import styles from './GraphsDisplay.module.css';
import NiftyChart from './NiftyChart';

type TimeFrame = '10s' | '30s' | '1m' | '5m' | '1h' | '1d' | '1w' | '1M' | '1y';

interface GraphsDisplayProps {
  isDemo: boolean;
  isMarketOpen: boolean;
}

const GraphsDisplay: React.FC<GraphsDisplayProps> = ({ isDemo, isMarketOpen }) => {
  const [timeFrame, setTimeFrame] = useState<TimeFrame>('1m');
  const [predictionData, setPredictionData] = useState<any[]>([]);
  
  useEffect(() => {
    const generateInitialPredictionData = () => {
      const now = new Date();
      const data = [];
      let pointCount = 0;
      let timeInterval = 0;
      
      switch(timeFrame) {
        case '10s': pointCount = 10; timeInterval = 1000; break;
        case '30s': pointCount = 30; timeInterval = 1000; break;
        case '1m': pointCount = 60; timeInterval = 1000; break;
        case '5m': pointCount = 60; timeInterval = 5000; break;
        case '1h': pointCount = 60; timeInterval = 60000; break;
        default: pointCount = 60; timeInterval = 1000;
      }
      
      for (let i = pointCount - 1; i >= 0; i--) {
        const time = new Date(now.getTime() - (i * timeInterval));
        const predictionValue = 50 + Math.sin((i + 5) * 0.1) * 30;
        data.push({
          time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          prediction: predictionValue
        });
      }
      return data;
    };
    
    setPredictionData(generateInitialPredictionData());
    
    let interval: number | null = null;
    
    if (isDemo || isMarketOpen) {
      interval = window.setInterval(() => {
        const now = new Date();
        const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        
        const lastPredictionValue = predictionData.length > 0 ? predictionData[predictionData.length - 1].prediction : 50;
        const newPredictionValue = Math.max(0, Math.min(100, lastPredictionValue + (Math.random() - 0.5) * 3));
        
        setPredictionData(prevData => {
          const newData = [...prevData, { time, prediction: newPredictionValue }];
          const maxPoints = timeFrame === '10s' ? 10 : 
                          timeFrame === '30s' ? 30 : 
                          timeFrame === '1m' ? 60 : 
                          timeFrame === '5m' ? 60 : 
                          timeFrame === '1h' ? 60 : 60;
          return newData.slice(-maxPoints);
        });
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timeFrame, isDemo, isMarketOpen]);
  
  return (
    <div className="h-full flex flex-col">
      <div className={styles.chartCard} style={{ flex: 1, display: 'flex', flexDirection: 'column', marginBottom: '1rem' }}>
        {isDemo && (
          <div className={styles.liveBadge}>
            <span className={styles.pulseDot}></span>
            LIVE DEMO
          </div>
        )}
        <div className="flex justify-between items-center mb-1">
          <h3 className="text-lg font-semibold text-white">
            Prediction Probability {isDemo ? '(Demo Data)' : ''}
          </h3>
          <div>
            {(['10s', '30s', '1m', '5m', '1h'] as TimeFrame[]).map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeFrame(tf)}
                className={[
                  styles.timeFrameBtn,
                  timeFrame === tf ? styles.selected : ''
                ].join(' ')}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>
        
        <div style={{ flexGrow: 1 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={predictionData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
              <CartesianGrid stroke="#4A5568" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="time" tick={{ fontSize: 10, fill: '#A0AEC0' }} stroke="#4A5568" />
              <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: '#A0AEC0' }} stroke="#4A5568" />
              <Tooltip 
                contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', borderColor: '#4A5568', color: '#E2E8F0', borderRadius: '0.375rem' }}
                itemStyle={{ color: '#E2E8F0' }}
                labelStyle={{ color: '#E2E8F0', fontWeight: 'bold' }}
                formatter={(value: any) => [`${Number(value).toFixed(1)}%`, 'Probability']}
              />
              <ReferenceLine y={50} stroke="#A0AEC0" strokeDasharray="2 2" />
              <defs>
                <linearGradient id="predictionGradientUp" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#38A169" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#38A169" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="predictionGradientDown" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#E53E3E" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#E53E3E" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Area type="monotone" dataKey="prediction" stroke="#3182CE" fillOpacity={1} fill="url(#predictionGradientUp)" isAnimationActive={false} connectNulls={true} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className={styles.chartCard} style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
         <div className="flex justify-between items-center mb-1">
          <h3 className="text-lg font-semibold text-white">
            Nifty 50 Real-Time Chart
          </h3>
        </div>
        <div style={{ flexGrow: 1, minHeight: '300px' }}>
          <NiftyChart symbol="NSE:NIFTY50" theme="dark" />
        </div>
      </div>
    </div>
  );
};

export default GraphsDisplay;
