import { useState } from "react";
import { useReveal } from "../hooks/useReveal";
import "./Contact.css";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const ref = useReveal();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Replace with your actual mailto or form service
    const subject = encodeURIComponent(`Portfolio Contact from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\nFrom: ${form.name} <${form.email}>`);
    window.open(`mailto:your.email@sliit.lk?subject=${subject}&body=${body}`);
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section id="contact" className="contact" ref={ref}>
      <div className="orb" style={{ width: 500, height: 500, background: "rgba(99,179,237,0.06)", top: "20%", left: "50%", transform: "translateX(-50%)", position: "absolute", filter: "blur(120px)" }} />

      <div className="contact-inner">
        <div className="section-header reveal" style={{ textAlign: "center" }}>
          <span className="tag">// contact</span>
          <h2 className="section-title">Let's Build Something <span className="gradient-text">Together</span></h2>
          <p className="contact-subtitle">
            Currently seeking internship opportunities in AI, ML, or Full-Stack Engineering.
            <br />Open to collaborations, research, and interesting conversations.
          </p>
        </div>

        <div className="contact-grid">
          <div className="contact-info reveal-left">
            <div className="info-card">
              <div className="info-icon">📧</div>
              <div>
                <p className="info-label">Email</p>
                <a href="mailto:thisulh@gmail.com" className="info-value">thisulh@gmail.com</a>
              </div>
            </div>
            <div className="info-card">
              <div className="info-icon">🎓</div>
              <div>
                <p className="info-label">University</p>
                <p className="info-value">SLIIT — BSc IT (AI)</p>
              </div>
            </div>
            <div className="info-card">
              <div className="info-icon">📍</div>
              <div>
                <p className="info-label">Location</p>
                <p className="info-value">Sri Lanka</p>
              </div>
            </div>
            <div className="info-card">
              <div className="info-icon">📄</div>
              <div>
                <p className="info-label">Resume</p>
                <a href="/resume.pdf" download="Thisul-Herath-CV.pdf" className="info-value">Download CV</a>
              </div>
            </div>

            <div className="social-row">
              <a href="https://github.com/ThisulHerath" target="_blank" rel="noopener noreferrer" className="social-btn">
                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
                GitHub
              </a>
              <a href="https://www.linkedin.com/in/thisul/?skipRedirect=true" target="_blank" rel="noopener noreferrer" className="social-btn">
                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                LinkedIn
              </a>
            </div>
          </div>

          <form className="contact-form reveal-right" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Your name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="your@email.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                placeholder="Let's talk about an opportunity..."
                value={form.message}
                onChange={handleChange}
                rows={5}
                required
              />
            </div>
            <button type="submit" className={`submit-btn ${sent ? "sent" : ""}`}>
              {sent ? (
                <>✓ Opening mail client...</>
              ) : (
                <>
                  Send Message
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                    <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"/>
                  </svg>
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      <footer className="footer">
        <p>Designed & built by <span className="gradient-text">Thisul Herath</span></p>
        <p className="footer-sub">BSc IT (AI) Undergraduate • SLIIT • Sri Lanka</p>
      </footer>
    </section>
  );
}
