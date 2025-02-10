const express = require("express");
const motor = require("../models/motor");
const multer = require("multer");
const path = require("path");

const router = express.Router();

// Konfigurasi Multer penyimpanan file di folder 'uploads'
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/motor"); // pastikan folder uploads sudah ada
  },
  filename: function (req, file, cb) {
    // gunakan timestamp + ekstensi asli file
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// get all motor data
router.get("/", async (req, res) => {
    try {
        const motorList = await motor.findAll();
        res.json(motorList);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

// get by id
router.get("/:id", async (req, res) => {
    try {
        const motorData = await motor.findByPk(req.params.id);
        if (!motorData) {
            return res.status(404).json({ message: "Data not found" });
        }
        res.json(motorData);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// add new data (dengan upload file)
router.post("/", upload.single("image"), async (req, res) => {
    try {
      const { name, merk, year, plat_nomor, status} = req.body;
      
      const image = req.file ? req.file.filename : null;
      
      const newmotor = await motor.create({ name,merk, year, plat_nomor, status, image });
      res.json(newmotor);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
});

// update data (dengan upload file, optional)
router.put("/:id", upload.single("image"), async (req, res) => {
    try {
      const { name, merk, year, plat_nomor, status } = req.body;
      
      const updateData = { name, merk, year, plat_nomor, status };
      // Jika ada file upload, perbarui kolom image
      if (req.file) {
        updateData.image = req.file.filename;
      }
      const updated = await motor.update(updateData, { where: { id: req.params.id } });

      if (!updated[0]) {
        return res.status(404).json({ message: "Data not found" });
      }
      res.json({ message: "Data updated successfully!" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
});

// delete data
router.delete("/:id", async (req, res) => {
    try {
      const deleted = await motor.destroy({ where: { id: req.params.id } });
      if (!deleted) {
        return res.status(404).json({ message: "Data not found" });
      }
      res.json({ message: "Data deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
});

module.exports = router;