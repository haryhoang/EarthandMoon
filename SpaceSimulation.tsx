import React, { useEffect, useState } from 'react';

const SpaceSimulation: React.FC = () => {
  const text = "Sinh nhật vui vẻ nhé  "; 
  const repeatedText = text.repeat(3); 
  const characters = repeatedText.split("");

  const [dimensions, setDimensions] = useState({ ring: 400, orbitX: 650 });

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      setDimensions({
        ring: isMobile ? 220 : 400,
        orbitX: isMobile ? 420 : 650
      });
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const moonOrbitRadiusY = dimensions.orbitX * 0.55;

  return (
    <div className="fixed inset-0 z-20 overflow-hidden pointer-events-none flex items-center justify-center bg-transparent">
      {/* 3D Scene Container - Nơi nhận biến xoay --rx, --ry */}
      <div 
        className="relative w-full h-full flex items-center justify-center preserve-3d"
        style={{ 
          perspective: '2000px',
          transform: `rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))` 
        } as React.CSSProperties}
      >
        
        <div className="relative flex items-center justify-center preserve-3d">
          
          {/* HỆ THỐNG TRUNG TÂM (TRÁI ĐẤT + VÒNG CHỮ) */}
          <div className="relative preserve-3d">
            
            {/* 1. VÒNG CHỮ ELIP (Nằm trong hệ tọa độ của Trái Đất) */}
            <div 
              className="absolute flex items-center justify-center preserve-3d animate-[ringSpin_60s_linear_infinite]"
              style={{ 
                // Mặc định nghiêng như vành đai hành tinh (75 độ)
                // Nó sẽ nghiêng thêm dựa trên --rx, --ry của cha
                transform: 'rotateX(75deg)' 
              }} 
            >
              {characters.map((char, i) => {
                const angle = (i / characters.length) * 360;
                return (
                  <span
                    key={i}
                    className="absolute text-white/90 font-medium text-[13px] md:text-[16px] whitespace-nowrap uppercase tracking-[0.2em]"
                    style={{
                      // rotateZ định vị quanh vòng elip
                      // translateY đẩy ra bán kính
                      // rotateX(-90deg) dựng đứng chữ lên mặt phẳng nghiêng
                      transform: `rotateZ(${-angle}deg) translateY(-${dimensions.ring}px) rotateX(-90deg)`,
                      transformOrigin: 'center center',
                      textShadow: '0 0 8px rgba(255,255,255,0.5)',
                    }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </span>
                );
              })}
            </div>

            {/* 2. TRÁI ĐẤT */}
            <div className="relative preserve-3d">
              <div className="absolute inset-[-30px] rounded-full bg-blue-500/10 blur-[50px]" />
              <div 
                className="relative w-56 h-56 md:w-80 md:h-80 rounded-full preserve-3d"
                style={{ 
                  // Bù trừ chuyển động xoay của cha để text mặt cầu không bị lật
                  transform: `rotateY(calc(-1 * var(--ry, 0deg))) rotateX(calc(-1 * var(--rx, 0deg)))` 
                } as React.CSSProperties}
              >
                <div className="absolute inset-0 rounded-full overflow-hidden border border-white/10 shadow-[25px_25px_80px_rgba(0,0,0,0.9)] bg-black">
                   <div 
                     className="absolute inset-0 bg-cover bg-center"
                     style={{
                       backgroundImage: `url('https://www.solarsystemscope.com/textures/download/2k_earth_daymap.jpg')`,
                       backgroundSize: '200% 100%',
                       backgroundPosition: `var(--map-x, 0%) center`,
                     } as React.CSSProperties}
                   />
                   <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,_rgba(255,255,255,0.1)_0%,_transparent_45%,_rgba(0,0,0,0.98)_95%)] z-10" />
                </div>
              </div>
            </div>
          </div>

          {/* QUỸ ĐẠO MẶT TRĂNG (Visual) */}
          <div 
            className="absolute border border-white/5 rounded-[50%]"
            style={{
              width: `${dimensions.orbitX * 2}px`,
              height: `${moonOrbitRadiusY * 2}px`,
              transform: 'rotateX(75deg) rotateY(-10deg)',
              borderWidth: '0.5px',
            }}
          />
        </div>

        {/* HỆ THỐNG MẶT TRĂNG */}
        <div 
          className="absolute preserve-3d"
          style={{ 
            width: `${dimensions.orbitX * 2}px`, 
            height: `${moonOrbitRadiusY * 2}px`,
            transform: 'rotateX(75deg) rotateY(-10deg)'
          }}
        >
          <div className="absolute inset-0 animate-[moonOrbit_120s_linear_infinite] preserve-3d">
             <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 preserve-3d">
                <div 
                  className="relative w-10 h-10 md:w-16 md:h-16 rounded-full preserve-3d"
                  style={{ 
                    transform: `rotateX(-75deg) rotateY(calc(-1 * var(--ry, 0deg))) rotateX(calc(-1 * var(--rx, 0deg)))` 
                  } as React.CSSProperties}
                >
                   <div className="absolute inset-0 rounded-full overflow-hidden border border-white/10 bg-zinc-800">
                      <div 
                        className="absolute inset-0 bg-cover bg-center opacity-80"
                        style={{
                            backgroundImage: `url('https://www.solarsystemscope.com/textures/download/2k_moon.jpg')`,
                            backgroundSize: '200% 200%',
                            backgroundPosition: `calc(var(--map-x, 0%) * 0.4) center`,
                        } as React.CSSProperties}
                      />
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
          /* Giữ nguyên độ nghiêng elip 75 độ và chỉ xoay trục Z để chữ chạy quanh */
          from { transform: rotateX(75deg) rotateZ(0deg); }
          to { transform: rotateX(75deg) rotateZ(360deg); }
        }
      `}} />
    </div>
  );
};

export default SpaceSimulation;

