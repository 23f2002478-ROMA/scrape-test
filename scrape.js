const { chromium } = require('playwright');

const urls = [
  'https://sanand0.github.io/tdsdata/js_table/?seed=64',
  'https://sanand0.github.io/tdsdata/js_table/?seed=65',
  'https://sanand0.github.io/tdsdata/js_table/?seed=66',
  'https://sanand0.github.io/tdsdata/js_table/?seed=67',
  'https://sanand0.github.io/tdsdata/js_table/?seed=68',
  'https://sanand0.github.io/tdsdata/js_table/?seed=69',
  'https://sanand0.github.io/tdsdata/js_table/?seed=70',
  'https://sanand0.github.io/tdsdata/js_table/?seed=71',
  'https://sanand0.github.io/tdsdata/js_table/?seed=72',
  'https://sanand0.github.io/tdsdata/js_table/?seed=73',
];

(async () => {
  // Launch a headless (invisible) browser
  const browser = await chromium.launch();
  const page = await browser.newPage();

  let grandTotal = 0;

  for (const url of urls) {
    await page.goto(url);

    // Wait for the table to actually load (it's dynamically generated)
    await page.waitForSelector('table');

    // Grab all the text inside table cells (<td> tags)
    const cellTexts = await page.$$eval('td', cells =>
      cells.map(cell => cell.innerText.trim())
    );

    // Convert text to numbers, ignore anything that isn't a number
    const pageSum = cellTexts.reduce((sum, text) => {
      const num = parseFloat(text);
      return isNaN(num) ? sum : sum + num;
    }, 0);

    console.log(`Sum for ${url}: ${pageSum}`);
    grandTotal += pageSum;
  }

  console.log(`Total sum across all pages: ${grandTotal}`);

  await browser.close();
})();
