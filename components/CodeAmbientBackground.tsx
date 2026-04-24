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
  radius: number;
  labelIndex: number;
  beamEligible: boolean;
  coreCell: boolean;
};

type QualityTier = 'high' | 'medium' | 'low';

type QualityProfile = {
  tier: QualityTier;
  dprCap: number;
  waveCols: number;
  waveRows: number;
  sideRowCount: number;
  sideTextLength: number;
  dotGap: number;
  dotPatternAlpha: number;
  dotSparkAlpha: number;
  contourRows: number;
  sweepCount: number;
  showLabels: boolean;
  showSecondaryBeams: boolean;
  showNodeOrbs: boolean;
  showSecondaryRail: boolean;
  glowOpacity: number;
  highlightOpacity: number;
  labelThreshold: number;
  mutationRate: number;
};

type NavigatorPerformanceHints = Navigator & {
  deviceMemory?: number;
};

const TOKENS = ['[ 200 OK ]', '[ .JSON ]', '[ SCRAPE ]', '[ .MD ]', '[ MAP ]', '[ AGENT ]', '[ CRAWL ]', '[ SEARCH ]'];
const GLYPHS = '.:+-=*#[]{}()/\\|';
const COMPILER_HINTS = ['0x1F', 'AST', 'L12', '>>', 'IR', 'OK', 'fn', '{}', '::', '[]'];

const QUALITY_RANK: Record<QualityTier, number> = {
  low: 0,
  medium: 1,
  high: 2,
};

const QUALITY_PRESETS: Record<QualityTier, Omit<QualityProfile, 'tier' | 'waveCols' | 'waveRows' | 'sideRowCount' | 'dotGap'>> = {
  high: {
    dprCap: 1.6,
    sideTextLength: 82,
    dotPatternAlpha: 0.016,
    dotSparkAlpha: 0.048,
    contourRows: 6,
    sweepCount: 3,
    showLabels: true,
    showSecondaryBeams: true,
    showNodeOrbs: true,
    showSecondaryRail: true,
    glowOpacity: 0.18,
    highlightOpacity: 0.14,
    labelThreshold: 0.972,
    mutationRate: 0.032,
  },
  medium: {
    dprCap: 1.35,
    sideTextLength: 72,
    dotPatternAlpha: 0.014,
    dotSparkAlpha: 0.034,
    contourRows: 4,
    sweepCount: 2,
    showLabels: false,
    showSecondaryBeams: true,
    showNodeOrbs: true,
    showSecondaryRail: true,
    glowOpacity: 0.14,
    highlightOpacity: 0.1,
    labelThreshold: 0.982,
    mutationRate: 0.026,
  },
  low: {
    dprCap: 1.1,
    sideTextLength: 60,
    dotPatternAlpha: 0.011,
    dotSparkAlpha: 0.024,
    contourRows: 2,
    sweepCount: 1,
    showLabels: false,
    showSecondaryBeams: false,
    showNodeOrbs: false,
    showSecondaryRail: false,
    glowOpacity: 0.1,
    highlightOpacity: 0.075,
    labelThreshold: 0.99,
    mutationRate: 0.018,
  },
};

const randomBetween = (min: number, max: number) => Math.random() * (max - min) + min;

const createAsciiLine = (length: number) => {
  let out = '';
  for (let i = 0; i < length; i++) {
    out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
    if (i % 3 === 0) out += ' ';
  }
  return out;
};

const chooseLowerTier = (a: QualityTier, b: QualityTier) => (QUALITY_RANK[a] <= QUALITY_RANK[b] ? a : b);

const getDowngradedTier = (tier: QualityTier, steps = 1): QualityTier => {
  if (steps >= 2) return 'low';
  if (tier === 'high') return 'medium';
  return 'low';
};

const deriveBaseTier = (width: number, height: number, rawDpr: number): QualityTier => {
  const navigatorHints = navigator as NavigatorPerformanceHints;
  const memory = typeof navigatorHints.deviceMemory === 'number' ? navigatorHints.deviceMemory : undefined;
  const cores = navigator.hardwareConcurrency || 4;
  const effectivePixels = width * height * Math.min(rawDpr, 2) * Math.min(rawDpr, 2);

  let score = 0;
  if (effectivePixels > 2_000_000) score += 1;
  if (effectivePixels > 3_600_000) score += 1;
  if (cores <= 6) score += 1;
  if (cores <= 4) score += 1;
  if (memory !== undefined && memory <= 4) score += 1;
  if (memory !== undefined && memory <= 2) score += 1;

  if (score >= 5) return 'low';
  if (score >= 2) return 'medium';
  return 'high';
};

const buildQualityProfile = (tier: QualityTier, width: number, height: number): QualityProfile => {
  const preset = QUALITY_PRESETS[tier];
  const isCompactWidth = width < 900;
  const isCompactHeight = height < 760;
  const compactScale = isCompactWidth ? 0.82 : width > 1680 ? 1.04 : 1;
  const heightScale = isCompactHeight ? 0.88 : 1;

  const waveColsBase = tier === 'high' ? 36 : tier === 'medium' ? 30 : 24;
  const waveRowsBase = tier === 'high' ? 22 : tier === 'medium' ? 18 : 14;
  const sideRowBase = tier === 'high' ? 24 : tier === 'medium' ? 18 : 14;
  const dotGapBase = tier === 'high' ? 16 : tier === 'medium' ? 18 : 22;

  return {
    tier,
    ...preset,
    waveCols: Math.max(18, Math.round(waveColsBase * compactScale)),
    waveRows: Math.max(12, Math.round(waveRowsBase * heightScale)),
    sideRowCount: Math.max(12, Math.round(sideRowBase * compactScale * heightScale)),
    dotGap: Math.max(12, Math.round(dotGapBase * (isCompactWidth ? 0.94 : 1))),
  };
};

const CodeAmbientBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let time = 0;
    let qualityTier: QualityTier = 'high';
    let qualityProfile = buildQualityProfile(qualityTier, 1280, 720);
    let warmupTierCap: QualityTier | null = null;
    let warmupSamples: number[] = [];
    let warmupPasses = 0;
    let warmupComplete = false;
    let leftRows: SideRow[] = [];
    let rightRows: SideRow[] = [];
    let waveCells: WaveCell[] = [];
    let waveHalfRows = 0;
    let lastFrameTime = 0;
    let resizeTimer: number | null = null;

    const dotCache = document.createElement('canvas');
    const dotCacheCtx = dotCache.getContext('2d');
    let dotPattern: CanvasPattern | null = null;
    let leftVignette: CanvasGradient | null = null;
    let rightVignette: CanvasGradient | null = null;
    let pulseGradient: CanvasGradient | null = null;
    let mainGlow: CanvasGradient | null = null;
    let horizonGlow: CanvasGradient | null = null;
    let contourGradients: CanvasGradient[] = [];
    let cachedRailWidth = 0;
    let rowFont = '500 9px "JetBrains Mono", monospace';
    let waveFont = '500 9px "JetBrains Mono", monospace';

    const railText = TOKENS.join('   ');

    const resetPaintCaches = () => {
      dotPattern = null;
      leftVignette = null;
      rightVignette = null;
      pulseGradient = null;
      mainGlow = null;
      horizonGlow = null;
      contourGradients = [];
      cachedRailWidth = 0;
    };

    const createRows = (count: number): SideRow[] =>
      Array.from({ length: count }, (_, index) => ({
        y: index * (height / count) + randomBetween(-12, 12),
        speed: randomBetween(8, 24),
        drift: randomBetween(8, qualityProfile.tier === 'low' ? 16 : 22),
        alpha: randomBetween(qualityProfile.tier === 'low' ? 0.035 : 0.045, qualityProfile.tier === 'high' ? 0.1 : 0.082),
        text: createAsciiLine(qualityProfile.sideTextLength),
        mutateEvery: randomBetween(0.22, 0.62),
        mutateT: randomBetween(0, 0.62),
      }));

    const createWaveCells = (): WaveCell[] => {
      const cols = qualityProfile.waveCols;
      const rows = qualityProfile.waveRows;
      const cells: WaveCell[] = [];
      const halfCols = (cols - 1) / 2;
      waveHalfRows = (rows - 1) / 2;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = col - halfCols;
          const z = row - waveHalfRows;
          const seed = randomBetween(0, Math.PI * 2);

          cells.push({
            x,
            z,
            seed,
            radius: Math.hypot(x, z),
            labelIndex: Math.abs(Math.floor(seed * 10 + x + z)) % COMPILER_HINTS.length,
            beamEligible: col % 4 === 0 || col % 4 === 3,
            coreCell: Math.abs(x) < Math.max(5, cols * 0.28),
          });
        }
      }

      return cells;
    };

    const rebuildScene = (preserveWarmupProgress = false) => {
      const rawDpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;

      const baseTier = deriveBaseTier(width, height, rawDpr);
      const resolvedTier = warmupTierCap ? chooseLowerTier(baseTier, warmupTierCap) : baseTier;
      qualityTier = resolvedTier;
      qualityProfile = buildQualityProfile(resolvedTier, width, height);
      dpr = Math.min(rawDpr, qualityProfile.dprCap);

      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      rowFont = width < 900 ? '500 8px "JetBrains Mono", monospace' : '500 9px "JetBrains Mono", monospace';
      waveFont = width < 900 ? '500 8px "JetBrains Mono", monospace' : '500 9px "JetBrains Mono", monospace';

      leftRows = createRows(qualityProfile.sideRowCount);
      rightRows = createRows(qualityProfile.sideRowCount);
      waveCells = createWaveCells();
      warmupSamples = [];
      if (!preserveWarmupProgress) {
        warmupPasses = 0;
      }
      warmupComplete = false;
      lastFrameTime = 0;
      resetPaintCaches();
    };

    const scheduleResize = (immediate = false) => {
      if (resizeTimer !== null) {
        window.clearTimeout(resizeTimer);
        resizeTimer = null;
      }

      if (immediate) {
        rebuildScene();
        return;
      }

      resizeTimer = window.setTimeout(() => {
        resizeTimer = null;
        rebuildScene();
      }, 120);
    };

    const mutateText = (text: string) => {
      const chars = text.split('');
      const mutations = Math.max(1, Math.floor(chars.length * qualityProfile.mutationRate));
      for (let i = 0; i < mutations; i++) {
        const index = Math.floor(Math.random() * chars.length);
        if (chars[index] !== ' ') {
          chars[index] = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
      }
      return chars.join('');
    };

    const drawDotMatrix = () => {
      const gap = qualityProfile.dotGap;
      const offsetY = (time * 10) % gap;

      if (!dotPattern && dotCacheCtx) {
        dotCache.width = gap;
        dotCache.height = gap;
        dotCacheCtx.clearRect(0, 0, gap, gap);
        dotCacheCtx.fillStyle = `rgba(59,130,246,${qualityProfile.dotPatternAlpha})`;
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

      ctx.fillStyle = `rgba(59,130,246,${qualityProfile.dotSparkAlpha})`;
      const timeBucket = Math.floor(time * (qualityProfile.tier === 'low' ? 54 : 88));
      const sparkModulo = gap * 4;

      for (let y = 6 - offsetY; y < height + gap; y += gap) {
        for (let x = 6; x < width; x += gap) {
          if ((x + y + timeBucket) % sparkModulo === 0) {
            ctx.fillRect(x, y, 1.2, 1.2);
          }
        }
      }
    };

    const drawSideRows = (rows: SideRow[], rightSide: boolean, dt: number) => {
      ctx.font = rowFont;
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
          row.text = createAsciiLine(qualityProfile.sideTextLength);
        }

        row.mutateT -= dt;
        if (row.mutateT <= 0) {
          row.text = mutateText(row.text);
          row.mutateT = row.mutateEvery;
        }

        const xDrift = Math.sin(time * 0.9 + index) * row.drift;
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
        pulseGradient.addColorStop(0.5, 'rgba(56,189,248,0.095)');
        pulseGradient.addColorStop(1, 'rgba(56,189,248,0)');
      }

      ctx.strokeStyle = pulseGradient;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, pulseY);
      ctx.lineTo(width, pulseY);
      ctx.stroke();
    };

    const getContourGradient = (index: number, y: number) => {
      if (!contourGradients[index]) {
        const gradient = ctx.createLinearGradient(0, y, width, y);
        gradient.addColorStop(0, 'rgba(56,189,248,0)');
        gradient.addColorStop(0.3, 'rgba(56,189,248,0.026)');
        gradient.addColorStop(0.5, 'rgba(148,163,184,0.06)');
        gradient.addColorStop(0.7, 'rgba(56,189,248,0.026)');
        gradient.addColorStop(1, 'rgba(56,189,248,0)');
        contourGradients[index] = gradient;
      }
      return contourGradients[index];
    };

    const drawWaveField = () => {
      const centerX = width * 0.5;
      const horizonY = height * 0.23;
      const fieldHeight = height * 0.6;
      const colStep = width < 900 ? 9.2 : 11.5;
      const rowStep = height < 800 ? 13.6 : 15.6;
      const amplitude = qualityProfile.tier === 'low' ? 17 : qualityProfile.tier === 'medium' ? 18.5 : 20;

      ctx.font = waveFont;
      ctx.textBaseline = 'middle';

      for (const cell of waveCells) {
        const depth = Math.max(0, Math.min(1, (cell.z + waveHalfRows) / Math.max(1, waveHalfRows * 2)));
        const perspective = 0.24 + depth * 1.18;
        const sx = centerX + cell.x * colStep * perspective;
        const sy = horizonY + (cell.z + waveHalfRows) * rowStep * (0.4 + depth * 0.94);

        if (sx < -60 || sx > width + 60 || sy > horizonY + fieldHeight) {
          continue;
        }

        const ripple = Math.sin(cell.x * 0.46 + time * 2.2 + cell.seed) * 0.95;
        const swell = Math.sin(cell.z * 0.62 - time * 1.85 + cell.seed * 0.6) * 0.9;
        const ring = Math.sin(cell.radius * 0.52 - time * 2.45 + cell.seed) * 0.65;
        const travel = Math.sin((cell.x + cell.z * 0.55) * 0.34 - time * 2.8) * 0.85;
        const wave = (ripple + swell + ring + travel) / 4;

        const lift = wave * amplitude * perspective;
        const heroWeight = Math.max(0.68, 1 - Math.max(0, sy - horizonY) / (fieldHeight * 1.32));
        const compileWeight = 0.92 + heroWeight * 0.52;
        const barWidth = Math.max(1.35, 1 + perspective * 1.75);
        const barHeight = Math.max(14, perspective * (22 + Math.abs(wave) * 34) * compileWeight);
        const topY = sy - lift - barHeight;
        const alpha = Math.min(0.29, (0.045 + perspective * 0.1 + Math.max(0, wave) * 0.08) * compileWeight);

        if (topY > height + 24) {
          continue;
        }

        const glowAlpha = Math.min(qualityProfile.glowOpacity, alpha * 0.58 + 0.026);
        ctx.fillStyle = `rgba(96,165,250,${glowAlpha.toFixed(3)})`;
        ctx.fillRect(sx - barWidth * 1.35, topY - 2, barWidth * 2.7, sy - topY + 4);

        const highlightAlpha = Math.min(qualityProfile.highlightOpacity, alpha * 0.48 + 0.03);
        ctx.fillStyle = `rgba(219,234,254,${highlightAlpha.toFixed(3)})`;
        ctx.fillRect(sx - barWidth, topY - 1, barWidth * 2, 1.5);

        ctx.strokeStyle = `rgba(125,211,252,${alpha.toFixed(3)})`;
        ctx.lineWidth = barWidth;
        ctx.beginPath();
        ctx.moveTo(sx, sy - lift);
        ctx.lineTo(sx, sy);
        ctx.stroke();

        if (qualityProfile.showSecondaryBeams && cell.beamEligible && depth > 0.18) {
          ctx.strokeStyle = `rgba(191,219,254,${(alpha * 0.42).toFixed(3)})`;
          ctx.lineWidth = Math.max(0.6, barWidth * 0.42);
          ctx.beginPath();
          ctx.moveTo(sx + barWidth * 1.8, sy - lift * 0.88);
          ctx.lineTo(sx + barWidth * 1.8, sy + Math.max(10, perspective * 7));
          ctx.stroke();
        }

        if (qualityProfile.showNodeOrbs && cell.coreCell && depth > 0.3) {
          ctx.fillStyle = `rgba(219,234,254,${(alpha * 0.58).toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(sx, sy - lift, Math.max(0.7, barWidth * 0.5), 0, Math.PI * 2);
          ctx.fill();
        }

        if (qualityProfile.showLabels) {
          const flashGate = Math.sin(cell.seed * 4 + time * 2.4 + cell.x * 0.8 - cell.z * 0.3);
          if (flashGate > qualityProfile.labelThreshold && depth > 0.24 && heroWeight > 0.34) {
            const label = COMPILER_HINTS[cell.labelIndex];
            ctx.fillStyle = `rgba(191,219,254,${Math.min(0.26, alpha + 0.06).toFixed(3)})`;
            ctx.fillText(label, sx + 6, topY - 4);
            ctx.fillRect(sx - 1, topY - 2, Math.max(8, label.length * 4.3), 1);
          }
        }
      }

      ctx.save();
      ctx.globalCompositeOperation = 'screen';

      for (let row = 0; row < qualityProfile.contourRows; row++) {
        const y = horizonY + fieldHeight * (0.14 + row * 0.12);
        ctx.strokeStyle = getContourGradient(row, y);
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(width * 0.16, y + Math.sin(time * 1.3 + row * 0.7) * 7);
        ctx.quadraticCurveTo(width * 0.5, y - 16 + Math.sin(time * 1.05 + row * 0.65) * 11, width * 0.84, y + Math.cos(time * 1.18 + row * 0.6) * 7);
        ctx.stroke();
      }

      for (let index = 0; index < qualityProfile.sweepCount; index++) {
        const sweepProgress = (time * (0.12 + index * 0.03) + index * 0.31) % 1;
        const sweepY = horizonY + fieldHeight * (0.1 + sweepProgress * 0.72);
        const sweepAlpha = (0.03 + (1 - sweepProgress) * 0.045).toFixed(3);
        ctx.strokeStyle = `rgba(191,219,254,${sweepAlpha})`;
        ctx.lineWidth = 1.35;
        ctx.beginPath();
        ctx.moveTo(width * 0.18, sweepY + 4);
        ctx.lineTo(width * 0.82, sweepY - 12);
        ctx.stroke();
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

    const evaluateWarmup = () => {
      if (warmupComplete) {
        return null;
      }

      if (warmupSamples.length < 45) {
        return null;
      }

      const sortedSamples = [...warmupSamples].sort((a, b) => a - b);
      const averageDelta = warmupSamples.reduce((sum, value) => sum + value, 0) / warmupSamples.length;
      const p95Delta = sortedSamples[Math.min(sortedSamples.length - 1, Math.floor(sortedSamples.length * 0.95))];
      warmupSamples = [];
      warmupPasses += 1;

      if (averageDelta <= 18.5 && p95Delta <= 24) {
        warmupComplete = true;
        return null;
      }

      if (qualityTier === 'low') {
        warmupComplete = true;
        return null;
      }

      if (warmupPasses >= 2) {
        warmupComplete = true;
        return null;
      }

      if (averageDelta > 22 || p95Delta > 28) {
        return getDowngradedTier(qualityTier, 2);
      }

      return getDowngradedTier(qualityTier);
    };

    const draw = (now: number) => {
      if (document.hidden) {
        rafRef.current = null;
        return;
      }

      if (!lastFrameTime) {
        lastFrameTime = now;
      }

      const deltaMs = Math.min(Math.max(now - lastFrameTime, 8), 50);
      lastFrameTime = now;
      const dt = deltaMs / 1000;
      time += dt;

      ctx.clearRect(0, 0, width, height);

      if (!mainGlow) {
        mainGlow = ctx.createRadialGradient(width * 0.5, height * 0.3, 20, width * 0.5, height * 0.3, Math.max(width, height) * 0.78);
        mainGlow.addColorStop(0, `rgba(37,99,235,${qualityProfile.tier === 'high' ? '0.1' : qualityProfile.tier === 'medium' ? '0.085' : '0.065'})`);
        mainGlow.addColorStop(0.48, 'rgba(37,99,235,0.03)');
        mainGlow.addColorStop(1, 'rgba(2,6,23,0)');
      }

      if (!horizonGlow) {
        horizonGlow = ctx.createRadialGradient(width * 0.5, height * 0.28, 0, width * 0.5, height * 0.28, width * 0.42);
        horizonGlow.addColorStop(0, `rgba(191,219,254,${qualityProfile.tier === 'high' ? '0.11' : qualityProfile.tier === 'medium' ? '0.085' : '0.06'})`);
        horizonGlow.addColorStop(0.18, 'rgba(96,165,250,0.07)');
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
      drawTokenRail(Math.max(90, height * 0.16), 26, 0.26);
      if (qualityProfile.showSecondaryRail) {
        drawTokenRail(Math.max(132, height * 0.21), -18, 0.14);
      }
      drawPulseLine();
      drawSideVignette();

      warmupSamples.push(deltaMs);
      const downgradedTier = evaluateWarmup();
      if (downgradedTier && downgradedTier !== qualityTier) {
        warmupTierCap = downgradedTier;
        rebuildScene(true);
      }

      rafRef.current = window.requestAnimationFrame(draw);
    };

    const stopLoop = () => {
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };

    const startLoop = () => {
      if (rafRef.current === null) {
        rafRef.current = window.requestAnimationFrame(draw);
      }
    };

    const handleResize = () => {
      scheduleResize(false);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopLoop();
        return;
      }

      scheduleResize(true);
      startLoop();
    };

    rebuildScene();
    startLoop();

    window.addEventListener('resize', handleResize);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (resizeTimer !== null) {
        window.clearTimeout(resizeTimer);
      }
      stopLoop();
    };
  }, []);

  return (
    <div id="code-ambient-canvas-container" aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
};

export default CodeAmbientBackground;
