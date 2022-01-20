const render_div = document.getElementById('render_data');

const render_data = (data) => {
  render_div.innerHTML = '';
  console.log(data);

  data.forEach(el => {
    const inner_div = document.createElement('div');
    inner_div.className = 'employee_div';

    Object.keys(el).forEach(key => {
      inner_div.innerHTML += `<p>${key}: ${el[key]}</p>`;
    });

    render_div.appendChild(inner_div);
  })
}

export { render_data };