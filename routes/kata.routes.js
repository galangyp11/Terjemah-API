const Kata = require("../models/kata.model.js");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const excelToJson = require("convert-excel-to-json");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "/tmp"));
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-kata" + path.extname(file.originalname));
  },
});

const uploading = multer({ storage });

router.post("/kata", async (req, res) => {
  try {
    const kata = await Kata.create(req.body);
    res.status(200).json(kata);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/upload", uploading.single("file"), async (req, res) => {
  const convertJson = excelToJson({
    sourceFile: "tmp/file-kata.xlsx",
    columnToKey: {
      A: "indonesia",
      B: "sunda",
    },
  });
  // console.log("convert.son", convertJson.Sheet1);
  Kata.insertMany(convertJson.Sheet1)
    .then((value) => {
      console.log("Saved Successfully");
      fs.unlink("uploads/file-kata.xlsx", (err) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log("File deleted successfully");
      });
    })
    .catch((error) => {
      console.log(error);
    });
  res.json({ message: "Successfully uploaded single file" });
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

router.get("/cekkata/:cariKata", async (req, res) => {
  try {
    const { cariKata } = req.params;
    const kata = await Kata.find({
      $or: [{ indonesia: cariKata }, { sunda: cariKata }],
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
    const kataUpdate = await Kata.findByIdAndUpdate(
      { _id: id },
      { indonesia: req.body.indonesia, sunda: req.body.sunda },
      {
        new: true,
      }
    );

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

router.delete("/kata", async (req, res) => {
  try {
    const { id } = req.params;
    const kata = await Kata.deleteMany();
    res.status(200).json(kata);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
