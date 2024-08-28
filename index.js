const express = require("express");
const app = express();
const mongoose = require("mongoose");
const kataRoute = require("./routes/kata.routes.js");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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
