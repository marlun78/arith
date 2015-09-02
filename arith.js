(function () {
    'use strict';

    var _root = typeof self === 'object' && self.self === self && self ||
        typeof global === 'object' && global.global === global && global ||
        this;
    var _slice = Array.prototype.slice;
    var _toString = Object.prototype.toString;
    var _isArray = Array.isArray || function (value) {
            return _toString.call(value) === '[object Array]';
        };
    var _isFinite = Number.isFinite || function (value) {
            return isFinite(value) === value === value;
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
        _root.arith = Arith;
    }

    function makeStaticMethod(calc, returns) {
        return function (args) {
            var result = null;
            args = _isArray(args) ? args : toArray(arguments);
            var multiplier = findCommonMultiplier(args);
            var number, index;
            var length = args.length;
            for (index = 0; index < length; index++) {
                number = parseFloat(args[index]);
                if (!_isFinite(number)) {
                    throw new TypeError('Cannot preform arithmetic on ' + number);
                }
                result = calc(result, number * multiplier);
            }
            return returns(result, multiplier, length);
        };
    }

    function makePrototypeMethod(method) {
        /** @this Arith */
        return function (args) {
            args = _isArray(args) ? args : toArray(arguments);
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

    function toArray(value) {
        return _slice.call(value);
    }
}());
