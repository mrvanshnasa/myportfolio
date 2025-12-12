// script.js
// Minimal JS: mobile nav toggle, copy email button, set year
document.addEventListener('DOMContentLoaded', () => {
  // Set year
  const yEl = document.getElementById('year');
  if (yEl) yEl.textContent = new Date().getFullYear();

  // Mobile nav
  const navToggle = document.getElementById('navToggle');
  const navList = document.getElementById('navList');
  navToggle?.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    if (!expanded) {
      navList.style.display = 'flex';
      navList.style.flexDirection = 'column';
      navList.style.gap = '12px';
    } else {
      navList.style.display = '';
    }
  });

  // Copy email / Hire me
  const copyBtn = document.getElementById('copyEmail');
  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      const email = copyBtn.dataset.email || '';
      if (!email) {
        copyBtn.textContent = 'Email missing';
        setTimeout(()=> copyBtn.textContent = 'Hire me', 1400);
        return;
      }
      try {
        await navigator.clipboard.writeText(email);
        copyBtn.textContent = 'Email copied';
        setTimeout(()=> copyBtn.textContent = 'Hire me', 1400);
      } catch (err) {
        const tmp = document.createElement('input');
        tmp.value = email;
        document.body.appendChild(tmp);
        tmp.select();
        try { document.execCommand('copy'); copyBtn.textContent = 'Copied'; }
        catch(e){ copyBtn.textContent = 'Copy failed'; }
        document.body.removeChild(tmp);
        setTimeout(()=> copyBtn.textContent = 'Hire me', 1400);
      }
    });
  }
});
