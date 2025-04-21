import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Legend } from 'recharts';

type TimeFrame = '10s' | '30s' | '1m' | '5m' | '1h' | '1d' | '1w' | '1M' | '1y';

const GraphsDisplay = () => {
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
    
    // Update data every second
    const interval = setInterval(() => {
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
    
    return () => clearInterval(interval);
  }, [timeFrame]);
  
  return (
    <div className="h-full">
      <div className="bg-gray-900 rounded-lg p-4 mb-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">Nifty & Prediction Charts</h3>
          <div className="flex gap-2">
            {(['10s', '30s', '1m', '5m', '1h', '1d', '1w', '1M', '1y'] as TimeFrame[]).map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeFrame(tf)}
                className={`px-2 py-1 text-xs rounded ${
                  timeFrame === tf ? 'bg-gray-700' : 'bg-gray-800 hover:bg-gray-700'
                }`}
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
              <CartesianGrid stroke="#444" strokeDasharray="5 5" vertical={false} />
              <XAxis dataKey="time" tick={{ fontSize: 10 }} stroke="#666" />
              <YAxis domain={[0, 100]} tick={{ fontSize: 10 }} stroke="#666" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#222', borderColor: '#444' }}
                formatter={(value: any) => [`${value}%`, 'Probability']}
              />
              <ReferenceLine y={50} stroke="#666" strokeDasharray="3 3" />
              <defs>
                <linearGradient id="gradientUp" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(0,255,0,0.8)" />
                  <stop offset="100%" stopColor="rgba(0,255,0,0)" />
                </linearGradient>
                <linearGradient id="gradientDown" x1="0" y1="1" x2="0" y2="0">
                  <stop offset="0%" stopColor="rgba(255,77,77,0.8)" />
                  <stop offset="100%" stopColor="rgba(255,77,77,0)" />
                </linearGradient>
              </defs>
              <Line 
                type="monotone" 
                dataKey="prediction" 
                stroke="#FFF" 
                dot={false}
                strokeWidth={2}
                isAnimationActive={false}
              />
              {/* Green area above 50 */}
              <ReferenceLine y={50} ifOverflow="extendDomain">
                <defs>
                  <clipPath id="clipAbove">
                    <rect x="0" y="0" width="100%" height="50%" />
                  </clipPath>
                </defs>
                <Line 
                  type="monotone" 
                  dataKey="prediction" 
                  stroke="none" 
                  fill="url(#gradientUp)"
                  fillOpacity={0.5}
                  isAnimationActive={false}
                  clipPath="url(#clipAbove)"
                />
              </ReferenceLine>
              {/* Red area below 50 */}
              <ReferenceLine y={50} ifOverflow="extendDomain">
                <defs>
                  <clipPath id="clipBelow">
                    <rect x="0" y="50%" width="100%" height="50%" />
                  </clipPath>
                </defs>
                <Line 
                  type="monotone" 
                  dataKey="prediction" 
                  stroke="none" 
                  fill="url(#gradientDown)"
                  fillOpacity={0.5}
                  isAnimationActive={false}
                  clipPath="url(#clipBelow)"
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
              <CartesianGrid stroke="#444" strokeDasharray="5 5" vertical={false} />
              <XAxis dataKey="time" tick={{ fontSize: 10 }} stroke="#666" />
              <YAxis domain={['auto', 'auto']} tick={{ fontSize: 10 }} stroke="#666" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#222', borderColor: '#444' }}
                formatter={(value: any) => [`${value.toFixed(2)}`, 'Nifty']}
              />
              <Line 
                type="monotone" 
                dataKey="nifty" 
                stroke="#FFF" 
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
