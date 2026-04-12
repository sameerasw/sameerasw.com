import type { Metadata } from "next";
import Script from "next/script";

import "@/styles/style.css";
import "@/styles/common/no-cursor.css";

import Cursor from "@/components/Cursor";
import StickyLoveTab from "@/components/StickyLoveTab";

export const metadata: Metadata = {
  title: "Sameera Wijerathna",
  description:
    "A passionate developer, designer and a student from Sri Lanka who is always ready to learn new things.",
  metadataBase: new URL("https://sameerasw.com/"),
  keywords:
    "Sameera Wijerathna, sameerasw, sameera, portfolio, sameerasw, sameeraswdotcom, sameera_s_w",
  openGraph: {
    type: "article",
    title: "Sameera Wijerathna - My personal space in the internet.",
    description:
      "A passionate developer, designer and a student from Sri Lanka who is always ready to learn new things.",
    url: "https://sameerasw.com/",
    images:
      "https://raw.githubusercontent.com/sameerasw/sameerasw.com/main/assets/img/web-preview.png",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sameeraswdotcom",
    creator: "@sameeraswdotcom",
    title: "Sameera Wijerathna",
    description:
      "A passionate developer, designer and a student from Sri Lanka who is always ready to learn new things.",
    images:
      "https://raw.githubusercontent.com/sameerasw/sameerasw.com/main/assets/img/web-preview.png",
  },
  icons: {
    icon: "/assets/img/logo-mini.png",
    shortcut: "/assets/img/logo-mini.png",
    apple: "/assets/img/logo-mini.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Google+Sans+Flex:opsz,wght,wdth,ROND@6..144,1..1000,100..150,0..100&display=swap"
          rel="stylesheet"
        />
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,400,0,200"
          as="style"
        />

        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />

        <Script
          id="Cookiebot"
          src="https://consent.cookiebot.com/uc.js"
          data-cbid="f35df0a1-95c5-4edf-b397-46a6071914f7"
          strategy="beforeInteractive"
        />
        <Script
          src="https://kit.fontawesome.com/97543652cd.js"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <Script
          src="https://code.jquery.com/jquery-3.6.0.min.js"
          strategy="beforeInteractive"
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-6F3G1NW62X"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-6F3G1NW62X');
          `}
        </Script>
      </head>
      <body>
        <Cursor />
        <StickyLoveTab />
        {children}
      </body>
    </html>
  );
}
