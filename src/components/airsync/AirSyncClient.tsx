"use client";

import { useEffect, useRef } from "react";

export default function AirSyncClient({ children }: { children: React.ReactNode }) {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // 1. Handling .as-observe elements (Sections)
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

    document.querySelectorAll(".as-observe").forEach((el) => {
      (el as HTMLElement).style.opacity = "0";
      (el as HTMLElement).style.transform = "translateY(28px)";
      (el as HTMLElement).style.transition =
        "opacity 0.55s ease, transform 0.55s ease";
      observerRef.current?.observe(el);
    });

    // 2. Handling .item elements (Like Release Cards)
    // This replicates the sequential reveal from the home page
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

    items.forEach((item) => {
      item.style.opacity = "0";
      item.style.transform = "translateY(20px)";
      item.style.transition = "opacity 0.5s ease-out, transform 0.5s ease-out, scale 0.3s ease-out";
    });

    // Small delay before starting items animation
    setTimeout(animateItems, 300);

    return () => observerRef.current?.disconnect();
  }, []);

  return <>{children}</>;
}
