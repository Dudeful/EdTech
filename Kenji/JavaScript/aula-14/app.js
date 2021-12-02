const formatCustomArray = (arrayInput) => {
  let arr = arrayInput
    .replaceAll(' ', '')
    .split(',')
    .filter((e) => e)
    .map((e) => Number(e));

  return arr;
};

const saveToArray = () => {
  const custom_array = document.getElementById('array_input').value;

  if (custom_array) {
    var arr = formatCustomArray(custom_array);
  } else {
    let inputs = document.getElementById('standard_inputs').querySelectorAll('input');
    var arr = [];
    for (let i = 0; i < inputs.length; i++) {
      arr[i] = inputs[i].value;
    }
  }

  let finalArray = [...arr];
  console.log(finalArray);

  document.getElementById('render_array').innerHTML = `[${finalArray}]`;
  document.getElementById('render_array_title').innerHTML = 'Estes são os elementos da array';
};

const reverseArray = () => {
  const custom_array = document.getElementById('array_input').value;

  if (custom_array) {
    var arr = formatCustomArray(custom_array);
  } else {
    let inputs = document.getElementById('standard_inputs').querySelectorAll('input');
    var arr = [];

    for (let i = 0; i < inputs.length; i++) {
      arr[i] = inputs[i].value;
    }
  }

  let reversed = [];
  for (let i = arr.length; i > 0; i--) {
    reversed[arr.length - i] = arr[i - 1];
  }

  let finalArray = [...reversed];
  console.log(finalArray);

  document.getElementById('render_array').innerHTML = `[${finalArray}]`;
  document.getElementById('render_array_title').innerHTML = 'Estes são os elementos da array invertidos';
};

const sortArray = () => {
  const custom_array = document.getElementById('array_input').value;

  if (custom_array) {
    var arr = formatCustomArray(custom_array);
    console.log('custom');
  } else {
    let inputs = document.getElementById('standard_inputs').querySelectorAll('input');
    var arr = [];

    for (let i = 0; i < inputs.length; i++) {
      arr[i] = Number(inputs[i].value);
    }
  }

  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] > arr[i + 1]) {
      let aux = arr[i];
      arr[i] = arr[i + 1];
      arr[i + 1] = aux;

      i = -1;
    }
  }

  let finalArray = [...arr];
  console.log(finalArray);

  document.getElementById('render_array').innerHTML = `[${finalArray}]`;
  document.getElementById('render_array_title').innerHTML = 'Estes são os elementos da array ordenados';
};

const customArray = () => {
  const array_input = document.getElementById('array_input');
  array_input.classList.toggle('display_custom');

  const standard_inputs = document.getElementById('standard_inputs');
  standard_inputs.classList.toggle('display_standard');

  document.getElementById('array_input').value = '';
};
