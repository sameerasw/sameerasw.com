const SHEET_ID = "1XKg8po28hZK_wx7a1e9KRmAoNcUFShbMEH8zJdvbjjE";
const MAX_ENTRIES = 7;
const MAX_BRIEF_LENGTH = 100;
const MAX_LEARNED_LENGTH = 80;

function parseMarkdown(text = "") {
  return text
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>');
}

function createChip(text) {
  return `<span class="chip">${text.trim()}</span>`;
}

function formatDate(dateStr) {
  const parts = dateStr.split("/");
  if (parts.length === 3) {
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const year = 2000 + parseInt(parts[2], 10);
    const date = new Date(year, month, day);
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    return `${daysOfWeek[date.getDay()]}, ${months[date.getMonth()]} ${day}`;
  }
  return dateStr;
}

function truncateText(text, maxLength) {
  return text.length <= maxLength ? text : text.substring(0, maxLength) + "...";
}

function createPopupOverlay() {
  const overlay = document.createElement("div");
  overlay.className = "mood-popup-overlay";
  overlay.innerHTML = `
    <div class="mood-popup">
      <button class="close-btn"><span class="material-symbols-rounded">close</span></button>
      <div class="popup-content"></div>
    </div>`;

  document.body.appendChild(overlay);

  // Close on outside click
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closePopup();
  });

  // Close on button click
  overlay.querySelector(".close-btn").addEventListener("click", closePopup);

  // Close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay.classList.contains("active")) {
      closePopup();
    }
  });

  return overlay;
}

function openPopup(entry) {
  let overlay =
    document.querySelector(".mood-popup-overlay") || createPopupOverlay();

  overlay.querySelector(".popup-content").innerHTML = `
    <div class="mood-emoji">${entry.mood || "🙂"}</div>
    <h2>${formatDate(entry.date || "")}</h2>
    <p>${parseMarkdown(entry.brief || "")}</p>
    ${
      entry.shows
        ? `<div class="chips"><span class="movie-icon">⏯️</span>${entry.shows
            .split(",")
            .map(createChip)
            .join("")}</div>`
        : ""
    }
    ${
      entry.learned
        ? `<p><strong>Learned:</strong> ${parseMarkdown(entry.learned)}</p>`
        : ""
    }`;

  overlay.classList.add("active");
}

function closePopup() {
  const overlay = document.querySelector(".mood-popup-overlay");
  if (overlay) {
    overlay.classList.remove("active");
  }
}

function loadMoodCards() {
  const container = document.getElementById("mood-cards");
  if (!container) return;

  container.innerHTML = "<p>Loading mood diary...</p>";

  fetch(`https://opensheet.elk.sh/${SHEET_ID}/Sheet1`)
    .then((res) => res.json())
    .then((data) => {
      if (!data || data.length === 0) {
        removeMoodDiarySection();
        return;
      }

      container.innerHTML = "";
      data
        .reverse()
        .slice(0, MAX_ENTRIES)
        .forEach((entry, index) => {
          const card = document.createElement("div");
          card.className = "mood-card item";
          if (index === 0) card.classList.add("latest-entry");

          card.innerHTML = `
          <div class="mood-emoji">${entry.mood || "🙂"}</div>
          <h2>${formatDate(entry.date || "")}</h2>
          <p>${parseMarkdown(
            truncateText(entry.brief || "", MAX_BRIEF_LENGTH)
          )}</p>
          ${
            entry.shows
              ? `<div class="chips"><span class="movie-icon">⏯️</span>${entry.shows
                  .split(",")
                  .map(createChip)
                  .join("")}</div>`
              : ""
          }
          ${
            entry.learned
              ? `<p><strong>Learned:</strong> ${parseMarkdown(
                  truncateText(entry.learned || "", MAX_LEARNED_LENGTH)
                )}</p>`
              : ""
          }`;

          card.addEventListener("click", (e) => {
            if (e.target.tagName !== "A") openPopup(entry);
          });

          container.appendChild(card);
        });

      const newItems = document.querySelectorAll("#mood-cards .item");
      newItems.forEach((item, i) => {
        setTimeout(() => {
          item.style.opacity = 1;
          item.style.transform = "translateY(0)";
        }, 150 * i);
      });
    })
    .catch((err) => {
      console.error("Failed to load mood entries:", err);
      removeMoodDiarySection();
    });
}

function removeMoodDiarySection() {
  const section = document.getElementById("mood-diary");
  if (section) {
    section.style.display = "none";
  }
}

document.addEventListener("DOMContentLoaded", loadMoodCards);
