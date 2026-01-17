import React, { useEffect, useRef } from 'react';
import { Star } from './types';

interface GalaxyStar extends Star {
  z: number;
  randomFactor: number;
}

const Starfield: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<GalaxyStar[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let animationFrameId: number;
    const colors = ['#ffffff', '#f0f9ff', '#fffdeb', '#fafaf9', '#f8fafc'];

    const initStars = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const stars: GalaxyStar[] = [];
      
      const count = Math.floor((window.innerWidth * window.innerHeight) / 300);
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 0.22 + 0.02, 
          baseOpacity: Math.random() * 0.05,
          twinkleSpeed: 0.005 + Math.random() * 0.01,
          color: colors[Math.floor(Math.random() * colors.length)],
          phase: Math.random() * Math.PI * 2,
          z: Math.random() * 12 + 1,
          randomFactor: Math.random() * 1000
        });
      }
      starsRef.current = stars;
    };

    const render = (time: number) => {
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      const ryRaw = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--ry-raw')) || 0;
      const rxRaw = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--rx-raw')) || 0;

      ctx.globalCompositeOperation = 'lighter';

      starsRef.current.forEach((s) => {
        const flicker = (Math.sin(time * s.twinkleSpeed + s.phase) + Math.sin(time * 0.001 + s.randomFactor)) / 2;
        const twinkle = Math.pow(Math.max(0, flicker), 20); 
        
        const opacity = s.baseOpacity + twinkle * 1.5;
        const finalOpacity = Math.max(0, Math.min(1, opacity));

        if (finalOpacity < 0.01) return;

        let drawX = (s.x + ryRaw * s.z * 0.25) % canvas.width;
        if (drawX < 0) drawX += canvas.width;
        
        let drawY = (s.y + rxRaw * s.z * 0.08) % canvas.height;
        if (drawY < 0) drawY += canvas.height;

        if (twinkle > 0.4) {
            ctx.beginPath();
            const glowSize = s.radius * 20 * twinkle;
            const starGrd = ctx.createRadialGradient(drawX, drawY, 0, drawX, drawY, glowSize);
            starGrd.addColorStop(0, s.color);
            starGrd.addColorStop(0.5, 'transparent');
            ctx.fillStyle = starGrd;
            ctx.globalAlpha = finalOpacity * 0.3;
            ctx.arc(drawX, drawY, glowSize, 0, Math.PI * 2);
            ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(drawX, drawY, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.globalAlpha = Math.min(1, finalOpacity * 2);
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
