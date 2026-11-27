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
        const header = page.locator('header.aral-header-shell:visible').first();
        assert.equal(await header.locator('a.aral-preview-brand').count(), 1, path);
        assert.equal(Math.round((await header.boundingBox()).height), 82, path);
        assert.equal(await header.locator('.aral-header-compare').getAttribute('aria-label'), 'Сравнение товаров: 0', path);
        assert.equal(await header.locator('.aral-header-count').isVisible(), false, path);
        if (path.endsWith('#interesting')) {
          assert.equal(await header.locator('[aria-current="page"]').innerText(), 'Интересное');
        }
        assert.ok(await page.evaluate(async () => (await document.fonts.load('450 17px Nunito', 'Масло')).length));
        assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), path);
        await checkLocalLinks(page, checked);
      }

      await visit('', '#home-page');
      await page.waitForURL(url(home).href);
      const quote = page.getByRole('link', { name: 'Запросить условия поставки', exact: true });
      assert.ok((await quote.boundingBox()).y < 900);
      assert.match(await quote.getAttribute('href'), /#contacts-wholesale$/);
      await visit('index.html#interesting', '#view-interesting.is-active');
      await visit('pages/products-r15.html#/product/ARAL-013', '.product-detail');
      await page.waitForURL(url(catalog + '#/product/ARAL-013').href);
      await checkLocalLinks(page, checked);
      const variant = page.locator('.variant[data-variant]').nth(1);
      await variant.click();
      assert.match(await variant.getAttribute('class'), /\bactive\b/);
      assert.equal(await variant.innerText(), '20 л');
      const retailUrl = await page.locator('#retailPurchase').getAttribute('href');
      assert.match(retailUrl, /sku=13932#contacts-stores$/);
      await page.locator('#bizPurchase').click();
      await page.waitForURL(/sku=13932#contacts-wholesale$/);
      await page.waitForFunction(() => document.querySelector('#aral-order-form textarea').value.includes('13932'));
      await page.getByLabel('Количество упаковок').fill('4');
      await page.getByLabel('Город поставки').fill('Ногинск');
      const draft = await page.getByLabel('Текст запроса').inputValue();
      assert.match(draft, /Aral MegaTurboral 10W-40 · 20 л · артикул 13932/);
      assert.match(draft, /Количество упаковок: 4/);
      assert.match(draft, /Город поставки: Ногинск/);
      const whatsApp = new URL(await page.locator('#aral-order-whatsapp').getAttribute('href'));
      assert.equal(whatsApp.searchParams.get('text'), draft);
      await visit('pages/' + retailUrl, '#contacts-stores .cc-search');
      await page.waitForFunction(() => document.querySelector('#contacts-stores [data-order-context]').textContent.includes('13932'));

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
      const catalogSearch = page.getByLabel('Поиск масла');
      const searchTop = await catalogSearch.evaluate(input => input.getBoundingClientRect().top);
      assert.ok(searchTop > 0 && searchTop < 400, 'Search must be in the first screen');
      await page.locator('a.catalog-guide').click();
      await page.waitForURL(url(catalog + '#howto').href);
      await page.waitForFunction(() => {
        const guide = document.getElementById('howto').getBoundingClientRect();
        return guide.top >= 82 && guide.top < 180;
      });
      await page.goBack();
      await page.waitForURL(url(catalog + '#/catalog').href);
      await page.waitForFunction(() => scrollY === 0);
      const card = page.locator('#assortment .product-card h3 a').nth(7);
      await card.scrollIntoViewIfNeeded();
      await card.focus();
      const beforeProduct = await page.evaluate(() => scrollY);
      assert.ok(beforeProduct > 400);
      await card.press('Enter');
      await page.locator('.product-detail').waitFor();
      await page.goBack();
      await page.locator('#assortment .product-card').first().waitFor();
      await page.waitForFunction(position => Math.abs(scrollY - position) < 3, beforeProduct);
      await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
      if (width === 390) {
        const menu = page.locator('header .aral-menu-toggle');
        await menu.click();
        assert.equal(await menu.getAttribute('aria-expanded'), 'true');
        await checkLocalLinks(page, checked);
        await menu.press('Escape');
        assert.equal(await menu.getAttribute('aria-expanded'), 'false');
        await page.locator('.mobile-filter-open').click();
        await page.locator('#filtersPanel.drawer-open').waitFor();
        assert.ok(await page.locator('dialog[open] #closeFilters').evaluate(button => {
          const { x, y, width, height } = button.getBoundingClientRect();
          return button.contains(document.elementFromPoint(x + width / 2, y + height / 2));
        }));
        await page.keyboard.press('Escape');
        assert.equal(await page.locator('#openFilters').evaluate(button => button === document.activeElement), true);
        await page.locator('.mobile-filter-open').click();
        const sae = page.locator('#saeFilter');
        const viscosity = await sae.locator('option').nth(1).getAttribute('value');
        await sae.selectOption(viscosity);
        await page.locator('#clearFilters').click();
        assert.equal(await sae.inputValue(), '');
        assert.equal(await page.locator('dialog[open]').count(), 1);
        await page.locator('#applyFilters').click();
        await page.locator('#filtersPanel.drawer-open').waitFor({ state: 'detached' });
      }
      await page.locator('.aral-vehicle-chooser [data-vehicle]').first().click();
      await page.locator('.aral-vehicle-chooser [aria-pressed="true"]').click();
      await catalogSearch.fill('SuperTronic');
      await page.waitForFunction(() => {
        const cards = document.querySelectorAll('#assortment .product-card');
        return cards.length > 0 && cards.length < 16;
      });
      await catalogSearch.fill('');
      const ids = ['ARAL-001', 'ARAL-006', 'ARAL-013', 'ARAL-015'];
      const compareOn = id => page.locator('button[data-compare="' + id + '"]');
      await compareOn(ids[0]).click();
      await page.getByRole('link', { name: 'Сравнение товаров: 1' }).waitFor();
      for (const id of ids.slice(1)) await compareOn(id).click();
      await page.getByRole('link', { name: 'Сравнение товаров: 4' }).click();
      await page.waitForURL(url(catalog + '#/compare').href);
      await page.locator('#clearCompare').waitFor();
      const visibleColumns = page.locator('.compare-table thead [data-compare-column]:visible');
      assert.equal(await visibleColumns.count(), width === 390 ? 2 : 4);
      assert.equal(await page.locator('#floatingCompare').isVisible(), false);
      if (width === 390) {
        await page.locator('[data-pair-slot="0"]').selectOption(ids[2]);
        await page.locator('[data-pair-slot="1"]').selectOption(ids[3]);
        assert.deepEqual(await visibleColumns.evaluateAll(columns => columns.map(el => el.dataset.compareColumn)), ids.slice(2));
        assert.deepEqual(await page.evaluate(() => JSON.parse(localStorage.getItem('aralProductsV13Compare'))), ids);
        assert.ok(await page.locator('.compare-table-wrap').evaluate(el => el.scrollWidth <= el.clientWidth + 1));
        await page.emulateMedia({ media: 'print' });
        assert.equal(await visibleColumns.count(), 4);
        await page.emulateMedia({ media: 'screen' });
      }

      for (const [path, ready] of [routes[0], routes[2]]) {
        await visit(path, ready);
        const badge = page.getByRole('link', { name: 'Сравнение товаров: 4' }).locator('.aral-header-count');
        assert.equal(await badge.innerText(), '4', path);
      }

      await visit(section('contacts') + '#contacts-stores', '#contacts-stores .cc-tab');
      const region = page.locator('#contacts-stores .cc-tab').nth(1);
      await region.click();
      assert.equal(await region.getAttribute('aria-pressed'), 'true');
      await page.locator('.cc-result').nth(1).click();
      assert.equal(await page.locator('.cc-detail a[href^="tel:"]').first().isVisible(), true);
      if (width === 390) {
        assert.equal(await page.locator('.cc-detail h3').evaluate(title => title === document.activeElement), true);
        assert.ok(await page.locator('.cc-detail').evaluate(detail => detail.getBoundingClientRect().top >= 82 && detail.getBoundingClientRect().top <= 180));
      }
      await page.locator('.cc-search').fill('неттакогомагазина');
      await page.getByRole('button', { name: 'Сбросить поиск' }).click();
      assert.equal(await page.locator('.cc-search').inputValue(), '');
      assert.equal(await page.locator('.cc-result').count(), 35);
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
