import React, { useEffect, useRef } from 'react';
import p5 from 'p5';

const BackgroundAnimation: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let p5Instance: p5 | undefined;

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

      // Optimized image preparation - call this only when image needs re-processing
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
        img.loadPixels(); // Ensure pixels array is populated for reading in draw()
      };

      p.setup = () => {
        const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
        canvas.parent(containerRef.current!);
        
        prepareImage();
        generatePalette(params.hue, params.saturation);
        generatePoints();
        
        magnifierX = p.width / 2;
        magnifierY = p.height / 2;
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

        // Optimization: Merged force field and drawing logic into a single loop.
        // Hoisted invariant variables out of the loop to minimize property lookups and function calls.
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

        for (let pt of points) {
          // 1. Force Field Physics Update
          if (forceEnabled) {
            const dx = pt.pos.x - magnifierX;
            const dy = pt.pos.y - magnifierY;
            const dSq = dx * dx + dy * dy;

            if (dSq < radiusSq && dSq > 0) {
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
          }

          // 2. Optimized Rendering Logic
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
              let strokeSize = brightness * strokeFactor + minStroke;

              if (magnifierEnabled) {
                const dx = x - magnifierX;
                const dy = y - magnifierY;
                const dSq = dx * dx + dy * dy;

                if (dSq < radiusSq) {
                  const d = Math.sqrt(dSq);
                  // Optimized mapping for magnifier factor
                  const factor = (d * (1 - magnifierStrength) / magnifierRadius) + magnifierStrength;
                  strokeSize *= factor;
                }
              }

              p.stroke(palette[shadeIndex]);
              p.strokeWeight(strokeSize);
              p.point(x, y);
            }
          }
        }
      };
    };

    try {
      p5Instance = new p5(sketch);
    } catch (e) {
      console.error("p5 initialization failed:", e);
    }

    return () => {
      p5Instance?.remove();
    };
  }, []);

  return <div id="background-canvas-container" ref={containerRef} />;
};

export default BackgroundAnimation;
