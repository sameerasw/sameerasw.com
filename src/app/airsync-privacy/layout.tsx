import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AirSync Privacy Policy - Android + macOS companion",
  description:
    "AirSync Privacy Policy - Learn how AirSync protects your privacy and handles your data locally.",
  metadataBase: new URL("https://sameerasw.com/airsync-privacy/"),
  keywords: "airsync, privacy policy, android, macos, privacy, data protection",
  openGraph: {
    type: "article",
    title: "AirSync Privacy Policy",
    description:
      "AirSync Privacy Policy - Learn how AirSync protects your privacy and handles your data locally.",
    url: "https://sameerasw.com/airsync-privacy/",
    images:
      "https://raw.githubusercontent.com/sameerasw/sameerasw.com/main/assets/img/articles/airsync/airsync-preview.jpeg",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sameeraswdotcom",
    creator: "@sameeraswdotcom",
    title: "AirSync Privacy Policy",
    description:
      "AirSync Privacy Policy - Learn how AirSync protects your privacy and handles your data locally.",
    images:
      "https://raw.githubusercontent.com/sameerasw/sameerasw.com/main/assets/img/articles/airsync/airsync-preview.jpeg",
  },
};

export { default } from "./page";
