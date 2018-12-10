const express = require("express");
const app = express();
const cors = require("cors");
const famousRoutes = require("./routes/famousRoutes");

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: false
  })
);

app.use("/", famousRoutes);

app.listen(4000, function() {
  console.log("Example app listening on port 4000!");
});
