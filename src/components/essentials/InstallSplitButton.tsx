"use client";

import { useEffect, useRef, useState } from "react";

const REPO = "sameerasw/essentials";

type Props = {
  version: string;
  noteSlug: string;
  releaseUrl: string;
};

export default function InstallSplitButton({ version, noteSlug, releaseUrl }: Props) {
  const [open, setOpen] = useState(false);
  const [betaUrl, setBetaUrl] = useState(`https://github.com/${REPO}/releases`);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch(`https://api.github.com/repos/${REPO}/releases?per_page=1`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d?.[0]?.html_url && setBetaUrl(d[0].html_url))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const openNote = () => {
    setOpen(false);
    window.dispatchEvent(new CustomEvent("open-release-note", { detail: noteSlug }));
  };

  return (
    <div className="es-split" ref={rootRef}>
      <a
        href={`https://github.com/${REPO}/releases/latest/download/app-release.apk`}
        target="_blank"
        rel="noopener noreferrer"
        className="es-split-main"
      >
        <span className="material-symbols-rounded">download</span>
        Install
        <span className="es-split-version">{version}</span>
      </a>
      <button
        type="button"
        className={`es-split-toggle${open ? " is-open" : ""}`}
        aria-label="More install options"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <span className="material-symbols-rounded">keyboard_arrow_down</span>
      </button>

      <div className={`es-menu${open ? " is-open" : ""}`} role="menu">
        <button type="button" role="menuitem" className="es-menu-item" onClick={openNote}>
          <span className="material-symbols-rounded">description</span>
          View release note
        </button>
        <a role="menuitem" className="es-menu-item" href={releaseUrl} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>
          <span className="material-symbols-rounded">code</span>
          View on GitHub
        </a>
        <a role="menuitem" className="es-menu-item" href={betaUrl} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>
          <span className="material-symbols-rounded">science</span>
          Help testing Beta
        </a>
      </div>
    </div>
  );
}
