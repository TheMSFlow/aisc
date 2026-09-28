#!/usr/bin/env node
/**
 * aisc.mjs -- starts the local AISC site and the content dashboard together.
 *
 *     npm run aisc         site on http://localhost:3003
 *                          dashboard on http://localhost:3010 (opens itself)
 *
 * Runs the existing `npm run dev` and `npm run dashboard` scripts side by side,
 * so those stay the single definition of each. Use them on their own when you
 * only want one: `npm run dev` starts just the site.
 *
 * Output is prefixed [site] / [dash]. Ctrl+C stops both. If either one exits
 * (a port already in use, a crash), the other is stopped too.
 *
 * LOCAL ONLY. Nothing here is part of the Next build or the deployed site.
 */

import { spawn, spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DASHBOARD_URL = `http://localhost:${process.env.DASHBOARD_PORT || 3010}`;
const WIN = process.platform === "win32";

const TASKS = [
  { name: "site", script: "dev", color: 36 },
  { name: "dash", script: "dashboard", color: 35 },
];

const children = [];
let stopping = false;
let opened = false;

function openBrowser(url) {
  if (WIN) spawn("cmd", ["/c", "start", "", url], { detached: true }).unref();
  else spawn(process.platform === "darwin" ? "open" : "xdg-open", [url], { detached: true }).unref();
}

function pipe(stream, task) {
  const tag = `\x1b[${task.color}m[${task.name}]\x1b[0m `;
  let buf = "";
  stream.on("data", (chunk) => {
    buf += chunk.toString();
    const lines = buf.split(/\r?\n/);
    buf = lines.pop();
    for (const line of lines) {
      process.stdout.write(tag + line + "\n");
      if (task.name === "dash" && !opened && line.includes(DASHBOARD_URL)) {
        opened = true;
        openBrowser(DASHBOARD_URL);
      }
    }
  });
  stream.on("end", () => buf && process.stdout.write(tag + buf + "\n"));
}

// npm runs each script under a shell, so kill the whole process tree.
function kill(child) {
  if (child.exitCode !== null || child.killed) return;
  if (WIN) spawnSync("taskkill", ["/pid", String(child.pid), "/T", "/F"], { stdio: "ignore" });
  else {
    try {
      process.kill(-child.pid, "SIGTERM");
    } catch {
      child.kill("SIGTERM");
    }
  }
}

function stopAll(code) {
  if (stopping) return;
  stopping = true;
  children.forEach(kill);
  process.exit(code);
}

for (const task of TASKS) {
  const child = spawn("npm", ["run", task.script], {
    cwd: ROOT,
    shell: true,
    env: { ...process.env, FORCE_COLOR: "1" },
    detached: !WIN, // own process group, so SIGTERM reaches npm's children
  });
  pipe(child.stdout, task);
  pipe(child.stderr, task);
  child.on("exit", (code) => {
    if (stopping) return;
    console.log(`\n[${task.name}] exited (code ${code}). Stopping the other one.`);
    console.log(`If it says EADDRINUSE, that server is already running in another terminal.\n`);
    stopAll(code || 0);
  });
  children.push(child);
}

console.log(`\n  AISC local: site + dashboard. Ctrl+C stops both.\n`);

process.on("SIGINT", () => stopAll(0));
process.on("SIGTERM", () => stopAll(0));
