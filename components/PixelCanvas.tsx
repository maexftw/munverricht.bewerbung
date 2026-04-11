import React, { useEffect, useRef, useState } from 'react';

interface PixelCanvasProps {
  colors?: string[];
  gap?: number;
  speed?: number;
  noFocus?: boolean;
  className?: string;
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
  sizeStep: number = Math.random() * 0.4;
  minSize: number = 0.5;
  maxSizeInteger: number = 2;
  maxSize: number;
  delay: number;
  counter: number = 0;
  counterStep: number;
  isIdle: boolean = false;
  isReverse: boolean = false;
  isShimmer: boolean = false;

  constructor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, x: number, y: number, color: string, speed: number, delay: number) {
    this.width = canvas.width;
    this.height = canvas.height;
    this.ctx = context;
    this.x = x;
    this.y = y;
    this.color = color;
    this.speed = (Math.random() * 0.8 + 0.1) * speed;
    this.maxSize = Math.random() * (this.maxSizeInteger - this.minSize) + this.minSize;
    this.delay = delay;
    this.counterStep = Math.random() * 4 + (this.width + this.height) * 0.01;
  }

  draw() {
    const centerOffset = this.maxSizeInteger * 0.5 - this.size * 0.5;
    this.ctx.fillStyle = this.color;
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
    if (this.counter > this.delay) {
      this.counter = Math.max(this.delay, this.counter - this.counterStep);
      this.draw();
      return;
    }

    if (this.size <= 0) {
      this.isIdle = true;
      return;
    } else {
      this.size = Math.max(0, this.size - this.sizeStep);
    }
    this.draw();
  }

  shimmer() {
    if (this.size >= this.maxSize) {
      this.isReverse = true;
    } else if (this.size <= this.minSize) {
      this.isReverse = false;
    }
    if (this.isReverse) {
      this.size -= this.speed;
    } else {
      this.size += this.sizeStep; // Using sizeStep for smoother shimmer like src
    }
    // Re-evaluating shimmer logic to match script.js exactly
    if (this.isReverse) {
      this.size -= this.speed;
    } else {
      this.size += this.speed;
    }
  }
}

const PixelCanvas: React.FC<PixelCanvasProps> = ({ 
  colors = ["#f8fafc", "#f1f5f9", "#cbd5e1"], 
  gap = 5, 
  speed = 35,
  noFocus = false,
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pixelsRef = useRef<Pixel[]>([]);
  const animationRef = useRef<number | null>(null);
  const timePreviousRef = useRef(performance.now());
  const [animationType, setAnimationType] = useState<'appear' | 'disappear'>('disappear');
  const speedVal = speed * 0.001;

  useEffect(() => {
    const container = containerRef.current?.parentElement;
    if (!container) return;

    const handleEnter = () => {
      setAnimationType('appear');
    };

    const handleLeave = () => {
      setAnimationType('disappear');
    };

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
  }, [noFocus]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const timeInterval = 1000 / 60;

    const init = () => {
      const parent = containerRef.current;
      if (!parent || !canvas) return;

      const rect = parent.getBoundingClientRect();
      const width = Math.floor(rect.width);
      const height = Math.floor(rect.height);
      canvas.width = width;
      canvas.height = height;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      const pixels: Pixel[] = [];
      for (let x = 0; x < width; x += gap) {
        for (let y = 0; y < height; y += gap) {
          const color = colors[Math.floor(Math.random() * colors.length)];
          const dx = x - width / 2;
          const dy = y - height / 2;
          const delay = Math.sqrt(dx * dx + dy * dy);
          pixels.push(new Pixel(canvas, ctx, x, y, color, speedVal, delay));
        }
      }
      pixelsRef.current = pixels;
    };

    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);

      const timeNow = performance.now();
      const timePassed = timeNow - timePreviousRef.current;

      if (timePassed < timeInterval) return;

      timePreviousRef.current = timeNow - (timePassed % timeInterval);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < pixelsRef.current.length; i++) {
        pixelsRef.current[i][animationType]();
      }

      if (animationType === 'disappear' && pixelsRef.current.every((p) => p.isIdle)) {
        if (animationRef.current) cancelAnimationFrame(animationRef.current);
      }
    };

    init();
    animationRef.current = requestAnimationFrame(animate);

    const resizeObserver = new ResizeObserver(init);
    resizeObserver.observe(canvas);

    return () => {
      resizeObserver.disconnect();
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [colors, gap, speedVal, animationType]);

  return (
    <div ref={containerRef} className={`absolute inset-0 z-0 pointer-events-none overflow-hidden ${className}`.trim()}>
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
};

export default PixelCanvas;
