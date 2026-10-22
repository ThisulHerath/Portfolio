import { useState } from "react";
import { smoothScrollToSection } from "../utils/smoothScroll";
import "./Hero.css";

const signals = [
  { id: "models", label: "MODEL", value: "Scikit-Learn", note: "Training + evaluation" },
  { id: "systems", label: "SYSTEM", value: "FastAPI", note: "Reliable inference" },
  { id: "delivery", label: "DELIVERY", value: "Docker + CI", note: "Reproducible shipping" },
];

const tiltFrames = new WeakMap();

export default function Hero() {
  const [activeSignal, setActiveSignal] = useState(0);
  const signal = signals[activeSignal];

  const moveSystem = (event) => {
    if (event.pointerType && event.pointerType !== "mouse") return;
    const panel = event.currentTarget;
    const bounds = panel.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;
    const previousFrame = tiltFrames.get(panel);
    if (previousFrame) cancelAnimationFrame(previousFrame);

    const frame = requestAnimationFrame(() => {
      panel.style.setProperty("--tilt-x", `${(x - 0.5) * 7}deg`);
      panel.style.setProperty("--tilt-y", `${(0.5 - y) * 5}deg`);
      panel.style.setProperty("--system-x", `${x * 100}%`);
      panel.style.setProperty("--system-y", `${y * 100}%`);
      tiltFrames.delete(panel);
    });
    tiltFrames.set(panel, frame);
  };

  const resetSystem = (event) => {
    const panel = event.currentTarget;
    const previousFrame = tiltFrames.get(panel);
    if (previousFrame) cancelAnimationFrame(previousFrame);
    tiltFrames.delete(panel);
    panel.style.setProperty("--tilt-x", "-3deg");
    panel.style.setProperty("--tilt-y", "1deg");
    panel.style.setProperty("--system-x", "50%");
    panel.style.setProperty("--system-y", "50%");
  };

  return (
    <section id="hero" className="hero">
      <div className="hero-orb hero-orb-a" aria-hidden="true" />
      <div className="hero-orb hero-orb-b" aria-hidden="true" />

      <div className="hero-inner">
        <div className="hero-left">
          <div className="hero-status">
            <span className="badge-dot" />
            AVAILABLE FOR AI / ML INTERNSHIPS
            <span className="status-location">SRI LANKA · REMOTE</span>
          </div>

          <p className="hero-eyebrow">THISUL HERATH / AI ENGINEERING</p>
          <h1 className="hero-title">
            <span className="hero-title-line"><span>I build intelligence</span></span>
            <span className="hero-title-line"><span>that <em className="title-gradient">leaves <span className="keep-together">the notebook.</span></em></span></span>
          </h1>

          <p className="hero-desc">
            AI undergraduate at SLIIT working across <strong>machine learning, MLOps, and software engineering</strong>—from the first dataset to a tested API and a product people can use.
          </p>

          <div className="hero-actions">
            <button className="btn-primary" onClick={() => smoothScrollToSection("projects")}>
              Explore selected work <span aria-hidden="true">↘</span>
            </button>
            <a className="btn-outline" href="/resume.pdf" target="_blank" rel="noopener noreferrer">Resume <span aria-hidden="true">↗</span></a>
            <button className="btn-quiet" type="button" onClick={() => window.dispatchEvent(new Event("open-command-palette"))}>
              Quick jump <kbd>Ctrl K</kbd>
            </button>
          </div>

          <div className="hero-proof" aria-label="Portfolio summary">
            <div><strong>06</strong><span>Selected builds</span></div>
            <div><strong>AI → API</strong><span>End-to-end focus</span></div>
            <div><strong>2026</strong><span>Internship ready</span></div>
          </div>
        </div>

        <div
          className="hero-system"
          aria-label="Interactive AI engineering profile"
          onPointerMove={moveSystem}
          onPointerLeave={resetSystem}
        >
          <div className="system-header">
            <span>PROFILE.NODE</span>
            <span className="system-state"><i /> ONLINE</span>
          </div>

          <div className="system-canvas">
            <div className="system-grid" aria-hidden="true" />
            <div className="identity-core">
              <div className="core-rings" aria-hidden="true"><i /><i /><i /></div>
              <img src="/profile.jpeg" alt="Thisul Herath" />
              <span className="core-label">TH / 01</span>
            </div>

            {signals.map((item, index) => (
              <button
                key={item.id}
                type="button"
                className={`system-node node-${index + 1} ${activeSignal === index ? "active" : ""}`}
                onMouseEnter={() => setActiveSignal(index)}
                onFocus={() => setActiveSignal(index)}
                onClick={() => setActiveSignal(index)}
              >
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </button>
            ))}

            <div key={signal.id} className="system-readout" aria-live="polite">
              <span>{signal.label} SIGNAL</span>
              <strong>{signal.value}</strong>
              <small>{signal.note}</small>
            </div>
          </div>

          <div className="system-footer">
            <span>PYTHON</span><span>FASTAPI</span><span>MLFLOW</span><span>DOCKER</span>
          </div>
        </div>
      </div>

      <button className="scroll-indicator" onClick={() => smoothScrollToSection("about")}>
        <span>SCROLL TO EXPLORE</span><i aria-hidden="true" />
      </button>
    </section>
  );
}
