import { readFileSync, existsSync } from "fs";
import { join } from "path";

const DIR = import.meta.dir;

Bun.serve({
  port: 8080,
  fetch(req) {
    const url = new URL(req.url);
    let path = url.pathname === "/" ? "/llm-scraper.html" : url.pathname;
    const file = join(DIR, path.slice(1));
    if (existsSync(file)) {
      return new Response(Bun.file(file));
    }
    return new Response("404", { status: 404 });
  },
});

console.log("Serving tools at http://localhost:8080");
console.log("  /llm-scraper.html");
console.log("  /bookmark-organizer.html");
console.log("  /search-compare.html");
