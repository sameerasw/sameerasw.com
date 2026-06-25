import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Helium Browser Setup | Helium",
  description:
    "My Helium Browser configuration, appearance settings, extensions, and comparison with Zen Browser.",
  metadataBase: new URL("https://sameerasw.com/helium/"),
  keywords:
    "browse, helium-browser, helium browser, chromium, zen-browser, macos, Sri Lanka, sameerasw, Sameera Wijerathna",
  openGraph: {
    type: "article",
    title: "Helium Browser Setup",
    description:
      "My Helium Browser configuration, appearance settings, extensions, and comparison with Zen Browser.",
    url: "https://sameerasw.com/helium/",
    images:
      "https://raw.githubusercontent.com/sameerasw/sameerasw.com/main/assets/img/articles/helium-preview.jpeg",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sameeraswdotcom",
    creator: "@sameeraswdotcom",
    title: "Helium Browser Setup | Helium",
    description:
      "My Helium Browser configuration, appearance settings, extensions, and comparison with Zen Browser.",
    images:
      "https://raw.githubusercontent.com/sameerasw/sameerasw.com/main/assets/img/articles/helium-preview.jpeg",
  },
};

export { default } from "./page";
