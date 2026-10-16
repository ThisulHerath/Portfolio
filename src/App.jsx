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
import "./App.css";

export default function App() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: 0 }
    );

    document.querySelectorAll("section[id]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const updatePointer = (event) => {
      document.documentElement.style.setProperty("--pointer-x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--pointer-y", `${event.clientY}px`);
    };

    window.addEventListener("pointermove", updatePointer, { passive: true });
    return () => window.removeEventListener("pointermove", updatePointer);
  }, []);

  return (
    <div className="app">
      <FloatingParticles />
      <Navbar activeSection={activeSection} />
      <CommandPalette />
      <div className="pointer-aura" aria-hidden="true" />
      <Hero />
      <About />
      <WorkflowLab />
      <Skills />
      <Projects />
      <Contact />
    </div>
  );
}
