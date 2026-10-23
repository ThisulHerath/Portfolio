import { useEffect, useRef, useState } from "react";
import "./Floatingparticles.css";

// Flying geometric shapes
const shapes = ["▲", "◆", "●", "■", "✦", "⬡", "⬢"];

function generateObjects(count) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    shape: shapes[Math.floor(Math.random() * shapes.length)],
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 14 + 8,
    opacity: Math.random() * 0.15 + 0.03,
    duration: Math.random() * 15 + 8,
    delay: Math.random() * 10,
    color: ["#63b3ed", "#9f7aea", "#68d391", "#f6ad55"][Math.floor(Math.random() * 4)],
    drift: Math.random() * 60 - 30,
    alt: Math.random() > 0.5,
  }));
}

export default function FloatingParticles() {
  const canvasRef = useRef(null);
  const [objects] = useState(() => generateObjects(10));

  // Canvas grid
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let W, H;

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = Math.round(W * ratio);
      canvas.height = Math.round(H * ratio);
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      drawGrid();
    };

    const drawGrid = () => {
      ctx.clearRect(0, 0, W, H);
      ctx.strokeStyle = "rgba(99,179,237,0.04)";
      ctx.lineWidth = 1;
      const step = 60;
      for (let x = 0; x < W; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, H);
        ctx.stroke();
      }
      for (let y = 0; y < H; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.stroke();
      }
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <div className="particles-container" aria-hidden="true">
      <canvas ref={canvasRef} className="grid-canvas" />
      <div className="aurora-field">
        <span className="aurora aurora-cyan" />
        <span className="aurora aurora-violet" />
        <span className="aurora aurora-green" />
      </div>
      <div className="signal-lanes">
        {Array.from({ length: 4 }, (_, index) => <span key={index} />)}
      </div>
      {objects.map((obj) => (
        <div
          key={obj.id}
          className={`flying-obj ${obj.alt ? "alt" : ""}`}
          style={{
            left: `${obj.x}%`,
            top: `${obj.y}%`,
            fontSize: `${obj.size}px`,
            opacity: obj.opacity,
            color: obj.color,
            animationDuration: `${obj.duration}s`,
            animationDelay: `-${obj.delay}s`,
            "--drift": `${obj.drift}px`,
          }}
        >
          {obj.shape}
        </div>
      ))}
      <div className="noise-overlay" />
    </div>
  );
}
