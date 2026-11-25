"use client";

import { useEffect, useRef, useState } from "react";

const LOGO_SRC = "/assets/img/project-logos/essentials-logo.svg";
const LAYER_ANGLES = [30, 24, 18, 12, 6];
const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

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

          await Promise.all(
            layers.map((g, i) =>
              g
                ? g.animate(
                    [
                      { transform: `rotate(${-LAYER_ANGLES[i]}deg)` },
                      { transform: "rotate(0deg)" },
                    ],
                    { duration: 1100, delay: (LAYER_ANGLES.length - 1 - i) * 60, easing: EASE, fill: "both" },
                  ).finished
                : Promise.resolve(),
            ),
          );
        }
        if (cancelled) return;

        const from = logo.getBoundingClientRect();
        const to = hero?.getBoundingClientRect();
        const anims: Promise<unknown>[] = [
          overlay.animate([{ backgroundColor: "var(--es-bg)" }, { backgroundColor: "transparent" }], {
            duration: 700,
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
        await Promise.all(anims);
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
      <div ref={logoRef} className="es-splash-logo" />
    </div>
  );
}
