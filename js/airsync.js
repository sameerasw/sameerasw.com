// AirSync - Simplified for notification CTA functionality only

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Add smooth scrolling for internal links
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

  // Initialize and update clock
  function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();

    // Convert to 12-hour format
    hours = hours % 12;
    if (hours === 0) hours = 12;

    // Format with leading zeros
    const formattedHours = hours.toString().padStart(2, "0");
    const formattedMinutes = minutes.toString().padStart(2, "0");

    // Update clock display
    const hoursElement = document.getElementById("clock-hours");
    const minutesElement = document.getElementById("clock-minutes");

    if (hoursElement) hoursElement.textContent = formattedHours;
    if (minutesElement) minutesElement.textContent = formattedMinutes;
  }

  // Update clock immediately and then every second
  updateClock();
  setInterval(updateClock, 1000);
});
