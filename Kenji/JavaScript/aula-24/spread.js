// const multiplyArgs = (...args) => {
//   const result = args.reduce((acc, curr) => acc * curr);
//   return result;
// }

const multiplyArgs = (a, b, c, d, e) => {
  const result = a * b * c * d * e;
  return result;
}

const concatenateVector = (vector1, vector2) => {
  const vector3 = [...vector1, ...vector2];
  
  return vector3;
}

const maxValue = () => {
  const randomValues = [];

  for(let i = 0; i < 100; i++){
    randomValues.push(Math.ceil(Math.random() * 100));
  }

  return Math.max(...randomValues);
}

const aux = [1,2,3,4,5];
const aux2 = [6,7,8,9,0];

console.log(multiplyArgs(...aux));

console.log(concatenateVector(aux, aux2));

console.log(maxValue());