import { useReveal } from "../hooks/useReveal";
import "./About.css";

const timeline = [
  { year: "2024", title: "Started BSc IT (AI)", org: "SLIIT", desc: "Began specializing in Artificial Intelligence and Machine Learning" },
  { year: "2025", title: "Wildlife Safari Trip Management System", org: "Group Project", desc: "Led backend development for a full-stack Java Spring Boot application" },
  { year: "2025", title: "Online Bookstore Management System (OBMS)", org: "Academic Project", desc: "Developed comprehensive e-commerce platform with inventory and payment integration" },
  { year: "2025", title: "Automated NLP Text Preprocessing & Classification Pipeline", org: "ML Project", desc: "Built end-to-end NLP pipeline for text classification using deep learning models" },
  { year: "2026", title: "7 Super City: Intelligent Retail & Forecasting Platform", org: "Industry Project", desc: "Architected dual-engine system combining ML forecasting with retail analytics" },
  { year: "2026", title: "Seeking Internship", org: "Open to Opportunities", desc: "Actively looking for AI / ML / Full-Stack engineering roles" },
];

export default function About() {
  const ref = useReveal();

  return (
    <section id="about" className="about" ref={ref}>
      <div className="orb" style={{ width: 400, height: 400, background: "rgba(159,122,234,0.06)", top: "20%", left: "-10%", position: "absolute", filter: "blur(100px)" }} />

      <div className="about-inner">
        <div className="section-header reveal">
          <span className="tag">// about me</span>
          <h2 className="section-title">Shaping the Future<br /><span className="gradient-text">with Intelligence</span></h2>
        </div>

        <div className="about-grid">
          <div className="about-text reveal-left">
            <p>
              I'm an undergraduate at <strong>SLIIT</strong> specializing in{" "}
              <strong>Artificial Intelligence</strong>, with hands-on experience building
              real-world software across full-stack web, mobile, and machine learning projects.
            </p>
            <p>
              I have built enterprise-style platforms like a wildlife safari management
              system and an intelligent retail ecosystem with forecasting, alongside a
              React Native academic collaboration app and an NLP classification pipeline.
              My focus is on clean architecture, secure authentication, and scalable backend logic.
            </p>
            <p>
              I enjoy turning complex ideas into reliable products that deliver practical
              value. I'm currently preparing to contribute as an intern in{" "}
              <strong>AI/ML or Full-Stack Engineering</strong> roles.
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
