const mongoose = require("mongoose");

const KodeSchema = mongoose.Schema(
  {
    kode: {
      type: String,
      required: [true, ""],
    },
  },
  {
    timestamp: true,
  }
);

const kode = mongoose.model("kode", KodeSchema);

module.exports = kode;
