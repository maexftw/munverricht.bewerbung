import React, { useEffect, useRef } from 'react';
import p5 from 'p5';

const WebdesignSignalArt: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const instanceRef = useRef<p5 | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const sketch = (p: p5) => {
      const layers = 4;
      const ribbons: Array<Array<{ x: number; depth: number; seed: number }>> = [];
      let reducedMotion = false;

      const rebuildScene = () => {
        ribbons.length = 0;
        const pointCount = p.width < 760 ? 13 : 18;

        for (let layer = 0; layer < layers; layer += 1) {
          const points: Array<{ x: number; depth: number; seed: number }> = [];
          for (let index = 0; index < pointCount; index += 1) {
            points.push({
              x: (index / (pointCount - 1)) * p.width,
              depth: layer / Math.max(layers - 1, 1),
              seed: p.random(1000),
            });
          }
          ribbons.push(points);
        }
      };

      p.setup = () => {
        const canvas = p.createCanvas(containerRef.current!.clientWidth, containerRef.current!.clientHeight);
        canvas.parent(containerRef.current!);
        p.pixelDensity(Math.min(window.devicePixelRatio || 1, 2));
        p.noiseDetail(2, 0.45);
        p.strokeJoin(p.ROUND);
        p.strokeCap(p.ROUND);
        reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        rebuildScene();
      };

      p.windowResized = () => {
        if (!containerRef.current) return;
        p.resizeCanvas(containerRef.current.clientWidth, containerRef.current.clientHeight);
        rebuildScene();
      };

      p.draw = () => {
        const css = getComputedStyle(document.documentElement);
        const backgroundColor = css.getPropertyValue('--surface-solid').trim() || '#101624';

        p.background(backgroundColor);
        p.noStroke();

        const time = reducedMotion ? 0.18 : p.millis() * 0.00016;
        const centerX = p.width * 0.56;
        const centerY = p.height * 0.46;

        const halo = p.drawingContext.createRadialGradient(centerX, centerY, 0, centerX, centerY, p.width * 0.54);
        halo.addColorStop(0, 'rgba(191,219,254,0.22)');
        halo.addColorStop(0.38, 'rgba(96,165,250,0.12)');
        halo.addColorStop(1, 'rgba(5,7,13,0)');
        p.drawingContext.fillStyle = halo;
        p.rect(0, 0, p.width, p.height);

        for (let layerIndex = 0; layerIndex < ribbons.length; layerIndex += 1) {
          const layer = ribbons[layerIndex];
          const depth = layerIndex / Math.max(ribbons.length - 1, 1);
          const baseY = p.map(depth, 0, 1, p.height * 0.22, p.height * 0.84);
          const bandHeight = p.map(depth, 0, 1, 110, 34);
          const drift = reducedMotion ? 0 : p.sin(time * (4 + depth * 2.6)) * (18 - depth * 6);
          const tilt = (depth - 0.5) * 90;

          p.noFill();
          p.stroke(96, 165, 250, p.map(depth, 0, 1, 100, 185));
          p.strokeWeight(p.map(depth, 0, 1, 0.9, 2.6));
          p.beginShape();
          for (let i = 0; i < layer.length; i += 1) {
            const point = layer[i];
            const wave = p.noise(point.x * 0.0028, depth * 2.4, time + point.seed) - 0.5;
            const y = baseY + wave * bandHeight + drift + p.sin(time * 8 + point.seed) * (depth * 10);
            const x = point.x + p.sin(time * 5 + point.seed * 0.3) * (12 - depth * 4) + tilt;
            p.curveVertex(x, y);
          }
          p.endShape();

          for (let i = 1; i < layer.length - 1; i += 3) {
            const point = layer[i];
            const wave = p.noise(point.x * 0.0028, depth * 2.4, time + point.seed) - 0.5;
            const y = baseY + wave * bandHeight + drift;
            const x = point.x + p.sin(time * 5 + point.seed * 0.3) * (12 - depth * 4) + tilt;

            p.noStroke();
            p.fill(191, 219, 254, p.map(depth, 0, 1, 55, 150));
            p.circle(x, y, p.map(depth, 0, 1, 3.5, 8.5));
            p.noFill();
            p.stroke(191, 219, 254, p.map(depth, 0, 1, 24, 70));
            p.strokeWeight(0.8);
            p.circle(x, y, p.map(depth, 0, 1, 11, 18));
          }
        }
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
      className="relative h-[420px] w-full overflow-hidden rounded-[2.3rem] border border-[color:var(--accent-border)] bg-[color:var(--surface-solid)] shadow-[0_30px_100px_rgba(4,8,18,0.34)] [transform:rotateX(10deg)_rotateY(-12deg)] [transform-style:preserve-3d]"
      aria-hidden="true"
    />
  );
};

export default WebdesignSignalArt;
