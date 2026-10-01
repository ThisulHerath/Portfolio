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
