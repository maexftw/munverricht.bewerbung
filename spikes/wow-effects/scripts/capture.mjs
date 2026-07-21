import { mkdirSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const here = path.dirname(fileURLToPath(import.meta.url));
const outputDir = path.resolve(here, '../evidence');
const chrome = process.env.CHROME_PATH || 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const baseUrl = process.env.WOW_LAB_URL || 'http://127.0.0.1:4176/';

mkdirSync(outputDir, { recursive: true });

const captures = [
  ['shader-desktop', 'shader', '1440,1000', false],
  ['systems-desktop', 'systems', '1440,1000', false],
  ['type-desktop', 'type', '1440,1000', false],
  ['shader-mobile', 'shader', '390,844', false],
  ['systems-mobile', 'systems', '390,844', false],
  ['type-mobile', 'type', '390,844', false],
  ['shader-reduced', 'shader', '1440,1000', true],
];

for (const [name, experiment, windowSize, reducedMotion] of captures) {
  const output = path.join(outputDir, `${name}.png`);
  const url = new URL(baseUrl);
  url.searchParams.set('experiment', experiment);
  url.searchParams.set('motion', reducedMotion ? 'reduce' : 'full');

  const args = [
    '--headless=new',
    '--hide-scrollbars',
    '--use-angle=swiftshader',
    '--enable-webgl',
    '--ignore-gpu-blocklist',
    '--virtual-time-budget=5000',
    `--window-size=${windowSize}`,
    `--screenshot=${output}`,
  ];

  args.push(url.toString());

  const result = spawnSync(chrome, args, { stdio: 'inherit' });
  if (result.status !== 0) process.exit(result.status ?? 1);
  console.log(`captured ${output}`);
}
