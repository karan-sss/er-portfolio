import { defineConfig } from "vite";
import { renderPage } from "./src/render.ts";

// The page content lives in src/content.ts and is rendered to static HTML at
// build time (and on every dev request), so the shipped page needs no JS to
// show its content.
export default defineConfig({
  plugins: [
    {
      name: "render-content",
      transformIndexHtml: (html) => html.replace("<!--content-->", renderPage()),
    },
  ],
  build: { target: "es2022" },
});
