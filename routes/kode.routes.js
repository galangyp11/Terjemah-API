const Kode = require("../models/kode.model.js");
const express = require("express");
const router = express.Router();

router.post("/kode", async (req, res) => {
  try {
    const kode = await Kode.create(req.body);
    res.status(200).json(kode);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/kode", async (req, res) => {
  try {
    const kode = await Kode.find({});
    res.status(200).json(kode);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/kode/:id", async (req, res) => {
  try {
    const { id } = req.params;

    console.log("body", req.body);
    const kode = await Kode.findByIdAndUpdate(
      { _id: id },
      { kode: req.body.kode },
      {
        new: true,
      }
    );

    res.status(200).json(kode);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/kode/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const kode = await Kode.deleteOne({ _id: id });
    res.status(200).json(kode);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
