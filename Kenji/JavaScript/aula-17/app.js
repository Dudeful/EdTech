const htmlResults = document.createElement('div');
htmlResults.setAttribute('id', 'results');

//---the initial cars loaded with the game---
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

//---the racers and their cars history---
let racers = [
  {
    name: 'pedro',
    lastLapWins: 0,
    points: 0,
    level: 1,
    cars,
  },
  {
    name: 'juca',
    lastLapWins: 0,
    points: 0,
    level: 1,
    cars,
  },
  {
    name: 'edna',
    lastLapWins: 0,
    points: 0,
    level: 1,
    cars,
  },
];

//---draw a random speed---
const randomSpeed = (min1, max1, min2, max2, minSkid, maxSkid) => {
  let minSpeed = Math.floor(Math.random() * (max1 - min1 + 1) + min1);
  let maxSpeed = Math.floor(Math.random() * (max2 - min2 + 1) + min2);
  let skid = Math.random() * (maxSkid - minSkid) + minSkid;
  let speed =
    Math.floor(Math.random() * (maxSpeed - minSpeed + 1) + minSpeed) * ((100 - skid) / 100);

  return speed;
};

//---draw a random car---
const randomCar = () => {
  let randomNum = Math.floor(Math.random() * 100 + 1);

  if (randomNum <= 60) return cars.popular;
  else if (randomNum > 60 && randomNum <= 95) return cars.sport;
  else return cars.supersport;
};

//---check the winner for each lap---
const lapWinner = () => {
  let highestSpeed = { name: '', speed: 0 };

  racers.forEach((racer) => {
    let lapSpeed = randomSpeed(
      racer.cars[racer.currentCar.model].minSpeed.min,
      racer.cars[racer.currentCar.model].minSpeed.max,
      racer.cars[racer.currentCar.model].maxSpeed.min,
      racer.cars[racer.currentCar.model].maxSpeed.max,
      cars[racer.cars[racer.currentCar.model].model].skid.min,
      cars[racer.cars[racer.currentCar.model].model].skid.max
    );
    racer.cars[racer.currentCar.model].speed = lapSpeed;
    racer.currentCar.speed = lapSpeed;

    if (lapSpeed > highestSpeed.speed) {
      highestSpeed = { name: racer.name, speed: lapSpeed };
    }
  });

  racers.forEach((racer) => {
    if (racer.name === highestSpeed.name) {
      racer.lastLapWins++;
    }
  });
};

//---add the points to winners---
const addPoints = (laps) => {
  if (laps == 10) {
    racers[0].points += 200;
    racers[1].points += 120;
    racers[2].points += 50;
  } else if (laps == 70) {
    racers[0].points += 220;
    racers[1].points += 130;
    racers[2].points += 75;
  } else if (laps == 160) {
    racers[0].points += 250;
    racers[1].points += 150;
    racers[2].points += 90;
  } else {
    racers[0].points += 200;
  }
};

//---start the race---
const race = (laps) => {
  htmlResults.innerHTML = '';
  winners = [];

  racers.forEach((racer) => {
    let currentCar = JSON.parse(JSON.stringify(randomCar()));
    racer.lastLapWins = 0;
    racer.currentCar = currentCar;
    racer.cars[currentCar.model] = currentCar;

    let levelUp = Math.floor(racer.points / 450 + 1);

    if (levelUp <= 10 && levelUp > racer.level) {
      racer.level = levelUp;

      racer.cars[currentCar.model].minSpeed.min += racer.currentCar.minSpeed.min * 0.01;
      racer.cars[currentCar.model].minSpeed.max += racer.currentCar.minSpeed.max * 0.01;
      racer.cars[currentCar.model].maxSpeed.min += racer.currentCar.maxSpeed.min * 0.01;
      racer.cars[currentCar.model].maxSpeed.max += racer.currentCar.maxSpeed.max * 0.01;

      console.log('LVL UP!', racer.name.toUpperCase(), 'CurrentCar:', currentCar);
    }
  });

  if (laps) {
    for (let volta = 1; volta <= laps; volta++) {
      lapWinner();
    }
  } else {
    let random_laps = Math.floor(Math.random() * (160 - 10 + 1) + 10);
    for (let volta = 1; volta <= random_laps; volta++) {
      lapWinner();
    }
  }

  racers.sort((a, b) => b.lastLapWins - a.lastLapWins);

  if (racers[0].lastLapWins === racers[1].lastLapWins) {
    tiebreaker();
  } else {
    addPoints(laps);

    racers.forEach((racer) => {
      htmlResults.innerHTML += `
        <h3>${racer.name.toUpperCase()} WON ${racer.lastLapWins} LAPS!</h3>
        <h5>Level: ${racer.level}</h5>
        <h5>Points: ${racer.points}</h5>
        <h5>Car: ${racer.currentCar.model.toUpperCase()}</h5>
        <h5>Speed last lap: ${Math.round(racer.currentCar.speed * 100) / 100} km/h</h5>
      `;
    });

    document.getElementById('container').appendChild(htmlResults);
  }
};

//---deal with draws---
const tiebreaker = () => {
  console.log("IT'S A MATCH!!");

  const match = document.createElement('h3');
  match.setAttribute('id', 'tiebreaker');
  match.innerText = "IT'S A MATCH!!";

  document.getElementById('container').appendChild(match);

  setTimeout(() => document.getElementById('tiebreaker').remove(), 5000);

  race(1);
};
