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

  useEffect(() => {
    let pointerFrame = 0;
    let pointerX = 0;
    let pointerY = 0;

    const updatePointer = (event) => {
      if (event.pointerType && event.pointerType !== "mouse") return;
      pointerX = event.clientX;
      pointerY = event.clientY;
      if (pointerFrame) return;

      pointerFrame = requestAnimationFrame(() => {
        document.documentElement.style.setProperty("--pointer-x", `${pointerX}px`);
        document.documentElement.style.setProperty("--pointer-y", `${pointerY}px`);
        pointerFrame = 0;
      });
    };

    window.addEventListener("pointermove", updatePointer, { passive: true });
    return () => {
      window.removeEventListener("pointermove", updatePointer);
      if (pointerFrame) cancelAnimationFrame(pointerFrame);
    };
  }, []);

  return (
    <div className="app">
      <IntroSequence />
      <FloatingParticles />
      <Navbar activeSection={activeSection} />
      <CommandPalette />
      <div className="pointer-aura" aria-hidden="true" />
      <InteractionLayer />
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
