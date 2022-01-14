const validation = () => {
  return (req, res, next) => {
    const key = Object.keys(req.query)[0].toLowerCase();
    const value = Object.values(req.query)[0].toLowerCase();

    if (!key || !value) {
      res.send({ body: { error: true, msg: 'no query' } });
    } else if (value.length < 4) {
      res.send({ body: { error: true, msg: 'query must have a minimum of 4 characters' } });
    } else {
      req.query = { key: key, value: value }
      next();
    }
  }
}

module.exports = validation;