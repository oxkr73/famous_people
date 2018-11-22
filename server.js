const fs = require("fs");
const express = require("express");
const app = express();

const famousJson = new Promise((resolve, reject) => {
  fs.readFile("./famous.json", "utf8", (err, data) => {
    if (err) {
      throw err;
    } else {
      resolve(JSON.parse(data));
    }
  });
});

let timeStyle = "";
let out = "";
let start = 2000;

const init = () => {
  famousJson.then(data => {
    //console.log("Data received : ", data);
    searchByYear(start, data);
    timeStyle = `
        #main_time_bar{
            background: #ddd;
            display:inline-block;
            width:100%;
            height:50px;
    }`;
    out = `<!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <meta http-equiv="X-UA-Compatible" content="ie=edge">
                    <title>Famous People</title>
                    <style>${timeStyle}</style>
                </head>
                <body>
                <h1>Famous People</h1>
                <p>From 2000 to onwards</p>
                <div id="main_time_bar"></div>
                </body>
            </html>`;
  });
};

let searchByYear = (start, people) => {
  for (let index = 0; index < people.length; index++) {
    let live = people[index].live.split(" ");
    const born = live[0];
    const death = live[2] || null;
    console.log(people[index].live + " | " + born + "::" + death);
  }
};

app.get("/", function(req, res) {
  res.send(out);
});

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});

init();
