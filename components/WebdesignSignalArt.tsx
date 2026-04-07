import React, { useEffect, useRef } from 'react';
import p5 from 'p5';

const WebdesignSignalArt: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const instanceRef = useRef<p5 | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const sketch = (p: p5) => {
      const columns = 18;
      const rows = 12;
      const cells: Array<{ x: number; y: number; seed: number }> = [];
      let reducedMotion = false;

      const rebuildGrid = () => {
        cells.length = 0;
        const spacingX = p.width / (columns + 1);
        const spacingY = p.height / (rows + 1);

        for (let row = 0; row < rows; row += 1) {
          for (let col = 0; col < columns; col += 1) {
            cells.push({
              x: spacingX * (col + 1),
              y: spacingY * (row + 1),
              seed: p.random(1000),
            });
          }
        }
      };

      p.setup = () => {
        const canvas = p.createCanvas(containerRef.current!.clientWidth, containerRef.current!.clientHeight);
        canvas.parent(containerRef.current!);
        p.pixelDensity(Math.min(window.devicePixelRatio || 1, 2));
        p.noFill();
        p.strokeCap(p.ROUND);
        reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        rebuildGrid();
      };

      p.windowResized = () => {
        if (!containerRef.current) return;
        p.resizeCanvas(containerRef.current.clientWidth, containerRef.current.clientHeight);
        rebuildGrid();
      };

      p.draw = () => {
        const backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--surface-solid').trim() || '#101624';
        p.background(backgroundColor);

        p.push();
        p.translate(0, p.height * 0.03);

        const time = reducedMotion ? 0.4 : p.millis() * 0.00018;
        const centerX = p.width * 0.5;
        const centerY = p.height * 0.48;

        for (let i = 0; i < cells.length; i += 1) {
          const cell = cells[i];
          const distanceToCenter = p.dist(cell.x, cell.y, centerX, centerY);
          const normalizedDistance = distanceToCenter / Math.max(p.width, p.height);
          const pulse = p.sin(time * 10 + cell.seed) * 0.5 + 0.5;
          const angle = p.noise(cell.x * 0.0032, cell.y * 0.0032, time + cell.seed) * p.TWO_PI * 1.35;
          const lineLength = p.map(normalizedDistance, 0, 0.8, 52, 18, true) + pulse * 10;
          const drift = reducedMotion ? 0 : p.sin(time * 6 + cell.seed * 0.3) * 12;
          const x = cell.x + drift;
          const y = cell.y;
          const alpha = p.map(normalizedDistance, 0, 0.9, 140, 42, true);

          p.stroke(96, 165, 250, alpha);
          p.strokeWeight(p.map(normalizedDistance, 0, 0.9, 2.2, 0.8, true));
          p.line(
            x - p.cos(angle) * lineLength * 0.5,
            y - p.sin(angle) * lineLength * 0.5,
            x + p.cos(angle) * lineLength * 0.5,
            y + p.sin(angle) * lineLength * 0.5,
          );

          if (i % 3 === 0) {
            const ringSize = p.map(normalizedDistance, 0, 0.9, 9, 3, true) + pulse * 1.4;
            p.stroke(191, 219, 254, alpha * 0.4);
            p.strokeWeight(0.7);
            p.circle(x, y, ringSize);
          }
        }

        p.pop();
      };
    };

    instanceRef.current = new p5(sketch);

    return () => {
      instanceRef.current?.remove();
      instanceRef.current = null;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-[340px] w-full overflow-hidden rounded-[2rem] border border-[color:var(--accent-border)] bg-[color:var(--surface-solid)] shadow-[0_24px_80px_rgba(4,8,18,0.28)]"
      aria-hidden="true"
    />
  );
};

export default WebdesignSignalArt;
