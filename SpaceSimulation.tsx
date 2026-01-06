
import React from 'react';

const SpaceSimulation: React.FC = () => {
  const text = "CHÚC CẬU Ở KHOẢNH TRỜI NÀO CŨNG CÓ THỂ TỎA SÁNG • ";
  const repeatedText = text.repeat(3);
  const characters = repeatedText.split("");
  const radius = window.innerWidth < 768 ? 160 : 260;

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-[#000105] flex items-center justify-center">
      {/* Background Nebulas */}
      <div 
        className="absolute inset-0 opacity-20 mix-blend-screen scale-150 pointer-events-none"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=2022&auto=format&fit=crop')`,
          backgroundSize: 'cover',
          filter: 'hue-rotate(0deg) brightness(0.4)'
        }}
      />

      <div className="relative w-full h-full flex items-center justify-center perspective-[1500px]">
        {/* Central Planet (Earth) */}
        <div className="relative z-20 flex items-center justify-center preserve-3d">
          <div 
            className="relative w-44 h-44 md:w-64 md:h-64 rounded-full shadow-[0_0_80px_rgba(34,100,255,0.2)] preserve-3d"
          >
            <div className="absolute inset-0 rounded-full overflow-hidden border border-white/5 z-10">
               <div 
                 className="absolute inset-0 bg-cover bg-center animate-[earthSpin_120s_linear_infinite]"
                 style={{
                   backgroundImage: `url('https://www.solarsystemscope.com/textures/download/2k_earth_daymap.jpg')`,
                   backgroundSize: '200% 100%'
                 }}
               />
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_25%,_transparent_0%,_rgba(0,0,0,0.9)_100%)]" />
            </div>
          </div>

          {/* Tilted Rotating Belt (22 degrees) */}
          <div className="absolute preserve-3d animate-[ringOrbitTilted_40s_linear_infinite] pointer-events-none">
            {characters.map((char, i) => {
              const angle = (i / characters.length) * 360;
              return (
                <span
                  key={i}
                  className="absolute left-1/2 top-1/2 text-blue-100 text-[10px] md:text-[13px] font-semibold whitespace-nowrap uppercase tracking-[0.3em] drop-shadow-[0_0_8px_rgba(191,219,254,0.8)]"
                  style={{
                    transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                    transformOrigin: 'center center',
                    marginTop: '-0.5em',
                    marginLeft: '-0.25em'
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              );
            })}
          </div>
        </div>

        {/* Orbiting Moon */}
        <div className="absolute w-[800px] h-[800px] md:w-[1100px] md:h-[1100px] animate-[moonOrbit_60s_linear_infinite] preserve-3d pointer-events-none">
          <div className="absolute top-1/2 left-0 -translate-y-1/2">
            <div className="w-10 h-10 md:w-16 md:h-16 rounded-full bg-[#ccc] shadow-[inset_-5px_-5px_15px_rgba(0,0,0,0.8),0_0_20px_rgba(255,255,255,0.1)] overflow-hidden">
               <div 
                 className="absolute inset-0 opacity-40 mix-blend-multiply"
                 style={{
                    backgroundImage: `url('https://www.solarsystemscope.com/textures/download/2k_moon.jpg')`,
                    backgroundSize: 'cover'
                 }}
               />
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .preserve-3d { transform-style: preserve-3d; }
        
        @keyframes moonOrbit {
          from { transform: rotateX(75deg) rotateY(15deg) rotate(0deg); }
          to { transform: rotateX(75deg) rotateY(15deg) rotate(360deg); }
        }

        @keyframes ringOrbitTilted {
          from { transform: rotateX(22deg) rotateY(0deg); }
          to { transform: rotateX(22deg) rotateY(-360deg); }
        }

        @keyframes earthSpin {
          from { background-position: 0% center; }
          to { background-position: 200% center; }
        }
      `}} />
    </div>
  );
};

export default SpaceSimulation;
