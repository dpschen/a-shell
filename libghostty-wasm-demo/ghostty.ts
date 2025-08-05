// Entry point for the libGhostty WASM demo
const canvas = document.getElementById('screen') as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!;

// Compile and instantiate the WASM module
const { instance } = await WebAssembly.instantiateStreaming(
  fetch('dist/libghostty.wasm'),
  {},
);

const memory = instance.exports.memory as WebAssembly.Memory;
const ptr = (instance.exports.getHelloPtr as () => number)();
const len = (instance.exports.getHelloLen as () => number)();
let buffer = new TextDecoder().decode(
  new Uint8Array(memory.buffer, ptr, len),
);

// Draw current buffer to the canvas
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = '20px monospace';
  ctx.fillText(buffer, 10, 30);
  requestAnimationFrame(draw);
}

// Append text to the buffer
function write(text: string) {
  buffer += text;
}

// Echo key presses
window.addEventListener('keydown', (e) => {
  e.preventDefault();
  if (e.key === 'Backspace') {
    buffer = buffer.slice(0, -1);
    return;
  }
  if (e.key === 'Enter') {
    write('\n');
    return;
  }
  if (e.key.length === 1) {
    write(e.key);
  }
});

// Keep canvas size in sync with the window
function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

requestAnimationFrame(draw);
