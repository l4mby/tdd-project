import assert, { strictEqual, deepStrictEqual, AssertionError } from "assert"
import { Money } from "./money"
import { Portfolio } from "./portfolio"

class MoneyTest {
    [s: string] : any

    testMultiplication() {
        let tenEuros: Money = new Money(10, "EUR");
        let twentyEuros = new Money(20, "EUR");
        deepStrictEqual(tenEuros.times(2), twentyEuros);
    }

    testDivision() {
        let originalMoney = new Money(4002, "KRW");
        let actualMoneyAfterDivision = originalMoney.divide(4);
        let expectedMoneyAfterDivision = new Money(1000.5, "KRW");
        deepStrictEqual(actualMoneyAfterDivision, expectedMoneyAfterDivision);
    }

    testAddition() {
        let fiveDollars = new Money(5, "USD");
        let tenDollars = new Money(10, "USD")
        let fifteenDollars = new Money(15, "USD");
        let portfolio: Portfolio = new Portfolio();
        portfolio.add(fiveDollars, tenDollars);
        deepStrictEqual(portfolio.evaluate("USD"), fifteenDollars);
    }

    runAllTests() {
        let testMethods = this.getAllTestMethods();
        testMethods.forEach(m => {
            console.log("Running %s()", m);
            let method = Reflect.get(this, m);
            try {
                Reflect.apply(method, this, []);
            } catch (error) {
                if (error instanceof AssertionError) {
                    console.log(error);
                } else {
                    throw error;
                }
            }
        })
    }

    testAdditionOfDollarsAndEuros(){
        let fiveDollars = new Money(5, "USD");
        let tenEuros = new Money(10, "EUR");
        let portfolio = new Portfolio();
        portfolio.add(fiveDollars, tenEuros);
        let expectedValue = new Money(17, "USD");
        deepStrictEqual(portfolio.evaluate("USD"), expectedValue);
    }

    testAdditionOfDollarsAndWons(){
        let oneDollar = new Money(1, "USD");
        let elevenHundredWon = new Money(1100, "KRW");
        let portfolio = new Portfolio();
        portfolio.add(oneDollar, elevenHundredWon);
        let expectedValue = new Money(2200, "KRW");
        deepStrictEqual(portfolio.evaluate("KRW"), expectedValue);
    }

    getAllTestMethods() {
        let moneyPrototype = MoneyTest.prototype;
        let allProps = Object.getOwnPropertyNames(moneyPrototype);
        let testMethods = allProps.filter(p => {
            return typeof moneyPrototype[p] === 'function' && p.startsWith("test");
        })
        return testMethods;
    }
}

new MoneyTest().runAllTests();