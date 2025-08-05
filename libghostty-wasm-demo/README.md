# libGhostty WASM Demo

This directory hosts a tiny experiment loading a libGhostty WebAssembly module.

## Build

Requires Zig 0.13.0.
Run `./build.sh` to compile the Zig source.
The resulting `libghostty.wasm` is written to `dist/`.
Open `index.html` in a browser to see the rendered text.

## Visual test

`bun visual-test.js` launches WebKit headlessly and captures the canvas.
The first run writes a lossless WebP baseline under `vr-baseline/`.
Later runs compare against it and place results in `vr-output/`.
