import React, { useEffect, useRef } from 'react';

type StreamItem = {
  x: number;
  y: number;
  text: string;
  speed: number;
  alpha: number;
  lane: 'left' | 'right';
};

const STREAM_SNIPPETS = [
  'const site = create()',
  'deploy(production)',
  'render(layout)',
  'cta.visible = true',
  'seo.status = "ok"',
  'grid-template-columns',
  'requestAnimationFrame(loop)',
  'content.visibility = true',
  'launch.ready = true',
  '<section id="about">',
  'direct.contact()',
  'transition: opacity 460ms',
  'performance.stable = true',
  'design -> code -> launch',
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
    let streams: StreamItem[] = [];

    const createStream = (lane: 'left' | 'right', y?: number): StreamItem => {
      const baseX = lane === 'left' ? width * 0.05 : width * 0.77;
      const spread = width * 0.15;

      return {
        x: baseX + Math.random() * spread,
        y: y ?? Math.random() * height,
        text: STREAM_SNIPPETS[Math.floor(Math.random() * STREAM_SNIPPETS.length)],
        speed: Math.random() * 0.22 + 0.08,
        alpha: Math.random() * 0.16 + 0.16,
        lane,
      };
    };

    const populateStreams = () => {
      streams = [];
      for (let i = 0; i < 22; i++) streams.push(createStream('left'));
      for (let i = 0; i < 22; i++) streams.push(createStream('right'));
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      populateStreams();
    };

    const drawLanes = () => {
      const left = ctx.createLinearGradient(0, 0, width * 0.34, 0);
      left.addColorStop(0, 'rgba(37,99,235,0.11)');
      left.addColorStop(0.35, 'rgba(37,99,235,0.045)');
      left.addColorStop(1, 'rgba(37,99,235,0)');
      ctx.fillStyle = left;
      ctx.fillRect(0, 0, width * 0.36, height);

      const right = ctx.createLinearGradient(width, 0, width * 0.66, 0);
      right.addColorStop(0, 'rgba(14,165,233,0.1)');
      right.addColorStop(0.35, 'rgba(14,165,233,0.04)');
      right.addColorStop(1, 'rgba(14,165,233,0)');
      ctx.fillStyle = right;
      ctx.fillRect(width * 0.64, 0, width * 0.36, height);
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      drawLanes();

      ctx.font = '500 12.5px "JetBrains Mono", monospace';

      streams = streams.map((stream) => {
        stream.y -= stream.speed;

        if (stream.y < -30) {
          return createStream(stream.lane, height + Math.random() * 120);
        }

        const shimmer = 0.88 + Math.sin((stream.y + stream.x) * 0.01) * 0.12;
        const color = stream.lane === 'left' ? '37, 99, 235' : '14, 165, 233';
        ctx.fillStyle = `rgba(${color}, ${stream.alpha * shimmer})`;
        ctx.fillText(stream.text, stream.x, stream.y);
        return stream;
      });

      rafRef.current = window.requestAnimationFrame(draw);
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
      <canvas ref={canvasRef} className="h-full w-full opacity-[0.78]" />
    </div>
  );
};

export default WebAmbientBackground;
