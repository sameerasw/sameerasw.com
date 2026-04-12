import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Everyday Carry & Setup - Sameera Wijerathna",
  description:
    "All my EDC (Everyday Carry) & Setup details together sharing for you to get inspired or to improve your own setup.",
  metadataBase: new URL("https://sameerasw.com/edc-setup/"),
  keywords:
    "edc, everyday carry, setup, pc, productivity, work, macos, macbook, windows, Sri Lanka, sameerasw, Sameera Wijerathna",
  openGraph: {
    type: "article",
    title: "Everyday Carry & Setup - Sameera Wijerathna",
    description:
      "All my EDC (Everyday Carry) & Setup details together sharing for you to get inspired or to improve your own setup.",
    url: "https://sameerasw.com/edc-setup/",
    images:
      "https://raw.githubusercontent.com/sameerasw/sameerasw.com/main/assets/img/web-preview.png",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sameeraswdotcom",
    creator: "@sameeraswdotcom",
    title: "Everyday Carry & Setup - Sameera Wijerathna",
    description:
      "All my EDC (Everyday Carry) & Setup details together sharing for you to get inspired or to improve your own setup.",
    images:
      "https://raw.githubusercontent.com/sameerasw/sameerasw.com/main/assets/img/web-preview.png",
  },
};

export { default } from "./page";
