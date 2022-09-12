"use strict";
function identity(x) {
    return x;
}
const num = identity(1);
const str = identity("1");
function xyz(e) {
    return e.a;
}
const x = { a: "a", b: 1, l: [1, 2, 3] };
console.log(xyz(x));
