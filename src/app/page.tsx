import { Suspense } from "react";
import fs from "fs";
import path from "path";
import ReleaseSection from "@/components/ReleaseSection";
import HomeClient from "@/components/HomeClient";

import "@/styles/index/photos-switcher.css";
import "@/styles/index/highlights.css";
import "@/styles/index/form.css";
import "@/styles/index/lastfm.css";

export default async function Home() {
  const metadataPath = path.join(process.cwd(), "public/unsplash-today.json");
  let wallpaperData = null;
  if (fs.existsSync(metadataPath)) {
    try {
      wallpaperData = JSON.parse(fs.readFileSync(metadataPath, "utf8"));
    } catch (e) {
      console.error("Failed to parse unsplash-today.json", e);
    }
  }

  const updatesSection = (
    <section id="updates">
      <div className="heading item">
        <h2>Updates</h2>
      </div>
      <Suspense fallback={null}>
        <ReleaseSection />
      </Suspense>
    </section>
  );

  return <HomeClient updatesSection={updatesSection} wallpaperData={wallpaperData} />;
}
