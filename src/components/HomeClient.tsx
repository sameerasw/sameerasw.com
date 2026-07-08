"use client";

import { useEffect, useState, useRef, Suspense } from "react";
import Navbar from "@/components/Navbar";
import LastFmWidget from "@/components/LastFmWidget";
import SocialsChips from "@/components/SocialsChips";
import { GitHubCalendar } from "react-github-calendar";
import GitHubChips from "@/components/GitHubChips";

import "@/styles/index/photos-switcher.css";
import "@/styles/index/highlights.css";
import "@/styles/index/form.css";
import "@/styles/index/lastfm.css";
import "@/styles/index/github-stats.css";

interface Activity {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

interface HomeClientProps {
  updatesSection: React.ReactNode;
  wallpaperData?: any;
}

export default function HomeClient({
  updatesSection,
  wallpaperData,
}: HomeClientProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [tick, setTick] = useState(0);
  const calendarRef = useRef<HTMLDivElement>(null);

  const [bgUrl, setBgUrl] = useState("");
  const [bgLoaded, setBgLoaded] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("submitting");
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData as any).toString(),
      });
      if (response.ok) {
        setFormStatus("success");
        form.reset();
      } else {
        setFormStatus("error");
      }
    } catch (error) {
      setFormStatus("error");
    }
  };

  // Helper to get lower quality/size Unsplash URL for performance
  const getOptimizedUrl = (url: string, width: number, quality: number) => {
    if (!url) return "";
    return url
      .replace(/&w=\d+/, `&w=${width}`)
      .replace(/&q=\d+/, `&q=${quality}`);
  };

  useEffect(() => {
    if (!wallpaperData) return;

    const rawUrl = wallpaperData.url;
    if (!rawUrl) return;

    const isMobile = window.innerWidth < 768;
    // Optimize background image size & quality for performance
    const targetWidth = isMobile ? 800 : 1280;
    const optimizedUrl = getOptimizedUrl(rawUrl, targetWidth, 70);

    setBgUrl(optimizedUrl);

    const img = new Image();
    img.src = optimizedUrl;
    img.onload = () => {
      setBgLoaded(true);
    };
  }, [wallpaperData]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTick((t) => t + 1);
    }, 50);

    return () => clearInterval(interval);
  }, []);

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

    const scrollToEnd = () => {
      if (calendarRef.current) {
        calendarRef.current.scrollLeft = calendarRef.current.scrollWidth;
        const inner = calendarRef.current.querySelector("div");
        if (inner) {
          inner.scrollLeft = inner.scrollWidth;
        }
      }
    };

    const observer = new ResizeObserver(() => {
      scrollToEnd();
    });

    if (calendarRef.current) {
      observer.observe(calendarRef.current);
    }

    // small delay to let mount finish
    setTimeout(() => {
      animate();
      scrollToEnd();
    }, 100);

    setTimeout(scrollToEnd, 1000);
    setTimeout(scrollToEnd, 3000);

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

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  const transformData = (data: Array<Activity>) => {
    if (!isMounted || data.length === 0) return data;

    const rows = 7;
    const firstDate = new Date(data[0].date);
    const firstDayOffset = (firstDate.getUTCDay() + 6) % 7;

    const CYCLE_TICKS = 100; // 10s cycle
    const currentTick = tick % CYCLE_TICKS;
    const SWEEP_DURATION_TICKS = 75; // 3s

    const activitiesWithPos = data.map((activity) => {
      const date = new Date(activity.date);
      const diffInDays = Math.round(
        (date.getTime() - firstDate.getTime()) / (1000 * 60 * 60 * 24),
      );
      const correctedIndex = diffInDays + firstDayOffset;
      return {
        ...activity,
        x: Math.floor(correctedIndex / rows),
        y: correctedIndex % rows,
      };
    });

    const maxCol = activitiesWithPos[activitiesWithPos.length - 1].x;

    if (isInitialLoading) {
      const fadeStartTick = 30;
      const fadeDurationTicks = 10;
      let alpha = 1;

      if (tick > fadeStartTick) {
        alpha = Math.max(0, 1 - (tick - fadeStartTick) / fadeDurationTicks);
      }

      return activitiesWithPos.map((activity) => {
        const { x, y } = activity;
        const dx = maxCol - x;
        const dy = y - rows / 2;
        const distance = Math.sqrt(dx * dx + dy * dy);

        const rippleValue = Math.sin(distance * 0.5 - tick * 0.3);
        const rippleLevel = Math.floor(((rippleValue + 1) / 2) * 5);
        const realLevel = activity.level;
        const blendedLevel = Math.round(
          rippleLevel * alpha + realLevel * (1 - alpha),
        );

        return {
          date: activity.date,
          count: activity.count,
          level: Math.min(4, Math.max(0, blendedLevel)) as 0 | 1 | 2 | 3 | 4,
        };
      });
    }

    // Recurring Radar Sweep
    if (currentTick < SWEEP_DURATION_TICKS) {
      const progress = currentTick / SWEEP_DURATION_TICKS;
      const sweepX = maxCol - progress * (maxCol + 10);

      return activitiesWithPos.map((activity) => {
        const { x } = activity;
        const realLevel = activity.level;

        const distance = Math.abs(x - sweepX);
        const intensity = Math.max(0, 1 - distance / 3);
        const boost = Math.round(intensity * 2);
        const newLevel = Math.min(4, realLevel + boost);

        return {
          date: activity.date,
          count: activity.count,
          level: newLevel as 0 | 1 | 2 | 3 | 4,
        };
      });
    }

    return data;
  };

  const handleScrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const themeColors = wallpaperData?.themeColors || {
    light: "hsl(165, 50%, 27%)",
    dark: "hsl(165, 100%, 65%)",
  };

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
          :root {
            --primary-color: ${themeColors.light} !important;
          }
          @media (prefers-color-scheme: dark) {
            :root {
              --primary-color: ${themeColors.dark} !important;
            }
          }
        `,
        }}
      />
      <div
        id="bg-image"
        className={bgLoaded ? "show-image" : ""}
        style={{ backgroundImage: bgUrl ? `url(${bgUrl})` : "none" }}
      />
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

            <div className="container-mini">
              <h1 id="title" className="item">
                <span className="name-primary">Sameera</span>
                <br />
                <span className="name-secondary">Wijerathna</span>
              </h1>
              <SocialsChips />
              <div className="item github-calendar" ref={calendarRef}>
                {isMounted && (
                  <GitHubCalendar
                    username="sameerasw"
                    blockMargin={2}
                    blockRadius={10}
                    showColorLegend={false}
                    showMonthLabels={false}
                    showTotalCount={false}
                    weekStart={1}
                    blockSize={10}
                    transformData={transformData}
                    theme={{
                      light: ["#ffffff", themeColors.light],
                      dark: ["#000000", themeColors.dark],
                    }}
                  />
                )}
              </div>
              <GitHubChips />
              <LastFmWidget />
            </div>
          </div>
        </section>

        {updatesSection}

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
                <div className="highlight-thumbnail"></div>
                <div className="highlight-content">
                  <h3>AirSync</h3>
                  <p className="highlight-description">
                    Seamless continuity between Android & macOS — notifications,
                    clipboard, media, mirroring and more, all over your secure
                    network
                  </p>
                </div>
              </a>
              <a
                id="essentials"
                className="highlight-item item"
                href="/essentials"
                data-title="/assets/img/articles/essentials-preview.jpeg"
              >
                <div className="highlight-thumbnail"></div>
                <div className="highlight-content">
                  <h3>Essentials</h3>
                  <p className="highlight-description">
                    Tools for Android nerds. Customize your Android experience
                    with visual, functional and utility tools
                  </p>
                </div>
              </a>
              <a
                id="zen-t"
                className="highlight-item item"
                href="/zen"
                data-title="/assets/img/articles/zen-t-preview.jpeg"
              >
                <div className="highlight-thumbnail"></div>
                <div className="highlight-content">
                  <h3>ZenZero</h3>
                  <p className="highlight-description">
                    Transparent minimal Zen Browser setup for a distraction free
                    browsing experience
                  </p>
                </div>
              </a>
              {/* <a
                id="helium"
                className="highlight-item item"
                href="/helium"
                data-title="/assets/img/articles/helium-preview.jpeg"
              >
                <div className="highlight-thumbnail"></div>
                <div className="highlight-content">
                  <h3>Helium Setup</h3>
                  <p className="highlight-description">
                    A minimal but functional daily Helium browser setup
                  </p>
                </div>
              </a> */}
              <a
                id="macos"
                className="highlight-item item"
                href="/macos"
                data-title="/assets/img/articles/macos/web-preview-macos.jpeg"
              >
                <div className="highlight-thumbnail"></div>
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
                <div className="highlight-thumbnail"></div>
                <div className="highlight-content">
                  <h3>Canvas</h3>
                  <p className="highlight-description">
                    Draw on Android with a minimal free and open source Jetpack
                    Compose app
                  </p>
                </div>
              </a>
              <a
                id="tasks"
                className="highlight-item item"
                href="https://github.com/sameerasw/tasks"
                data-title="/assets/img/articles/tasks-preview.jpeg"
              >
                <div className="highlight-thumbnail"></div>
                <div className="highlight-content">
                  <h3>Tasks</h3>
                  <p className="highlight-description">
                    Google tasks for macOS unofficial native app with SwiftUI
                  </p>
                </div>
              </a>
              <a
                id="pixel"
                className="highlight-item item"
                href="/pixel"
                data-title="/assets/img/articles/pixel/web-preview-pixel.jpeg"
              >
                <div className="highlight-thumbnail"></div>
                <div className="highlight-content">
                  <h3>Pixel Notes</h3>
                  <p className="highlight-description">
                    Guide on setting up voLTE in unsupported regions
                  </p>
                </div>
              </a>

              {/* ── collapsible extras ── */}
              <div
                className={`highlight-extras ${showAllProjects ? "expanded" : ""}`}
              >
                <div className="highlight-extras-inner">
                  <a
                    id="edc"
                    className="highlight-item"
                    href="/edc-setup"
                    data-title="/assets/img/articles/edc-preview.jpeg"
                  >
                    <div className="highlight-thumbnail"></div>
                    <div className="highlight-content">
                      <h3>Every Day Carry</h3>
                      <p className="highlight-description">
                        Essentials I use and comes with me when travelling
                      </p>
                    </div>
                  </a>
                  <a
                    id="zero"
                    className="highlight-item"
                    href="https://github.com/sameerasw/browser"
                    data-title="/assets/img/articles/zero-preview.jpeg"
                  >
                    <div className="highlight-thumbnail"></div>
                    <div className="highlight-content">
                      <h3>Zero</h3>
                      <p className="highlight-description">
                        Minimal liquid glass browser with SwiftUI
                      </p>
                    </div>
                  </a>
                  <a
                    id="watchfaces"
                    className="highlight-item"
                    href="https://github.com/sameerasw/watchfaces"
                    data-title="/assets/img/articles/watchfaces-preview.jpeg"
                  >
                    <div className="highlight-thumbnail"></div>
                    <div className="highlight-content">
                      <h3>Watchfaces</h3>
                      <p className="highlight-description">
                        Custom watchfaces for WearOS
                      </p>
                    </div>
                  </a>
                  <a
                    id="foldericons"
                    className="highlight-item"
                    href="/icons/categories.html"
                    data-title="/assets/img/articles/folder-icons-preview.jpeg"
                  >
                    <div className="highlight-thumbnail"></div>
                    <div className="highlight-content">
                      <h3>Folder Icons</h3>
                      <p className="highlight-description">
                        Custom folder icons for Windows and macOS
                      </p>
                    </div>
                  </a>
                  <a
                    id="macro"
                    className="highlight-item"
                    href="https://github.com/sameerasw/REDRAGON-FIZZ-K617-macro"
                    data-title="/assets/img/articles/keeb-preview.jpeg"
                  >
                    <div className="highlight-thumbnail"></div>
                    <div className="highlight-content">
                      <h3>Keymappings</h3>
                      <p className="highlight-description">
                        Custom keyboard macros and remapping for my REDRAGON
                        FIZZ K617
                      </p>
                    </div>
                  </a>
                  <a
                    id="more-github"
                    className="highlight-item"
                    href="https://github.com/sameerasw/"
                    data-title="Visit my profile"
                  >
                    <div className="highlight-thumbnail"></div>
                    <div className="highlight-content">
                      <h3>More on GitHub</h3>
                      <p className="highlight-description">
                        Explore all my projects
                      </p>
                    </div>
                  </a>
                </div>
              </div>

              {/* ── toggle button ── */}
              <button
                className="highlight-toggle item"
                onClick={() => setShowAllProjects((p) => !p)}
                aria-label={
                  showAllProjects ? "Show less projects" : "Show more projects"
                }
              >
                <span
                  className={`material-symbols-rounded highlight-toggle-icon ${showAllProjects ? "rotated" : ""}`}
                >
                  expand_more
                </span>
                <span>{showAllProjects ? "Show less" : "Show more"}</span>
              </button>
            </div>
          </div>
        </section>

        <section id="about-me">
          <div className="heading item">
            <h2>About Me</h2>
            <div id="photo"></div>
          </div>
          <div className="content">
            <p className="item">
              A passionate developer, designer and a student from Sri Lanka who
              is always ready to learn new things. Outside work, will be mostly
              dealing with either an app, a browser, or watching F1 or a TV
              show.
            </p>
            <div className="details-pills">
              <div className="pill item">
                <span className="material-symbols-rounded">person</span>
                <span>Sameera Wijerathna</span>
              </div>
              <div className="pill item">
                <span className="material-symbols-rounded">cake</span>
                <span>24</span>
              </div>
              <div className="pill item">
                <span className="material-symbols-rounded">location_on</span>
                <span>Balangoda/ Colombo, Sri Lanka</span>
              </div>
              <div className="pill item">
                <span className="material-symbols-rounded">school</span>
                <span>Undergraduate at University of Westminster via IIT</span>
              </div>
              <div className="pill item">
                <span className="material-symbols-rounded">work</span>
                <span>Trainee Associate UI Engineer at Zone24x7 Pvt. LTD</span>
              </div>
              <div className="pill item">
                <span className="material-symbols-rounded">code</span>
                <a
                  href="https://github.com/sameerasw"
                  aria-label="Sameera's github link"
                  className="skill-icon-container"
                >
                  <img
                    className=" skill-icons"
                    src="https://skillicons.dev/icons?i=swift&theme=light"
                    alt="My skills"
                  />
                  <img
                    className=" skill-icons"
                    src="https://skillicons.dev/icons?i=kotlin&theme=light"
                    alt="My skills"
                  />
                  <img
                    className=" skill-icons"
                    src="https://skillicons.dev/icons?i=html&theme=light"
                    alt="My skills"
                  />
                  <img
                    className=" skill-icons"
                    src="https://skillicons.dev/icons?i=css&theme=light"
                    alt="My skills"
                  />
                  <img
                    className=" skill-icons"
                    src="https://skillicons.dev/icons?i=js&theme=light"
                    alt="My skills"
                  />
                  <img
                    className=" skill-icons"
                    src="https://skillicons.dev/icons?i=ts&theme=light"
                    alt="My skills"
                  />
                  <img
                    className=" skill-icons"
                    src="https://skillicons.dev/icons?i=react&theme=light"
                    alt="My skills"
                  />
                  <img
                    className=" skill-icons"
                    src="https://skillicons.dev/icons?i=mui&theme=light"
                    alt="My skills"
                  />
                  <img
                    className=" skill-icons"
                    src="https://skillicons.dev/icons?i=figma&theme=light"
                    alt="My skills"
                  />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="contact">
          <div className="heading item">
            <h2>Contact</h2>
          </div>
          <div className="content">
            <div className="social-banners item">
              <a
                href="https://www.reddit.com/r/MadebySameerasw"
                target="_blank"
                rel="noopener noreferrer"
                className="social-banner-link"
                aria-label="Join my Reddit community"
              >
                <img
                  src="/assets/img/reddit-banner.png"
                  alt="Reddit community — r/MadebySameerasw"
                  className="social-banner-img"
                />
              </a>
              <a
                href="https://t.me/tidwib"
                target="_blank"
                rel="noopener noreferrer"
                className="social-banner-link"
                aria-label="Join my Telegram channel"
              >
                <img
                  src="/assets/img/telegram-banner.png"
                  alt="Telegram channel — tidwib"
                  className="social-banner-img"
                />
              </a>
            </div>
            <p className="item">
              If you have any questions or want to work with me, feel free to
              contact me via email or any of my social media profiles.
            </p>
            <div id="contact-form">
              <form
                name="contact"
                method="POST"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                onSubmit={handleFormSubmit}
              >
                <input type="hidden" name="form-name" value="contact" />
                <p style={{ display: "none" }}>
                  <label>
                    Don’t fill this out if you’re human: <input name="bot-field" />
                  </label>
                </p>
                <div id="highlights">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Name"
                    required
                    className="highlight-item item"
                  />
                  <input
                    type="email"
                    name="_replyto"
                    id="email"
                    placeholder="Email"
                    required
                    className="highlight-item item"
                  />
                  <textarea
                    name="message"
                    id="message"
                    placeholder="Message"
                    required
                    className="highlight-item item"
                  ></textarea>
                  <button
                    type="submit"
                    id="btn"
                    className="highlight-item item"
                    disabled={formStatus === "submitting"}
                  >
                    <span className="material-symbols-rounded">
                      {formStatus === "submitting" ? "hourglass_empty" : formStatus === "success" ? "check" : formStatus === "error" ? "error" : "send"}
                    </span>
                    {formStatus === "submitting" ? "Sending..." : formStatus === "success" ? "Sent!" : formStatus === "error" ? "Failed, try again?" : "Send"}
                  </button>
                </div>
              </form>
              <div id="highlights" style={{ marginTop: "1em" }}>
                <a
                  href="/assets/resume.pdf"
                  target="_blank"
                  id="resume"
                  aria-label="Download my resume"
                  className="highlight-item item"
                >
                  <span className="material-symbols-rounded">
                    description
                  </span>
                  <h3>View My Resume</h3>
                </a>
                <a 
                  href="mailto:mail@sameerasw.com" 
                  id="email-btn" 
                  aria-label="Email me"
                  className="highlight-item item"
                >
                  <span className="material-symbols-rounded">email</span>
                  <h3>Business? Send an email</h3>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Wallpaper Cards at Very Bottom */}
        {wallpaperData && (
          <div
            className="container"
            style={{ margin: "8rem auto 4rem auto", width: "100%" }}
          >
            <div id="highlights" style={{ width: "100%", maxWidth: "440px" }}>
              {/* The Wallpaper Details Card */}
              <div className="wallpaper-card item">
                <div className="wallpaper-card-preview">
                  <img
                    src={getOptimizedUrl(wallpaperData.url, 400, 75)}
                    alt="Today's wallpaper preview"
                    loading="lazy"
                  />
                </div>
                <div className="wallpaper-card-header">
                  <span className="material-symbols-rounded">image</span>
                  <span>Today's my wallpaper pick</span>
                </div>
                <p className="wallpaper-card-credits">
                  Photo by{" "}
                  <a
                    href={wallpaperData.author?.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {wallpaperData.author?.name}
                  </a>{" "}
                  on{" "}
                  <a
                    href={wallpaperData.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Unsplash
                  </a>
                </p>
              </div>

              {/* Showcase Action Cards below it */}
              <a
                id="download-wallpaper"
                className="highlight-item item"
                href={wallpaperData.url_full || wallpaperData.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ padding: "0.75rem 1.25rem", gap: "0.75rem" }}
              >
                <span
                  className="material-symbols-rounded"
                  style={{ fontSize: "1.5rem" }}
                >
                  download
                </span>
                <div className="highlight-content">
                  <h3
                    style={{
                      fontSize: "0.95rem",
                      fontWeight: "normal",
                      padding: 0,
                    }}
                  >
                    Download
                  </h3>
                </div>
              </a>

              <a
                id="wallpaper-source"
                className="highlight-item item"
                href={wallpaperData.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{ padding: "0.75rem 1.25rem", gap: "0.75rem" }}
              >
                <span
                  className="material-symbols-rounded"
                  style={{ fontSize: "1.5rem" }}
                >
                  open_in_new
                </span>
                <div className="highlight-content">
                  <h3
                    style={{
                      fontSize: "0.95rem",
                      fontWeight: "normal",
                      padding: 0,
                    }}
                  >
                    Unsplash
                  </h3>
                </div>
              </a>

              <a
                id="wallpaper-collection"
                className="highlight-item item"
                href="https://unsplash.com/collections/LqO9knU9z2A"
                target="_blank"
                rel="noopener noreferrer"
                style={{ padding: "0.75rem 1.25rem", gap: "0.75rem" }}
              >
                <span
                  className="material-symbols-rounded"
                  style={{ fontSize: "1.5rem" }}
                >
                  photo_library
                </span>
                <div className="highlight-content">
                  <h3
                    style={{
                      fontSize: "0.95rem",
                      fontWeight: "normal",
                      padding: 0,
                    }}
                  >
                    Visit my collection
                  </h3>
                </div>
              </a>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
