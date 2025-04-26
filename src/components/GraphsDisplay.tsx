
import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Area } from 'recharts';
import styles from './GraphsDisplay.module.css';

type TimeFrame = '10s' | '30s' | '1m' | '5m' | '1h' | '1d' | '1w' | '1M' | '1y';

interface GraphsDisplayProps {
  isDemo: boolean;
  isMarketOpen: boolean;
}

const GraphsDisplay: React.FC<GraphsDisplayProps> = ({ isDemo, isMarketOpen }) => {
  const [timeFrame, setTimeFrame] = useState<TimeFrame>('1m');
  const [niftyData, setNiftyData] = useState<any[]>([]);
  const [predictionData, setPredictionData] = useState<any[]>([]);
  
  // Generate mock data for the charts
  useEffect(() => {
    // Initialize with some data points
    const generateInitialData = () => {
      const now = new Date();
      const data = [];
      
      // Generate data points based on selected time frame
      let pointCount = 0;
      let timeInterval = 0;
      
      switch(timeFrame) {
        case '10s':
          pointCount = 10;
          timeInterval = 1000; // 1 second
          break;
        case '30s':
          pointCount = 30;
          timeInterval = 1000; // 1 second
          break;
        case '1m':
          pointCount = 60;
          timeInterval = 1000; // 1 second
          break;
        case '5m':
          pointCount = 60;
          timeInterval = 5000; // 5 seconds
          break;
        case '1h':
          pointCount = 60;
          timeInterval = 60000; // 1 minute
          break;
        default:
          pointCount = 60;
          timeInterval = 1000; // Default
      }
      
      for (let i = pointCount - 1; i >= 0; i--) {
        const time = new Date(now.getTime() - (i * timeInterval));
        
        // Generate somewhat realistic looking data
        // Base value with some noise
        const baseNiftyValue = 22000 + Math.sin(i * 0.1) * 50;
        const niftyValue = baseNiftyValue + (Math.random() - 0.5) * 10;
        
        // Prediction is slightly leading the actual value (for demonstration)
        const predictionValue = 50 + Math.sin((i + 5) * 0.1) * 30;
        
        data.push({
          time: time.toLocaleTimeString(),
          nifty: niftyValue,
          prediction: predictionValue
        });
      }
      
      return data;
    };
    
    // Set initial data
    const initialData = generateInitialData();
    setNiftyData(initialData);
    setPredictionData(initialData);
    
    // Update data every second, but only if in demo mode or market is open
    let interval: number | null = null;
    
    if (isDemo || isMarketOpen) {
      interval = window.setInterval(() => {
        const now = new Date();
        const time = now.toLocaleTimeString();
        
        // Generate new data point
        const lastNiftyValue = niftyData.length > 0 ? niftyData[niftyData.length - 1].nifty : 22000;
        const newNiftyValue = lastNiftyValue + (Math.random() - 0.5) * 5;
        
        const lastPredictionValue = predictionData.length > 0 ? predictionData[predictionData.length - 1].prediction : 50;
        const newPredictionValue = Math.max(0, Math.min(100, lastPredictionValue + (Math.random() - 0.5) * 3));
        
        // Update data arrays
        setNiftyData(prevData => {
          const newData = [...prevData, { time, nifty: newNiftyValue }];
          // Keep only the last N points based on timeframe
          const maxPoints = timeFrame === '10s' ? 10 : 
                          timeFrame === '30s' ? 30 : 
                          timeFrame === '1m' ? 60 : 
                          timeFrame === '5m' ? 60 : 
                          timeFrame === '1h' ? 60 : 60;
          return newData.slice(-maxPoints);
        });
        
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
  }, [timeFrame, isDemo, isMarketOpen, niftyData.length, predictionData.length]);
  
  return (
    <div className="h-full">
      <div className={styles.chartCard}>
        {/* LIVE DEMO badge */}
        <div className={styles.liveBadge}>
          <span className={styles.pulseDot}></span>
          LIVE DEMO
        </div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-extrabold text-[#3a86ff] drop-shadow-sm">
            Nifty & Prediction Charts {!isMarketOpen && isDemo ? '(Demo Mode)' : ''}
            {!isMarketOpen && !isDemo && ' - Market Closed'}
          </h3>
          <div>
            {(['10s', '30s', '1m', '5m', '1h', '1d', '1w', '1M', '1y'] as TimeFrame[]).map((tf) => (
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
        
        <div className="h-64 mb-4">
          <h4 className="text-sm font-medium mb-2">Prediction Probability</h4>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={predictionData}
              margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
            >
              <CartesianGrid stroke="#fff" strokeDasharray="5 5" vertical={false} />
              <XAxis dataKey="time" tick={{ fontSize: 10, fill: '#fff' }} stroke="#fff" />
              <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: '#fff' }} stroke="#fff" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#000', borderColor: '#fff', color: '#fff' }}
                itemStyle={{ color: '#fff' }}
                labelStyle={{ color: '#fff' }}
                formatter={(value: any) => [`${value}%`, 'Probability']}
              />
              <ReferenceLine y={50} stroke="#fff" strokeDasharray="3 3" />
              <Line 
                type="monotone" 
                dataKey="prediction" 
                stroke="#fff" 
                dot={false}
                strokeWidth={2}
                isAnimationActive={false}
              />
              {/* Green area above 50 */}
              <ReferenceLine y={50} ifOverflow="extendDomain">
                <Area 
                  type="monotone" 
                  dataKey="prediction" 
                  stroke="#00FF00" 
                  fill="#00FF00"
                  fillOpacity={0.5}
                  isAnimationActive={false}
                />
              </ReferenceLine>
              {/* Red area below 50 */}
              <ReferenceLine y={50} ifOverflow="extendDomain">
                <Area 
                  type="monotone" 
                  dataKey="prediction" 
                  stroke="#FF4D4D" 
                  fill="#FF4D4D"
                  fillOpacity={0.5}
                  isAnimationActive={false}
                />
              </ReferenceLine>
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="h-64">
          <h4 className="text-sm font-medium mb-2">Nifty Index</h4>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={niftyData}
              margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
            >
              <CartesianGrid stroke="#fff" strokeDasharray="5 5" vertical={false} />
              <XAxis dataKey="time" tick={{ fontSize: 10, fill: '#fff' }} stroke="#fff" />
              <YAxis domain={['auto', 'auto']} tick={{ fontSize: 10, fill: '#fff' }} stroke="#fff" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#000', borderColor: '#fff', color: '#fff' }}
                itemStyle={{ color: '#fff' }}
                labelStyle={{ color: '#fff' }}
                formatter={(value: any) => [`${value.toFixed(2)}`, 'Nifty']}
              />
              <Line 
                type="monotone" 
                dataKey="nifty" 
                stroke="#fff" 
                dot={false}
                strokeWidth={2}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default GraphsDisplay;
