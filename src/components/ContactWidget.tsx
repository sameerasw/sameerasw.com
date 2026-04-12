"use client";

import { useState, useEffect } from "react";
import "@/components/contact-widget/contact-widget.css";

const CONTACT_METHODS = [
  {
    id: "domain",
    icon: "fa-solid fa-link",
    label: "Website",
    url: "https://www.sameerasw.com",
  },
  {
    id: "all",
    icon: "fa-regular fa-envelope",
    label: "Mail",
    url: "mailto:mail@sameerasw.com",
  },
  {
    id: "handle",
    icon: "fa-brands fa-github",
    label: "GitHub",
    url: "https://www.github.com/sameerasw",
  },
  {
    id: "twitter",
    icon: "fa-brands fa-x-twitter",
    label: "Twit..𝕏",
    url: "https://www.twitter.com/sameeraswdotcom",
  },
  {
    id: "linkedin",
    icon: "fa-brands fa-linkedin",
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/sameerasw",
  },
  {
    id: "instagram",
    icon: "fa-brands fa-instagram",
    label: "Instagram",
    url: "https://www.instagram.com/sameeraswdotcom",
  },
  {
    id: "telegram",
    icon: "fa-brands fa-telegram",
    label: "Telegram",
    url: "https://t.me/sameerasw",
  },
  {
    id: "local",
    icon: "fa-regular fa-user",
    label: "Name",
    url: "javascript:void(0)",
  },
];

export default function ContactWidget() {
  const [selected, setSelected] = useState("domain");
  const [active, setActive] = useState<string | null>(null);
  const [hintVisible, setHintVisible] = useState(false);
  const [hintText, setHintText] = useState("");
  const [hasHover, setHasHover] = useState(true);

  useEffect(() => {
    setHasHover(
      window.matchMedia &&
        window.matchMedia("(hover: hover) and (pointer: fine)").matches,
    );
  }, []);

  const currentMode = active || selected;

  const handleMouseEnter = (id: string) => {
    if (!hasHover) return;
    setActive(id);
    if (id !== "domain" && id !== "local") {
      setHintText("Click to visit >");
      setHintVisible(true);
    }
  };

  const handleMouseLeave = () => {
    if (!hasHover) return;
    setActive(null);
    setHintVisible(false);
  };

  const handleClick = (
    method: (typeof CONTACT_METHODS)[0],
    e: React.MouseEvent,
  ) => {
    if (hasHover) {
      if (method.url && method.url !== "javascript:void(0)") {
        window.open(method.url, "_blank");
      }
    } else {
      e.preventDefault();
      setSelected(method.id);
      setActive(null);
      if (method.id !== "domain" && method.id !== "local") {
        setHintText("Tap here to visit >");
        setHintVisible(true);
      } else {
        setHintVisible(false);
      }
    }
  };

  const handleEmailClick = (e: React.MouseEvent) => {
    if (!hasHover) {
      e.preventDefault();
      const current = CONTACT_METHODS.find((c) => c.id === selected);
      if (current && current.url && current.url !== "javascript:void(0)") {
        if (current.url.startsWith("mailto:")) {
          window.location.href = current.url;
        } else {
          window.open(current.url, "_blank");
        }
      }
    }
  };

  return (
    <div className="contact-widget-wrapper item">
      <div
        className={`contact-widget cw-mode-${currentMode}`}
        aria-hidden="false"
      >
        <div
          className={`cw-hint ${hintVisible ? "visible" : ""}`}
          aria-live="polite"
          aria-atomic="true"
        >
          {hintText}
        </div>
        <div
          className="cw-email"
          aria-label="Contact email: mail at sameerasw dot com"
          onClick={handleEmailClick}
        >
          <span className="cw-part cw-local">mail</span>
          <span className="cw-part cw-at">@</span>
          <span className="cw-domain-label" aria-hidden="false">
            <span className="cw-part cw-domain-first">sameera</span>
            <span className="cw-part cw-domain-rest">sw</span>
          </span>
          <span className="cw-part cw-domain-dot">.</span>
          <span className="cw-part cw-tld">com</span>
        </div>

        <div
          className="cw-controls"
          role="tablist"
          aria-label="contact shortcuts"
        >
          {CONTACT_METHODS.map((method) => {
            const isSelected = selected === method.id;
            const isActive = active === method.id;
            return (
              <button
                key={method.id}
                className={`cw-btn ${isSelected && !active ? "cw-selected" : ""} ${isActive ? "cw-active" : ""}`}
                role="tab"
                aria-selected={isSelected}
                onMouseEnter={() => handleMouseEnter(method.id)}
                onMouseLeave={handleMouseLeave}
                onClick={(e) => handleClick(method, e)}
              >
                <i className={method.icon}></i>
                <span>{method.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
