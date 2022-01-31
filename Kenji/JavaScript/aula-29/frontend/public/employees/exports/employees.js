// const apiURL = 'http://edtech.dudeful.com:5000';
const apiURL = 'http://localhost:5006';

const birthdays = async (date) => {
  const response = await fetch(`${apiURL}/employees/birthdays?date=${date}`);

  return response.json();
};

const branch_lines = async (line) => {
  const response = await fetch(`${apiURL}/employees/branch_lines?line=${line}`);

  return response.json();
};

const sectors = async (sector) => {
  const response = await fetch(`${apiURL}/employees/sectors?sector=${sector}`);

  return response.json();
};

const postEmployee = async (employee) => {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ data: employee })
  };

  const response = await fetch(`${apiURL}/employees/new-employee`, options);

  return response.json();
}

const deleteEmployee = async (employee) => {
  const response = await fetch(`${apiURL}/employees/delete-employee?id=${employee}`, { method: 'DELETE' });

  return response.json();
}

export { birthdays, branch_lines, sectors, postEmployee, deleteEmployee };