import handleTrial from "./trial.js";

const DATA_FILES = {
  "/unsplash-today.json": "unsplash-today.json",
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
};
