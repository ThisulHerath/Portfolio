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
  const [objects] = useState(() => generateObjects(30));
  const mouseRef = useRef({ x: 0, y: 0 });
  const cursorRef = useRef(null);
  const ringRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const cursor = document.createElement("div");
    cursor.className = "cursor";
    const ring = document.createElement("div");
    ring.className = "cursor-ring";
    document.body.appendChild(cursor);
    document.body.appendChild(ring);
    cursorRef.current = cursor;
    ringRef.current = ring;

    let ringX = 0, ringY = 0;

    const moveCursor = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      cursor.style.left = e.clientX - 5 + "px";
      cursor.style.top = e.clientY - 5 + "px";
    };

    const animateRing = () => {
      ringX += (mouseRef.current.x - ringX - 18) * 0.12;
      ringY += (mouseRef.current.y - ringY - 18) * 0.12;
      ring.style.left = ringX + "px";
      ring.style.top = ringY + "px";
      rafRef.current = requestAnimationFrame(animateRing);
    };

    const onEnter = () => {
      cursor.style.transform = "scale(2)";
      ring.style.width = "60px";
      ring.style.height = "60px";
    };
    const onLeave = () => {
      cursor.style.transform = "scale(1)";
      ring.style.width = "36px";
      ring.style.height = "36px";
    };

    document.addEventListener("mousemove", moveCursor);
    document.querySelectorAll("a,button,[data-hover]").forEach(el => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    animateRing();

    return () => {
      document.removeEventListener("mousemove", moveCursor);
      cursor.remove();
      ring.remove();
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Canvas grid
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let W, H;

    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight * 3;
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
    <div className="particles-container">
      <canvas ref={canvasRef} className="grid-canvas" />
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
