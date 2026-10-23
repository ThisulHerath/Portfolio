import { useState, useEffect } from "react";
import { smoothScrollToSection } from "../utils/smoothScroll";
import "./Navbar.css";

const links = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "lab", label: "Lab" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export default function Navbar({ activeSection }) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  const scrollTo = (id) => {
    smoothScrollToSection(id);
    setMenuOpen(false);
  };

  return (
    <nav className={`navbar ${activeSection !== "hero" ? "scrolled" : ""}`} aria-label="Primary navigation">
      <div className="scroll-progress" aria-hidden="true" />
      <div className="nav-inner">
        <button className="nav-logo" onClick={() => scrollTo("hero")} aria-label="Go to home section">
          <span className="logo-bracket">&lt;</span>
          <span className="logo-name">AI</span>
          <span className="logo-slash">/</span>
          <span className="logo-bracket">&gt;</span>
        </button>

        <div id="primary-menu" className={`nav-links ${menuOpen ? "open" : ""}`}>
          {links.map((link) => (
            <button
              key={link.id}
              className={`nav-link ${activeSection === link.id ? "active" : ""}`}
              onClick={() => scrollTo(link.id)}
            >
              {link.label}
            </button>
          ))}
          <a
            href="/resume.pdf"
            className="nav-cta"
            target="_blank"
            rel="noopener noreferrer"
          >
            Resume ↗
          </a>
          <button
            type="button"
            className="command-trigger"
            aria-label="Open quick navigation"
            onClick={() => window.dispatchEvent(new Event("open-command-palette"))}
          >
            <span>Quick jump</span><kbd>Ctrl K</kbd>
          </button>
        </div>

        <button
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="primary-menu"
        >
          <span className={menuOpen ? "open" : ""}></span>
          <span className={menuOpen ? "open" : ""}></span>
          <span className={menuOpen ? "open" : ""}></span>
        </button>
      </div>
    </nav>
  );
}
