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

    const flower = document.querySelector<SVGSVGElement>(".es-bg-flower:not(.es-bg-cookie):not(.es-bg-burst)");
    const burst = document.querySelector<SVGSVGElement>(".es-bg-burst");
    const cookie = document.querySelector<SVGSVGElement>(".es-bg-cookie");
    const makeShape = (svg: SVGSVGElement | null, lobes: number, sharpness = 1) => {
      const path = svg?.querySelector("path");
      let last = -1;
      return (amp: number) => {
        if (!path || Math.abs(amp - last) < 0.0005) return;
        last = amp;
        const pts: string[] = [];
        for (let i = 0; i < 360; i++) {
          const t = (i / 360) * Math.PI * 2;
          const dip = Math.pow((1 - Math.cos(lobes * t)) / 2, sharpness);
          const r = 100 * (1 - 2 * amp * dip);
          pts.push(`${(100 + r * Math.cos(t)).toFixed(2)} ${(100 + r * Math.sin(t)).toFixed(2)}`);
        }
        path.setAttribute("d", `M${pts.join(" L")}Z`);
      };
    };
    const makeShapeFromPath = (svg: SVGSVGElement | null, d: string, size: number) => {
      const path = svg?.querySelector("path");
      if (!path) return () => {};
      const ref = document.createElementNS("http://www.w3.org/2000/svg", "path");
      ref.setAttribute("d", d);
      const len = ref.getTotalLength();
      const c = size / 2;
      const samples: { a: number; r: number }[] = [];
      let maxR = 0;
      for (let i = 0; i < 400; i++) {
        const p = ref.getPointAtLength((i / 400) * len);
        const r = Math.hypot(p.x - c, p.y - c);
        maxR = Math.max(maxR, r);
        samples.push({ a: Math.atan2(p.y - c, p.x - c), r });
      }
      let last = -1;
      return (depth: number) => {
        if (Math.abs(depth - last) < 0.002) return;
        last = depth;
        const pts = samples.map(({ a, r }) => {
          const rr = (100 / maxR) * (maxR - (maxR - r) * depth);
          return `${(100 + rr * Math.cos(a)).toFixed(2)} ${(100 + rr * Math.sin(a)).toFixed(2)}`;
        });
        path.setAttribute("d", `M${pts.join(" L")}Z`);
      };
    };
    const COOKIE_D =
      "M178.73 6.2068C238.87 -19.9132 299.91 41.1269 273.79 101.267L269.47 111.207C261.5 129.577 261.5 150.417 269.47 168.787L273.79 178.727C299.91 238.867 238.87 299.907 178.73 273.787L168.79 269.467C150.42 261.497 129.58 261.497 111.21 269.467L101.27 273.787C41.1281 299.907 -19.9139 238.867 6.20706 178.727L10.5261 168.787C18.5011 150.417 18.5011 129.577 10.5261 111.207L6.20706 101.267C-19.9139 41.1269 41.1281 -19.9132 101.27 6.2068L111.21 10.5269C129.58 18.4969 150.42 18.4969 168.79 10.5269L178.73 6.2068Z";
    const drawFlower = makeShape(flower, 12);
    const drawCookie = makeShapeFromPath(cookie, COOKIE_D, 280);
    const BURST_D =
      "M273.13 46.8625C261.25 34.988 234.19 40.8597 201.55 59.6813C191.77 23.2855 176.79 2.9362e-06 160 0C143.2 -2.9362e-06 128.22 23.2841 118.45 59.6779C85.7999 40.8581 58.75 34.9874 46.87 46.8614C35 58.7367 40.8699 85.7963 59.6899 118.446C23.2899 128.222 0 143.204 0 160C0 176.793 23.2801 191.773 59.6801 201.549C40.8501 234.2 34.98 261.261 46.85 273.137C58.73 285.013 85.7899 279.138 118.44 260.31C128.22 296.711 143.2 320 160 320C176.79 320 191.77 296.709 201.55 260.307C234.21 279.136 261.27 285.012 273.15 273.136C285.02 261.26 279.15 234.2 260.32 201.549C296.72 191.773 320 176.793 320 160C320 143.204 296.71 128.222 260.3 118.446C279.13 85.7966 285 58.7376 273.13 46.8625Z";
    const drawBurst = makeShapeFromPath(burst, BURST_D, 320);
    drawBurst(1);
    drawFlower(0.09);
    drawCookie(1);
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
      const soften = 1 - 0.75 * Math.min(1, Math.abs(boost) / 80);
      drawFlower(0.09 * soften);
      drawCookie(soften);
      drawBurst(soften);
      if (burst) burst.style.transform = `rotate(${angle}deg)`;
      if (cookie) cookie.style.transform = `rotate(${-angle}deg)`;
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
