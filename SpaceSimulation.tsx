
import React from 'react';

const SpaceSimulation: React.FC = () => {
  const text = " Sinh nhật vui vẻ  ";
  const repeatedText = text.repeat(3);
  const characters = repeatedText.split("");
  const radius = window.innerWidth < 768 ? 160 : 260;

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-[#000105] flex items-center justify-center">
      <div 
        className="absolute inset-0 opacity-10 mix-blend-screen scale-125 pointer-events-none"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1464802686167-b939a67e06a1?q=80&w=2069&auto=format&fit=crop')`,
          backgroundSize: 'cover',
          filter: 'hue-rotate(10deg) brightness(0.4) saturate(0.6)'
        }}
      />

      <div className="relative w-full h-full flex items-center justify-center perspective-[2000px]">
        <div className="relative z-20 flex items-center justify-center preserve-3d scale-90 md:scale-100">
          <div 
            className="relative w-56 h-56 md:w-72 md:h-72 rounded-full shadow-[0_0_100px_rgba(34,100,255,0.15)] preserve-3d"
          >
            <div className="absolute inset-0 rounded-full overflow-hidden border border-white/5 z-10">
               <div 
                 className="absolute inset-0 bg-cover bg-center animate-[earthSpin_240s_linear_infinite]"
                 style={{
                   backgroundImage: `url('https://www.solarsystemscope.com/textures/download/2k_earth_daymap.jpg')`,
                   backgroundSize: '200% 100%'
                 }}
               />
               <div 
                 className="absolute inset-0 bg-cover bg-center animate-[earthSpin_180s_linear_infinite] opacity-30 mix-blend-screen scale-105"
                 style={{
                   backgroundImage: `url('https://www.solarsystemscope.com/textures/download/2k_earth_clouds.jpg')`,
                   backgroundSize: '200% 100%'
                 }}
               />
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,_transparent_10%,_rgba(0,0,0,0.95)_90%)]" />
            </div>

            <div className="absolute -inset-4 rounded-full bg-blue-500/10 blur-2xl animate-pulse" />
          </div>
          <div className="absolute preserve-3d animate-[ringOrbitTilted_60s_linear_infinite] pointer-events-none">
            {characters.map((char, i) => {
              const angle = (i / characters.length) * 360;
              return (
                <span
                  key={i}
                  className="absolute left-1/2 top-1/2 text-blue-100/60 text-[10px] md:text-[11px] font-light whitespace-nowrap uppercase tracking-[0.4em] drop-shadow-[0_0_5px_rgba(191,219,254,0.3)]"
                  style={{
                    transform: `rotateY(${angle}deg) translateZ(${radius}px) rotateX(-10deg)`,
                    transformOrigin: 'center center',
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              );
            })}
          </div>
        </div>

        {/* MẶT TRĂNG SIÊU THỰC */}
        <div className="absolute w-[850px] h-[850px] md:w-[1200px] md:h-[1200px] animate-[moonOrbit_100s_linear_infinite] preserve-3d pointer-events-none">
          <div className="absolute top-1/2 left-0 -translate-y-1/2">
            <div className="relative w-12 h-12 md:w-20 md:h-20 rounded-full shadow-[0_0_40px_rgba(255,255,255,0.08)] preserve-3d">
               <div className="absolute inset-0 rounded-full overflow-hidden shadow-inner-lg">
                  <div 
                    className="absolute inset-0 bg-cover bg-center animate-[moonRotation_160s_linear_infinite]"
                    style={{
                        backgroundImage: `url('https://www.solarsystemscope.com/textures/download/2k_moon.jpg')`,
                        backgroundSize: '200% 100%',
                        filter: 'contrast(1.3) brightness(0.9) grayscale(0.1)'
                    }}
                  />
                  
                  <div className="absolute inset-0 bg-[linear-gradient(110deg,_transparent_20%,_rgba(0,0,0,0.85)_50%,_rgba(0,0,0,0.98)_100%)] z-10" />
                  
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_90%_50%,_rgba(34,100,255,0.06)_0%,_transparent_60%)] z-10" />
               </div>
               
               <div className="absolute -inset-2 rounded-full blur-lg bg-white/5 opacity-40 -z-10" />
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .preserve-3d { transform-style: preserve-3d; }
        
        @keyframes moonOrbit {
          from { transform: rotateX(80deg) rotateY(10deg) rotate(0deg); }
          to { transform: rotateX(80deg) rotateY(10deg) rotate(360deg); }
        }

        @keyframes ringOrbitTilted {
          from { transform: rotateX(25deg) rotateY(0deg); }
          to { transform: rotateX(25deg) rotateY(-360deg); }
        }

        @keyframes earthSpin {
          from { background-position: 0% center; }
          to { background-position: 200% center; }
        }

        @keyframes moonRotation {
          from { background-position: 0% center; }
          to { background-position: -200% center; }
        }

        .shadow-inner-lg {
          box-shadow: inset 5px 5px 15px rgba(255,255,255,0.05), inset -10px -10px 20px rgba(0,0,0,0.8);
        }
      `}} />
    </div>
  );
};

export default SpaceSimulation;
