const express = require("express");
const app = express();
const famousRoutes = require("./routes/famousRoutes");

app.use("/", famousRoutes);

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});
