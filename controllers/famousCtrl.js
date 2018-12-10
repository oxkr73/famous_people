const fs = require("fs");

const famousJson = new Promise((resolve, reject) => {
  fs.readFile("./famous.json", "utf8", (err, data) => {
    if (err) {
      throw err;
    } else {
      resolve(JSON.parse(data));
    }
  });
});

let start = 2000;
const today = "" + new Date().getFullYear();
const ages = [
  2000,
  1900,
  1800,
  1700,
  1600,
  1500,
  1400,
  1300,
  1200,
  1100,
  1000,
  900,
  800,
  700,
  600,
  500,
  400,
  300,
  200,
  100,
  0,
  -100
];

let famousCtrl = {
  index: (req, res) => {
    start = req.params.year || start;
    famousJson.then(data => {
      let exitTimeLine = timeLine(start);
      let timeResult = "";
      let famousPeople = searchByYear(start, data);
      let famous = "";

      for (let index = 0; index < exitTimeLine.length; index++) {
        timeResult += exitTimeLine[index];
      }

      for (let index = 0; index < famousPeople.length; index++) {
        let posLeft = Number(famousPeople[index].born.slice(2)) + "%";
        let posTop = Math.floor(Math.random() * 90) + "%";
        famous += `<div class="famous" style="left:${posLeft};top:${posTop}">
                  <span class="pointer">·</span>
                  <div class="f-name">${famousPeople[index].name}</div>
                  <div class="f-data">${famousPeople[index].live}</div>
                </div>`;
      }
      res.json(famousPeople);
    });
  },
  centuries: (req, res) => {
    start = req.params.year || start;
    const totalCenturies = 1 + (2000 - start) / 100;
    res.json({ totalCenturies, ages });
  }
};

let timeLine = century => {
  let centuriesLine = [];
  const totalCenturies = 1 + (2000 - century) / 100;
  for (let index = 0; index < totalCenturies; index++) {
    let cents = `<div class="century_${index}"></div>`;
    centuriesLine.push(cents);
  }
  return centuriesLine;
};

let searchByYear = (start, people) => {
  let peopleMatch = [];
  for (let index = 0; index < people.length; index++) {
    const live = people[index].live.split("–");
    let born = live[0].trim();
    let death = live[1].trim() || today;

    if (born.indexOf("BC") > 0 || born.indexOf("BCE") > 0) {
      let beforCrist = born.split(" ");
      born = `-${beforCrist[0]}`;
    }

    if (death.indexOf("BC") > 0 || death.indexOf("BCE") > 0) {
      let beforCrist = death.split(" ");
      death = `-${beforCrist[0]}`;
    } else if (death.indexOf("AD") > 0 || death.indexOf("CE") > 0) {
      let afterCrist = death.split(" ");
      death = afterCrist[0];
    }

    if (born >= start) {
      people[index].born = born;
      peopleMatch.push(people[index]);
    }
  }
  //console.log(peopleMatch);
  return peopleMatch;
};

module.exports = { famousCtrl };
