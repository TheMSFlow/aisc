/**
 * screenshot.mjs — AISC v2 screenshot utility
 *
 * Usage:
 *   node screenshot.mjs                          → http://localhost:3003, auto-label
 *   node screenshot.mjs http://localhost:3003    → explicit URL
 *   node screenshot.mjs http://localhost:3003 hero  → saves as screenshot-N-hero.png
 *
 * Screenshots are saved to ./screenshots/ with auto-incrementing filenames.
 * Requires: npm install puppeteer --save-dev
 * Dev server must be running: npm run dev
 */

import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const url = process.argv[2] || "http://localhost:3003";
const label = process.argv[3] || "";
const viewportWidth = process.argv[4] ? parseInt(process.argv[4]) : 1440;
const viewportHeight = process.argv[5] ? parseInt(process.argv[5]) : 900;
const fullPage = process.argv.includes("--full");
const scrollArg = process.argv.find((a) => a.startsWith("--scroll="));
const scrollY = scrollArg ? parseInt(scrollArg.split("=")[1]) : 0;

const screenshotsDir = path.join(__dirname, "screenshots");
if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
}

function nextIndex() {
  const existing = fs
    .readdirSync(screenshotsDir)
    .filter((f) => f.startsWith("screenshot-") && f.endsWith(".png"))
    .map((f) => parseInt(f.replace("screenshot-", "").split(/[-.]/, 1)[0]))
    .filter((n) => !isNaN(n));
  return existing.length ? Math.max(...existing) + 1 : 1;
}

const n = nextIndex();
const filename = label
  ? `screenshot-${n}-${label}.png`
  : `screenshot-${n}.png`;
const outPath = path.join(screenshotsDir, filename);

const browser = await puppeteer.launch({
  headless: true,
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});

const page = await browser.newPage();
await page.setViewport({ width: viewportWidth, height: viewportHeight, deviceScaleFactor: 1 });

try {
  // "load" not "networkidle2": the dev server's HMR websocket keeps the
  // network busy forever, so idle-based waits time out.
  await page.goto(url, { waitUntil: "load", timeout: 30000 });
  await new Promise((r) => setTimeout(r, 1500));
  if (scrollY) await page.evaluate((y) => window.scrollTo(0, y), scrollY);
  await page.screenshot({ path: outPath, fullPage });
  console.log(`Saved: screenshots/${filename}`);
} finally {
  await browser.close();
}
