(() => {
  const base = new URL(document.currentScript.dataset.siteRoot || './', document.baseURI);
  const root = path => new URL(path, base).href;
  const contacts = 'pages/contacts-employer-feedback-r12-preview.html';
  const brand = 'index-employer-feedback-r12-preview.html';
  const markup = `<div class="af-inner">
    <div class="af-layout">
      <section aria-label="Продукция и документы">
        <a class="af-identity" href="${root('index.html')}" aria-label="ARAL — на главную">
          <img src="${root('assets/aral-logo-header-r9.svg')}" width="52" height="52" alt="ARAL">
        </a>
        <h2 class="af-title">Продукция и документы</h2>
        <div class="af-links">
          <a href="${root('pages/products-employer-feedback-r12-preview.html#/catalog')}">Продукция</a>
          <a href="https://msdspds.aral.com/" target="_blank" rel="noopener noreferrer">Паспорта PDS и SDS ↗</a>
        </div>
      </section>
      <nav aria-label="Покупка и поставки">
        <h2 class="af-title">Покупка и поставки</h2>
        <div class="af-links">
          <a href="${root(contacts + '#contacts-stores')}">Где купить</a>
          <a href="${root('pages/partners-employer-feedback-r12-preview.html')}">Сотрудничество</a>
          <a href="${root(contacts + '#contacts-wholesale')}">Отдел продаж</a>
        </div>
      </nav>
      <nav aria-label="О бренде">
        <h2 class="af-title">ARAL</h2>
        <div class="af-links">
          <a href="${root(brand + '#company')}">О бренде</a>
          <a href="${root('pages/advantages-employer-feedback-r12-preview.html')}">Преимущества ARAL</a>
          <a href="${root('pages/drivers-employer-feedback-r12-preview.html')}">Для водителей</a>
          <a href="${root(brand + '#interesting')}">Интересное</a>
        </div>
      </nav>
    </div>
  </div>`;

  for (const footer of document.querySelectorAll('footer')) {
    footer.className = 'aral-global-footer';
    footer.setAttribute('aria-label', 'Подвал сайта ARAL');
    footer.innerHTML = markup;
  }
})();
