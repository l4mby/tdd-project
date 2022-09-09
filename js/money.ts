export class Money {
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