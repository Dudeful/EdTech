const express = require('express');
const app = express();
const router = express.Router();
const fs = require('fs');
app.use(express.json());

router.get('/sectors', (req, res) => {
  const query = req.query.sector;
  const employees = JSON.parse(fs.readFileSync('data/employees.json', 'utf8'));

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
  const employees = JSON.parse(fs.readFileSync('data/employees.json', 'utf8'));
  
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
  const employees = JSON.parse(fs.readFileSync('data/employees.json', 'utf8'));
  
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

  const employees = JSON.parse(fs.readFileSync('data/employees.json', 'utf8'));
  employees.push(newEmployee);

  fs.writeFile('data/employees.json', JSON.stringify(employees), (err) => {
    if(err) console.log(err);
    res.send({error: false, msg: 'the new employee has been saved'});
  });
});

router.delete('/delete-employee', (req, res) => {
  const employeeRegistration = req.query.id;

  if(req.query.id){
    const employees = JSON.parse(fs.readFileSync('data/employees.json', 'utf8'));
    
    const employee = employees.find((el) => el.registration === employeeRegistration);

    if(employee){
      const employeeIndex = employees.indexOf(employee);
      employees.splice(employeeIndex, 1);

      fs.writeFile('data/employees.json', JSON.stringify(employees), (err) => {
        if(err) console.log(err);
        res.send({error: false, msg: 'the new employee has been saved'});
      });
    }else{
      res.send({error: true, msg: 'no employee was found'});
    }
  }
});

module.exports = router;