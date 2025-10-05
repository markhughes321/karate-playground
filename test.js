const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto('http://localhost:3000');
    await page.waitForSelector('.monaco-editor');

    console.log('✅ Editor loaded');
    console.log('🎬 Running test...\n');

    await page.click('button');

    await page.waitForFunction(() =>
        document.getElementById('output').textContent.includes('All tests passed') ||
        document.getElementById('output').textContent.includes('failed')
    , { timeout: 30000 });

    const output = await page.textContent('#output');
    console.log(output);

    if (output.includes('passed:     1') && output.includes('failed: 0')) {
        console.log('\n🎉 TEST PASSED!');
    }

    await page.waitForTimeout(10000);
    await browser.close();
})();
