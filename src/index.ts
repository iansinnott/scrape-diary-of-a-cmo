import { chromium } from "playwright";
import { fileURLToPath } from "node:url";
import fs from "node:fs";
import path from "node:path";
import Database from "better-sqlite3";

const urls = [
  "https://www.cognism.com/diary-of-a-first-time-cmo",
  "https://www.cognism.com/diary-of-a-first-time-cmo/cut-the-bs",
  "https://www.cognism.com/diary-of-a-first-time-cmo/implementing-a-winning-content-strategy",
  "https://www.cognism.com/diary-of-a-first-time-cmo/experiment-experiment-experiment",
  "https://www.cognism.com/diary-of-a-first-time-cmo/the-first-100-days",
  "https://www.cognism.com/diary-of-a-first-time-cmo/know-your-audience",
  "https://www.cognism.com/diary-of-a-first-time-cmo/recognition-and-rewards",
  "https://www.cognism.com/diary-of-a-first-time-cmo/tales-of-an-operational-cmo",
  "https://www.cognism.com/diary-of-a-first-time-cmo/a-proud-cmo-moment",
  "https://www.cognism.com/diary-of-a-first-time-cmo/hands-on-mode",
  "https://www.cognism.com/diary-of-a-first-time-cmo/dream-team",
  "https://www.cognism.com/diary-of-a-first-time-cmo/switching-gears",
  "https://www.cognism.com/diary-of-a-first-time-cmo/looking-for-unicorns",
  "https://www.cognism.com/diary-of-a-first-time-cmo/kissing-frogs",
  "https://www.cognism.com/diary-of-a-first-time-cmo/roles-to-have-in-house",
  "https://www.cognism.com/diary-of-a-first-time-cmo/outsourcing",
  "https://www.cognism.com/diary-of-a-first-time-cmo/content-team-in-a-demand-gen-org",
  "https://www.cognism.com/diary-of-a-first-time-cmo/attracting-talent",
  "https://www.cognism.com/diary-of-a-first-time-cmo/my-dream-demand-gen-marketer",
  "https://www.cognism.com/diary-of-a-first-time-cmo/growing-a-team",
  "https://www.cognism.com/diary-of-a-first-time-cmo/lessons-on-e-books",
  "https://www.cognism.com/diary-of-a-first-time-cmo/tie-yourself-to-revenue",
  "https://www.cognism.com/diary-of-a-first-time-cmo/experimental-budget",
  "https://www.cognism.com/diary-of-a-first-time-cmo/building-a-media-machine",
  "https://www.cognism.com/diary-of-a-first-time-cmo/redirection",
  "https://www.cognism.com/diary-of-a-first-time-cmo/buyers-want-instant-gratification",
  "https://www.cognism.com/diary-of-a-first-time-cmo/setting-records",
  "https://www.cognism.com/diary-of-a-first-time-cmo/making-predictions",
  "https://www.cognism.com/diary-of-a-first-time-cmo/lead-gen-to-demand-gen-making-the-switch",
  "https://www.cognism.com/diary-of-a-first-time-cmo/its-not-2010-anymore",
  "https://www.cognism.com/diary-of-a-first-time-cmo/on-demand-ungated-free-content",
  "https://www.cognism.com/diary-of-a-first-time-cmo/linkedin-wins",
  "https://www.cognism.com/diary-of-a-first-time-cmo/sourcing-subject-matter-experts",
  "https://www.cognism.com/diary-of-a-first-time-cmo/done-is-better-than-perfect",
  "https://www.cognism.com/diary-of-a-first-time-cmo/marrying-ideas-and-execution",
  "https://www.cognism.com/diary-of-a-first-time-cmo/give-yourself-problems",
  "https://www.cognism.com/diary-of-a-first-time-cmo/cognism-dna",
  "https://www.cognism.com/diary-of-a-first-time-cmo/becoming-a-subject-matter-expert",
  "https://www.cognism.com/diary-of-a-first-time-cmo/random-acts-of-marketing",
  "https://www.cognism.com/diary-of-a-first-time-cmo/art-and-science",
  "https://www.cognism.com/diary-of-a-first-time-cmo/lets-get-it-live",
  "https://www.cognism.com/diary-of-a-first-time-cmo/minimal-viable-product",
  "https://www.cognism.com/diary-of-a-first-time-cmo/b2b-marketing-doesnt-have-to-be-boring",
  "https://www.cognism.com/diary-of-a-first-time-cmo/value-customer-loyalty",
  "https://www.cognism.com/diary-of-a-first-time-cmo/rebranding-cognism",
  "https://www.cognism.com/diary-of-a-first-time-cmo/lessons-ive-learned-about-marketing-and-sales-alignment",
  "https://www.cognism.com/diary-of-a-first-time-cmo/align-your-destinies",
  "https://www.cognism.com/diary-of-a-first-time-cmo/put-yourself-in-their-shoes",
  "https://www.cognism.com/diary-of-a-first-time-cmo/providing-value",
  "https://www.cognism.com/diary-of-a-first-time-cmo/view-from-a-distance",
  "https://www.cognism.com/diary-of-a-first-time-cmo/cmo-stands-for-change-means-opportunities",
  "https://www.cognism.com/diary-of-a-first-time-cmo/humans-marketing-to-humans",
  "https://www.cognism.com/diary-of-a-first-time-cmo/critical-thinking",
  "https://www.cognism.com/diary-of-a-first-time-cmo/imposter-syndrome",
  "https://www.cognism.com/diary-of-a-first-time-cmo/10-percent-mindset",
  "https://www.cognism.com/diary-of-a-first-time-cmo/test-your-boundaries",
  "https://www.cognism.com/diary-of-a-first-time-cmo/cmo-of-a-startup",
  "https://www.cognism.com/diary-of-a-first-time-cmo/dont-backslide",
  "https://www.cognism.com/diary-of-a-first-time-cmo/quality-over-quantity",
  "https://www.cognism.com/diary-of-a-first-time-cmo/data-is-everything",
  "https://www.cognism.com/diary-of-a-first-time-cmo/my-predictions",
];
const db = new Database(path.join(process.cwd(), "db.sqlite"));

db.exec(`
  CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY autoincrement,
    title TEXT,
    url TEXT UNIQUE NOT NULL,
    text TEXT
  )`);

const existsQ = db.prepare("SELECT url FROM posts WHERE url = :url");

const filteredUrls = urls.filter((url) => !existsQ.get({ url }));

if (filteredUrls.length > 0) {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  for (const url of urls) {
    const exists = existsQ.get(url);

    if (exists) {
      console.log("skipping", url);
      continue;
    }

    console.log("processing", url);

    try {
      await page.goto(url);
      const selector = '[data-widget-type="custom_widget"] [data-hs-cos-type="rich_text"]:has(h2)';
      await page.waitForSelector(selector);
      const $el = await page.$(selector);
      const title = await page.title();
      const text = await $el?.evaluate<string>((el) => {
        // @ts-ignore
        return el.innerText;
      });

      db.prepare("INSERT OR IGNORE INTO posts (title, url, text) VALUES (:title, :url, :text)").run(
        {
          title,
          url,
          text,
        }
      );
    } catch (err) {
      console.log("error", url, err);
      continue;
    }
  }

  await context.close(); // necessary?
  await browser.close();
}

type Post = {
  id: number;
  title: string;
  url: string;
  text: string;
};

const xs = db
  .prepare("SELECT * FROM posts")
  .all()
  .map((x) =>
    `
       <section>
          <h1>
            <a href="${x.url}" target="_blank" rel="noopener noreferrer">
              ${x.title.replace(/Diary of a first-time CMO - /i, "")}
            </a>
          </h1>
          ${x.text
            .split("\n")
            .map((x) => x.trim())
            .filter(Boolean)
            .map((x) => `<p>${x}</p>`)
            .join("\n")}
       </section>
  `.trim()
  );

fs.writeFileSync(
  path.join(process.cwd(), "output.html"),
  `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>Diary of a First Time CMO</title>
        <style>${fs.readFileSync(
          path.dirname(fileURLToPath(import.meta.url)) + "/style.css",
          "utf-8"
        )}</style>
      </head>
      <body>
        ${xs.join("\n<hr />\n")}
      </body>
    </html>
  `.trim()
);
console.log(`Wrote: ${xs.length} posts to output.html`);

db.close();
