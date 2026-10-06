"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface NavLink {
  href: string;
  id: string;
  icon: string;
  caption: string;
  ariaLabel: string;
}

interface NavbarProps {
  isArticle?: boolean;
  extraLinks?: NavLink[];
  backHref?: string;
}

export default function Navbar({ isArticle = false, extraLinks = [], backHref = "/" }: NavbarProps) {
  const [isMini, setIsMini] = useState(false);
  const [activeSegment, setActiveSegment] = useState("home");
  const linkKey = extraLinks.map((l) => l.href).join("|");

  useEffect(() => {
    let lastScrollTop = Math.max(window.scrollY, 0);
    let anchor = lastScrollTop;
    let direction = 0;
    const THRESHOLD = 48;

    const handleScroll = () => {
      const current = Math.max(window.scrollY || document.documentElement.scrollTop, 0);
      if (current <= 50) {
        setIsMini(false);
        anchor = current;
        direction = 0;
        lastScrollTop = current;
        return;
      }
      const dir = Math.sign(current - lastScrollTop);
      if (dir !== 0 && dir !== direction) {
        direction = dir;
        anchor = lastScrollTop;
      }
      lastScrollTop = current;
      if (direction > 0 && current - anchor > THRESHOLD) setIsMini(true);
      else if (direction < 0 && anchor - current > THRESHOLD) setIsMini(false);
    };

    const idsToObserve = isArticle
      ? extraLinks.map((l) => l.href.replace("#", ""))
      : ["intro", "updates", "projects", "about-me", "contact"];

    const updateActive = () => {
      const line = window.innerHeight * 0.35;
      let current = idsToObserve[0];
      idsToObserve.forEach((id) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      });
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      if (atBottom) current = idsToObserve[idsToObserve.length - 1];
      setActiveSegment(current);
    };

    let raf = 0;
    const onScroll = () => {
      handleScroll();
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(updateActive);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    updateActive();

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [isArticle, linkKey]);

  const renderLink = (link: NavLink | any, isNextLink = false) => {
    const Component = isNextLink ? Link : "a";
    const segmentId = link.href.replace("#", "");
    
    return (
      <li key={link.id}>
        <Component
          href={link.href}
          id={link.id}
          className={activeSegment === segmentId ? "active" : ""}
          aria-label={link.ariaLabel}
        >
          <span className="material-symbols-rounded">{link.icon}</span>
          <span className="caption">{link.caption}</span>
        </Component>
      </li>
    );
  };

  const sectionIds = isArticle
    ? extraLinks.map((l) => l.href.replace("#", ""))
    : ["intro", "updates", "projects", "about-me", "contact"];
  const sectionIndex = sectionIds.indexOf(activeSegment);
  const activeIndex = sectionIndex < 0 ? -1 : sectionIndex + (isArticle ? 1 : 0);

  return (
    <nav
      id="nav"
      className={isMini ? "mini" : ""}
      style={{ "--i": activeIndex } as React.CSSProperties}
    >
      <span className={`nav-indicator${activeIndex < 0 ? " hidden" : ""}`} aria-hidden="true" />
      <ul>
        {isArticle ? (
          <>
            <li>
              <Link href={backHref} id="home-nav" aria-label="Back">
                <span className="material-symbols-rounded">arrow_back</span>
                <span className="caption">Back</span>
              </Link>
            </li>
            {extraLinks.map((link) => renderLink(link))}
          </>
        ) : (
          <>
            <li>
              <a href="#" id="home-nav" className={activeSegment === "intro" ? "active" : ""} aria-label="Home">
                <span className="material-symbols-rounded">home</span>
                <span className="caption">Home</span>
              </a>
            </li>
            <li key="updates-nav">
              <a href="#updates" id="updates-nav" className={activeSegment === "updates" ? "active" : ""} aria-label="Updates">
                <span className="material-symbols-rounded">inbox</span>
                <span className="caption">Updates</span>
              </a>
            </li>
            <li key="projects-nav">
              <a href="#projects" id="projects-nav" className={activeSegment === "projects" ? "active" : ""} aria-label="Projects">
                <span className="material-symbols-rounded">data_object</span>
                <span className="caption">Projects</span>
              </a>
            </li>
            <li key="about-nav">
              <a href="#about-me" id="about-nav" className={activeSegment === "about-me" ? "active" : ""} aria-label="About">
                <span className="material-symbols-rounded">face</span>
                <span className="caption">About</span>
              </a>
            </li>
            <li key="contact-nav">
              <a href="#contact" id="contact-nav" className={activeSegment === "contact" ? "active" : ""} aria-label="Contact">
                <span className="material-symbols-rounded">chat_bubble</span>
                <span className="caption">Contact</span>
              </a>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
