import { useReveal } from "../hooks/useReveal";
import "./About.css";

const timeline = [
  { year: "2024", title: "Started BSc IT (AI)", org: "SLIIT", desc: "Began specializing in artificial intelligence, machine learning, and software engineering." },
  { year: "2025", title: "Built an NLP Classification Pipeline", org: "Machine Learning", desc: "Applied text preprocessing, TF-IDF, imbalance handling, model tuning, and evaluation to toxic-comment classification." },
  { year: "2026", title: "Moved Models Toward Production", org: "MLOps", desc: "Built a churn prediction service with FastAPI, MLflow, Docker, automated tests, and CI/CD publishing." },
  { year: "Now", title: "Seeking an AI / ML Internship", org: "Open to Opportunities", desc: "Looking to contribute to applied AI, ML engineering, MLOps, or software teams building intelligent products." },
];

export default function About() {
  const ref = useReveal();

  return (
    <section id="about" className="about" ref={ref}>
      <div className="orb" style={{ width: 400, height: 400, background: "rgba(159,122,234,0.06)", top: "20%", left: "-10%", position: "absolute", filter: "blur(100px)" }} />

      <div className="about-inner">
        <div className="section-header reveal">
          <span className="tag">// about me</span>
          <h2 className="section-title">From Experiments to<br /><span className="gradient-text">Useful AI Systems</span></h2>
        </div>

        <div className="about-grid">
          <div className="about-text reveal-left">
            <p>
              I'm an <strong>Artificial Intelligence undergraduate at SLIIT</strong> interested in
              the full journey from data and experimentation to dependable software people can use.
            </p>
            <p>
              My work includes an MLOps-ready churn service, an NLP classification pipeline,
              retail sales forecasting, computer-vision emotion detection, and an agentic
              solar-planning platform. I enjoy connecting models to APIs, interfaces,
              automated delivery pipelines, and well-structured application code.
            </p>
            <p>
              I'm currently looking for an internship where I can contribute to{" "}
              <strong>AI engineering, machine learning, MLOps, or software engineering</strong>
              while learning from an experienced product team.
            </p>

            <div className="about-links reveal delay-2">
              <a href="https://github.com/ThisulHerath" target="_blank" rel="noopener noreferrer" className="about-link">
                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
                GitHub
              </a>
              <a href="https://www.linkedin.com/in/thisul/?skipRedirect=true" target="_blank" rel="noopener noreferrer" className="about-link">
                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                LinkedIn
              </a>
              <a href="https://www.kaggle.com/thisulherath" target="_blank" rel="noopener noreferrer" className="about-link">
                <span aria-hidden="true">K</span>
                Kaggle
              </a>
            </div>
          </div>

          <div className="timeline reveal-right delay-1">
            <div className="timeline-label">
              <span className="tag">// journey</span>
            </div>
            {timeline.map((item, i) => (
              <div key={i} className={`timeline-item reveal delay-${i + 1}`}>
                <div className="tl-left">
                  <span className="tl-year">{item.year}</span>
                  <div className="tl-line" />
                </div>
                <div className="tl-right">
                  <div className="tl-dot" />
                  <h4 className="tl-title">{item.title}</h4>
                  <span className="tl-org">{item.org}</span>
                  <p className="tl-desc">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
