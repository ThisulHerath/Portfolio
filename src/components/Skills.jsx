import { useReveal } from "../hooks/useReveal";
import "./Skills.css";

const skillGroups = [
  {
    category: "AI / Machine Learning",
    icon: "🤖",
    color: "var(--accent)",
    skills: [
      { name: "Python (Scikit-Learn, NumPy, Pandas)", level: 82 },
      { name: "NLP & Text Preprocessing (NLTK)", level: 78 },
      { name: "Feature Engineering / PCA", level: 72 },
      { name: "Model Training & Evaluation", level: 80 },
    ],
  },
  {
    category: "Backend Development",
    icon: "⚙️",
    color: "var(--accent2)",
    skills: [
      { name: "Java Spring Boot (REST, MVC, JPA)", level: 85 },
      { name: "Node.js / Express.js", level: 78 },
      { name: "MySQL / PostgreSQL", level: 80 },
      { name: "REST API Design", level: 88 },
    ],
  },
  {
    category: "Frontend Development",
    icon: "🎨",
    color: "var(--accent3)",
    skills: [
      { name: "React (Vite, Context API, Hooks)", level: 82 },
      { name: "HTML5 / CSS3 / JavaScript", level: 88 },
      { name: "Tailwind CSS / Bootstrap", level: 80 },
      { name: "JSP / Responsive Design", level: 75 },
    ],
  },
  {
    category: "DevOps & Tools",
    icon: "🛠️",
    color: "#f6ad55",
    skills: [
      { name: "Git / GitHub", level: 85 },
      { name: "Maven / Gradle", level: 72 },
      { name: "Jupyter Notebook", level: 80 },
      { name: "Jest (Unit Testing)", level: 68 },
    ],
  },
];

const techBadges = [
  "Python", "Java", "Node.js", "React", "Spring Boot",
  "Scikit-Learn", "NLTK", "PostgreSQL", "MySQL", "Supabase",
  "JWT", "REST API", "Git", "Tailwind", "Vite", "Express.js"
];

export default function Skills() {
  const ref = useReveal();

  return (
    <section id="skills" className="skills" ref={ref}>
      <div className="orb" style={{ width: 500, height: 500, background: "rgba(99,179,237,0.05)", top: "30%", right: "-15%", position: "absolute", filter: "blur(120px)" }} />

      <div className="skills-inner">
        <div className="section-header reveal">
          <span className="tag">// skills & tools</span>
          <h2 className="section-title">Technical <span className="gradient-text">Arsenal</span></h2>
        </div>

        <div className="skills-grid">
          {skillGroups.map((group, gi) => (
            <div key={gi} className={`skill-card reveal delay-${gi + 1}`}>
              <div className="skill-card-header">
                <span className="skill-icon">{group.icon}</span>
                <h3 className="skill-category" style={{ color: group.color }}>{group.category}</h3>
              </div>
              <div className="skill-bars">
                {group.skills.map((skill, si) => (
                  <div key={si} className="skill-item">
                    <div className="skill-meta">
                      <span className="skill-name">{skill.name}</span>
                      <span className="skill-pct" style={{ color: group.color }}>{skill.level}%</span>
                    </div>
                    <div className="skill-track">
                      <div
                        className="skill-fill"
                        style={{
                          "--width": `${skill.level}%`,
                          "--color": group.color,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
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
