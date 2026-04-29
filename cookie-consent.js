(function () {
  var GA_ID = 'G-9PSBD4QX30';
  var KEY = 'ib_cookies';

  function loadGA() {
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', GA_ID);
  }

  var saved = localStorage.getItem(KEY);
  if (saved === 'accepted') { loadGA(); return; }
  if (saved === 'rejected') { return; }

  function accept() {
    localStorage.setItem(KEY, 'accepted');
    loadGA();
    remove();
  }

  function reject() {
    localStorage.setItem(KEY, 'rejected');
    remove();
  }

  function remove() {
    var el = document.getElementById('ib-cookie-banner');
    if (el) {
      el.style.transform = 'translateY(120%)';
      el.style.opacity = '0';
      setTimeout(function () { el.remove(); }, 400);
    }
  }

  function inject() {
    var css = document.createElement('style');
    css.textContent = [
      '#ib-cookie-banner{',
        'position:fixed;bottom:20px;left:50%;transform:translateX(-50%);',
        'width:calc(100% - 40px);max-width:780px;',
        'background:#fff;border-radius:16px;',
        'box-shadow:0 8px 40px rgba(59,75,249,0.13),0 2px 12px rgba(0,0,0,0.08);',
        'padding:20px 24px;',
        'display:flex;align-items:center;gap:20px;flex-wrap:wrap;',
        'font-family:"Plus Jakarta Sans",system-ui,sans-serif;',
        'z-index:99999;',
        'transition:transform .4s ease,opacity .4s ease;',
      '}',
      '#ib-cookie-banner .ib-cb-icon{font-size:28px;flex-shrink:0;}',
      '#ib-cookie-banner .ib-cb-text{flex:1;min-width:200px;}',
      '#ib-cookie-banner .ib-cb-text p{',
        'font-size:14px;line-height:1.5;color:#1A2040;margin:0;',
      '}',
      '#ib-cookie-banner .ib-cb-text a{',
        'color:#3B4BF9;text-decoration:underline;',
      '}',
      '#ib-cookie-banner .ib-cb-actions{display:flex;gap:10px;flex-shrink:0;}',
      '#ib-cookie-banner .ib-cb-reject{',
        'padding:10px 18px;border-radius:10px;font-size:14px;font-weight:600;',
        'border:1.5px solid #D1D8F0;background:transparent;color:#1A2040;',
        'cursor:pointer;white-space:nowrap;transition:border-color .2s,background .2s;',
      '}',
      '#ib-cookie-banner .ib-cb-reject:hover{border-color:#3B4BF9;background:#F4F7FF;}',
      '#ib-cookie-banner .ib-cb-accept{',
        'padding:10px 20px;border-radius:10px;font-size:14px;font-weight:700;',
        'border:none;background:#3B4BF9;color:#fff;',
        'cursor:pointer;white-space:nowrap;transition:background .2s,transform .15s;',
      '}',
      '#ib-cookie-banner .ib-cb-accept:hover{background:#2a38d4;transform:scale(1.03);}',
      '@media(max-width:540px){',
        '#ib-cookie-banner{bottom:0;left:0;transform:none;width:100%;border-radius:16px 16px 0 0;}',
        '#ib-cookie-banner .ib-cb-actions{width:100%;justify-content:stretch;}',
        '#ib-cookie-banner .ib-cb-reject,#ib-cookie-banner .ib-cb-accept{flex:1;text-align:center;}',
      '}'
    ].join('');
    document.head.appendChild(css);

    var banner = document.createElement('div');
    banner.id = 'ib-cookie-banner';
    banner.innerHTML = [
      '<span class="ib-cb-icon">🍪</span>',
      '<div class="ib-cb-text">',
        '<p>Usamos cookies analíticas (Google Analytics) para entender cómo se usa la web.',
        ' Puedes consultar nuestra <a href="cookies.html">política de cookies</a>.</p>',
      '</div>',
      '<div class="ib-cb-actions">',
        '<button class="ib-cb-reject">Solo necesarias</button>',
        '<button class="ib-cb-accept">Aceptar todo</button>',
      '</div>'
    ].join('');

    document.body.appendChild(banner);

    banner.querySelector('.ib-cb-accept').addEventListener('click', accept);
    banner.querySelector('.ib-cb-reject').addEventListener('click', reject);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
})();
