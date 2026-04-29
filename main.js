/* ═══════════════════════════════════════════════════════
   InteliBots — Shared JavaScript
   ═══════════════════════════════════════════════════════ */

(function () {
  'use strict';

  // ── CURSOR GLOW ──────────────────────────────────────
  const glow = document.getElementById('cursorGlow');
  if (glow) {
    if ('ontouchstart' in window) {
      glow.style.display = 'none';
    } else {
      document.addEventListener('mousemove', e => {
        glow.style.left = e.clientX + 'px';
        glow.style.top  = e.clientY + 'px';
      }, { passive: true });
    }
  }

  // ── NAV SCROLL ───────────────────────────────────────
  const navEl = document.getElementById('mainNav');
  if (navEl) {
    window.addEventListener('scroll', () => {
      navEl.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });
  }

  // ── HAMBURGER MENU ───────────────────────────────────
  const hbg = document.getElementById('hbg');
  const mob = document.getElementById('mob');
  let menuOpen = false;

  if (hbg && mob) {
    hbg.addEventListener('click', toggleMenu);
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && menuOpen) closeMenu();
    });
  }

  function toggleMenu() {
    menuOpen ? closeMenu() : openMenu();
  }

  function openMenu() {
    menuOpen = true;
    mob.classList.add('open');
    mob.setAttribute('aria-hidden', 'false');
    hbg.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    const [s1, s2, s3] = hbg.querySelectorAll('span');
    s1.style.transform = 'rotate(45deg) translate(4px, 4px)';
    s2.style.opacity = '0';
    s3.style.transform = 'rotate(-45deg) translate(4px, -4px)';
  }

  function closeMenu() {
    menuOpen = false;
    mob.classList.remove('open');
    mob.setAttribute('aria-hidden', 'true');
    hbg.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    hbg.querySelectorAll('span').forEach(s => {
      s.style.transform = '';
      s.style.opacity = '';
    });
  }

  // expose globally for inline onclick=""
  window.closeMob = closeMenu;

  // ── REVEAL ON SCROLL ─────────────────────────────────
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          revealObserver.unobserve(e.target);
        }
      });
    }, { threshold: 0.08 });

    revealEls.forEach(el => revealObserver.observe(el));

    // Fallback: ensure visibility after 400ms
    setTimeout(() => {
      revealEls.forEach(el => el.classList.add('visible'));
    }, 400);
  }

  // ── ANIMATED COUNTERS ────────────────────────────────
  function animateCounter(el) {
    const target   = +el.dataset.target;
    const duration = 1600;
    const start    = performance.now();
    function frame(now) {
      const p = Math.min((now - start) / duration, 1);
      const v = 1 - Math.pow(1 - p, 3); // cubic ease-out
      el.textContent = Math.round(v * target);
      if (p < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  const counterEls = document.querySelectorAll('.counter-metric');
  if (counterEls.length) {
    const counterObserver = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          animateCounter(e.target);
          counterObserver.unobserve(e.target);
        }
      });
    }, { threshold: 0.5 });
    counterEls.forEach(el => counterObserver.observe(el));
  }

  // ── SCORE BAR ANIMATIONS (paginas-web.html) ──────────
  const scoreFills = document.querySelectorAll('.score-fill');
  if (scoreFills.length) {
    const scoreObserver = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.style.width = e.target.dataset.w + '%';
          scoreObserver.unobserve(e.target);
        }
      });
    }, { threshold: 0.3 });
    scoreFills.forEach(el => scoreObserver.observe(el));
  }

  // ── WHATSAPP FLOAT BUTTON ────────────────────────────
  const WA_NUMBER  = '34625211550';
  const WA_MESSAGE = encodeURIComponent('Hola, me interesa saber más sobre vuestros servicios de IA para mi academia.');
  const waLink = document.createElement('a');
  waLink.href = `https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`;
  waLink.target = '_blank';
  waLink.rel = 'noopener noreferrer';
  waLink.className = 'wa-float';
  waLink.setAttribute('aria-label', 'Contáctanos por WhatsApp');
  waLink.innerHTML = `
    <span class="wa-float-pulse" aria-hidden="true"></span>
    <span class="wa-float-tip">¡Escríbenos por WhatsApp!</span>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  `;
  document.body.appendChild(waLink);

  // ── SMOOTH ANCHOR SCROLL ─────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        window.scrollTo({
          top: target.getBoundingClientRect().top + window.scrollY - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // ── INTERACTIVE TIMELINE (agentes-ia.html) ───────────
  const timelineSteps = document.querySelectorAll('.timeline-step');
  const previewPanels = document.querySelectorAll('.preview-content');
  const previewTitle  = document.getElementById('previewTitle');

  if (timelineSteps.length) {
    let timelineIdx    = 0;
    let timelinePaused = false;
    let timelineTimer  = null;
    const STEP_DURATION = 2800;

    // Inject progress bars
    timelineSteps.forEach(step => {
      const bar = document.createElement('div');
      bar.className = 'ts-progress';
      step.appendChild(bar);
    });

    function selectStep(i) {
      timelineIdx = i;
      timelineSteps.forEach((s, j) => s.classList.toggle('active', j === i));
      previewPanels.forEach((p, j) => p.classList.toggle('active', j === i));
      if (previewTitle) previewTitle.textContent = `Vista previa — Paso 0${i + 1}`;

      // Progress bars
      document.querySelectorAll('.ts-progress').forEach((b, j) => {
        b.style.transition = 'none';
        b.style.width = '0%';
        if (j === i) {
          requestAnimationFrame(() => requestAnimationFrame(() => {
            b.style.transition = `width ${STEP_DURATION}ms linear`;
            b.style.width = '100%';
          }));
        }
      });
    }

    function startTimeline() {
      clearInterval(timelineTimer);
      timelineTimer = setInterval(() => {
        if (!timelinePaused) {
          timelineIdx = (timelineIdx + 1) % timelineSteps.length;
          selectStep(timelineIdx);
        }
      }, STEP_DURATION);
    }

    // Bind click/hover
    timelineSteps.forEach((step, i) => {
      step.addEventListener('click', () => { timelinePaused = true; selectStep(i); });
      step.addEventListener('mouseenter', () => { timelinePaused = true; selectStep(i); });
    });

    const timelineWrap = document.querySelector('.timeline-wrap');
    if (timelineWrap) {
      timelineWrap.addEventListener('mouseleave', () => { timelinePaused = false; });
    }

    selectStep(0);
    startTimeline();
  }

  // ── TAB SWITCHER (agentes-ia.html) ───────────────────
  const tabBtns   = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  if (tabBtns.length) {
    tabBtns.forEach((btn, i) => {
      btn.addEventListener('click', () => {
        tabBtns.forEach((b, j)   => b.classList.toggle('active', j === i));
        tabPanels.forEach((p, j) => p.classList.toggle('active', j === i));
      });
    });
  }

  // ── FAQ ACCORDION (contacto.html) ────────────────────
  const faqItems = document.querySelectorAll('.faq-item');
  if (faqItems.length) {
    faqItems.forEach(item => {
      item.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        faqItems.forEach(f => f.classList.remove('open'));
        if (!isOpen) item.classList.add('open');
      });
    });
  }

  // ── CONTACT FORM (contacto.html) ─────────────────────
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      const btn = contactForm.querySelector('[type="submit"]');
      btn.textContent = 'Enviando...';
      btn.disabled = true;

      // Simulate async submit (replace with real fetch to your backend)
      setTimeout(() => {
        contactForm.style.display = 'none';
        const success = document.getElementById('formSuccess');
        if (success) { success.style.display = 'block'; }
      }, 1200);
    });
  }

  // ── ACADEMY CHAT WIDGET (agentes-ia.html) ────────────
  const widgetInput = document.getElementById('widgetInput');
  const widgetMsgs  = document.getElementById('widgetMsgs');

  if (widgetInput && widgetMsgs) {
    const widgetResponses = [
      '¡Qué bien! Tenemos un programa específico para esa oposición 🎯 ¿Cuándo querrías empezar a prepararte?',
      'Entendido. ¿Sería tu primera vez preparando esta oposición, o ya lo intentaste antes?',
      '¡Perfecto! Tenemos clase de prueba gratuita este viernes a las 17h. ¿Te la agendo? Solo necesito tu nombre y teléfono 📅',
      'Genial, apuntado. ¡El director te confirmará la cita por WhatsApp en breve! 🙌',
    ];
    let wIdx = 0;

    function sendWidget() {
      const val = widgetInput.value.trim();
      if (!val) return;
      const um = document.createElement('div');
      um.className = 'w-msg-user'; um.textContent = val;
      widgetMsgs.appendChild(um);
      widgetInput.value = '';
      widgetMsgs.scrollTop = widgetMsgs.scrollHeight;

      // Update WA notification
      const waText = document.getElementById('waText');
      if (waText && wIdx === 2) {
        waText.innerHTML = `${val}<br><span style="color:var(--text-mid);font-size:10px">→ Quiere info sobre clases</span>`;
      }

      setTimeout(() => {
        if (wIdx < widgetResponses.length) {
          const bm = document.createElement('div');
          bm.className = 'w-msg-bot';
          bm.textContent = widgetResponses[wIdx++];
          widgetMsgs.appendChild(bm);
          widgetMsgs.scrollTop = widgetMsgs.scrollHeight;
        }
      }, 800);
    }

    widgetInput.addEventListener('keydown', e => { if (e.key === 'Enter') sendWidget(); });
    window.sendWidget = sendWidget;
  }

  // ── DEMO SECTION CHAT (index.html) ──────────────────
  const demoMsgsEl  = document.getElementById('demoMsgs');
  const demoInputEl = document.getElementById('demoInput');
  const demoSendBtn = document.getElementById('demoSendBtn');
  const demoWaEl    = document.getElementById('demoWa');
  const demoWaText  = document.getElementById('demoWaText');
  const demoChatName   = document.getElementById('demoChatName');
  const demoSectorBadge = document.getElementById('demoSectorBadge');

  if (demoMsgsEl) {
    const TYPEBOT_ID  = 'preparat-ky3rudb';
    const TYPEBOT_API = `https://typebot.io/api/v1/typebots/${TYPEBOT_ID}`;

    let tbSessionId  = null;
    let waitingReply = false;

    function demoAddTyping() {
      const d = document.createElement('div');
      d.className = 'd-typing'; d.id = 'demoTyping';
      d.innerHTML = '<div class="typing-dots"><div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div></div>';
      demoMsgsEl.appendChild(d);
      demoMsgsEl.scrollTop = demoMsgsEl.scrollHeight;
    }
    function demoRemoveTyping() { document.getElementById('demoTyping')?.remove(); }
    function demoAddMsg(text, type) {
      const d = document.createElement('div');
      d.className = `d-msg d-msg-${type}`;
      d.textContent = text;
      demoMsgsEl.appendChild(d);
      demoMsgsEl.scrollTop = demoMsgsEl.scrollHeight;
    }

    function tbExtract(messages) {
      return (messages || [])
        .filter(m => m.type === 'text')
        .map(m => {
          try {
            return (m.content.richText || [])
              .map(b => (b.children || []).map(c => c.text || '').join(''))
              .join('\n').trim();
          } catch { return ''; }
        })
        .filter(Boolean);
    }

    async function initDemo() {
      tbSessionId  = null;
      waitingReply = false;
      demoMsgsEl.innerHTML = '';
      demoWaEl?.classList.remove('show');
      if (demoChatName)    demoChatName.textContent    = 'Agente Academia Preparat';
      if (demoSectorBadge) demoSectorBadge.textContent = 'Academia';

      demoAddTyping();
      try {
        const res  = await fetch(`${TYPEBOT_API}/startChat`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({}),
        });
        const data = await res.json();
        tbSessionId = data.sessionId;
        demoRemoveTyping();
        tbExtract(data.messages).forEach(t => demoAddMsg(t, 'bot'));
      } catch {
        demoRemoveTyping();
        demoAddMsg('¡Hola! 👋 Soy el asistente de Academia Preparat. ¿En qué oposición estás interesado/a?', 'bot');
      }
    }

    async function sendDemoMsg() {
      const val = demoInputEl?.value.trim();
      if (!val || waitingReply || !tbSessionId) return;
      demoInputEl.value = '';
      demoAddMsg(val, 'user');
      waitingReply = true;
      demoAddTyping();
      try {
        const res  = await fetch(`${TYPEBOT_API}/continueChat`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId: tbSessionId, message: val }),
        });
        const data = await res.json();
        demoRemoveTyping();
        tbExtract(data.messages).forEach(t => demoAddMsg(t, 'bot'));
      } catch {
        demoRemoveTyping();
        demoAddMsg('Lo siento, ha habido un problema de conexión. Inténtalo de nuevo.', 'bot');
      }
      waitingReply = false;
    }

    demoSendBtn?.addEventListener('click', sendDemoMsg);
    demoInputEl?.addEventListener('keydown', e => { if (e.key === 'Enter') sendDemoMsg(); });

    initDemo();
  }

  // ── ANIMATED HERO CHAT (index.html) ──────────────────
  const chatEl = document.getElementById('chatMessages');
  if (chatEl) {
    const script = [
      { type: 'bot',  text: '¡Hola! 👋 Soy el asistente de Academia Preparat. ¿En qué oposición estás interesado/a?' },
      { type: 'user', text: 'Hola, me interesa preparar las oposiciones de mossos d\'esquadra' },
      { type: 'bot',  text: '¡Perfecto! Tenemos un programa específico para Mossos. Para darte la mejor información, ¿cuándo te gustaría empezar?' },
      { type: 'user', text: 'Lo antes posible, en septiembre si puede ser' },
      { type: 'bot',  text: 'Genial 🎯 Tenemos plazas para septiembre. ¿Tienes experiencia previa preparando esta oposición o sería tu primera vez?' },
      { type: 'user', text: 'Primera vez' },
      { type: 'bot',  text: 'No te preocupes, empezamos desde cero. ¿Me dejas tu nombre y teléfono para que el director te llame? 📲' },
    ];
    let msgIdx = 0;

    function addTyping() {
      const d = document.createElement('div');
      d.className = 'msg-typing'; d.id = 'typingIndicator';
      d.innerHTML = '<div class="typing-dots"><div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div></div>';
      chatEl.appendChild(d); chatEl.scrollTop = chatEl.scrollHeight;
    }
    function removeTyping() { document.getElementById('typingIndicator')?.remove(); }
    function addMsg(m) {
      const d = document.createElement('div');
      d.className = `msg msg-${m.type}`; d.textContent = m.text;
      chatEl.appendChild(d); chatEl.scrollTop = chatEl.scrollHeight;
    }
    function nextMsg() {
      if (msgIdx >= script.length) {
        setTimeout(() => { chatEl.innerHTML = ''; msgIdx = 0; setTimeout(nextMsg, 1000); }, 3500);
        return;
      }
      const m = script[msgIdx++];
      if (m.type === 'bot') {
        addTyping();
        setTimeout(() => { removeTyping(); addMsg(m); setTimeout(nextMsg, 1800); }, 900 + m.text.length * 18);
      } else {
        setTimeout(() => { addMsg(m); setTimeout(nextMsg, 700); }, 600);
      }
    }
    setTimeout(nextMsg, 800);
  }

})();
