// Simple hello world buffer exported for the demo
const HELLO = "hello world";

export fn getHelloPtr() [*]const u8 {
    return HELLO.ptr;
}

export fn getHelloLen() usize {
    return HELLO.len;
}
