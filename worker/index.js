import handleTrial from "./trial.js";

const DATA_FILES = {
  "/unsplash-today.json": "unsplash-today.json",
  "/unsplash-next.json": "unsplash-next.json",
  "/unsplash-history.json": "unsplash-history.json",
  "/unsplash-mobile-history.json": "unsplash-mobile-history.json",
  "/photos.json": "photos.json",
  "/project-details.json": "project-details.json",
  "/github-stats.json": "github-stats.json",
  "/essentials-contributors.json": "essentials-contributors.json",
  "/essentials-update.json": "essentials-update.json",
  "/api/github-stats": "github-stats.json",
  "/api/essentials-contributors": "essentials-contributors.json",
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname.replace(/\/$/, "") === "/.netlify/functions/trial") {
      return handleTrial(request, env);
    }
    const key = DATA_FILES[url.pathname.replace(/\/$/, "")];

    if (key) {
      const value = await env.DATA.get(key, { cacheTtl: 300 });
      const body = value ?? (await (await env.ASSETS.fetch(new URL(`/${key}`, url))).text());
      return new Response(body, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Cache-Control": "public, max-age=300",
          "Access-Control-Allow-Origin": "*",
        },
      });
    }

    return env.ASSETS.fetch(request);
  },

  async scheduled(event, env, ctx) {
    if (!env.GH_DISPATCH_TOKEN) {
      console.error("GH_DISPATCH_TOKEN is not set in Worker environment variables / secrets.");
      return;
    }

    try {
      const res = await fetch(
        "https://api.github.com/repos/sameerasw/sameerasw.com/actions/workflows/daily-unsplash.yml/dispatches",
        {
          method: "POST",
          headers: {
            "Accept": "application/vnd.github.v3+json",
            "Authorization": `Bearer ${env.GH_DISPATCH_TOKEN}`,
            "User-Agent": "Cloudflare-Worker-Cron-Dispatcher",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ref: "main",
            inputs: { target: "both" },
          }),
        }
      );

      if (!res.ok) {
        const errText = await res.text();
        console.error(`Failed to dispatch daily-unsplash workflow: HTTP ${res.status} - ${errText}`);
      } else {
        console.log("Successfully triggered daily-unsplash workflow right on time.");
      }
    } catch (err) {
      console.error("Error dispatching daily-unsplash workflow:", err);
    }
  },
};
