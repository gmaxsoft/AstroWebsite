/**
 * Rotacja nagłówka H1 na stronie głównej (co 3 s).
 * Wymaga #hero-title-rotator oraz #hero-h1-data (JSON tablicy HTML).
 */
export function initHeroH1Rotator() {
  const el = document.getElementById("hero-title-rotator");
  const raw = document.getElementById("hero-h1-data");
  if (!el || !raw) return;

  let phrases;
  try {
    phrases = JSON.parse(raw.textContent || "[]");
  } catch {
    return;
  }
  if (!Array.isArray(phrases) || !phrases.length) return;

  let i = 0;
  window.setInterval(() => {
    i = (i + 1) % phrases.length;
    el.classList.add("mil-heading-rotator--fade");
    window.setTimeout(() => {
      el.innerHTML = phrases[i];
      el.classList.remove("mil-heading-rotator--fade");
    }, 260);
  }, 3000);
}
