"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = require("assert");
class Money {
    constructor(amount, currency) {
        this.amount = amount;
        this.currency = currency;
    }
    times(multiplier) {
        return new Money(this.amount * multiplier, this.currency);
    }
    divide(divisor) {
        return new Money(this.amount / divisor, this.currency);
    }
}
class Portfolio {
    constructor() {
        this.moneys = [];
    }
    add(...moneys) {
        this.moneys = this.moneys.concat(moneys);
    }
    evaluate(currency) {
        let total = this.moneys.reduce((sum, money) => {
            return sum + money.amount;
        }, 0);
        return new Money(total, currency);
    }
}
// -------------------- TESTS --------------------
let fiveDollars = new Money(5, "USD");
let tenDollars = new Money(10, "USD");
(0, assert_1.deepStrictEqual)(fiveDollars.times(2), tenDollars);
let tenEuros = new Money(10, "EUR");
let twentyEuros = new Money(20, "EUR");
(0, assert_1.deepStrictEqual)(tenEuros.times(2), twentyEuros);
(0, assert_1.deepStrictEqual)(twentyEuros.currency, "EUR");
let originalMoney = new Money(4002, "KRW");
let actualMoneyAfterDivision = originalMoney.divide(4);
let expectedMoneyAfterDivision = new Money(1000.5, "KRW");
(0, assert_1.deepStrictEqual)(actualMoneyAfterDivision, expectedMoneyAfterDivision);
let fifteenDollars = new Money(15, "USD");
let portfolio = new Portfolio();
portfolio.add(fiveDollars, tenDollars);
(0, assert_1.deepStrictEqual)(portfolio.evaluate("USD"), fifteenDollars);
