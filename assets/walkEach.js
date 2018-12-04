const fs = require("fs");

const fileTemp = new Promise((resolve, reject) => {
  fs.readFile("./famous.txt", "utf8", (err, data) => {
    if (err) {
      throw err;
    } else {
      resolve(data);
    }
  });
});

let famous = [];

function People(name, live, desc) {
  this.name = name;
  this.live = live;
  this.desc = desc;
}

fileTemp.then(
  result => {
    let splitted = result.split(/\r?\n/);
    splitted.forEach(people => {
      const name = people.substring(0, people.indexOf("(")).trim();
      const live = people
        .substring(people.indexOf("(") + 1, people.indexOf(")"))
        .trim();
      const desc = people.substr(people.indexOf(")") + 1).trim();
      famous.push(new People(name, live, desc));
    });

    fs.writeFile("../famous.json", JSON.stringify(famous), "utf8", err => {
      if (err) {
        throw err;
      }
      console.log("Famous JSON created");
    });

    console.log(famous);
  },
  error => console.log(error)
);
