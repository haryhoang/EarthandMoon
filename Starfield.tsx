
import React, { useEffect, useRef } from 'react';
import { Star } from './types';

const Starfield: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let stars: Star[] = [];
    const colors = ['#ffffff', '#e0f2fe', '#fffbeb', '#f0f9ff', '#dbeafe', '#f8fafc', '#bfdbfe'];

    const initStars = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      stars = [];
      const count = Math.floor((window.innerWidth * window.innerHeight) / 600);
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.4,
          baseOpacity: 0.1 + Math.random() * 0.7,
          twinkleSpeed: 0.0005 + Math.random() * 0.003,
          color: colors[Math.floor(Math.random() * colors.length)],
          phase: Math.random() * Math.PI * 2
        });
      }
    };

    const render = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((s) => {
        const opacity = s.baseOpacity + Math.sin(time * s.twinkleSpeed + s.phase) * 0.4;
        const finalOpacity = Math.max(0.05, Math.min(1, opacity));
        
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        
        if (finalOpacity > 0.8) {
          ctx.shadowBlur = 8;
          ctx.shadowColor = s.color;
        } else {
          ctx.shadowBlur = 0;
        }
        
        ctx.fillStyle = s.color;
        ctx.globalAlpha = finalOpacity;
        ctx.fill();
      });
      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener('resize', initStars);
    initStars();
    render(0);
    return () => {
      window.removeEventListener('resize', initStars);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-10" />;
};

export default Starfield;

