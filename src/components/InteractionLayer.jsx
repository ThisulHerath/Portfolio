import { useEffect, useRef } from "react";
import "./InteractionLayer.css";

export default function InteractionLayer({ activeSection }) {
  const effectsRef = useRef(null);
  const progressRef = useRef(null);
  const percentageRef = useRef(null);

  useEffect(() => {
    const root = document.documentElement;
    let scrollFrame = 0;

    const createRipple = (event) => {
      if (event.button !== 0 || !effectsRef.current) return;
      const ripple = document.createElement("span");
      ripple.className = "click-ripple";
      ripple.style.left = `${event.clientX}px`;
      ripple.style.top = `${event.clientY}px`;
      effectsRef.current.appendChild(ripple);
      ripple.addEventListener("animationend", () => ripple.remove(), { once: true });
    };

    const updateScroll = () => {
      if (scrollFrame) return;
      scrollFrame = requestAnimationFrame(() => {
        const max = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
        const progress = Math.min(Math.max(window.scrollY / max, 0), 1);
        root.style.setProperty("--page-progress", progress.toFixed(4));
        root.style.setProperty("--page-parallax", `${Math.round(progress * -130)}px`);
        root.style.setProperty("--signal-parallax", `${Math.round(progress * -46)}px`);
        progressRef.current?.style.setProperty("--hud-progress", progress);
        if (percentageRef.current) percentageRef.current.textContent = `${String(Math.round(progress * 100)).padStart(3, "0")}%`;
        scrollFrame = 0;
      });
    };
    window.addEventListener("pointerdown", createRipple, { passive: true });
    window.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("resize", updateScroll, { passive: true });
    updateScroll();

    return () => {
      window.removeEventListener("pointerdown", createRipple);
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("resize", updateScroll);
      if (scrollFrame) cancelAnimationFrame(scrollFrame);
    };
  }, []);

  return (
    <div className="interaction-layer" aria-hidden="true">
      <div ref={effectsRef} className="click-effects" />
      <div className="scroll-hud">
        <span>{activeSection.toUpperCase()}</span>
        <div ref={progressRef} className="hud-track"><i /></div>
        <strong ref={percentageRef}>000%</strong>
      </div>
      <div className="interface-stamp">
        <span>TH / INTERFACE</span>
        <i />
        <span>AI.SYS.01</span>
      </div>
    </div>
  );
}
