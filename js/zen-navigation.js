// Zen Page Navigation Handler
// This script manages the active navigation state based on scroll position

document.addEventListener("DOMContentLoaded", function () {
  // Try to initialize navigation scroll detection
  try {
    // Get all the sections on the page
    const intro = document.getElementById("intro");
    const article = document.getElementById("article");
    const modInstall = document.getElementById("mod-install");
    const trouble = document.getElementById("trouble");
    const addonFeatures = document.getElementById("addon-features");
    const moreLinks = document.getElementById("more-links");

    // Get all navigation items
    const introNav = document.getElementById("intro-nav");
    const installNav = document.getElementById("install-nav");
    const troubleNav = document.getElementById("trouble-nav");
    const featuresNav = document.getElementById("features-nav");
    const resourcesNav = document.getElementById("resources-nav");

    // Function to remove active class from all nav items
    function removeAllActiveClasses() {
      const navItems = [
        introNav,
        installNav,
        troubleNav,
        featuresNav,
        resourcesNav,
      ];
      navItems.forEach((item) => {
        if (item) item.classList.remove("active");
      });
    }

    // Function to add active class to specific nav item
    function setActiveNav(activeNavItem) {
      removeAllActiveClasses();
      if (activeNavItem) {
        activeNavItem.classList.add("active");
      }
    }

    // Function to check if a section is in viewport with improved range detection
    function isInViewport(element) {
      if (!element) return false;
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Get section boundaries
      const sectionTop = rect.top;
      const sectionBottom = rect.bottom;
      const sectionHeight = rect.height;

      // Section is visible if any part is in viewport
      const isVisible = sectionTop < windowHeight && sectionBottom > 0;

      if (!isVisible) return false;

      // Calculate how much of the section is visible
      const visibleTop = Math.max(0, sectionTop);
      const visibleBottom = Math.min(windowHeight, sectionBottom);
      const visibleHeight = visibleBottom - visibleTop;
      const visibilityRatio = visibleHeight / windowHeight;

      // Section is considered "active" if:
      // 1. It takes up more than 30% of the viewport, OR
      // 2. It's at least 50% visible and near the top of viewport, OR
      // 3. It's the only section significantly visible
      const takesMajorSpace = visibilityRatio > 0.3;
      const isWellVisible =
        visibleHeight / sectionHeight > 0.5 && sectionTop <= windowHeight * 0.4;

      return takesMajorSpace || isWellVisible;
    }

    // Function to find the most appropriate active section
    function findActiveSection() {
      const sections = [
        { element: intro, nav: introNav, id: "intro" },
        { element: modInstall, nav: installNav, id: "mod-install" },
        { element: trouble, nav: troubleNav, id: "trouble" },
        { element: addonFeatures, nav: featuresNav, id: "addon-features" },
        { element: moreLinks, nav: resourcesNav, id: "more-links" },
      ];

      const windowHeight = window.innerHeight;
      const scrollY = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight;
      let activeSection = null;
      let bestScore = -1;

      // Check if we're near the bottom of the page
      const isNearBottom = scrollY + windowHeight >= documentHeight - 100;

      if (isNearBottom) {
        // If we're near the bottom, ensure the last section is active
        const lastSection = sections[sections.length - 1];
        if (lastSection.element) {
          return lastSection;
        }
      }

      for (const section of sections) {
        if (!section.element) continue;

        const rect = section.element.getBoundingClientRect();
        const sectionTop = rect.top;
        const sectionBottom = rect.bottom;
        const sectionHeight = rect.height;
        const sectionCenter = sectionTop + sectionHeight / 2;

        // Check if section is in viewport
        if (isInViewport(section.element)) {
          // Calculate a score based on visibility and position
          const visibleTop = Math.max(0, sectionTop);
          const visibleBottom = Math.min(windowHeight, sectionBottom);
          const visibleHeight = visibleBottom - visibleTop;
          const visibilityRatio = visibleHeight / windowHeight;

          // Distance from viewport center (lower is better)
          const viewportCenter = windowHeight / 2;
          const distanceFromCenter = Math.abs(sectionCenter - viewportCenter);
          const normalizedDistance = distanceFromCenter / windowHeight;

          // Score combines visibility ratio and proximity to center
          // Higher visibility ratio = better score
          // Lower distance from center = better score
          const score = visibilityRatio * 2 - normalizedDistance;

          if (score > bestScore) {
            bestScore = score;
            activeSection = section;
          }
        }
      }

      // If no section is prominently in view, fall back to position-based detection
      if (!activeSection) {
        const scrollPercent = scrollY / (documentHeight - windowHeight);

        // Near the top - show intro
        if (scrollPercent < 0.1) {
          activeSection = sections[0];
        }
        // Near the bottom - show last section
        else if (scrollPercent > 0.9) {
          activeSection = sections[sections.length - 1];
        }
        // Find the section that should be active based on scroll position
        else {
          for (const section of sections) {
            if (!section.element) continue;
            const rect = section.element.getBoundingClientRect();

            // If section top is above the middle of the viewport, it could be active
            if (rect.top <= windowHeight / 2) {
              activeSection = section;
            }
          }
        }
      }

      return activeSection;
    }

    // Throttle function for performance
    function throttle(func, limit) {
      let inThrottle;
      return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
          func.apply(context, args);
          inThrottle = true;
          setTimeout(() => (inThrottle = false), limit);
        }
      };
    }

    // Scroll event listener for navigation highlighting (throttled for performance)
    const handleScroll = throttle(function () {
      const activeSection = findActiveSection();
      if (activeSection) {
        setActiveNav(activeSection.nav);
      }
    }, 100);

    window.addEventListener("scroll", handleScroll);

    // Handle window resize to recalculate active sections
    window.addEventListener("resize", throttle(handleScroll, 250));

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('#nav a[href^="#"]');
    navLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        const targetId = this.getAttribute("href").substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          const offsetTop = targetElement.offsetTop - 100; // Account for fixed nav
          window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          });
        }
      });
    });

    // Initialize with the correct active section based on current scroll position
    setTimeout(() => {
      handleScroll();
    }, 100);
  } catch (e) {
    console.log("Navigation scroll detection error:", e);
  }
});
