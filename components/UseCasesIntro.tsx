import React from 'react';
import ASCIIText from './ASCIIText';

const UseCasesIntro: React.FC = () => {
  return (
    <section className="space-y-4 text-center py-6 border-t border-neutral-900">
      <h3 className="mono text-blue-500 text-[10px] tracking-[0.3em] uppercase opacity-70" aria-hidden="true">
        <ASCIIText text="// USE_CASE_BRIEFING" />
      </h3>
      <h2 className="mono text-2xl md:text-4xl font-bold uppercase tracking-[0.06em] text-blue-100">
        <ASCIIText text="Hier ist, wie ich arbeite" />
      </h2>
      <p className="mono text-xs md:text-sm text-neutral-400 uppercase tracking-[0.12em]">
        Erfahrung trifft auf radikale neue Effizienz
      </p>
    </section>
  );
};

export default UseCasesIntro;
