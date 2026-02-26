import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Zen Zero - The minimal browser | Zen Browser",
  description:
    "The most minimal a browser can be. Zen Zero is a customized Zen browser which aim to keep away the distractions and focus on the web and make it look pretty with transparency.",
  metadataBase: new URL("https://sameerasw.com/zen/"),
  keywords:
    "browse, zen-browser, zen browser, firefox, arc, macos, Sri Lanka, sameerasw, Sameera Sandakleum",
  openGraph: {
    type: "article",
    title: "Zen Zero - The minimal browser",
    description:
      "The most minimal a browser can be. Zen Zero is a customized Zen browser which aim to keep away the distractions and focus on the web and make it look pretty with transparency.",
    url: "https://sameerasw.com/zen/",
    images:
      "https://raw.githubusercontent.com/sameerasw/sameerasw.com/main/assets/img/articles/zen/web-preview-zen.jpeg",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sameeraswdotcom",
    creator: "@sameeraswdotcom",
    title: "Zen Zero - The minimal browser | Zen Browser",
    description:
      "The most minimal a browser can be. Zen Zero is a customized Zen browser which aim to keep away the distractions and focus on the web and make it look pretty with transparency.",
    images:
      "https://raw.githubusercontent.com/sameerasw/sameerasw.com/main/assets/img/articles/zen/web-preview-zen.jpeg",
  },
};

export { default } from "./page";
