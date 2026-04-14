import { Suspense } from "react";
import ReleaseSection from "@/components/ReleaseSection";
import HomeClient from "@/components/HomeClient";

import "@/styles/index/photos-switcher.css";
import "@/styles/index/highlights.css";
import "@/styles/index/form.css";
import "@/styles/index/lastfm.css";

export default async function Home() {
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

  return <HomeClient updatesSection={updatesSection} />;
}
