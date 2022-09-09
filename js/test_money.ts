import { strictEqual, deepStrictEqual } from "assert"

class Money {
    amount: number;
    currency: "EUR" | "USD" | "KRW";

    constructor(amount: number, currency: "EUR" | "USD" | "KRW") {
        this.amount = amount;
        this.currency = currency;
    }

    times(multiplier: number) : Money {
        return new Money(this.amount * multiplier, this.currency)
    }

    divide(divisor: number): Money {
        return new Money(this.amount / divisor, this.currency);
    }
}

let fiver: Money = new Money(5, "USD");
let tenner = new Money(10, "USD")
deepStrictEqual(fiver.times(2), tenner);
let tenEuros: Money = new Money(10, "EUR");
let twentyEuros = new Money(20, "EUR");
deepStrictEqual(tenEuros.times(2), twentyEuros);
deepStrictEqual(twentyEuros.currency, "EUR");
let originalMoney = new Money(4002, "KRW");
let actualMoneyAfterDivision = originalMoney.divide(4);
let expectedMoneyAfterDivision = new Money(1000.5, "KRW");
deepStrictEqual(actualMoneyAfterDivision, expectedMoneyAfterDivision);