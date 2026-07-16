import React, { useRef } from 'react';

const PricingAsciiBox: React.FC = () => {
  const stageRef = useRef<HTMLDivElement>(null);

  const resetPointer = () => {
    const stage = stageRef.current;
    if (!stage) return;

    stage.style.setProperty('--pointer-x', '50%');
    stage.style.setProperty('--pointer-y', '34%');
    stage.style.setProperty('--pointer-x-inverse', '50%');
    stage.style.setProperty('--pointer-y-inverse', '66%');
    stage.style.setProperty('--shell-shift-x', '0px');
    stage.style.setProperty('--shell-shift-y', '0px');
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const stage = stageRef.current;
    if (!stage) return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const ratioX = (event.clientX - bounds.left) / bounds.width;
    const ratioY = (event.clientY - bounds.top) / bounds.height;
    const shiftX = (ratioX - 0.5) * 28;
    const shiftY = (ratioY - 0.5) * 22;

    stage.style.setProperty('--pointer-x', `${(ratioX * 100).toFixed(2)}%`);
    stage.style.setProperty('--pointer-y', `${(ratioY * 100).toFixed(2)}%`);
    stage.style.setProperty('--pointer-x-inverse', `${((1 - ratioX) * 100).toFixed(2)}%`);
    stage.style.setProperty('--pointer-y-inverse', `${((1 - ratioY) * 100).toFixed(2)}%`);
    stage.style.setProperty('--shell-shift-x', `${shiftX.toFixed(2)}px`);
    stage.style.setProperty('--shell-shift-y', `${shiftY.toFixed(2)}px`);
  };

  return (
    <>
      <style>{`
        @keyframes pricing-orb-drift {
          0% {
            transform: translate3d(-3%, -2%, 0) scale(0.96) rotate(0deg);
          }
          50% {
            transform: translate3d(4%, 3%, 0) scale(1.04) rotate(180deg);
          }
          100% {
            transform: translate3d(-3%, -2%, 0) scale(0.96) rotate(360deg);
          }
        }

        @keyframes pricing-orb-morph {
          0% {
            border-radius: 39% 61% 58% 42% / 41% 37% 63% 59%;
          }
          50% {
            border-radius: 62% 38% 46% 54% / 48% 63% 37% 52%;
          }
          100% {
            border-radius: 39% 61% 58% 42% / 41% 37% 63% 59%;
          }
        }

        @keyframes pricing-orb-pulse {
          0%, 100% {
            transform: scale(0.96);
            opacity: 0.72;
          }
          50% {
            transform: scale(1.08);
            opacity: 1;
          }
        }

        .pricing-orb-stage {
          --pointer-x: 50%;
          --pointer-y: 34%;
          --pointer-x-inverse: 50%;
          --pointer-y-inverse: 66%;
          --shell-shift-x: 0px;
          --shell-shift-y: 0px;
          position: relative;
          display: grid;
          height: 100%;
          min-height: clamp(300px, 30vw, 420px);
          width: 100%;
          place-items: center;
          overflow: hidden;
          border-radius: 1rem;
          border: 1px solid rgba(191, 219, 254, 0.95);
          background:
            radial-gradient(circle at top, rgba(191, 219, 254, 0.82), rgba(255, 255, 255, 0) 44%),
            linear-gradient(180deg, rgba(255, 255, 255, 0.96), rgba(248, 251, 255, 0.92));
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.95),
            0 18px 38px rgba(148, 163, 184, 0.16);
        }

        .pricing-orb-stage::before,
        .pricing-orb-stage::after {
          content: "";
          position: absolute;
          border-radius: 999px;
          filter: blur(44px);
          pointer-events: none;
          transition: transform 180ms ease-out;
        }

        .pricing-orb-stage::before {
          inset: 12% 16% auto;
          height: 30%;
          background: rgba(191, 219, 254, 0.62);
          transform: translate3d(calc(var(--shell-shift-x) * 0.2), calc(var(--shell-shift-y) * 0.15), 0);
        }

        .pricing-orb-stage::after {
          inset: auto 18% 8%;
          height: 24%;
          background: rgba(216, 241, 255, 0.7);
          transform: translate3d(calc(var(--shell-shift-x) * -0.18), calc(var(--shell-shift-y) * -0.12), 0);
        }

        .pricing-orb-shell {
          position: relative;
          display: grid;
          height: clamp(198px, 62vw, 276px);
          width: clamp(198px, 62vw, 276px);
          place-items: center;
          isolation: isolate;
          transform: translate3d(var(--shell-shift-x), var(--shell-shift-y), 0);
          transition: transform 160ms ease-out;
        }

        .pricing-orb-aura {
          position: absolute;
          inset: 9%;
          border-radius: 50%;
          background:
            radial-gradient(circle at var(--pointer-x) var(--pointer-y), rgba(255, 255, 255, 0.98) 0 22%, rgba(191, 219, 254, 0.76) 46%, rgba(186, 230, 253, 0.16) 72%, rgba(255, 255, 255, 0) 100%);
          filter: blur(14px);
          animation: pricing-orb-pulse 6s ease-in-out infinite;
        }

        .pricing-orb-core {
          position: relative;
          height: 74%;
          width: 74%;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.95);
          background:
            radial-gradient(circle at var(--pointer-x) var(--pointer-y), rgba(255, 255, 255, 0.98), rgba(255, 255, 255, 0.72) 18%, rgba(255, 255, 255, 0.1) 36%),
            radial-gradient(circle at var(--pointer-x-inverse) 30%, rgba(147, 197, 253, 0.88), rgba(147, 197, 253, 0) 44%),
            radial-gradient(circle at 30% var(--pointer-y-inverse), rgba(196, 181, 253, 0.58), rgba(196, 181, 253, 0) 46%),
            radial-gradient(circle at 58% 74%, rgba(165, 243, 252, 0.78), rgba(165, 243, 252, 0) 50%),
            linear-gradient(160deg, rgba(255, 255, 255, 0.94), rgba(237, 246, 255, 0.9) 42%, rgba(228, 240, 255, 0.84));
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.95),
            inset 0 -26px 46px rgba(147, 197, 253, 0.2),
            0 30px 56px rgba(96, 165, 250, 0.18);
          animation:
            pricing-orb-morph 11s ease-in-out infinite,
            pricing-orb-drift 18s linear infinite;
        }

        .pricing-orb-layer {
          position: absolute;
          inset: -8%;
          border-radius: inherit;
          mix-blend-mode: screen;
          opacity: 0.9;
        }

        .pricing-orb-layer.one {
          background:
            radial-gradient(circle at 20% 18%, rgba(255, 255, 255, 0.84), rgba(255, 255, 255, 0) 28%),
            radial-gradient(circle at var(--pointer-x-inverse) 32%, rgba(96, 165, 250, 0.72), rgba(96, 165, 250, 0) 38%),
            radial-gradient(circle at 48% 76%, rgba(125, 211, 252, 0.8), rgba(125, 211, 252, 0) 42%);
          animation:
            pricing-orb-drift 16s linear infinite reverse,
            pricing-orb-morph 9s ease-in-out infinite reverse;
        }

        .pricing-orb-layer.two {
          inset: 6%;
          background:
            radial-gradient(circle at 62% 22%, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0) 22%),
            radial-gradient(circle at 32% 66%, rgba(186, 230, 253, 0.75), rgba(186, 230, 253, 0) 38%),
            radial-gradient(circle at var(--pointer-x) var(--pointer-y-inverse), rgba(191, 219, 254, 0.52), rgba(191, 219, 254, 0) 34%);
          animation:
            pricing-orb-pulse 7s ease-in-out infinite,
            pricing-orb-morph 13s ease-in-out infinite;
        }

        .pricing-orb-grain {
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background-image:
            radial-gradient(rgba(15, 23, 42, 0.08) 0.7px, transparent 0.7px),
            radial-gradient(rgba(255, 255, 255, 0.2) 0.8px, transparent 0.8px);
          background-position: 0 0, 12px 12px;
          background-size: 16px 16px, 20px 20px;
          mix-blend-mode: soft-light;
          opacity: 0.26;
          transition: opacity 180ms ease-out;
        }

        .pricing-orb-stage:hover .pricing-orb-grain {
          opacity: 0.34;
        }

        .pricing-orb-highlight {
          position: absolute;
          inset: 12% 18% auto 18%;
          height: 22%;
          border-radius: 999px;
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.82), rgba(255, 255, 255, 0));
          filter: blur(10px);
          opacity: 0.9;
          transform: translate3d(calc(var(--shell-shift-x) * -0.24), calc(var(--shell-shift-y) * -0.24), 0);
          transition: transform 160ms ease-out;
        }
      `}</style>

      <div
        ref={stageRef}
        className="pricing-orb-stage"
        aria-hidden="true"
        onPointerMove={handlePointerMove}
        onPointerLeave={resetPointer}
      >
        <div className="pricing-orb-shell">
          <div className="pricing-orb-aura" />
          <div className="pricing-orb-core">
            <div className="pricing-orb-layer one" />
            <div className="pricing-orb-layer two" />
            <div className="pricing-orb-grain" />
            <div className="pricing-orb-highlight" />
          </div>
        </div>
      </div>
    </>
  );
};

export default PricingAsciiBox;
