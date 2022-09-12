"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bank = void 0;
const money_1 = require("./money");
class Bank {
    constructor() {
        this.exchangeRates = new Map();
    }
    addExchangeRate(currencyFrom, currencyTo, rate) {
        let key = currencyFrom + "->" + currencyTo;
        this.exchangeRates.set(key, rate);
    }
    convert(money, currency) {
        if (money.currency === currency)
            return new money_1.Money(money.amount, money.currency);
        let key = money.currency + "->" + currency;
        let rate = this.exchangeRates.get(key);
        if (rate === undefined)
            throw new Error(key);
        else
            return new money_1.Money(money.amount * rate, currency);
    }
}
exports.Bank = Bank;
