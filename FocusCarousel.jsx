import { useState } from "react";

const slides = [
  { title: "Deep Work", text: "Focus on one task at a time. Pomodoro 25 minutes, then 5 minutes break.", color: "#eef2ff" },
  { title: "Plan Your Day", text: "Write 3 most important tasks in morning. Everything else is bonus.", color: "#ecfdf5" },
  { title: "Review at Night", text: "Check what you completed. Learn from mistakes and plan tomorrow.", color: "#fff7ed" },
];

export default function FocusCarousel() {
  const [index, setIndex] = useState(0);

  const prev = () => setIndex((prevIndex) => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1));
  const next = () => setIndex((prevIndex) => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1));

  return (
    <div className="carousel" style={{ background: slides[index].color }}>
      <button onClick={prev} className="carousel-btn">‹</button>
      <div className="carousel-content">
        <h3>{slides[index].title}</h3>
        <p>{slides[index].text}</p>
        <div className="dots">
          {slides.map((_, i) => (
            <span key={i} className={i === index ? "dot active" : "dot"} onClick={() => setIndex(i)}></span>
          ))}
        </div>
      </div>
      <button onClick={next} className="carousel-btn">›</button>
    </div>
  );
}
