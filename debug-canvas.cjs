const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('BROWSER LOG:', msg.text()));
  page.on('pageerror', err => console.log('BROWSER ERROR:', err.message));

  await page.goto('http://localhost:3000/webdesign');
  await page.waitForTimeout(2000); // Wait for canvas to mount
  
  const canvasCount = await page.locator('canvas').count();
  console.log('Number of canvases:', canvasCount);

  if (canvasCount > 0) {
    const box = await page.locator('canvas').first().boundingBox();
    console.log('First canvas box:', box);
    
    // Check computed styles
    const styles = await page.evaluate(() => {
      const el = document.querySelector('canvas');
      const style = window.getComputedStyle(el);
      return {
        width: style.width,
        height: style.height,
        display: style.display,
        visibility: style.visibility,
        opacity: style.opacity
      };
    });
    console.log('Canvas CSS Computed:', styles);

    await page.screenshot({ path: 'C:/Users/User/.gemini/antigravity/brain/513a6e8b-97b0-4608-800f-10c9f4df443b/scratch/debug_canvas.png' });
    console.log('Saved screenshot to scratch dir');
  }

  await browser.close();
})();
