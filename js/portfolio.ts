import { Money } from "./money"

export class Portfolio {
    moneys: Money[];

    add(...moneys: Money[]) {
        this.moneys = this.moneys.concat(moneys);
    }

    evaluate(currency: "EUR" | "USD" | "KRW") : Money{
        let total = this.moneys.reduce( (sum, money) => {
            return sum + this.convert(money, currency);
        }, 0);
        return new Money(total, currency);
    }

    convert(money: Money, currency: "EUR" | "USD" | "KRW"){
        let eurToUsd = 1.2; 
        if(money.currency === currency)
            return money.amount;
        else
            return money.amount * eurToUsd;
    }

    constructor() {
        this.moneys = [];
    }
}