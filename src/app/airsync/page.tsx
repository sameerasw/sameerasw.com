"use client";

import { useEffect } from "react";
import type { Metadata } from "next";

import "@/styles/article.css";
import "@/styles/airsync/airsync.css";

export default function AirSync() {
  useEffect(() => {
    const scrollContainer = document.getElementById("airsync-scroll");

    if (scrollContainer) {
      const enableHorizontal = () => window.innerWidth > 768; // desktop only

      // Wheel -> horizontal scroll
      const handleWheel = (e: WheelEvent) => {
        if (!enableHorizontal()) return;
        if (e.ctrlKey) return;
        if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
          e.preventDefault();
          scrollContainer.scrollLeft += e.deltaY * 1.1;
        }
      };

      scrollContainer.addEventListener("wheel", handleWheel as EventListener, {
        passive: false,
      });

      // Keyboard arrows for accessibility
      const handleKeyDown = (e: KeyboardEvent) => {
        if (!enableHorizontal()) return;
        const step = 120;
        if (["ArrowDown", "PageDown"].includes(e.key)) {
          e.preventDefault();
          scrollContainer.scrollLeft += step;
        } else if (["ArrowUp", "PageUp"].includes(e.key)) {
          e.preventDefault();
          scrollContainer.scrollLeft -= step;
        } else if (e.key === "Home") {
          scrollContainer.scrollTo({ left: 0, behavior: "smooth" });
        } else if (e.key === "End") {
          scrollContainer.scrollTo({
            left: scrollContainer.scrollWidth,
            behavior: "smooth",
          });
        }
      };
      window.addEventListener("keydown", handleKeyDown);

      // Tile click animation
      const tiles = document.querySelectorAll(".tile");
      tiles.forEach((tile: any) => {
        tile.addEventListener("click", function (e: any) {
          if (e.target.tagName === "A" || e.target.closest("a")) {
            return;
          }
          tile.style.transform = "scale(0.95)";
          setTimeout(() => {
            tile.style.transform = "";
          }, 150);
        });

        // Preload image logic
        if (!tile.querySelector(".tile-bg-preload")) {
          const preload = document.createElement("div");
          preload.className = "tile-bg-preload";
          tile.insertBefore(preload, tile.firstChild);
        }

        const style = getComputedStyle(tile);
        const bgImage = style.backgroundImage;
        if (bgImage && bgImage !== "none") {
          const urlMatch = bgImage.match(/url\(["']?([^"')]+)["']?\)/);
          if (urlMatch) {
            const img = new window.Image();
            img.src = urlMatch[1];
            img.onload = () => {
              tile.classList.add("loaded");
            };
          } else {
            tile.classList.add("loaded");
          }
        } else {
          tile.classList.add("loaded");
        }
      });

      return () => {
        scrollContainer.removeEventListener(
          "wheel",
          handleWheel as EventListener,
        );
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, []);

  return (
    <div className="airsync-page">
      <div className="moodboard-container" id="airsync-scroll">
        <div className="parent">
          <div className="div1 tile primary-tile">
            <div className="spacer app-preview-spacer"></div>
            <div className="spacer"></div>
            <img
              src="/assets/img/articles/airsync/airsync-logo.png"
              alt="airsync logo"
              className="airsync-logo"
            />
            <h1>AirSync</h1>
            <p>Android + macOS continuity</p>
            <p className="app-description">
              AirSync is an open source project to bring seamless integration
              between Android and macOS devices over local network with
              end-to-end encryption with features like mirroring, notification
              sync and many more that were only been a dream for users.
            </p>
            <div className="spacer"></div>
            <div className="tile-content downloads-section">
              <span className="material-symbols-rounded">download</span>
              <h3>We're out of beta!</h3>
              <p>Get AirSync for your devices</p>
              <div className="download-buttons">
                <a
                  href="https://github.com/sameerasw/airsync-mac/releases/latest"
                  target="_blank"
                  className="download-btn macos-download"
                >
                  <img
                    width="24"
                    height="24"
                    src="https://img.icons8.com/material-two-tone/24/mac-os.png"
                    alt="mac-os"
                    className="os-icons"
                  />
                  macOS
                </a>
                <a
                  href="https://play.google.com/store/apps/details?id=com.sameerasw.airsync"
                  target="_blank"
                  className="download-btn android-download"
                >
                  <img
                    width="24"
                    height="24"
                    src="https://img.icons8.com/plumpy/24/android-os.png"
                    alt="android-os"
                    className="os-icons"
                  />
                  Android
                </a>
              </div>
            </div>
          </div>
          <div className="div2 tile">
            <div className="tile-content">
              <span className="material-symbols-rounded">devices</span>
              <h3>
                <del>!Phone</del> Android Mirror
              </h3>
              <p>
                Never touch your phone again while focusing, or just browse your
                apps like at home.
              </p>
            </div>
          </div>
          <div className="div3 tile">
            <div className="tile-content">
              <span className="material-symbols-rounded">reply</span>
              <h3>Reply to Notifications</h3>
              <p>
                Reply to messages directly from macOS notifications or the app
                or just swipe away to dismiss from everywhere.
              </p>
            </div>
          </div>
          <div className="div6 tile">
            <div className="tile-content">
              <span className="material-symbols-rounded">files</span>
              <h3>Send Files</h3>
              <p>And receive back.</p>
            </div>
          </div>
          <div className="div8 tile">
            <div className="tile-content">
              <span className="material-symbols-rounded">desktop_mac</span>
              <h3>Desktop Mode</h3>
              <p>Wireless DEX for everyone!</p>
            </div>
          </div>
          <div className="div9 tile">
            <div className="tile-content">
              <span className="material-symbols-rounded">notifications</span>
              <h3>Notification Sync</h3>
              <p>
                Mirror your Android notifications to macOS in Real-time grouped
                and stacked or in order.
              </p>
            </div>
          </div>
          <div className="div10 tile">
            <div className="tile-content">
              <span className="material-symbols-rounded">wallpaper</span>
              <h3>Wallpaper view</h3>
              <p>Glimpse your Android wallpaper and also the media artwork.</p>
            </div>
          </div>
          <div className="div11 tile">
            <div className="tile-content">
              <span className="material-symbols-rounded">play_circle</span>
              <h3>Media Control</h3>
              <p>Glance at your media controls and control from your mac.</p>
            </div>
          </div>
          <div className="div12 tile">
            <div className="tile-content">
              <span className="material-symbols-rounded">content_copy</span>
              <h3>Clipboard Sync</h3>
              <p>
                Copy on mac, paste on Android, Or simply send the text to the
                mac.
              </p>
            </div>
          </div>
          <div className="div13 tile">
            <div className="tile-content">
              <span className="material-symbols-rounded">hourglass</span>
              <h3>A lot more in the works</h3>
              <p>
                Get early access, updates and support. <br />
                Join the community!
              </p>
              <div className="download-buttons">
                <a
                  href="https://reddit.com/r/airsync"
                  target="_blank"
                  className="download-btn"
                >
                  r/AirSync
                </a>
                <a
                  href="https://twitter.com/sameeraswdotcom"
                  target="_blank"
                  className="download-btn"
                >
                  Twi.. 𝕏
                </a>
              </div>
            </div>
          </div>
          <div className="div14 tile">
            <div className="tile-content">
              <span className="material-symbols-rounded">article</span>
              <h3>Checkout other cool stuff</h3>
              <div className="download-buttons">
                <a href="/" className="download-btn">
                  Website Home
                </a>
              </div>
            </div>
          </div>
          <div className="div15 tile">
            <div className="tile-content">
              <span className="material-symbols-rounded">key</span>
              <h3>Secure</h3>
              <p>
                Everything is synced inside your local network with end-to-end
                AES encryption
              </p>
            </div>
          </div>
          <div className="div16 tile">
            <div className="tile-content">
              <span className="material-symbols-rounded">code</span>
              <h3>By the community</h3>
              <p>Feel free to tinker with the source.</p>
              <div className="download-buttons">
                <a
                  href="https://github.com/sameerasw/airsync-mac"
                  className="download-btn"
                >
                  airsync-mac
                </a>
                <a
                  href="https://github.com/sameerasw/airsync-android"
                  className="download-btn"
                >
                  airsync-android
                </a>
              </div>
            </div>
          </div>
          <div className="div17 tile privacy-tile">
            <div className="tile-content">
              <span className="material-symbols-rounded">book</span>
              <h3>Docs and How-To</h3>
              <div className="download-buttons">
                <a
                  href="https://airsync.notion.site"
                  className="docs-primary-link"
                >
                  Documentation Guide
                </a>
                <a href="/airsync-privacy" className="privacy-link">
                  Privacy Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
