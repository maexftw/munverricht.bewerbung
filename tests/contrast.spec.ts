import { test, expect } from '@playwright/test';

test('contrast check', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // Wait for content
  await page.waitForSelector('h2:has-text("System Performance")', { timeout: 20000 });

  const results = await page.evaluate(() => {
    function getLuminance(rgb: string) {
      const parts = rgb.match(/\d+/g)?.map(Number) || [0,0,0];
      const [r, g, b] = parts.map(v => {
        v /= 255;
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
      });
      return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    }

    function getContrastRatio(rgb1: string, rgb2: string) {
      const l1 = getLuminance(rgb1);
      const l2 = getLuminance(rgb2);
      return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
    }

    const elements: any[] = [];
    // Heading
    const headings = Array.from(document.querySelectorAll('h2'));
    const heading = headings.find(h => h.textContent?.includes('System Performance'));
    if (heading) {
      const style = window.getComputedStyle(heading);
      elements.push({
        name: 'Heading "System Performance"',
        color: style.color,
        bg: 'rgb(5, 5, 5)',
        ratio: getContrastRatio(style.color, 'rgb(5, 5, 5)')
      });
    }

    // Skills items
    const skillItems = Array.from(document.querySelectorAll('span')).filter(s => s.className.includes('text-neutral-200'));
    if (skillItems.length > 0) {
      const item = skillItems[0];
      const style = window.getComputedStyle(item);
      const card = item.closest('.bg-\\[\\#111111\\]');
      const bg = card ? window.getComputedStyle(card).backgroundColor : 'rgb(5, 5, 5)';
      elements.push({
        name: 'Skill Item (text-neutral-200)',
        color: style.color,
        bg: bg,
        ratio: getContrastRatio(style.color, bg)
      });
    }

    return elements;
  });

  console.log('CONTRAST_RESULTS:', JSON.stringify(results, null, 2));
});
