export function smoothScrollToSection(id) {
  const target = document.getElementById(id);
  if (!target) return;

  // Resolve deferred section sizes before calculating a long navigation jump.
  // Once a section has been visited it can remain rendered, while sections
  // farther down the page still benefit from content-visibility: auto.
  const sections = Array.from(document.querySelectorAll("section[id]"));
  const targetIndex = sections.indexOf(target);
  sections.slice(0, targetIndex + 1).forEach((section) => {
    if (window.getComputedStyle(section).contentVisibility === "auto") {
      section.style.contentVisibility = "visible";
    }
  });

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const destination = Math.max(0, target.getBoundingClientRect().top + window.scrollY - 68);
  window.scrollTo({ top: destination, behavior: reducedMotion ? "auto" : "smooth" });
}
