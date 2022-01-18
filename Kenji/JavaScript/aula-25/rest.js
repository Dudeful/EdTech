const infinityParams = (greetings, ...args) => {
  const infinityParams = args;
  console.log(greetings);

  return infinityParams;
};

console.log(infinityParams('hello friend', 1,2,4,5,6,7,8,9,0));