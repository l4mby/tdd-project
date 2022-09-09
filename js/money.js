"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Money = void 0;
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
exports.Money = Money;
