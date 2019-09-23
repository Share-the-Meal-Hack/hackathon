const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");

const port = process.env.PORT || 3001;

app.use(logger('dev'));

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const playersRouter = require("./routes/players");
app.use("/players", playersRouter);

app.listen(port, function() {
  console.log("Runnning on " + port);
});

module.exports = app;