import { Suspense } from "react";
import Link from "next/link";
import { getAllReleaseNotes } from "@/lib/releaseNotes";
import ReleaseFeed from "@/components/ReleaseFeed";
import AirSyncClient from "@/components/airsync/AirSyncClient";
import MadeByChip from "@/components/MadeByChip";
import "@/styles/airsync/airsync.css";

export default async function AirSync() {
  const allNotes = await getAllReleaseNotes();
  const notes = allNotes.filter(n => n.app === "airsync");

  return (
    <AirSyncClient>
      <div className="airsync-page">
        {/* ── HERO ── */}
        <section className="as-hero" id="intro">
          <div className="as-hero-logo-wrap">
            <img
              src="/assets/img/articles/airsync/airsync-logo.png"
              alt="AirSync"
              className="as-hero-logo"
            />
          </div>

          <h1 className="as-hero-title">
            Air<span className="as-accent-word">Sync</span>
          </h1>
          <MadeByChip />

          <p className="as-hero-tagline">
            Seamless continuity between Android&nbsp;&amp;&nbsp;macOS —
            notifications, clipboard, media, mirroring and more, all over your
            local&nbsp;network.
          </p>

          <div className="as-hero-actions">
            <a
              href="https://play.google.com/store/apps/details?id=com.sameerasw.airsync"
              target="_blank"
              rel="noopener noreferrer"
              className="as-btn as-btn-android as-btn-icon"
            >
              <img
                src="https://img.icons8.com/material-two-tone/24/android-os.png"
                alt=""
                aria-hidden="true"
                className="as-os-icon-dynamic"
              />
              Get on Android
            </a>
            <a
              href="https://github.com/sameerasw/airsync-mac/releases/latest"
              target="_blank"
              rel="noopener noreferrer"
              className="as-btn as-btn-macos as-btn-icon"
            >
              <img
                src="https://img.icons8.com/material-two-tone/24/mac-os.png"
                alt=""
                aria-hidden="true"
                className="as-os-icon-dynamic"
              />
              Download for macOS
            </a>
            <Link
              href="/docs/airsync"
              className="as-btn as-btn-ghost"
            >
              <span className="material-symbols-rounded">book_2</span>
              Docs
            </Link>
          </div>

          <div className="as-hero-preview">
            <div className="as-hero-preview-inner">
              <img
                src="/assets/img/articles/airsync/app.jpg"
                alt="AirSync app preview"
              />
            </div>
          </div>

          <span className="as-hero-badge">
            <span className="material-symbols-rounded">favorite</span>
            Open Source ・ Built with the community
          </span>
        </section>

        {/* ── UPDATES ── */}
        {notes.length > 0 && (
          <section className="as-section as-observe" id="updates" style={{ paddingBottom: 0 }}>
            <div className="as-wrap">
              <span className="as-section-label">
                <span className="material-symbols-rounded">history</span>
                Updates
              </span>
              <p className="as-section-desc">
                Check out what's new!
              </p>
            </div>
            <div style={{ marginTop: '2rem' }}>
              <Suspense fallback={null}>
                <ReleaseFeed notes={notes} filter="airsync" hideGradient={true} />
              </Suspense>
            </div>
          </section>
        )}

        {/* ── FEATURES ── */}
        <section className="as-section as-features" id="features">
          <div className="as-wrap">
            <span className="as-section-label">
              <span className="material-symbols-rounded">auto_awesome</span>
              Features
            </span>
            <p className="as-section-desc">
              AirSync bridges the gap between Android and macOS with features
              that keep evolving to feel native.
            </p>

            <div className="as-bento">
              {/* Hero card — Android Mirror */}
              <div className="as-card as-card-hero">
                <div className="as-card-img" style={{ minHeight: 200 }}>
                  <img
                    src="/assets/img/articles/airsync/mirror.jpg"
                    alt="Android Mirror feature"
                  />
                </div>
                <div className="as-card-content">
                  <div className="as-card-icon">
                    <span className="material-symbols-rounded">devices</span>
                  </div>
                  <h3>
                    <del style={{ opacity: 0.45 }}>!Phone</del> Android Mirror
                  </h3>
                  <p>
                    Mirror your entire Android display to macOS wirelessly. Use
                    your phone apps from your Mac — no USB required, no
                    proprietary hardware.
                  </p>
                </div>
              </div>

              {/* Notification Sync */}
              <div className="as-card as-card-mirror">
                <div className="as-card-img" style={{ minHeight: 140 }}>
                  <img
                    src="/assets/img/articles/airsync/notif.jpg"
                    alt="Notification sync"
                  />
                </div>
                <div className="as-card-content">
                  <div className="as-card-icon">
                    <span className="material-symbols-rounded">
                      notifications
                    </span>
                  </div>
                  <h3>Notification Sync</h3>
                  <p>
                    Real-time, grouped &amp; stacked — every alert from your
                    phone, right on your Mac.
                  </p>
                </div>
              </div>

              {/* Reply */}
              <div className="as-card as-card-notif">
                <div className="as-card-img" style={{ minHeight: 120 }}>
                  <img
                    src="/assets/img/articles/airsync/reply.jpg"
                    alt="Reply to notifications"
                  />
                </div>
                <div className="as-card-content">
                  <div className="as-card-icon">
                    <span className="material-symbols-rounded">reply</span>
                  </div>
                  <h3>Reply to Notifications</h3>
                  <p>
                    Type replies and dismiss or swipe away alerts — all from
                    macOS.
                  </p>
                </div>
              </div>

              {/* Clipboard */}
              <div className="as-card as-card-clipboard">
                <div className="as-card-content">
                  <div className="as-card-icon">
                    <span className="material-symbols-rounded">
                      content_copy
                    </span>
                  </div>
                  <h3>Clipboard Sync</h3>
                  <p>
                    Copy on Mac, paste on Android. Or send text the other way —
                    instantly.
                  </p>
                </div>
              </div>

              {/* Media Control */}
              <div className="as-card as-card-media">
                <div className="as-card-img" style={{ minHeight: 120 }}>
                  <img
                    src="/assets/img/articles/airsync/media.jpg"
                    alt="Media control"
                  />
                </div>
                <div className="as-card-content">
                  <div className="as-card-icon">
                    <span className="material-symbols-rounded">
                      play_circle
                    </span>
                  </div>
                  <h3>Media Control</h3>
                  <p>
                    Glance at now-playing and control playback directly from
                    your Mac.
                  </p>
                </div>
              </div>

              {/* Send Files */}
              <div className="as-card as-card-files">
                <div className="as-card-img" style={{ minHeight: 120 }}>
                  <img
                    src="/assets/img/articles/airsync/file.jpg"
                    alt="Send files"
                  />
                </div>
                <div className="as-card-content">
                  <div className="as-card-icon">
                    <span className="material-symbols-rounded">
                      folder_open
                    </span>
                  </div>
                  <h3>Send Files</h3>
                  <p>
                    Transfer files from your Mac to Android and receive them
                    back.
                  </p>
                </div>
              </div>

              {/* Desktop Mode */}
              <div className="as-card as-card-desktop">
                <div className="as-card-img" style={{ minHeight: 130 }}>
                  <img
                    src="/assets/img/articles/airsync/desktop.jpg"
                    alt="Desktop mode"
                  />
                </div>
                <div className="as-card-content">
                  <div className="as-card-icon">
                    <span className="material-symbols-rounded">
                      desktop_mac
                    </span>
                  </div>
                  <h3>Desktop Mode</h3>
                  <p>
                    Wireless DEX for everyone. Turn your Android into a full
                    desktop experience.
                  </p>
                </div>
              </div>

              {/* Wallpaper View */}
              <div className="as-card as-card-wallpaper">
                <div className="as-card-img" style={{ minHeight: 120 }}>
                  <img
                    src="/assets/img/articles/airsync/wallpaper.jpg"
                    alt="Wallpaper view"
                  />
                </div>
                <div className="as-card-content">
                  <div className="as-card-icon">
                    <span className="material-symbols-rounded">wallpaper</span>
                  </div>
                  <h3>Wallpaper View</h3>
                  <p>
                    Glimpse your Android wallpaper and album art from macOS at a
                    glance.
                  </p>
                </div>
              </div>

              {/* Coming Soon */}
              <div className="as-card as-card-reply as-card-soon">
                <div className="as-card-content">
                  <div className="as-card-icon">
                    <span className="material-symbols-rounded">
                      hourglass_top
                    </span>
                  </div>
                  <h3>More on the way&hellip;</h3>
                  <p>
                    Follow the project for early access to upcoming features and
                    join the community to shape what&rsquo;s next.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── TRUST / SECURITY ── */}
        <section className="as-trust as-section as-observe" id="trust">
          <div className="as-wrap">
            <span className="as-section-label">
              <span className="material-symbols-rounded">shield</span>
              Built with trust
            </span>
            <h2 className="as-section-title">Private by design</h2>
            <p className="as-section-desc" style={{ marginBottom: "2.5rem" }}>
              AirSync stays on your secure network. Keep it local or connect via
              your secure network like Tailscale.
            </p>
            <div className="as-trust-grid">
              <div className="as-trust-card">
                <div className="as-trust-icon">
                  <span className="material-symbols-rounded">key</span>
                </div>
                <div className="as-trust-text">
                  <h4>AES End-to-End Encryption</h4>
                  <p>
                    Every sync operation is secured with AES encryption — your
                    notifications, files, and clipboard are only readable by
                    you.
                  </p>
                </div>
              </div>
              <div className="as-trust-card">
                <div className="as-trust-icon">
                  <span className="material-symbols-rounded">wifi_off</span>
                </div>
                <div className="as-trust-text">
                  <h4>Zero Cloud, Zero Servers</h4>
                  <p>
                    Everything runs over your local Wi-Fi or your secure network
                    like Tailscale.
                  </p>
                </div>
              </div>
              <div className="as-trust-card">
                <div className="as-trust-icon">
                  <span className="material-symbols-rounded">code</span>
                </div>
                <div className="as-trust-text">
                  <h4>Fully Open Source</h4>
                  <p>
                    Both the Android and macOS apps are open source. Audit,
                    fork, and build upon the project freely.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── COMMUNITY ── */}
        <section className="as-community as-section as-observe" id="community">
          <div className="as-wrap">
            <span className="as-section-label">
              <span className="material-symbols-rounded">group</span>
              Community
            </span>
            <h2 className="as-section-title">Made with the community</h2>
            <p className="as-section-desc">
              Get early access, share feedback, and help shape the future of
              AirSync.
            </p>

            <div className="as-community-grid">
              <a
                href="https://reddit.com/r/airsync"
                target="_blank"
                rel="noopener noreferrer"
                className="as-community-card as-community-card-reddit"
              >
                <div className="as-community-card-top">
                  <div className="as-community-card-icon">
                    <span className="material-symbols-rounded">forum</span>
                  </div>
                  <div>
                    <div className="as-community-card-name">r/AirSync</div>
                    <div className="as-community-card-handle">
                      reddit.com/r/airsync
                    </div>
                  </div>
                </div>
                <p>
                  The central hub for discussions, bug reports, feature ideas,
                  and community showcases. Join the conversation.
                </p>
                <span className="as-community-card-arrow">
                  Visit subreddit
                  <span className="material-symbols-rounded">
                    arrow_forward
                  </span>
                </span>
              </a>

              <a
                href="https://twitter.com/sameeraswdotcom"
                target="_blank"
                rel="noopener noreferrer"
                className="as-community-card as-community-card-twitter"
              >
                <div className="as-community-card-top">
                  <div className="as-community-card-icon">
                    <span className="material-symbols-rounded">tag</span>
                  </div>
                  <div>
                    <div className="as-community-card-name">𝕏 / Twitter</div>
                    <div className="as-community-card-handle">
                      @sameeraswdotcom
                    </div>
                  </div>
                </div>
                <p>
                  Follow for announcements, sneak peeks, and updates on AirSync
                  and other projects.
                </p>
                <span className="as-community-card-arrow">
                  Follow on 𝕏
                  <span className="material-symbols-rounded">
                    arrow_forward
                  </span>
                </span>
              </a>
            </div>
          </div>
        </section>

        {/* ── OSS ── */}
        <section className="as-oss as-section as-observe" id="oss">
          <div className="as-wrap">
            <span className="as-section-label">
              <span className="material-symbols-rounded">code</span>
              Open Source
            </span>
            <h2 className="as-section-title">Built in the open</h2>
            <p className="as-section-desc">
              Both sides of AirSync are open source. Explore, contribute, or
              build on top of the codebase.
            </p>

            <div className="as-oss-inner">
              <a
                href="https://github.com/sameerasw/airsync-mac"
                target="_blank"
                rel="noopener noreferrer"
                className="as-repo-card"
              >
                <div className="as-repo-card-header">
                  <span className="material-symbols-rounded">terminal</span>
                  <span className="as-repo-name">airsync-mac</span>
                </div>
                <p className="as-repo-desc">
                  The native macOS companion app built with SwiftUI. Handles
                  notification rendering, clipboard bridging, media controls,
                  and the local network server.
                </p>
                <div className="as-repo-tags">
                  <span className="as-repo-tag">Swift</span>
                  <span className="as-repo-tag">SwiftUI</span>
                  <span className="as-repo-tag">macOS</span>
                </div>
              </a>

              <a
                href="https://github.com/sameerasw/airsync-android"
                target="_blank"
                rel="noopener noreferrer"
                className="as-repo-card"
              >
                <div className="as-repo-card-header">
                  <span className="material-symbols-rounded">smartphone</span>
                  <span className="as-repo-name">airsync-android</span>
                </div>
                <p className="as-repo-desc">
                  The Android client built with Jetpack Compose. Manages
                  notification access, screen mirroring, file transfer, and the
                  device-side network layer.
                </p>
                <div className="as-repo-tags">
                  <span className="as-repo-tag">Kotlin</span>
                  <span className="as-repo-tag">Jetpack Compose</span>
                  <span className="as-repo-tag">Android</span>
                </div>
              </a>
            </div>
          </div>
        </section>

        {/* ── AIRSYNC+ ── */}
        <section className="as-pricing as-section as-observe" id="airsync-plus">
          <div className="as-wrap">
            <span className="as-section-label">
              <span className="material-symbols-rounded">stars</span>
              AirSync+
            </span>
            <h2 className="as-section-title">Take it to the next level</h2>
            <p className="as-section-desc">
              Unlock advanced features like Android Mirror, Desktop Mode, and
              more. Support the project or build it yourself.
            </p>

            <div className="as-pricing-grid">
              {/* Free */}
              <div className="as-pricing-card">
                <h3>AirSync</h3>
                <div className="as-price">Free</div>
                <p>The essentials you need to connect your devices.</p>
                <ul className="as-pricing-features">
                  <li>
                    <span className="material-symbols-rounded">check</span>{" "}
                    Notification Sync
                  </li>
                  <li>
                    <span className="material-symbols-rounded">check</span>{" "}
                    Clipboard Bridge
                  </li>
                  <li>
                    <span className="material-symbols-rounded">check</span>{" "}
                    Wallpaper View
                  </li>
                  <li>
                    <span className="material-symbols-rounded">check</span>{" "}
                    Basic Connectivity
                  </li>
                </ul>
                <div className="as-pricing-action">
                  <span className="as-pricing-current">Current Version</span>
                </div>
              </div>

              {/* Membership */}
              <div className="as-pricing-card as-pricing-premium">
                <h3>AirSync+ Membership</h3>
                <div className="as-price">
                  $2.49<span className="as-price-mo">/mo</span>
                </div>
                <p>Access to all AirSync+ features with continuous updates.</p>
                <ul className="as-pricing-features">
                  <li>
                    <span
                      className="material-symbols-rounded"
                      style={{ color: "var(--as-text-soft)" }}
                    >
                      add
                    </span>{" "}
                    Everything in Free, plus:
                  </li>
                  <li>
                    <span className="material-symbols-rounded">check</span>{" "}
                    <strong>Android &amp; App Mirror</strong>
                  </li>
                  <li>
                    <span className="material-symbols-rounded">check</span>{" "}
                    <strong>Desktop Mode</strong>
                  </li>
                  <li>
                    <span className="material-symbols-rounded">check</span>{" "}
                    <strong>Media &amp; Call Controls</strong>
                  </li>
                  <li>
                    <span className="material-symbols-rounded">check</span>{" "}
                    <strong>File Browser</strong>
                  </li>
                </ul>
                <div className="as-pricing-action">
                  <a
                    href="https://store.sameerasw.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="as-btn as-btn-primary"
                  >
                    Subscribe
                  </a>
                </div>
              </div>

              {/* One Time */}
              <div className="as-pricing-card as-pricing-premium">
                <h3>AirSync+ One Time</h3>
                <div className="as-price">$50</div>
                <p>
                  Lifetime access to all current and future AirSync+ features.
                </p>
                <ul className="as-pricing-features">
                  <li>
                    <span
                      className="material-symbols-rounded"
                      style={{ color: "var(--as-text-soft)" }}
                    >
                      add
                    </span>{" "}
                    Everything in Free, plus:
                  </li>
                  <li>
                    <span className="material-symbols-rounded">check</span>{" "}
                    <strong>Android &amp; App Mirror</strong>
                  </li>
                  <li>
                    <span className="material-symbols-rounded">check</span>{" "}
                    <strong>Desktop Mode</strong>
                  </li>
                  <li>
                    <span className="material-symbols-rounded">check</span>{" "}
                    <strong>Media &amp; Call Controls</strong>
                  </li>
                  <li>
                    <span className="material-symbols-rounded">check</span>{" "}
                    <strong>File Browser</strong>
                  </li>
                </ul>
                <div className="as-pricing-action">
                  <a
                    href="https://store.sameerasw.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="as-btn as-btn-primary"
                  >
                    Buy Lifetime
                  </a>
                </div>
              </div>

              {/* Self Compile */}
              <div className="as-pricing-card">
                <h3>Self Compile</h3>
                <div className="as-price">Free</div>
                <p>
                  Compile the source code yourself. Use the SelfCompile build
                  scheme.
                </p>
                <ul className="as-pricing-features">
                  <li>
                    <span className="material-symbols-rounded">check</span>{" "}
                    <strong>All AirSync+ Features</strong>
                  </li>
                  <li>
                    <span className="material-symbols-rounded">check</span>{" "}
                    Development Support
                  </li>
                  <li>
                    <span className="material-symbols-rounded">check</span>{" "}
                    Manual Updates
                  </li>
                </ul>
                <div className="as-pricing-action">
                  <a
                    href="https://github.com/sameerasw/airsync-mac"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="as-btn as-btn-ghost"
                  >
                    View on GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── RETURN HOME ── */}
        <section className="as-wrap" style={{ paddingBottom: '2rem' }}>
          <a href="/" className="as-back-card">
            <img 
              src="/assets/img/logo-mini.png" 
              alt="sameerasw.com" 
              className="as-back-avatar" 
            />
            <div className="as-back-content">
              <span className="as-back-title">More Made by sameerasw.com</span>
              <span className="as-back-subtitle">Explore other apps and projects</span>
            </div>
            <span className="material-symbols-rounded as-back-arrow">arrow_forward</span>
          </a>
        </section>

        {/* ── FOOTER ── */}
        <footer className="as-footer">
          <div className="as-wrap">
            <div className="as-footer-inner">
              <a href="/" className="as-footer-brand">
                <img
                  src="/assets/img/articles/airsync/airsync-logo.png"
                  alt="AirSync"
                />
                <span className="as-footer-brand-name">AirSync</span>
              </a>

              <span className="as-footer-copy">
                &copy; {new Date().getFullYear()} sameerasw.com
              </span>
            </div>
          </div>
        </footer>
      </div>
    </AirSyncClient>
  );
}
