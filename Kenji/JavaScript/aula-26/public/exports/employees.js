const birthdays = async (date) => {
  const data = await fetch(`/employees/birthdays?date=${date}`);

  return data.json();
};

const branch_lines = async (line) => {
  const data = await fetch(`/employees/branch_lines?line=${line}`);

  return data.json();
};

const sectors = async (sector) => {
  const data = await fetch(`/employees/sectors?sector=${sector}`);

  return data.json();
};


export { birthdays, branch_lines, sectors };