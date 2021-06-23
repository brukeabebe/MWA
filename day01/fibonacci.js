
fib= function(number) {

  const numval= Math.abs(number);
if (numval <= 2) {
return 1;
} else {
return fib(numval-1) + fib(numval-2);
} } ;
console.log("Fibonacci of number 25 "+ "is " + fib(25));
console.log("Fibonacci of number -17 " + "is " + fib(-17));