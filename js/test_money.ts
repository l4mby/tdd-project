import assert, { strictEqual, deepStrictEqual } from "assert"

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

class Portfolio {
    moneys: Money[];

    add(...moneys: Money[]) {
        this.moneys = this.moneys.concat(moneys);
    }

    evaluate(currency: "EUR" | "USD" | "KRW") : Money{
        let total = this.moneys.reduce( (sum, money) => {
            return sum + money.amount;
        }, 0);
        return new Money(total, currency);
    }

    constructor() {
        this.moneys = [];
    }
}



// -------------------- TESTS --------------------

let fiveDollars: Money = new Money(5, "USD");
let tenDollars = new Money(10, "USD")
deepStrictEqual(fiveDollars.times(2), tenDollars);

let tenEuros: Money = new Money(10, "EUR");
let twentyEuros = new Money(20, "EUR");
deepStrictEqual(tenEuros.times(2), twentyEuros);
deepStrictEqual(twentyEuros.currency, "EUR");

let originalMoney = new Money(4002, "KRW");
let actualMoneyAfterDivision = originalMoney.divide(4);
let expectedMoneyAfterDivision = new Money(1000.5, "KRW");
deepStrictEqual(actualMoneyAfterDivision, expectedMoneyAfterDivision);

let fifteenDollars = new Money(15, "USD");
let portfolio: Portfolio = new Portfolio();
portfolio.add(fiveDollars, tenDollars);
deepStrictEqual(portfolio.evaluate("USD"), fifteenDollars);