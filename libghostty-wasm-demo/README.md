# libGhostty WASM Demo

This directory hosts a tiny experiment loading a libGhostty WebAssembly module.

## Build

Requires Zig 0.13.0 and Bun. Run `./build.sh` to compile the Zig source and bundle the TypeScript frontend. Outputs land in `dist/`. Open `index.html` in Safari to interact; typed keys echo to the canvas and the display resizes with the window.

## Visual test
Run `bunx playwright install webkit` once to download the browser. Then `bun visual-test.ts` launches WebKit headlessly and captures the canvas. The first run writes a lossless WebP baseline under `vr-baseline/`. Later runs compare against it and place results in `vr-output/`.
