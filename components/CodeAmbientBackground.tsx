import React, { useEffect, useRef } from 'react';

type SideRow = {
  y: number;
  speed: number;
  drift: number;
  alpha: number;
  text: string;
  mutateEvery: number;
  mutateT: number;
};

const TOKENS = ['[ 200 OK ]', '[ .JSON ]', '[ SCRAPE ]', '[ .MD ]', '[ MAP ]', '[ AGENT ]', '[ CRAWL ]', '[ SEARCH ]'];
const GLYPHS = '.:+-=*#[]{}()/\\|';

const randomBetween = (min: number, max: number) => Math.random() * (max - min) + min;

const createAsciiLine = (length: number) => {
  let out = '';
  for (let i = 0; i < length; i++) {
    out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
    if (i % 3 === 0) out += ' ';
  }
  return out;
};

const CodeAmbientBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    let width = 0;
    let height = 0;
    let dpr = 1;
    let time = 0;
    let leftRows: SideRow[] = [];
    let rightRows: SideRow[] = [];

    const createRows = (): SideRow[] => {
      const rows = Math.max(18, Math.floor(height / 34));
      return Array.from({ length: rows }, (_, i) => ({
        y: i * (height / rows) + randomBetween(-12, 12),
        speed: randomBetween(8, 24),
        drift: randomBetween(8, 22),
        alpha: randomBetween(0.12, 0.34),
        text: createAsciiLine(90),
        mutateEvery: randomBetween(0.18, 0.55),
        mutateT: randomBetween(0, 0.55)
      }));
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      leftRows = createRows();
      rightRows = createRows();
    };

    const drawDotMatrix = () => {
      const gap = 16;
      const offsetY = (time * 10) % gap;
      for (let y = 6 - offsetY; y < height + gap; y += gap) {
        for (let x = 6; x < width; x += gap) {
          const pulse = ((x + y + Math.floor(time * 90)) % 64 === 0) ? 0.11 : 0.034;
          ctx.fillStyle = `rgba(59,130,246,${pulse})`;
          ctx.fillRect(x, y, 1.2, 1.2);
        }
      }
    };

    const mutateText = (text: string) => {
      const chars = text.split('');
      const mutations = Math.max(2, Math.floor(chars.length * 0.04));
      for (let i = 0; i < mutations; i++) {
        const idx = Math.floor(Math.random() * chars.length);
        if (chars[idx] !== ' ') {
          chars[idx] = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
      }
      return chars.join('');
    };

    const drawSideRows = (rows: SideRow[], rightSide: boolean, dt: number) => {
      ctx.font = '500 9px "JetBrains Mono", monospace';
      ctx.textBaseline = 'top';
      const edgeWidth = Math.max(230, width * 0.28);

      ctx.save();
      ctx.beginPath();
      if (rightSide) {
        ctx.rect(width - edgeWidth, 0, edgeWidth, height);
      } else {
        ctx.rect(0, 0, edgeWidth, height);
      }
      ctx.clip();

      rows.forEach((row, i) => {
        row.y += row.speed * dt;
        if (row.y > height + 24) {
          row.y = -24;
          row.text = createAsciiLine(90);
        }

        row.mutateT -= dt;
        if (row.mutateT <= 0) {
          row.text = mutateText(row.text);
          row.mutateT = row.mutateEvery;
        }

        const xDrift = Math.sin(time * 0.9 + i) * row.drift;
        const x = rightSide
          ? width - edgeWidth + 8 + xDrift
          : -220 + xDrift;

        ctx.fillStyle = `rgba(56,189,248,${row.alpha.toFixed(3)})`;
        ctx.fillText(row.text, x, row.y);
      });

      ctx.restore();
    };

    const drawTokenRail = (y: number, speed: number, alpha: number) => {
      ctx.font = '600 12px "JetBrains Mono", monospace';
      ctx.textBaseline = 'top';

      const rail = TOKENS.join('   ');
      const railWidth = ctx.measureText(rail).width;
      const offset = (time * speed) % (railWidth + 180);
      const x = -offset;

      ctx.fillStyle = `rgba(56,189,248,${alpha})`;
      ctx.fillText(rail, x, y);
      ctx.fillText(rail, x + railWidth + 140, y);
      ctx.fillText(rail, x + (railWidth + 140) * 2, y);
    };

    const drawPulseLine = () => {
      const pulseY = ((Math.sin(time * 0.45) + 1) * 0.5) * height;
      const grad = ctx.createLinearGradient(0, pulseY, width, pulseY);
      grad.addColorStop(0, 'rgba(56,189,248,0)');
      grad.addColorStop(0.5, 'rgba(56,189,248,0.22)');
      grad.addColorStop(1, 'rgba(56,189,248,0)');
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, pulseY);
      ctx.lineTo(width, pulseY);
      ctx.stroke();
    };

    const drawSideVignette = () => {
      const left = ctx.createLinearGradient(0, 0, width * 0.24, 0);
      left.addColorStop(0, 'rgba(2,6,23,0.72)');
      left.addColorStop(1, 'rgba(2,6,23,0)');
      ctx.fillStyle = left;
      ctx.fillRect(0, 0, width * 0.24, height);

      const right = ctx.createLinearGradient(width, 0, width * 0.76, 0);
      right.addColorStop(0, 'rgba(2,6,23,0.72)');
      right.addColorStop(1, 'rgba(2,6,23,0)');
      ctx.fillStyle = right;
      ctx.fillRect(width * 0.76, 0, width * 0.24, height);
    };

    const draw = () => {
      const dt = media.matches ? 0.006 : 0.016;
      ctx.clearRect(0, 0, width, height);

      const glow = ctx.createRadialGradient(width * 0.5, height * 0.27, 30, width * 0.5, height * 0.27, Math.max(width, height) * 0.75);
      glow.addColorStop(0, 'rgba(37,99,235,0.23)');
      glow.addColorStop(0.48, 'rgba(37,99,235,0.06)');
      glow.addColorStop(1, 'rgba(2,6,23,0)');
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);

      drawDotMatrix();
      drawSideRows(leftRows, false, dt);
      drawSideRows(rightRows, true, dt);
      drawTokenRail(Math.max(90, height * 0.16), 58, 0.72);
      drawTokenRail(Math.max(132, height * 0.21), -44, 0.45);
      drawPulseLine();
      drawSideVignette();

      time += dt;

      rafRef.current = window.requestAnimationFrame(draw);
    };

    resize();
    draw();

    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
      if (rafRef.current !== null) window.cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div id="code-ambient-canvas-container" aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
};

export default CodeAmbientBackground;
