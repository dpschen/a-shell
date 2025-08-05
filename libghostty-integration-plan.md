# Integration Plan: Replace xterm with libGhostty (Browser Only)

## MVP Outside a-Shell

### Phase 1 – Barebones WASM Demo
- [x] Build libGhostty for WebAssembly
  - [x] Obtain libGhostty source
  - [x] Compile with Zig: `zig build -Dtarget=wasm32-wasi -Drelease-small`
- [x] Minimal HTML/JS loader
  - [x] Create `index.html` that loads `ghostty.js`
  - [x] `ghostty.js` fetches and instantiates `libghostty.wasm`
- [x] Hard-coded rendering loop
  - [x] Call a draw function in `requestAnimationFrame`
  - [x] Render a "hello world" buffer without user input

### Phase 2 – Basic Interactivity
- [x] Keyboard input wiring
  - [x] Add `keydown` event listeners translating to `Ghostty.onKey`
- [x] Shell output simulation
  - [x] Implement `write()` wrapper echoing key presses
- [x] Resize handling
  - [x] Update terminal dimensions when the window size changes
- [x] Minimal styling
  - [x] Apply basic CSS for canvas sizing and font

## a-Shell Integration Phases

### Phase 3 – Replace xterm Usage
- [ ] Assess current xterm usage
  - [ ] Catalogue modifier math and escape handling in `script.js`
  - [ ] Note default `TERM` in `hterm_all.js` and Swift layer forcing `TERM`
  - [ ] Identify xterm-specific extensions or dependencies
- [ ] Build libGhostty for WebAssembly
  - [ ] Ensure WASM exposes initialization, rendering, input, and resize APIs
- [ ] Create JavaScript glue layer
  - [ ] Load WASM via `WebAssembly.instantiateStreaming`
  - [ ] Map libGhostty events to DOM updates
  - [ ] Forward keyboard/mouse events and provide `write()` for shell output
- [ ] Swap xterm logic in `script.js` and `hterm_all.js`
- [ ] Set `TERM=ghostty` and remove xterm assets

### Phase 4 – Styling & Theming
- [ ] Port existing fonts and CSS from xterm/hterm
- [ ] Implement light/dark and custom theme switching

### Phase 5 – Advanced Features
- [ ] Re-implement clipboard, context menu, drag-and-drop, and URL handling

### Phase 6 – Testing, Optimization & Documentation
- [ ] Run functional, performance, and cross-browser tests
- [ ] Verify accessibility (screen readers, keyboard navigation)
- [ ] Document build steps, user docs, and deployment process
