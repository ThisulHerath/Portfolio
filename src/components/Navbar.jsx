import { useState, useEffect } from "react";
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
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handler = () => {
      setScrolled(window.scrollY > 50);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
    };
    handler();
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`} aria-label="Primary navigation">
      <div className="scroll-progress" style={{ width: `${progress}%` }} aria-hidden="true" />
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
