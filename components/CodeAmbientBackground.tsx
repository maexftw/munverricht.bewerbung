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

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    let width = 0;
    let height = 0;
    let dpr = 1;
    let time = 0;
    let debugFrames = 0;
    let leftRows: SideRow[] = [];
    let rightRows: SideRow[] = [];
    let waveCells: WaveCell[] = [];

    const dotCache = document.createElement('canvas');
    const dotCacheCtx = dotCache.getContext('2d');
    let dotPattern: CanvasPattern | null = null;

    let leftVignette: CanvasGradient | null = null;
    let rightVignette: CanvasGradient | null = null;
    let pulseGradient: CanvasGradient | null = null;
    let mainGlow: CanvasGradient | null = null;
    let horizonGlow: CanvasGradient | null = null;
    let cachedRailWidth = 0;
    const railText = TOKENS.join('   ');

    const createRows = (): SideRow[] => {
      const rows = Math.max(18, Math.floor(height / 34));
      return Array.from({ length: rows }, (_, i) => ({
        y: i * (height / rows) + randomBetween(-12, 12),
        speed: randomBetween(8, 24),
        drift: randomBetween(8, 22),
        alpha: randomBetween(0.045, 0.11),
        text: createAsciiLine(90),
        mutateEvery: randomBetween(0.18, 0.55),
        mutateT: randomBetween(0, 0.55)
      }));
    };

    const createWaveCells = (): WaveCell[] => {
      const cols = width < 900 ? 28 : 40;
      const rows = width < 900 ? 20 : 26;
      const cells: WaveCell[] = [];

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          cells.push({
            x: col - (cols - 1) / 2,
            z: row - rows / 2,
            seed: randomBetween(0, Math.PI * 2)
          });
        }
      }

      return cells;
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
      waveCells = createWaveCells();

      leftVignette = null;
      rightVignette = null;
      pulseGradient = null;
      mainGlow = null;
      horizonGlow = null;
      cachedRailWidth = 0;
      dotPattern = null;

      console.info('[CodeAmbientBackground] resize', {
        width,
        height,
        dpr,
        reducedMotion: media.matches,
        theme: document.documentElement.getAttribute('data-theme'),
        bgColor: getComputedStyle(document.documentElement).getPropertyValue('--bg-color').trim(),
        ambientOpacity: getComputedStyle(canvas).opacity
      });
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
      const edgeWidth = Math.max(220, width * 0.24);

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
        const x = rightSide ? width - edgeWidth + 12 + xDrift : -220 + xDrift;

        ctx.fillStyle = `rgba(56,189,248,${row.alpha.toFixed(3)})`;
        ctx.fillText(row.text, x, row.y);
      });

      ctx.restore();
    };

    const drawTokenRail = (y: number, speed: number, alpha: number) => {
      ctx.font = '600 12px "JetBrains Mono", monospace';
      ctx.textBaseline = 'top';

      if (!cachedRailWidth) {
        cachedRailWidth = ctx.measureText(railText).width;
      }

      const offset = (time * speed) % (cachedRailWidth + 180);
      const x = -offset;

      ctx.fillStyle = `rgba(56,189,248,${alpha})`;
      ctx.fillText(railText, x, y);
      ctx.fillText(railText, x + cachedRailWidth + 140, y);
      ctx.fillText(railText, x + (cachedRailWidth + 140) * 2, y);
    };

    const drawPulseLine = () => {
      const pulseY = ((Math.sin(time * 0.45) + 1) * 0.5) * height;

      if (!pulseGradient) {
        pulseGradient = ctx.createLinearGradient(0, 0, width, 0);
        pulseGradient.addColorStop(0, 'rgba(56,189,248,0)');
        pulseGradient.addColorStop(0.5, 'rgba(56,189,248,0.105)');
        pulseGradient.addColorStop(1, 'rgba(56,189,248,0)');
      }

      ctx.strokeStyle = pulseGradient;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, pulseY);
      ctx.lineTo(width, pulseY);
      ctx.stroke();
    };

    const drawWaveField = () => {
      const centerX = width * 0.5;
      const horizonY = height * 0.23;
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
        glow.addColorStop(0, `rgba(191,219,254,${Math.min(0.28, alpha + 0.06).toFixed(3)})`);
        glow.addColorStop(0.32, `rgba(125,211,252,${Math.min(0.19, alpha * 1.05).toFixed(3)})`);
        glow.addColorStop(0.6, `rgba(96,165,250,${Math.min(0.15, alpha * 0.82).toFixed(3)})`);
        glow.addColorStop(1, 'rgba(37,99,235,0)');

        ctx.fillStyle = glow;
        ctx.fillRect(sx - barWidth * 1.5, topY - 2, barWidth * 3, sy - topY + 5);

        ctx.strokeStyle = `rgba(125,211,252,${alpha.toFixed(3)})`;
        ctx.lineWidth = barWidth;
        ctx.beginPath();
        ctx.moveTo(sx, sy - lift);
        ctx.lineTo(sx, sy);
        ctx.stroke();

        if (!media.matches && Math.abs(cell.x % 4) < 0.5 && depth > 0.18) {
          ctx.strokeStyle = `rgba(191,219,254,${(alpha * 0.46).toFixed(3)})`;
          ctx.lineWidth = Math.max(0.6, barWidth * 0.45);
          ctx.beginPath();
          ctx.moveTo(sx + barWidth * 1.8, sy - lift * 0.88);
          ctx.lineTo(sx + barWidth * 1.8, sy + Math.max(10, perspective * 7));
          ctx.stroke();
        }

        if (depth > 0.3 && Math.abs(cell.x) < 12) {
          ctx.fillStyle = `rgba(219,234,254,${(alpha * 0.7).toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(sx, sy - lift, Math.max(0.7, barWidth * 0.55), 0, Math.PI * 2);
          ctx.fill();
        }

        const flashGate = Math.sin(cell.seed * 4 + time * 2.4 + cell.x * 0.8 - cell.z * 0.3);
        if (!media.matches && flashGate > 0.965 && depth > 0.22 && heroWeight > 0.34) {
          const label = COMPILER_HINTS[(Math.abs(Math.floor(cell.seed * 10 + cell.x + cell.z)) % COMPILER_HINTS.length)];
          ctx.fillStyle = `rgba(191,219,254,${Math.min(0.32, alpha * 1.3 + 0.08).toFixed(3)})`;
          ctx.fillText(label, sx + 6, topY - 4);
          ctx.fillRect(sx - 1, topY - 2, Math.max(8, label.length * 4.3), 1);
        }
      });

      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      const contourRows = media.matches ? 5 : 8;
      for (let row = 0; row < contourRows; row++) {
        const y = horizonY + fieldHeight * (0.12 + row * 0.11);
        const contour = ctx.createLinearGradient(0, y, width, y);
        contour.addColorStop(0, 'rgba(56,189,248,0)');
        contour.addColorStop(0.3, 'rgba(56,189,248,0.03)');
        contour.addColorStop(0.5, 'rgba(148,163,184,0.07)');
        contour.addColorStop(0.7, 'rgba(56,189,248,0.03)');
        contour.addColorStop(1, 'rgba(56,189,248,0)');
        ctx.strokeStyle = contour;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(width * 0.16, y + Math.sin(time * 1.3 + row * 0.7) * 7);
        ctx.quadraticCurveTo(width * 0.5, y - 16 + Math.sin(time * 1.05 + row * 0.65) * 11, width * 0.84, y + Math.cos(time * 1.18 + row * 0.6) * 7);
        ctx.stroke();
      }

      if (!media.matches) {
        const sweepCount = 3;
        for (let index = 0; index < sweepCount; index++) {
          const sweepProgress = (time * (0.12 + index * 0.03) + index * 0.31) % 1;
          const sweepY = horizonY + fieldHeight * (0.1 + sweepProgress * 0.72);
          const sweepAlpha = 0.04 + (1 - sweepProgress) * 0.06;
          const sweep = ctx.createLinearGradient(0, sweepY, width, sweepY);
          sweep.addColorStop(0, 'rgba(125,211,252,0)');
          sweep.addColorStop(0.18, `rgba(125,211,252,${(sweepAlpha * 0.5).toFixed(3)})`);
          sweep.addColorStop(0.5, `rgba(191,219,254,${sweepAlpha.toFixed(3)})`);
          sweep.addColorStop(0.82, `rgba(125,211,252,${(sweepAlpha * 0.5).toFixed(3)})`);
          sweep.addColorStop(1, 'rgba(125,211,252,0)');
          ctx.strokeStyle = sweep;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(width * 0.18, sweepY + 4);
          ctx.lineTo(width * 0.82, sweepY - 12);
          ctx.stroke();
        }
      }

      ctx.restore();
    };

    const drawSideVignette = () => {
      if (!leftVignette || !rightVignette) {
        leftVignette = ctx.createLinearGradient(0, 0, width * 0.24, 0);
        leftVignette.addColorStop(0, 'rgba(2,6,23,0.42)');
        leftVignette.addColorStop(1, 'rgba(2,6,23,0)');

        rightVignette = ctx.createLinearGradient(width, 0, width * 0.76, 0);
        rightVignette.addColorStop(0, 'rgba(2,6,23,0.42)');
        rightVignette.addColorStop(1, 'rgba(2,6,23,0)');
      }

      ctx.fillStyle = leftVignette;
      ctx.fillRect(0, 0, width * 0.24, height);

      ctx.fillStyle = rightVignette;
      ctx.fillRect(width * 0.76, 0, width * 0.24, height);
    };

    const draw = () => {
      const dt = media.matches ? 0.006 : 0.016;
      ctx.clearRect(0, 0, width, height);

      if (!mainGlow) {
        mainGlow = ctx.createRadialGradient(width * 0.5, height * 0.3, 20, width * 0.5, height * 0.3, Math.max(width, height) * 0.78);
        mainGlow.addColorStop(0, 'rgba(37,99,235,0.11)');
        mainGlow.addColorStop(0.48, 'rgba(37,99,235,0.03)');
        mainGlow.addColorStop(1, 'rgba(2,6,23,0)');
      }

      if (!horizonGlow) {
        horizonGlow = ctx.createRadialGradient(width * 0.5, height * 0.28, 0, width * 0.5, height * 0.28, width * 0.42);
        horizonGlow.addColorStop(0, 'rgba(191,219,254,0.12)');
        horizonGlow.addColorStop(0.18, 'rgba(96,165,250,0.08)');
        horizonGlow.addColorStop(0.58, 'rgba(37,99,235,0.015)');
        horizonGlow.addColorStop(1, 'rgba(2,6,23,0)');
      }

      ctx.fillStyle = mainGlow;
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = horizonGlow;
      ctx.fillRect(0, 0, width, height);

      drawDotMatrix();
      drawWaveField();
      drawSideRows(leftRows, false, dt);
      drawSideRows(rightRows, true, dt);
      drawTokenRail(Math.max(90, height * 0.16), 26, 0.28);
      drawTokenRail(Math.max(132, height * 0.21), -18, 0.16);
      drawPulseLine();
      drawSideVignette();

      if (debugFrames < 6) {
        const probeCell = waveCells[Math.floor(waveCells.length * 0.58)];
        const probeWave = probeCell
          ? (
              Math.sin(probeCell.x * 0.42 + time * 1.25 + probeCell.seed) * 0.8 +
              Math.sin(probeCell.z * 0.58 - time * 1.1 + probeCell.seed * 0.6) * 0.75 +
              Math.sin(Math.sqrt(probeCell.x * probeCell.x + probeCell.z * probeCell.z) * 0.45 - time * 1.65 + probeCell.seed) * 0.55
            ) / 3
          : null;

        console.info('[CodeAmbientBackground] frame', {
          frame: debugFrames,
          time: Number(time.toFixed(3)),
          dt,
          reducedMotion: media.matches,
          waveCells: waveCells.length,
          probeWave: probeWave === null ? null : Number(probeWave.toFixed(4)),
          theme: document.documentElement.getAttribute('data-theme'),
          ambientOpacity: getComputedStyle(canvas).opacity
        });
        debugFrames += 1;
      }

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
