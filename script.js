(() => {
  const config = window.KIWIFY_CONFIG || {};
  function checkoutUrl(value) {
    try {
      const url = new URL(value);
      if (url.protocol !== 'https:' || url.hostname !== 'pay.kiwify.com.br' ||
          url.username || url.password || url.port || url.pathname === '/') return null;
      return url.href;
    } catch { return null; }
  }

  document.querySelectorAll('[data-checkout]').forEach((button) => {
    const url = checkoutUrl(config.checkouts?.[button.dataset.checkout]);
    if (!url) {
      button.textContent = 'Em breve';
      button.disabled = true;
      return;
    }
    button.disabled = false;
    button.textContent = 'Comprar na Kiwify →';
    button.addEventListener('click', () => window.location.assign(url));
  });

  const modal = document.querySelector('#access-modal');
  document.querySelectorAll('[data-open-modal]').forEach((button) => {
    button.addEventListener('click', () => modal.showModal());
  });
  modal.querySelector('.close').addEventListener('click', () => modal.close());
  modal.addEventListener('click', (event) => {
    if (event.target === modal) modal.close();
  });
})();
