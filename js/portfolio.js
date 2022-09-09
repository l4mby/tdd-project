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
    evaluate(currency) {
        let total = this.moneys.reduce((sum, money) => {
            return sum + money.amount;
        }, 0);
        return new money_1.Money(total, currency);
    }
}
exports.Portfolio = Portfolio;
