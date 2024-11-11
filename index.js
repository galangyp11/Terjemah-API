const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const kataRoute = require("./routes/kata.routes.js");
const adminRoute = require("./routes/admin.routes.js");
const kodeRoute = require("./routes/kode.routes.js");
const kataModel = require("./models/kata.model.js");
const dataKata = require("./data-kata.json");

app.options("*", cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", (req, res) => {
  res.send(":D");
});

app.use("/", kataRoute);

app.use("/", adminRoute);

app.use("/", kodeRoute);

mongoose
  .connect(
    "mongodb+srv://Admin:Admin123@dbapi.iixtb.mongodb.net/TerjemahDB?retryWrites=true&w=majority&appName=DBAPI"
  )
  .then(() => {
    console.log("konek database");

    app.listen(3011, () => {
      console.log("Server di port 3011");
    });
  })
  .catch(() => {
    console.log("ga konek database");
  });
