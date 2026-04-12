import React from 'react';
import { Minus, Plus } from 'lucide-react';
import ASCIIText from './ASCIIText';
import { themeClasses } from './themeClasses';

const faqItems = [
  {
    question: 'Was ist im Einstiegspreis enthalten?',
    answer:
      'Im Einstiegspreis steckt eine schlanke Firmenwebsite mit Design, mobiler Optimierung, technischer Einrichtung und Veroeffentlichung. Vor dem Start klaeren wir den genauen Umfang, damit es spaeter keine Ueberraschungen gibt.',
  },
  {
    question: 'Wie schnell kann die Website online sein?',
    answer:
      'Wenn alle Inhalte vorliegen und Rueckmeldungen schnell kommen, kann eine einfache Seite oft schon in 2 bis 14 Tagen online gehen. Mehr Inhalte oder Sonderfunktionen dauern entsprechend laenger.',
  },
  {
    question: 'Brauche ich fertige Texte und Bilder?',
    answer:
      'Nein. Vorhandene Texte und Bilder helfen, sind aber kein Muss. Ich sage Ihnen klar, was schon reicht und was noch fehlt.',
  },
  {
    question: 'Was passiert nach dem Livegang?',
    answer:
      'Die Website bleibt online und sauber gehostet. Spaetere Aenderungen sind moeglich, ohne dass Sie in ein monatliches Agenturmodell rutschen.',
  },
  {
    question: 'Ist das auch fuer kleine lokale Unternehmen sinnvoll?',
    answer:
      'Ja. Genau fuer kleine Unternehmen, Praxen, Handwerk und lokale Dienstleistungen ist dieses Angebot gedacht. Sie brauchen oft keine grosse Agentur, sondern einen klaren und glaubwuerdigen Auftritt.',
  },
];

const WebdesignFaqSection: React.FC = () => {
  return (
    <section id="webdesign-faq" className="relative scroll-mt-28 py-12 sm:py-16 lg:py-18">
      <div className="space-y-6 sm:space-y-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className={themeClasses.webEyebrow}>
            <ASCIIText text="// FAQ" noWrap={false} enableHover={false} revealOnMount={false} />
          </p>
          <h2 className="mt-3 text-balance text-[2.3rem] font-bold uppercase leading-[0.96] tracking-[0.028em] text-slate-900 sm:text-5xl">
            Fragen, die vor einer Anfrage
            <br />
            meistens auftauchen.
          </h2>
          <p className="mx-auto mt-4 max-w-[42ch] text-base leading-7 text-slate-600 sm:text-[1.02rem] sm:leading-8">
            Kurz und klar. Wenn danach noch etwas offen ist, reicht eine kurze Mail.
          </p>
        </div>

        <div className="grid gap-3.5">
          {faqItems.map((item, index) => (
            <details key={item.question} className={`group overflow-hidden rounded-[1.3rem] ${themeClasses.webPanelSoft}`} open={index === 0}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 sm:px-6">
                <span className="text-left text-[1.02rem] font-semibold leading-7 text-slate-900 sm:text-[1.08rem]">{item.question}</span>
                <span className={`relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-blue-600 ${themeClasses.webIconBubble}`}>
                  <Plus aria-hidden="true" className="h-4 w-4 group-open:opacity-0" />
                  <Minus aria-hidden="true" className="absolute h-4 w-4 opacity-0 group-open:opacity-100" />
                </span>
              </summary>
              <div className="px-5 pb-5 sm:px-6 sm:pb-6">
                <div className="border-t border-blue-100/80 pt-4">
                  <p className="max-w-[62ch] text-[0.98rem] leading-7 text-slate-600 sm:text-base sm:leading-8">{item.answer}</p>
                </div>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WebdesignFaqSection;
