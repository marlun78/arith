# arith

You have probably seen this example a thousand times, you do something like 0.1 + 0.2 and you get 0.30000000000000004. 
This is because some numbers can’t be accurately represented by JavaScript’s only number type 
(IEEE 754 Binary Floating-Point). This obviously leads to a lot of headache for us developers. So this is an attempt to 
cure that. The library is very small (only ~1500 bytes) and it only has four methods; `add`, `divide`, `multiply` and 
`subtract` in two flavours.


### Examples using static methods

Addition
```js
arith.add(5, 10); // => 15 
```

Deviation
```js
arith.divide(6, 2); // => 3 
```

Multiplication
```js
arith.multiply(2, 3, 4); // => 24 
```

Subtraction
```js
arith.subtract(15, 10); // => 5
```

You can also pass in strings
```js
arith.add('2', '3'); // => 5
```

Or even an array!
```js
arith.add([2, 3, 4]); // => 9
```


### Examples using instance methods

The difference here is that you can chain multiple operations together. To get the result, you need to call the 
`.value()`-method. 

Simple addition
```js
arith(5).add(10).value(); // => 15
```

Chain multiple operations together
```js
arith(10).add(10).subtract(5).value(); // => 15 
```

Just like the static methods, you can also pass in multiple arguments
```js
arith(1).add(2, 3, 4).value(); // => 10 
```

They also except strings
```js
arith('1').add('2').value(); // => 3 
```

Or an array
```js
arith(1).add([2, 3, 4]).value(); // => 10
```
 
