const Kata = require("../models/kata.model.js");
const express = require("express");
const router = express.Router();

router.post("/kata", async (req, res) => {
  try {
    const kata = await Kata.create(req.body);
    res.status(200).json(kata);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/kata", async (req, res) => {
  try {
    const kata = await Kata.find({});
    res.status(200).json(kata);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/kata/:cariKata", async (req, res) => {
  try {
    const { cariKata } = req.params;
    const re = new RegExp(cariKata, "i");
    const kata = await Kata.find({
      $or: [{ indonesia: { $regex: re } }, { sunda: { $regex: re } }],
    });
    res.status(200).json(kata);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/kata/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const kata = await Kata.findOne({ _id: id });
    res.status(200).json(kata);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/kata/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const kata = await Kata.updateOne({ _id: id }, req.body);

    const kataUpdate = await Kata.findOne({ _id: id });
    res.status(200).json(kataUpdate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/kata/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const kata = await Kata.deleteOne({ _id: id });
    res.status(200).json(kata);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
