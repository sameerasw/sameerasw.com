import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sameera's Pixel Notes",
  description:
    "A collection of notes and information on my Pixel devices and some other articles about getting some advanced features of them.",
  metadataBase: new URL("https://sameerasw.com/pixel/"),
  keywords:
    "Pixel, google Pixel, Google, MadebyGoole, Android, voLTE, Sri Lanka, sameerasw, Sameera Wijerathna",
  openGraph: {
    type: "article",
    title: "Sameera's Pixel Notes",
    description:
      "A collection of notes and information on my Pixel devices and some other articles about getting some advanced features of them.",
    url: "https://sameerasw.com/pixel/",
    images:
      "https://raw.githubusercontent.com/sameerasw/sameerasw.com/main/assets/img/articles/pixel/web-preview-pixel.jpeg",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sameeraswdotcom",
    creator: "@sameeraswdotcom",
    title: "Sameera's Pixel Notes",
    description:
      "A collection of notes and information on my Pixel devices and some other articles about getting some advanced features of them.",
    images:
      "https://raw.githubusercontent.com/sameerasw/sameerasw.com/main/assets/img/articles/pixel/web-preview-pixel.jpeg",
  },
};

export { default } from "./page";
