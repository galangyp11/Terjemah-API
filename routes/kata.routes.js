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

// router.get("/upload", uploading.single("file"), async (req, res) => {
//   const convertJson = excelToJson({
//     sourceFile: "uploads/Format File Kata kabbar.xlsx",
//     columnToKey: {
//       C: "indonesia",
//       D: "sunda",
//     },
//   });
//   // console.log("gitu", req.body);
//   Kata.insertMany(convertJson.Sheet1)
//     .then((value) => {
//       console.log("Saved Successfully");
//       fs.unlink("uploads/Format File Kata kabbar.xlsx", (err) => {
//         if (err) {
//           console.error(err);
//           return;
//         }
//         console.log("File deleted successfully");
//       });
//     })
//     .catch((error) => {
//       console.log(error);
//     });
//   res.json({ message: "Successfully uploaded single file" });
// });

router.post("/upload", async (req, res) => {
  try {
    console.log("gitu", req.body);
    const kata = await Kata.insertMany(req.body);
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
