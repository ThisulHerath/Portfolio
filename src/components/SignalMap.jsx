import { useEffect, useRef, useState } from "react";
import { useReveal } from "../hooks/useReveal";
import "./SignalMap.css";

const nodes = [
  {
    id: "data",
    code: "01",
    label: "DATA",
    title: "Shape reliable signals",
    description: "Turn raw inputs into validated, reproducible features that a model can actually trust.",
    tools: ["Pandas", "NumPy", "Validation"],
    x: 50,
    y: 13,
  },
  {
    id: "model",
    code: "02",
    label: "MODEL",
    title: "Learn with evidence",
    description: "Compare baselines, inspect failure modes, and measure behavior before adding complexity.",
    tools: ["Scikit-Learn", "Evaluation", "MLflow"],
    x: 17,
    y: 43,
  },
  {
    id: "api",
    code: "03",
    label: "API",
    title: "Expose useful intelligence",
    description: "Wrap inference in a predictable interface with clear requests, responses, and failure states.",
    tools: ["FastAPI", "REST", "Schemas"],
    x: 83,
    y: 43,
  },
  {
    id: "delivery",
    code: "04",
    label: "SHIP",
    title: "Make delivery repeatable",
    description: "Package, test, and automate the system so it can move beyond one successful local run.",
    tools: ["Docker", "Pytest", "GitHub Actions"],
    x: 29,
    y: 82,
  },
  {
    id: "product",
    code: "05",
    label: "PRODUCT",
    title: "Close the loop with people",
    description: "Connect the model to an interface where its output becomes understandable and useful.",
    tools: ["React", "TypeScript", "Product UX"],
    x: 71,
    y: 82,
  },
];

export default function SignalMap() {
  const [active, setActive] = useState(0);
  const sectionRef = useReveal();
  const visualRef = useRef(null);
  const pointerFrame = useRef(0);
  const selectedNode = nodes[active];

  useEffect(() => () => window.cancelAnimationFrame(pointerFrame.current), []);

  const moveMap = (event) => {
    if (!visualRef.current || window.matchMedia("(prefers-reduced-motion: reduce), (pointer: coarse)").matches) return;
    const bounds = visualRef.current.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;

    window.cancelAnimationFrame(pointerFrame.current);
    pointerFrame.current = window.requestAnimationFrame(() => {
      visualRef.current?.style.setProperty("--map-rotate-x", `${y * -3.5}deg`);
      visualRef.current?.style.setProperty("--map-rotate-y", `${x * 4.5}deg`);
      visualRef.current?.style.setProperty("--map-glow-x", `${50 + x * 28}%`);
      visualRef.current?.style.setProperty("--map-glow-y", `${50 + y * 28}%`);
    });
  };

  const resetMap = () => {
    visualRef.current?.style.setProperty("--map-rotate-x", "0deg");
    visualRef.current?.style.setProperty("--map-rotate-y", "0deg");
    visualRef.current?.style.setProperty("--map-glow-x", "50%");
    visualRef.current?.style.setProperty("--map-glow-y", "50%");
  };

  return (
    <section id="signal" className="signal-map" ref={sectionRef}>
      <div className="signal-map-inner">
        <div className="signal-map-copy reveal-left">
          <span className="tag">// interactive system map</span>
          <h2 className="section-title">One Pipeline.<br /><span className="gradient-text">Five Connected Signals.</span></h2>
          <p className="signal-map-intro">Explore the system as a living graph. Select a node to see how each layer supports the next—from raw data to a product someone can use.</p>

          <div className="signal-node-readout" key={selectedNode.id}>
            <div className="readout-index"><span>{selectedNode.code}</span><i /></div>
            <div>
              <p>{selectedNode.label} / ACTIVE NODE</p>
              <h3>{selectedNode.title}</h3>
              <span>{selectedNode.description}</span>
            </div>
          </div>

          <div className="signal-tool-row" aria-label={`${selectedNode.label} tools`}>
            {selectedNode.tools.map((tool) => <span key={tool}>{tool}</span>)}
          </div>
          <p className="signal-map-hint"><i /> Select any node to reroute the signal</p>
        </div>

        <div
          ref={visualRef}
          className="signal-visual reveal-right"
          onPointerMove={moveMap}
          onPointerLeave={resetMap}
          aria-label="Interactive AI system constellation"
        >
          <div className="signal-visual-frame">
            <div className="signal-grid" aria-hidden="true" />
            <div className="signal-sweep" aria-hidden="true" />

            <svg className="signal-links" viewBox="0 0 100 100" aria-hidden="true">
              <polygon points={nodes.map((node) => `${node.x},${node.y}`).join(" ")} />
              {nodes.map((node, index) => (
                <path
                  key={node.id}
                  className={active === index ? "active" : ""}
                  d={`M ${node.x} ${node.y} L 50 52`}
                  pathLength="1"
                />
              ))}
            </svg>

            <div className="signal-core" aria-hidden="true">
              <i /><i /><i />
              <span>AI</span>
              <small>CORE</small>
            </div>

            {nodes.map((node, index) => (
              <button
                key={node.id}
                type="button"
                className={`signal-node ${active === index ? "active" : ""}`}
                style={{ "--node-x": `${node.x}%`, "--node-y": `${node.y}%` }}
                aria-pressed={active === index}
                onClick={() => setActive(index)}
              >
                <span>{node.code}</span>
                <strong>{node.label}</strong>
                <i aria-hidden="true" />
              </button>
            ))}

            <div className="signal-telemetry signal-telemetry-a" aria-hidden="true"><span>LATENCY</span><strong>24ms</strong></div>
            <div className="signal-telemetry signal-telemetry-b" aria-hidden="true"><span>PIPELINE</span><strong>ONLINE</strong></div>
            <div className="signal-visual-status" aria-hidden="true"><i /> SYSTEM GRAPH / LIVE</div>
          </div>
        </div>
      </div>
    </section>
  );
}
