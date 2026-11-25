"use client";

import { useState, useRef, useEffect } from "react";

const SCREENSHOTS = [
  "/assets/img/articles/essentials/screenshots/1.jpeg",
  "/assets/img/articles/essentials/screenshots/2.jpeg",
  "/assets/img/articles/essentials/screenshots/3.jpeg",
  "/assets/img/articles/essentials/screenshots/4.jpeg",
  "/assets/img/articles/essentials/screenshots/5.jpeg",
  "/assets/img/articles/essentials/screenshots/6.jpeg",
  "/assets/img/articles/essentials/screenshots/7.jpeg",
  "/assets/img/articles/essentials/screenshots/8.jpeg",
  "/assets/img/articles/essentials/screenshots/9.jpeg",
  "/assets/img/articles/essentials/screenshots/10.jpeg",
  "/assets/img/articles/essentials/screenshots/11.jpeg",
  "/assets/img/articles/essentials/screenshots/12.jpeg",
  "/assets/img/articles/essentials/screenshots/13.jpeg",
  "/assets/img/articles/essentials/screenshots/14.jpeg",
  "/assets/img/articles/essentials/screenshots/15.jpeg",
  "/assets/img/articles/essentials/screenshots/16.jpeg",
  "/assets/img/articles/essentials/screenshots/17.jpeg",
  "/assets/img/articles/essentials/screenshots/18.jpeg",
  "/assets/img/articles/essentials/screenshots/19.jpeg",
  "/assets/img/articles/essentials/screenshots/20.jpeg",
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
