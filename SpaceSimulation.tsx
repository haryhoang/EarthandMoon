
import React from 'react';

const SpaceSimulation: React.FC = () => {
  const text = "Sinh nhật vui vẻ ";
  const repeatedText = text.repeat(3); 
  const characters = repeatedText.split("");
  
  // Quỹ đạo chữ
  const ringRadius = window.innerWidth < 768 ? 160 : 300;
  // Quỹ đạo Mặt Trăng (Thu gọn lại để nằm trong khung hình)
  const moonOrbitRadius = window.innerWidth < 768 ? 320 : 450;

  return (
    <div className="fixed inset-0 z-20 overflow-hidden pointer-events-none flex items-center justify-center bg-black">
      {/* 3D Scene Container */}
      <div 
        className="relative w-full h-full flex items-center justify-center preserve-3d"
        style={{ 
          transform: `perspective(1400px) rotateX(var(--rx)) rotateY(var(--ry))` 
        } as React.CSSProperties}
      >
        
        {/* CENTER: Earth and Quote Ring */}
        <div className="relative flex items-center justify-center preserve-3d">
          
          {/* EARTH 3D Billboard */}
          <div 
            className="relative w-48 h-48 md:w-64 md:h-64 rounded-full preserve-3d will-change-transform"
            style={{ 
              transform: `rotateY(calc(-1 * var(--ry))) rotateX(calc(-1 * var(--rx)))` 
            } as React.CSSProperties}
          >
            <div className="absolute inset-0 rounded-full overflow-hidden shadow-[inset_-30px_-30px_80px_black,0_0_120px_rgba(59,130,246,0.2)] border border-white/5">
               <div 
                 className="absolute inset-0 bg-cover bg-center transition-none"
                 style={{
                   backgroundImage: `url('https://www.solarsystemscope.com/textures/download/2k_earth_daymap.jpg')`,
                   backgroundSize: '200% 200%',
                   backgroundPosition: `var(--map-x) var(--map-y)`
                 } as React.CSSProperties}
               />
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,_transparent_20%,_rgba(0,0,0,0.95)_95%)]" />
            </div>
          </div>

          {/* QUOTE RING: Moving Right to Left (RotateZ clockwise with negative angle transform) */}
          <div 
            className="absolute preserve-3d animate-[ringSpin_60s_linear_infinite]"
            style={{ transform: 'rotateX(80deg)' }} 
          >
            {characters.map((char, i) => {
              const angle = (i / characters.length) * 360;
              return (
                <span
                  key={i}
                  className="absolute left-1/2 top-1/2 text-white/90 font-bold text-[10px] md:text-[14px] whitespace-nowrap uppercase tracking-[0.5em]"
                  style={{
                    transform: `rotateZ(${-angle}deg) translateY(-${ringRadius}px) rotateX(-90deg)`,
                    transformOrigin: '0 0',
                    textShadow: '0 0 10px white, 0 0 20px rgba(59,130,246,0.5)'
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              );
            })}
          </div>
        </div>

        {/* MOON 3D Orbit: In-frame Orbit */}
        <div 
          className="absolute preserve-3d animate-[moonOrbit_120s_linear_infinite]"
          style={{ width: `${moonOrbitRadius * 2}px`, height: `${moonOrbitRadius * 2}px` }}
        >
          <div className="absolute top-1/2 left-0 -translate-y-1/2 preserve-3d">
            <div 
              className="relative w-10 h-10 md:w-14 md:h-14 rounded-full preserve-3d shadow-[0_0_40px_rgba(255,255,255,0.2)]"
              style={{ transform: `rotateY(calc(-1 * var(--ry))) rotateX(calc(-1 * var(--rx)))` } as React.CSSProperties}
            >
               <div className="absolute inset-0 rounded-full overflow-hidden border border-white/10 bg-gray-900 shadow-[inset_-10px_-10px_20px_black]">
                  <div 
                    className="absolute inset-0 bg-cover bg-center scale-110"
                    style={{
                        backgroundImage: `url('https://www.solarsystemscope.com/textures/download/2k_moon.jpg')`,
                        backgroundSize: '200% 200%',
                        backgroundPosition: `calc(var(--map-x) * 0.4) calc(var(--map-y) * 0.4)`,
                    } as React.CSSProperties}
                  />
                  {/* Moon Sunlight shadow */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,_transparent_10%,_rgba(0,0,0,0.85)_90%)]" />
               </div>
            </div>
          </div>
        </div>

      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .preserve-3d { transform-style: preserve-3d; }
        
        /* moonOrbit: Xoay tròn xung quanh tâm, nằm trong tầm mắt */
        @keyframes moonOrbit {
          from { transform: rotateY(0deg); }
          to { transform: rotateY(360deg); }
        }

        /* ringSpin: Quay theo chiều kim đồng hồ để chữ trôi từ Phải sang Trái ở mặt trước */
        @keyframes ringSpin {
          from { transform: rotateX(80deg) rotateZ(0deg); }
          to { transform: rotateX(80deg) rotateZ(360deg); }
        }
      `}} />
    </div>
  );
};

export default SpaceSimulation;

