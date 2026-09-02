import { chromium } from 'playwright';

async function testLaunch() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  console.log('Successfully launched Edge via Playwright!');
  await browser.close();
}
testLaunch();
