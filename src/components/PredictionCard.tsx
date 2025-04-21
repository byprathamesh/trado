
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
    // Function to generate a simulated prediction
    const generatePrediction = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const day = now.getDay(); // 0 is Sunday, 1 is Monday, etc.
      
      // Check if market is open (Mon-Fri, 9:15 AM - 3:30 PM)
      const isWeekday = day >= 1 && day <= 5;
      const currentTimeInMinutes = hours * 60 + minutes;
      const marketOpenTimeInMinutes = 9 * 60 + 15;
      const marketCloseTimeInMinutes = 15 * 60 + 30;
      
      const marketIsOpen = isWeekday && 
        currentTimeInMinutes >= marketOpenTimeInMinutes && 
        currentTimeInMinutes < marketCloseTimeInMinutes;
        
      if (!marketIsOpen) {
        // If market is closed, don't update prediction
        return;
      }
      
      // For demo, generate somewhat realistic looking data
      const nowSecs = now.getSeconds();
      const sinValue = Math.sin(nowSecs * 0.1); // Creates a wave pattern
      
      // Generate direction based on sine wave
      const direction: 'UP' | 'DOWN' = sinValue > 0 ? 'UP' : 'DOWN';
      
      // Generate confidence value (50-95%)
      const baseConfidence = 65 + Math.abs(sinValue) * 30;
      const confidence = Math.min(95, Math.max(50, Math.round(baseConfidence)));
      
      // Determine if this is a "strong" signal (high confidence)
      const trend = confidence > 80 ? 'strong' : 'weak';
      
      // Update state with new prediction
      setPrediction({
        direction,
        confidence,
        trend
      });
      
      // Simulate last prediction result
      if (Math.random() > 0.3) { // 70% chance of being correct for demo
        setLastPrediction({
          direction: Math.random() > 0.5 ? 'UP' : 'DOWN',
          wasCorrect: true
        });
        
        // Occasionally update accuracy
        if (Math.random() > 0.9) {
          setAccuracy(prev => Math.min(92, Math.max(65, prev + (Math.random() > 0.5 ? 0.5 : -0.3))));
        }
      } else {
        setLastPrediction({
          direction: Math.random() > 0.5 ? 'UP' : 'DOWN',
          wasCorrect: false
        });
        
        // Occasionally update accuracy
        if (Math.random() > 0.9) {
          setAccuracy(prev => Math.min(92, Math.max(65, prev + (Math.random() > 0.5 ? -0.5 : 0.3))));
        }
      }
    };
    
    // Set initial prediction
    generatePrediction();
    
    // Update prediction every second
    const interval = setInterval(generatePrediction, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="bg-gray-900 rounded-lg p-5 mb-4 animate-pulse-subtle">
      <h2 className="text-xl font-bold mb-4">Nifty Direction Predictor</h2>
      
      <div className="flex flex-col items-center justify-center py-6">
        <div className={`text-2xl font-bold mb-3 flex items-center gap-2 ${
          prediction.direction === 'UP' ? 'text-nifty-green' : 'text-nifty-red'
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
            prediction.direction === 'UP' ? 'text-nifty-green' : 'text-nifty-red'
          }`}>
            {prediction.confidence}% confidence
          </span>
        </div>
        
        {prediction.trend === 'strong' && (
          <div className={`text-lg font-semibold rounded-full px-4 py-1 mb-2 ${
            prediction.direction === 'UP' 
              ? 'bg-green-950 text-nifty-green border border-nifty-green' 
              : 'bg-red-950 text-nifty-red border border-nifty-red'
          }`}>
            <span>STRONG SIGNAL</span>
          </div>
        )}
      </div>
      
      <div className="border-t border-gray-800 pt-4 mt-2">
        <div className="flex justify-between items-center">
          <div className="text-sm">
            <span className="text-gray-400">Last prediction: </span>
            {lastPrediction && (
              <span className={lastPrediction.wasCorrect ? 'text-nifty-green' : 'text-nifty-red'}>
                {lastPrediction.direction} ({lastPrediction.wasCorrect ? 'Correct' : 'Incorrect'})
              </span>
            )}
          </div>
          <div className="text-sm">
            <span className="text-gray-400">Accuracy: </span>
            <span className="font-medium">{accuracy.toFixed(1)}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictionCard;
