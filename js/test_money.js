"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var assert_1 = require("assert");
var Dollar = /** @class */ (function () {
    function Dollar(num) {
        this.amount = 0;
        this.amount = num;
    }
    Dollar.prototype.times = function (multiplier) {
        return new Dollar(this.amount * multiplier);
    };
    return Dollar;
}());
var fiver = new Dollar(5);
var tenner = fiver.times(2);
(0, assert_1.strictEqual)(tenner.amount, 10);
