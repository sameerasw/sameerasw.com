"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import "@/styles/common/tally-feedback.css";

const FORM_ID = "rjMgGN";

declare global {
  interface Window {
    Tally?: {
      openPopup: (formId: string, options?: any) => void;
      closePopup: (formId: string) => void;
      loadEmbeds: () => void;
    };
  }
}

export default function TallyFeedbackWidget() {
  const pathname = usePathname();

  // Show on home page ("/"), airsync page ("/airsync"), and essentials page ("/essentials")
  const isAirsync = pathname === "/airsync";
  const isEssentials = pathname === "/essentials";
  const isHome = pathname === "/";
  const shouldRender = isHome || isAirsync || isEssentials;

  if (!shouldRender) return null;

  return (
    <>
      <Script
        src="https://tally.so/widgets/embed.js"
        strategy="lazyOnload"
        onLoad={() => {
          if (typeof window !== "undefined" && window.Tally) {
            window.Tally.loadEmbeds();
          }
        }}
      />
      <button
        type="button"
        className="tally-floating-btn item"
        data-tally-open={FORM_ID}
        data-tally-width="500"
        data-tally-overlay="1"
        data-tally-emoji-text="💬"
        data-tally-emoji-animation="rubber-band"
        data-tally-auto-close="5000"
        data-tally-form-events-forwarding="1"
        aria-label="Help Me with a Survey"
        title="Help Me with a Survey"
      >
        <span className="tally-floating-icon material-symbols-rounded">
          chat_bubble
        </span>
        <span className="tally-floating-label">
          Help Me with a Survey
          <span className="tally-hover-emoji" aria-hidden="true"> 🥹 👉👈</span>
        </span>
      </button>
    </>
  );
}
