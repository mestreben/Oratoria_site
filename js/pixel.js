// ===== META PIXEL =====
// Cole aqui o ID do Pixel da Meta (Gerenciador de Eventos > Fontes de dados > seu pixel).
// Enquanto estiver vazio, o pixel fica desligado e os eventos abaixo são simplesmente ignorados.
const META_PIXEL_ID = ''; // <-- COLE O ID AQUI, ex: '123456789012345'

if (META_PIXEL_ID) {
  !function (f, b, e, v, n, t, s) {
    if (f.fbq) return; n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0';
    n.queue = []; t = b.createElement(e); t.async = !0;
    t.src = v; s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', META_PIXEL_ID);
  fbq('track', 'PageView');
}

// Eventos usados no site (chamados em js/main.js):
// - Lead: envio do formulário no fim do quiz
// - ViewContent: página "Para Você"
// - InitiateCheckout: clique em qualquer link de compra da Hotmart
// - Contact: envio dos formulários de empresas e mentoria
function trackPixel(event, params) {
  if (typeof window.fbq === 'function') window.fbq('track', event, params || {});
}
