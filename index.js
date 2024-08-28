const express = require("express");
const app = express();
const mongoose = require("mongoose");
const kataRoute = require("./routes/kata.routes.js");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", (req, res) => {
  res.send("bisa bang");
});

app.use("/", kataRoute);

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
