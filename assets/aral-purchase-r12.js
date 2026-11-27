(() => {
  const form = document.getElementById('aral-order-form');
  if (!form) return;

  const params = new URLSearchParams(location.search);
  const productId = params.get('product');
  const sku = params.get('sku');
  const quantity = form.elements.namedItem('quantity');
  const city = form.elements.namedItem('city');
  const message = form.elements.namedItem('message');
  const whatsApp = document.getElementById('aral-order-whatsapp');
  const copyButton = document.getElementById('aral-copy-order');
  const status = document.getElementById('aral-order-status');
  let selection = '';
  let loading = false;

  function updateDraft() {
    message.value = [
      'Здравствуйте! Хотел бы уточнить условия поставки моторного масла ARAL.',
      selection,
      quantity.value && quantity.validity.valid ? 'Количество упаковок: ' + quantity.value : '',
      city.value.trim() ? 'Город поставки: ' + city.value.trim() : '',
    ].filter(Boolean).join('\n');
    const link = new URL(whatsApp.href);
    link.searchParams.set('text', message.value);
    whatsApp.href = link.href;
  }

  async function copyDraft() {
    if (loading || !form.reportValidity()) return;
    try {
      await navigator.clipboard.writeText(message.value);
      status.textContent = 'Запрос скопирован. Вставьте его в сообщение менеджеру.';
    } catch {
      message.focus();
      message.select();
      status.textContent = 'Текст выделен. Скопируйте его из поля запроса.';
    }
  }

  form.addEventListener('input', updateDraft);
  form.addEventListener('submit', event => {
    event.preventDefault();
    copyDraft();
  });
  copyButton.addEventListener('click', copyDraft);
  whatsApp.addEventListener('click', event => {
    if (loading || !form.reportValidity()) event.preventDefault();
  });
  updateDraft();

  if (!productId && !sku) return;
  const contexts = document.querySelectorAll('[data-order-context]');
  function showContext(text) {
    for (const element of contexts) {
      element.textContent = text;
      element.hidden = false;
    }
  }

  if (!/^ARAL-\d{3}$/.test(productId || '') || !/^[\w-]{1,30}$/.test(sku || '')) {
    showContext('Выберите масло и фасовку в каталоге, чтобы приложить их к запросу.');
    return;
  }

  loading = true;
  copyButton.disabled = true;
  whatsApp.setAttribute('aria-disabled', 'true');
  showContext('Проверяем выбранную фасовку…');
  fetch('../catalog.json')
    .then(response => {
      if (!response.ok) throw new Error('Catalog unavailable');
      return response.json();
    })
    .then(catalog => {
      const product = catalog.products.find(item => item.internal_id === productId && item.category !== 'Coolant');
      const variant = product?.variants.find(item => item.sku === sku);
      if (!variant) throw new Error('Unknown SKU');
      const volume = variant.volume.replace(/\s*L$/i, ' л');
      selection = [product.commercial_name, volume, 'артикул ' + variant.sku].join(' · ');
      showContext(selection);
      updateDraft();
    })
    .catch(() => showContext('Не удалось подтвердить фасовку. Сверьте артикул в каталоге.'))
    .finally(() => {
      loading = false;
      copyButton.disabled = false;
      whatsApp.removeAttribute('aria-disabled');
    });
})();
