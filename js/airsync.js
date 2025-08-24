// AirSync Moodboard - Simple interactions

document.addEventListener("DOMContentLoaded", () => {
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
});
