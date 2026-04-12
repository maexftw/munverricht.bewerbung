import React, { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

type PixelCell = {
  color: string;
  size: number;
  startX: number;
  startY: number;
  targetX: number;
  targetY: number;
};

type CropBox = {
  sourceX: number;
  sourceY: number;
  sourceWidth: number;
  sourceHeight: number;
  targetWidth: number;
  targetHeight: number;
  offsetX: number;
  offsetY: number;
};

type WebPortraitParticlesProps = {
  src: string;
  alt: string;
  className?: string;
};

const ASSEMBLE_DURATION_MS = 720;
const CROSSFADE_DURATION_MS = 460;

const easeOutCubic = (value: number) => 1 - Math.pow(1 - value, 3);

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const WebPortraitParticles: React.FC<WebPortraitParticlesProps> = ({ src, alt, className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const animationRef = useRef<number | null>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  const cellsRef = useRef<PixelCell[]>([]);
  const startedRef = useRef(false);
  const cropRef = useRef<CropBox | null>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;
    const imageLayer = imageRef.current;
    if (!container || !canvas || !imageLayer) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const image = new Image();
    image.decoding = 'async';
    image.src = src;

    let disposed = false;
    let width = 0;
    let height = 0;
    let dpr = 1;

    const applyInitialStyles = () => {
      imageLayer.style.opacity = '0';
      canvas.style.opacity = '1';
    };

    const applyCrossfadeStyles = (progress: number) => {
      const opacity = clamp(progress, 0, 1);
      imageLayer.style.opacity = opacity.toFixed(3);
      canvas.style.opacity = (1 - opacity).toFixed(3);
    };

    const applyResolvedStyles = () => {
      imageLayer.style.opacity = '1';
      canvas.style.opacity = '0';
    };

    const computeCrop = (): CropBox | null => {
      if (!image.naturalWidth || !image.naturalHeight) return null;

      const bounds = container.getBoundingClientRect();
      width = Math.max(1, Math.floor(bounds.width));
      height = Math.max(1, Math.floor(bounds.height));
      dpr = Math.min(window.devicePixelRatio || 1, 1.25);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const insetX = width * 0.06;
      const insetY = height * 0.05;
      const targetWidth = Math.max(1, Math.floor(width - insetX * 2));
      const targetHeight = Math.max(1, Math.floor(height - insetY * 2));
      const targetAspect = targetWidth / targetHeight;
      const sourceAspect = image.naturalWidth / image.naturalHeight;
      const focusX = 0.48;
      const focusY = 0.58;

      let sourceWidth = image.naturalWidth;
      let sourceHeight = image.naturalHeight;

      if (sourceAspect > targetAspect) {
        sourceWidth = image.naturalHeight * targetAspect;
      } else {
        sourceHeight = image.naturalWidth / targetAspect;
      }

      const sourceX = clamp(image.naturalWidth * focusX - sourceWidth / 2, 0, image.naturalWidth - sourceWidth);
      const sourceY = clamp(image.naturalHeight * focusY - sourceHeight / 2, 0, image.naturalHeight - sourceHeight);

      return {
        sourceX,
        sourceY,
        sourceWidth,
        sourceHeight,
        targetWidth,
        targetHeight,
        offsetX: Math.floor((width - targetWidth) / 2),
        offsetY: Math.floor((height - targetHeight) / 2),
      };
    };

    const rebuildCells = () => {
      const crop = computeCrop();
      if (!crop) return;

      cropRef.current = crop;
      imageLayer.style.left = `${crop.offsetX}px`;
      imageLayer.style.top = `${crop.offsetY}px`;
      imageLayer.style.width = `${crop.targetWidth}px`;
      imageLayer.style.height = `${crop.targetHeight}px`;

      const sampleStep = Math.max(5, Math.round(crop.targetWidth / 96));
      const offscreen = document.createElement('canvas');
      offscreen.width = crop.targetWidth;
      offscreen.height = crop.targetHeight;

      const offscreenCtx = offscreen.getContext('2d', { willReadFrequently: true });
      if (!offscreenCtx) return;

      offscreenCtx.clearRect(0, 0, crop.targetWidth, crop.targetHeight);
      offscreenCtx.drawImage(
        image,
        crop.sourceX,
        crop.sourceY,
        crop.sourceWidth,
        crop.sourceHeight,
        0,
        0,
        crop.targetWidth,
        crop.targetHeight
      );

      const imageData = offscreenCtx.getImageData(0, 0, crop.targetWidth, crop.targetHeight);
      const nextCells: PixelCell[] = [];

      for (let y = 0; y < crop.targetHeight; y += sampleStep) {
        for (let x = 0; x < crop.targetWidth; x += sampleStep) {
          const index = (y * crop.targetWidth + x) * 4;
          const alpha = imageData.data[index + 3] / 255;
          if (alpha < 0.08) continue;

          const red = imageData.data[index];
          const green = imageData.data[index + 1];
          const blue = imageData.data[index + 2];
          const luminance = (red * 299 + green * 587 + blue * 114) / 1000;

          if (luminance > 248) continue;

          const targetX = crop.offsetX + x;
          const targetY = crop.offsetY + y;
          const drift = sampleStep * 3.4;

          nextCells.push({
            color: `rgb(${red}, ${green}, ${blue})`,
            size: sampleStep * 1.06,
            startX: targetX + (Math.random() - 0.5) * drift,
            startY: targetY + (Math.random() - 0.5) * drift,
            targetX,
            targetY,
          });
        }
      }

      cellsRef.current = nextCells;
      applyInitialStyles();
    };

    const drawCells = (assembleProgress: number) => {
      ctx.clearRect(0, 0, width, height);

      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, 'rgba(255,255,255,0.018)');
      gradient.addColorStop(0.5, 'rgba(191,219,254,0.032)');
      gradient.addColorStop(1, 'rgba(224,242,254,0.012)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      const eased = easeOutCubic(assembleProgress);

      for (const cell of cellsRef.current) {
        const x = cell.startX + (cell.targetX - cell.startX) * eased;
        const y = cell.startY + (cell.targetY - cell.startY) * eased;
        ctx.globalAlpha = 0.98;
        ctx.fillStyle = cell.color;
        ctx.fillRect(x, y, cell.size, cell.size);
      }

      ctx.globalAlpha = 1;
    };

    const startReveal = () => {
      if (startedRef.current || disposed || cellsRef.current.length === 0) return;
      startedRef.current = true;

      const assembleStart = performance.now();
      let crossfadeStart: number | null = null;

      const tick = (now: number) => {
        if (disposed) return;

        if (crossfadeStart === null) {
          const assembleElapsed = now - assembleStart;
          const assembleProgress = clamp(assembleElapsed / ASSEMBLE_DURATION_MS, 0, 1);
          drawCells(assembleProgress);

          if (assembleProgress < 1) {
            animationRef.current = window.requestAnimationFrame(tick);
            return;
          }

          crossfadeStart = now;
        }

        drawCells(1);
        const crossfadeElapsed = now - crossfadeStart;
        const crossfadeProgress = clamp(crossfadeElapsed / CROSSFADE_DURATION_MS, 0, 1);
        applyCrossfadeStyles(crossfadeProgress);

        if (crossfadeProgress < 1) {
          animationRef.current = window.requestAnimationFrame(tick);
          return;
        }

        applyResolvedStyles();
        animationRef.current = null;
      };

      animationRef.current = window.requestAnimationFrame(tick);
    };

    image.onload = () => {
      if (disposed) return;
      rebuildCells();
      drawCells(0);
    };

    resizeObserverRef.current = new ResizeObserver(() => {
      rebuildCells();
      drawCells(startedRef.current ? 1 : 0);
      if (startedRef.current) {
        applyResolvedStyles();
      }
    });
    resizeObserverRef.current.observe(container);

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (!entry?.isIntersecting) return;
        startReveal();
      },
      { threshold: 0.18, rootMargin: '0px 0px -8% 0px' }
    );

    observer.observe(container);

    return () => {
      disposed = true;
      observer.disconnect();
      resizeObserverRef.current?.disconnect();
      if (animationRef.current !== null) {
        window.cancelAnimationFrame(animationRef.current);
      }
    };
  }, [shouldReduceMotion, src]);

  return (
    <div
      ref={containerRef}
      data-portrait-root="true"
      className={`relative overflow-hidden rounded-[1.8rem] border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.88),rgba(239,246,255,0.78))] shadow-[0_24px_60px_rgba(15,23,42,0.08),inset_0_1px_0_rgba(255,255,255,0.88)] ${className}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(59,130,246,0.12),transparent_34%),radial-gradient(circle_at_76%_16%,rgba(14,165,233,0.1),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0))]" aria-hidden="true" />

      {shouldReduceMotion ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="relative z-10 h-full w-full object-cover object-[48%_58%]"
        />
      ) : (
        <>
          <img
            ref={imageRef}
            src={src}
            alt={alt}
            loading="lazy"
            decoding="async"
            className="absolute z-0 object-cover object-[48%_58%] opacity-0 transition-opacity duration-[460ms] ease-out"
          />
          <canvas
            ref={canvasRef}
            className="relative z-10 h-full w-full transition-opacity duration-[460ms] ease-out"
            aria-hidden="true"
          />
        </>
      )}

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-24 bg-[linear-gradient(to_top,rgba(239,246,255,0.72),transparent)]" aria-hidden="true" />
    </div>
  );
};

export default WebPortraitParticles;
