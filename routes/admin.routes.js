const Admin = require("../models/admin.model.js");
const express = require("express");
const router = express.Router();

router.post("/admin", async (req, res) => {
  try {
    const admin = await Admin.create(req.body);
    res.status(200).json(admin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/admin", async (req, res) => {
  try {
    const admin = await Admin.find({});
    res.status(200).json(admin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/admin/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await Admin.findByIdAndUpdate(
      { _id: id },
      { username: req.body.username, password: req.body.password },
      {
        new: true,
      }
    );

    res.status(200).json(admin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/admin/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const kataUpdate = await Admin.findOne({ _id: id });
    res.status(200).json(kataUpdate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
