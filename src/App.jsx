import { useEffect, useState } from "react";
import Hero from "./components/Hero";
import About from "./components/About";
import WorkflowLab from "./components/WorkflowLab";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Navbar from "./components/Navbar";
import CommandPalette from "./components/CommandPalette";
import FloatingParticles from "./components/FloatingParticles";
import IntroSequence from "./components/IntroSequence";
import KineticBand from "./components/KineticBand";
import InteractionLayer from "./components/InteractionLayer";
import "./App.css";

export default function App() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection((current) => current === entry.target.id ? current : entry.target.id);
          }
        });
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: 0 }
    );

    document.querySelectorAll("section[id]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="app" data-active-section={activeSection}>
      <IntroSequence />
      <FloatingParticles />
      <Navbar activeSection={activeSection} />
      <CommandPalette />
      <InteractionLayer activeSection={activeSection} />
      <Hero />
      <KineticBand />
      <About />
      <WorkflowLab />
      <Skills />
      <Projects />
      <Contact />
    </div>
  );
}
