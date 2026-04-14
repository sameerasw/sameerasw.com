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

    return () => observerRef.current?.disconnect();
  }, []);

  return <>{children}</>;
}
