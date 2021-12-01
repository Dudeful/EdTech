const results = document.createElement('div');
results.setAttribute('id', 'results');

let speedsObj = { pedro: undefined, juca: undefined, edna: undefined };
let winnersArray = [];

const fixedSpeeds = (speedsObj) => {
  speedsObj.pedro = Math.floor(Math.random() * (230 - 150 + 1) + 150) * 0.97;
  speedsObj.juca = Math.floor(Math.random() * (260 - 120 + 1) + 120) * 0.95;
  speedsObj.edna = Math.floor(Math.random() * (220 - 180 + 1) + 180) * 0.99;
};

const randomSpeeds = (speedsObj) => {
  let speed1 =
    Math.floor(Math.random() * (230 - 150 + 1) + 150) *
    (Math.floor(Math.random() * (99 - 92 + 1) + 92) / 100);

  let speed2 =
    Math.floor(Math.random() * (260 - 120 + 1) + 120) *
    (Math.floor(Math.random() * (99 - 92 + 1) + 92) / 100);

  let speed3 =
    Math.floor(Math.random() * (220 - 180 + 1) + 180) *
    (Math.floor(Math.random() * (99 - 92 + 1) + 92) / 100);

  const randomSpeed = () => Math.floor(Math.random() * 4 + 1);

  switch (randomSpeed()) {
    case 1:
      speedsObj.pedro = speed1;
      speedsObj.juca = speed2;
      speedsObj.edna = speed3;
      break;

    case 2:
      speedsObj.pedro = speed2;
      speedsObj.juca = speed1;
      speedsObj.edna = speed3;
      break;

    case 3:
      speedsObj.pedro = speed3;
      speedsObj.juca = speed2;
      speedsObj.edna = speed1;
      break;

    case 4:
      speedsObj.pedro = speed1;
      speedsObj.juca = speed3;
      speedsObj.edna = speed2;
      break;
  }
};

const winner = (speedPedro, speedJuca, speedEdna) => {
  if (speedPedro > speedJuca && speedPedro > speedEdna) {
    winnersArray.push('pedro');
  } else if (speedJuca > speedEdna && speedJuca > speedPedro) {
    winnersArray.push('juca');
  } else {
    winnersArray.push('edna');
  }
};

const finalWinner = () => {
  const countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);
  console.log('Edna: ' + countOccurrences(winnersArray, 'edna'));
  console.log('Pedro: ' + countOccurrences(winnersArray, 'pedro'));
  console.log('Juca: ' + countOccurrences(winnersArray, 'juca'));

  let pedroResults = countOccurrences(winnersArray, 'pedro');
  let jucaResults = countOccurrences(winnersArray, 'juca');
  let ednaResults = countOccurrences(winnersArray, 'edna');
  let winnerResults = Math.max(ednaResults, pedroResults, jucaResults);

  if (
    (pedroResults === jucaResults && pedroResults === winnerResults) ||
    (pedroResults === ednaResults && pedroResults === winnerResults) ||
    (jucaResults === ednaResults && jucaResults === winnerResults)
  ) {
    tiebreaker();
  }

  if (pedroResults > jucaResults && pedroResults > ednaResults) {
    return `Pedro Wins!! ${winnerResults} laps`;
  } else if (jucaResults > ednaResults && jucaResults > pedroResults) {
    return `Juca Wins!! ${winnerResults} laps!`;
  } else {
    return `Edna Wins!! ${winnerResults} laps`;
  }
};

const race = (laps) => {
  winnersArray = [];

  if (laps) {
    for (let volta = 1; volta <= laps; volta++) {
      fixedSpeeds(speedsObj);
      winner(speedsObj.pedro, speedsObj.juca, speedsObj.edna);
    }
  } else {
    let random_laps = Math.floor(Math.random() * (160 - 10 + 1) + 10);
    console.log('Random Laps: ' + random_laps);
    for (let volta = 1; volta <= random_laps; volta++) {
      randomSpeeds(speedsObj);
      winner(speedsObj.pedro, speedsObj.juca, speedsObj.edna);
    }
  }

  console.log(winnersArray);

  results.innerHTML = `
    <h3>${finalWinner()}</h3>
  `;
  document.getElementById('container').appendChild(results);
};

const tiebreaker = () => {
  const match = document.createElement('h3');
  match.setAttribute('id', 'tiebreaker');
  match.innerHTML = "IT'S A MATCH!!";
  document.getElementById('container').insertBefore(match, results);
  console.log("IT'S A MATCH!!");

  race(1);
};
