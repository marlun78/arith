'use strict';

var arith = typeof require !== 'undefined' ? require('../arith') : window.arith;

describe('arith', function () {
    var cases = {
        addition: [
            { input: [0.1, 0.2], expect: 0.3 },
            { input: [5.555, 3.38], expect: 8.935 }
        ],
        division: [
            { input: [3.3, 2.5], expect: 1.32 },
            { input: [33.33, 20], expect: 1.6665 }
        ],
        multiplication: [
            { input: [33.3, 7], expect: 233.1 },
            { input: [457, 736.46], expect: 336562.22 }
        ],
        subtraction: [
            { input: [199.99, 100], expect: 99.99 },
            { input: [5.555, 3.39], expect: 2.165 }
        ]
    };
    describe('function', function () {
        it('should be a constructor', function () {
            expect(new arith()).toEqual(jasmine.any(arith));
        });
        it('should allow new-less calls', function () {
            expect(arith()).toEqual(jasmine.any(arith));
        });
        it('should have instance methods', function () {
            var instance = arith();
            expect(instance.add).toBeDefined();
            expect(instance.divide).toBeDefined();
            expect(instance.multiply).toBeDefined();
            expect(instance.subtract).toBeDefined();
            expect(instance.value).toBeDefined();
        });
        it('should have static methods', function () {
            expect(arith.add).toBeDefined();
            expect(arith.divide).toBeDefined();
            expect(arith.multiply).toBeDefined();
            expect(arith.subtract).toBeDefined();
            expect(arith.value).not.toBeDefined();
        });
    });

    // Methods
    describe('[instance] value()', function () {
        it('should return the wrapped value', function () {
            expect(arith(5).value()).toBe(5);
        });
    });
    describe('[instance] add()', function () {
        it('should except an array of values as well as spreaded arguments and strings', function () {
            expect(arith(0).add([1, 2, 3]).value()).toBe(6);
            expect(arith(0).add(1, 2, 3).value()).toBe(6);
            expect(arith('0').add('1', '2', '3').value()).toBe(6);
            expect(arith(0).add(1).add(2).add(3).value()).toBe(6);
        });
        it('should throw if input cannot be parsed into a finite number', function () {
            expect(function () { arith(0).add('abc'); }).toThrow(jasmine.any(TypeError));
        });
        cases.addition.forEach(function (data) {
            it('should do addition', function () {
                expect(arith(data.input[0]).add(data.input[1]).value()).toBe(data.expect);
            });
        });
        it('should return an instance of Arith', function () {
            expect(arith(0).add(1)).toEqual(jasmine.any(arith));
        });
    });
    describe('[instance] subtract()', function () {
        it('should except an array of values as well as spreaded arguments and strings', function () {
            expect(arith(10).subtract([1, 2, 3]).value()).toBe(4);
            expect(arith(10).subtract(1, 2, 3).value()).toBe(4);
            expect(arith('10').subtract('1', '2', '3').value()).toBe(4);
            expect(arith(10).subtract(1).subtract(2).subtract(3).value()).toBe(4);
        });
        it('should throw if input cannot be parsed into a finite number', function () {
            expect(function () { arith(0).subtract('abc'); }).toThrow(jasmine.any(TypeError));
        });
        cases.subtraction.forEach(function (data) {
            it('should do subtraction', function () {
                expect(arith(data.input[0]).subtract(data.input[1]).value()).toBe(data.expect);
            });
        });
        it('should return an instance of Arith', function () {
            expect(arith(2).subtract(1)).toEqual(jasmine.any(arith));
        });
    });
    describe('[instance] multiply()', function () {
        it('should except an array of values as well as spreaded arguments and strings', function () {
            expect(arith(2).multiply([2, 2, 2]).value()).toBe(16);
            expect(arith(2).multiply(2, 2, 2).value()).toBe(16);
            expect(arith('2').multiply('2', '2', '2').value()).toBe(16);
            expect(arith(2).multiply(2).multiply(2).multiply(2).value()).toBe(16);
        });
        it('should throw if input cannot be parsed into a finite number', function () {
            expect(function () { arith(0).multiply('abc'); }).toThrow(jasmine.any(TypeError));
        });
        cases.multiplication.forEach(function (data) {
            it('should do multiplication', function () {
                expect(arith(data.input[0]).multiply(data.input[1]).value()).toBe(data.expect);
            });
        });
        it('should return an instance of Arith', function () {
            expect(arith(1).multiply(1)).toEqual(jasmine.any(arith));
        });
    });
    describe('[instance] divide()', function () {
        it('should except an array of values as well as spreaded arguments and strings', function () {
            expect(arith(32).divide([2, 2, 2]).value()).toBe(4);
            expect(arith(32).divide(2, 2, 2).value()).toBe(4);
            expect(arith('32').divide('2', '2', '2').value()).toBe(4);
            expect(arith(32).divide(2).divide(2).divide(2).value()).toBe(4);
        });
        it('should throw if input cannot be parsed into a finite number', function () {
            expect(function () { arith(0).divide('abc'); }).toThrow(jasmine.any(TypeError));
        });
        cases.division.forEach(function (data) {
            it('should do division', function () {
                expect(arith(data.input[0]).divide(data.input[1]).value()).toBe(data.expect);
            });
        });
        it('should return an instance of Arith', function () {
            expect(arith(2).divide(1)).toEqual(jasmine.any(arith));
        });
    });

    // Static methods
    describe('[static] add()', function () {
        it('should do addition', function () {
            expect(arith.add(1, 2, 3)).toBe(6);
        });
    });
    describe('[static] subtract()', function () {
        it('should do subtraction', function () {
            expect(arith.subtract(10, 5, 3)).toBe(2);
        });
    });
    describe('[static] multiply()', function () {
        it('should do multiplication', function () {
            expect(arith.multiply(2, 2, 2)).toBe(8);
        });
    });
    describe('[static] divide()', function () {
        it('should do division', function () {
            expect(arith.divide(16, 4, 2)).toBe(2);
        });
    });
});