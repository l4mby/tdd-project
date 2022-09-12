"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Portfolio = void 0;
const money_1 = require("./money");
class Portfolio {
    constructor() {
        this.moneys = [];
    }
    add(...moneys) {
        this.moneys = this.moneys.concat(moneys);
    }
    evaluate(bank, currency) {
        let failures = [];
        let total = this.moneys.reduce((sum, money) => {
            try {
                let convertedMoney = bank.convert(money, currency);
                return sum + convertedMoney.amount;
            }
            catch (error) {
                failures.push(error.message);
                return sum;
            }
        }, 0);
        if (!failures.length) {
            return new money_1.Money(total, currency);
        }
        throw new Error("Missing exchange rate(s):[" + failures.join() + "]");
    }
}
exports.Portfolio = Portfolio;
