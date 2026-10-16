import { useReveal } from "../hooks/useReveal";
import "./Skills.css";

const skillGroups = [
  {
    category: "Machine Learning",
    icon: "ML",
    color: "var(--accent)",
    focus: "Building reproducible pipelines from raw data through evaluation.",
    skills: ["Scikit-Learn", "Pandas", "NumPy", "Feature Engineering", "Model Evaluation"],
    evidence: "Applied in churn prediction, retail forecasting, and classification projects.",
  },
  {
    category: "NLP & Applied AI",
    icon: "NLP",
    color: "var(--accent2)",
    focus: "Exploring intelligent systems that solve practical user problems.",
    skills: ["NLTK", "TF-IDF", "LinearSVC", "OpenCV", "LangGraph"],
    evidence: "Built toxic-comment classification, emotion detection, and agent-based planning flows.",
  },
  {
    category: "MLOps & AI Services",
    icon: "OPS",
    color: "var(--accent3)",
    focus: "Turning trained models into testable and deployable services.",
    skills: ["FastAPI", "MLflow", "Docker", "GitHub Actions", "Pytest"],
    evidence: "Packaged and published a containerized churn prediction API with automated CI/CD.",
  },
  {
    category: "Software Engineering",
    icon: "SE",
    color: "#f6ad55",
    focus: "Building the APIs, interfaces, and data layers around AI products.",
    skills: ["Python", "TypeScript", "React", "Node.js", "ASP.NET Core", "Spring Boot"],
    evidence: "Worked across web, mobile, REST APIs, authentication, SQL, and NoSQL systems.",
  },
];

const techBadges = [
  "Python", "Scikit-Learn", "Pandas", "NLTK", "OpenCV", "LangGraph",
  "FastAPI", "MLflow", "Docker", "GitHub Actions", "Pytest", "React",
  "TypeScript", "Node.js", "ASP.NET Core", "Spring Boot", "PostgreSQL", "MongoDB"
];

export default function Skills() {
  const ref = useReveal();

  return (
    <section id="skills" className="skills" ref={ref}>
      <div className="orb" style={{ width: 500, height: 500, background: "rgba(99,179,237,0.05)", top: "30%", right: "-15%", position: "absolute", filter: "blur(120px)" }} />

      <div className="skills-inner">
        <div className="section-header reveal">
          <span className="tag">// skills & tools</span>
          <h2 className="section-title">What I Use to <span className="gradient-text">Build AI Products</span></h2>
        </div>

        <div className="skills-grid">
          {skillGroups.map((group, gi) => (
            <div key={gi} className={`skill-card reveal delay-${gi + 1}`} style={{ "--skill-color": group.color }}>
              <div className="skill-card-header">
                <span className="skill-icon">{group.icon}</span>
                <h3 className="skill-category" style={{ color: group.color }}>{group.category}</h3>
                <span className="skill-number">0{gi + 1}</span>
              </div>
              <p className="skill-focus">{group.focus}</p>
              <div className="skill-list" aria-label={`${group.category} tools`}>
                {group.skills.map((skill) => (
                  <span key={skill} className="skill-chip">{skill}</span>
                ))}
              </div>
              <p className="skill-evidence"><span>Evidence</span>{group.evidence}</p>
            </div>
          ))}
        </div>

        <div className="tech-cloud reveal delay-3">
          <p className="tech-cloud-label">
            <span className="tag">// tech stack</span>
          </p>
          <div className="tech-badges">
            {techBadges.map((tech, i) => (
              <span key={i} className="tech-badge" style={{ animationDelay: `${i * 0.1}s` }}>
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
