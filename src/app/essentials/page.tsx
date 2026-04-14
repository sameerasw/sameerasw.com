import { Suspense } from "react";
import { getAllReleaseNotes } from "@/lib/releaseNotes";
import ReleaseFeed from "@/components/ReleaseFeed";
import Navbar from "@/components/Navbar";
import EssentialsClient from "@/components/essentials/EssentialsClient";
import ScreenshotsCarousel from "@/components/essentials/ScreenshotsCarousel";
import FeatureChips from "@/components/essentials/FeatureChips";
import MadeByChip from "@/components/MadeByChip";
import "@/styles/essentials/essentials.css";

export default async function Essentials() {
  const allNotes = await getAllReleaseNotes();
  const notes = allNotes.filter(n => n.app === "essentials");

  return (
    <EssentialsClient>
      <Navbar isArticle />
      <div className="essentials-page">
        {/* ── HERO ── */}
        <section className="es-hero" id="intro">
          <div className="es-hero-logo-wrap item">
            <img
              src="/assets/img/project-logos/essentials-logo.svg"
              alt="Essentials Logo"
              className="es-hero-logo"
            />
          </div>

          <h1 className="es-hero-title">Essentials</h1>
          <MadeByChip />

          <p className="es-hero-tagline">
            Tools for Android nerds. Customize your Android experience with
            visual, functional and utility tools — all in one place.
          </p>

          <div className="es-hero-actions">
            <a
              href="https://github.com/sameerasw/essentials/releases/latest/download/app-release.apk"
              target="_blank"
              rel="noopener noreferrer"
              className="es-btn es-btn-primary"
            >
              <span className="material-symbols-rounded">download</span>
              Install
            </a>
            <a
              href="https://reddit.com/r/MadebySameerasw"
              target="_blank"
              rel="noopener noreferrer"
              className="es-btn es-btn-ghost"
            >
              <span className="material-symbols-rounded">group</span>
              Join Community
            </a>

            <a
              href="https://t.me/tidwib"
              target="_blank"
              rel="noopener noreferrer"
              className="es-btn es-btn-ghost"
            >
              <span className="material-symbols-rounded">chat</span>
              Join Chat
            </a>
          </div>
        </section>

        {/* ── FEATURES ── */}
        <section className="es-features-section item" id="features">
          <div className="es-wrap" style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <span className="es-section-label">
              <span className="material-symbols-rounded">auto_awesome</span>
              Features
            </span>
          </div>
          <FeatureChips 
            features={[
              "Google Maps power saving mode",
              "Button remap",
              "Your Android",
              "App freezing",
              "App updater",
              "Statusbar icon customization",
              "Animation and scale customization",
              "Notifcation & Edge lighting",
              "Custom quick settings tiles",
              "Material 3 Expressive UI",
              "Are we there yet?",
              "Camera watermark",
              "Battery widget",
              "Sound mode tile",
              "Music glance",
              "Call accept, decline vibrations",
              "App lock",
              "Flashlight pulse",
              "Link Actions",
              "Keyboard",
              "Empty screen off widget",
              "Caffeinate",
              "Dynamic night light",
              "WearOS calendar sync",
              "Private DNS QS tile",
              "DIY - Automations"
            ]} 
          />
        </section>
        {/* ── UPDATES ── */}
        {notes.length > 0 && (
          <section className="es-section es-observe" id="updates">
            <div className="es-wrap">
              <span className="es-section-label">
                <span className="material-symbols-rounded">history</span>
                Updates
              </span>
              <p className="es-section-desc">
                Latest improvements and features added to Essentials.
              </p>
            </div>
            <div style={{ marginTop: "2rem" }}>
              <Suspense fallback={null}>
                <ReleaseFeed
                  notes={notes}
                  filter="essentials"
                  hideGradient={true}
                />
              </Suspense>
            </div>
          </section>
        )}

        {/* ── SCREENSHOTS ── */}
        <section id="showcase">
          <ScreenshotsCarousel />
        </section>

        {/* ── RETURN HOME ── */}
        <section
          className="es-wrap es-observe"
          style={{ paddingBottom: "2rem" }}
        >
          <a href="/" className="es-back-card">
            <img
              src="/assets/img/logo-mini.png"
              alt="sameerasw.com"
              className="es-back-avatar"
            />
            <div className="es-back-content">
              <span className="es-back-title">More Made by sameerasw.com</span>
              <span className="es-back-subtitle">
                Explore other apps and projects
              </span>
            </div>
            <span className="material-symbols-rounded es-back-arrow">
              arrow_forward
            </span>
          </a>
        </section>

        {/* ── FOOTER ── */}
        <footer className="es-footer es-observe">
          <div className="es-wrap">
            <div className="es-footer-inner">
              <a href="/" className="es-footer-brand">
                <img
                  src="/assets/img/project-logos/essentials-logo.svg"
                  alt="Essentials"
                />
                <span className="es-footer-brand-name">Essentials</span>
              </a>

              <span className="es-footer-copy">
                &copy; {new Date().getFullYear()} sameerasw.com
              </span>
            </div>
          </div>
        </footer>
      </div>
    </EssentialsClient>
  );
}
