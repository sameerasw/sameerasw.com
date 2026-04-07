"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import "@/styles/article.css";
import "@/styles/articles/zen.css";

export default function ZenBrowser() {
  const [activeSegment, setActiveSegment] = useState("intro");
  const [slide, setSlide] = useState(0);

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
      item.style.transition =
        "opacity 0.5s ease-out, transform 0.5s ease-out, scale 0.3s ease-out";
    });

    setTimeout(animate, 100);

    const handleScroll = () => {
      let currentScroll = window.scrollY || document.documentElement.scrollTop;

      // depth effect
      items.forEach((item) => {
        const position = item.getBoundingClientRect();
        if (position.top > window.innerHeight - 10 || position.bottom < 20) {
          item.style.scale = "0.75";
        } else {
          item.style.scale = "1";
        }
      });

      const logo = document.getElementById("logo");
      if (logo && window.innerWidth < 500) {
        logo.style.opacity = String(1 - currentScroll / 200);
      }

      // navigation dots update
      const intro = document.getElementById("intro");
      const install = document.getElementById("mod-install");
      const trouble = document.getElementById("trouble");
      const features = document.getElementById("addon-features");
      const resources = document.getElementById("more-links");

      const arr = [
        { id: "resources", top: resources?.offsetTop || Infinity },
        { id: "features", top: features?.offsetTop || Infinity },
        { id: "trouble", top: trouble?.offsetTop || Infinity },
        { id: "install", top: install?.offsetTop || Infinity },
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

  const moveSlide = (dir: number) => {
    setSlide((prev) => {
      let next = prev + dir;
      if (next < 0) next = 2;
      if (next > 2) next = 0;
      return next;
    });
  };

  return (
    <>
      <nav id="nav">
        <ul>
          <li>
            <Link href="/" id="home-nav" aria-label="back to home page">
              <span className="material-symbols-rounded">arrow_back</span>
              <span className="caption">Back</span>
            </Link>
          </li>
          <li>
            <a
              href="#intro"
              id="intro-nav"
              className={activeSegment === "intro" ? "active" : ""}
              aria-label="Introduction - Navigation bar"
            >
              <span className="material-symbols-rounded">home</span>
              <span className="caption">Intro</span>
            </a>
          </li>
          <li>
            <a
              href="#mod-install"
              id="install-nav"
              className={activeSegment === "install" ? "active" : ""}
              aria-label="Installation - Navigation bar"
            >
              <span className="material-symbols-rounded">download</span>
              <span className="caption">Install</span>
            </a>
          </li>
          <li>
            <a
              href="#trouble"
              id="trouble-nav"
              className={activeSegment === "trouble" ? "active" : ""}
              aria-label="Troubleshooting - Navigation bar"
            >
              <span className="material-symbols-rounded">build</span>
              <span className="caption">Trouble</span>
            </a>
          </li>
          <li>
            <a
              href="#addon-features"
              id="features-nav"
              className={activeSegment === "features" ? "active" : ""}
              aria-label="Features - Navigation bar"
            >
              <span className="material-symbols-rounded">star</span>
              <span className="caption">Features</span>
            </a>
          </li>
          <li>
            <a
              href="#more-links"
              id="resources-nav"
              className={activeSegment === "resources" ? "active" : ""}
              aria-label="Resources - Navigation bar"
            >
              <span className="material-symbols-rounded">link</span>
              <span className="caption">Resources</span>
            </a>
          </li>
        </ul>
      </nav>

      <div className="container">
        <section id="intro">
          <div className="heading">
            <a href="#">
              <div id="logo" className="zen-logo"></div>
            </a>
            <div className="container-mini item content">
              <h1 id="title">
                <strong>Zen</strong> Zero
              </h1>
              <h2 id="subtitle">
                <strong>Zen</strong> Browser
              </h2>
              <p id="sub-text" className="item article-text">
                The most minimal a browser can be. Zen Zero is a customized{" "}
                <b className="accent">Zen browser</b> which aim to keep away the
                distractions and focus on the web and make it look pretty with
                transparency.
              </p>
            </div>
          </div>
        </section>

        <section id="article">
          <div className="carousel-container">
            <div
              id="preview-grid"
              className="carousel-slides"
              style={{
                transform: `translateX(-${slide * 100}%)`,
                transition: "transform 0.5s ease",
              }}
            >
              <div className="carousel-slide" style={{ minWidth: "100%" }}>
                <iframe
                  className="video-frame item"
                  src="https://www.youtube.com/embed/4Pjk_EsT9TE"
                  title="Zen Zero Guide Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="carousel-slide" style={{ minWidth: "100%" }}>
                <img
                  className="figure item"
                  src="/assets/img/articles/zen/notion/preview-1.jpeg"
                  alt="Zen Browser Preview 1"
                />
              </div>
              <div className="carousel-slide" style={{ minWidth: "100%" }}>
                <img
                  className="figure item"
                  src="/assets/img/articles/zen/notion/preview-2.jpeg"
                  alt="Zen Browser Preview 2"
                />
              </div>
            </div>
            <div className="carousel-controls">
              <button
                className="carousel-btn prev"
                onClick={() => moveSlide(-1)}
              >
                ❮
              </button>
              <button
                className="carousel-btn next"
                onClick={() => moveSlide(1)}
              >
                ❯
              </button>
            </div>
          </div>
        </section>

        <article className="page">
          <p className="item article-text">
            This is a guide to install the{" "}
            <b className="accent">Zen Internet Addon</b> and make your Zen
            browser transparent. This is a work in progress and I will be adding
            more features and fixes as I go. If you have any issues, please
            reach out to me on any of my social media or community groups.
          </p>
          <ol className="zen-article">
            <li>
              <h2 id="mod-install">Install the Transparent Zen mod</h2>
              <p className="item article-text">
                Install the{" "}
                <strong>
                  <a
                    href="https://zen-browser.app/mods/642854b5-88b4-4c40-b256-e035532109df/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Transparent Zen mod{" "}
                    <i className="material-symbols-rounded">open_in_new</i>
                  </a>
                </strong>{" "}
                from the mod store.
              </p>
              <a
                href="https://zen-browser.app/mods/642854b5-88b4-4c40-b256-e035532109df/"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  className="figure item"
                  src="/assets/img/articles/zen/notion/zen-mod.jpeg"
                  alt=""
                />
              </a>
            </li>
            <li>
              <h2>Go to mod settings</h2>
              <p className="item article-text">
                Once you have installed the mod, Go into Zen Browser settings{" "}
                {">"} Mods {">"} Transparent Zen and click on the{" "}
                <b className="accent">Settings</b> button.
              </p>
              <img
                className="figure item"
                src="/assets/img/articles/zen/notion/zen-settings.jpeg"
                alt=""
              />
            </li>
            <li>
              <h2 id="mod-config">Configure the mod settings</h2>
              <p className="item article-text">
                Then make sure the{" "}
                <b className="accent">Allow zen browser to be transparent</b>{" "}
                option is checked. (And if you are on Linux, you may see another
                toggle to be turned on as well). Enable other options if you
                like and then quit and{" "}
                <b className="accent">re-open the zen browser</b> to apply the
                changes.
              </p>
              <img
                className="figure item"
                src="/assets/img/articles/zen/notion/mod-settings-config.jpeg"
                alt=""
              />
            </li>
            <li>
              <h2 id="addon-install">Install Zen Internet Addon</h2>
              <p className="item article-text">
                Go to the firefox addons page and install the{" "}
                <strong>
                  <a
                    href="https://addons.mozilla.org/en-US/firefox/addon/zen-internet/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {" "}
                    Zen Internet Addon{" "}
                    <i className="material-symbols-rounded">open_in_new</i>
                  </a>
                </strong>
                .
              </p>
              <a
                href="https://addons.mozilla.org/en-US/firefox/addon/zen-internet/"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  className="figure item"
                  src="/assets/img/articles/zen/notion/zen-internet-addon.jpeg"
                  alt=""
                />
              </a>
            </li>
            <li>
              <h2 id="addon-fetch">Sync and Fetch the latest themes</h2>
              <p className="item article-text">
                Open the addon pop-up and click on the{" "}
                <strong>Refetch latest styles</strong> button to fetch the
                initial styles and keep the auto update toggle on to keep them
                up to date as I make changes.
              </p>
              <img
                className="figure item"
                src="/assets/img/articles/zen/notion/zen-internet-sync.jpeg"
                alt=""
              />
            </li>
            <h2 id="done">
              Congratulations <br />
              Your browser is now transparent <br />
              At least I hope so{" "}
            </h2>
            <p className="item article-text">
              You can now enjoy the zen browser with a transparent background.
              You can also change adjust various features provided for each
              website when you opent he pop-up in that webpage.
            </p>
          </ol>
        </article>

        <article className="page sub">
          <h2 id="trouble">Troubleshooting</h2>
          <ol className="zen-article">
            <li>
              <p className="item article-text">
                At the moment, only some of the operating systems are known to
                support transparency. Here are some:
              </p>
              <ul className="mini-list item">
                <li>macOS</li>
                <li>Windows 11 - native mica and acrylic</li>
                <li>
                  Windows 11 - With mods like{" "}
                  <strong>
                    <a
                      href="https://github.com/MicaForEveryone/MicaForEveryone"
                      target="_blank"
                      rel="noreferrer"
                    >
                      mica for everyone{" "}
                      <i className="material-symbols-rounded">open_in_new</i>
                    </a>
                  </strong>{" "}
                  or{" "}
                  <strong>
                    <a
                      href="https://github.com/Maplespe/DWMBlurGlass"
                      target="_blank"
                      rel="noreferrer"
                    >
                      DWM blur glass{" "}
                      <i className="material-symbols-rounded">open_in_new</i>
                    </a>
                  </strong>
                </li>
                <li>
                  Windows 10 - With{" "}
                  <strong>
                    <a
                      href="https://github.com/Maplespe/DWMBlurGlass"
                      target="_blank"
                      rel="noreferrer"
                    >
                      DWM blur glass{" "}
                      <i className="material-symbols-rounded">open_in_new</i>
                    </a>
                  </strong>
                </li>
                <li>
                  Wayland on{" "}
                  <strong>
                    <a
                      href="https://www.reddit.com/r/zen_browser/comments/1jd0ggm/comment/miemhvg/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button"
                      target="_blank"
                      rel="noreferrer"
                    >
                      KDE with Kvin blur{" "}
                      <i className="material-symbols-rounded">open_in_new</i>
                    </a>
                  </strong>
                </li>
                <li>
                  <details>
                    <summary>Hyprland - instructions</summary>
                    <div>
                      <p>
                        <strong>
                          Tested on version 1.14.8b flatpak version
                        </strong>
                      </p>
                      <p>
                        <strong>Step 1: Enable flags in about:config</strong>
                      </p>
                      <ul>
                        <li>widget.transparent-windows</li>
                        <li>zen.theme.gradient.show-custom-colors</li>
                        <li>zen.theme.acrylic-elements (not sure)</li>
                      </ul>
                      <p>
                        <strong>Step 2: Install Transparent Zen mod</strong>{" "}
                        (enable transparency features for linux as well)
                      </p>
                      <p>
                        <strong>Step 3: Use Nebula configs</strong>{" "}
                        (Nebula.uc.js userChrome.css userContent.css Nebula/)
                      </p>
                      <p>
                        <strong>Step 4: Configure Hyprland transparency</strong>{" "}
                        - Set opacity to 0.9 (exact value doesn't matter much)
                      </p>
                    </div>
                  </details>
                </li>
              </ul>
            </li>
            <li>
              <p className="item article-text">
                If you are using a different OS, please let me know if it works
                or not.
              </p>
            </li>
            <li>
              <p className="item article-text">
                Check your power saving settings and make sure that’s off on
                Windows.
              </p>
              <img
                className="figure item"
                src="/assets/img/articles/zen/notion/win-power-saving.jpg"
                alt="Windows power saving settings"
              />
            </li>
            <li>
              <p className="item article-text">
                Make sure your Windows color settings are not affecting
                transparency.
              </p>
              <img
                className="figure item"
                src="/assets/img/articles/zen/notion/win-color.jpeg"
                alt="Windows color settings"
              />
            </li>
            <li>
              <p className="item article-text">
                Hard to read text? black text in dark mode? It's because that
                website is not in dark theme or doesn't have one at all. In that
                case, you can use the{" "}
                <strong>
                  <a
                    href="https://darkreader.org/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Darkreader addon
                    <i className="material-symbols-rounded">open_in_new</i>
                  </a>
                </strong>{" "}
                to fix this behavior.
              </p>
              <img
                className="figure item"
                src="https://repository-images.githubusercontent.com/26682105/d6f7dbef-46e9-4fa0-8961-8b73d1b53167"
                alt="Darkreader"
              />
            </li>
          </ol>
        </article>

        <article className="page sub">
          <h2 id="addon-features">Site specific features</h2>
          <p className="item article-text">
            Once you start browsing, Check the add-on pop-up on each website and
            you will see a list of features along with transparency.
          </p>
          <img
            className="figure item"
            src="/assets/img/articles/zen/notion/site-specific.jpeg"
            alt="Zen Internet Addon"
          />
        </article>

        <article className="page">
          <h2 id="theme-request">Theme request and issues</h2>
          <ul className="zen-article">
            <li>
              <p className="item article-text">
                Don’t see transparency for your favorite website? Request a
                theme.
              </p>
            </li>
            <li>
              <p className="item article-text">
                You can report bugs and theme issues from the addon as
                well.{" "}
              </p>
              <img
                className="figure item"
                src="/assets/img/articles/zen/notion/request-2.jpeg"
                alt="Zen Internet Addon"
              />
            </li>
            <li>
              <p className="item article-text">
                Restricted websites and pages can not be themed and your
                requests will be closed.
              </p>
            </li>
          </ul>
        </article>

        <article className="page sub">
          <h2 id="more-links">More Resources</h2>
          <div className="redirects-container">
            <a
              href="https://sameerasw.notion.site/Zen-Transparency-1939c6099d4080468f02cf05ae50e827"
              aria-label="Legacy guide"
              className="redirects"
              target="_blank"
              rel="noreferrer"
            >
              <span className="material-symbols-rounded">article</span>
              <p>Legacy guide</p>
            </a>
            <Link
              href="/#contact"
              aria-label="Contact me"
              className="redirects"
            >
              <span className="material-symbols-rounded">mail</span>
              <p>Contact me</p>
            </Link>
            <a
              href="https://www.reddit.com/r/zen_browser"
              aria-label="Reddit post"
              className="redirects"
              target="_blank"
              rel="noreferrer"
            >
              <span className="material-symbols-rounded">news</span>
              <p>Reddit</p>
            </a>
          </div>
        </article>

        <footer>
          <div className="footer">
            <p className="footer-text">
              Work in progress.... Last updated on{" "}
              <b className="accent">12th July 2025</b>
            </p>
            <br />
            <p>
              © 2025 <a href="/">Sameera Wijerathna</a>
            </p>
            <p>Made with ❤️ from Sri Lanka</p>
          </div>
        </footer>
      </div>
    </>
  );
}
