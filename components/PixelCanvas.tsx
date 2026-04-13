import React, { useEffect, useRef, useState } from 'react';

interface PixelCanvasProps {
  colors?: string[];
  gap?: number;
  speed?: number;
  density?: number; // 0 to 1, where 1 is original density
  noFocus?: boolean;
  ambient?: boolean; // Continuously animate some pixels autonomously
  fixed?: boolean; // Keep canvas fixed to viewport
}

class Pixel {
  width: number;
  height: number;
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  color: string;
  speed: number;
  size: number = 0;
  sizeStep: number = Math.random() * 0.4 + 0.1;
  minSize: number = 0.5;
  maxSizeInteger: number = 4;
  maxSize: number;
  delay: number;
  counter: number = 0;
  counterStep: number;
  isIdle: boolean = true;
  isReverse: boolean = false;
  isShimmer: boolean = false;
  ambientLife: number = 0;
  ambientBias: number;
  focusFade: number;
  baseMaxSize: number;
  ambientBoost: number = 1;

  constructor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, x: number, y: number, color: string, speed: number, delay: number, ambientBias: number, focusFade: number, maxPixelSize: number) {
    this.width = canvas.width;
    this.height = canvas.height;
    this.ctx = context;
    this.x = x;
    this.y = y;
    this.color = color;
    this.speed = (Math.random() * 0.8 + 0.1) * speed;
    this.maxSizeInteger = maxPixelSize;
    this.maxSize = Math.random() * (this.maxSizeInteger - this.minSize) + this.minSize;
    this.baseMaxSize = this.maxSize;
    this.delay = delay;
    this.counterStep = Math.random() * 4 + (this.width + this.height) * 0.01;
    this.ambientBias = ambientBias;
    this.focusFade = focusFade;
  }

  draw() {
    const centerOffset = this.maxSizeInteger * 0.5 - this.size * 0.5;
    const alphaFloor = 0.02 + (1 - this.focusFade) * 0.04;
    const alphaCeiling = 0.26 + (1 - this.focusFade) * 0.42;
    const alpha = Math.max(
      alphaFloor,
      Math.min(alphaCeiling, (this.size / Math.max(this.maxSizeInteger, 1)) * (0.42 + (1 - this.focusFade) * 0.58))
    );
    this.ctx.fillStyle = toRGBA(this.color, alpha);
    this.ctx.fillRect(
      this.x + centerOffset,
      this.y + centerOffset,
      this.size,
      this.size
    );
  }

  appear() {
    this.isIdle = false;
    if (this.counter <= this.delay) {
      this.counter += this.counterStep;
      return;
    }
    if (this.size >= this.maxSize) {
      this.isShimmer = true;
    }
    if (this.isShimmer) {
      this.shimmer();
    } else {
      this.size += this.sizeStep;
    }
    this.draw();
  }

  disappear() {
    this.isShimmer = false;
    if (this.size <= 0) {
      this.size = 0;
      this.isIdle = true;
      return;
    }

    const decayStep = Math.max(this.sizeStep * 0.9, this.speed * 0.75, 0.06);
    this.size = Math.max(0, this.size - decayStep);
    this.draw();
  }

  shimmer() {
    if (this.size >= this.maxSize) this.isReverse = true;
    else if (this.size <= this.minSize) this.isReverse = false;
    
    if (this.isReverse) this.size -= this.speed;
    else this.size += this.speed;
  }

  // Ambient Logic
  ambientWake(strength: number = 1, nextColor?: string) {
    this.isIdle = false;
    this.isReverse = false;
    this.isShimmer = false;
    this.ambientBoost = 0.8 + strength * 0.9;
    this.ambientLife = 90 + Math.random() * 120 * Math.max(0.75, strength);
    if (nextColor) this.color = nextColor;
  }

  ambientCycle(time: number) {
    if (this.ambientLife > 0) {
      this.ambientLife -= 1;
      const pulse = (Math.sin(time * 0.0022 + this.x * 0.018 + this.y * 0.014) + 1) * 0.5;
      const targetSize = Math.min(
        this.maxSizeInteger,
        Math.max(this.minSize, this.baseMaxSize * this.ambientBoost * (0.7 + pulse * 0.55))
      );

      if (this.size < targetSize) {
        this.size = Math.min(targetSize, this.size + this.sizeStep * 0.7 + this.speed * 1.4);
      } else {
        this.size = Math.max(targetSize, this.size - Math.max(this.speed * 0.4, 0.03));
      }
    } else {
      const decayStep = Math.max(this.speed * 0.6, this.sizeStep * 0.6, 0.04);
      if (this.size <= 0) {
        this.size = 0;
        this.isIdle = true;
      } else {
        this.size = Math.max(0, this.size - decayStep);
      }
    }
    
    if (this.size > 0) {
      this.draw();
    }
  }
}

const toRGBA = (color: string, alpha: number) => {
  const trimmed = color.trim();

  if (trimmed.startsWith('#')) {
    const hex = trimmed.slice(1);
    const normalized = hex.length === 3
      ? hex.split('').map((char) => char + char).join('')
      : hex;

    if (normalized.length === 6) {
      const r = parseInt(normalized.slice(0, 2), 16);
      const g = parseInt(normalized.slice(2, 4), 16);
      const b = parseInt(normalized.slice(4, 6), 16);
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
  }

  const rgbMatch = trimmed.match(/rgba?\(([^)]+)\)/i);
  if (rgbMatch) {
    const [r = '255', g = '255', b = '255'] = rgbMatch[1].split(',').map((part) => part.trim());
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  return trimmed;
};

const AmbientPixelCanvas: React.FC<PixelCanvasProps> = ({ 
  colors = ["#2563eb", "#60a5fa", "#93c5fd"], 
  gap = 6, 
  speed = 40,
  density = 0.3, 
  noFocus = false,
  ambient = false,
  fixed = false
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);
  const pixelsRef = useRef<Pixel[]>([]);
  const [animationType, setAnimationType] = useState<'appear' | 'disappear'>('disappear');

  const colorsStr = colors.join(',');

  useEffect(() => {
    if (ambient) return; // Ignore hover events if purely ambient

    const container = containerRef.current?.parentElement;
    if (!container) return;

    const handleEnter = () => setAnimationType('appear');
    const handleLeave = () => setAnimationType('disappear');

    container.addEventListener('mouseenter', handleEnter);
    container.addEventListener('mouseleave', handleLeave);
    if (!noFocus) {
      container.addEventListener('focusin', handleEnter);
      container.addEventListener('focusout', handleLeave);
    }

    return () => {
      container.removeEventListener('mouseenter', handleEnter);
      container.removeEventListener('mouseleave', handleLeave);
      if (!noFocus) {
        container.removeEventListener('focusin', handleEnter);
        container.removeEventListener('focusout', handleLeave);
      }
    };
  }, [noFocus, ambient]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let timePrevious = performance.now();
    const timeInterval = 1000 / 60;

    const init = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const pixels: Pixel[] = [];
      const speedVal = speed * 0.001;
      const colorList = colorsStr.split(',');
      const focusX = rect.width * 0.5;
      const focusY = fixed ? rect.height * 0.34 : rect.height * 0.48;
      const maxDistance = Math.hypot(rect.width * 0.5, rect.height * 0.7) || 1;
      const maxPixelSize = fixed ? Math.max(1.4, Math.min(2, gap * 0.16)) : 4;
      
      for (let x = 0; x < rect.width; x += gap) {
        for (let y = 0; y < rect.height; y += gap) {
          if (Math.random() > density) continue;

          const color = colorList[Math.floor(Math.random() * colorList.length)];
          const dx = x - rect.width / 2;
          const dy = y - rect.height / 2;
          const delay = Math.sqrt(dx * dx + dy * dy);
          const focusDistance = Math.hypot(x - focusX, y - focusY);
          const ambientBias = 1 - Math.min(1, focusDistance / maxDistance);
          const focusFade = fixed ? Math.min(0.92, ambientBias * 0.92) : ambientBias * 0.32;

          pixels.push(new Pixel(canvas, ctx, x, y, color, speedVal, delay, ambientBias, focusFade, maxPixelSize));
        }
      }
      pixelsRef.current = pixels;
    };

    const pickAmbientColor = (strength: number, time: number) => {
      const list = colorsStr.split(',');
      if (list.length === 1) return list[0];

      const weightedIndex = Math.floor(
        ((Math.sin(time * 0.001 + strength * 2.4) + 1) * 0.5) * list.length
      ) % list.length;

      return list[Math.max(0, Math.min(list.length - 1, weightedIndex))];
    };

    const animate = () => {
      const timeNow = performance.now();
      const timePassed = timeNow - timePrevious;

      if (timePassed >= timeInterval) {
        timePrevious = timeNow - (timePassed % timeInterval);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        let allIdle = true;
        for (const pixel of pixelsRef.current) {
          if (ambient) {
            const motionFactor = 1;
            const largeWave = (Math.sin(timeNow * 0.00105 + pixel.x * 0.003) + 1) * 0.5;
            const detailWave = (Math.sin(timeNow * 0.0018 - pixel.y * 0.012 + pixel.x * 0.006) + 1) * 0.5;
            const focusBoost = fixed ? pixel.ambientBias * 0.007 : pixel.ambientBias * 0.004;
            const wakeChance = motionFactor * (0.0009 + largeWave * 0.0019 + detailWave * 0.0015 + focusBoost);

            if (pixel.isIdle && Math.random() < wakeChance) {
              const wakeStrength = 0.72 + largeWave * 0.34 + detailWave * 0.24 + pixel.ambientBias * (fixed ? 0.24 : 0.14);
              pixel.ambientWake(wakeStrength * motionFactor, pickAmbientColor(wakeStrength, timeNow));
            }
            if (!pixel.isIdle) {
              pixel.ambientCycle(timeNow);
              allIdle = false;
            }
          } else {
            // Hover loop
            pixel[animationType]();
            if (!pixel.isIdle) allIdle = false;
          }
        }

        // Only stop RAF if purely interactive and all pixels are done disappearing
        if (!ambient && allIdle && animationType === 'disappear') {
          rafRef.current = null;
          return;
        }
      }
      
      // Crucial: continue looping!
      rafRef.current = requestAnimationFrame(animate);
    };

    init();
    rafRef.current = requestAnimationFrame(animate);

    const resizeObserver = new ResizeObserver(init);
    resizeObserver.observe(canvas);

    return () => {
      resizeObserver.disconnect();
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [colorsStr, gap, speed, density, animationType, ambient, fixed]);

  return (
    <div ref={containerRef} className={`${fixed ? 'fixed' : 'absolute'} inset-0 z-0 pointer-events-none overflow-hidden`}>
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
};

export default AmbientPixelCanvas;
