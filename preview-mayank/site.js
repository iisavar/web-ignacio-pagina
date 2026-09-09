(function () {
  const current = document.body.dataset.page;
  document.querySelectorAll('.site-nav a[data-page]').forEach((link) => {
    if (link.dataset.page === current) link.classList.add('active');
  });

  document.querySelectorAll('.action-btn[data-target]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const panel = document.getElementById(btn.dataset.target);
      if (!panel) return;
      const open = panel.hasAttribute('hidden');
      if (open) {
        panel.removeAttribute('hidden');
        btn.classList.add('is-open');
      } else {
        panel.setAttribute('hidden', '');
        btn.classList.remove('is-open');
      }
    });
  });

  document.querySelectorAll('.cite-tabs').forEach((tabsEl) => {
    const wrap = tabsEl.parentElement.querySelector('.cite-content-wrap');
    if (!wrap) return;
    tabsEl.querySelectorAll('.cite-tab').forEach((tab) => {
      tab.addEventListener('click', () => {
        const fmt = tab.dataset.fmt;
        tabsEl.querySelectorAll('.cite-tab').forEach((t) => t.classList.toggle('is-active', t === tab));
        wrap.querySelectorAll('.cite-content').forEach((c) => {
          const match = c.dataset.fmt === fmt;
          if (match) c.removeAttribute('hidden'); else c.setAttribute('hidden', '');
        });
      });
    });
  });

  document.querySelectorAll('.copy-btn').forEach((btn) => {
    btn.addEventListener('click', async () => {
      let source;
      if (btn.dataset.target === 'active-cite') {
        const panel = btn.closest('.cite-panel');
        source = panel ? panel.querySelector('.cite-content:not([hidden])') : null;
      } else if (btn.dataset.target === 'prev') {
        source = btn.parentElement.parentElement.querySelector('.copy-source');
      } else {
        source = btn.parentElement.querySelector('.copy-source');
      }
      if (!source) return;
      const text = source.innerText.trim();
      try {
        await navigator.clipboard.writeText(text);
      } catch (_) {
        const range = document.createRange();
        range.selectNodeContents(source);
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
        document.execCommand('copy');
        sel.removeAllRanges();
      }
      const original = btn.textContent;
      btn.textContent = 'Copiado';
      btn.classList.add('is-copied');
      setTimeout(() => {
        btn.textContent = original;
        btn.classList.remove('is-copied');
      }, 1400);
    });
  });
})();
