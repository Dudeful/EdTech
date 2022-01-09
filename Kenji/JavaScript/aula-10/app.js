function calc(value_1, value_2, operation) {
  if (operation === 'sum') {
    document.getElementById('result_span').innerText = parseFloat(value_1) + parseFloat(value_2);
  }
  if (operation === 'subtraction') {
    document.getElementById('result_span').innerText = parseFloat(value_1) - parseFloat(value_2);
  }
  if (operation === 'division') {
    document.getElementById('result_span').innerText = parseFloat(value_1) / parseFloat(value_2);
  }
  if (operation === 'multiplication') {
    document.getElementById('result_span').innerText = parseFloat(value_1) * parseFloat(value_2);
  }

  document.getElementById('result').setAttribute('style', 'display: flex');
  console.log(value_1, value_2, operation);
}
