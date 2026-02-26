"use client";

import { useEffect, useState } from "react";

export default function Navbar() {
  const [isMini, setIsMini] = useState(false);
  const [activeSegment, setActiveSegment] = useState("home");

  useEffect(() => {
    let lastScrollTop = 0;
    const handleScroll = () => {
      let currentScroll = window.scrollY || document.documentElement.scrollTop;
      if (currentScroll > lastScrollTop) {
        setIsMini(true);
      } else {
        setIsMini(false);
      }
      lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;

      const intro = document.getElementById("intro");
      const projects = document.getElementById("projects");
      const about = document.getElementById("about-me");
      const contact = document.getElementById("contact");

      const projectsTop = projects ? projects.offsetTop : Infinity;
      const aboutTop = about ? about.offsetTop : Infinity;
      const contactTop = contact ? contact.offsetTop : Infinity;

      if (currentScroll < projectsTop - 400) {
        setActiveSegment("home");
      } else if (currentScroll < aboutTop - 200) {
        setActiveSegment("projects");
      } else if (currentScroll < contactTop - 400) {
        setActiveSegment("about");
      } else {
        setActiveSegment("contact");
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav id="nav" className={isMini ? "mini" : ""}>
      <ul>
        <li>
          <a
            href="#"
            id="home-nav"
            className={activeSegment === "home" ? "active" : ""}
            aria-label="Home - navigation bar"
          >
            <span className="material-symbols-rounded">home</span>
            <span className="caption">Home</span>
          </a>
        </li>
        <li>
          <a
            href="#projects"
            id="projects-nav"
            className={activeSegment === "projects" ? "active" : ""}
            aria-label="Projects - Navigation bar"
          >
            <span className="material-symbols-rounded">data_object</span>
            <span className="caption">Projects</span>
          </a>
        </li>
        <li>
          <a
            href="#about-me"
            id="about-nav"
            className={activeSegment === "about" ? "active" : ""}
            aria-label="About me - Navigation bar"
          >
            <span className="material-symbols-rounded">face</span>
            <span className="caption">About</span>
          </a>
        </li>
        <li>
          <a
            href="#contact"
            id="contact-nav"
            className={activeSegment === "contact" ? "active" : ""}
            aria-label="Contact me - Navigation bar"
          >
            <span className="material-symbols-rounded">chat_bubble</span>
            <span className="caption">Contact</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}
