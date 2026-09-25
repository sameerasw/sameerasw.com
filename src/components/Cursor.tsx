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

    const enterLink = (link: HTMLElement) => {
      cursor.classList.add("blur-mini");
      cursor.classList.add("cursor-grow");
      updateTitle(link.getAttribute("data-title"));
    };

    const leaveLink = () => {
      cursor.classList.remove("blur-mini");
      cursor.classList.remove("cursor-grow");
      updateTitle("");
    };

    const enterHoverable = () => {
      cursor.style.display = "none";
      document.body.style.cursor = "pointer";
    };

    const leaveHoverable = () => {
      cursor.style.display = "block";
      document.body.style.cursor = "none";
    };

    // Delegated so elements added or re-rendered later never leave the cursor stuck
    let currentLink: HTMLElement | null = null;
    let currentHoverable: HTMLElement | null = null;

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target instanceof Element ? e.target : null;
      const link = target?.closest<HTMLElement>("a, button, .contact-chip") ?? null;
      const hoverable = target?.closest<HTMLElement>(".hover-state") ?? null;

      if (link !== currentLink) {
        if (currentLink) leaveLink();
        currentLink = link;
        if (link) enterLink(link);
      }

      if (hoverable !== currentHoverable) {
        if (currentHoverable) leaveHoverable();
        currentHoverable = hoverable;
        if (hoverable) enterHoverable();
      }
    };

    const handleMouseLeaveWindow = () => {
      if (currentLink) leaveLink();
      if (currentHoverable) leaveHoverable();
      currentLink = null;
      currentHoverable = null;
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseover", handleMouseOver);
    document.documentElement.addEventListener("mouseleave", handleMouseLeaveWindow);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleMouseOver);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeaveWindow);
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
