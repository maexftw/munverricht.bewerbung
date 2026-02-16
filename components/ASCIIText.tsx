import React, { useState, useEffect, useRef, useCallback, useLayoutEffect } from 'react';

const WAVE_THRESH = 3;
const CHAR_MULT = 3;
const ANIM_STEP = 40;
const WAVE_BUF = 5;
const CHARS = '.,·-─~+:;=*π""┐┌┘┴┬╗╔╝╚╬╠╣╩╦║░▒▓█▄▀▌▐■!?&#$@0123456789*';

interface Wave {
  startPos: number;
  startTime: number;
  id: number;
}

interface ASCIITextProps {
  text: string;
  className?: string;
  duration?: number;
  spread?: number;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'span' | 'div' | 'p';
}

/**
 * ASCIIText Component
 * Implements an ASCII glitch ripple effect on hover.
 * Based on: https://codepen.io/erevan/pen/MYKBjdZ
 */
export const ASCIIText: React.FC<ASCIITextProps> = ({
  text,
  className = '',
  duration = 1000,
  spread = 1,
  as: Component = 'span'
}) => {
  const [displayText, setDisplayText] = useState(text);
  const wavesRef = useRef<Wave[]>([]);
  const requestRef = useRef<number>();
  const containerRef = useRef<HTMLElement>(null);
  const isHoveringRef = useRef(false);
  const lastCursorPosRef = useRef(-1);
  const [width, setWidth] = useState<number | null>(null);

  // Measure initial width to prevent layout shifts
  useLayoutEffect(() => {
    if (containerRef.current) {
      // Temporarily ensure natural width to measure
      const originalWidth = containerRef.current.style.width;
      containerRef.current.style.width = 'auto';
      const rect = containerRef.current.getBoundingClientRect();
      setWidth(rect.width);
      containerRef.current.style.width = originalWidth;
    }
  }, [text]);

  const getCursorPos = useCallback((e: React.MouseEvent | MouseEvent) => {
    if (!containerRef.current) return 0;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const pos = Math.round((x / rect.width) * text.length);
    return Math.max(0, Math.min(pos, text.length - 1));
  }, [text.length]);

  const startWave = useCallback((pos: number) => {
    wavesRef.current.push({
      startPos: pos,
      startTime: Date.now(),
      id: Math.random()
    });
  }, []);

  const animate = useCallback(() => {
    const now = Date.now();

    // Cleanup expired waves
    wavesRef.current = wavesRef.current.filter(w => now - w.startTime < duration);

    if (wavesRef.current.length === 0) {
      setDisplayText(text);
      requestRef.current = undefined;
      return;
    }

    const chars = text.split('');
    const result = chars.map((char, i) => {
      // Preserve spaces
      if (char === ' ') return ' ';

      let shouldAnim = false;
      let resultChar = char;

      for (const w of wavesRef.current) {
        const age = now - w.startTime;
        const prog = Math.min(age / duration, 1);
        const dist = Math.abs(i - w.startPos);
        const maxDist = Math.max(w.startPos, text.length - w.startPos - 1);
        const rad = (prog * (maxDist + WAVE_BUF)) / spread;

        if (dist <= rad) {
          shouldAnim = true;
          const intens = Math.max(0, rad - dist);

          // Chars in the wave zone shift through character sequence
          if (intens <= WAVE_THRESH && intens > 0) {
            const charIdx = (dist * CHAR_MULT + Math.floor(age / ANIM_STEP)) % CHARS.length;
            resultChar = CHARS[charIdx];
          }
        }
      }
      return shouldAnim ? resultChar : char;
    }).join('');

    setDisplayText(result);
    requestRef.current = requestAnimationFrame(animate);
  }, [text, duration, spread]);

  const handleMouseEnter = (e: React.MouseEvent) => {
    isHoveringRef.current = true;
    const pos = getCursorPos(e);
    lastCursorPosRef.current = pos;
    startWave(pos);
    if (!requestRef.current) {
      requestRef.current = requestAnimationFrame(animate);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isHoveringRef.current) return;
    const pos = getCursorPos(e);
    if (pos !== lastCursorPosRef.current) {
      lastCursorPosRef.current = pos;
      startWave(pos);
    }
  };

  const handleMouseLeave = () => {
    isHoveringRef.current = false;
    lastCursorPosRef.current = -1;
  };

  useEffect(() => {
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  // Update displayText if text prop changes
  useEffect(() => {
    setDisplayText(text);
  }, [text]);

  return (
    <Component
      ref={containerRef as any}
      className={`${className} inline-block cursor-default select-none`}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ width: width ? `${width}px` : 'auto' }}
      aria-label={text}
    >
      {displayText}
    </Component>
  );
};

export default ASCIIText;
