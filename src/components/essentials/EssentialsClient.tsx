"use client";

import { useEffect, useRef } from "react";

export default function EssentialsClient({ children }: { children: React.ReactNode }) {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // 1. Handling .es-observe elements (Sections)
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.opacity = "1";
            (entry.target as HTMLElement).style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" },
    );

    document.querySelectorAll(".es-observe").forEach((el) => {
      (el as HTMLElement).style.opacity = "0";
      (el as HTMLElement).style.transform = "translateY(28px)";
      (el as HTMLElement).style.transition =
        "opacity 0.6s ease, transform 0.6s ease";
      observerRef.current?.observe(el);
    });

    // 2. Handling .item elements (Like Release Cards)
    const items = document.querySelectorAll(".item") as NodeListOf<HTMLElement>;
    let i = 0;

    const animateItems = () => {
      if (i < items.length) {
        items[i].style.opacity = "1";
        items[i].style.transform = "translateY(0)";
        i++;
        setTimeout(animateItems, 120);
      }
    };

    // Small delay before starting items animation
    setTimeout(animateItems, 300);

    const flower = document.querySelector<SVGSVGElement>(".es-bg-flower");
    const flowerPath = flower?.querySelector("path");
    let lastAmp = -1;
    const drawFlower = (amp: number) => {
      if (!flowerPath || Math.abs(amp - lastAmp) < 0.0005) return;
      lastAmp = amp;
      const pts: string[] = [];
      for (let i = 0; i < 360; i++) {
        const t = (i / 360) * Math.PI * 2;
        const r = (100 * (1 + amp * Math.cos(12 * t))) / (1 + amp);
        pts.push(`${(100 + r * Math.cos(t)).toFixed(2)} ${(100 + r * Math.sin(t)).toFixed(2)}`);
      }
      flowerPath.setAttribute("d", `M${pts.join(" L")}Z`);
    };
    drawFlower(0.09);
    const scroller = document.querySelector<HTMLElement>(".essentials-page");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let angle = 0;
    let boost = 0;
    let dir = 1;
    let lastY = scroller?.scrollTop ?? 0;
    let lastT = performance.now();
    const onScroll = () => {
      if (!scroller) return;
      const dy = scroller.scrollTop - lastY;
      lastY = scroller.scrollTop;
      boost = Math.max(-120, Math.min(120, boost + dy * 0.25));
      if (dy !== 0) dir = Math.sign(dy);
    };
    const spin = (now: number) => {
      const dt = Math.min(0.05, (now - lastT) / 1000);
      lastT = now;
      boost *= Math.exp(-dt * 1.6);
      angle = (angle + (dir * 360 / 140 + boost) * dt) % 360;
      if (flower) flower.style.transform = `rotate(${angle}deg)`;
      drawFlower(0.09 * (1 - 0.75 * Math.min(1, Math.abs(boost) / 80)));
      raf = requestAnimationFrame(spin);
    };
    if (flower && !reduced) {
      scroller?.addEventListener("scroll", onScroll, { passive: true });
      raf = requestAnimationFrame(spin);
    }

    return () => {
      observerRef.current?.disconnect();
      cancelAnimationFrame(raf);
      scroller?.removeEventListener("scroll", onScroll);
    };
  }, []);

  return <>{children}</>;
}
