import type { Metadata } from "next";
import "@/styles/essentials/privacy.css";

export const metadata: Metadata = {
  title: "Essentials - Privacy Policy",
  description: "Privacy policy for the Essentials app for Android.",
};

export default function EssentialsPrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
