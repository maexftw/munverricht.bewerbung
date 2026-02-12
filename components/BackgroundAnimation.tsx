
import React, { useEffect, useRef } from 'react';
import p5 from 'p5';

const BackgroundAnimation: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

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
        hue: 215, // Slightly adjusted hue for deeper blue
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

      const applyForceField = (mx: number, my: number) => {
        if (!params.forceField.enabled) return;
        for (let pt of points) {
          let dir = p5.Vector.sub(pt.pos, p.createVector(mx, my));
          let d = dir.mag();
          if (d < params.magnifierRadius) {
            dir.normalize();
            let force = dir.mult(params.forceField.strength / (d + 1));
            pt.vel.add(force);
          }
          pt.vel.mult(params.forceField.friction);
          let restore = p5.Vector.sub(pt.pos, pt.originalPos).mult(-params.forceField.restoreSpeed);
          pt.vel.add(restore);
          pt.pos.add(pt.vel);
        }
      };

      p.setup = () => {
        const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
        canvas.parent(containerRef.current!);
        
        img = originalImg.get();
        img.resize(p.width, p.height);
        img.filter(p.GRAY);
        
        generatePalette(params.hue, params.saturation);
        generatePoints();
        
        magnifierX = p.width / 2;
        magnifierY = p.height / 2;
      };

      p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
        if (originalImg) {
            img = originalImg.get();
            img.resize(p.width, p.height);
            img.filter(p.GRAY);
            generatePoints();
        }
      };

      p.draw = () => {
        p.background(0); // Match body background
        
        if (!img) return;

        if (params.hue !== lastHue || params.saturation !== lastSaturation) {
          generatePalette(params.hue, params.saturation);
          lastHue = params.hue;
          lastSaturation = params.saturation;
        }

        if (params.invertImage !== lastInvertImage) {
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
          lastInvertImage = params.invertImage;
        }

        magnifierX = p.lerp(magnifierX, p.mouseX, params.magnifierInertia);
        magnifierY = p.lerp(magnifierY, p.mouseY, params.magnifierInertia);

        applyForceField(magnifierX, magnifierY);

        img.loadPixels();
        p.noFill();

        for (let pt of points) {
          let x = pt.pos.x;
          let y = pt.pos.y;
          let d = p.dist(x, y, magnifierX, magnifierY);

          let px = p.constrain(p.floor(x), 0, img.width - 1);
          let py = p.constrain(p.floor(y), 0, img.height - 1);
          let index = (px + py * img.width) * 4;
          let brightness = img.pixels[index];

          let condition = params.invertWireframe
            ? brightness < params.threshold
            : brightness > params.threshold;

          if (condition) {
            let shadeIndex = p.int(p.map(brightness, 0, 255, 0, palette.length - 1));
            let strokeSize = p.map(brightness, 0, 255, params.minStroke, params.maxStroke);

            if (params.magnifierEnabled && d < params.magnifierRadius) {
              let factor = p.map(d, 0, params.magnifierRadius, params.magnifierStrength, 1);
              strokeSize *= factor;
            }

            p.stroke(palette[shadeIndex]);
            p.strokeWeight(strokeSize);
            p.point(x, y);
          }
        }
      };
    };

    const p5Instance = new p5(sketch);

    return () => {
      p5Instance.remove();
    };
  }, []);

  return <div id="background-canvas-container" ref={containerRef} />;
};

export default BackgroundAnimation;
