import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MeDrop Contact",
  description: "Save a contact shared via MeDrop.",
  metadataBase: new URL("https://sameerasw.com/medrop-card/"),
  robots: { index: false, follow: false },
};

export { default } from "./page";
