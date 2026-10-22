import { useEffect, useState } from "react";
import "./IntroSequence.css";

export default function IntroSequence() {
  const [visible, setVisible] = useState(() => {
    if (typeof window === "undefined") return true;
    return window.sessionStorage.getItem("portfolio-intro-seen") !== "true";
  });
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (!visible) return undefined;

    document.body.classList.add("intro-locked");
    const leaveTimer = window.setTimeout(() => setLeaving(true), 1750);
    const closeTimer = window.setTimeout(() => {
      window.sessionStorage.setItem("portfolio-intro-seen", "true");
      document.body.classList.remove("intro-locked");
      setVisible(false);
    }, 2450);

    return () => {
      window.clearTimeout(leaveTimer);
      window.clearTimeout(closeTimer);
      document.body.classList.remove("intro-locked");
    };
  }, [visible]);

  const skip = () => {
    window.sessionStorage.setItem("portfolio-intro-seen", "true");
    document.body.classList.remove("intro-locked");
    setLeaving(true);
    window.setTimeout(() => setVisible(false), 650);
  };

  if (!visible) return null;

  return (
    <button
      type="button"
      className={`intro-sequence ${leaving ? "is-leaving" : ""}`}
      onClick={skip}
      aria-label="Skip portfolio introduction"
    >
      <span className="intro-noise" aria-hidden="true" />
      <span className="intro-orbit" aria-hidden="true">
        <i /><i /><i />
      </span>
      <span className="intro-mark">TH</span>
      <span className="intro-subtitle">AI ENGINEERING / SELECTED WORK</span>
      <span className="intro-counter" aria-hidden="true">00 — 01</span>
      <span className="intro-skip">CLICK TO ENTER</span>
    </button>
  );
}
