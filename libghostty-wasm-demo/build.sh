#!/bin/sh
set -eu

# Build the WASM demo and its browser assets
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
OUT_DIR="$SCRIPT_DIR/dist"

command -v zig >/dev/null 2>&1 || { echo "zig required" >&2; exit 1; }
command -v bun >/dev/null 2>&1 || { echo "bun required" >&2; exit 1; }

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
