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

  useEffect(() => {
    let lastScrollTop = 0;

    // Scroll-based mini-nav logic
    const handleScroll = () => {
      let currentScroll = window.scrollY || document.documentElement.scrollTop;
      if (currentScroll > lastScrollTop && currentScroll > 50) {
        setIsMini(true);
      } else {
        setIsMini(false);
      }
      lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    };

    // IntersectionObserver for active segment logic
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -70% 0px", // Focus on the top-ish part of the screen
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSegment(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Elements to observe
    const idsToObserve = isArticle 
      ? extraLinks.map(l => l.href.replace("#", "")) 
      : ["intro", "updates", "projects", "about-me", "contact"];

    idsToObserve.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, [isArticle, extraLinks]);

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

  return (
    <nav id="nav" className={isMini ? "mini" : ""}>
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
