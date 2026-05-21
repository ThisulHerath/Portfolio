import { useState } from "react";
import { useReveal } from "../hooks/useReveal";
import "./Projects.css";

const projects = [
  {
    id: "safari",
    emoji: "🦁",
    title: "Wildlife Safari Trip Management System",
    subtitle: "Full-Stack Web Application",
    stack: ["Java", "Spring Boot", "MySQL", "Bootstrap", "JSP"],
    color: "#f6ad55",
    year: "2025",
    highlights: [
      "Multi-Role RBAC for 6 stakeholder types",
      "Automated vehicle & guide scheduling engine",
      "Transactional finance & invoice module",
      "Async customer feedback reporting system",
    ],
    desc: "A collaborative web platform that digitalizes end-to-end wildlife safari operations. Centralizes trip bookings, automates resource allocation, and provides real-time financial tracking — eliminating manual coordination errors.",
    arch: "Java Spring Boot (MVC, RESTful APIs, Hibernate/JPA) • MySQL • Bootstrap • JSP • Maven • Git",
    badge: "Group Project",
  },
  {
    id: "retail",
    emoji: "🛒",
    title: "7 Super City: Intelligent Retail & Forecasting Platform",
    subtitle: "Full-Stack Engine + AI Microservice",
    stack: ["Node.js", "React", "Supabase", "Python", "Scikit-Learn", "JWT"],
    color: "var(--accent)",
    year: "2026",
    highlights: [
      "Dual-engine: Express.js API + Python ML microservice",
      "RBAC across 4 portals using JWT + Bcrypt",
      "Supabase (PostgreSQL) with Row-Level Security (15+ tables)",
      "AI sales forecasting with Scikit-Learn time-series models",
    ],
    desc: "An enterprise-grade retail ecosystem combining POS, real-time inventory, customer loyalty analytics, and predictive sales forecasting. A dual-engine architecture that separates transactional and ML workloads for performance.",
    arch: "React (Vite) • Tailwind CSS • Node.js / Express.js • Supabase (PostgreSQL) • Python / Scikit-Learn • Jest • Git",
    badge: "Featured",
  },
  {
    id: "nlp",
    emoji: "🤖",
    title: "Automated NLP Text Preprocessing & Classification Pipeline",
    subtitle: "Machine Learning Engineering",
    stack: ["Python", "Scikit-Learn", "NLTK", "Imbalanced-Learn", "Jupyter"],
    color: "var(--accent2)",
    year: "2025",
    highlights: [
      "End-to-end NLP pipeline from raw text to trained model",
      "TF-IDF vectorization + PCA dimensionality reduction",
      "RandomOverSampler for class imbalance mitigation",
      "GridSearchCV hyperparameter tuning + SVM / LinearSVC",
    ],
    desc: "A production-like ML pipeline that ingests raw unstructured text and outputs high-performing classification models. Implements a strict sequence of preprocessing, feature extraction, dimensionality reduction, and model optimization.",
    arch: "Python 3 • NumPy / Pandas • Scikit-Learn • NLTK • Imbalanced-Learn • Jupyter Notebook",
    badge: "ML / AI",
  },
  {
    id: "bookstore",
    emoji: "📚",
    title: "Online Bookstore Management System (OBMS)",
    subtitle: "Full-Stack Web App with Custom Data Structures",
    stack: ["Java", "Spring Boot", "JavaScript", "Linked Lists", "QuickSort"],
    color: "var(--accent3)",
    year: "2025",
    highlights: [
      "Custom Linked List data structure for data storage",
      "In-memory QuickSort for multi-criteria inventory sorting",
      "6 core modules: Author, Book, Cart, Order, Review, User",
      "MVC architecture with JSON file I/O",
    ],
    desc: "A first-year OOP module project showcasing core CS fundamentals — custom data structures and algorithmic thinking alongside a real enterprise MVC application built in Java Spring Boot.",
    arch: "Java Spring Boot (MVC) • JavaScript ES6+ • Custom Linked Lists • Quick Sort • JSON Storage • Gradle • Git",
    badge: "OOP / CS",
  },
  {
    id: "univault",
    emoji: "📱",
    title: "UniVault: Academic Collaborative Resource Platform",
    subtitle: "Full-Stack Mobile App | React Native (Expo), TypeScript, Node.js, MongoDB",
    stack: ["React Native", "Expo", "TypeScript", "Node.js", "MongoDB", "Cloudinary"],
    color: "#a78bfa",
    year: "2026",
    highlights: [
      "Cross-platform mobile frontend with Expo Router (file-based navigation)",
      "Multi-format upload pipeline (PDFs, images, docs) via Multer to Cloudinary CDN",
      "7-model MongoDB database with compound text indexing & schema hooks",
      "Secure JWT auth with Context API sync & global error-handling middlewares",
    ],
    desc: "A decentralized, trusted academic repository where students securely upload multi-format study documents, organize private/public collections, trigger community requests, and spin up subject-specific collaborative study groups.",
    arch: "React Native • Expo & Expo Router • TypeScript • Axios (Auth Interceptors) • React Context API • Node.js / Express.js • MongoDB + Mongoose • Cloudinary • ESLint • Prettier • Postman • EAS Build",
    badge: "Mobile / Full-Stack",
  },
];

export default function Projects() {
  const [active, setActive] = useState(null);
  const ref = useReveal();

  return (
    <section id="projects" className="projects" ref={ref}>
      <div className="orb" style={{ width: 600, height: 600, background: "rgba(104,211,145,0.04)", bottom: "-10%", left: "-10%", position: "absolute", filter: "blur(120px)" }} />

      <div className="projects-inner">
        <div className="section-header reveal">
          <span className="tag">// projects</span>
          <h2 className="section-title">Things I've <span className="gradient-text">Built</span></h2>
        </div>

        <div className="projects-grid">
          {projects.map((p, i) => (
            <div
              key={p.id}
              className={`project-card ${active === p.id ? "expanded" : ""}`}
              style={{ "--card-color": p.color }}
            >
              <div className="card-top">
                <div className="card-meta">
                  <span className="card-emoji">{p.emoji}</span>
                  <div>
                    <span className="card-badge" style={{ color: p.color, borderColor: p.color + "40" }}>{p.badge}</span>
                    <span className="card-year">{p.year}</span>
                  </div>
                </div>
                <h3 className="card-title">{p.title}</h3>
                <p className="card-subtitle">{p.subtitle}</p>
              </div>

              <div className="card-stack">
                {p.stack.map((s) => (
                  <span key={s} className="stack-chip">{s}</span>
                ))}
              </div>

              <p className="card-desc">{p.desc}</p>

              <div className={`card-expanded-content ${active === p.id ? "show" : ""}`}>
                <div className="highlights">
                  <p className="hl-label">Key Highlights</p>
                  {p.highlights.map((h, j) => (
                    <div key={j} className="hl-item">
                      <span className="hl-dot" style={{ background: p.color }} />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
                <div className="arch-block">
                  <p className="hl-label">Tech Stack</p>
                  <p className="arch-text">{p.arch}</p>
                </div>
              </div>

              <button
                className="card-toggle"
                style={{ color: p.color }}
                onClick={() => setActive(active === p.id ? null : p.id)}
              >
                {active === p.id ? "Show less ↑" : "View details ↓"}
              </button>

              <div className="card-accent-line" style={{ background: p.color }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
