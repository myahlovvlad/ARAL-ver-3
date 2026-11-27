const assert = require('node:assert/strict');
const { chromium } = require('playwright-core');

const base = new URL(process.argv[2]);
const home = 'design/hero/prototypes/hero-4s-k-views/ARAL_home_employer_feedback_r12_preview.html';
const company = 'index-employer-feedback-r12-preview.html';
const section = name => 'pages/' + name + '-employer-feedback-r12-preview.html';
const catalog = section('products');
const routes = [
  [home, '#home-page .aral-scene.ready'],
  [company + '#company', '#view-company.is-active'],
  [company + '#interesting', '#view-interesting.is-active'],
  [catalog + '#/catalog', '#assortment .product-card'],
  [section('drivers'), '#drv-intro'],
  [section('partners'), '#part-top'],
  [section('advantages'), '#adv-xmf'],
  [section('contacts') + '#contacts-stores', '#contacts-stores'],
];
const url = path => new URL(path, base);

async function checkLocalLinks(page, checked) {
  const links = await page.locator('a[href]:visible').evaluateAll(
    anchors => anchors.map(anchor => anchor.href),
  );
  for (const link of links) {
    const target = new URL(link);
    if (target.origin !== base.origin) continue;
    assert.ok(target.pathname.startsWith(base.pathname), 'Link escaped the site: ' + target.href);
    target.hash = '';
    if (checked.has(target.href)) continue;
    const response = await page.request.get(target.href);
    assert.ok(response.ok(), 'Missing linked file: ' + target.href);
    checked.add(target.href);
  }
}

async function run() {
  const browser = await chromium.launch({ executablePath: process.env.ARAL_CHROMIUM_EXECUTABLE });
  try {
    const checked = new Set();
    for (const width of [1440, 390]) {
      const page = await browser.newPage({
        viewport: { width, height: 900 },
        reducedMotion: 'reduce',
      });
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      page.on('response', response => {
        const target = new URL(response.url());
        if (target.origin === base.origin && response.status() >= 400 && !target.pathname.endsWith('/favicon.ico')) {
          errors.push(response.status() + ' ' + target.pathname);
        }
      });
      async function visit(path, ready) {
        const response = await page.goto(url(path).href);
        assert.ok(response === null || response.ok(), path);
        await page.locator(ready).first().waitFor();
      }

      for (const [path, ready] of routes) {
        await visit(path, ready);
        assert.equal(await page.locator('body').getAttribute('data-feedback-preview'), 'r12');
        assert.ok(await page.evaluate(async () => (await document.fonts.load('450 17px Nunito', 'Масло')).length));
        assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), path);
        await checkLocalLinks(page, checked);
      }

      await visit('', '#home-page');
      await page.waitForURL(url(home).href);
      await visit('index.html#interesting', '#view-interesting.is-active');
      await visit('pages/products-r15.html#/product/ARAL-013', '.product-detail');
      await page.waitForURL(url(catalog + '#/product/ARAL-013').href);
      await checkLocalLinks(page, checked);
      const variant = page.locator('.variant[data-variant]').nth(1);
      await variant.click();
      assert.match(await variant.getAttribute('class'), /\bactive\b/);

      for (const [id, filename] of [
        ['ARAL-008', 'ARAL-008_2025-06-02_EN.pdf'],
        ['ARAL-013', 'ARAL-013_2025-03-25_DE.pdf'],
        ['ARAL-016', 'ARAL-016_2025-03-31_DE.pdf'],
      ]) {
        await visit(catalog + '#/product/' + id, '.product-detail');
        const pdf = page.locator('.document-view[href$="' + filename + '"]');
        await pdf.waitFor();
        const response = await page.request.get(new URL(await pdf.getAttribute('href'), page.url()).href);
        assert.ok(response.ok(), id);
        assert.equal((await response.body()).subarray(0, 5).toString(), '%PDF-');
      }

      await visit(catalog + '#/catalog', '#assortment .product-card');
      if (width === 390) {
        const menu = page.locator('header .aral-menu-toggle');
        await menu.click();
        assert.equal(await menu.getAttribute('aria-expanded'), 'true');
        await checkLocalLinks(page, checked);
        await menu.press('Escape');
        assert.equal(await menu.getAttribute('aria-expanded'), 'false');
        await page.locator('.mobile-filter-open').click();
        await page.locator('#filtersPanel.drawer-open').waitFor();
        await page.locator('#applyFilters').click();
        await page.locator('#filtersPanel.drawer-open').waitFor({ state: 'detached' });
      }
      await page.locator('.aral-vehicle-chooser [data-vehicle]').first().click();
      await page.locator('.aral-vehicle-chooser [aria-pressed="true"]').click();
      await page.locator('#searchBox').fill('SuperTronic');
      await page.waitForFunction(() => {
        const cards = document.querySelectorAll('#assortment .product-card');
        return cards.length > 0 && cards.length < 16;
      });
      await page.locator('#assortment button[data-compare]').first().click();
      await page.locator('header .aral-header-compare').click();
      await page.waitForURL(url(catalog + '#/compare').href);
      await page.locator('#clearCompare').waitFor();

      await visit(section('contacts') + '#contacts-stores', '#contacts-stores .cc-tab');
      const region = page.locator('#contacts-stores .cc-tab').nth(1);
      await region.click();
      assert.equal(await region.getAttribute('aria-pressed'), 'true');
      assert.deepEqual(errors, []);
      console.log('R12 release routes and interactions passed at width ' + width);
      await page.close();
    }
    console.log('Verified ' + checked.size + ' local link targets');
  } finally {
    await browser.close();
  }
}

run().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
