(() => {
  const config = window.KIWIFY_CONFIG || {};
  function checkoutUrl(value) {
    try {
      const url = new URL(value);
      return url.protocol === 'https:' && url.hostname === 'pay.kiwify.com.br' &&
        !url.username && !url.password && !url.port && url.pathname !== '/' ? url.href : null;
    } catch { return null; }
  }
  let enabled = 0;
  document.querySelectorAll('[data-checkout]').forEach((button) => {
    const url = checkoutUrl(config.checkouts?.[button.dataset.checkout]);
    if (!config.salesReady || !url) return;
    enabled += 1;
    button.disabled = false;
    button.textContent = button.dataset.checkout === 'basico' ? 'Quero o Pacote Básico →' : 'Quero o Pacote Completo →';
    button.addEventListener('click', () => window.location.assign(url));
  });
  if (enabled === 2) {
    document.querySelector('#launch-note').textContent = 'Escolha seu pacote e finalize a compra no checkout da Kiwify.';
    document.querySelector('.steps li:nth-child(2) p').textContent = 'Confira o pacote e finalize seu pagamento no checkout da plataforma.';
  }
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(config.supportEmail || '')) {
    const link = document.querySelector('#support-link');
    link.href = 'mailto:' + encodeURIComponent(config.supportEmail);
    link.hidden = false;
  }
  if (config.videoUrl) {
    try {
      const url = new URL(config.videoUrl, window.location.href);
      if (url.protocol !== 'https:') return;
      const video = document.createElement('video');
      video.controls = true;
      video.playsInline = true;
      video.preload = 'metadata';
      video.src = url.href;
      video.setAttribute('aria-label', 'Apresentação dos materiais impressos');
      document.querySelector('#video-container').replaceWith(video);
    } catch { /* Mantém o espaço reservado quando não houver uma URL válida. */ }
  }
})();
