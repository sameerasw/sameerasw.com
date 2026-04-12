"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import LastFmWidget from "@/components/LastFmWidget";
import ContactWidget from "@/components/ContactWidget";

import "@/styles/index/photos-switcher.css";
import "@/styles/index/highlights.css";
import "@/styles/index/form.css";
import "@/styles/index/lastfm.css";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
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

    // reset styles first
    items.forEach((item) => {
      item.style.opacity = "0";
      item.style.transform = "translateY(20px)";
      if (item.id !== "logo") {
        item.style.transition =
          "opacity 0.5s ease-out, transform 0.5s ease-out, scale 0.3s ease-out";
      }
    });

    // small delay to let mount finish
    setTimeout(animate, 100);

    const handleScroll = () => {
      const scroll = window.scrollY;
      setIsScrolled(scroll > 100);

      items.forEach((item) => {
        if (item.id === "logo") return; // Skip logo, handled by state
        const position = item.getBoundingClientRect();
        if (position.top > window.innerHeight - 10 || position.bottom < 20) {
          item.style.scale = "0.85";
        } else {
          item.style.scale = "1";
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <section id="intro">
          <div className="heading">
            <a href="#" onClick={handleScrollToTop} aria-label="Back to top">
              <div
                id="logo"
                className={`home-logo item ${isScrolled ? "scrolled" : ""}`}
              ></div>
            </a>

            <LastFmWidget />

            <div className="container-mini">
              <h1 id="title" className="item">
                <span className="name-primary">Sameera</span><br />
                <span className="name-secondary">Wijerathna</span>
              </h1>
              <ContactWidget />
            </div>
          </div>
        </section>

        <section id="projects">
          <div className="heading item">
            <h2>Showcase</h2>
          </div>
          <div className="container">
            <div id="highlights">
              <a
                id="airsync"
                className="highlight-item item"
                href="/airsync"
                data-title="/assets/img/articles/airsync/airsync-preview.jpeg"
              >
                <div className="highlight-content">
                  <h3>AirSync</h3>
                  <p className="highlight-description">
                    macOS + Android forbidden continuity
                  </p>
                </div>
              </a>
              <a
                id="essentials"
                className="highlight-item item"
                href="https://github.com/sameerasw/essentials"
                data-title="/assets/img/articles/essentials-preview.jpeg"
              >
                <div className="highlight-content">
                  <h3>Essentials</h3>
                  <p className="highlight-description">
                    Tools for Android nerds
                  </p>
                </div>
              </a>
              <a
                id="zen-t"
                className="highlight-item item"
                href="/zen"
                data-title="/assets/img/articles/zen-t-preview.jpeg"
              >
                <div className="highlight-content">
                  <h3>ZenZero</h3>
                  <p className="highlight-description">
                    Transparent minimal Zen Browser setup
                  </p>
                </div>
              </a>
              <a
                id="edc"
                className="highlight-item item"
                href="/edc-setup"
                data-title="/assets/img/articles/edc-preview.jpeg"
              >
                <div className="highlight-content">
                  <h3>My Every Day Carry</h3>
                  <p className="highlight-description">
                    Essentials I carry daily
                  </p>
                </div>
              </a>
              <a
                id="macos"
                className="highlight-item item"
                href="/macos"
                data-title="/assets/img/articles/macos/web-preview-macos.jpeg"
              >
                <div className="highlight-content">
                  <h3>My MacBook Setup</h3>
                  <p className="highlight-description">What's on my mac?</p>
                </div>
              </a>
              <a
                id="canvas"
                className="highlight-item item"
                href="https://github.com/sameerasw/Canvas"
                data-title="/assets/img/articles/canvas-preview.jpeg"
              >
                <div className="highlight-content">
                  <h3>Canvas</h3>
                  <p className="highlight-description">
                    Draw on Android with a minimal Jetpack Compose app.
                  </p>
                </div>
              </a>
              <a
                id="tasks"
                className="highlight-item item"
                href="https://github.com/sameerasw/tasks"
                data-title="/assets/img/articles/tasks-preview.jpeg"
              >
                <div className="highlight-content">
                  <h3>Tasks</h3>
                  <p className="highlight-description">
                    Google tasks for macOS unofficial native app with SwiftUI.
                  </p>
                </div>
              </a>
              <a
                id="zero"
                className="highlight-item item"
                href="https://github.com/sameerasw/browser"
                data-title="/assets/img/articles/zero-preview.jpeg"
              >
                <div className="highlight-content">
                  <h3>Zero</h3>
                  <p className="highlight-description">
                    Minimal liquid glass browser with SwiftUI.
                  </p>
                </div>
              </a>
              <a
                id="pixel"
                className="highlight-item item"
                href="/pixel"
                data-title="/assets/img/articles/pixel/web-preview-pixel.jpeg"
              >
                <div className="highlight-content">
                  <h3>Pixel Notes</h3>
                  <p className="highlight-description">
                    Guide on setting up voLTE in unsupported regions
                  </p>
                </div>
              </a>
              <a
                id="watchfaces"
                className="highlight-item item"
                href="https://github.com/sameerasw/watchfaces"
                data-title="/assets/img/articles/watchfaces-preview.jpeg"
              >
                <div className="highlight-content">
                  <h3>Watchfaces</h3>
                  <p className="highlight-description">
                    Custom watchfaces for WearOS
                  </p>
                </div>
              </a>
              <a
                id="foldericons"
                className="highlight-item item"
                href="/icons/categories.html"
                data-title="/assets/img/articles/folder-icons-preview.jpeg"
              >
                <div className="highlight-content">
                  <h3>Folder Icons</h3>
                  <p className="highlight-description">
                    Custom folder icons for Windows and macOS
                  </p>
                </div>
              </a>
              <a
                id="macro"
                className="highlight-item item"
                href="https://github.com/sameerasw/REDRAGON-FIZZ-K617-macro"
                data-title="/assets/img/articles/keeb-preview.jpeg"
              >
                <div className="highlight-content">
                  <h3>Keymappings</h3>
                  <p className="highlight-description">
                    Custom keyboard macros and remapping for my REDRAGON FIZZ
                    K617
                  </p>
                </div>
              </a>
              <a
                id="tidwib"
                className="highlight-item item"
                href="https://t.me/tidwib"
                data-title="/assets/img/articles/tidwib-preview.jpeg"
              >
                <div className="highlight-content">
                  <h3>My Community</h3>
                  <p className="highlight-description">
                    Join the Telegram group
                  </p>
                </div>
              </a>
              <a
                id="more-github"
                className="highlight-item item"
                href="https://github.com/sameerasw/"
                data-title="Visit my profile"
              >
                <div className="highlight-content">
                  <h3>More on GitHub</h3>
                  <p className="highlight-description">
                    Explore all my projects
                  </p>
                </div>
              </a>
            </div>
          </div>
        </section>

        <section id="about-me">
          <div className="heading item">
            <h2>About Me</h2>
            <div id="photo"></div>
          </div>
          <div className="content">
            <p className="item" style={{ opacity: 0 }}>
              A passionate developer, designer and a student from Sri Lanka who
              is always ready to learn new things. Outside work, will be mostly
              dealing with either a customization mod for a browser, a website,
              watching F1.
            </p>
            <table className="details">
              <tbody>
                <tr className="item" style={{ opacity: 0 }}>
                  <td>
                    <b className="accent">Name</b>
                  </td>
                  <td>Sameera Wijerathna</td>
                </tr>
                <tr className="item" style={{ opacity: 0 }}>
                  <td>
                    <b className="accent">Age</b>
                  </td>
                  <td>24</td>
                </tr>
                <tr className="item" style={{ opacity: 0 }}>
                  <td>
                    <b className="accent">Location</b>
                  </td>
                  <td>Balangoda/ Colombo, Sri Lanka</td>
                </tr>
                <tr className="item" style={{ opacity: 0 }}>
                  <td>
                    <b className="accent">Education</b>
                  </td>
                  <td>Undergraduate at University of Westminster via IIT</td>
                </tr>
                <tr className="item" style={{ opacity: 0 }}>
                  <td>
                    <b className="accent">Work</b>
                  </td>
                  <td>Trainee Associate UI Engineer at Zone24x7 Pvt. LTD</td>
                </tr>
              </tbody>
            </table>
            <div className="skills">
              <a
                href="https://github.com/sameerasw"
                aria-label="Sameera's github link"
              >
                <img
                  className="item"
                  style={{ opacity: 0 }}
                  src="https://skillicons.dev/icons?i=swift,kotlin,html,css,js,ts,react,mui,figma,apple&theme=light&perline=10"
                  alt="My skills"
                />
              </a>
              <a
                href="https://github.com/sameerasw"
                className="github"
                aria-label="Sameera's github link"
              >
                <img
                  src="https://github-readme-stats.vercel.app/api?username=sameerasw&show_icons=true&count_private=true&border_radius=20"
                  alt="sameerasw's github stats"
                  className="stats item"
                  style={{ opacity: 0 }}
                />
              </a>
            </div>
          </div>
        </section>

        <section id="contact">
          <div className="heading item" style={{ opacity: 0 }}>
            <h2>Contact</h2>
          </div>
          <div className="content">
            <p className="item" style={{ opacity: 0 }}>
              If you have any questions or want to work with me, feel free to
              contact me via email or any of my social media profiles.
            </p>
            <div id="contact-form">
              <form name="contact" method="POST">
                <input type="hidden" name="form-name" value="contact" />
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Name"
                  required
                  className="hover-state item"
                  style={{ opacity: 0 }}
                />
                <input
                  type="email"
                  name="_replyto"
                  id="email"
                  placeholder="Email"
                  required
                  className="hover-state item"
                  style={{ opacity: 0 }}
                />
                <textarea
                  name="message"
                  id="message"
                  placeholder="Message"
                  required
                  className="hover-state item"
                  style={{ opacity: 0 }}
                ></textarea>
                <input
                  type="submit"
                  value="Send"
                  id="btn"
                  className="hover-state item"
                  style={{ opacity: 0 }}
                />
              </form>
              <div>
                <a
                  href="/assets/resume.pdf"
                  target="_blank"
                  id="resume"
                  aria-label="Download my resume"
                >
                  <div className="button-view item" style={{ opacity: 0 }}>
                    View My Resume
                  </div>
                </a>
              </div>
            </div>
            <div
              id="email-btn"
              className="item button-view"
              style={{ opacity: 0 }}
            >
              <a href="mailto:mail@sameerasw.com" aria-label="Email me">
                <span className="material-symbols-rounded">email</span>
                <span className="caption">Business? Send an email</span>
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
