const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT || 3000;
const app = express();
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
const csv = require("csv-parser");
const db = require("./config/mongoose");
const bodyParser = require("body-parser");


// accessing static files from assets folder
app.use(express.static("./assets"));

// setting layouts
app.use(expressLayouts);

// middleware for parse data from request body
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

//setting up view engine
app.set("view engine", "ejs");
app.set("views", "./views");

app.use("/", require("./routes/index"));

app.listen(port, function (err) {
  if (err) {
    console.log(`Error: ${err}`);
    return;
  }
  console.log(`Server is up and runnig on port:' ${port}`);
});
