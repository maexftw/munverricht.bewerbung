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

      const applyForceField = (mx: number, my: number) => {
        if (!params.forceField.enabled) return;

        const radiusSq = params.magnifierRadius * params.magnifierRadius;
        const { strength, friction, restoreSpeed } = params.forceField;

        for (let pt of points) {
          // Optimization: Use manual math instead of p5.Vector methods to avoid object overhead
          const dx = pt.pos.x - mx;
          const dy = pt.pos.y - my;
          const dSq = dx * dx + dy * dy;

          if (dSq < radiusSq && dSq > 0) {
            const d = Math.sqrt(dSq);
            const forceStrength = strength / (d + 1);
            // Add force: dir.normalize().mult(forceStrength)
            pt.vel.x += (dx / d) * forceStrength;
            pt.vel.y += (dy / d) * forceStrength;
          }

          // pt.vel.mult(friction)
          pt.vel.x *= friction;
          pt.vel.y *= friction;

          // Restore force: pt.originalPos - pt.pos
          pt.vel.x += (pt.originalPos.x - pt.pos.x) * restoreSpeed;
          pt.vel.y += (pt.originalPos.y - pt.pos.y) * restoreSpeed;

          // pt.pos.add(pt.vel)
          pt.pos.x += pt.vel.x;
          pt.pos.y += pt.vel.y;
        }
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

        applyForceField(magnifierX, magnifierY);

        // Optimization: img.loadPixels() removed from draw loop.
        // It is called once in prepareImage() when the image changes.
        p.noFill();

        const radiusSq = params.magnifierRadius * params.magnifierRadius;

        for (let pt of points) {
          const x = pt.pos.x;
          const y = pt.pos.y;

          // Optimization: Skip points outside image bounds
          const px = Math.floor(x);
          const py = Math.floor(y);
          if (px < 0 || px >= img.width || py < 0 || py >= img.height) continue;

          const index = (px + py * img.width) * 4;
          const brightness = img.pixels[index];

          const condition = params.invertWireframe
            ? brightness < params.threshold
            : brightness > params.threshold;

          if (condition) {
            const shadeIndex = Math.floor(p.map(brightness, 0, 255, 0, palette.length - 1));
            let strokeSize = p.map(brightness, 0, 255, params.minStroke, params.maxStroke);

            if (params.magnifierEnabled) {
              const dx = x - magnifierX;
              const dy = y - magnifierY;
              const dSq = dx * dx + dy * dy;

              if (dSq < radiusSq) {
                const d = Math.sqrt(dSq);
                const factor = p.map(d, 0, params.magnifierRadius, params.magnifierStrength, 1);
                strokeSize *= factor;
              }
            }

            p.stroke(palette[shadeIndex]);
            p.strokeWeight(strokeSize);
            p.point(x, y);
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
