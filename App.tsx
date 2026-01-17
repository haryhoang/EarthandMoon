import React, { useRef, useEffect } from 'react';
import SpaceSimulation from './SpaceSimulation';
import Starfield from './Starfield';

const App: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rotationRef = useRef({ x: 15, y: 0 }); 
  const earthSpinRef = useRef(0);
  const isDragging = useRef(false);
  const lastMousePos = useRef({ x: 0, y: 0 });
  const requestRef = useRef<number | null>(null);

  const updateCSSVariables = () => {
    const container = containerRef.current;
    if (!container) return;
    
    container.style.setProperty('--rx', `${rotationRef.current.x}deg`);
    container.style.setProperty('--ry', `${rotationRef.current.y}deg`);
    container.style.setProperty('--map-x', `${rotationRef.current.y * 0.5 + earthSpinRef.current}%`);
    container.style.setProperty('--map-y', `${50 + rotationRef.current.x * 0.5}%`);
    container.style.setProperty('--ry-raw', `${rotationRef.current.y}`);
    container.style.setProperty('--rx-raw', `${rotationRef.current.x}`);
  };

  useEffect(() => {
    const animate = () => {
      earthSpinRef.current += 0.04; 
      
      if (!isDragging.current) {
        rotationRef.current.y += 0.025; 
      }
      updateCSSVariables();
      requestRef.current = requestAnimationFrame(animate);
    };
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const deltaX = e.clientX - lastMousePos.current.x;
    const deltaY = e.clientY - lastMousePos.current.y;
    
    rotationRef.current.x = Math.max(-85, Math.min(85, rotationRef.current.x - deltaY * 0.12));
    rotationRef.current.y += deltaX * 0.12;
    
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  return (
    <div 
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden bg-black cursor-grab active:cursor-grabbing touch-none [--rx:15deg] [--ry:0deg] [--map-x:0%] [--map-y:50%] [--ry-raw:0] [--rx-raw:0]"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      <Starfield />
      <SpaceSimulation />

 
      <div className="fixed inset-x-0 bottom-10 z-40 pointer-events-none flex flex-col items-center gap-2">
        <p className="text-white/10 text-[8px] tracking-[1.2em] uppercase font-light animate-pulse">
          Your Eternal Galaxy
        </p>
      </div>
      
      {/* Vignette effect */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,_transparent_50%,_black_140%)] z-30" />
    </div>
  );
};

export default App;
