import React, { useEffect, useRef } from 'react';

const GLYPHS = '.:+-=*#[]{}()/\\|_';
const PRICE_ART = [
  '  ____  ___   ___      ',
  ' |__  |/ _ \\ / _ \\     ',
  '   / /| | | | | | | €  ',
  '  / /_| |_| | |_| |    ',
  ' |____|\\___/ \\___/     ',
];

const WebOfferLines = [
  'STATUS: VALID',
  'HOSTING: [ 0.00 ]',
  'MAINTENANCE: [ 0.00 ]',
  'DRAFTS: [ FREE ]',
  'SEO: OPTIMIZED',
  'MOBILE: READY'
];

const PricingAsciiBox: React.FC = () => {
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
    let time = 0;

    const resize = () => {
      const container = canvas.parentElement;
      if (!container) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = container.clientWidth;
      height = container.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      // 1. Draw Border
      ctx.font = '500 10px "JetBrains Mono", monospace';
      ctx.fillStyle = 'rgba(37, 99, 235, 0.2)'; // Blue subtle border
      ctx.fillText('┌' + '─'.repeat(Math.floor(width / 7.5) - 2) + '┐', 10, 20);
      ctx.fillText('└' + '─'.repeat(Math.floor(width / 7.5) - 2) + '┘', 10, height - 10);

      // 2. Data Clusters (Corners)
      ctx.fillStyle = 'rgba(37, 99, 235, 0.4)'; // Blue clusters
      const clusterChars = Array.from({ length: 4 }, () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)]).join('');
      ctx.fillText(clusterChars, 15, 35);
      ctx.fillText(clusterChars, width - 40, 35);

      // 3. Price ASCII Art
      ctx.font = '700 12px "JetBrains Mono", monospace';
      const startY = height / 2 - 20;
      PRICE_ART.forEach((line, i) => {
        const displayLine = line.split('').map(c => 
          (Math.random() > 0.999 ? GLYPHS[Math.floor(Math.random() * GLYPHS.length)] : c)
        ).join('');
        
        ctx.fillStyle = `rgba(15, 23, 42, 0.9)`; // Slate-900 / Dark text
        if (i === 2) ctx.fillStyle = '#2563eb'; // Blue highlight
        
        ctx.fillText(displayLine, width / 2 - 80, startY + i * 14);
      });

      // 4. Offer Status Lines
      ctx.font = '500 9px "JetBrains Mono", monospace';
      WebOfferLines.forEach((line, i) => {
        const isFree = line.includes('FREE') || line.includes('0.00') || line.includes('VALID');
        ctx.fillStyle = isFree ? '#2563eb' : 'rgba(51, 65, 85, 0.6)'; // Blue or slate-700
        ctx.fillText(line, 30, height - 100 + i * 12);
      });

      // 5. Scanning Pulse Line (Subtle blue)
      const pulseY = (Math.sin(time) + 1) * 0.5 * height;
      ctx.beginPath();
      ctx.strokeStyle = `rgba(37, 99, 235, ${0.1 + Math.sin(time * 2) * 0.05})`;
      ctx.lineWidth = 1;
      ctx.moveTo(15, pulseY);
      ctx.lineTo(width - 15, pulseY);
      ctx.stroke();

      ctx.fillStyle = 'rgba(37, 99, 235, 0.6)';
      ctx.fillRect(5, pulseY - 2, 3, 4);

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
    <div className="w-full h-full min-h-[340px] border border-blue-200 bg-white/90 rounded-xl relative overflow-hidden shadow-sm">
      <div className="absolute top-0 left-0 p-3 mono text-[10px] text-blue-400 pointer-events-none">
        VAL_SEQ_0.8.4
      </div>
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
};

export default PricingAsciiBox;
