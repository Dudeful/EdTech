const birthdays = async (date) => {
  const data = await fetch(`http://edtech.dudeful.com:5000/employees/birthdays?date=${date}`);
  // const data = await fetch(`http://127.1.1.0:5001/employees/birthdays?date=${date}`);

  return data.json();
};

const branch_lines = async (line) => {
  const data = await fetch(`http://edtech.dudeful.com:5000/employees/branch_lines?line=${line}`);
  // const data = await fetch(`http://127.1.1.0:5001/employees/branch_lines?line=${line}`);

  return data.json();
};

const sectors = async (sector) => {
  const data = await fetch(`http://edtech.dudeful.com:5000/employees/sectors?sector=${sector}`);
  // const data = await fetch(`http://127.1.1.0:5001/employees/sectors?sector=${sector}`);

  return data.json();
};


export { birthdays, branch_lines, sectors };