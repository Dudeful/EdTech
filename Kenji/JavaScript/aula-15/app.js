let k = 1;
let matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

const playerMove = (pos, index1, index2) => {
  let move = document.getElementById(pos);

  if (typeof matrix[index1][index2] === 'number') {
    if (k % 2 === 0) {
      move.innerText = 'X';
      matrix[index1][index2] = 'X';
    } else {
      move.innerText = 'O';
      matrix[index1][index2] = 'O';
    }

    setTimeout(() => {
      if (matrix[0][0] === matrix[1][1] && matrix[0][1] === matrix[0][2]) {
        alert(`JOGADOR "${matrix[0][0]}" VENCE!!`);
        clearBoard();
      } else if (matrix[1][0] === matrix[1][1] && matrix[1][1] === matrix[1][2]) {
        alert(`JOGADOR "${matrix[1][0]}" VENCE!!`);
        clearBoard();
      } else if (matrix[2][0] === matrix[2][1] && matrix[2][1] === matrix[2][2]) {
        alert(`JOGADOR "${matrix[2][0]}" VENCE!!`);
        clearBoard();
      } else if (matrix[0][0] === matrix[1][0] && matrix[1][0] === matrix[2][0]) {
        alert(`JOGADOR "${matrix[0][0]}" VENCE!!`);
        clearBoard();
      } else if (matrix[0][2] === matrix[1][2] && matrix[1][2] === matrix[2][2]) {
        alert(`JOGADOR "${matrix[0][2]}" VENCE!!`);
        clearBoard();
      } else if (matrix[0][0] === matrix[1][1] && matrix[1][1] === matrix[2][2]) {
        alert(`JOGADOR "${matrix[0][0]}" VENCE!!`);
        clearBoard();
      } else if (matrix[0][2] === matrix[1][1] && matrix[1][1] === matrix[2][0]) {
        alert(`JOGADOR "${matrix[0][2]}" VENCE!!`);
        clearBoard();
      } else if (k === 10) {
        alert(`É UM EMPATE!!!`);
        clearBoard();
      }
    }, 20);

    k++;
  }
};

const clearBoard = () => {
  k = 1;
  matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];

  const inputs = document.getElementById('tictactoe').querySelectorAll('span');

  inputs.forEach((el) => (el.innerText = ''));
};
