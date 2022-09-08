import { strictEqual } from "assert"

class Dollar {
    amount = 0;

    constructor(num: number){
        this.amount = num;
    }

    times(multiplier: number) : Dollar{
        return new Dollar(this.amount * multiplier);
    }
}

let fiver: Dollar = new Dollar(5);
let tenner = fiver.times(2);

strictEqual(tenner.amount, 10);