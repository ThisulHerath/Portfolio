import { useEffect, useRef, useState } from "react";
import "./Hero.css";

const roles = [
  "AI & ML Engineer",
  "Full-Stack Developer",
  "SLIIT Undergraduate",
  "Problem Solver",
];

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [charIdx, setCharIdx] = useState(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const current = roles[roleIdx];

    if (!deleting && charIdx < current.length) {
      timeoutRef.current = setTimeout(() => setCharIdx((i) => i + 1), 80);
    } else if (!deleting && charIdx === current.length) {
      timeoutRef.current = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && charIdx > 0) {
      timeoutRef.current = setTimeout(() => setCharIdx((i) => i - 1), 40);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setRoleIdx((i) => (i + 1) % roles.length);
    }

    setDisplayed(current.slice(0, charIdx));
    return () => clearTimeout(timeoutRef.current);
  }, [charIdx, deleting, roleIdx]);

  const scrollDown = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="hero">
      {/* Glowing orbs */}
      <div className="hero-orb orb1" />
      <div className="hero-orb orb2" />
      <div className="hero-orb orb3" />

      {/* Orbit rings */}
      <div className="orbit-ring ring1" />
      <div className="orbit-ring ring2" />

      <div className="hero-inner">
        <div className="hero-left">
          <div className="hero-badge">
            <span className="badge-dot" />
            Available for Internships
          </div>

          <h1 className="hero-title">
            <span className="hero-greeting">Hello, I'm</span>
            <span className="hero-name gradient-text">
              Thisul Herath
            </span>
          </h1>

          <div className="hero-role">
            <span className="role-prefix">{'>'}_</span>
            <span className="role-text">{displayed}</span>
            <span className="cursor-blink">|</span>
          </div>

          <p className="hero-desc">
            BSc (Hons) Information Technology specializing in{" "}
            <span className="highlight">Artificial Intelligence</span> at SLIIT.
            Building intelligent systems that bridge the gap between data and decisions.
          </p>

          <div className="hero-actions">
            <button
              className="btn-primary"
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            >
              View Projects
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
            <button
              className="btn-outline"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              Let's Talk
            </button>
          </div>

          <div className="hero-stats">
            <div className="stat">
              <span className="stat-num">4+</span>
              <span className="stat-label">Projects</span>
            </div>
            <div className="stat-div" />
            <div className="stat">
              <span className="stat-num">3+</span>
              <span className="stat-label">Tech Stacks</span>
            </div>
            <div className="stat-div" />
            <div className="stat">
              <span className="stat-num">AI</span>
              <span className="stat-label">Specialization</span>
            </div>
          </div>
        </div>

        <div className="hero-right">
          <div className="profile-wrap">
            <div className="profile-glow" />
            <div className="profile-border">
              <img
                src="/profile.jpeg"
                alt="Profile"
                className="profile-img"
              />
            </div>
            <div className="profile-badge badge-ml">
              <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M12 2a10 10 0 110 20A10 10 0 0112 2zm0 2a8 8 0 100 16A8 8 0 0012 4zm0 3a5 5 0 110 10A5 5 0 0112 7zm0 2a3 3 0 100 6 3 3 0 000-6z"/></svg>
              ML / AI
            </div>
            <div className="profile-badge badge-java">
              <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M8.851 18.56s-.917.534.653.714c1.902.218 2.874.187 4.969-.211 0 0 .552.346 1.321.646-4.699 2.013-10.633-.118-6.943-1.149M8.276 15.933s-1.028.761.542.924c2.032.209 3.636.227 6.413-.308 0 0 .384.389.987.602-5.679 1.661-12.007.13-7.942-1.218M13.116 11.475c1.158 1.333-.304 2.533-.304 2.533s2.939-1.518 1.589-3.418c-1.261-1.772-2.228-2.652 3.007-5.688 0-.001-8.216 2.051-4.292 6.573"/><path d="M19.33 20.504s.679.559-.747.991c-2.712.822-11.288 1.069-13.669.033-.856-.373.75-.89 1.254-.998.527-.114.828-.093.828-.093-.953-.671-6.156 1.317-2.643 1.887 9.58 1.553 17.462-.7 14.977-1.82M9.292 13.21s-4.362 1.036-1.544 1.412c1.189.159 3.561.123 5.77-.062 1.806-.152 3.618-.477 3.618-.477s-.637.272-1.098.587c-4.429 1.165-12.986.623-10.522-.568 2.082-1.006 3.776-.892 3.776-.892M17.116 17.584c4.503-2.34 2.421-4.589.968-4.285-.355.074-.515.138-.515.138s.132-.207.385-.297c2.875-1.011 5.086 2.981-.928 4.562 0-.001.07-.062.09-.118"/><path d="M14.401 0s2.494 2.494-2.365 6.33c-3.896 3.077-.888 4.832-.001 6.836-2.274-2.053-3.943-3.858-2.824-5.539 1.644-2.469 6.197-3.665 5.19-7.627"/><path d="M9.734 23.924c4.322.277 10.959-.153 11.116-2.198 0 0-.302.775-3.572 1.391-3.688.694-8.239.613-10.937.168 0-.001.553.457 3.393.639"/></svg>
              Spring Boot
            </div>
            <div className="profile-badge badge-react">
              <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><circle cx="12" cy="12" r="2.05"/><path d="M12 2.5c2.6 0 5 .7 6.9 1.8.8.5 1.6 1 2.2 1.7.6.6 1 1.4 1 2 0 .6-.4 1.4-1 2-.6.7-1.4 1.2-2.2 1.7C17 12.7 14.6 13.4 12 13.4s-5-.7-6.9-1.8c-.8-.5-1.6-1-2.2-1.7C2.3 9.3 2 8.6 2 8s.4-1.4 1-2c.6-.7 1.4-1.2 2.2-1.7C7 3.2 9.4 2.5 12 2.5z" fill="none" stroke="currentColor" strokeWidth="1.2"/></svg>
              React
            </div>
          </div>
        </div>
      </div>

      <button className="scroll-indicator" onClick={scrollDown}>
        <span>scroll</span>
        <div className="scroll-arrow">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
            <path d="M12 5v14M5 12l7 7 7-7"/>
          </svg>
        </div>
      </button>
    </section>
  );
}
