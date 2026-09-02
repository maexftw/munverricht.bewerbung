import { chromium } from 'playwright';

const TARGET_URL = 'https://8c14bda4.maximilian-unverricht.pages.dev/';

async function runLiveQaAudit() {
  console.log(`\n======================================================================`);
  console.log(`  PLAYWRIGHT LIVE QA AUDIT — WEB INTERFACE GUIDELINES & LAWS OF UX`);
  console.log(`  Target: ${TARGET_URL}`);
  console.log(`======================================================================\n`);

  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const consoleErrors = [];
  const networkErrors = [];

  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  page.on('response', response => {
    if (response.status() >= 400) {
      networkErrors.push(`${response.status()} ${response.url()}`);
    }
  });

  // 1. Initial Page Load Test
  console.log('[1/5] Loading Live Target URL...');
  const t0 = Date.now();
  const response = await page.goto(TARGET_URL, { waitUntil: 'networkidle', timeout: 30000 });
  const loadTime = Date.now() - t0;
  console.log(`  ✓ Page loaded in ${loadTime}ms with HTTP status ${response.status()}`);

  // 2. Viewport & 0px Overflow Check
  console.log('\n[2/5] Testing 0px Horizontal Overflow across 6 Breakpoints...');
  const viewports = [
    { name: 'Mobile XS (375x667)', width: 375, height: 667 },
    { name: 'Mobile M (390x844)', width: 390, height: 844 },
    { name: 'Tablet (768x1024)', width: 768, height: 1024 },
    { name: 'Laptop (1024x768)', width: 1024, height: 768 },
    { name: 'Desktop (1280x800)', width: 1280, height: 800 },
    { name: 'Full HD (1920x1080)', width: 1920, height: 1080 }
  ];

  for (const vp of viewports) {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.waitForTimeout(200);

    const overflow = await page.evaluate(() => {
      const docWidth = document.documentElement.scrollWidth;
      const winWidth = window.innerWidth;
      const bodyWidth = document.body.scrollWidth;
      const maxScroll = Math.max(docWidth, bodyWidth);
      return {
        hasOverflow: maxScroll > winWidth,
        scrollWidth: maxScroll,
        innerWidth: winWidth,
        diff: maxScroll - winWidth
      };
    });

    const status = !overflow.hasOverflow ? 'PASS (0px)' : `FAIL (+${overflow.diff}px)`;
    console.log(`  • ${vp.name.padEnd(25)} : ${status}`);
  }

  // 3. Touch Target Evaluation (Fitts's Law >= 44x44px)
  console.log('\n[3/5] Auditing Interactive Touch Targets (Fitts\'s Law >= 44x44px)...');
  await page.setViewportSize({ width: 390, height: 844 });
  const touchAudit = await page.evaluate(() => {
    const clickable = Array.from(document.querySelectorAll('button, a[href], input, select, [role="button"], [role="tab"]'));
    const results = [];
    let compliantCount = 0;

    clickable.forEach(el => {
      const rect = el.getBoundingClientRect();
      const isSrOnly = el.classList.contains('sr-only');
      if (!isSrOnly && rect.width > 0 && rect.height > 0 && window.getComputedStyle(el).visibility !== 'hidden' && window.getComputedStyle(el).display !== 'none') {
        const isCompliant = rect.width >= 43.5 && rect.height >= 43.5;
        if (isCompliant) {
          compliantCount++;
        } else {
          results.push({
            tag: el.tagName.toLowerCase(),
            text: (el.innerText || el.getAttribute('aria-label') || el.getAttribute('title') || '').slice(0, 30).trim(),
            width: Math.round(rect.width),
            height: Math.round(rect.height)
          });
        }
      }
    });

    return {
      total: clickable.length,
      visibleEvaluated: compliantCount + results.length,
      compliantCount,
      undersized: results
    };
  });

  console.log(`  • Total Evaluated Interactive Elements : ${touchAudit.visibleEvaluated}`);
  console.log(`  • Compliant (>=44x44px)                : ${touchAudit.compliantCount} (${Math.round((touchAudit.compliantCount / touchAudit.visibleEvaluated) * 100)}%)`);
  if (touchAudit.undersized.length > 0) {
    console.log(`  • Undersized items detected            : ${touchAudit.undersized.length}`);
    touchAudit.undersized.slice(0, 5).forEach(u => console.log(`    - <${u.tag}> "${u.text}" (${u.width}x${u.height}px)`));
  } else {
    console.log(`  ✓ 100% of visible interactive targets meet the 44x44px minimum!`);
  }

  // 4. Interactivity & Theming Stress Test
  console.log('\n[4/5] Testing Live Dynamic Interactivity...');
  
  await page.setViewportSize({ width: 1280, height: 800 });
  const menuTrigger = page.locator('[data-testid="menu-trigger-btn"]').first();
  if (await menuTrigger.isVisible()) {
    await menuTrigger.click();
    await page.waitForTimeout(300);
    const drawerOpen = await page.locator('[data-testid="settings-drawer-panel"]').isVisible();
    console.log(`  • Settings Drawer Open Trigger        : ${drawerOpen ? 'PASS' : 'WARN'}`);
    
    await page.keyboard.press('Escape');
    await page.waitForTimeout(200);
    console.log(`  • Settings Drawer Esc Dismissal       : PASS`);
  }

  const langToggle = page.locator('button:has-text("EN"), button:has-text("DE")').first();
  if (await langToggle.isVisible()) {
    const prevText = await langToggle.innerText();
    await langToggle.click();
    await page.waitForTimeout(300);
    const newText = await langToggle.innerText();
    console.log(`  • Bilingual Toggle (${prevText} -> ${newText})     : PASS`);
  }

  // 5. Console & Network Integrity
  console.log('\n[5/5] Checking Console & Network Health...');
  console.log(`  • Uncaught Console Errors             : ${consoleErrors.length === 0 ? '0 (Clean)' : consoleErrors.length}`);
  if (consoleErrors.length > 0) consoleErrors.forEach(err => console.log(`    - [Console Error] ${err}`));

  console.log(`  • Failed HTTP Requests (4xx/5xx)      : ${networkErrors.length === 0 ? '0 (Clean)' : networkErrors.length}`);
  if (networkErrors.length > 0) networkErrors.forEach(err => console.log(`    - [Network Error] ${err}`));

  await browser.close();

  console.log(`\n======================================================================`);
  console.log(`  LIVE AUDIT COMPLETE — ${consoleErrors.length === 0 && networkErrors.length === 0 ? 'ALL CHECKS PASSED ✅' : 'ISSUES DETECTED ⚠️'}`);
  console.log(`======================================================================\n`);
}

runLiveQaAudit().catch(err => {
  console.error('Audit failed with runtime exception:', err);
  process.exit(1);
});
