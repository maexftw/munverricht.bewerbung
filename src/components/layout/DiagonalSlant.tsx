import React from 'react';

export interface DiagonalSlantProps {
  className?: string;
}

export const DiagonalSlant: React.FC<DiagonalSlantProps> = ({ className = '' }) => {
  return (
    <div
      aria-hidden="true"
      data-testid="diagonal-slant"
      className={`hyp-slant hidden lg:block ${className}`}
    />
  );
};
