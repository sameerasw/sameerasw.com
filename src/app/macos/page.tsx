"use client";

import { useEffect } from "react";
import Link from "next/link";
import { apps } from "./apps";
import "@/styles/article.css";
import "@/styles/articles/app-list.css";

export default function MacOsSetup() {
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
      item.style.transition =
        "opacity 0.5s ease-out, transform 0.5s ease-out, scale 0.3s ease-out";
    });

    setTimeout(animate, 100);

    const handleScroll = () => {
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
        const value = window.scrollY || document.documentElement.scrollTop;
        logo.style.opacity = String(1 - value / 200);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
            <a href="#">
              <div id="logo" className="macos-logo"></div>
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
