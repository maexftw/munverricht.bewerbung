import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, Mail, ShieldCheck } from 'lucide-react';
import ASCIIText from './ASCIIText';
import { themeClasses } from './themeClasses';

type ExistingSiteValue = 'none' | 'live' | 'relaunch';
type ProjectTypeValue = 'landing' | 'multipage' | 'shop' | 'relaunch' | 'unsure';
type GoalValue = 'anfragen' | 'vertrauen' | 'sichtbarkeit' | 'modernisieren' | 'verkaufen';
type TimelineValue = 'soon' | 'month' | 'quarter' | 'open';

type FormData = {
  businessName: string;
  companySummary: string;
  existingSite: ExistingSiteValue | '';
  existingUrl: string;
  projectType: ProjectTypeValue | '';
  primaryGoal: GoalValue | '';
  features: string[];
  timeline: TimelineValue | '';
  styleNotes: string;
  contactName: string;
  email: string;
  phone: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

const projectOptions: Array<{ value: ProjectTypeValue; title: string; body: string }> = [
  { value: 'landing', title: 'Landingpage', body: 'Eine kompakte Seite für ein Angebot oder eine klare Anfrage.' },
  { value: 'multipage', title: 'Mehrseitige Website', body: 'Mehrere Unterseiten für Leistungen, Über-uns, Kontakt oder Referenzen.' },
  { value: 'shop', title: 'Shop oder Buchung', body: 'Produkte verkaufen, Termine buchen oder andere feste Abläufe abbilden.' },
  { value: 'relaunch', title: 'Relaunch', body: 'Eine bestehende Website soll sauber neu aufgebaut werden.' },
  { value: 'unsure', title: 'Noch offen', body: 'Das Ziel ist klar, aber die passende Struktur noch nicht.' },
];

const goalOptions: Array<{ value: GoalValue; label: string }> = [
  { value: 'anfragen', label: 'Mehr Anfragen über die Website' },
  { value: 'vertrauen', label: 'Seriöser und klarer wirken' },
  { value: 'sichtbarkeit', label: 'Lokal besser gefunden werden' },
  { value: 'modernisieren', label: 'Bestehende Website modernisieren' },
  { value: 'verkaufen', label: 'Produkte oder Leistungen direkt verkaufen' },
];

const featureOptions = [
  'Kontaktformular',
  'Terminbuchung',
  'Shop-System',
  'Mehrsprachigkeit',
  'Blog oder News',
  'Bewerbungsformular',
  'Kundenstimmen / Referenzen',
];

const timelineOptions: Array<{ value: TimelineValue; label: string; body: string }> = [
  { value: 'soon', label: 'Möglichst bald', body: 'Das Thema ist akut.' },
  { value: 'month', label: 'In 1-2 Monaten', body: 'Es gibt Bedarf, aber etwas Spielraum.' },
  { value: 'quarter', label: 'In den nächsten 3 Monaten', body: 'Das Projekt soll geplant gestartet werden.' },
  { value: 'open', label: 'Zeitlich offen', body: 'Wichtig ist erstmal die Richtung.' },
];

const steps = [
  { id: '01', label: 'Ausgangslage', title: 'Worum geht es?' },
  { id: '02', label: 'Umfang', title: 'Welche Website soll entstehen?' },
  { id: '03', label: 'Funktionen', title: 'Was muss die Website konkret können?' },
  { id: '04', label: 'Kontakt', title: 'Wie erreiche ich Sie?' },
] as const;

const inputBaseClassName =
  'w-full rounded-[1rem] border border-slate-300/85 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(248,250,253,0.96))] px-4 py-3 text-[1rem] text-slate-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.94),0_1px_0_rgba(15,23,42,0.02)] outline-none transition-all duration-200 placeholder:text-slate-500 caret-slate-900 focus:border-blue-400 focus:ring-2 focus:ring-blue-200/75 focus:ring-offset-1 focus:ring-offset-[#eef3fb]';

const textareaClassName = `${inputBaseClassName} min-h-[8.5rem] resize-y leading-7`;
const optionCardBaseClassName =
  'relative block cursor-pointer overflow-hidden rounded-[1rem] border px-4 py-4 transition-all duration-200 focus-within:border-blue-300 focus-within:ring-2 focus-within:ring-blue-200 focus-within:ring-offset-2 focus-within:ring-offset-[#eef3fb]';
const optionInputClassName = 'absolute inset-0 h-full w-full cursor-pointer opacity-0';
const getOptionCardClassName = (checked: boolean) =>
  `${optionCardBaseClassName} ${checked ? 'border-blue-300 bg-blue-50/80 shadow-[0_10px_22px_rgba(59,130,246,0.10)]' : 'border-white/80 bg-white/66 hover:border-blue-200'}`;

const initialData: FormData = {
  businessName: '',
  companySummary: '',
  existingSite: '',
  existingUrl: '',
  projectType: '',
  primaryGoal: '',
  features: [],
  timeline: '',
  styleNotes: '',
  contactName: '',
  email: '',
  phone: '',
};

const WebdesignIntakeForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>(initialData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [mailPrepared, setMailPrepared] = useState(false);

  const progressValue = ((currentStep + 1) / steps.length) * 100;

  const summaryLines = useMemo(() => {
    const existingSiteLabel =
      formData.existingSite === 'none'
        ? 'Noch keine Website'
        : formData.existingSite === 'live'
          ? 'Website existiert bereits'
          : formData.existingSite === 'relaunch'
            ? 'Bestehende Website soll neu aufgebaut werden'
            : 'Nicht angegeben';

    const projectLabel = projectOptions.find((option) => option.value === formData.projectType)?.title ?? 'Nicht angegeben';
    const goalLabel = goalOptions.find((option) => option.value === formData.primaryGoal)?.label ?? 'Nicht angegeben';
    const timelineLabel = timelineOptions.find((option) => option.value === formData.timeline)?.label ?? 'Nicht angegeben';
    const featuresLabel = formData.features.length > 0 ? formData.features.join(', ') : 'Keine speziellen Features angegeben';

    return [
      `Unternehmen / Projekt: ${formData.businessName || 'Nicht angegeben'}`,
      `Ausgangslage: ${existingSiteLabel}`,
      `Website-Typ: ${projectLabel}`,
      `Hauptziel: ${goalLabel}`,
      `Features: ${featuresLabel}`,
      `Zeitfenster: ${timelineLabel}`,
    ];
  }, [formData]);

  const updateField = <K extends keyof FormData>(field: K, value: FormData[K]) => {
    setFormData((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      if (!current[field]) return current;
      const nextErrors = { ...current };
      delete nextErrors[field];
      return nextErrors;
    });
  };

  const toggleFeature = (feature: string) => {
    setFormData((current) => {
      const nextFeatures = current.features.includes(feature)
        ? current.features.filter((item) => item !== feature)
        : [...current.features, feature];

      return { ...current, features: nextFeatures };
    });
  };

  const validateStep = (stepIndex: number) => {
    const nextErrors: FormErrors = {};

    if (stepIndex === 0) {
      if (!formData.businessName.trim()) nextErrors.businessName = 'Bitte Unternehmen oder Projekt kurz benennen.';
      if (!formData.companySummary.trim()) nextErrors.companySummary = 'Bitte kurz beschreiben, was Sie anbieten.';
      if (!formData.existingSite) nextErrors.existingSite = 'Bitte angeben, ob es schon eine Website gibt.';
    }

    if (stepIndex === 1) {
      if (!formData.projectType) nextErrors.projectType = 'Bitte wählen, welche Art Website gebraucht wird.';
      if (!formData.primaryGoal) nextErrors.primaryGoal = 'Bitte das wichtigste Ziel auswählen.';
    }

    if (stepIndex === 2) {
      if (!formData.timeline) nextErrors.timeline = 'Bitte ein ungefähres Zeitfenster angeben.';
    }

    if (stepIndex === 3) {
      if (!formData.contactName.trim()) nextErrors.contactName = 'Bitte den Namen für die Rückmeldung angeben.';
      if (!formData.email.trim()) {
        nextErrors.email = 'Bitte eine E-Mail-Adresse angeben, damit ich antworten kann.';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
        nextErrors.email = 'Bitte eine gültige E-Mail-Adresse angeben.';
      }
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const goNext = () => {
    if (!validateStep(currentStep)) return;
    setCurrentStep((step) => Math.min(step + 1, steps.length - 1));
  };

  const goBack = () => {
    setCurrentStep((step) => Math.max(step - 1, 0));
  };

  const prepareMail = () => {
    if (!validateStep(3)) return;

    const body = [
      'Hallo Maximilian,',
      '',
      'ich möchte eine Ersteinschätzung für eine Website-Anfrage.',
      '',
      ...summaryLines,
      `Beschreibung: ${formData.companySummary || 'Nicht angegeben'}`,
      `Bestehende Website: ${formData.existingUrl || 'Keine URL angegeben'}`,
      `Stil / Hinweise: ${formData.styleNotes || 'Keine weiteren Hinweise'}`,
      `Kontaktperson: ${formData.contactName}`,
      `E-Mail: ${formData.email}`,
      `Telefon: ${formData.phone || 'Nicht angegeben'}`,
      '',
      'Viele Grüße',
      formData.contactName,
    ].join('\n');

    const subject = `Webdesign-Anfrage // ${formData.businessName || formData.contactName}`;
    const mailtoUrl = `mailto:info@graphiks.de?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    setMailPrepared(true);
    window.location.href = mailtoUrl;
  };

  return (
    <section id="project-intake" className="relative scroll-mt-36 py-10 sm:py-12 lg:py-16">
      <div className="absolute left-[4%] top-12 hidden h-36 w-36 rounded-full bg-blue-200/45 blur-3xl lg:block" aria-hidden="true" />
      <div className="absolute right-[6%] bottom-10 hidden h-44 w-44 rounded-full bg-cyan-100/70 blur-3xl lg:block" aria-hidden="true" />

      <div className="relative z-10 grid gap-8 xl:grid-cols-[minmax(18rem,0.72fr)_minmax(0,1.28fr)] xl:gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-5 text-left"
        >
          <div className="space-y-4">
            <p className={themeClasses.webEyebrow}>
              <ASCIIText text="// PROJEKT_ANFRAGE" noWrap={false} enableHover={false} />
            </p>
            <h2 className="max-w-[16ch] text-balance text-[1.95rem] font-bold uppercase tracking-[0.03em] text-slate-900 sm:text-[2.15rem] sm:leading-[0.96] lg:text-[2.35rem]">
              In 4 Schritten zur ersten Einschätzung.
            </h2>
            <div className="max-w-[52ch] space-y-3 text-[0.98rem] leading-7 text-slate-600 sm:text-[1rem] sm:leading-8">
              <p>
                Ich frage nur das ab, was ich für eine erste Rückmeldung und einen realistischen Preisrahmen wirklich brauche.
              </p>
              <p>
                Je klarer Ihre Angaben, desto schneller kann ich Aufwand, Struktur und passende Richtung einschätzen.
              </p>
            </div>
          </div>

          <div className={`space-y-4 rounded-[1.2rem] p-5 sm:p-6 ${themeClasses.webCard}`}>
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 h-5 w-5 text-blue-600" aria-hidden="true" />
              <div>
                <p className={themeClasses.webEyebrow}>Kurz gesagt</p>
                <div className="mt-3 space-y-3">
                  {[
                    'Ich sehe schneller, welche Art Website zu Ihrem Vorhaben passt.',
                    'Ich kann Aufwand und Preisrahmen deutlich besser einschätzen.',
                    'Sie müssen kein langes Formular ausfüllen, nur die wichtigsten Punkte.',
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <span className="mt-[0.45rem] h-2.5 w-2.5 rounded-full bg-blue-500 shadow-[0_0_0_4px_rgba(59,130,246,0.12)]" aria-hidden="true" />
                      <p className="max-w-[42ch] text-sm leading-relaxed text-slate-600 sm:text-[0.96rem]">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.18 }}
          transition={{ duration: 0.72, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className={`relative overflow-hidden rounded-[1.35rem] p-4 sm:p-5 ${themeClasses.webPanel}`}
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.36),transparent_40%)]" aria-hidden="true" />

          <div className="relative z-10 space-y-5">
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className={themeClasses.webEyebrow}>
                    <ASCIIText text={`// SCHRITT_${steps[currentStep].id}`} noWrap={false} enableHover={false} />
                  </p>
                  <h3 className="mt-2 text-[1.45rem] font-semibold tracking-tight text-slate-900 sm:text-[1.7rem]">
                    {steps[currentStep].title}
                  </h3>
                </div>
                <span className={themeClasses.webPill}>
                  <span className="mono text-[10px] uppercase tracking-[0.24em] text-slate-500">
                    {currentStep + 1} / {steps.length}
                  </span>
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-white/65">
                <motion.div
                  className="h-full rounded-full bg-[linear-gradient(90deg,rgba(37,99,235,0.88),rgba(14,165,233,0.72))]"
                  animate={{ width: `${progressValue}%` }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>

              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {steps.map((step, index) => {
                  const isActive = index === currentStep;
                  const isComplete = index < currentStep;

                  return (
                    <div
                      key={step.id}
                      className={`rounded-[0.95rem] px-3 py-3 ${isActive ? 'border border-blue-200 bg-blue-50/80' : isComplete ? 'border border-emerald-200 bg-emerald-50/80' : 'border border-white/75 bg-white/56'} shadow-[inset_0_1px_0_rgba(255,255,255,0.82)]`}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`flex h-6 w-6 items-center justify-center rounded-full ${isComplete ? 'bg-emerald-500 text-white' : isActive ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-500'}`}>
                          {isComplete ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : <span className="mono text-[10px]">{step.id}</span>}
                        </div>
                        <span className={`mono text-[10px] uppercase tracking-[0.2em] ${isActive ? 'text-blue-600' : isComplete ? 'text-emerald-600' : 'text-slate-500'}`}>
                          {step.label}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-5"
              >
                {currentStep === 0 && (
                  <>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor="businessName">
                        Unternehmen oder Projektname
                      </label>
                      <input
                        id="businessName"
                        type="text"
                        value={formData.businessName}
                        onChange={(event) => updateField('businessName', event.target.value)}
                        className={inputBaseClassName}
                        placeholder="z. B. Praxis Mustermann oder Dachdeckerbetrieb"
                      />
                      {errors.businessName && <p className="mt-2 text-sm text-rose-600">{errors.businessName}</p>}
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor="companySummary">
                        Was bieten Sie an und was soll auf der Website sofort klar werden?
                      </label>
                      <textarea
                        id="companySummary"
                        value={formData.companySummary}
                        onChange={(event) => updateField('companySummary', event.target.value)}
                        className={textareaClassName}
                        placeholder="Kurz und einfach: Was machen Sie, für wen und was soll auf der Website schnell klar werden?"
                      />
                      {errors.companySummary && <p className="mt-2 text-sm text-rose-600">{errors.companySummary}</p>}
                    </div>

                    <fieldset className="space-y-3">
                      <legend className="text-sm font-semibold text-slate-700">Gibt es schon eine Website?</legend>
                      <div className="grid gap-3 sm:grid-cols-3">
                        {[
                          { value: 'none', label: 'Noch keine', body: 'Die Website soll neu entstehen.' },
                          { value: 'live', label: 'Ja, sie ist live', body: 'Es gibt bereits eine bestehende Website.' },
                          { value: 'relaunch', label: 'Ja, aber sie soll neu', body: 'Die aktuelle Seite soll ersetzt oder gründlich überarbeitet werden.' },
                        ].map((option) => {
                          const checked = formData.existingSite === option.value;
                          return (
                            <label
                              key={option.value}
                              className={getOptionCardClassName(checked)}
                            >
                              <input
                                type="radio"
                                name="existingSite"
                                value={option.value}
                                checked={checked}
                                onChange={() => updateField('existingSite', option.value as ExistingSiteValue)}
                                className={optionInputClassName}
                              />
                              <p className="text-sm font-semibold text-slate-800">{option.label}</p>
                              <p className="mt-2 text-sm leading-relaxed text-slate-600">{option.body}</p>
                            </label>
                          );
                        })}
                      </div>
                      {errors.existingSite && <p className="text-sm text-rose-600">{errors.existingSite}</p>}
                    </fieldset>

                    {(formData.existingSite === 'live' || formData.existingSite === 'relaunch') && (
                      <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor="existingUrl">
                          Falls vorhanden: aktuelle Website
                        </label>
                        <input
                          id="existingUrl"
                          type="url"
                          value={formData.existingUrl}
                          onChange={(event) => updateField('existingUrl', event.target.value)}
                          className={inputBaseClassName}
                          placeholder="https://..."
                        />
                      </div>
                    )}
                  </>
                )}

                {currentStep === 1 && (
                  <>
                    <fieldset className="space-y-3">
                      <legend className="text-sm font-semibold text-slate-700">Welche Website brauchen Sie?</legend>
                      <div className="grid gap-3">
                        {projectOptions.map((option) => {
                          const checked = formData.projectType === option.value;
                          return (
                            <label
                              key={option.value}
                              className={getOptionCardClassName(checked)}
                            >
                              <input
                                type="radio"
                                name="projectType"
                                value={option.value}
                                checked={checked}
                                onChange={() => updateField('projectType', option.value)}
                                className={optionInputClassName}
                              />
                              <div className="flex items-start justify-between gap-3">
                                <div>
                                  <p className="text-[1rem] font-semibold text-slate-900">{option.title}</p>
                                  <p className="mt-2 max-w-[46ch] text-sm leading-relaxed text-slate-600">{option.body}</p>
                                </div>
                                {checked && (
                                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-white">
                                    <Check className="h-4 w-4" aria-hidden="true" />
                                  </span>
                                )}
                              </div>
                            </label>
                          );
                        })}
                      </div>
                      {errors.projectType && <p className="text-sm text-rose-600">{errors.projectType}</p>}
                    </fieldset>

                    <fieldset className="space-y-3">
                      <legend className="text-sm font-semibold text-slate-700">Was ist das wichtigste Ziel?</legend>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {goalOptions.map((option) => {
                          const checked = formData.primaryGoal === option.value;
                          return (
                            <label
                              key={option.value}
                              className={getOptionCardClassName(checked)}
                            >
                              <input
                                type="radio"
                                name="primaryGoal"
                                value={option.value}
                                checked={checked}
                                onChange={() => updateField('primaryGoal', option.value)}
                                className={optionInputClassName}
                              />
                              <p className="text-sm font-semibold text-slate-800">{option.label}</p>
                            </label>
                          );
                        })}
                      </div>
                      {errors.primaryGoal && <p className="text-sm text-rose-600">{errors.primaryGoal}</p>}
                    </fieldset>
                  </>
                )}

                {currentStep === 2 && (
                  <>
                    <fieldset className="space-y-3">
                      <legend className="text-sm font-semibold text-slate-700">Welche Funktionen sind relevant?</legend>
                      <p className="text-sm leading-relaxed text-slate-600">
                        Nur auswählen, was für Ihr Vorhaben wirklich wichtig ist. Alles andere kann später geklärt werden.
                      </p>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {featureOptions.map((feature) => {
                          const checked = formData.features.includes(feature);
                          return (
                            <label
                              key={feature}
                              className={getOptionCardClassName(checked)}
                            >
                              <input
                                type="checkbox"
                                checked={checked}
                                onChange={() => toggleFeature(feature)}
                                className={optionInputClassName}
                              />
                              <div className="flex items-center justify-between gap-3">
                                <span className="text-sm font-semibold text-slate-800">{feature}</span>
                                <span className={`flex h-6 w-6 items-center justify-center rounded-full ${checked ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-500'}`}>
                                  {checked ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : null}
                                </span>
                              </div>
                            </label>
                          );
                        })}
                      </div>
                    </fieldset>

                    <fieldset className="space-y-3">
                      <legend className="text-sm font-semibold text-slate-700">Wann soll das Thema starten?</legend>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {timelineOptions.map((option) => {
                          const checked = formData.timeline === option.value;
                          return (
                            <label
                              key={option.value}
                              className={getOptionCardClassName(checked)}
                            >
                              <input
                                type="radio"
                                name="timeline"
                                value={option.value}
                                checked={checked}
                                onChange={() => updateField('timeline', option.value)}
                                className={optionInputClassName}
                              />
                              <p className="text-sm font-semibold text-slate-800">{option.label}</p>
                              <p className="mt-2 text-sm leading-relaxed text-slate-600">{option.body}</p>
                            </label>
                          );
                        })}
                      </div>
                      {errors.timeline && <p className="text-sm text-rose-600">{errors.timeline}</p>}
                    </fieldset>

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor="styleNotes">
                        Optional: Gibt es noch wichtige Hinweise?
                      </label>
                      <textarea
                        id="styleNotes"
                        value={formData.styleNotes}
                        onChange={(event) => updateField('styleNotes', event.target.value)}
                        className={textareaClassName}
                        placeholder="z. B. bestehende Farben behalten, mobil besonders wichtig, Terminbuchung später möglich"
                      />
                    </div>
                  </>
                )}

                {currentStep === 3 && (
                  <>
                    <div className={`rounded-[1rem] p-4 sm:p-5 ${themeClasses.webCard}`}>
                      <p className={themeClasses.webEyebrow}>Das schicken Sie mir</p>
                      <div className="mt-3 space-y-2">
                        {summaryLines.map((line) => (
                          <p key={line} className="text-sm leading-relaxed text-slate-600">
                            {line}
                          </p>
                        ))}
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor="contactName">
                          Ihr Name
                        </label>
                        <input
                          id="contactName"
                          type="text"
                          value={formData.contactName}
                          onChange={(event) => updateField('contactName', event.target.value)}
                          className={inputBaseClassName}
                          placeholder="Vor- und Nachname"
                        />
                        {errors.contactName && <p className="mt-2 text-sm text-rose-600">{errors.contactName}</p>}
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor="email">
                          E-Mail-Adresse
                        </label>
                        <input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(event) => updateField('email', event.target.value)}
                          className={inputBaseClassName}
                          placeholder="name@unternehmen.de"
                        />
                        {errors.email && <p className="mt-2 text-sm text-rose-600">{errors.email}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor="phone">
                        Optional: Telefonnummer
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(event) => updateField('phone', event.target.value)}
                        className={inputBaseClassName}
                        placeholder="+49 ..."
                      />
                    </div>

                    <div className={`rounded-[1rem] p-4 sm:p-5 ${themeClasses.webPanelSoft}`}>
                      <div className="flex items-start gap-3">
                        <Mail className="mt-0.5 h-5 w-5 text-blue-600" aria-hidden="true" />
                        <div>
                          <p className={themeClasses.webEyebrow}>Was beim Klick passiert</p>
                          <p className="mt-2 text-sm leading-relaxed text-slate-600">
                            Beim Klick öffnet sich Ihre Mail-App mit allen Angaben. So geht Ihre Anfrage ohne Formularsystem direkt an mich raus.
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="flex flex-col gap-3 border-t border-blue-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={goBack}
                disabled={currentStep === 0}
                className={`${themeClasses.webButtonSecondary} ${currentStep === 0 ? 'pointer-events-none opacity-45' : ''}`}
              >
                <ArrowLeft className="h-4 w-4 text-blue-600" />
                  <span className={`${themeClasses.webMeta} font-bold text-slate-800`}>Zurück</span>
              </button>

              {currentStep < steps.length - 1 ? (
                <button type="button" onClick={goNext} className={themeClasses.webButtonPrimary}>
                  <span className={`${themeClasses.webMeta} font-bold text-white`}>Weiter</span>
                  <ArrowRight className="h-4 w-4 text-white" />
                </button>
              ) : (
                <button type="button" onClick={prepareMail} className={themeClasses.webButtonPrimary}>
                  <span className={`${themeClasses.webMeta} font-bold text-white`}>Anfrage jetzt per E-Mail vorbereiten</span>
                  <ArrowRight className="h-4 w-4 text-white" />
                </button>
              )}
            </div>

            {mailPrepared && (
              <div className={`rounded-[1rem] p-4 sm:p-5 ${themeClasses.webCard}`}>
                <p className="text-sm leading-relaxed text-slate-600">
                  Falls sich keine Mail-App geöffnet hat, schreiben Sie direkt an <a href="mailto:info@graphiks.de" className="font-semibold text-blue-600 hover:text-blue-500">info@graphiks.de</a>.
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WebdesignIntakeForm;
