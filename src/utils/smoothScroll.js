export function smoothScrollToSection(id) {
  const target = document.getElementById(id);
  if (!target) return;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const destination = Math.max(0, target.getBoundingClientRect().top + window.scrollY - 68);
  window.scrollTo({ top: destination, behavior: reducedMotion ? "auto" : "smooth" });
}
