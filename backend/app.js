require("dotenv").config();

const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express()
const port = 1337

// Routes
const orderRoute = require("./routes/order");
const menuRoute = require("./routes/menu");
const logRoute = require("./routes/log");

app.use(cors())

app.disable("x-powered-by");
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/routes/test.html");
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.use("/orders", orderRoute);
app.use("/menu", menuRoute);
app.use("/log", logRoute);

module.exports = app;