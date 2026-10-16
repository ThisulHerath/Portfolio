import { useState } from "react";
import { useReveal } from "../hooks/useReveal";
import "./WorkflowLab.css";

const stages = [
  {
    id: "understand",
    step: "01",
    label: "Understand",
    title: "Start with the decision—not the algorithm.",
    description: "I map the user, constraints, available signals, and the decision the system needs to support before choosing a model.",
    tools: ["Problem framing", "Data audit", "Success metrics"],
    output: "A measurable ML problem with known constraints.",
    signal: "question → target",
  },
  {
    id: "learn",
    step: "02",
    label: "Learn",
    title: "Build a baseline, then earn complexity.",
    description: "I prepare features, establish a reproducible baseline, compare candidates, and evaluate failure modes—not only headline accuracy.",
    tools: ["Scikit-Learn", "NLTK", "Evaluation"],
    output: "A tested model and an honest picture of its behavior.",
    signal: "data → evidence",
  },
  {
    id: "serve",
    step: "03",
    label: "Serve",
    title: "Make intelligence usable by another system.",
    description: "I package inference behind a clear API, align incoming features, validate requests, and make failure states understandable.",
    tools: ["FastAPI", "REST", "Validation"],
    output: "A predictable interface around the model.",
    signal: "model → API",
  },
  {
    id: "ship",
    step: "04",
    label: "Ship",
    title: "Treat delivery as part of the ML system.",
    description: "I use tests, containers, experiment metadata, and automated workflows so the result can be reproduced and improved.",
    tools: ["MLflow", "Docker", "GitHub Actions"],
    output: "A versioned, testable artifact ready to run.",
    signal: "API → product",
  },
];

export default function WorkflowLab() {
  const [active, setActive] = useState(0);
  const ref = useReveal();
  const stage = stages[active];

  return (
    <section id="lab" className="workflow-lab" ref={ref}>
      <div className="lab-inner">
        <div className="lab-copy reveal-left">
          <span className="tag">// interactive workflow</span>
          <h2 className="section-title">How I Turn a Model<br />into a <span className="gradient-text">Working System</span></h2>
          <p className="lab-intro">Select a stage to explore how I approach applied AI work. This is the thread connecting my churn, NLP, forecasting, and agentic-system projects.</p>

          <div className="lab-stage-list" role="tablist" aria-label="AI engineering workflow stages">
            {stages.map((item, index) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={active === index}
                aria-controls="lab-panel"
                className={active === index ? "active" : ""}
                onClick={() => setActive(index)}
              >
                <span>{item.step}</span>
                <strong>{item.label}</strong>
                <small>{item.signal}</small>
              </button>
            ))}
          </div>
        </div>

        <div id="lab-panel" className="lab-console reveal-right" role="tabpanel">
          <div className="console-bar">
            <div className="console-dots" aria-hidden="true"><i /><i /><i /></div>
            <span>thisul://ai-workflow/{stage.id}</span>
            <span className="console-live"><i /> live</span>
          </div>

          <div className="console-stage" key={stage.id}>
            <div className="stage-signal" aria-hidden="true">
              <span>{stage.step}</span>
              <div className="signal-orbit"><i /><i /><i /></div>
            </div>
            <p className="console-kicker">CURRENT STAGE / {stage.label.toUpperCase()}</p>
            <h3>{stage.title}</h3>
            <p className="console-description">{stage.description}</p>
            <div className="console-tools">
              {stage.tools.map((tool) => <span key={tool}>{tool}</span>)}
            </div>
            <div className="console-output">
              <span>OUTPUT</span>
              <p>{stage.output}</p>
            </div>
          </div>

          <div className="workflow-track" aria-hidden="true">
            {stages.map((item, index) => (
              <span key={item.id} className={index <= active ? "complete" : ""} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
