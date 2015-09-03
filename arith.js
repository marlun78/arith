(function () {
    'use strict';

    var root = typeof self === 'object' && self.self === self && self ||
        typeof global === 'object' && global.global === global && global ||
        this;
    var objectToString = Object.prototype.toString;
    var isArray = Array.isArray || function (value) {
        return objectToString.call(value) === '[object Array]';
    };
    var arraySlice = Array.prototype.slice;
    var toArray = function (value) {
        return arraySlice.call(value);
    };

    function Arith(value) {
        if (!(this instanceof Arith)) {
            return new Arith(value);
        }
        this._value = value;
    }

    Arith.add = makeStaticMethod(addCalc, addReturns);
    Arith.divide = makeStaticMethod(divideCalc, divideReturns);
    Arith.multiply = makeStaticMethod(multiplyCalc, multiplyReturns);
    Arith.subtract = makeStaticMethod(subtractCalc, subtractReturns);

    Arith.prototype = {
        constructor: Arith,
        add: makePrototypeMethod(Arith.add),
        divide: makePrototypeMethod(Arith.divide),
        multiply: makePrototypeMethod(Arith.multiply),
        subtract: makePrototypeMethod(Arith.subtract),
        value: function value() {
            return this._value;
        }
    };

    // Export for Node and global for browsers
    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = Arith;
        }
        exports.arith = Arith;
    } else {
        root.arith = Arith;
    }

    function makeStaticMethod(calc, returns) {
        return function (args) {
            var result = null;
            args = isArray(args) ? args : toArray(arguments);
            var multiplier = findCommonMultiplier(args);
            var number, index, item;
            var length = args.length;
            for (index = 0; index < length; index++) {
                item = args[index];
                number = parseFloat(item);
                if (!isFinite(number)) {
                    throw new TypeError('Cannot preform arithmetic on ' + item + ' (' + typeof item + ')');
                }
                result = calc(result, number * multiplier);
            }
            return returns(result, multiplier, length);
        };
    }

    function makePrototypeMethod(method) {
        /** @this Arith */
        return function (args) {
            args = isArray(args) ? args : toArray(arguments);
            args.unshift(this._value);
            this._value = method(args);
            return this;
        };
    }

    function findCommonMultiplier(args) {
        var multiplier;
        var common = 0;
        var index = 0;
        var length = args.length;
        for (; index < length; index++) {
            multiplier = findMultiplier(args[index]);
            if (common < multiplier) {
                common = multiplier;
            }
        }
        return common;
    }

    function findMultiplier(number) {
        var decimals = String(number).split('.')[1];
        if (!decimals) {
            return 1;
        }
        return Math.pow(10, decimals.length);
    }

    function addCalc(a, b) {
        return a === null ? b : a + b;
    }

    function addReturns(result, multiplier) {
        return result / multiplier;
    }

    function divideCalc(a, b) {
        return a === null ? b : a / b;
    }

    function divideReturns(result) {
        return result;
    }

    function multiplyCalc(a, b) {
        return a === null ? b : a * b;
    }

    function multiplyReturns(result, multiplier, length) {
        return result / Math.pow(multiplier, length);
    }

    function subtractCalc(a, b) {
        return a === null ? b : a - b;
    }

    function subtractReturns(result, multiplier) {
        return result / multiplier;
    }

}());
