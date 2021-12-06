const results = document.createElement('div');
results.setAttribute('id', 'results');

let winnersArray = [];

let racers = { edna: undefined, pedro: undefined, juca: undefined };

const cars = {
  popular: {
    model: 'popular',
    minSpeed: { min: 110, max: 130 },
    maxSpeed: { min: 180, max: 200 },
    skid: { min: 3, max: 4 },
  },
  sport: {
    model: 'sport',
    minSpeed: { min: 125, max: 145 },
    maxSpeed: { min: 195, max: 215 },
    skid: { min: 2, max: 3 },
  },
  supersport: {
    model: 'supersport',
    minSpeed: { min: 140, max: 160 },
    maxSpeed: { min: 210, max: 230 },
    skid: { min: 1, max: 1.75 },
  },
};

const speeds = (min1, max1, min2, max2, minSkid, maxSkid) => {
  let minSpeed = Math.floor(Math.random() * (max1 - min1 + 1) + min1);
  let maxSpeed = Math.floor(Math.random() * (max2 - min2 + 1) + min2);
  let skid = Math.random() * (maxSkid - minSkid) + minSkid;
  let speed = Math.floor(Math.random() * (maxSpeed - minSpeed + 1) + minSpeed) * ((100 - skid) / 100);

  return speed;
};

const carSpeeds = {
  popular: function () {
    return speeds(
      cars.popular.minSpeed.min,
      cars.popular.minSpeed.max,
      cars.popular.maxSpeed.min,
      cars.popular.maxSpeed.max,
      cars.popular.skid.min,
      cars.popular.skid.max
    );
  },

  sport: function () {
    return speeds(
      cars.popular.minSpeed.min,
      cars.popular.minSpeed.max,
      cars.popular.maxSpeed.min,
      cars.popular.maxSpeed.max,
      cars.popular.skid.min,
      cars.popular.skid.max
    );
  },

  supersport: function () {
    return speeds(
      cars.popular.minSpeed.min,
      cars.popular.minSpeed.max,
      cars.popular.maxSpeed.min,
      cars.popular.maxSpeed.max,
      cars.popular.skid.min,
      cars.popular.skid.max
    );
  },
};

const randomCar = () => {
  let randomNum = Math.floor(Math.random() * 100 + 1);

  if (randomNum <= 60) return cars.popular;
  else if (randomNum > 60 && randomNum <= 95) return cars.sport;
  else return cars.supersport;
};

const lapWinner = (racers) => {
  let pedroSpeed = carSpeeds[racers.pedro]();
  let jucaSpeed = carSpeeds[racers.juca]();
  let ednaSpeed = carSpeeds[racers.edna]();

  if (pedroSpeed > jucaSpeed && pedroSpeed > ednaSpeed) {
    winnersArray.push('Pedro');
  } else if (jucaSpeed > pedroSpeed && jucaSpeed > ednaSpeed) {
    winnersArray.push('Juca');
  } else if (ednaSpeed > pedroSpeed && ednaSpeed > jucaSpeed) {
    winnersArray.push('Edna');
  } else {
    winnersArray.push('Drawn');
  }
};

const finalWinner = () => {
  const countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);
  console.log('Edna: ' + countOccurrences(winnersArray, 'Edna'));
  console.log('Pedro: ' + countOccurrences(winnersArray, 'Pedro'));
  console.log('Juca: ' + countOccurrences(winnersArray, 'Juca'));

  let pedroResults = countOccurrences(winnersArray, 'Pedro');
  let jucaResults = countOccurrences(winnersArray, 'Juca');
  let ednaResults = countOccurrences(winnersArray, 'Edna');
  let winnerResults = Math.max(ednaResults, pedroResults, jucaResults);

  if (
    (pedroResults === jucaResults && pedroResults === winnerResults) ||
    (pedroResults === ednaResults && pedroResults === winnerResults) ||
    (jucaResults === ednaResults && jucaResults === winnerResults)
  ) {
    tiebreaker();

    return `${winnersArray[0]} Wins!!`;
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
  racers.edna = randomCar().model;
  racers.pedro = randomCar().model;
  racers.juca = randomCar().model;
  console.log(cars);
  console.log(racers);

  if (laps) {
    for (let volta = 1; volta <= laps; volta++) {
      lapWinner(racers);
    }
  } else {
    let random_laps = Math.floor(Math.random() * (160 - 10 + 1) + 10);
    for (let volta = 1; volta <= random_laps; volta++) {
      lapWinner(racers);
    }
  }

  console.log(winnersArray);

  results.innerHTML = `
    <h3>${finalWinner()}</h3>
  `;
  document.getElementById('container').appendChild(results);
};

const tiebreaker = () => {
  // console.log("IT'S A MATCH!!");

  const match = document.createElement('h3');
  match.setAttribute('id', 'tiebreaker');
  match.innerText = "IT'S A MATCH!!";

  document.getElementById('container').appendChild(match);

  setTimeout(() => document.getElementById('tiebreaker').remove(), 5000);

  race(1);
};
