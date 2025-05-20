import React, { useEffect, useRef, memo } from 'react';

interface TradingViewWidgetProps {
  symbol?: string;
  theme?: string;
  width?: string;
  height?: string;
  locale?: string;
  toolbar_bg?: string;
  enable_publishing?: boolean;
  allow_symbol_change?: boolean;
  container_id_suffix?: string; // To ensure unique ID if multiple charts are on a page
}

const NiftyChart: React.FC<TradingViewWidgetProps> = memo(({
  symbol = "NSE:NIFTY50",
  theme = "dark",
  width = "100%",
  height = "100%", // Make sure parent has height
  locale = "en",
  toolbar_bg = "#0d1117", // Darker background for toolbar
  enable_publishing = false,
  allow_symbol_change = true,
  container_id_suffix = 'nifty',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  // Use a more specific and stable ID for the script to avoid duplication
  const scriptId = 'tradingview-widget-script-loader';
  const widgetContainerId = `tradingview-widget-container-${container_id_suffix}`;

  useEffect(() => {
    const currentRef = containerRef.current;
    if (!currentRef) return;

    // Function to initialize the widget
    const initWidget = () => {
      // Clear previous widget if any, to prevent duplicates on HMR or re-render
      if (currentRef) {
        currentRef.innerHTML = '';
      }
      if ((window as any).TradingView && currentRef) {
        new (window as any).TradingView.widget({
          width: width,
          height: height,
          symbol: symbol,
          interval: "1", // 1 minute interval, user can change
          timezone: "Asia/Kolkata",
          theme: theme,
          style: "1", // Bar style, 1 for Bars, 2 for Candles, etc.
          locale: locale,
          toolbar_bg: toolbar_bg,
          enable_publishing: enable_publishing,
          allow_symbol_change: allow_symbol_change,
          container_id: widgetContainerId,
          autosize: true, // This should make it responsive, but explicit width/height helps
        });
      }
    };

    // Check if the TradingView script is already loaded
    if (document.getElementById(scriptId)) {
      // If script is loaded, but window.TradingView might not be ready immediately
      if ((window as any).TradingView) {
        initWidget();
      } else {
        // Wait for the script to fully initialize TradingView on window
        const scriptElement = document.getElementById(scriptId);
        scriptElement?.addEventListener('load', initWidget, { once: true });
      }
    } else {
      // If script not loaded, create and append it
      const script = document.createElement('script');
      script.id = scriptId;
      script.type = 'text/javascript';
      script.src = 'https://s3.tradingview.com/tv.js';
      script.async = true;
      script.onload = initWidget; // Initialize widget after script loads
      document.head.appendChild(script);
    }

    return () => {
      // Cleanup: remove the widget container's content if ref is still valid
      // The script itself is loaded once and stays in document.head
      if (currentRef) {
        // currentRef.innerHTML = ''; // This can help clean up the widget
      }
    };
    // Added dependencies to re-run effect if essential props change
  }, [symbol, theme, width, height, locale, toolbar_bg, enable_publishing, allow_symbol_change, widgetContainerId]);

  return (
    <div id={widgetContainerId} ref={containerRef} style={{ width: '100%', height: 'calc(100% - 40px)' }}>
      {/* TradingView widget will be injected here by the script */}
      {/* The style above assumes the title takes 40px, adjust as needed */}
    </div>
  );
});

NiftyChart.displayName = 'NiftyChart';

export default NiftyChart; 