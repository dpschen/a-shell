#!/bin/sh
set -e

# Resolve the directory of this script and the output folder
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
OUT_DIR="$SCRIPT_DIR/dist"

# Build the WASM module into dist/libghostty.wasm
mkdir -p "$OUT_DIR"
zig build-lib "$SCRIPT_DIR/hello.zig" \
  -target wasm32-wasi \
  -O ReleaseSmall \
  -femit-bin="$OUT_DIR/libghostty.wasm"

