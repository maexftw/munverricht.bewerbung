import React, { useEffect, useState } from 'react';
import PixelCanvas from './PixelCanvas';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

const SignalField: React.FC<{ className?: string }> = ({ className = '' }) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [visible, setVisible] = useState(() => typeof document === 'undefined' || !document.hidden);

  useEffect(() => {
    const handleVisibility = () => setVisible(!document.hidden);
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  if (prefersReducedMotion || !visible) return null;

  return (
    <div className={`signal-field ${className}`} aria-hidden="true">
      <PixelCanvas colors={['#ff4f0a', '#f06a35', '#b8b2a7']} gap={14} speed={28} density={0.19} ambient noFocus />
    </div>
  );
};

export default SignalField;
