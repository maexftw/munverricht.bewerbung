import { readFileSync, readdirSync, statSync } from 'node:fs';
import { extname, join, relative } from 'node:path';

const textExtensions = new Set(['.html', '.ts', '.tsx', '.js', '.mjs', '.json', '.md']);
const root = process.cwd();

const walkTextFiles = (directory) => {
  const files = [];
  for (const entry of readdirSync(directory)) {
    const absolute = join(directory, entry);
    const stat = statSync(absolute);
    if (stat.isDirectory()) {
      files.push(...walkTextFiles(absolute));
    } else if (textExtensions.has(extname(entry))) {
      files.push(absolute);
    }
  }
  return files;
};

const publicSourceFiles = [
  join(root, 'index.html'),
  ...walkTextFiles(join(root, 'components')),
  ...walkTextFiles(join(root, 'public')),
];

const failures = [];

const checkPattern = (files, label, pattern) => {
  for (const file of files) {
    const content = readFileSync(file, 'utf8');
    if (pattern.test(content)) {
      failures.push(`${relative(root, file)}: ${label}`);
    }
  }
};

const checkRequiredPattern = (files, label, pattern) => {
  for (const file of files) {
    const content = readFileSync(file, 'utf8');
    if (!pattern.test(content)) {
      failures.push(`${relative(root, file)}: ${label}`);
    }
  }
};

checkPattern(publicSourceFiles, 'alte Marke oder alte E-Mail-Domain graphiks.de', /graphiks\.de/i);
checkPattern(publicSourceFiles, 'Mojibake-Zeichenfolge', /Ã|Â|â€|�/u);
checkPattern(publicSourceFiles, 'maskiertes und dadurch unbrauchbares tel:-Ziel', /tel:\+491\*+/u);
checkPattern(publicSourceFiles, 'falsche Schreibweise von D-Smoker', /Desmoke|DE-Smoker/iu);
checkPattern(
  [join(root, 'components/Navigation.tsx')],
  'alte sichtbare Split-Token-Marke graphiks.de',
  /text=["']graphiks["'][\s\S]{0,120}>\.de</iu,
);

const unsupportedClaims = [
  ['unbelegter 12+-Claim', /12\+\s*(?:Jahre|years)/iu],
  ['unbelegter 12-Jahre-Claim', /12\s+Jahre(?:n)?\s+(?:Berufs|Praxis|Erfahrung)/iu],
  ['unbelegter 10+-Claim', /10\+\s*Jahre/iu],
  ['unbelegter 10-Jahre-Claim', /(?:Nach\s+)?10\s+Jahren/iu],
  ['unbelegte alte Timeline', /2012\s*[-–]\s*2023/u],
  ['unbelegte lokale RAG-/Zero-Cloud-Positionierung', /Zero-Cloud|Offline-RAG/iu],
  ['unbelegter ZBN-Showcase', /ZBN Offline Document Workflow/iu],
  ['unbelegter RTX-5090-Claim', /RTX\s*5090/iu],
  ['unbelegter TinaCMS-Claim', /TinaCMS/iu],
];

for (const [label, pattern] of unsupportedClaims) {
  checkPattern(publicSourceFiles, label, pattern);
}

checkPattern(
  [join(root, 'components/SkillMonitor.tsx')],
  'unbegründeter Skill-Prozentwert',
  /(?:94|91|88|74|72)%/u,
);

const decoupledFiles = [
  ['index.html', /<a[^>]+href=["']\/webdesign["']/iu],
  ['components/Hero.tsx', /href:\s*["']\/webdesign["']/u],
  ['components/LegalPage.tsx', /href=["']\/webdesign["']/u],
];

for (const [path, pattern] of decoupledFiles) {
  const file = join(root, path);
  if (pattern.test(readFileSync(file, 'utf8'))) {
    failures.push(`${path}: Webdesign-Unterseite ist noch aus dem Job-Portfolio verlinkt`);
  }
}

checkRequiredPattern(
  [join(root, 'components/Evolution.tsx'), join(root, 'public/Maximilian_Unverricht_Resume_2026.html')],
  'bestätigte Google-Ads-/Analytics-Praxis seit 2013 fehlt',
  /Google Ads[\s\S]{0,120}(?:Analytics|AdWords)[\s\S]{0,120}2013|2013[\s\S]{0,120}Google Ads[\s\S]{0,120}(?:Analytics|AdWords)/iu,
);
checkRequiredPattern(
  [join(root, 'components/Evolution.tsx'), join(root, 'public/Maximilian_Unverricht_Resume_2026.html')],
  'historische Einordnung der Google-Zertifizierungen von 2017 fehlt',
  /2017[\s\S]{0,100}(?:historisch|zertifiziert|certification)|(?:historisch|zertifiziert|certification)[\s\S]{0,100}2017/iu,
);
checkRequiredPattern(
  [join(root, 'components/Evolution.tsx'), join(root, 'public/Maximilian_Unverricht_Resume_2026.html')],
  'bestätigte D-Smoker-/JTL-Erfahrung fehlt',
  /JTL[\s\S]{0,120}D-Smoker|D-Smoker[\s\S]{0,120}JTL/iu,
);
checkRequiredPattern(
  [join(root, 'components/Projects.tsx'), join(root, 'public/Maximilian_Unverricht_Resume_2026.html')],
  'VR Air Bridge Fix fehlt',
  /VR Air Bridge Fix/u,
);
checkRequiredPattern(
  [join(root, 'components/Projects.tsx'), join(root, 'public/Maximilian_Unverricht_Resume_2026.html')],
  'STALKER 2 Re Voice fehlt',
  /STALKER 2 Re Voice/u,
);
checkPattern(
  [join(root, 'components/Projects.tsx')],
  'falsche Aim-Trainer-React-URL oder React-Implementierung',
  /aim-trainer-react\.pages\.dev|title:\s*['"]Aim Trainer['"][\s\S]{0,300}\bReact\b/iu,
);
checkRequiredPattern(
  [join(root, 'components/Projects.tsx')],
  'verifizierte Aim-Trainer-URL oder Vanilla-JavaScript-Einordnung fehlt',
  /https:\/\/maexftw\.github\.io\/aim-trainer\/[\s\S]{0,500}Vanilla JavaScript/iu,
);
checkRequiredPattern(
  [join(root, 'components/WebdesignAboutSection.tsx')],
  'belegte Webdesign-/Marketing-Einordnung seit 2013 fehlt',
  /Praxis seit 2013 in digitalem Marketing und Webprojekten/iu,
);

if (failures.length > 0) {
  console.error('Public-claim check failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Public-claim check passed.');
