#!/usr/bin/env bun
// Visual regression test for the libGhostty WASM demo
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';
import pixelmatch from 'pixelmatch';
import { webkit } from 'playwright';

const demoDir = path.dirname(fileURLToPath(import.meta.url));
const baselineDir = path.join(demoDir, 'vr-baseline');
const outDir = path.join(demoDir, 'vr-output');
const baselineImg = path.join(baselineDir, 'canvas.webp');
const currentPng = path.join(outDir, 'current.png');
const currentWebp = path.join(outDir, 'current.webp');

await fs.promises.mkdir(baselineDir, { recursive: true });
await fs.promises.mkdir(outDir, { recursive: true });

const browser = await webkit.launch();
const page = await browser.newPage();
await page.goto('file://' + path.join(demoDir, 'index.html'));
await page.evaluate(() => new Promise(requestAnimationFrame));
await page.screenshot({ path: currentPng });
await browser.close();

await sharp(currentPng).webp({ lossless: true }).toFile(currentWebp);
await fs.promises.unlink(currentPng);

if (!fs.existsSync(baselineImg)) {
  await fs.promises.copyFile(currentWebp, baselineImg);
  console.log('Baseline image created');
  process.exit(0);
}

const base = await sharp(baselineImg).raw().ensureAlpha().toBuffer({ resolveWithObject: true });
const curr = await sharp(currentWebp).raw().ensureAlpha().toBuffer({ resolveWithObject: true });
const { width, height } = base.info;
const diffPixels = pixelmatch(base.data, curr.data, undefined, width, height, { threshold: 0.1 });

if (diffPixels > 0) {
  console.error(`Visual diff found: ${diffPixels} pixels differ`);
  process.exit(1);
}
console.log('Visual match');

