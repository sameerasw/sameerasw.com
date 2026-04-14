"use client";

import { useState, useRef, useEffect } from "react";

const SCREENSHOTS = [
  "/assets/img/articles/essentials/essentials-screenshot1 Large.jpeg",
  "/assets/img/articles/essentials/essentials-screenshot2 Large.jpeg",
  "/assets/img/articles/essentials/essentials-screenshot3 Large.jpeg",
  "/assets/img/articles/essentials/essentials-screenshot4 Large.jpeg",
  "/assets/img/articles/essentials/essentials-screenshot5 Large.jpeg",
  "/assets/img/articles/essentials/essentials-screenshot6 Large.jpeg",
  "/assets/img/articles/essentials/essentials-screenshot7 Large.jpeg",
  "/assets/img/articles/essentials/essentials-screenshot8 Large.jpeg",
  "/assets/img/articles/essentials/essentials-screenshot9 Large.jpeg",
  "/assets/img/articles/essentials/essentials-screenshot10 Large.jpeg",
  "/assets/img/articles/essentials/essentials-screenshot11 Large.jpeg",
  "/assets/img/articles/essentials/essentials-screenshot12 Large.jpeg",
  "/assets/img/articles/essentials/essentials-screenshot13 Large.jpeg",
];

export default function ScreenshotsCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [visibleIndices, setVisibleIndices] = useState<Set<number>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            setTimeout(() => {
              setVisibleIndices((prev) => new Set(prev).add(index));
            }, (index % 10) * 80); // Stagger
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = document.querySelectorAll(".es-screenshot-card");
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="es-screenshots-wrapper es-observe">
      <div className="es-wrap">
        <span className="es-section-label">
          <span className="material-symbols-rounded">screenshot_region</span>
          Showcase
        </span>
        <p className="es-section-desc">
          A glimpse into some of the the Essentials.
        </p>
      </div>

      <div className="es-screenshots-container">
        <div className="es-nav-btns">
          <button 
            className="es-nav-btn prev" 
            onClick={() => scroll("left")}
            aria-label="Previous"
          >
            <span className="material-symbols-rounded">chevron_left</span>
          </button>
          <button 
            className="es-nav-btn next" 
            onClick={() => scroll("right")}
            aria-label="Next"
          >
            <span className="material-symbols-rounded">chevron_right</span>
          </button>
        </div>

        <div className="es-screenshots-scroll no-scrollbar" ref={scrollRef}>
          {SCREENSHOTS.map((src, index) => (
            <div
              key={src}
              className={`es-screenshot-card ${visibleIndices.has(index) ? "revealed" : ""}`}
              data-index={index}
            >
              <div className="es-screenshot-inner">
                <img 
                  src={src} 
                  alt={`Essentials Screenshot ${SCREENSHOTS.length - index}`} 
                  className="es-screenshot-img"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
