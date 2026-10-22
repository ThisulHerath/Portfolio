import "./KineticBand.css";

const phrase = "AI ENGINEERING — APPLIED ML — MLOPS — SOFTWARE SYSTEMS — ";

export default function KineticBand() {
  return (
    <div className="kinetic-band" aria-label="AI engineering, applied machine learning, MLOps, and software systems">
      <div className="kinetic-track" aria-hidden="true">
        <span>{phrase}</span><span>{phrase}</span><span>{phrase}</span>
      </div>
      <div className="kinetic-caption">
        <span>THE THROUGH-LINE</span>
        <strong>FROM SIGNAL TO SYSTEM</strong>
        <span>SCROLL / EXPLORE</span>
      </div>
    </div>
  );
}
