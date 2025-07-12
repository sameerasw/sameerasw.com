// macOS Style Menubar and Notifications
class MacOSInterface {
  constructor() {
    this.notifications = [];
    this.notificationId = 0;
    this.init();
  }

  init() {
    this.updateTime();
    this.startNotificationLoop();

    // Update time every second
    setInterval(() => this.updateTime(), 1000);
  }

  updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    const timeDisplay = document.getElementById("menubar-time");
    if (timeDisplay) {
      timeDisplay.textContent = timeString;
    }
  }

  createNotification(appName, title, body, icon = "📱", actions = []) {
    const notification = {
      id: this.notificationId++,
      appName,
      title,
      body,
      icon,
      actions,
      time: new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
    };

    this.showNotification(notification);
    return notification;
  }

  showNotification(notification) {
    const container = document.getElementById("notification-container");
    if (!container) return;

    const notificationEl = document.createElement("div");
    notificationEl.className = "notification";
    notificationEl.dataset.id = notification.id;

    notificationEl.innerHTML = `
            <div class="notification-header">
                <div class="notification-app">
                    <div class="notification-app-icon">${
                      notification.icon
                    }</div>
                    <span>${notification.appName}</span>
                </div>
                <div class="notification-time">${notification.time}</div>
            </div>
            <div class="notification-title">${notification.title}</div>
            <div class="notification-body">${notification.body}</div>
            ${
              notification.actions.length > 0
                ? `
                <div class="notification-actions">
                    ${notification.actions
                      .map(
                        (action) => `
                        <button class="notification-button ${
                          action.type || ""
                        }">${action.text}</button>
                    `
                      )
                      .join("")}
                </div>
            `
                : ""
            }
        `;

    container.appendChild(notificationEl);

    // Trigger slide-in animation
    setTimeout(() => {
      notificationEl.classList.add("show");
    }, 100);

    // Auto-hide after 5 seconds
    setTimeout(() => {
      this.hideNotification(notification.id);
    }, 7000);
  }

  hideNotification(id) {
    const notificationEl = document.querySelector(`[data-id="${id}"]`);
    if (notificationEl) {
      notificationEl.classList.remove("show");
      notificationEl.classList.add("hide");

      // Remove from DOM after animation
      setTimeout(() => {
        if (notificationEl.parentNode) {
          notificationEl.parentNode.removeChild(notificationEl);
        }
      }, 300);
    }
  }

  startNotificationLoop() {
    const sampleNotifications = [
      {
        appName: "AirSync",
        title: "Messages - New Message",
        body: "Hey! Did you see the new AirSync update?",
        icon: "💬",
        actions: [
          { text: "Reply", type: "primary" },
          { text: "Mark as Read", type: "secondary" },
        ],
      },
      {
        appName: "AirSync",
        title: "GMail - New Email",
        body: "You have 3 new emails in your inbox",
        icon: "📧",
        actions: [{ text: "Open", type: "primary" }],
      },
      {
        appName: "AirSync",
        title: "Spotify - Now Playing",
        body: "Lofi Hip Hop Radio - beats to relax/study to",
        icon: "🎵",
        actions: [{ text: "Skip", type: "secondary" }],
      },
      {
        appName: "AirSync",
        title: "Calendar - Meeting Reminder",
        body: "Team standup in 15 minutes",
        icon: "📅",
        actions: [
          { text: "Join", type: "primary" },
          { text: "Snooze", type: "secondary" },
        ],
      },
      {
        appName: "AirSync",
        title: "Photos - Memory",
        body: "Check out your memories from this day last year",
        icon: "📸",
        actions: [{ text: "View", type: "primary" }],
      },
      {
        appName: "AirSync",
        title: "Chat - John Doe",
        body: "Can't wait to try AirSync! 🚀",
        icon: "💬",
        actions: [
          { text: "Reply", type: "primary" },
          { text: "Mark as Read", type: "secondary" },
        ],
      },
    ];

    let currentIndex = 0;

    const showNextNotification = () => {
      const notification = sampleNotifications[currentIndex];
      this.createNotification(
        notification.appName,
        notification.title,
        notification.body,
        notification.icon,
        notification.actions
      );

      currentIndex = (currentIndex + 1) % sampleNotifications.length;
    };

    // Show first notification after 2 seconds
    setTimeout(() => {
      showNextNotification();

      // Then show notifications every 8 seconds (5s display + 3s gap)
      setInterval(showNextNotification, 8000);
    }, 2000);
  }
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new MacOSInterface();
});

// Add click handlers for menu items
document.addEventListener("DOMContentLoaded", () => {
  const menuItems = document.querySelectorAll(".menu-item");

  menuItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      // Remove active class from all items
      menuItems.forEach((mi) => mi.classList.remove("active"));

      // Add active class to clicked item
      item.classList.add("active");

      // Remove active class after 1 second
      setTimeout(() => {
        item.classList.remove("active");
      }, 1000);
    });
  });
});
