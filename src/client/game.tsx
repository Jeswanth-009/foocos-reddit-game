import { useState, useRef, useEffect, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { showToast } from '@devvit/web/client';
import './index.css';

// FIX 1: Export the component to satisfy the "Fast Refresh" warning
export const Game = () => {
  const [targetTime, setTargetTime] = useState<string>("5.00");
  const [isPlaying, setIsPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [result, setResult] = useState<number | null>(null);
  const [isBlind, setIsBlind] = useState(false);

  const startTimeRef = useRef<number>(0);

  // FIX 2: Move the loop into useEffect to satisfy the "Impure Function" error
  useEffect(() => {
    let animationFrameId: number;

    const updateTimer = () => {
      const now = performance.now();
      const currentElapsed = (now - startTimeRef.current) / 1000;
      setElapsed(currentElapsed);
      animationFrameId = requestAnimationFrame(updateTimer);
    };

    if (isPlaying) {
      // Start the loop only when playing
      animationFrameId = requestAnimationFrame(updateTimer);
    }

    // Cleanup function stops the loop when isPlaying becomes false
    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [isPlaying]);

  const handleStart = () => {
    const target = parseFloat(targetTime);
    if (isNaN(target) || target <= 0) return;

    setResult(null);
    setElapsed(0);
    // Set the start time NOW, then enable the loop
    startTimeRef.current = performance.now();
    setIsPlaying(true);
  };

  const handleStop = () => {
    setIsPlaying(false); // This triggers the useEffect cleanup
    
    // Calculate final time instantly for precision
    const now = performance.now();
    const finalTime = (now - startTimeRef.current) / 1000;
    
    setElapsed(finalTime);
    setResult(finalTime);

    // Score Logic
    const targetNum = parseFloat(targetTime) || 5;
    const diff = Math.abs(finalTime - targetNum);

    if (diff < 0.010) {
      showToast({ text: '🏆 GOD MODE ACHIEVED!', appearance: 'success' });
    } else if (diff < 0.050) {
      showToast({ text: 'So close! Great focus.', appearance: 'neutral' });
    }
  };

  const fmt = (n: number) => n.toFixed(3);

  // UI Logic
  const targetNum = parseFloat(targetTime) || 5;
  const isHidden = isBlind && isPlaying && elapsed > (targetNum * 0.5);
  const diff = result !== null ? Math.abs(result - targetNum) : 0;
  const isGodMode = result !== null && diff < 0.010;

  return (
    <div className="foocos-container">
      <header className="header">
        <h1 className="logo">FOOCOS</h1>
        <div className="toggle-container">
          <label className={`toggle-label ${isBlind ? 'active' : ''}`}>
            <input 
              type="checkbox" 
              checked={isBlind} 
              onChange={(e) => setIsBlind(e.target.checked)} 
            />
            <span className="toggle-text">BLIND MODE</span>
          </label>
        </div>
      </header>

      <main className="game-area">
        <div className={`timer-display ${isHidden ? 'blurred' : ''} ${isGodMode ? 'god-text' : ''}`}>
           {isHidden ? "FOCUS..." : fmt(elapsed)}
           <span className="unit">s</span>
        </div>

        {result !== null && !isPlaying && (
          <div className={`result-card ${isGodMode ? 'god-mode-card' : ''}`}>
            <div className="result-label">YOU STOPPED AT</div>
            <div className="result-time">{fmt(result)}s</div>
            <div className="result-diff">
              {result > targetNum ? "+" : "-"}{fmt(diff)}s
            </div>
            {isGodMode && <div className="god-badge">🏆 PERFECT FOCUS 🏆</div>}
          </div>
        )}
      </main>

      <footer className="controls">
        {!isPlaying ? (
          <div className="setup-panel">
             <div className="input-wrapper">
               <label>TARGET TIME</label>
               <input 
                 type="number" 
                 value={targetTime} 
                 onChange={(e) => setTargetTime(e.target.value)}
                 step="0.5"
               />
             </div>
             <button className="btn-start" onClick={handleStart}>START FOCUS</button>
          </div>
        ) : (
          <button 
            className="btn-stop" 
            onMouseDown={handleStop}
            onTouchStart={handleStop}
          >
            STOP
          </button>
        )}
      </footer>
    </div>
  );
};

// Mount the app
const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <Game />
    </StrictMode>
  );
}