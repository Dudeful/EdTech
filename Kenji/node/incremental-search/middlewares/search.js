const users = require('../users.json');

const user = () => {
  return (req, res, next) => {
    let filteredUsers = users;
    let { key, value } = req.query;

    console.log(key, value);

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
  }
}

module.exports = { user };