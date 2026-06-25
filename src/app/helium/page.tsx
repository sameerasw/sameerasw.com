"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import "@/styles/article.css";
import "@/styles/articles/helium.css";

export default function HeliumBrowser() {
  const [activeSegment, setActiveSegment] = useState("intro");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // Basic item animation
    const items = document.querySelectorAll(".item") as NodeListOf<HTMLElement>;
    let i = 0;

    const animate = () => {
      if (i < items.length) {
        items[i].style.opacity = "1";
        items[i].style.transform = "translateY(0)";
        i++;
        setTimeout(animate, 150);
      }
    };

    // reset styles
    items.forEach((item) => {
      item.style.opacity = "0";
      item.style.transform = "translateY(20px)";
      if (item.id !== "logo") {
        item.style.transition =
          "opacity 0.5s ease-out, transform 0.5s ease-out, scale 0.3s ease-out";
      }
    });

    setTimeout(animate, 100);

    const handleScroll = () => {
      let currentScroll = window.scrollY || document.documentElement.scrollTop;
      setIsScrolled(currentScroll > 100);

      // depth effect
      items.forEach((item) => {
        if (item.id === "logo") return;
        const position = item.getBoundingClientRect();
        if (position.top > window.innerHeight - 10 || position.bottom < 20) {
          item.style.scale = "0.75";
        } else {
          item.style.scale = "1";
        }
      });

      // navigation dots update
      const intro = document.getElementById("intro");
      const appearance = document.getElementById("appearance");
      const extensions = document.getElementById("extensions");
      const comparison = document.getElementById("comparison");
      const resources = document.getElementById("more-links");

      const arr = [
        { id: "resources", top: resources?.offsetTop || Infinity },
        { id: "comparison", top: comparison?.offsetTop || Infinity },
        { id: "extensions", top: extensions?.offsetTop || Infinity },
        { id: "appearance", top: appearance?.offsetTop || Infinity },
        { id: "intro", top: intro?.offsetTop || 0 },
      ];

      for (const section of arr) {
        if (currentScroll >= section.top - 300) {
          setActiveSegment(section.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Navbar
        isArticle
        extraLinks={[
          { href: "#intro", id: "intro-nav", icon: "home", caption: "Intro", ariaLabel: "Introduction" },
          { href: "#appearance", id: "appearance-nav", icon: "palette", caption: "Appearance", ariaLabel: "Appearance Settings" },
          { href: "#extensions", id: "extensions-nav", icon: "extension", caption: "Extensions", ariaLabel: "Extensions" },
          { href: "#comparison", id: "comparison-nav", icon: "compare_arrows", caption: "Compare", ariaLabel: "Comparison" },
          { href: "#more-links", id: "resources-nav", icon: "link", caption: "Resources", ariaLabel: "Resources" },
        ]}
      />
      <div className="container article-body">
        <section id="intro">
          <div className="heading">
            <a href="#" onClick={handleScrollToTop} aria-label="Back to top">
              <div
                id="logo"
                className={`helium-logo item ${isScrolled ? "scrolled" : ""}`}
              ></div>
            </a>
            <div className="container-mini item content">
              <h1 id="title">Helium OS</h1>
              <h2 id="subtitle">Browser Setup</h2>
              <p className="item article-text">
                My setup and configuration for <b className="accent">Helium Browser</b>. 
                Helium is a fast, lightweight chromium-based browser designed for efficiency 
                and modern web technologies. Below, I list my custom settings, installed extensions, 
                and a direct comparison of what I like and miss compared to Zen Browser.
              </p>
            </div>
          </div>
        </section>

        <article className="page" id="appearance">
          <h2 className="item">Appearance &amp; Settings</h2>
          <p className="item article-text">
            Here are my configured appearance settings. You can copy the URLs to quickly 
            navigate to these settings inside Helium Browser.
          </p>
          <ul className="helium-article trouble-list">
            <li className="item">
              <strong>Vertical Tabs</strong>
              <p className="article-text">
                Keep the browser layout clean and organized with vertical tab management.
                <br />
                <code className="accent">helium://settings/?search=browser+layout</code>
              </p>
            </li>
            <li className="item">
              <strong>Frameless Mode</strong>
              <p className="article-text">
                Enable a completely borderless browsing experience to focus entirely on the page.
                <br />
                <code className="accent">helium://settings/?search=frameless+mode</code>
              </p>
            </li>
            <li className="item">
              <strong>Shortcuts &amp; Gestures</strong>
              <p className="article-text">
                Custom mouse shortcut mapped to <kbd>⌘S</kbd> for quick saving and navigation control.
              </p>
            </li>
            <li className="item">
              <strong>Groups and Pins</strong>
              <p className="article-text">
                Organize tabs into active groups and pinned icons to preserve system resources and workspace clarity.
              </p>
              <img
                className="figure item"
                src="/assets/img/articles/helium/helium-vertical.jpeg"
                alt="Helium Groups and Pins"
              />
            </li>
            <li className="item">
              <strong>Sync with Mobile (AirSync)</strong>
              <p className="article-text">
                Easily sync notifications, history, and clipboard sharing across your macOS and Android devices using{" "}
                <Link href="/airsync"><b className="accent">AirSync</b></Link>.
              </p>
            </li>
            <li className="item">
              <strong>Search Suggestions Tuning</strong>
              <p className="article-text">
                Fine-tune address bar search suggestions to prevent distraction and preserve privacy.
              </p>
              <img
                className="figure item"
                src="/assets/img/articles/helium/helium-suggestions.jpeg"
                alt="Search suggestions tuning"
              />
            </li>
          </ul>
        </article>

        <article className="page sub" id="extensions">
          <h2 className="item">Extensions</h2>
          <p className="item article-text">
            My essential suite of extensions that power productivity, content filtering, and customization.
          </p>
          <ul className="helium-article trouble-list">
            <li className="item">
              <strong>Zen Internet</strong> — Custom companion styling extension.
            </li>
            <li className="item">
              <strong>Glance New Tab</strong> — Beautiful, productive new tab layout page.
            </li>
            <li className="item">
              <strong>Darkreader (Auto Mode)</strong> — Smart dark mode generator for all pages.
            </li>
            <li className="item">
              <strong>Proton Pass</strong> — Secure open-source password manager.
            </li>
            <li className="item">
              <strong>YouTube Enhancements</strong>
              <ul className="mini-list item">
                <li>Sponsorblock — Skip video sponsors and intros.</li>
                <li>Timestamped YouTube Comments — Navigate comments with timestamp shortcuts.</li>
                <li>YouTube Timestamps — Custom interactive progress markings.</li>
                <li>YouTube Like-Dislike Shortcut — Hotkeys for quick video ratings.</li>
              </ul>
            </li>
            <li className="item">
              <strong>Windowed - Media Player</strong> — Enables flexible picture-in-picture windowing for video players.
            </li>
          </ul>
        </article>

        <article className="page" id="comparison">
          <h2 className="item">Zen vs Helium</h2>
          <p className="item article-text">
            Here's a breakdown of my thoughts switching between Zen Browser and Helium Browser.
          </p>
          
          <div className="redirects-container">
            <div className="redirects item" style={{ textAlign: "left", cursor: "default" }}>
              <h3 className="accent" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span className="material-symbols-rounded">thumb_up</span> Things I like over Zen
              </h3>
              <ul className="comparison-list item" style={{ paddingLeft: "1.2rem", marginTop: "1rem" }}>
                <li>⚡ <strong>Performance</strong> — Extremely snappy rendering and engine response.</li>
                <li>🚫 <strong>Not Firefox</strong> — Works perfectly with sites optimized heavily for Chromium.</li>
                <li>🔋 <strong>Efficiency</strong> — Lower resource overhead and better battery utilization.</li>
                <li>🎥 <strong>YouTube Usability</strong> — Smooth playback, no stuttering, full extension support.</li>
                <li>🪶 <strong>Lightweight</strong> — Faster startup times and minimalist codebase footprint.</li>
                <li>📲 <strong>PWA Support</strong> — Installs progressive web apps natively.</li>
                <li>🔤 <strong>Better Fonts &amp; Text</strong> — Native, sharp text rendering.</li>
                <li>🌐 <strong>Modern CSS &amp; Web Standards</strong> — Bleeding edge feature support.</li>
              </ul>
            </div>

            <div className="redirects item" style={{ textAlign: "left", cursor: "default" }}>
              <h3 className="accent" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span className="material-symbols-rounded">sentiment_dissatisfied</span> Things I miss from Zen
              </h3>
              <ul className="comparison-list item" style={{ paddingLeft: "1.2rem", marginTop: "1rem" }}>
                <li>🎨 <strong>Customization</strong> — Deeply configurable layouts and visual styles.</li>
                <li>🧩 <strong>Mods &amp; CSS Tweaks</strong> — Built-in theme modifications library.</li>
                <li>🫥 <strong>Transparency</strong> — Smooth glassmorphism backing layout.</li>
                <li>🖱️ <strong>Hover Controls</strong> — Ability to disable/configure hover actions.</li>
                <li>🔗 <strong>URL Bar</strong> — More flexible and customizable address bar settings.</li>
                <li>🗂️ <strong>Workspaces &amp; Profiles</strong> — Native workspace separation.</li>
                <li>🔄 <strong>Recent Tab Switcher</strong> — Smooth keyboard tab switching layouts.</li>
                <li>⌨️ <strong>Shortcuts</strong> — Fully editable native keyboard mapping combinations.</li>
              </ul>
            </div>
          </div>
        </article>

        <article className="page sub" id="more-links">
          <h2 className="item">Resources &amp; Support</h2>
          <div className="redirects-container">
            <Link
              href="/zen"
              aria-label="Zen Browser Setup"
              className="redirects"
            >
              <span className="material-symbols-rounded">captive_portal</span>
              <p>Zen Browser Setup</p>
            </Link>
            <Link
              href="/#contact"
              aria-label="Contact me"
              className="redirects"
            >
              <span className="material-symbols-rounded">mail</span>
              <p>Contact me</p>
            </Link>
            <a
              href="https://github.com/sameerasw"
              aria-label="GitHub Profile"
              className="redirects"
              target="_blank"
              rel="noreferrer"
            >
              <span className="material-symbols-rounded">code</span>
              <p>GitHub</p>
            </a>
          </div>
        </article>

        <footer>
          <div className="footer item">
            <p className="footer-text">
              Work in progress.... Last updated on
              <b className="accent"> 24th June 2026</b>
            </p>
            <br />
            <p>
              © 2026 <a href="/">Sameera Wijerathna</a>
            </p>
            <p>Made with ❤️ from Sri Lanka</p>
          </div>
        </footer>
      </div>
    </>
  );
}
