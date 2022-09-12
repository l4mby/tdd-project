function identity<T>(x: T) : T{
    return x;
}

const num = identity(1);
const str = identity<string>("1");

interface Example1 {
    a: string;
    b: number;
    l: number[];
}

interface Example2 {
    a: string;
}

function xyz(e: Example2) {
    return e.a;
}

const x: Example1 = { a: "a", b: 1, l: [1, 2, 3]}
console.log(xyz(x));