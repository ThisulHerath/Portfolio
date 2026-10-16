import { useState } from "react";
import { useReveal } from "../hooks/useReveal";
import "./Projects.css";

const filters = [
  { id: "all", label: "Selected work" },
  { id: "ai", label: "AI / ML" },
  { id: "software", label: "Software engineering" },
];

const projects = [
  {
    id: "smart-solar",
    visual: "solar",
    metric: "4 cooperating services",
    category: "ai",
    featured: true,
    title: "Smart Solar Installation & Grid Compliance Platform",
    subtitle: "Agentic planning system + multi-client product",
    repo: "https://github.com/ThisulHerath/Smart-Solar-Installation-Grid-Compliance-Platform",
    stack: ["LangGraph", "FastAPI", "Python", "ASP.NET Core", "React", "Flutter"],
    color: "#f6ad55",
    year: "2026",
    highlights: [
      "Deterministic LangGraph agents for solar sizing, compliance screening, safety checks, and equipment planning",
      "Internal FastAPI AI service behind a single ASP.NET Core client-facing gateway",
      "React staff console plus Flutter workflows for homeowners and field technicians",
      "PostgreSQL persistence, JWT role controls, audit history, tests, Docker, and separate CI workflows",
    ],
    desc: "A team-built solar planning platform that connects homeowner surveys, site inspection, engineering review, pricing, and grid-compliance checks through a carefully separated AI service and product architecture.",
    badge: "Featured • AI Systems",
  },
  {
    id: "churn-service",
    visual: "churn",
    metric: "7,043 customer records",
    category: "ai",
    featured: true,
    title: "Churn Prediction Service",
    subtitle: "From model experiment to deployable API",
    repo: "https://github.com/ThisulHerath/Telco-Customer-Churn-ML",
    dockerImage: "https://hub.docker.com/repository/docker/00pizzalover00/churn-service/tags",
    dataset: "https://www.kaggle.com/datasets/blastchar/telco-customer-churn",
    stack: ["Python", "FastAPI", "Scikit-Learn", "MLflow", "Docker", "GitHub Actions"],
    color: "#38bdf8",
    year: "2026",
    highlights: [
      "End-to-end preparation, feature engineering, model training, and inference workflow",
      "FastAPI prediction service with saved feature alignment for reliable requests",
      "MLflow experiment artifacts and reproducible model metadata",
      "Automated tests, image builds, tagging, and Docker Hub publishing through GitHub Actions",
    ],
    desc: "An individual MLOps project that takes customer churn analysis beyond a notebook and packages it as a tested, containerized prediction service.",
    badge: "Featured • Individual",
  },
  {
    id: "retail",
    visual: "retail",
    metric: "Forecasting + operations",
    category: "ai",
    featured: true,
    title: "7 Super City: Retail Forecasting Platform",
    subtitle: "Operational software with ML forecasting",
    repo: "https://github.com/ThisulHerath/Web-Based-Retail-Inventory-and-Sales-Forecasting-System-with-Intelligent-Analytics-",
    stack: ["Python", "Scikit-Learn", "React", "Express", "Supabase", "Jest"],
    color: "#68d391",
    year: "2026",
    highlights: [
      "Python forecasting service integrated with a full retail application",
      "Sales analytics, stock visibility, low-stock alerts, and prediction workflows",
      "Role-based portals for operational users with JWT authentication",
      "PostgreSQL-backed inventory, customer, supplier, finance, and loyalty modules",
    ],
    desc: "A team project combining sales forecasting with the everyday workflows of a retail system, demonstrating how an ML capability fits inside a larger software product.",
    badge: "Featured • Forecasting",
  },
  {
    id: "nlp",
    visual: "nlp",
    metric: "5 evaluation metrics",
    category: "ai",
    title: "Toxic Comment Classification Pipeline",
    subtitle: "NLP preprocessing, tuning, and evaluation",
    repo: "https://github.com/ThisulHerath/Toxic-comment-detection",
    stack: ["Python", "Scikit-Learn", "NLTK", "TF-IDF", "LinearSVC"],
    color: "#a78bfa",
    year: "2025",
    highlights: [
      "Text cleaning, tokenization, stop-word handling, and TF-IDF feature extraction",
      "Class-imbalance handling with RandomOverSampler",
      "SVM and LinearSVC experiments with GridSearchCV tuning",
      "Evaluation using accuracy, precision, recall, F1, and confusion matrices",
    ],
    desc: "A notebook-based NLP pipeline that turns raw comments into evaluated classification models through a repeatable preprocessing and model-selection workflow.",
    badge: "NLP • Machine Learning",
  },
  {
    id: "emotion-detector",
    visual: "vision",
    metric: "7 emotion signals",
    category: "ai",
    title: "Facial Emotion Detector",
    subtitle: "Computer-vision inference with a web interface",
    repo: "https://github.com/ThisulHerath/EMOTION_DETECTOR",
    stack: ["Python", "FastAPI", "OpenCV", "FER", "React", "Vite"],
    color: "#fb7185",
    year: "2026",
    highlights: [
      "Image-upload workflow for facial emotion analysis",
      "FastAPI endpoint returning the dominant emotion and confidence distribution",
      "OpenCV and FER-based inference with explicit no-face handling",
      "React interface for uploading images and presenting results",
    ],
    desc: "A compact applied-AI project that connects computer-vision inference to a simple, understandable user experience.",
    badge: "Computer Vision",
  },
  {
    id: "univault",
    visual: "mobile",
    metric: "7 MongoDB models",
    category: "software",
    title: "UniVault: Academic Resource Platform",
    subtitle: "Cross-platform mobile software system",
    repo: "https://github.com/ThisulHerath/UNI-VAULT",
    stack: ["React Native", "TypeScript", "Expo", "Node.js", "MongoDB", "Cloudinary"],
    color: "#60a5fa",
    year: "2026",
    highlights: [
      "Multi-format academic resource uploads backed by Cloudinary",
      "Searchable notes, collections, reviews, requests, and study groups",
      "JWT authentication with client-side session synchronization",
      "Seven-model MongoDB data layer with indexes, hooks, and structured API flows",
    ],
    desc: "A full-stack mobile collaboration platform included to show the software-engineering foundation behind my AI work.",
    badge: "Software Engineering",
  },
];

function ProjectVisual({ type, title }) {
  if (type === "solar") {
    return (
      <div className="project-visual visual-solar" aria-label={`${title} system preview`}>
        <div className="visual-topline"><span>AGENT FLOW</span><span className="visual-live">● ACTIVE</span></div>
        <div className="solar-flow">
          <span>Survey</span><i>→</i><span>Sizing</span><i>→</i><span>Grid</span><i>→</i><span>Safety</span><i>→</i><span>Plan</span>
        </div>
        <div className="solar-pulse" aria-hidden="true"><i /><i /><i /></div>
      </div>
    );
  }

  if (type === "churn") {
    return (
      <div className="project-visual visual-churn" aria-label={`${title} model preview`}>
        <div className="visual-topline"><span>INFERENCE / CUSTOMER_7043</span><span className="visual-live">● READY</span></div>
        <div className="churn-layout">
          <div className="churn-ring"><span>0.78</span><small>CHURN RISK</small></div>
          <div className="mini-bars"><i style={{ "--h": "34%" }} /><i style={{ "--h": "52%" }} /><i style={{ "--h": "46%" }} /><i style={{ "--h": "72%" }} /><i style={{ "--h": "88%" }} /><i style={{ "--h": "62%" }} /></div>
        </div>
      </div>
    );
  }

  if (type === "retail") {
    return (
      <div className="project-visual visual-retail" aria-label={`${title} forecasting preview`}>
        <div className="visual-topline"><span>7 SUPER CITY / FORECAST</span><span>+12.4%</span></div>
        <svg viewBox="0 0 420 120" role="img" aria-label="Forecast trend visualization">
          <defs><linearGradient id="forecastFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#68d391" stopOpacity=".3"/><stop offset="1" stopColor="#68d391" stopOpacity="0"/></linearGradient></defs>
          <path className="chart-area" d="M0,100 C50,95 58,76 105,82 S170,40 210,55 S280,80 320,35 S380,22 420,12 L420,120 L0,120 Z" />
          <path className="chart-line" d="M0,100 C50,95 58,76 105,82 S170,40 210,55 S280,80 320,35 S380,22 420,12" />
        </svg>
      </div>
    );
  }

  if (type === "nlp") {
    return (
      <div className="project-visual visual-nlp" aria-label={`${title} classification preview`}>
        <div className="visual-topline"><span>TEXT CLASSIFIER</span><span>LINEAR SVC</span></div>
        <div className="nlp-message">“This comment needs moderation...”</div>
        <div className="nlp-result"><span>TOXIC</span><i><b /></i><strong>92%</strong></div>
        <div className="nlp-result secondary"><span>NEUTRAL</span><i><b /></i><strong>08%</strong></div>
      </div>
    );
  }

  if (type === "vision") {
    return (
      <div className="project-visual visual-vision" aria-label={`${title} computer vision preview`}>
        <div className="visual-topline"><span>VISION / FRAME 024</span><span className="visual-live">● FACE FOUND</span></div>
        <div className="face-map" aria-hidden="true"><i className="eye left"/><i className="eye right"/><i className="nose"/><i className="mouth"/><span className="corner c1"/><span className="corner c2"/><span className="corner c3"/><span className="corner c4"/></div>
        <div className="emotion-readout"><span>HAPPY</span><strong>86.2%</strong></div>
      </div>
    );
  }

  return (
    <div className="project-visual visual-mobile" aria-label={`${title} mobile application preview`}>
      <div className="visual-topline"><span>UNIVAULT / MOBILE</span><span>SYNCED</span></div>
      <div className="mobile-shell"><span className="mobile-notch"/><div className="mobile-card"><i>PDF</i><span>Machine Learning Notes<small>Shared resources</small></span></div><div className="mobile-card muted"><i>AI</i><span>Study Group<small>12 members</small></span></div></div>
    </div>
  );
}

export default function Projects() {
  const [active, setActive] = useState(null);
  const [filter, setFilter] = useState("all");
  const ref = useReveal();
  const visibleProjects = filter === "all" ? projects : projects.filter((project) => project.category === filter);

  const changeFilter = (nextFilter) => {
    setFilter(nextFilter);
    setActive(null);
  };

  return (
    <section id="projects" className="projects" ref={ref}>
      <div className="orb" style={{ width: 600, height: 600, background: "rgba(104,211,145,0.04)", bottom: "-10%", left: "-10%", position: "absolute", filter: "blur(120px)" }} />

      <div className="projects-inner">
        <div className="projects-heading-row reveal">
          <div className="section-header">
            <span className="tag">// selected work</span>
            <h2 className="section-title">AI First. <span className="gradient-text">Software Ready.</span></h2>
            <p className="projects-intro">Projects chosen to show how I work across data, models, APIs, delivery pipelines, and user-facing products.</p>
          </div>

          <div className="project-filters" aria-label="Filter projects">
            {filters.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`filter-btn ${filter === item.id ? "active" : ""}`}
                aria-pressed={filter === item.id}
                onClick={() => changeFilter(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="projects-grid">
          {visibleProjects.map((project, index) => {
            const expanded = active === project.id;
            const detailsId = `${project.id}-details`;

            return (
              <article
                key={project.id}
                className={`project-card ${project.featured ? "featured" : ""} ${expanded ? "expanded" : ""}`}
                style={{ "--card-color": project.color }}
              >
                <ProjectVisual type={project.visual} title={project.title} />
                <div className="card-top">
                  <div className="card-meta">
                    <span className="card-index">{String(index + 1).padStart(2, "0")}</span>
                    <div>
                      <span className="card-badge" style={{ color: project.color, borderColor: `${project.color}40` }}>{project.badge}</span>
                      <span className="card-year">{project.year}</span>
                    </div>
                  </div>
                  <h3 className="card-title">{project.title}</h3>
                  <p className="card-subtitle">{project.subtitle}</p>
                  <p className="card-metric"><span aria-hidden="true">↳</span> {project.metric}</p>
                </div>

                <div className="card-stack">
                  {project.stack.map((technology) => <span key={technology} className="stack-chip">{technology}</span>)}
                </div>

                <p className="card-desc">{project.desc}</p>

                <div id={detailsId} className="card-expanded-content" hidden={!expanded}>
                  <div className="highlights">
                    <p className="hl-label">What this demonstrates</p>
                    {project.highlights.map((highlight) => (
                      <div key={highlight} className="hl-item">
                        <span className="hl-dot" style={{ background: project.color }} />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  className="card-toggle"
                  style={{ color: project.color }}
                  aria-expanded={expanded}
                  aria-controls={detailsId}
                  onClick={() => setActive(expanded ? null : project.id)}
                >
                  {expanded ? "Show less ↑" : "View evidence ↓"}
                </button>

                <div className="card-links">
                  <a className="card-repo-link" href={project.repo} target="_blank" rel="noreferrer" style={{ color: project.color }}>GitHub repository ↗</a>
                  {project.dockerImage ? <a className="card-repo-link" href={project.dockerImage} target="_blank" rel="noreferrer" style={{ color: project.color }}>Docker image ↗</a> : null}
                  {project.dataset ? <a className="card-repo-link" href={project.dataset} target="_blank" rel="noreferrer" style={{ color: project.color }}>Dataset ↗</a> : null}
                </div>

                <div className="card-accent-line" style={{ background: project.color }} />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
