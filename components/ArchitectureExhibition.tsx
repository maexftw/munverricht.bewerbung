import React, { useEffect, useRef, useState } from 'react';

const GLYPHS_QUIET = ' .:-';
const GLYPHS_ACTIVE = '.,·-─~+:;=*π""┐┌┘┴┬╗╔╝╚╬╠╣╩╦║░▒▓█▄▀▌▐■!?&#$@0123456789*';

interface Wave {
  x: number;
  y: number;
  startTime: number;
  id: number;
}

const TECH_LOG_POOL = [
  '0x7F_KERNEL_BOOT_OK_2.4.1',
  'LOAD_ASYNC_CHUNKS [78.2%]',
  'CACHE_HYBRID_SYNCED_128-BIT',
  'NODE_V8_TURBOFAN_OPTIMIZED',
  'VITE_HMR_HOT_MODULE_REPLACE',
  'SSR_HYDRATION_12MS_STABLE',
  'ZUSTAND_STORE_INIT_REACTIVE',
  'LUCIDE_SVG_ENGINE_ATTACHED',
  'AUTH_JWT_VERIFIED_7726-AX',
  'API_GATEWAY_LISTEN_P:3005',
  'DB_REPLICA_R0_SYNC_COMPLETE',
  '10110010_QUEUE_PROCESSED',
  '0xAF22_MEM_ALLOC_SEGMENT',
  'GPU_ACCEL_CANVAS_ACTIVE',
  'TCP_HANDSHAKE_77ms_ESTAB'
];

const ArchitectureExhibition: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [waves, setWaves] = useState<Wave[]>([]);
  const lastWaveTime = useRef(0);
  const rafRef = useRef<number | null>(null);
  const mouseTarget = useRef({ x: 0, y: 0 });
  const isPointerInsideRef = useRef(false);

  // Character Grid State
  const gridRef = useRef<{ char: string; targetChar: string; noisePos: number }[][]>([]);
  const rows = 40;
  const cols = 50;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let time = 0;

    const resize = () => {
      const parent = containerRef.current;
      if (!parent) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = parent.clientWidth;
      height = parent.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Initialize Grid
      const newGrid = [];
      const colCount = Math.floor(width / 9);
      const rowCount = Math.floor(height / 14);
      for (let r = 0; r < rowCount; r++) {
        const row = [];
        for (let c = 0; c < colCount; c++) {
          row.push({
            char: GLYPHS_QUIET[Math.floor(Math.random() * GLYPHS_QUIET.length)],
            targetChar: ' ',
            noisePos: Math.random() * 1000
          });
        }
        newGrid.push(row);
      }
      gridRef.current = newGrid;
    };

    const draw = () => {
      const t = Date.now();
      time += 0.016;
      ctx.clearRect(0, 0, width, height);

      const grid = gridRef.current;
      if (grid.length === 0) return;

      const charW = width / grid[0].length;
      const charH = height / grid.length;

      ctx.textBaseline = 'top';
      ctx.font = '500 10px "JetBrains Mono", monospace';

      const settleTarget = isPointerInsideRef.current
        ? mouseTarget.current
        : { x: width * 0.5, y: height * 0.5 };

      mousePos.current.x += (settleTarget.x - mousePos.current.x) * 0.085;
      mousePos.current.y += (settleTarget.y - mousePos.current.y) * 0.085;

      // 1. Draw Grid
      grid.forEach((row, r) => {
        row.forEach((cell, c) => {
          const x = c * charW;
          const y = r * charH;
          const dx = x - mousePos.current.x;
          const dy = y - mousePos.current.y;
          const distSq = dx * dx + dy * dy;
          const lensRadius = 100;
          const lensRadiusSq = lensRadius * lensRadius;

          if (distSq < lensRadiusSq) {
            // Inside the Lens
            const dist = Math.sqrt(distSq);
            const intensity = 1 - dist / lensRadius;
            const charIdx = Math.floor((cell.noisePos + time * 25) % GLYPHS_ACTIVE.length);
            const char = GLYPHS_ACTIVE[charIdx];
            
            ctx.fillStyle = `rgba(59, 130, 246, ${0.7 + intensity * 0.3})`;
            ctx.shadowBlur = intensity * 10;
            ctx.shadowColor = '#3b82f6';
            ctx.fillText(char, x, y);
            ctx.shadowBlur = 0;
          } else {
            // Outside the Lens - Quiet stand-by
            if (Math.sin(cell.noisePos + time) > 0.99) {
              cell.char = GLYPHS_QUIET[Math.floor(Math.random() * GLYPHS_QUIET.length)];
            }
            ctx.fillStyle = 'rgba(56, 189, 248, 0.08)';
            ctx.fillText(cell.char, x, y);
          }
        });
      });

      rafRef.current = requestAnimationFrame(draw);
    };

    resize();
    mousePos.current = { x: width * 0.5, y: height * 0.5 };
    mouseTarget.current = { x: width * 0.5, y: height * 0.5 };
    draw();
    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [waves]);

  const mousePos = useRef({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    isPointerInsideRef.current = true;
    mouseTarget.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const handleMouseLeave = () => {
    if (!containerRef.current) return;
    isPointerInsideRef.current = false;
    mouseTarget.current = {
      x: containerRef.current.clientWidth * 0.5,
      y: containerRef.current.clientHeight * 0.5,
    };
  };

  return (
    <div 
      ref={containerRef}
      className="w-full h-full min-h-[360px] relative overflow-hidden bg-white/75 backdrop-blur-sm border border-blue-100 rounded-2xl shadow-sm cursor-crosshair"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <canvas ref={canvasRef} className="w-full h-full" />
      
      {/* Decorative corner brackets */}
      <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-blue-200" />
      <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-blue-200" />
    </div>
  );
};

export default ArchitectureExhibition;
