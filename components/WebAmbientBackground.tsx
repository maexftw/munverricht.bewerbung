import React, { useEffect, useRef } from 'react';

type Cluster = {
  x: number;
  y: number;
  chars: string[];
  opacity: number;
  speed: number;
  life: number;
  maxLife: number;
};

type CodeParticle = {
  x: number;
  y: number;
  text: string;
  speed: number;
  alpha: number;
};

const GLYPHS = '.:+-=*#[]{}()/\\|_';
const CODE_SNIPPETS = [
  'const site = create()',
  'optimize(assets)',
  'deploy(production)',
  'SEO_STATUS: OK',
  'MOBILE_READY',
  '200_SUCCESS',
  'grid-layout: active',
  'interface.render()',
  'system.init()'
];

const WebAmbientBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let clusters: Cluster[] = [];
    let particles: CodeParticle[] = [];
    let frame = 0;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const createCluster = (x?: number, y?: number): Cluster => {
      const maxLife = Math.random() * 100 + 50;
      return {
        x: x ?? Math.random() * width,
        y: y ?? Math.random() * height,
        chars: Array.from({ length: 4 }, () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)]),
        opacity: Math.random() * 0.4 + 0.1,
        speed: Math.random() * 0.5 + 0.1,
        life: maxLife,
        maxLife: maxLife
      };
    };

    const createParticle = (): CodeParticle => ({
      x: Math.random() * width,
      y: Math.random() * height,
      text: CODE_SNIPPETS[Math.floor(Math.random() * CODE_SNIPPETS.length)],
      speed: Math.random() * 0.3 + 0.05,
      alpha: Math.random() * 0.15 + 0.05
    });

    // Initial population
    for (let i = 0; i < 25; i++) clusters.push(createCluster());
    for (let i = 0; i < 15; i++) particles.push(createParticle());

    const drawGrid = () => {
      const gridSize = 40;
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(37, 99, 235, 0.03)';
      ctx.lineWidth = 1;

      for (let x = 0; x <= width; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = 0; y <= height; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();
    };

    const draw = () => {
      frame++;
      ctx.clearRect(0, 0, width, height);
      
      drawGrid();

      ctx.font = '500 10px "JetBrains Mono", monospace';
      
      // Update and draw Clusters
      clusters = clusters.map(c => {
        c.y -= c.speed;
        c.life -= 1;
        
        if (frame % 10 === 0) {
          c.chars = c.chars.map(() => GLYPHS[Math.floor(Math.random() * GLYPHS.length)]);
        }

        const alpha = (c.life / c.maxLife) * c.opacity;
        ctx.fillStyle = `rgba(37, 99, 235, ${alpha})`;
        ctx.fillText(c.chars.join(' '), c.x, c.y);

        return c.life <= 0 ? createCluster(undefined, height + 20) : c;
      });

      // Update and draw Particles
      particles = particles.map(p => {
        p.y -= p.speed;
        if (p.y < -20) p.y = height + 20;

        ctx.fillStyle = `rgba(37, 99, 235, ${p.alpha})`;
        ctx.fillText(p.text, p.x, p.y);
        return p;
      });

      // Subtle pulse lines
      if (frame % 200 < 50) {
        const pulseY = (height * (frame % 200)) / 50;
        ctx.beginPath();
        ctx.strokeStyle = `rgba(249, 115, 22, ${0.05 * (1 - (frame % 200) / 50)})`;
        ctx.moveTo(0, pulseY);
        ctx.lineTo(width, pulseY);
        ctx.stroke();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    resize();
    draw();

    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      <canvas ref={canvasRef} className="w-full h-full opacity-60" />
    </div>
  );
};

export default WebAmbientBackground;
