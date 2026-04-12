import React from 'react';

interface OrganicAIOrbProps {
  className?: string;
  size?: number | string;
}

const OrganicAIOrb: React.FC<OrganicAIOrbProps> = ({ className, size = '600px' }) => {
  return (
    <div className={`absolute inset-0 z-0 pointer-events-none flex items-center justify-center overflow-hidden ${className || ''}`}>
      <style>{`
        @property --s1 { syntax: "<angle>"; inherits: false; initial-value: 0deg; }
        @property --s2 { syntax: "<angle>"; inherits: false; initial-value: 0deg; }
        @property --s3 { syntax: "<angle>"; inherits: false; initial-value: 0deg; }
        @property --mesh-x-0 { syntax: "<percentage>"; inherits: false; initial-value: 85%; }
        @property --mesh-y-0 { syntax: "<percentage>"; inherits: false; initial-value: 80%; }
        @property --mesh-c-1 { syntax: "<color>"; inherits: false; initial-value: hsla(220, 100%, 72%, 1); }

        @keyframes s1 { to { --s1: 360deg; } }
        @keyframes s2 { to { --s2: 360deg; } }
        @keyframes s3 { to { --s3: 360deg; } }
        @keyframes mesh-gradient {
          0% { --mesh-x-0: 85%; --mesh-y-0: 80%; --mesh-c-1: hsla(220, 100%, 82%, 1); }
          100% { --mesh-x-0: 31%; --mesh-y-0: 94%; --mesh-c-1: hsla(180, 82%, 95%, 1); }
        }

        .orb-blur-wrap {
          filter: blur(80px) saturate(1.5);
          opacity: 0.6;
        }

        .orb-core {
          width: ${typeof size === 'number' ? size + 'px' : size};
          aspect-ratio: 1;
          border-radius: 50%;
          background-image: radial-gradient(
            circle at var(--mesh-x-0) var(--mesh-y-0),
            hsla(217, 91%, 60%, 0.8) 0%,
            transparent 50%
          ),
          radial-gradient(
            circle at 20% 30%,
            var(--mesh-c-1) 0%,
            transparent 70%
          ),
          radial-gradient(
            circle at 50% 80%,
            hsla(280, 80%, 70%, 0.6) 0%,
            transparent 60%
          );
          animation: 
            s1 15s linear infinite,
            s2 22s linear infinite,
            s3 26s linear infinite,
            mesh-gradient 12s linear infinite alternate;
          filter: url(#orb-displacement);
        }
      `}</style>

      <div className="orb-blur-wrap">
        <div className="orb-core" />
      </div>

      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <filter id="orb-displacement">
          <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="120" />
        </filter>
      </svg>
    </div>
  );
};

export default OrganicAIOrb;
