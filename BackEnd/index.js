const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");
const port = process.env.PORT || 3333;
const wordsRouter = require("./routes/words");
const playerRouter = require("./routes/player");

app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/word", wordsRouter);
app.use("/player", playerRouter);

app.listen(port, function () {
    console.log("Running on port: " + port);
});

module.exports = app;