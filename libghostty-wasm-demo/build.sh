#!/bin/sh
set -e

# Build the WASM demo and its browser assets
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
OUT_DIR="$SCRIPT_DIR/dist"

mkdir -p "$OUT_DIR"

# Compile Zig source to WebAssembly
zig build-lib "$SCRIPT_DIR/hello.zig" \
  -target wasm32-wasi \
  -O ReleaseSmall \
  -femit-bin="$OUT_DIR/libghostty.wasm"

# Transpile the TypeScript frontend for Safari
bun build "$SCRIPT_DIR/ghostty.ts" \
  --outfile "$OUT_DIR/ghostty.js" \
  --target browser
