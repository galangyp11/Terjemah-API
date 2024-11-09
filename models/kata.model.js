const mongoose = require("mongoose");

const KataSchema = mongoose.Schema(
  {
    indonesia: {
      type: String,
      required: [true, "Masukan kata Indonesia"],
      // required: true,
    },
    sunda: {
      type: String,
      required: [true, "Masukan kata Sunda"],
      // required: true,
    },
  },
  {
    timestamp: true,
  }
);

const Kata = mongoose.model("Kata", KataSchema);

module.exports = Kata;
