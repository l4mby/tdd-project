import { Money } from "./money"

export class Portfolio {
    moneys: Money[];

    add(...moneys: Money[]) {
        this.moneys = this.moneys.concat(moneys);
    }

    evaluate(currency: "EUR" | "USD" | "KRW") : Money{
        let failures: string[] = [];
        let total = this.moneys.reduce( (sum, money) => {
            let convertedAmount = this.convert(money, currency);
            if (convertedAmount === undefined){
                failures.push(money.currency + "->" + currency);
                return sum;
            }
            return sum + convertedAmount;
        }, 0);
        if (!failures.length){
            return new Money(total, currency);
        }
        throw new Error("Missing exchange rate(s):[" + failures.join() + "]")
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
                return undefined;
            else
                return money.amount * factor;
        }
    }

    constructor() {
        this.moneys = [];
    }
}