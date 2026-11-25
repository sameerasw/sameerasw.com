"use client";

import { useEffect, useRef, useState } from "react";

const LOGO_SRC = "/assets/img/project-logos/essentials-logo.svg";
const LAYER_ANGLES = [30, 24, 18, 12, 6];
const SPIN_MS = 1100;
const LOADING_CAP = 0.8;
const EASE ="cubic-bezier(0.22, 1, 0.36, 1)";

export default function EssentialsSplash() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const overlay = overlayRef.current;
    const logo = logoRef.current;
    if (!overlay || !logo) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hero = document.querySelector<HTMLElement>(".es-hero-logo");
    if (hero) hero.style.visibility = "hidden";
    document.documentElement.style.overflow = "hidden";

    let cancelled = false;
    const finish = () => {
      if (hero) hero.style.visibility = "";
      document.documentElement.style.overflow = "";
      setDone(true);
    };

    (async () => {
      try {
        const svgText = await fetch(LOGO_SRC).then((r) => r.text());
        if (cancelled) return;
        logo.innerHTML = svgText;
        const svg = logo.querySelector("svg");
        if (!svg) throw new Error("no svg");
        svg.setAttribute("width", "100%");
        svg.setAttribute("height", "100%");

        const layers = LAYER_ANGLES.map((_, i) =>
          svg.querySelector<SVGGElement>(`g[clip-path="url(#clip${i + 1}_2355_2573)"]`),
        );

        if (reduced) {
          await new Promise((r) => setTimeout(r, 300));
        } else {
          layers.forEach((g, i) => {
            if (!g) return;
            g.style.transformOrigin = "96px 96px";
            g.style.transformBox = "view-box";
            g.style.transform = `rotate(${-LAYER_ANGLES[i]}deg)`;
          });

          await logo.animate(
            [
              { opacity: 0, transform: "scale(0.6)" },
              { opacity: 1, transform: "scale(1)" },
            ],
            { duration: 450, easing: EASE, fill: "forwards" },
          ).finished;

          const total = SPIN_MS + (LAYER_ANGLES.length - 1) * 60;
          const spins = layers.flatMap((g, i) => {
            if (!g) return [];
            const a = g.animate(
              [{ transform: `rotate(${-LAYER_ANGLES[i]}deg)` }, { transform: "rotate(0deg)" }],
              { duration: SPIN_MS, delay: (LAYER_ANGLES.length - 1 - i) * 60, easing: "linear", fill: "both" },
            );
            a.pause();
            return [a];
          });

          let loaded = document.readyState === "complete";
          const onLoad = () => (loaded = true);
          if (!loaded) window.addEventListener("load", onLoad, { once: true });

          await new Promise<void>((resolve) => {
            let p = 0;
            let last = performance.now();
            const tick = (now: number) => {
              if (cancelled) return resolve();
              const dt = now - last;
              last = now;
              const rate = dt / total;
              p = loaded ? Math.min(1, p + rate) : p + rate * Math.max(0, (LOADING_CAP - p) / LOADING_CAP);
              const eased = 1 - Math.pow(1 - p, 3);
              spins.forEach((a) => (a.currentTime = eased * total));
              if (p >= 1) resolve();
              else requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          });
          window.removeEventListener("load", onLoad);
        }
        if (cancelled) return;

        const reveal: Promise<unknown>[] = [];

        document
          .querySelectorAll<HTMLElement>("#intro > :not(.es-hero-logo-wrap), #intro ~ section, .es-hero ~ *")
          .forEach((el, i) => {
            const r = el.getBoundingClientRect();
            if (r.top > window.innerHeight || r.bottom < 0) return;
            reveal.push(
              el.animate(
                [
                  { opacity: 0, transform: "translateY(40px)" },
                  { opacity: 1, transform: "translateY(0)" },
                ],
                { duration: 700, delay: 250 + i * 80, easing: EASE, fill: "backwards" },
              ).finished,
            );
          });
        const title = document.querySelector<HTMLElement>(".es-hero-title");
        if (title) {
          reveal.push(
            title.animate(
              [
                { fontVariationSettings: '"wdth" 100, "ROND" 100' },
                { fontVariationSettings: '"wdth" 150, "ROND" 100' },
              ],
              { duration: 1200, delay: 350, easing: EASE, fill: "backwards" },
            ).finished,
          );
        }
        const chip = document.querySelector<HTMLElement>("#intro .made-by-chip");
        const chipText = chip?.querySelector<HTMLElement>(":scope > span");
        if (chip && chipText) {
          const w = chipText.getBoundingClientRect().width;
          chipText.style.display = "inline-block";
          chipText.style.overflow = "hidden";
          chipText.style.whiteSpace = "nowrap";
          const opts = { duration: 800, delay: 600, easing: EASE, fill: "backwards" as const };
          reveal.push(
            chipText.animate(
              [
                { width: "0px", opacity: 0 },
                { width: `${w}px`, opacity: 1 },
              ],
              opts,
            ).finished,
            chip.animate(
              [
                { gap: "0rem", paddingRight: "0.2rem" },
                { gap: "0.75rem", paddingRight: "0.8rem" },
              ],
              opts,
            ).finished,
          );
        }
        const from = logo.getBoundingClientRect();
        const to = hero?.getBoundingClientRect();
        const anims: Promise<unknown>[] = [
          overlay.querySelector(".es-splash-bg")!.animate([{ opacity: 1 }, { opacity: 0 }], {
            duration: 900,
            delay: 150,
            easing: "ease",
            fill: "forwards",
          }).finished,
        ];
        if (to && to.width > 0 && to.bottom > 0 && to.top < window.innerHeight) {
          const dx = to.left + to.width / 2 - (from.left + from.width / 2);
          const dy = to.top + to.height / 2 - (from.top + from.height / 2);
          const s = to.width / from.width;
          anims.push(
            logo.animate(
              [
                { transform: "translate(0,0) scale(1)" },
                { transform: `translate(${dx}px, ${dy}px) scale(${s})` },
              ],
              { duration: 800, easing: EASE, fill: "forwards" },
            ).finished,
          );
        } else {
          anims.push(logo.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 400, fill: "forwards" }).finished);
        }
        await Promise.all([...anims, ...reveal]);
      } catch {
        // fall through to reveal
      }
      if (!cancelled) finish();
    })();

    return () => {
      cancelled = true;
      if (hero) hero.style.visibility = "";
      document.documentElement.style.overflow = "";
    };
  }, []);

  if (done) return null;

  return (
    <div ref={overlayRef} className="es-splash" aria-hidden="true">
      <div className="es-splash-bg" />
      <div ref={logoRef} className="es-splash-logo" />
    </div>
  );
}
