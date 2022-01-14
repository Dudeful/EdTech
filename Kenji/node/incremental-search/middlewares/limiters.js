const debounce = (delay) => {
  let debouncing;
  return (req, res, next) => {
    clearTimeout(debouncing);
    debouncing = setTimeout(() => next(), delay);
  }
};

const throttle = (delay) => {
  let isThrottling;
  return (req, res, next) => {
    if (!isThrottling) {
      console.log('not throttling');
      isThrottling = true;
      setTimeout(() => isThrottling = false, delay);
      next();
    }
  }
};

module.exports = { debounce, throttle };