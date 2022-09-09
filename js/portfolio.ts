import { Money } from "./money"

export class Portfolio {
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