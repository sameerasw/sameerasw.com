"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import "@/styles/article.css";
import "@/styles/articles/edc.css";

export default function EDCSetup() {
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
      const value = window.scrollY || document.documentElement.scrollTop;
      setIsScrolled(value > 100);

      items.forEach((item) => {
        if (item.id === "logo") return;
        const position = item.getBoundingClientRect();
        if (position.top > window.innerHeight - 10 || position.bottom < 20) {
          item.style.scale = "0.75";
        } else {
          item.style.scale = "1";
        }
      });
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
      <Navbar isArticle />

      <div className="container article-body">
        <section id="intro">
          <div className="heading">
            <a href="#" onClick={handleScrollToTop} aria-label="Back to top">
              <div
                id="logo"
                className={`item home-logo ${isScrolled ? "scrolled" : ""}`}
              ></div>
            </a>
            <div className="container-mini">
              <h1 id="title" className="item">
                <strong>EDC</strong> Setup
              </h1>
              <p className="item article-text">
                All my EDC (Everyday Carry) & Setup details together sharing for
                you to get inspired or to improve your own setup.
              </p>
            </div>
          </div>
        </section>

        <div id="setup-wire"></div>

        <section id="macbook" className="device item">
          <img
            src="/assets/img/articles/edc/mac-wire.png"
            alt="MacBook Pro 13 (2020)"
          />
          <div>
            <div className="heading">
              <h2>MacBook Air 13"</h2>
            </div>
            <div className="content">
              <div className="article-text">
                <ul>
                  <li>Specs: MacBook Air M3</li>
                  <li>Memory: 24GB Unified memory</li>
                  <li>Storage: 512GB SSD</li>
                  <li>OS: macOS26 Tahoe BETA</li>
                  <li>Color: Midnight</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="pixel" className="device item">
          <img
            src="/assets/img/articles/edc/pixel-wire.png"
            alt="Google Pixel 7"
          />
          <div>
            <div className="heading ">
              <h2>Google Pixel 7</h2>
            </div>
            <div className="content">
              <div className="article-text">
                <ul>
                  <li>Specs: Google Pixel 7</li>
                  <li>Memory: 8 GB</li>
                  <li>Storage: 128 GB</li>
                  <li>OS: Android 16 - BETA Program</li>
                  <li>Color: Snow</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="keyboard" className="device item">
          <img
            src="/assets/img/articles/edc/kb-wire.png"
            alt="Redragon FIZZ K617 60% Keyboard"
          />
          <div>
            <div className="heading">
              <h2>Redragon FIZZ K617 60% [RED] Keyboard</h2>
            </div>
            <div className="content">
              <div className="article-text">
                <ul>
                  <li>Switches: Redragon Red Switches</li>
                  <li>Keycaps: ABS Double-Shot Keycaps</li>
                  <li>Backlight: RGB Backlight</li>
                  <li>Connectivity: Wired</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="mouse" className="device item">
          <img
            src="/assets/img/articles/edc/mouse-wire.png"
            alt="SEENDA MBD7 Vertical Mouse"
          />
          <div>
            <div className="heading">
              <h2>SEENDA MBD7 Vertical Mouse</h2>
            </div>
            <div className="content">
              <div className="article-text">
                <ul>
                  <li>Connectivity: Wireless</li>
                  <li>Buttons: 7 Buttons</li>
                  <li>Resolution: 800/1200/1600/2400 DPI</li>
                  <li>Color: Black</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="buds" className="device item">
          <img
            src="/assets/img/articles/edc/buds-wire.png"
            alt="HAYLOU GT1 2020 Earbuds"
          />
          <div>
            <div className="heading">
              <h2>HAYLOU GT1 2020 Earbuds</h2>
            </div>
            <div className="content">
              <div className="article-text">
                <ul>
                  <li>Connectivity: Bluetooth 5.0</li>
                  <li>Charging: USB Type-C</li>
                  <li>Color: Black</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="heading item">
            <h2>WIP</h2>
          </div>
        </section>
        <footer></footer>
      </div>
    </>
  );
}
