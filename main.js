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
    const demoCfg = {
      academia: {
        name: 'Agente Academia Preparat',
        sector: 'Academia',
        intro: '¡Hola! 👋 Soy el asistente de Academia Preparat. ¿En qué oposición estás interesado/a?',
        replies: [
          '¡Perfecto! Tenemos un programa específico para esa preparación 🎯 ¿Cuándo querrías empezar?',
          'Genial. ¿Sería tu primera vez preparando esta oposición, o ya lo intentaste antes?',
          'No te preocupes, empezamos desde cero. Para prepararte un plan personalizado, ¿me dejas tu nombre y teléfono? El director te llama en menos de 24h 📲',
        ],
        lead: '🔔 Nuevo lead — Academia\nInteresado/a en preparación de oposiciones. Solicita llamada.',
      },
      clinica: {
        name: 'Agente Clínica Dental Smile',
        sector: 'Clínica',
        intro: '¡Hola! 😊 Soy el asistente de Clínica Dental Smile. ¿En qué puedo ayudarte hoy?',
        replies: [
          'Entendido. ¿Tienes alguna preferencia de día u horario para la visita?',
          'Perfecto. ¿Es la primera vez que vienes a nuestra clínica o ya eres paciente?',
          'Genial, te reservamos hueco. Dame tu nombre y teléfono para confirmar — te avisamos por WhatsApp en seguida 📅',
        ],
        lead: '🔔 Nuevo lead — Clínica\nPaciente solicita primera cita. Pendiente de confirmar horario.',
      },
      restaurante: {
        name: 'Agente Restaurante La Plaza',
        sector: 'Restaurante',
        intro: '¡Buenas! 🍽️ Soy el asistente de Restaurante La Plaza. ¿Quieres hacer una reserva?',
        replies: [
          '¡Perfecto! ¿Para cuántas personas y qué día tienes en mente?',
          'Anotado. ¿Hay alguna alergia o preferencia especial que debamos tener en cuenta?',
          'Todo listo. Solo necesito tu nombre y teléfono para confirmar la reserva — te llegará un WhatsApp de confirmación 🙌',
        ],
        lead: '🔔 Nueva reserva — Restaurante\nCliente solicita mesa. Pendiente de confirmar.',
      },
    };

    let currentDemo = 'academia';
    let replyIdx    = 0;
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

    function initDemo(key) {
      currentDemo  = key;
      replyIdx     = 0;
      waitingReply = false;
      demoMsgsEl.innerHTML = '';
      demoWaEl?.classList.remove('show');
      const cfg = demoCfg[key];
      if (demoChatName)    demoChatName.textContent    = cfg.name;
      if (demoSectorBadge) demoSectorBadge.textContent = cfg.sector;
      demoAddTyping();
      setTimeout(() => {
        demoRemoveTyping();
        demoAddMsg(cfg.intro, 'bot');
      }, 700);
    }

    function sendDemoMsg() {
      const val = demoInputEl.value.trim();
      if (!val || waitingReply) return;
      demoInputEl.value = '';
      demoAddMsg(val, 'user');
      waitingReply = true;
      const cfg = demoCfg[currentDemo];
      if (replyIdx < cfg.replies.length) {
        demoAddTyping();
        const delay = 800 + cfg.replies[replyIdx].length * 12;
        setTimeout(() => {
          demoRemoveTyping();
          demoAddMsg(cfg.replies[replyIdx], 'bot');
          replyIdx++;
          waitingReply = false;
          if (replyIdx === cfg.replies.length) {
            setTimeout(() => {
              if (demoWaText)  demoWaText.textContent = cfg.lead;
              demoWaEl?.classList.add('show');
              setTimeout(() => demoWaEl?.classList.remove('show'), 5000);
            }, 1200);
          }
        }, delay);
      } else {
        demoAddMsg('¡Gracias! En breve nos pondremos en contacto contigo 😊', 'bot');
        waitingReply = false;
      }
    }

    document.querySelectorAll('.demo-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.demo-tab').forEach(t => {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
        });
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');
        initDemo(tab.dataset.demo);
      });
    });

    demoSendBtn?.addEventListener('click', sendDemoMsg);
    demoInputEl?.addEventListener('keydown', e => { if (e.key === 'Enter') sendDemoMsg(); });

    initDemo('academia');
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
