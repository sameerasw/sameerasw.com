"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import "@/styles/article.css";
import "@/styles/articles/zen.css";

export default function WifiPassword() {
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
      <nav id="nav">
        <ul>
          <li>
            <Link href="/" id="home-nav" aria-label="back to home page">
              <span className="material-symbols-rounded">arrow_back</span>
              <span className="caption">Back</span>
            </Link>
          </li>
        </ul>
      </nav>

      <div className="container">
        <section id="intro">
          <div className="heading">
            <a href="#" onClick={handleScrollToTop} aria-label="Back to top">
              <div
                id="logo"
                className={`home-logo item ${isScrolled ? "scrolled" : ""}`}
              ></div>
            </a>
            <div className="container-mini item content">
              <h1 id="title">
                <strong>WiFi</strong> Password
              </h1>
              <h2 id="subtitle">Open for anyone</h2>
            </div>
          </div>
        </section>

        <div className="spacer" style={{ height: "900px" }}></div>
        <div className="content">
          <p className="item">
            <strong>sameerasw.com/wifi</strong>
          </p>
        </div>
        <img
          src="https://media.tenor.com/x8v1oNUOmg4AAAAM/rickroll-roll.gif"
          alt=""
        />
        <h2 id="subtitle" style={{ textAlign: "center" }}>
          <strong>LOL 🤣</strong> not sharing
        </h2>
      </div>
    </>
  );
}
