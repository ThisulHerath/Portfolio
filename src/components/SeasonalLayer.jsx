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
    const context = canvas?.getContext("2d", { alpha: true, desynchronized: true });
    if (!canvas || !context) return undefined;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const connection = window.navigator.connection;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let flakes = [];
    let frame = 0;
    let resizeFrame = 0;
    let previousTime = 0;
    let pointerX = -1000;
    let pointerY = -1000;
    let pointerActive = false;
    let running = false;

    const snowLayers = [
      { alpha: 0.28, radius: [0.45, 0.9], speed: [18, 29], drift: [3, 7] },
      { alpha: 0.52, radius: [0.85, 1.45], speed: [30, 47], drift: [7, 12] },
      { alpha: 0.82, radius: [1.35, 2.35], speed: [48, 72], drift: [11, 18] },
    ];

    const randomBetween = ([minimum, maximum]) => minimum + Math.random() * (maximum - minimum);

    const resetFlake = (flake = {}, randomY = false) => {
      const layer = Math.min(Math.floor(Math.random() * snowLayers.length), snowLayers.length - 1);
      const settings = snowLayers[layer];

      flake.layer = layer;
      flake.x = Math.random() * width;
      flake.y = randomY ? Math.random() * height : -12 - Math.random() * Math.min(height * 0.18, 120);
      flake.radius = randomBetween(settings.radius);
      flake.speed = randomBetween(settings.speed);
      flake.drift = randomBetween(settings.drift);
      flake.phase = Math.random() * Math.PI * 2;
      return flake;
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const isMobile = width < 700;
      const ratio = isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 1.25);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      const limitedCPU = (window.navigator.hardwareConcurrency || 8) <= 4;
      const economical = limitedCPU || connection?.saveData;
      const count = isMobile ? (economical ? 22 : 30) : (economical ? 46 : 64);
      flakes = Array.from({ length: count }, (_, index) => resetFlake(flakes[index], true));
    };

    const queueResize = () => {
      if (resizeFrame) return;
      resizeFrame = window.requestAnimationFrame(() => {
        resizeFrame = 0;
        resize();
      });
    };

    const updatePointer = (event) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      pointerActive = true;
    };

    const clearPointer = () => {
      pointerX = -1000;
      pointerY = -1000;
      pointerActive = false;
    };

    const paint = (time, shouldMove = true) => {
      const delta = shouldMove && previousTime ? Math.min((time - previousTime) / 1000, 0.034) : 0;
      previousTime = time;
      context.clearRect(0, 0, width, height);

      flakes.forEach((flake) => {
        if (shouldMove && pointerActive) {
          const distanceX = flake.x - pointerX;
          const distanceY = flake.y - pointerY;
          const distanceSquared = distanceX * distanceX + distanceY * distanceY;

          if (distanceSquared < 19000) {
            const force = (19000 - distanceSquared) / 19000;
            flake.x += Math.sign(distanceX || 1) * force * (36 + flake.layer * 12) * delta;
          }
        }

        flake.y += flake.speed * delta;
        flake.x += Math.sin(time * 0.00055 + flake.phase) * flake.drift * delta;

        if (flake.y > height + 8) resetFlake(flake, false);
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

    const draw = (time) => {
      if (!running) return;
      paint(time);
      frame = window.requestAnimationFrame(draw);
    };

    const stop = () => {
      running = false;
      previousTime = 0;
      window.cancelAnimationFrame(frame);
    };

    const start = () => {
      if (running || document.hidden || motionQuery.matches) return;
      running = true;
      previousTime = 0;
      frame = window.requestAnimationFrame(draw);
    };

    const updateVisibility = () => {
      if (document.hidden) stop();
      else start();
    };

    resize();
    if (motionQuery.matches) paint(0, false);
    else {
      start();
      if (pointerQuery.matches) {
      window.addEventListener("pointermove", updatePointer, { passive: true });
      document.documentElement.addEventListener("pointerleave", clearPointer, { passive: true });
      }
    }
    document.addEventListener("visibilitychange", updateVisibility);
    window.addEventListener("resize", queueResize, { passive: true });

    return () => {
      stop();
      window.cancelAnimationFrame(resizeFrame);
      window.removeEventListener("pointermove", updatePointer);
      document.documentElement.removeEventListener("pointerleave", clearPointer);
      document.removeEventListener("visibilitychange", updateVisibility);
      window.removeEventListener("resize", queueResize);
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
