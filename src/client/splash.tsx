import './index.css';
import { requestExpandedMode } from '@devvit/web/client';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

export const Splash = () => {
  return (
    <div className="foocos-container" style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
      
      {/* GLOWING LOGO */}
      <h1 className="logo" style={{ fontSize: '3.5rem', marginBottom: '10px' }}>
        FOOCOS
      </h1>
      
      {/* SUBTITLE */}
      <p style={{ color: '#888', fontFamily: 'monospace', marginBottom: '40px', letterSpacing: '2px' }}>
        PRECISION TIMING TEST
      </p>

      {/* START BUTTON */}
      <button
        className="btn-start"
        style={{ 
          flexGrow: 0, 
          width: 'auto', 
          padding: '15px 50px', 
          fontSize: '1.5rem',
          boxShadow: '0 0 20px rgba(255, 255, 255, 0.2)'
        }}
        onClick={(e) => requestExpandedMode(e.nativeEvent, 'game')}
      >
        START
      </button>

    </div>
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Splash />
  </StrictMode>
);