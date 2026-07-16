const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:3000');

  // Wait for content to load (skip boot sequence if possible, or wait)
  // TerminalBoot might take a while. I'll wait for the "System Performance" heading.
  console.log('Waiting for "System Performance" heading...');
  try {
    await page.waitForSelector('h2:has-text("System Performance")', { timeout: 15000 });
  } catch (e) {
    console.log('Timeout waiting for heading. Content might be behind boot screen.');
    // Try to click something or wait longer?
    // In App.tsx, TerminalBoot calls onComplete which sets booting to false.
    // I'll wait 10 seconds more.
    await page.waitForTimeout(10000);
  }

  const results = await page.evaluate(() => {
    function getLuminance(rgb) {
      const parts = rgb.match(/\d+/g).map(Number);
      const [r, g, b] = parts.map(v => {
        v /= 255;
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
      });
      return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    }

    function getContrastRatio(rgb1, rgb2) {
      const l1 = getLuminance(rgb1);
      const l2 = getLuminance(rgb2);
      return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
    }

    const elements = [];
    // Heading
    const heading = document.querySelector('h2:has-text("System Performance")');
    if (heading) {
      const style = window.getComputedStyle(heading);
      const parentStyle = window.getComputedStyle(heading.parentElement.parentElement); // The section or card
      elements.push({
        name: 'Heading "System Performance"',
        color: style.color,
        bg: 'rgb(5, 5, 5)', // Body background
        ratio: getContrastRatio(style.color, 'rgb(5, 5, 5)')
      });
    }

    // Skills items
    const skillItems = document.querySelectorAll('span.text-neutral-200');
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

  console.log(JSON.stringify(results, null, 2));
  await browser.close();
  process.exit(0);
})();
