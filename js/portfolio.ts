import { Money } from "./money"
import { Bank } from "./bank"

export class Portfolio {
    moneys: Money[];

    add(...moneys: Money[]) {
        this.moneys = this.moneys.concat(moneys);
    }

    evaluate(bank: Bank, currency: "EUR" | "USD" | "KRW") : Money{
        let failures: string[] = [];
        let total = this.moneys.reduce( (sum, money) => {
            try {
                let convertedMoney = bank.convert(money, currency);
                return sum + convertedMoney.amount;
            } catch (error: any) {
                failures.push(error.message);
                return sum;
            }
        }, 0);
        if (!failures.length){
            return new Money(total, currency);
        }
        throw new Error("Missing exchange rate(s):[" + failures.join() + "]")
    }

    constructor() {
        this.moneys = [];
    }
}