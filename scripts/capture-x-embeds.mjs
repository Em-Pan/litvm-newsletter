#!/usr/bin/env node
import { existsSync, mkdirSync, rmSync, statSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { spawn, spawnSync } from 'node:child_process';

const DEFAULT_CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const chrome = process.env.CHROME_BIN || DEFAULT_CHROME;
const input = process.argv[2] ? resolve(process.argv[2]) : resolve('scripts/litvm-april-x-urls.txt');
const outputDir = process.argv[3] ? resolve(process.argv[3]) : resolve('images/x-posts-april');
const width = process.env.XSHOT_WIDTH || '640';
const height = process.env.XSHOT_HEIGHT || '1100';
const waitMs = Number(process.env.XSHOT_WAIT_MS || 25000);

if (!existsSync(chrome)) {
  console.error(`Chrome not found at ${chrome}. Set CHROME_BIN to a local Chrome/Chromium binary.`);
  process.exit(1);
}

mkdirSync(outputDir, { recursive: true });

const source = await readFile(input, 'utf8');
const entries = source
  .split(/\r?\n/)
  .map((line) => line.trim())
  .filter((line) => line && !line.startsWith('#'))
  .map((line, index) => {
    const [slug, url] = line.split(/\s+/, 2);
    if (!url) throw new Error(`Line ${index + 1} must be: slug URL`);
    const id = url.match(/status\/(\d+)/)?.[1];
    if (!id) throw new Error(`Could not find tweet id in ${url}`);
    return { index: index + 1, slug, url, id };
  });

const magick = spawnSync('which', ['magick'], { encoding: 'utf8' }).stdout.trim();
const sleep = (ms) => new Promise((resolveSleep) => setTimeout(resolveSleep, ms));

async function waitForStableFile(path, maxMs) {
  const started = Date.now();
  let lastSize = -1;
  let stableCount = 0;

  while (Date.now() - started < maxMs) {
    if (existsSync(path)) {
      const size = statSync(path).size;
      if (size > 0 && size === lastSize) stableCount += 1;
      else stableCount = 0;
      lastSize = size;
      if (stableCount >= 2) return true;
    }
    await sleep(500);
  }

  return false;
}

function cleanupChrome(profileDir) {
  spawnSync('pkill', ['-f', profileDir], { stdio: 'ignore' });
  rmSync(profileDir, { recursive: true, force: true });
}

for (const entry of entries) {
  const name = `${String(entry.index).padStart(2, '0')}-${entry.slug}.png`;
  const rawPath = join(outputDir, `${String(entry.index).padStart(2, '0')}-${entry.slug}.raw.png`);
  const finalPath = join(outputDir, name);
  const profileDir = join('/tmp', `litvm-xshot-${entry.id}`);
  rmSync(profileDir, { recursive: true, force: true });
  rmSync(rawPath, { force: true });

  const embedUrl = `https://platform.twitter.com/embed/Tweet.html?dnt=true&id=${entry.id}`;
  const args = [
    '--headless=new',
    '--disable-gpu',
    '--disable-background-networking',
    '--disable-component-update',
    '--disable-sync',
    '--no-first-run',
    `--user-data-dir=${profileDir}`,
    '--hide-scrollbars',
    `--window-size=${width},${height}`,
    '--virtual-time-budget=9000',
    `--screenshot=${rawPath}`,
    embedUrl,
  ];

  console.log(`Capturing ${entry.url}`);
  const child = spawn(chrome, args, { stdio: 'ignore' });
  const ready = await waitForStableFile(rawPath, waitMs);
  child.kill('SIGTERM');
  cleanupChrome(profileDir);

  if (!ready) throw new Error(`Timed out before screenshot was written for ${entry.url}`);

  if (magick) {
    const trim = spawnSync(magick, [rawPath, '-fuzz', '2%', '-trim', '+repage', finalPath], { encoding: 'utf8' });
    if (trim.status !== 0) {
      console.warn(`Trim failed for ${rawPath}; keeping raw screenshot.`);
      console.warn(trim.stderr || trim.stdout);
    } else {
      rmSync(rawPath, { force: true });
    }
  }

  console.log(`Saved ${existsSync(finalPath) ? finalPath : rawPath}`);
}

console.log(`Done. Output: ${outputDir}`);
