"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { apps } from "./apps";
import Navbar from "@/components/Navbar";
import "@/styles/article.css";
import "@/styles/articles/app-list.css";

export default function MacOsSetup() {
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
                className={`macos-logo item ${isScrolled ? "scrolled" : ""}`}
              ></div>
            </a>
            <div className="container-mini item content">
              <h1 id="title">
                My <strong>Mac</strong> Setup
              </h1>
              <p className="item article-text">
                A complete lookaround of my personal macOS productivity setup on
                my <b className="accent">MacBook Air M3.</b>
                The apps I use, tools, browser usage, productivity tricks will
                be mentioned below and updated often as my setup changes.
              </p>
            </div>
          </div>
        </section>

        <section id="article-info" className="item">
          <div className="heading item">
            <h2>Device</h2>
          </div>
          <div className="container" id="specs-table">
            <table>
              <tbody>
                <tr>
                  <td>
                    <img
                      src="/assets/img/articles/macos/macbook-air.jpeg"
                      alt="An image of my macbook air"
                      id="screenshot"
                      className="mac-photo"
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <img
                      src="/assets/img/articles/macos/desktop-screenshot.jpg"
                      alt="macOS screenshot preview"
                      id="screenshot"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="table-right">
                    <b className="accent">Apple MacBook Air M3 </b> <br />
                    24GB Memory <br />
                    512GB Storage <br />
                    10 Core GPU
                    <br />
                    Midnight Color
                    <br />
                    macOS26 Tahoe
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section id="apps">
          <div className="heading item">
            <h2>Apps and Tools</h2>
          </div>
          <div className="container item" id="apps-list">
            {apps.map((app, index) => (
              <a
                key={index}
                className={`card item ${app.price}`}
                href={app.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={app.iconUrl} alt={app.name} className="app-icon" />
                <img src={app.imageUrl} alt={app.name} className="app-image" />
                <div className="card-header">
                  <h3>{app.name}</h3>
                </div>
                <div className="card-body">
                  <p>{app.description}</p>
                </div>
              </a>
            ))}
          </div>
          <div className="card item" id="apps-guide">
            <p className="free">Free</p>
            <p className="paid">Paid</p>
            <p className="foss">Free and Open Source</p>
          </div>
        </section>

        <footer></footer>
      </div>
    </>
  );
}
