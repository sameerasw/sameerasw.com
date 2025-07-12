// AirSync Progress Management and Animations

// Configuration - Update currentStage to change progress
const STAGES = {
  research: {
    index: 0,
    label: "Research",
    icon: "search",
    cta: {
      text: "Coming Soon - See Progress",
      icon: "schedule",
      link: "https://t.me/tidwib",
    },
  },
  draft: {
    index: 1,
    label: "Draft",
    icon: "edit",
    cta: {
      text: "Coming Soon - See Progress",
      icon: "schedule",
      link: "https://t.me/tidwib",
    },
  },
  learn: {
    index: 2,
    label: "Learn",
    icon: "school",
    cta: {
      text: "Coming Soon - See Progress",
      icon: "schedule",
      link: "https://t.me/tidwib",
    },
  },
  build: {
    index: 3,
    label: "Build",
    icon: "build",
    cta: {
      text: "Coming Soon - See Progress",
      icon: "schedule",
      link: "https://t.me/tidwib",
    },
  },
  test: {
    index: 4,
    label: "Test",
    icon: "bug_report",
    cta: {
      text: "Coming Soon - See Progress",
      icon: "schedule",
      link: "https://t.me/tidwib",
    },
  },
  beta: {
    index: 5,
    label: "Beta",
    icon: "preview",
    cta: {
      text: "Beta Available - Try It",
      icon: "preview",
      link: "https://t.me/tidwib",
    },
  },
  live: {
    index: 6,
    label: "Live",
    icon: "rocket_launch",
    cta: { text: "Get AirSync", icon: "download", link: "#" },
  },
};

// Current stage - Change this to update progress
const CURRENT_STAGE = "draft";

// Initialize progress bar and animations
function initializeProgress() {
  const currentStageData = STAGES[CURRENT_STAGE];
  const progressPercentage =
    ((currentStageData.index + 1) / Object.keys(STAGES).length) * 100;

  // Update progress bar
  const progressFill = document.getElementById("progressFill");
  if (progressFill) {
    // Animate progress bar fill
    setTimeout(() => {
      progressFill.style.width = `${progressPercentage}%`;
    }, 500);
  }

  // Update stage indicators
  updateStageIndicators();

  // Update CTA button
  updateCTAButton();

  // Add scroll animations
  initializeScrollAnimations();
}

// Update stage indicators based on current progress
function updateStageIndicators() {
  const currentStageData = STAGES[CURRENT_STAGE];
  const stageElements = document.querySelectorAll(".stage");

  stageElements.forEach((stageElement, index) => {
    const stageName = stageElement.getAttribute("data-stage");
    const stageData = STAGES[stageName];

    // Remove all classes first
    stageElement.classList.remove("active", "current");

    // Add active class for completed stages
    if (stageData.index <= currentStageData.index) {
      stageElement.classList.add("active");
    }

    // Add current class for current stage
    if (stageData.index === currentStageData.index) {
      stageElement.classList.add("current");
    }
  });
}

// Update CTA button based on current stage
function updateCTAButton() {
  const ctaButton = document.getElementById("ctaButton");
  if (!ctaButton) return;

  const currentStageData = STAGES[CURRENT_STAGE];
  const ctaData = currentStageData.cta;

  // Update button content
  ctaButton.innerHTML = `
    <span class="material-symbols-rounded">${ctaData.icon}</span>
    ${ctaData.text}
  `;

  // Update button link
  ctaButton.href = ctaData.link;

  // Add special styling for different stages
  ctaButton.classList.remove("beta", "live");
  if (CURRENT_STAGE === "beta") {
    ctaButton.classList.add("beta");
  } else if (CURRENT_STAGE === "live") {
    ctaButton.classList.add("live");
  }
}

// Initialize scroll animations
function initializeScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in");
      }
    });
  }, observerOptions);

  // Observe feature cards
  document.querySelectorAll(".feature-card").forEach((card) => {
    observer.observe(card);
  });

  // Observe tech cards
  document.querySelectorAll(".tech-card").forEach((card) => {
    observer.observe(card);
  });
}

// Add hover effects to stage indicators
function addStageHoverEffects() {
  const stageElements = document.querySelectorAll(".stage");

  stageElements.forEach((stageElement) => {
    stageElement.addEventListener("mouseenter", () => {
      if (stageElement.classList.contains("active")) {
        stageElement.style.transform = "scale(1.1)";
      }
    });

    stageElement.addEventListener("mouseleave", () => {
      if (!stageElement.classList.contains("current")) {
        stageElement.style.transform = "scale(1)";
      }
    });
  });
}

// Feature card stagger animation
function staggerFeatureCards() {
  const featureCards = document.querySelectorAll(".feature-card");
  featureCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
  });
}

// Utility function to update progress (for future use)
function updateProgress(newStage) {
  if (STAGES[newStage]) {
    // This would typically update a configuration file or database
    console.log(`Progress updated to: ${newStage}`);
    // In a real implementation, you'd update the CURRENT_STAGE variable
    // and reinitialize the progress display
  }
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  initializeProgress();
  addStageHoverEffects();
  staggerFeatureCards();

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
});

// Add CSS classes for animations
const style = document.createElement("style");
style.textContent = `
  .feature-card {
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.6s ease;
  }

  .feature-card.animate-in {
    opacity: 1;
    transform: translateY(0);
  }

  .tech-card {
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.6s ease;
  }

  .tech-card.animate-in {
    opacity: 1;
    transform: translateY(0);
  }

  .progress-section {
    opacity: 0;
    transform: translateY(30px);
    animation: slideInUp 0.8s ease forwards;
    animation-delay: 0.3s;
  }

  @keyframes slideInUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(style);

// Export function for external use (if needed)
if (typeof module !== "undefined" && module.exports) {
  module.exports = { updateProgress, STAGES, CURRENT_STAGE };
}
