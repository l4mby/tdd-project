import { Money } from "./money"

type Currency = "EUR" | "USD" | "KRW"

export class Bank {
    exchangeRates: Map<string, number>

    constructor() {
        this.exchangeRates = new Map();
    }

    addExchangeRate(currencyFrom: Currency, currencyTo: Currency, rate: number) {
        let key = currencyFrom + "->" + currencyTo;
        this.exchangeRates.set(key, rate);
    }

    convert(money: Money, currency: Currency){
        if(money.currency === currency)
            return new Money(money.amount, money.currency);
        let key = money.currency + "->" + currency;
        let rate = this.exchangeRates.get(key)
        if (rate === undefined)
            throw new Error(key);
        else
            return new Money(money.amount * rate, currency);
        
    }

}