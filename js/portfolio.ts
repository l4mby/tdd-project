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
        let exchangeRates = new Map<string, number>(); 
        exchangeRates.set("EUR->USD", 1.2);
        exchangeRates.set("USD->KRW", 1100);
        let key = money.currency + "->" + currency;
        if(money.currency === currency){
            return money.amount;
        } else {
            let factor = exchangeRates.get(key)
            if (factor === undefined)
                return money.amount * 0;
            else
                return money.amount * factor;
        }
    }

    constructor() {
        this.moneys = [];
    }
}