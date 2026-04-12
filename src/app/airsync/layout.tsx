import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AirSync - Android + macOS companion",
  description:
    "AirSync - Seamlessly connect your Android device with macOS. Receive notifications, share clipboard, control media, and more across your devices on local network.",
  metadataBase: new URL("https://sameerasw.com/airsync/"),
  keywords:
    "airsync, android, macos, notifications, clipboard, media control, device sync, local network, swiftui, jetpack compose, Sri Lanka, sameerasw, Sameera Wijerathna",
  openGraph: {
    type: "article",
    title: "AirSync - Android + macOS companion",
    description:
      "AirSync - Seamlessly connect your Android device with macOS. Receive notifications, share clipboard, control media, and more across your devices on local network.",
    url: "https://sameerasw.com/airsync/",
    images: [
      {
        url: "/assets/img/articles/airsync/airsync-preview.jpeg",
        width: 1000,
        height: 563,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@sameeraswdotcom",
    creator: "@sameeraswdotcom",
    title: "AirSync - Android + macOS companion",
    description:
      "AirSync - Seamlessly connect your Android device with macOS. Receive notifications, share clipboard, control media, and more across your devices on local network.",
    images: ["/assets/img/articles/airsync/airsync-preview.jpeg"],
  },
};

export { default } from "./page";
