const express = require('express');
const app = express();
const router = express.Router();
const employees = require('../data/employees.json');
const fs = require('fs');
app.use(express.json());

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

router.post('/new-employee', (req, res) => {
  const newEmployee = req.body.data;

  // let stream = fs.createWriteStream('data/invoices.json', {flags: 'a'});
  // stream.write(JSON.stringify(newInvoice));
  // stream.end();

  let employees = JSON.parse(fs.readFileSync('data/employees.json', 'utf8'));
  employees.push(newEmployee);

  fs.writeFile('data/employees.json', JSON.stringify(employees), (err) => {
    if(err) console.log(err);
    res.send({error: false, msg: 'the new employee has been saved'});
  });
})

module.exports = router;