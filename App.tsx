
import React from 'react';
import SpaceSimulation from './SpaceSimulation';
import Starfield from './Starfield';

const App: React.FC = () => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#000105]">
      {/* Background Starfield */}
      <Starfield />
      
      {/* Simulation Layer */}
      <SpaceSimulation />

      {/* Decorative Labels */}
      <div className="fixed top-10 left-10 z-50 opacity-30 pointer-events-none">
        <div className="flex flex-col gap-1">
          <p className="text-[10px] text-blue-100 tracking-[0.8em] uppercase font-light">Galaxy Gift</p>
          <div className="h-[1px] w-12 bg-blue-400/30"></div>
          <p className="text-[8px] text-blue-400/40 tracking-[0.4em] uppercase">Status: Eternal</p>
        </div>
      </div>

      {/* UI Vignette */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.6)_100%)] z-30" />
      
      <div className="fixed inset-6 border border-white/[0.03] pointer-events-none z-40 rounded-[2.5rem]" />
    </div>
  );
};

export default App;
