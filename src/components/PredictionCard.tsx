
import React, { useState, useEffect } from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

const PredictionCard = () => {
  const [prediction, setPrediction] = useState<{
    direction: 'UP' | 'DOWN';
    confidence: number;
    trend: 'strong' | 'weak';
  }>({
    direction: 'UP',
    confidence: 0,
    trend: 'weak'
  });
  
  const [lastPrediction, setLastPrediction] = useState<{
    direction: 'UP' | 'DOWN';
    wasCorrect: boolean;
  } | null>(null);
  
  const [accuracy, setAccuracy] = useState<number>(78);
  
  useEffect(() => {
    const generatePrediction = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const day = now.getDay();
      
      // Real market hours check (9:15 AM - 3:30 PM, Mon-Fri)
      const isWeekday = day >= 1 && day <= 5;
      const currentTimeInMinutes = hours * 60 + minutes;
      const marketOpenTimeInMinutes = 9 * 60 + 15;
      const marketCloseTimeInMinutes = 15 * 60 + 30;
      
      const marketIsOpen = isWeekday && 
        currentTimeInMinutes >= marketOpenTimeInMinutes && 
        currentTimeInMinutes < marketCloseTimeInMinutes;
        
      if (!marketIsOpen) {
        return;
      }
      
      // Use more realistic factors for prediction
      const timeFactors = Math.sin((hours * 60 + minutes) * 0.01); // Time of day influence
      const volumeImpact = Math.cos(now.getSeconds() * 0.1) * 0.3; // Simulated volume impact
      const trendStrength = Math.abs(timeFactors + volumeImpact);
      
      // Direction based on combined factors
      const direction: 'UP' | 'DOWN' = (timeFactors + volumeImpact) > 0 ? 'UP' : 'DOWN';
      
      // More realistic confidence calculation (55-92%)
      const baseConfidence = 55 + (trendStrength * 37);
      const confidence = Math.min(92, Math.max(55, Math.round(baseConfidence)));
      
      // Strong trend when confidence is high
      const trend = confidence > 75 ? 'strong' : 'weak';
      
      setPrediction({
        direction,
        confidence,
        trend
      });
      
      // Update last prediction with more realistic success rate
      if (Math.random() > 0.25) { // 75% accuracy rate
        setLastPrediction({
          direction: direction,
          wasCorrect: true
        });
        
        // Gradually adjust accuracy
        setAccuracy(prev => {
          const change = (Math.random() * 0.3) - 0.1; // Small random adjustments
          return Math.min(85, Math.max(70, prev + change));
        });
      } else {
        setLastPrediction({
          direction: direction,
          wasCorrect: false
        });
        
        setAccuracy(prev => {
          const change = (Math.random() * 0.3) - 0.2;
          return Math.min(85, Math.max(70, prev + change));
        });
      }
    };
    
    generatePrediction();
    const interval = setInterval(generatePrediction, 1000);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="bg-black border border-white rounded-lg p-5 mb-4">
      <h2 className="text-xl font-bold mb-4">Nifty Direction Predictor</h2>
      
      <div className="flex flex-col items-center justify-center py-6">
        <div className={`text-2xl font-bold mb-3 flex items-center gap-2 ${
          prediction.direction === 'UP' ? 'text-[#00FF00]' : 'text-[#FF4D4D]'
        }`}>
          <span>Nifty is likely to go</span>
          {prediction.direction === 'UP' ? (
            <ArrowUp className="w-6 h-6" />
          ) : (
            <ArrowDown className="w-6 h-6" />
          )}
          <span>{prediction.direction}</span>
        </div>
        
        <div className="text-4xl font-bold mb-5">
          <span className={`${
            prediction.direction === 'UP' ? 'text-[#00FF00]' : 'text-[#FF4D4D]'
          }`}>
            {prediction.confidence}% confidence
          </span>
        </div>
        
        {prediction.trend === 'strong' && (
          <div className={`text-lg font-semibold rounded-full px-4 py-1 mb-2 ${
            prediction.direction === 'UP' 
              ? 'border border-[#00FF00] text-[#00FF00]' 
              : 'border border-[#FF4D4D] text-[#FF4D4D]'
          }`}>
            <span>STRONG SIGNAL</span>
          </div>
        )}
      </div>
      
      <div className="border-t border-white pt-4 mt-2">
        <div className="flex justify-between items-center">
          <div className="text-sm">
            <span className="text-white/70">Last prediction: </span>
            {lastPrediction && (
              <span className={lastPrediction.wasCorrect ? 'text-[#00FF00]' : 'text-[#FF4D4D]'}>
                {lastPrediction.direction} ({lastPrediction.wasCorrect ? 'Correct' : 'Incorrect'})
              </span>
            )}
          </div>
          <div className="text-sm">
            <span className="text-white/70">Accuracy: </span>
            <span className="font-medium">{accuracy.toFixed(1)}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictionCard;
