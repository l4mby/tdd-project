"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = require("assert");
const money_1 = require("./money");
const portfolio_1 = require("./portfolio");
const bank_1 = require("./bank");
class MoneyTest {
    constructor() {
        this.bank = new bank_1.Bank();
    }
    setUp() {
        this.bank = new bank_1.Bank();
        this.bank.addExchangeRate("EUR", "USD", 1.2);
        this.bank.addExchangeRate("USD", "KRW", 1100);
    }
    testMultiplication() {
        let tenEuros = new money_1.Money(10, "EUR");
        let twentyEuros = new money_1.Money(20, "EUR");
        (0, assert_1.deepStrictEqual)(tenEuros.times(2), twentyEuros);
    }
    testDivision() {
        let originalMoney = new money_1.Money(4002, "KRW");
        let actualMoneyAfterDivision = originalMoney.divide(4);
        let expectedMoneyAfterDivision = new money_1.Money(1000.5, "KRW");
        (0, assert_1.deepStrictEqual)(actualMoneyAfterDivision, expectedMoneyAfterDivision);
    }
    testAddition() {
        let fiveDollars = new money_1.Money(5, "USD");
        let tenDollars = new money_1.Money(10, "USD");
        let fifteenDollars = new money_1.Money(15, "USD");
        let portfolio = new portfolio_1.Portfolio();
        portfolio.add(fiveDollars, tenDollars);
        (0, assert_1.deepStrictEqual)(portfolio.evaluate(this.bank, "USD"), fifteenDollars);
    }
    runAllTests() {
        let testMethods = this.getAllTestMethods();
        testMethods.forEach(m => {
            console.log("Running %s()", m);
            let method = Reflect.get(this, m);
            try {
                this.setUp();
                Reflect.apply(method, this, []);
            }
            catch (error) {
                if (error instanceof assert_1.AssertionError) {
                    console.log(error);
                }
                else {
                    throw error;
                }
            }
        });
    }
    testAdditionOfDollarsAndEuros() {
        let fiveDollars = new money_1.Money(5, "USD");
        let tenEuros = new money_1.Money(10, "EUR");
        let portfolio = new portfolio_1.Portfolio();
        portfolio.add(fiveDollars, tenEuros);
        let expectedValue = new money_1.Money(17, "USD");
        (0, assert_1.deepStrictEqual)(portfolio.evaluate(this.bank, "USD"), expectedValue);
    }
    testAdditionOfDollarsAndWons() {
        let oneDollar = new money_1.Money(1, "USD");
        let elevenHundredWon = new money_1.Money(1100, "KRW");
        let portfolio = new portfolio_1.Portfolio();
        portfolio.add(oneDollar, elevenHundredWon);
        let expectedValue = new money_1.Money(2200, "KRW");
        (0, assert_1.deepStrictEqual)(portfolio.evaluate(this.bank, "KRW"), expectedValue);
    }
    testAdditionWithMultipleMissingExchangeRates() {
        let oneDollar = new money_1.Money(1, "USD");
        let oneEuro = new money_1.Money(1, "EUR");
        let oneWon = new money_1.Money(1, "KRW");
        let portfolio = new portfolio_1.Portfolio();
        portfolio.add(oneDollar, oneEuro, oneWon);
        let expectedError = new Error("Missing exchange rate(s):[USD->Kalganid,EUR->Kalganid,KRW->Kalganid]");
        (0, assert_1.throws)(() => portfolio.evaluate(this.bank, "Kalganid"), expectedError);
    }
    testConversionWithDifferentRatesBetweenTwoCurrencies() {
        let tenEuros = new money_1.Money(10, "EUR");
        (0, assert_1.deepStrictEqual)(this.bank.convert(tenEuros, "USD"), new money_1.Money(12, "USD"));
        this.bank.addExchangeRate("EUR", "USD", 1.3);
        (0, assert_1.deepStrictEqual)(this.bank.convert(tenEuros, "USD"), new money_1.Money(13, "USD"));
    }
    testWhatIsTheConversionRateFromEURToUSD() {
        let tenEuros = new money_1.Money(10, "EUR");
        (0, assert_1.deepStrictEqual)(this.bank.convert(tenEuros, "USD"), new money_1.Money(12, "USD"));
    }
    getAllTestMethods() {
        let moneyPrototype = MoneyTest.prototype;
        let allProps = Object.getOwnPropertyNames(moneyPrototype);
        let testMethods = allProps.filter(p => {
            return typeof moneyPrototype[p] === 'function' && p.startsWith("test");
        });
        return testMethods;
    }
}
new MoneyTest().runAllTests();
