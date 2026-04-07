import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sameera's MacBook Setup",
  description:
    "A complete lookaround of my personal macOS productivity setup on the MacBook Air.",
  metadataBase: new URL("https://sameerasw.com/macos/"),
  keywords:
    "macos, macbook, macbook air, apple silicon, apple m1, macbook m1, Sri Lanka, sameerasw, Sameera Wijerathna",
  openGraph: {
    type: "article",
    title: "Sameera's MacBook Setup",
    description:
      "A complete lookaround of my personal macOS productivity setup on the MacBook Air.",
    url: "https://sameerasw.com/macos/",
    images:
      "https://raw.githubusercontent.com/sameerasw/sameerasw.com/main/assets/img/articles/macos/web-preview-macos.jpg",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sameeraswdotcom",
    creator: "@sameeraswdotcom",
    title: "Sameera's MacBook Setup",
    description:
      "A complete lookaround of my personal macOS productivity setup on the MacBook Air.",
    images:
      "https://raw.githubusercontent.com/sameerasw/sameerasw.com/main/assets/img/articles/macos/web-preview-macos.jpg",
  },
};

export { default } from "./page";
