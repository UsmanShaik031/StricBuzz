import React, { useEffect, useState } from 'react';
import './LoadingScreen.css';

const LoadingScreen = ({ onFinish }) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Start fade-out shortly after mounting (e.g., simulate loading)
    const timer = setTimeout(() => {
      setFadeOut(true);

      // Completely remove the loading screen after fade-out animation
      const removeTimer = setTimeout(() => {
        if (onFinish) onFinish();
      }, 300); // Match fade-out duration in CSS

      return () => clearTimeout(removeTimer);
    }, 800); // Wait for your SVG animation duration (1.5s for now)

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className={`loading-screen ${fadeOut ? 'fade-out' : ''}`}>
      <img
        src="/assets/Pulse@1x-1.0s-200px-200px.svg"
        alt="Loading..."
        className="svg-loader"
      />
    </div>
  );
};

export default LoadingScreen;
