
import React from 'react';

const SpaceSimulation: React.FC = () => {
  const text = "Chuc mung sinh nhat nhe ";
  const repeatedText = text.repeat(3); 
  const characters = repeatedText.split("");
  

  const ringRadius = window.innerWidth < 768 ? 240 : 450;
  const moonOrbitRadiusX = window.innerWidth < 768 ? 420 : 650;
  const moonOrbitRadiusY = moonOrbitRadiusX * 0.55;

  return (
    <div className="fixed inset-0 z-20 overflow-hidden pointer-events-none flex items-center justify-center bg-transparent">
      {/* 3D Scene Container */}
      <div 
        className="relative w-full h-full flex items-center justify-center preserve-3d"
        style={{ 
          transform: `perspective(2000px) rotateX(var(--rx)) rotateY(var(--ry))` 
        } as React.CSSProperties}
      >
        
        <div className="relative flex items-center justify-center preserve-3d">
          
          {/* VISUAL ORBIT PATH  */}
          <div 
            className="absolute border border-white/5 rounded-[50%] pointer-events-none"
            style={{
              width: `${moonOrbitRadiusX * 2}px`,
              height: `${moonOrbitRadiusY * 2}px`,
              transform: 'rotateX(75deg) rotateY(-10deg)',
              borderWidth: '0.5px',
            }}
          />

          {/*  3D EARTH SYSTEM */}
          <div className="relative preserve-3d">
            {/* Atmosphere Glow Layer */}
            <div className="absolute inset-[-30px] rounded-full bg-blue-500/10 blur-[50px]" />
            <div className="absolute inset-[-3px] rounded-full shadow-[0_0_40px_rgba(147,197,253,0.4)] z-30" />

            {/* EARTH Body */}
            <div 
              className="relative w-56 h-56 md:w-80 md:h-80 rounded-full preserve-3d will-change-transform"
              style={{ 
                transform: `rotateY(calc(-1 * var(--ry))) rotateX(calc(-1 * var(--rx)))` 
              } as React.CSSProperties}
            >
              <div className="absolute inset-0 rounded-full overflow-hidden border border-white/10 shadow-[25px_25px_80px_rgba(0,0,0,0.9)] bg-black">
                 {/* Lớp Địa hình */}
                 <div 
                   className="absolute inset-0 bg-cover bg-center"
                   style={{
                     backgroundImage: `url('https://www.solarsystemscope.com/textures/download/2k_earth_daymap.jpg')`,
                     backgroundSize: '200% 100%',
                     backgroundPosition: `var(--map-x) center`,
                   } as React.CSSProperties}
                 />

                 {/*  (Parallax) */}
                 <div 
                   className="absolute inset-0 bg-cover bg-center opacity-50 mix-blend-screen scale-105"
                   style={{
                     backgroundImage: `url('https://www.solarsystemscope.com/textures/download/2k_earth_clouds.jpg')`,
                     backgroundSize: '200% 100%',
                     backgroundPosition: `calc(var(--map-x) * 1.15) center`,
                   } as React.CSSProperties}
                 />

                 {/* Đổ bóng 3D chân thực */}
                 <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,_rgba(255,255,255,0.1)_0%,_transparent_45%,_rgba(0,0,0,0.98)_95%)] z-10" />
              </div>
            </div>
          </div>

          {/* REVERSED & OUTWARD FACING QUOTE RING */}
          <div 
            className="absolute preserve-3d animate-[ringSpin_90s_linear_infinite]"
            style={{ 
              transform: 'rotateX(75deg) rotateY(-10deg)' 
            }} 
          >
            {characters.map((char, i) => {
              const angle = (i / characters.length) * 360;
              return (
                <span
                  key={i}
                  className="absolute left-1/2 top-1/2 text-white/90 font-medium text-[11px] md:text-[15px] whitespace-nowrap uppercase tracking-[0.6em]"
                  style={{
                    // rotateY(180deg) giúp chữ hướng mặt ra ngoài, dễ đọc hơn khi xoay qua tiền cảnh
                    transform: `rotateZ(${angle}deg) translateY(-${ringRadius}px) rotateX(-90deg) rotateY(180deg)`,
                    transformOrigin: '0 0',
                    textShadow: '0 0 10px rgba(255,255,255,0.4)',
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              );
            })}
          </div>
        </div>

        {/* MOON Orbit */}
        <div 
          className="absolute preserve-3d"
          style={{ 
            width: `${moonOrbitRadiusX * 2}px`, 
            height: `${moonOrbitRadiusY * 2}px`,
            transform: 'rotateX(75deg) rotateY(-10deg)'
          }}
        >
          <div className="absolute inset-0 preserve-3d animate-[moonOrbit_180s_linear_infinite]">
             <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 preserve-3d">
                <div 
                  className="relative w-10 h-10 md:w-16 md:h-16 rounded-full preserve-3d"
                  style={{ transform: `rotateX(-75deg) rotateY(calc(-1 * var(--ry))) rotateX(calc(-1 * var(--rx)))` } as React.CSSProperties}
                >
                   <div className="absolute inset-[-10px] rounded-full bg-white/5 blur-2xl" />
                   <div className="absolute inset-0 rounded-full overflow-hidden border border-white/10 bg-zinc-800 shadow-[inset_-12px_-12px_25px_black,0_0_40px_rgba(255,255,255,0.1)]">
                      <div 
                        className="absolute inset-0 bg-cover bg-center opacity-80"
                        style={{
                            backgroundImage: `url('https://www.solarsystemscope.com/textures/download/2k_moon.jpg')`,
                            backgroundSize: '200% 200%',
                            backgroundPosition: `calc(var(--map-x) * 0.4) center`,
                        } as React.CSSProperties}
                      />
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,_rgba(255,255,255,0.1)_0%,_transparent_60%,_rgba(0,0,0,0.9)_95%)]" />
                   </div>
                </div>
             </div>
          </div>
        </div>

      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .preserve-3d { transform-style: preserve-3d; }
        
        @keyframes moonOrbit {
          from { transform: rotateZ(0deg); }
          to { transform: rotateZ(360deg); }
        }

        @keyframes ringSpin {
          from { transform: rotateX(75deg) rotateY(-10deg) rotateZ(0deg); }
          to { transform: rotateX(75deg) rotateY(-10deg) rotateZ(360deg); }
        }
      `}} />
    </div>
  );
};

export default SpaceSimulation;
