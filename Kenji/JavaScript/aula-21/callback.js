const callback = (name) => {
  console.log(name);
};

const printName = (callback, name) => {
  const greetings = 'Hello there, ' + name + '!';

  callback(greetings);
};

printName(callback, 'Alpha EdTech');
