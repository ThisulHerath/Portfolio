import { useEffect, useRef, useState } from "react";
import "./SeasonalLayer.css";

const LIGHTS = ["ice", "violet", "pine", "ember", "ice", "pine", "violet", "ember", "ice"];

function readStoredPreference() {
  if (typeof window === "undefined") return true;
  const stored = window.localStorage.getItem("portfolio-winter-protocol");
  return stored === null ? true : stored === "on";
}

export default function SeasonalLayer() {
  const canvasRef = useRef(null);
  const burstRef = useRef(null);
  const [enabled, setEnabled] = useState(readStoredPreference);

  const toggleWinter = (event) => {
    const willEnable = !enabled;
    setEnabled(willEnable);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !burstRef.current) return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const originX = bounds.left + bounds.width / 2;
    const originY = bounds.top + bounds.height / 2;
    const particleCount = willEnable ? 16 : 6;

    Array.from({ length: particleCount }, (_, index) => {
      const particle = document.createElement("i");
      const angle = (Math.PI * 2 * index) / particleCount + (Math.random() - 0.5) * 0.45;
      const distance = (willEnable ? 42 : 24) + Math.random() * (willEnable ? 54 : 22);
      particle.className = `winter-burst-particle ${index % 3 === 0 ? "is-star" : ""}`;
      particle.style.left = `${originX}px`;
      particle.style.top = `${originY}px`;
      particle.style.setProperty("--burst-x", `${Math.cos(angle) * distance}px`);
      particle.style.setProperty("--burst-y", `${Math.sin(angle) * distance}px`);
      particle.style.setProperty("--burst-delay", `${Math.random() * 80}ms`);
      burstRef.current.appendChild(particle);
      particle.addEventListener("animationend", () => particle.remove(), { once: true });
      return particle;
    });
  };

  useEffect(() => {
    window.localStorage.setItem("portfolio-winter-protocol", enabled ? "on" : "off");
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return undefined;

    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return undefined;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let flakes = [];
    let frame = 0;
    let previousTime = 0;
    let pointerX = -1000;
    let pointerY = -1000;

    const snowLayers = [
      { alpha: 0.28, radius: [0.45, 0.9], speed: [0.28, 0.58], drift: [0.08, 0.16] },
      { alpha: 0.52, radius: [0.85, 1.45], speed: [0.55, 0.95], drift: [0.14, 0.26] },
      { alpha: 0.82, radius: [1.35, 2.35], speed: [0.9, 1.48], drift: [0.22, 0.38] },
    ];

    const randomBetween = ([minimum, maximum]) => minimum + Math.random() * (maximum - minimum);

    const createFlake = (randomY = false) => {
      const layer = Math.floor(Math.random() * snowLayers.length);
      const settings = snowLayers[layer];

      return {
        layer,
        x: Math.random() * width,
        y: randomY ? Math.random() * height : -12 - Math.random() * height * 0.18,
        radius: randomBetween(settings.radius),
        speed: randomBetween(settings.speed),
        drift: randomBetween(settings.drift),
        phase: Math.random() * Math.PI * 2,
      };
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const ratio = Math.min(window.devicePixelRatio || 1, 1.25);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      const limitedCPU = (window.navigator.hardwareConcurrency || 8) <= 4;
      const count = width < 700 ? 26 : limitedCPU ? 46 : 64;
      flakes = Array.from({ length: count }, () => createFlake(true));
    };

    const updatePointer = (event) => {
      if (event.pointerType && event.pointerType !== "mouse") return;
      pointerX = event.clientX;
      pointerY = event.clientY;
    };

    const clearPointer = () => {
      pointerX = -1000;
      pointerY = -1000;
    };

    const draw = (time = 0) => {
      frame = window.requestAnimationFrame(draw);
      if (document.hidden || time - previousTime < 33) return;
      const delta = previousTime ? Math.min((time - previousTime) / 33, 2) : 1;
      previousTime = time;
      context.clearRect(0, 0, width, height);

      flakes.forEach((flake) => {
        const distanceX = flake.x - pointerX;
        const distanceY = flake.y - pointerY;
        const distanceSquared = distanceX * distanceX + distanceY * distanceY;

        if (distanceSquared < 19000) {
          const force = (19000 - distanceSquared) / 19000;
          flake.x += Math.sign(distanceX || 1) * force * (1.15 + flake.layer * 0.45) * delta;
        }

        flake.y += flake.speed * delta;
        flake.x += Math.sin(flake.y * 0.012 + flake.phase) * flake.drift * delta;

        if (flake.y > height + 8) Object.assign(flake, createFlake(false));
        if (flake.x < -8) flake.x = width + 8;
        if (flake.x > width + 8) flake.x = -8;

      });

      context.fillStyle = "#dff5ff";
      snowLayers.forEach((settings, layer) => {
        context.globalAlpha = settings.alpha;
        context.beginPath();
        flakes.forEach((flake) => {
          if (flake.layer !== layer) return;
          context.moveTo(flake.x + flake.radius, flake.y);
          context.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
        });
        context.fill();
      });
      context.globalAlpha = 1;
    };

    resize();
    if (reducedMotion) {
      draw(34);
      window.cancelAnimationFrame(frame);
    } else {
      frame = window.requestAnimationFrame(draw);
      window.addEventListener("pointermove", updatePointer, { passive: true });
      document.documentElement.addEventListener("pointerleave", clearPointer, { passive: true });
    }
    window.addEventListener("resize", resize, { passive: true });

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", updatePointer);
      document.documentElement.removeEventListener("pointerleave", clearPointer);
      window.removeEventListener("resize", resize);
    };
  }, [enabled]);

  return (
    <div className={`seasonal-layer ${enabled ? "is-active" : "is-paused"}`}>
      <canvas ref={canvasRef} className="seasonal-snow" aria-hidden="true" />
      <div ref={burstRef} className="winter-burst" aria-hidden="true" />

      <div className="holiday-rail" aria-hidden="true">
        <i className="holiday-wire" />
        {LIGHTS.map((color, index) => (
          <span
            key={`${color}-${index}`}
            className={`holiday-light ${color}`}
            style={{ "--light-index": index }}
          />
        ))}
      </div>

      <button
        type="button"
        className="winter-toggle"
        aria-pressed={enabled}
        aria-label={`${enabled ? "Disable" : "Enable"} winter effects`}
        onClick={toggleWinter}
      >
        <span className="winter-icon" aria-hidden="true">✦</span>
        <span className="winter-copy">
          <small>WINTER.PROTOCOL</small>
          <strong>{enabled ? "SNOW ONLINE" : "SNOW PAUSED"}</strong>
        </span>
        <i className="winter-state" aria-hidden="true" />
      </button>
    </div>
  );
}
