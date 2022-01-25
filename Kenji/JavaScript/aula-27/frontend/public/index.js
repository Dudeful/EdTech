import { birthdays, branch_lines, sectors, postEmployee, deleteEmployee } from './exports/employees.js';
import { render_data } from './exports/render_data.js';

document.getElementById('get_employees_button').addEventListener('click', () => getEmployeesData());
document.getElementById('post_employee_button').addEventListener('click', () => postEmployeeData());
document.getElementById('delete_employee_button').addEventListener('click', () => deleteEmployeeData());

const getEmployeesData = async () => {
  const query = document.getElementById('query').value;
  const param = document.getElementById('param').value;

  switch (param) {
    case 'BIRTHDAY':
      const employeesByBirthday = await birthdays(query);
      if (employeesByBirthday.error) {
        console.error(employeesByBirthday.msg);
        render_data([employeesByBirthday]);
        break;
      };
      render_data(employeesByBirthday.data);
      break;

    case 'BRANCH LINE':
      const employeesByLine = await branch_lines(query);
      if (employeesByLine.error) {
        console.error(employeesByLine.msg);
        render_data([employeesByLine]);
        break;
      };
      render_data(employeesByLine.data);
      break;

    case 'SECTOR':
      const employeesBySector = await sectors(query);
      if (employeesBySector.error) {
        console.error(employeesBySector.msg);
        render_data([employeesBySector]);
        break;
      };
      render_data(employeesBySector.data);
      break;

    default:
      alert('please provide a parameter');
      break;
  }
}

const postEmployeeData = async () => {
  const employeeData = document.querySelectorAll('.employee_data');

  const employeeDataObj = {};

  Array.from(employeeData).forEach(el => {
    employeeDataObj[el.name] = el.value;
   });

  const postResponse = await postEmployee(employeeDataObj);

  console.log(postResponse);

  if(!postResponse.error){
    clearForm();
  }
}

const clearForm = () => {
  const employeeData = document.querySelectorAll('.employee_data');
  
  Array.from(employeeData).forEach(el => el.value = '');
}

const deleteEmployeeData = async () => {
  const employeeRegistration = document.getElementById('employee_registration').value;

  const deleteResponse = await deleteEmployee(employeeRegistration);

  console.log(deleteResponse);
}