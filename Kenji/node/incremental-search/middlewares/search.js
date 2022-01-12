const users = require('../../../../../users.json');

const user = () => {
  return (req, res, next) => {
    const key = Object.keys(req.query)[0].toLowerCase();
    const value = Object.values(req.query)[0].toLowerCase();

    if (value) {
      let filteredUsers = users;

      value.split(' ').forEach(partialValue => {
        filteredUsers = filteredUsers.filter(
          user => user[key].toLowerCase().includes(partialValue)
        );
      });

      if (filteredUsers[0]) {
        req.body = { error: false, data: filteredUsers };
        next();
      } else {
        req.body = { error: true, msg: 'no user found' };
        next();
      };
    } else {
      req.body = { error: true, msg: 'no query' };
      next();
    };
  }
}

module.exports = { user };