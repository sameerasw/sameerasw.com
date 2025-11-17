document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".contact-widget").forEach((widget) => {
    const buttons = Array.from(widget.querySelectorAll(".cw-btn"));
    const hint = widget.parentElement.querySelector(".cw-hint");

    const setMode = (mode) => {
      widget.classList.remove(
        "cw-mode-all",
        "cw-mode-domain",
        "cw-mode-handle",
        "cw-mode-local",
        "cw-mode-linkedin",
        "cw-mode-telegram",
        "cw-mode-twitter",
        "cw-mode-instagram"
      );
      widget.classList.add("cw-mode-" + mode);
    };

    // default selected button (first) should already have .cw-selected in markup
    const selected = widget.querySelector(".cw-btn.cw-selected");
    setMode(selected ? selected.dataset.target : "all");

    // only attach mouse hover listeners on devices that support hover
    const hasHover =
      window.matchMedia &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    // Set initial hint based on device type
    if (!hasHover && hint) {
      hint.textContent = "Tap here to visit >";
      hint.classList.add("visible");
    }

    // we'll temporarily remove the pinned (selected) button while hovering/focusing
    let _prevPinned = null;

    buttons.forEach((btn) => {
      const target = btn.dataset.target || "all";
      const url = btn.dataset.url;

      const makeActiveTemporarily = () => {
        // store currently pinned button (if different) and unpin it visually
        const pinned = widget.querySelector(".cw-btn.cw-selected");
        if (pinned && pinned !== btn) {
          _prevPinned = pinned;
          pinned.classList.remove("cw-selected");
          // keep aria-selected accurate while temporarily unpinned
          pinned.setAttribute("aria-selected", "false");
        } else {
          _prevPinned = null;
        }
        // ensure only this button shows active state
        buttons.forEach((b) => b.classList.remove("cw-active"));
        btn.classList.add("cw-active");
      };

      const restorePinned = () => {
        // remove temporary active state
        btn.classList.remove("cw-active");
        // restore previously pinned button's visual state
        if (_prevPinned) {
          _prevPinned.classList.add("cw-selected");
          _prevPinned.setAttribute("aria-selected", "true");
          _prevPinned = null;
        }
      };

      if (hasHover) {
        btn.addEventListener("mouseenter", () => {
          makeActiveTemporarily();
          setMode(target);
          // Show hint on hover for desktop
          if (hint) {
            hint.textContent = "Click to visit >";
            hint.classList.add("visible");
          }
        });

        btn.addEventListener("mouseleave", () => {
          restorePinned();
          // revert to selected
          const sel = widget.querySelector(".cw-btn.cw-selected");
          setMode(sel ? sel.dataset.target : "all");
          // Hide hint on mouse leave for desktop
          if (hint) {
            hint.classList.remove("visible");
          }
        });
      }

      // keyboard support (always) - behave like hover: temporarily show active
      btn.addEventListener("focus", () => {
        makeActiveTemporarily();
        setMode(target);
        // Show hint on focus for desktop
        if (hasHover && hint) {
          hint.textContent = "Click to visit";
          hint.classList.add("visible");
        }
      });
      btn.addEventListener("blur", () => {
        restorePinned();
        const sel = widget.querySelector(".cw-btn.cw-selected");
        setMode(sel ? sel.dataset.target : "all");
        // Hide hint on blur for desktop
        if (hasHover && hint) {
          hint.classList.remove("visible");
        }
      });

      // click behavior differs based on device type
      btn.addEventListener("click", (e) => {
        if (hasHover) {
          // Desktop: navigate to the URL
          e.preventDefault && e.preventDefault();
          if (url && url !== "javascript:void(0)") {
            window.open(url, "_blank");
          }
        } else {
          // Mobile: select the button and change the displayed info
          e.preventDefault && e.preventDefault();
          buttons.forEach((b) => b.classList.remove("cw-selected"));
          btn.classList.add("cw-selected");
          // update aria-selected
          buttons.forEach((b) =>
            b.setAttribute("aria-selected", b.classList.contains("cw-selected"))
          );
          // clear any temporary state
          buttons.forEach((b) => b.classList.remove("cw-active"));
          _prevPinned = null;
          setMode(target);
        }
      });
    });
  });
});
