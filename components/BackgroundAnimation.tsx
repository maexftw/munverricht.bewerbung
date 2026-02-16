import React, { useEffect, useRef } from 'react';
import p5 from 'p5';

interface BackgroundAnimationProps {
  isPaused?: boolean;
}

const BackgroundAnimation: React.FC<BackgroundAnimationProps> = ({ isPaused = false }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const p5Ref = useRef<p5 | undefined>(undefined);

  // Optimization: Toggle the p5 loop based on the isPaused prop.
  // This saves 100% of CPU/GPU resources when the animation is hidden behind the boot screen.
  useEffect(() => {
    if (p5Ref.current) {
      if (isPaused) {
        p5Ref.current.noLoop();
      } else {
        p5Ref.current.loop();
      }
    }
  }, [isPaused]);

  useEffect(() => {
    if (!containerRef.current) return;

    const sketch = (p: p5) => {
      let originalImg: p5.Image;
      let img: p5.Image;
      let palette: p5.Color[] = [];
      let points: { pos: p5.Vector; originalPos: p5.Vector; vel: p5.Vector }[] = [];
      let lastHue = -1;
      let lastSaturation = -1;
      let lastInvertImage: boolean | null = null;
      let magnifierX = 0;
      let magnifierY = 0;

      const params = {
        invertWireframe: true,
        invertImage: true,
        hue: 215,
        saturation: 90,
        threshold: 250,
        minStroke: 1,
        maxStroke: 5,
        spacing: 14,
        noiseScale: 0.005,
        density: 2.0,
        magnifierEnabled: true,
        magnifierRadius: 250,
        magnifierStrength: 1.8,
        magnifierSpeed: 0.02,
        magnifierInertia: 0.1,
        forceField: {
          enabled: true,
          strength: 12,
          friction: 0.90,
          restoreSpeed: 0.05
        }
      };

      p.preload = () => {
        originalImg = p.loadImage(
          "https://assets.laboutiqueofficielle.com/w_1100,q_auto,f_auto/media/products/2011/01/20/supreme-ntm_4482_ntm-stk-lyrics-blanc_20180712T071700_02.jpg"
        );
      };

      const generatePalette = (hue: number, saturation: number) => {
        palette = [];
        for (let i = 0; i < 12; i++) {
          let lightness = p.map(i, 0, 11, 95, 5);
          palette.push(p.color(`hsl(${hue}, ${saturation}%, ${lightness}%)`));
        }
      };

      const generatePoints = () => {
        if (!img) return;
        points = [];
        let spacing = params.spacing;
        for (let y = 0; y < img.height; y += spacing) {
          for (let x = 0; x < img.width; x += spacing) {
            let nx = p.noise(x * params.noiseScale, y * params.noiseScale) - 0.5;
            let ny = p.noise((x + 500) * params.noiseScale, (y + 500) * params.noiseScale) - 0.5;
            let px = x + nx * spacing;
            let py = y + ny * spacing;
            points.push({
              pos: p.createVector(px, py),
              originalPos: p.createVector(px, py),
              vel: p.createVector(0, 0)
            });
          }
        }
      };

      const prepareImage = () => {
        if (!originalImg) return;
        img = originalImg.get();
        img.resize(p.width, p.height);
        img.filter(p.GRAY);
        if (params.invertImage) {
          img.loadPixels();
          for (let i = 0; i < img.pixels.length; i += 4) {
            img.pixels[i] = 255 - img.pixels[i];
            img.pixels[i + 1] = 255 - img.pixels[i + 1];
            img.pixels[i + 2] = 255 - img.pixels[i + 2];
          }
          img.updatePixels();
        }
        img.loadPixels();
      };

      p.setup = () => {
        const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
        canvas.parent(containerRef.current!);
        
        prepareImage();
        generatePalette(params.hue, params.saturation);
        generatePoints();
        
        magnifierX = p.width / 2;
        magnifierY = p.height / 2;

        // Ensure loop state matches prop on startup
        if (isPaused) p.noLoop();
      };

      p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
        if (originalImg) {
            prepareImage();
            generatePoints();
        }
      };

      p.draw = () => {
        p.background(0);
        if (!img) return;

        if (params.hue !== lastHue || params.saturation !== lastSaturation) {
          generatePalette(params.hue, params.saturation);
          lastHue = params.hue;
          lastSaturation = params.saturation;
        }

        if (params.invertImage !== lastInvertImage) {
          prepareImage();
          lastInvertImage = params.invertImage;
        }

        magnifierX = p.lerp(magnifierX, p.mouseX, params.magnifierInertia);
        magnifierY = p.lerp(magnifierY, p.mouseY, params.magnifierInertia);

        p.noFill();

        const { enabled: forceEnabled, strength, friction, restoreSpeed } = params.forceField;
        const { magnifierRadius, magnifierStrength, magnifierEnabled, threshold, minStroke, maxStroke, invertWireframe } = params;
        const radiusSq = magnifierRadius * magnifierRadius;

        const pixels = img.pixels;
        const imgW = img.width;
        const imgH = img.height;
        const paletteLen = palette.length;
        const shadeFactor = (paletteLen - 1) / 255;
        const strokeFactor = (maxStroke - minStroke) / 255;

        // Optimization: Bucket points by shade to minimize p.stroke() and p.strokeWeight() calls.
        // Instead of 10k+ state changes per frame, we reduce it to paletteLen (12).
        const buckets: {x: number, y: number}[][] = Array.from({ length: paletteLen }, () => []);

        for (let pt of points) {
          const dx = pt.pos.x - magnifierX;
          const dy = pt.pos.y - magnifierY;
          const dSq = dx * dx + dy * dy;

          // 1. Optimized Force Field Physics Update
          if (forceEnabled) {
            const isInMagnifier = dSq < radiusSq && dSq > 0;

            // Physics skip: If point is at rest and not in magnifier, skip complex math.
            const isMoving = Math.abs(pt.vel.x) > 0.01 || Math.abs(pt.vel.y) > 0.01;
            const isOffOrigin = Math.abs(pt.pos.x - pt.originalPos.x) > 0.1 || Math.abs(pt.pos.y - pt.originalPos.y) > 0.1;

            if (isInMagnifier || isMoving || isOffOrigin) {
              if (isInMagnifier) {
                const d = Math.sqrt(dSq);
                const forceStrength = strength / (d + 1);
                pt.vel.x += (dx / d) * forceStrength;
                pt.vel.y += (dy / d) * forceStrength;
              }

              pt.vel.x *= friction;
              pt.vel.y *= friction;
              pt.vel.x += (pt.originalPos.x - pt.pos.x) * restoreSpeed;
              pt.vel.y += (pt.originalPos.y - pt.pos.y) * restoreSpeed;
              pt.pos.x += pt.vel.x;
              pt.pos.y += pt.vel.y;
            } else {
              // Clamp to origin to ensure stability
              pt.pos.x = pt.originalPos.x;
              pt.pos.y = pt.originalPos.y;
              pt.vel.x = 0;
              pt.vel.y = 0;
            }
          }

          // 2. Rendering Data Preparation
          const x = pt.pos.x;
          const y = pt.pos.y;
          const px = x | 0;
          const py = y | 0;

          if (px >= 0 && px < imgW && py >= 0 && py < imgH) {
            const index = (px + py * imgW) << 2;
            const brightness = pixels[index];

            const condition = invertWireframe
              ? brightness < threshold
              : brightness > threshold;

            if (condition) {
              const shadeIndex = (brightness * shadeFactor) | 0;
              buckets[shadeIndex].push({x, y});
            }
          }
        }

        // 3. Batch Rendering with p.beginShape(p.POINTS)
        // This is significantly faster than calling p.point() individually.
        for (let i = 0; i < paletteLen; i++) {
          const bucket = buckets[i];
          if (bucket.length === 0) continue;

          p.stroke(palette[i]);

          // Approximate stroke weight for the bucket to keep it fast.
          // Since shadeIndex is tied to brightness, this is a very close approximation.
          const avgBrightness = i * (255 / (paletteLen - 1));
          let strokeSize = avgBrightness * strokeFactor + minStroke;

          p.strokeWeight(strokeSize);
          p.beginShape(p.POINTS);
          for (let j = 0; j < bucket.length; j++) {
            p.vertex(bucket[j].x, bucket[j].y);
          }
          p.endShape();
        }
      };
    };

    try {
      p5Ref.current = new p5(sketch);
    } catch (e) {
      console.error("p5 initialization failed:", e);
    }

    return () => {
      p5Ref.current?.remove();
      p5Ref.current = undefined;
    };
  }, []);

  return <div id="background-canvas-container" ref={containerRef} />;
};

export default BackgroundAnimation;
