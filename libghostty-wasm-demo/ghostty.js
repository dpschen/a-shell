const canvas = document.getElementById('screen');
const ctx = canvas.getContext('2d');

const { instance } = await WebAssembly.instantiateStreaming(
  fetch('dist/libghostty.wasm'),
  {},
);

const memory = instance.exports.memory;
const ptr = instance.exports.getHelloPtr();
const len = instance.exports.getHelloLen();
const text = new TextDecoder().decode(
  new Uint8Array(memory.buffer, ptr, len)
);

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = '20px monospace';
  ctx.fillText(text, 10, 30);
  requestAnimationFrame(draw);
}

requestAnimationFrame(draw);
