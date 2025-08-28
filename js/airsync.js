// AirSync Moodboard - Simple interactions

document.addEventListener("DOMContentLoaded", () => {
  const isAirSync = document.body.classList.contains("airsync-page");
  const scrollContainer = document.getElementById("airsync-scroll");

  if (isAirSync && scrollContainer) {
    const enableHorizontal = () => window.innerWidth > 768; // desktop only
    // Wheel -> horizontal scroll
    scrollContainer.addEventListener(
      "wheel",
      (e) => {
        if (!enableHorizontal()) return; // allow normal on mobile
        // allow pinch zoom (ctrlKey) default
        if (e.ctrlKey) return;
        if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
          e.preventDefault();
          scrollContainer.scrollLeft += e.deltaY * 1.1;
        }
      },
      { passive: false }
    );

    // Keyboard arrows for accessibility
    window.addEventListener("keydown", (e) => {
      if (!enableHorizontal()) return;
      const step = 120;
      if (["ArrowDown", "PageDown"].includes(e.key)) {
        e.preventDefault();
        scrollContainer.scrollLeft += step;
      } else if (["ArrowUp", "PageUp"].includes(e.key)) {
        e.preventDefault();
        scrollContainer.scrollLeft -= step;
      } else if (e.key === "Home") {
        scrollContainer.scrollTo({ left: 0, behavior: "smooth" });
      } else if (e.key === "End") {
        scrollContainer.scrollTo({
          left: scrollContainer.scrollWidth,
          behavior: "smooth",
        });
      }
    });
  }
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Add click interactions for tiles
  document.querySelectorAll(".tile").forEach((tile) => {
    tile.addEventListener("click", function (e) {
      // Prevent click on links within tiles
      if (e.target.tagName === "A" || e.target.closest("a")) {
        return;
      }

      // Add a subtle animation on click
      this.style.transform = "scale(0.95)";
      setTimeout(() => {
        this.style.transform = "";
      }, 150);
    });
  });

  // --- Image Preloader for tile backgrounds ---
  document.querySelectorAll(".tile").forEach((tile) => {
    if (!tile.querySelector(".tile-bg-preload")) {
      const preload = document.createElement("div");
      preload.className = "tile-bg-preload";
      tile.insertBefore(preload, tile.firstChild);
    }

    const style = getComputedStyle(tile);
    const bgImage = style.backgroundImage;
    if (bgImage && bgImage !== "none") {
      const urlMatch = bgImage.match(/url\(["']?([^"')]+)["']?\)/);
      if (urlMatch) {
        const img = new window.Image();
        img.src = urlMatch[1];
        img.onload = () => {
          tile.classList.add("loaded");
        };
      } else {
        tile.classList.add("loaded");
      }
    } else {
      tile.classList.add("loaded");
    }
  });
});
