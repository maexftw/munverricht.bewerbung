import React, { useEffect, useRef } from 'react';
import p5 from 'p5';

interface KineticTypeProps {
  reducedMotion: boolean;
}

interface GlyphParticle {
  char: string;
  pos: p5.Vector;
  vel: p5.Vector;
  target: p5.Vector;
  layerOffset: number;
  size: number;
  phase: number;
  tint: number;
}

const PORTFOLIO_VOCAB = [
  'REACT',
  'CLOUDFLARE',
  'SYSTEMS',
  'CONTENT',
  'AGENTS',
  'RELEASE',
  'VERIFY',
  'BUILD',
];

const createSeededRandom = (seedValue: number) => {
  let state = seedValue >>> 0;
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 0x1_0000_0000;
  };
};

export const KineticType: React.FC<KineticTypeProps> = ({ reducedMotion }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const p5Ref = useRef<p5 | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const sketch = (p: p5) => {
      const particles: GlyphParticle[] = [];
      const seedRandom = createSeededRandom(20260720);
      const pointer = {
        x: 0,
        y: 0,
        active: false,
        down: false,
      };

      const palette: Array<[number, number, number]> = [
        [248, 250, 252],
        [148, 163, 184],
        [56, 189, 248],
        [34, 211, 238],
        [96, 165, 250],
      ];

      let pointerSpeed = 0;
      let prevPointerX = 0;
      let prevPointerY = 0;
      let time = 0;

      const buildLayout = (width: number, height: number) => {
        const compact = width < 900 || height < 640;
        const wordsPerRow = compact ? 1 : 2;
        const layers = compact ? 1 : 2;
        const rows = Math.ceil(PORTFOLIO_VOCAB.length / wordsPerRow);

        const fieldLeft = compact ? width * 0.05 : width * 0.46;
        const fieldWidth = compact ? width * 0.9 : width * 0.50;
        const baseTop = compact ? height * 0.22 : height * 0.18;
        const rowHeight = compact ? Math.max(62, height * 0.16) : Math.max(82, height * 0.17);
        const fontBase = compact ? 24 : 32;
        const baseSize = compact ? 23 : 28;
        const jitterX = compact ? 12 : 20;
        const jitterY = compact ? 10 : 18;

        p.textSize(baseSize);

        const newTargets: { target: p5.Vector; char: string; layer: number; size: number; phase: number; tint: number }[] = [];
        const wordCount = PORTFOLIO_VOCAB.length;

        for (let layer = 0; layer < layers; layer++) {
          const layerAmpY = compact ? 16 : 28;
          const layerShiftX = (seedRandom() - 0.5) * width * 0.02;
          const layerShiftY = (seedRandom() - 0.5) * height * 0.02;
          const layerDrift = layer * 0.38;

          for (let i = 0; i < wordCount; i++) {
            const word = PORTFOLIO_VOCAB[i];
            const row = Math.floor(i / wordsPerRow);
            const col = wordsPerRow === 1 ? 0 : i % wordsPerRow;
            const rowWidthScale = wordsPerRow === 1 ? 0 : col / (wordsPerRow - 1);

            const anchorX = fieldLeft + rowWidthScale * Math.max(fieldWidth * 0.72, fontBase * 3);
            const anchorY =
              baseTop +
              row * rowHeight +
              Math.sin(layer + layerDrift + i * 0.42) * layerAmpY +
              layer * (compact ? 2 : 8) +
              (compact ? 0 : (rows > 3 ? (row - (rows - 1) / 2) * 14 : 0));

            const spread = compact ? 12 : 16;
            const startX =
              anchorX - (p.textWidth(word) + word.length * spread) * 0.2 +
              (seedRandom() - 0.5) * jitterX +
              layerShiftX;
            const jitteredY = anchorY + (seedRandom() - 0.5) * jitterY + layerShiftY;
            const jitteredXBase = startX + layerShiftX;

            for (let c = 0; c < word.length; c++) {
              const x = jitteredXBase + c * (baseSize * 0.82 + spread);
              const y = jitteredY + Math.sin((c + 1) * 0.9 + layer) * 5;
              const size = baseSize + Math.round((seedRandom() - 0.5) * 4);
              const target = p.createVector(x, y);
              const phase = seedRandom() * Math.PI * 2;
              const tint = (i + c + layer * 3) / (wordCount + layer + 1);
              newTargets.push({ target, char: word[c], layer, size, phase, tint });
            }
          }
        }

        if (particles.length !== newTargets.length) {
          particles.length = 0;
          for (let i = 0; i < newTargets.length; i++) {
            const item = newTargets[i];
            const jitter = p.createVector(
              (seedRandom() - 0.5) * width * 0.16,
              (seedRandom() - 0.5) * height * 0.16,
            );
            const initial = p.createVector(
              item.target.x + jitter.x,
              item.target.y + jitter.y,
            );
            particles.push({
              char: item.char,
              pos: initial,
              vel: p.createVector(0, 0),
              target: item.target.copy(),
              layerOffset: item.layer,
              size: item.size,
              phase: item.phase,
              tint: item.tint,
            });
          }
          return;
        }

        for (let i = 0; i < particles.length; i++) {
          particles[i].target.set(newTargets[i].target);
          particles[i].char = newTargets[i].char;
          particles[i].layerOffset = newTargets[i].layer;
          particles[i].size = newTargets[i].size;
          particles[i].phase = newTargets[i].phase;
          particles[i].tint = newTargets[i].tint;
        }
      };

      const updatePointerState = () => {
        const touches = (p as unknown as { touches?: Array<{ x: number; y: number }> }).touches;

        if (touches && touches.length > 0) {
          pointer.x = touches[0].x;
          pointer.y = touches[0].y;
          pointer.active = true;
          pointer.down = true;
          return;
        }

        pointer.x = p.mouseX;
        pointer.y = p.mouseY;
        pointer.active =
          p.mouseX > 0 && p.mouseY > 0 && p.mouseX < p.width && p.mouseY < p.height;
        pointer.down = p.mouseIsPressed && pointer.active;
      };

      const clampToBounds = (value: number, min: number, max: number) =>
        Math.max(min, Math.min(max, value));

      const drawStatic = () => {
        p.clear();
        p.background(2, 7, 22);
        p.noFill();
        p.strokeWeight(1);

        const cx = p.width * 0.72;
        const cy = p.height * 0.52;
        const rad = Math.min(p.width, p.height) * 0.48;
        p.stroke(34, 211, 238, 22);
        p.circle(cx, cy, rad);
        p.stroke(148, 163, 184, 10);
        p.line(cx - rad * 0.3, cy, cx + rad * 0.3, cy);

        p.noStroke();
        p.textAlign(p.CENTER, p.CENTER);
        p.textFont('JetBrains Mono');

        for (const g of particles) {
          const jitter = Math.sin(time * 0.2 + g.phase) * 1.2;
          const pulse = 0.76 + Math.sin(time * 0.3 + g.phase * 2) * 0.05;
          p.fill(186, 228, 255, 240);
          p.textSize(g.size * 1.02 * pulse);
          p.text(g.char, g.pos.x, g.pos.y + jitter);
        }
      };

      const drawLive = () => {
        p.clear();
        p.background(2, 7, 22);

        const fieldGlow = {
          x: p.width * 0.68,
          y: p.height * 0.57,
          radius: Math.min(p.width, p.height) * 0.55,
        };
        const field = p.drawingContext;
        const gradient = field.createRadialGradient(
          fieldGlow.x,
          fieldGlow.y,
          0,
          fieldGlow.x,
          fieldGlow.y,
          fieldGlow.radius,
        );
        gradient.addColorStop(0, 'rgba(56, 189, 248, 0.11)');
        gradient.addColorStop(0.5, 'rgba(14, 165, 233, 0.08)');
        gradient.addColorStop(1, 'rgba(2, 6, 23, 0)');
        field.fillStyle = gradient;
        field.fillRect(0, 0, p.width, p.height);

        p.textAlign(p.LEFT, p.CENTER);
        p.textFont('JetBrains Mono');

        const pointerDx = pointer.x - prevPointerX;
        const pointerDy = pointer.y - prevPointerY;
        pointerSpeed = Math.min(1, Math.hypot(pointerDx, pointerDy) * 0.015);
        prevPointerX = pointer.x;
        prevPointerY = pointer.y;

        const repelRadius = Math.min(p.width, p.height) * 0.38;
        const attractRadius = Math.min(p.width, p.height) * 0.34;
        const repelRadiusSq = repelRadius * repelRadius;
        const attractRadiusSq = attractRadius * attractRadius;

        for (const g of particles) {
          const toTargetX = g.target.x - g.pos.x;
          const toTargetY = g.target.y - g.pos.y;
          let ax = toTargetX * 0.048;
          let ay = toTargetY * 0.048;

          let targetX = g.target.x;
          let targetY = g.target.y;

          if (pointer.down && pointer.active) {
            targetX = p.lerp(g.target.x, pointer.x, 0.64);
            targetY = p.lerp(g.target.y, pointer.y, 0.64);
            const dx = pointer.x - g.pos.x;
            const dy = pointer.y - g.pos.y;
            const d2 = dx * dx + dy * dy + 1;
            if (d2 < attractRadiusSq) {
              const d = Math.sqrt(d2);
              const pull = 1 - d / attractRadius;
              const strength = (0.14 + pointerSpeed * 0.45) * pull;
              ax += (dx / d) * strength;
              ay += (dy / d) * strength;
            }
          } else if (pointer.active) {
            const dx = g.pos.x - pointer.x;
            const dy = g.pos.y - pointer.y;
            const d2 = dx * dx + dy * dy;
            if (d2 > 0 && d2 < repelRadiusSq) {
              const d = Math.sqrt(d2);
              const falloff = 1 - d / repelRadius;
              const strength = 1.2 * falloff * falloff * (0.5 + 0.5 * pointerSpeed);
              ax += (dx / d) * strength;
              ay += (dy / d) * strength;
            }
          }

          const drift = 0.22;
          const driftAngle = (time * 0.35 + g.phase + g.layerOffset * 2 + g.tint * 100) * 0.45;
          ax += Math.cos(driftAngle) * drift * 0.02;
          ay += Math.sin(driftAngle * 0.9) * drift * 0.02;

          const targetBias = pointer.down ? targetX : g.target.x;
          g.vel.x = (g.vel.x + ax * (pointer.active ? 1.0 : 0.72)) * 0.86;
          g.vel.y = (g.vel.y + ay * (pointer.active ? 1.0 : 0.72)) * 0.86;

          if (!pointer.active) {
            const returnForce = 0.026;
            g.vel.x += (targetBias - g.pos.x) * returnForce;
            g.vel.y += (targetY - g.pos.y) * returnForce;
          }

          const maxVel = pointer.down ? 9 : 6;
          g.vel.limit(maxVel);
          g.pos.x += g.vel.x;
          g.pos.y += g.vel.y;

          const glowPulse = 0.7 + Math.sin(time * 0.6 + g.phase) * 0.3;
          const distanceToPointer =
            pointer.active && pointer.down
              ? Math.hypot(g.pos.x - pointer.x, g.pos.y - pointer.y)
              : Math.hypot(g.pos.x - p.width * 0.72, g.pos.y - p.height * 0.57);
          const closeness = pointer.active
            ? 1 - Math.min(1, distanceToPointer / Math.max(p.width, p.height))
            : 0.28;

          const layerScale = 1 - g.layerOffset * 0.07;
          const alpha =
            56 + closeness * 150 + (pointer.down ? 20 : 0) + g.layerOffset * 8;

          const paletteIndex =
            Math.max(0, Math.min(palette.length - 1, (g.tint * palette.length) | 0));
          const [r, g1, b1] = palette[paletteIndex];
          p.fill(r, g1, b1, alpha);

          p.stroke(148, 163, 184, 12 + closeness * 40);
          p.strokeWeight(clampToBounds(1 + (1 - g.size / 28) * 1.5, 0.7, 1.8));
          p.textSize((g.size * layerScale) * glowPulse);
          p.text(g.char, g.pos.x, g.pos.y);

          const trailTargetX = g.target.x + (pointer.down ? (pointer.x - g.target.x) * 0.06 : 0);
          const trailTargetY = g.target.y + (pointer.down ? (pointer.y - g.target.y) * 0.06 : 0);
          if (Math.hypot(g.pos.x - trailTargetX, g.pos.y - trailTargetY) > 1.2) {
            p.stroke(148, 163, 184, 22);
            p.strokeWeight(0.8);
            p.line(g.pos.x, g.pos.y, trailTargetX + 0.5, trailTargetY + 0.5);
          }
        }

        if (pointer.down && pointer.active) {
          p.noStroke();
          p.fill(34, 211, 238, 24);
          p.ellipse(pointer.x, pointer.y, 14, 14);
        }
      };

      p.setup = () => {
        const width = clampToBounds(containerRef.current?.clientWidth ?? p.windowWidth, 320, 2600);
        const height = clampToBounds(containerRef.current?.clientHeight ?? p.windowHeight, 320, 2600);

        p.pixelDensity(Math.max(1, Math.min(2, window.devicePixelRatio || 1)));
        const canvas = p.createCanvas(width, height);
        if (containerRef.current) canvas.parent(containerRef.current);

        p.smooth();
        p.background(2, 7, 22);
        p.textFont('JetBrains Mono');
        buildLayout(width, height);

        if (reducedMotion) {
          particles.forEach((glyph) => {
            glyph.pos.set(glyph.target);
            glyph.vel.set(0, 0);
          });
          p.noLoop();
          drawStatic();
        }

        pointer.x = width * 0.72;
        pointer.y = height * 0.55;
        prevPointerX = pointer.x;
        prevPointerY = pointer.y;
      };

      p.windowResized = () => {
        const width = containerRef.current?.clientWidth ?? p.windowWidth;
        const height = containerRef.current?.clientHeight ?? p.windowHeight;

        p.resizeCanvas(width, height);
        p.background(2, 7, 22);
        buildLayout(width, height);

        if (reducedMotion) {
          p.redraw();
        }
      };

      p.mousePressed = () => {
        updatePointerState();
        pointer.down = true;
        return false;
      };

      p.mouseReleased = () => {
        pointer.down = false;
        return false;
      };

      p.mouseMoved = () => {
        pointer.active = true;
        return false;
      };

      p.mouseDragged = () => {
        pointer.down = true;
        pointer.active = true;
        return false;
      };

      p.mouseOut = () => {
        pointer.active = false;
        pointer.down = false;
        return false;
      };

      p.touchStarted = () => {
        updatePointerState();
        pointer.down = true;
        return false;
      };

      p.touchMoved = () => {
        pointer.down = true;
        return false;
      };

      p.touchEnded = () => {
        pointer.down = false;
        pointer.active = false;
        return false;
      };

      p.draw = () => {
        time += 0.025;
        updatePointerState();

        if (reducedMotion) {
          drawStatic();
          return;
        }

        if (pointer.x < 0 || pointer.y < 0 || pointer.x > p.width || pointer.y > p.height) {
          pointer.active = false;
        }

        drawLive();
      };
    };

    p5Ref.current = new p5(sketch);

    return () => {
      p5Ref.current?.remove();
      p5Ref.current = null;
    };
  }, [reducedMotion]);

  return <div ref={containerRef} className="lab-visual" aria-label="Kinetic typographic field" />;
};
