import React, { useEffect, useState } from 'react';

const SpaceSimulation: React.FC = () => {
  const text = "Sinh nhật vui vẻ nhé  "; 
  const repeatedText = text.repeat(3); 
  // Chuyển chuỗi thành mảng để xử lý từng ký tự
  const characters = repeatedText.split("");

  const [dimensions, setDimensions] = useState({ ring: 450, orbitX: 650 });

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      setDimensions({
        ring: isMobile ? 240 : 450,
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
      {/* 3D Scene Container */}
      <div 
        className="relative w-full h-full flex items-center justify-center"
        style={{ 
          perspective: '2000px',
          transformStyle: 'preserve-3d',
          transform: `rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))` 
        } as React.CSSProperties}
      >
        
        <div className="relative flex items-center justify-center" style={{ transformStyle: 'preserve-3d' }}>
          
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

          {/* HỆ THỐNG TRÁI ĐẤT */}
          <div className="relative" style={{ transformStyle: 'preserve-3d' }}>
            <div className="absolute inset-[-30px] rounded-full bg-blue-500/10 blur-[50px]" />
            <div 
              className="relative w-56 h-56 md:w-80 md:h-80 rounded-full"
              style={{ 
                transformStyle: 'preserve-3d',
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

          {/* VÒNG CHỮ - ĐÃ SỬA LỖI NGƯỢC */}
          <div 
            className="absolute flex items-center justify-center"
            style={{ 
              transformStyle: 'preserve-3d',
              animation: 'ringSpin 60s linear infinite',
            }} 
          >
            {characters.map((char, i) => {
              // Sử dụng góc âm để thứ tự chữ chạy từ trái sang phải
              const angle = (i / characters.length) * 360;
              return (
                <span
                  key={i}
                  className="absolute text-white font-bold text-[14px] md:text-[18px] whitespace-nowrap uppercase"
                  style={{
                    // 1. rotateY: Đưa chữ về vị trí quanh vòng tròn
                    // 2. translateZ: Đẩy chữ ra xa tâm (bán kính)
                    // 3. rotateY(0): Đảm bảo mặt chữ hướng thẳng về camera
                    transform: `rotateY(${angle}deg) translateZ(${dimensions.ring}px)`,
                    textShadow: '0 0 10px rgba(255,255,255,0.8)',
                    backfaceVisibility: 'visible',
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              );
            })}
          </div>
        </div>

        {/* HỆ THỐNG MẶT TRĂNG */}
        <div 
          className="absolute"
          style={{ 
            transformStyle: 'preserve-3d',
            width: `${dimensions.orbitX * 2}px`, 
            height: `${moonOrbitRadiusY * 2}px`,
            transform: 'rotateX(75deg) rotateY(-10deg)'
          }}
        >
          <div className="absolute inset-0 animate-[moonOrbit_120s_linear_infinite]" style={{ transformStyle: 'preserve-3d' }}>
             <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ transformStyle: 'preserve-3d' }}>
                <div 
                  className="relative w-10 h-10 md:w-16 md:h-16 rounded-full"
                  style={{ 
                    transformStyle: 'preserve-3d',
                    transform: `rotateX(-75deg) rotateY(calc(-1 * var(--ry, 0deg))) rotateX(calc(-1 * var(--rx, 0deg)))` 
                  } as React.CSSProperties}
                >
                   <div className="absolute inset-0 rounded-full overflow-hidden border border-white/10 bg-zinc-800">
                      <div 
                        className="absolute inset-0 bg-cover bg-center"
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
        @keyframes moonOrbit {
          from { transform: rotateZ(0deg); }
          to { transform: rotateZ(360deg); }
        }

        @keyframes ringSpin {
          /* Xoay quanh trục Y để tạo hiệu ứng vòng quay truyền thống quanh Trái Đất */
          from { transform: rotateX(10deg) rotateY(0deg); }
          to { transform: rotateX(10deg) rotateY(-360deg); }
        }
      `}} />
    </div>
  );
};

export default SpaceSimulation;
