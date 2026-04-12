"use client";

import { useEffect, useRef } from "react";

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorTextRef = useRef<HTMLDivElement>(null);

  const isTouchDevice = typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;

  useEffect(() => {
    if (isTouchDevice) return;
    const cursor = cursorRef.current;
    const cursorText = cursorTextRef.current;
    if (!cursor || !cursorText) return;

    const moveCursor = (e: MouseEvent) => {
      const mouseY = e.clientY;
      const mouseX = e.clientX;

      cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;

      // don't let cursorText go outside the screen
      if (mouseX > window.innerWidth - cursorText.clientWidth) {
        cursorText.style.left = -cursorText.clientWidth + "px";
      } else {
        cursorText.style.left = "50px";
      }

      if (mouseY > window.innerHeight - cursorText.clientHeight) {
        cursorText.style.top = -cursorText.clientHeight + "px";
      } else {
        cursorText.style.top = "50px";
      }
    };

    const updateTitle = (titleText: string | null) => {
      if (titleText) {
        cursorText.style.scale = "1";
        if (
          titleText.includes(".jpg") ||
          titleText.includes(".png") ||
          titleText.includes(".jpeg")
        ) {
          cursorText.style.backgroundImage = `url(${titleText})`;
          cursorText.innerHTML = "";
          cursorText.classList.add("image-view");
        } else {
          cursorText.style.backgroundImage = "none";
          cursorText.classList.remove("image-view");
          cursorText.innerHTML = titleText;
        }
      } else {
        cursorText.style.scale = "0";
      }
    };

    const handleMouseEnterLink = (e: Event) => {
      const link = e.currentTarget as HTMLElement;
      cursor.classList.add("blur-mini");
      cursor.classList.add("cursor-grow");
      updateTitle(link.getAttribute("data-title"));
    };

    const handleMouseLeaveLink = () => {
      cursor.classList.remove("blur-mini");
      cursor.classList.remove("cursor-grow");
      updateTitle("");
    };

    const handleMouseEnterHoverable = () => {
      cursor.style.display = "none";
      document.body.style.cursor = "pointer";
    };

    const handleMouseLeaveHoverable = () => {
      cursor.style.display = "block";
      document.body.style.cursor = "none";
    };

    window.addEventListener("mousemove", moveCursor);

    // Apply listeners to current elements
    const attachListeners = () => {
      const links = document.querySelectorAll("a, button");
      const hoverables = document.querySelectorAll(".hover-state");

      links.forEach((link) => {
        link.addEventListener("mouseenter", handleMouseEnterLink);
        link.addEventListener("mouseleave", handleMouseLeaveLink);
      });

      hoverables.forEach((hoverable) => {
        hoverable.addEventListener("mouseenter", handleMouseEnterHoverable);
        hoverable.addEventListener("mouseleave", handleMouseLeaveHoverable);
      });

      return () => {
        links.forEach((link) => {
          link.removeEventListener("mouseenter", handleMouseEnterLink);
          link.removeEventListener("mouseleave", handleMouseLeaveLink);
        });

        hoverables.forEach((hoverable) => {
          hoverable.removeEventListener(
            "mouseenter",
            handleMouseEnterHoverable,
          );
          hoverable.removeEventListener(
            "mouseleave",
            handleMouseLeaveHoverable,
          );
        });
      };
    };

    let cleanupListeners = attachListeners();

    // Re-attach listeners if DOM changes (Next.js route changes)
    const observer = new MutationObserver(() => {
      cleanupListeners();
      cleanupListeners = attachListeners();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      cleanupListeners();
      observer.disconnect();
    };
  }, []);

  if (isTouchDevice) return null;

  return (
    <div
      className="cursor rounded move blur cursor-normal"
      id="cursor"
      ref={cursorRef}
    >
      <div id="cursor-text" ref={cursorTextRef}></div>
    </div>
  );
}
