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
            return sum + this.convert(money, currency);
        }, 0);
        return new money_1.Money(total, currency);
    }
    convert(money, currency) {
        let exchangeRates = new Map();
        // exchangeRates.set("EUR->USD", 1.2);
        // exchangeRates.set("USD->KRW", 1100);
        let key = money.currency + "->" + currency;
        if (money.currency === currency) {
            return money.amount;
        }
        else {
            let factor = exchangeRates.get(key);
            if (factor === undefined)
                return money.amount * 0;
            else
                return money.amount * factor;
        }
    }
}
exports.Portfolio = Portfolio;
