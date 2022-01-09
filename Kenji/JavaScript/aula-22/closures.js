const createMultiplier = (x) => {
  let multiplier = x;

  return function (n) {
    return multiplier * n;
  };
};

let multiplyBy5 = createMultiplier(5);

console.log(multiplyBy5(10));

console.log(multiplyBy5(12));

console.log(multiplyBy5(7));
