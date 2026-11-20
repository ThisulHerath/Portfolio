import { smoothScrollToSection } from "../utils/smoothScroll";
import "./MobileDock.css";

const destinations = [
  { id: "hero", label: "Home", icon: "⌂" },
  { id: "lab", label: "Lab", icon: "◇" },
  { id: "signal", label: "Map", icon: "⬡" },
  { id: "projects", label: "Work", icon: "↗" },
  { id: "contact", label: "Contact", icon: "@" },
];

function resolveActiveSection(section) {
  if (section === "about") return "hero";
  if (section === "skills") return "signal";
  return section;
}

export default function MobileDock({ activeSection }) {
  const current = resolveActiveSection(activeSection);

  return (
    <nav className="mobile-dock" aria-label="Mobile quick navigation">
      <div className="mobile-dock-signal" aria-hidden="true" />
      {destinations.map((destination) => {
        const isActive = current === destination.id;
        return (
          <button
            key={destination.id}
            type="button"
            className={isActive ? "active" : ""}
            aria-current={isActive ? "location" : undefined}
            onClick={() => smoothScrollToSection(destination.id)}
          >
            <span aria-hidden="true">{destination.icon}</span>
            <small>{destination.label}</small>
          </button>
        );
      })}
    </nav>
  );
}
