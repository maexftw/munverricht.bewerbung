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

type WaveCell = {
  x: number;
  z: number;
  seed: number;
};

const TOKENS = ['[ 200 OK ]', '[ .JSON ]', '[ SCRAPE ]', '[ .MD ]', '[ MAP ]', '[ AGENT ]', '[ CRAWL ]', '[ SEARCH ]'];
const GLYPHS = '.:+-=*#[]{}()/\\|';
const COMPILER_HINTS = ['0x1F', 'AST', 'L12', '>>', 'IR', 'OK', 'fn', '{}', '::', '[]'];

const randomBetween = (min: number, max: number) => Math.random() * (max - min) + min;

const createAsciiLine = (length: number) => {
  let out = '';
  for (let index = 0; index < length; index += 1) {
    out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
    if (index % 3 === 0) out += ' ';
  }
  return out;
};

const CodeAmbientBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return undefined;

    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    let width = 0;
    let height = 0;
    let dpr = 1;
    let time = 0;
    let leftRows: SideRow[] = [];
    let rightRows: SideRow[] = [];
    let waveCells: WaveCell[] = [];

    const dotCache = document.createElement('canvas');
    const dotCacheCtx = dotCache.getContext('2d');
    let dotPattern: CanvasPattern | null = null;
    let cachedRailWidth = 0;
    const railText = TOKENS.join('   ');

    const createRows = (): SideRow[] => {
      const rows = Math.max(18, Math.floor(height / 34));
      return Array.from({ length: rows }, (_, index) => ({
        y: index * (height / rows) + randomBetween(-12, 12),
        speed: randomBetween(8, 24),
        drift: randomBetween(8, 22),
        alpha: randomBetween(0.045, 0.11),
        text: createAsciiLine(90),
        mutateEvery: randomBetween(0.18, 0.55),
        mutateT: randomBetween(0, 0.55),
      }));
    };

    const createWaveCells = (): WaveCell[] => {
      const cols = width < 900 ? 28 : 40;
      const rows = width < 900 ? 20 : 26;
      const cells: WaveCell[] = [];

      for (let row = 0; row < rows; row += 1) {
        for (let col = 0; col < cols; col += 1) {
          cells.push({
            x: col - (cols - 1) / 2,
            z: row - rows / 2,
            seed: randomBetween(0, Math.PI * 2),
          });
        }
      }

      return cells;
    };

    const readSpaceDrift = () => {
      if (media.matches) {
        return { x: 0, y: 0 };
      }

      const rootStyles = getComputedStyle(document.documentElement);
      return {
        x: parseFloat(rootStyles.getPropertyValue('--space-x')) || 0,
        y: parseFloat(rootStyles.getPropertyValue('--space-y')) || 0,
      };
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      leftRows = createRows();
      rightRows = createRows();
      waveCells = createWaveCells();
      dotPattern = null;
      cachedRailWidth = 0;
    };

    const drawDotMatrix = () => {
      const gap = 16;
      const offsetY = (time * 10) % gap;

      if (!dotPattern && dotCacheCtx) {
        dotCache.width = gap;
        dotCache.height = gap;
        dotCacheCtx.fillStyle = 'rgba(59,130,246,0.018)';
        dotCacheCtx.fillRect(0, 0, 1.2, 1.2);
        dotPattern = ctx.createPattern(dotCache, 'repeat');
      }

      if (dotPattern) {
        ctx.save();
        ctx.translate(6, 6 - offsetY);
        ctx.fillStyle = dotPattern;
        ctx.fillRect(-6, -6, width + gap, height + gap);
        ctx.restore();
      }

      ctx.fillStyle = 'rgba(59,130,246,0.052)';
      const time90 = Math.floor(time * 90);
      for (let y = 6 - offsetY; y < height + gap; y += gap) {
        for (let x = 6; x < width; x += gap) {
          if ((x + y + time90) % 64 === 0) {
            ctx.fillRect(x, y, 1.2, 1.2);
          }
        }
      }
    };

    const mutateText = (text: string) => {
      const chars = text.split('');
      const mutations = Math.max(2, Math.floor(chars.length * 0.04));
      for (let index = 0; index < mutations; index += 1) {
        const nextIndex = Math.floor(Math.random() * chars.length);
        if (chars[nextIndex] !== ' ') {
          chars[nextIndex] = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
      }
      return chars.join('');
    };

    const drawSideRows = (rows: SideRow[], rightSide: boolean, dt: number, driftX: number) => {
      ctx.font = '500 9px "JetBrains Mono", monospace';
      ctx.textBaseline = 'top';
      const edgeWidth = Math.max(220, width * 0.24);

      ctx.save();
      ctx.beginPath();
      if (rightSide) {
        ctx.rect(width - edgeWidth, 0, edgeWidth, height);
      } else {
        ctx.rect(0, 0, edgeWidth, height);
      }
      ctx.clip();

      rows.forEach((row, index) => {
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

        const waveDrift = Math.sin(time * 0.9 + index) * row.drift;
        const x = rightSide
          ? width - edgeWidth + 12 + waveDrift + driftX * 12
          : -220 + waveDrift + driftX * 12;

        ctx.fillStyle = 'rgba(56,189,248,' + row.alpha.toFixed(3) + ')';
        ctx.fillText(row.text, x, row.y);
      });

      ctx.restore();
    };

    const drawTokenRail = (y: number, speed: number, alpha: number, driftX: number) => {
      ctx.font = '600 12px "JetBrains Mono", monospace';
      ctx.textBaseline = 'top';

      if (!cachedRailWidth) {
        cachedRailWidth = ctx.measureText(railText).width;
      }

      const offset = (time * speed) % (cachedRailWidth + 180);
      const x = -offset + driftX * 24;

      ctx.fillStyle = 'rgba(56,189,248,' + alpha + ')';
      ctx.fillText(railText, x, y);
      ctx.fillText(railText, x + cachedRailWidth + 140, y);
      ctx.fillText(railText, x + (cachedRailWidth + 140) * 2, y);
    };

    const drawPulseLine = (driftY: number) => {
      const pulseY = ((Math.sin(time * 0.45) + 1) * 0.5) * height + driftY * 18;
      const pulseGradient = ctx.createLinearGradient(0, 0, width, 0);
      pulseGradient.addColorStop(0, 'rgba(56,189,248,0)');
      pulseGradient.addColorStop(0.5, 'rgba(56,189,248,0.105)');
      pulseGradient.addColorStop(1, 'rgba(56,189,248,0)');

      ctx.strokeStyle = pulseGradient;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, pulseY);
      ctx.lineTo(width, pulseY);
      ctx.stroke();
    };

    const drawSpatialPlanes = (driftX: number, driftY: number) => {
      const vanishingX = width * 0.5 + driftX * 60;
      const vanishingY = height * 0.2 + driftY * 28;
      ctx.save();
      ctx.globalCompositeOperation = 'screen';

      for (let index = 0; index < 5; index += 1) {
        const ratio = index / 4;
        const leftX = width * (0.1 + ratio * 0.1) + driftX * (index + 1) * 7;
        const rightX = width * (0.9 - ratio * 0.1) + driftX * (index + 1) * 7;
        const bottomY = height * (0.78 + ratio * 0.08) + driftY * 10;
        const alpha = 0.03 + ratio * 0.035;

        ctx.strokeStyle = 'rgba(148,163,184,' + alpha.toFixed(3) + ')';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(leftX, bottomY);
        ctx.lineTo(vanishingX, vanishingY);
        ctx.lineTo(rightX, bottomY);
        ctx.stroke();
      }

      const planeGradient = ctx.createLinearGradient(0, vanishingY, 0, height);
      planeGradient.addColorStop(0, 'rgba(125,211,252,0)');
      planeGradient.addColorStop(0.55, 'rgba(125,211,252,0.04)');
      planeGradient.addColorStop(1, 'rgba(15,23,42,0)');
      ctx.fillStyle = planeGradient;
      ctx.beginPath();
      ctx.moveTo(width * 0.16 + driftX * 12, height * 0.88);
      ctx.lineTo(vanishingX, vanishingY + driftY * 16);
      ctx.lineTo(width * 0.84 + driftX * 12, height * 0.88);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    const drawWaveField = (driftX: number, driftY: number) => {
      const centerX = width * 0.5 + driftX * 30;
      const horizonY = height * 0.23 + driftY * 16;
      const fieldHeight = height * 0.6;
      const colStep = width < 900 ? 9.5 : 12;
      const rowStep = height < 800 ? 14 : 16;
      const amplitude = media.matches ? 9 : 20;

      ctx.font = width < 900 ? '500 8px "JetBrains Mono", monospace' : '500 9px "JetBrains Mono", monospace';
      ctx.textBaseline = 'middle';

      waveCells.forEach((cell) => {
        const normalizedZ = (cell.z + 13) / 26;
        const depth = Math.max(0, Math.min(1, normalizedZ));
        const perspective = 0.24 + depth * 1.22;
        const sx = centerX + cell.x * colStep * perspective;
        const sy = horizonY + (cell.z + 12) * rowStep * (0.4 + depth * 0.94);

        if (sx < -60 || sx > width + 60 || sy > horizonY + fieldHeight) {
          return;
        }

        const ripple = Math.sin(cell.x * 0.46 + time * 2.2 + cell.seed) * 0.95;
        const swell = Math.sin(cell.z * 0.62 - time * 1.85 + cell.seed * 0.6) * 0.9;
        const ring = Math.sin(Math.sqrt(cell.x * cell.x + cell.z * cell.z) * 0.52 - time * 2.45 + cell.seed) * 0.65;
        const travel = Math.sin((cell.x + cell.z * 0.55) * 0.34 - time * 2.8) * 0.85;
        const wave = (ripple + swell + ring + travel) / 4;

        const lift = wave * amplitude * perspective;
        const heroWeight = Math.max(0.68, 1 - Math.max(0, sy - horizonY) / (fieldHeight * 1.32));
        const compileWeight = 0.92 + heroWeight * 0.52;
        const barWidth = Math.max(0.9, 0.65 + perspective * 1.15);
        const barHeight = Math.max(9, perspective * (16 + Math.abs(wave) * 24) * compileWeight);
        const topY = sy - lift - barHeight;
        const alpha = Math.min(0.34, (0.05 + perspective * 0.11 + Math.max(0, wave) * 0.1) * compileWeight);

        const glow = ctx.createLinearGradient(0, topY, 0, sy + 2);
        glow.addColorStop(0, 'rgba(191,219,254,' + Math.min(0.28, alpha + 0.06).toFixed(3) + ')');
        glow.addColorStop(0.32, 'rgba(125,211,252,' + Math.min(0.19, alpha * 1.05).toFixed(3) + ')');
        glow.addColorStop(0.6, 'rgba(96,165,250,' + Math.min(0.15, alpha * 0.82).toFixed(3) + ')');
        glow.addColorStop(1, 'rgba(37,99,235,0)');

        ctx.fillStyle = glow;
        ctx.fillRect(sx - barWidth * 1.5, topY - 2, barWidth * 3, sy - topY + 5);

        ctx.strokeStyle = 'rgba(125,211,252,' + alpha.toFixed(3) + ')';
        ctx.lineWidth = barWidth;
        ctx.beginPath();
        ctx.moveTo(sx, sy - lift);
        ctx.lineTo(sx, sy);
        ctx.stroke();

        if (!media.matches && Math.abs(cell.x % 4) < 0.5 && depth > 0.18) {
          ctx.strokeStyle = 'rgba(191,219,254,' + (alpha * 0.46).toFixed(3) + ')';
          ctx.lineWidth = Math.max(0.6, barWidth * 0.45);
          ctx.beginPath();
          ctx.moveTo(sx + barWidth * 1.8, sy - lift * 0.88);
          ctx.lineTo(sx + barWidth * 1.8, sy + Math.max(10, perspective * 7));
          ctx.stroke();
        }

        if (depth > 0.3 && Math.abs(cell.x) < 12) {
          ctx.fillStyle = 'rgba(219,234,254,' + (alpha * 0.7).toFixed(3) + ')';
          ctx.beginPath();
          ctx.arc(sx, sy - lift, Math.max(0.7, barWidth * 0.55), 0, Math.PI * 2);
          ctx.fill();
        }

        const flashGate = Math.sin(cell.seed * 4 + time * 2.4 + cell.x * 0.8 - cell.z * 0.3);
        if (!media.matches && flashGate > 0.965 && depth > 0.22 && heroWeight > 0.34) {
          const label = COMPILER_HINTS[Math.abs(Math.floor(cell.seed * 10 + cell.x + cell.z)) % COMPILER_HINTS.length];
          ctx.fillStyle = 'rgba(191,219,254,' + Math.min(0.32, alpha * 1.3 + 0.08).toFixed(3) + ')';
          ctx.fillText(label, sx + 6, topY - 4);
          ctx.fillRect(sx - 1, topY - 2, Math.max(8, label.length * 4.3), 1);
        }
      });
    };

    const drawContours = (driftX: number, driftY: number) => {
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      const contourRows = media.matches ? 5 : 8;
      for (let row = 0; row < contourRows; row += 1) {
        const y = height * (0.3 + row * 0.075) + driftY * (row + 1) * 2;
        const contour = ctx.createLinearGradient(0, y, width, y);
        contour.addColorStop(0, 'rgba(56,189,248,0)');
        contour.addColorStop(0.3, 'rgba(56,189,248,0.03)');
        contour.addColorStop(0.5, 'rgba(148,163,184,0.07)');
        contour.addColorStop(0.7, 'rgba(56,189,248,0.03)');
        contour.addColorStop(1, 'rgba(56,189,248,0)');
        ctx.strokeStyle = contour;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(width * 0.16 + driftX * 8, y + Math.sin(time * 1.3 + row * 0.7) * 7);
        ctx.quadraticCurveTo(
          width * 0.5 + driftX * 22,
          y - 16 + Math.sin(time * 1.05 + row * 0.65) * 11,
          width * 0.84 + driftX * 8,
          y + Math.cos(time * 1.18 + row * 0.6) * 7,
        );
        ctx.stroke();
      }
      ctx.restore();
    };

    const draw = () => {
      const dt = media.matches ? 0.006 : 0.016;
      const drift = readSpaceDrift();
      const driftX = drift.x;
      const driftY = drift.y;

      ctx.clearRect(0, 0, width, height);

      const mainGlow = ctx.createRadialGradient(
        width * 0.5 + driftX * 40,
        height * 0.3 + driftY * 24,
        20,
        width * 0.5 + driftX * 40,
        height * 0.3 + driftY * 24,
        Math.max(width, height) * 0.78,
      );
      mainGlow.addColorStop(0, 'rgba(37,99,235,0.11)');
      mainGlow.addColorStop(0.48, 'rgba(37,99,235,0.03)');
      mainGlow.addColorStop(1, 'rgba(2,6,23,0)');

      const horizonGlow = ctx.createRadialGradient(
        width * 0.5 + driftX * 30,
        height * 0.28 + driftY * 16,
        0,
        width * 0.5 + driftX * 30,
        height * 0.28 + driftY * 16,
        width * 0.42,
      );
      horizonGlow.addColorStop(0, 'rgba(191,219,254,0.12)');
      horizonGlow.addColorStop(0.18, 'rgba(96,165,250,0.08)');
      horizonGlow.addColorStop(0.58, 'rgba(37,99,235,0.015)');
      horizonGlow.addColorStop(1, 'rgba(2,6,23,0)');

      ctx.fillStyle = mainGlow;
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = horizonGlow;
      ctx.fillRect(0, 0, width, height);

      drawDotMatrix();
      drawSpatialPlanes(driftX, driftY);
      drawWaveField(driftX, driftY);
      drawContours(driftX, driftY);
      drawSideRows(leftRows, false, dt, driftX);
      drawSideRows(rightRows, true, dt, driftX);
      drawTokenRail(Math.max(90, height * 0.16), 26, 0.28, driftX);
      drawTokenRail(Math.max(132, height * 0.21), -18, 0.16, driftX);
      drawPulseLine(driftY);

      time += dt;
      rafRef.current = window.requestAnimationFrame(draw);
    };

    resize();
    draw();

    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <div id="code-ambient-canvas-container" aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
};

export default CodeAmbientBackground;
