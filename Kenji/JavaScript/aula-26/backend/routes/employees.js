const express = require('express');
const router = express.Router();
const employees = require('../data/employees.json');

router.get('/sectors', (req, res) => {
  const query = req.query.sector;

  if (query) {
    const filteredEmployees = employees.filter(
      el => el.sector.toLowerCase().includes(query.toLowerCase())
    );

    if (!filteredEmployees[0]) {
      res.send({ error: true, msg: 'no employee found' })
    } else {
      res.send({ data: filteredEmployees });
    };
  } else {
    res.send({ error: true, msg: 'no query provided' });
  }
})

router.get('/branch_lines', (req, res) => {
  const query = req.query.line;

  if (query) {
    const filteredEmployees = employees.filter(
      el => el.branch_line.toLowerCase().includes(query.toLowerCase())
    );

    if (!filteredEmployees[0]) {
      res.send({ error: true, msg: 'no employee found' })
    } else {
      filteredEmployees.sort(
        (a, b) => Number(a.branch_line) > Number(b.branch_line) ? 1 : -1
      );
      res.send({ data: filteredEmployees });
    };

  } else {
    res.send({ error: true, msg: 'no query provided' });
  }
})

router.get('/birthdays', (req, res) => {
  const query = req.query.date;

  if (query) {
    const filteredEmployees = employees.filter(
      el => el.birthday.slice(3, 5) == query || el.birthday.slice(3, 5) == '0' + query
    );

    if (!filteredEmployees[0]) {
      res.send({ error: true, msg: 'no employee found' })
    } else {
      res.send({ data: filteredEmployees });
    };

  } else {
    res.send({ error: true, msg: 'no query provided' });
  }
})

module.exports = router;