import { useEffect, useMemo, useRef, useState } from "react";
import { smoothScrollToSection } from "../utils/smoothScroll";
import "./CommandPalette.css";

const commands = [
  { label: "Go to home", hint: "Introduction", type: "section", target: "hero", icon: "⌂" },
  { label: "Explore my AI workflow", hint: "Interactive lab", type: "section", target: "lab", icon: "◇" },
  { label: "View selected projects", hint: "Case studies", type: "section", target: "projects", icon: "↗" },
  { label: "See skills and tools", hint: "Capabilities", type: "section", target: "skills", icon: "#" },
  { label: "Contact me", hint: "Internship opportunities", type: "section", target: "contact", icon: "@" },
  { label: "Open GitHub", hint: "ThisulHerath", type: "link", target: "https://github.com/ThisulHerath", icon: "GH" },
  { label: "Open LinkedIn", hint: "thisul", type: "link", target: "https://www.linkedin.com/in/thisul/", icon: "in" },
  { label: "Open resume", hint: "PDF", type: "link", target: "/resume.pdf", icon: "CV" },
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef = useRef(null);

  const filtered = useMemo(() => {
    const term = query.toLowerCase().trim();
    return term ? commands.filter((command) => `${command.label} ${command.hint}`.toLowerCase().includes(term)) : commands;
  }, [query]);

  useEffect(() => {
    const toggle = () => setOpen((value) => !value);
    const handleKey = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        toggle();
      }
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("open-command-palette", toggle);
    window.addEventListener("keydown", handleKey);
    return () => {
      window.removeEventListener("open-command-palette", toggle);
      window.removeEventListener("keydown", handleKey);
    };
  }, []);

  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  const run = (command) => {
    if (!command) return;
    if (command.type === "section") {
      smoothScrollToSection(command.target);
    } else {
      window.open(command.target, "_blank", "noopener,noreferrer");
    }
    setOpen(false);
  };

  const handleInputKey = (event) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setSelected((value) => (value + 1) % Math.max(filtered.length, 1));
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setSelected((value) => (value - 1 + Math.max(filtered.length, 1)) % Math.max(filtered.length, 1));
    }
    if (event.key === "Enter") run(filtered[selected]);
  };

  if (!open) return null;

  return (
    <div className="command-backdrop" role="presentation" onMouseDown={() => setOpen(false)}>
      <div className="command-dialog" role="dialog" aria-modal="true" aria-label="Quick navigation" onMouseDown={(event) => event.stopPropagation()}>
        <div className="command-search">
          <span aria-hidden="true">⌕</span>
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => { setQuery(event.target.value); setSelected(0); }}
            onKeyDown={handleInputKey}
            placeholder="Jump anywhere or open a profile..."
            aria-label="Search portfolio commands"
          />
          <kbd>ESC</kbd>
        </div>
        <div className="command-list" role="listbox">
          {filtered.length ? filtered.map((command, index) => (
            <button
              key={command.label}
              type="button"
              role="option"
              aria-selected={selected === index}
              className={selected === index ? "selected" : ""}
              onMouseEnter={() => setSelected(index)}
              onClick={() => run(command)}
            >
              <span className="command-icon">{command.icon}</span>
              <span><strong>{command.label}</strong><small>{command.hint}</small></span>
              <span className="command-arrow">↵</span>
            </button>
          )) : <p className="command-empty">No matching destination.</p>}
        </div>
        <div className="command-footer"><span>↑↓ navigate</span><span>↵ open</span><span>esc close</span></div>
      </div>
    </div>
  );
}
