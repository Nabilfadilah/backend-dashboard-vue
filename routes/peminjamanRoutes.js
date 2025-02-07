const express = require("express");
const peminjaman = require("../models/peminjaman");
const multer = require("multer");
const path = require("path");

const router = express.Router();

// Konfigurasi Multer penyimpanan file di folder 'uploads'
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // pastikan folder uploads sudah ada
  },
  filename: function (req, file, cb) {
    // gunakan timestamp + ekstensi asli file
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// get all peminjaman data
router.get("/", async (req, res) => {
    try {
        const peminjamanList = await peminjaman.findAll();
        res.json(peminjamanList);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

// get by id
router.get("/:id", async (req, res) => {
    try {
        const peminjamanData = await peminjaman.findByPk(req.params.id);
        if (!peminjamanData) {
            return res.status(404).json({ message: "Data not found" });
        }
        res.json(peminjamanData);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// add new data (dengan upload file)
router.post("/", upload.single("image"), async (req, res) => {
    try {
      const { name, email, address, phone, type_motor, loan_date, loan_end_date, total_paid} = req.body;
      
      const image = req.file ? req.file.filename : null;
      
      const newPeminjaman = await peminjaman.create({ name, email, address, phone, type_motor, loan_date, loan_end_date, total_paid, image });
      res.json(newPeminjaman);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
});

// update data (dengan upload file, optional)
router.put("/:id", upload.single("image"), async (req, res) => {
    try {
      const { name, email, address, phone, type_motor, loan_date, loan_end_date, total_paid } = req.body;
      
      const updateData = { name, email, address, phone, type_motor, loan_date, loan_end_date, total_paid };
      // Jika ada file upload, perbarui kolom image
      if (req.file) {
        updateData.image = req.file.filename;
      }
      const updated = await peminjaman.update(updateData, { where: { id: req.params.id } });

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
      const deleted = await peminjaman.destroy({ where: { id: req.params.id } });
      if (!deleted) {
        return res.status(404).json({ message: "Data not found" });
      }
      res.json({ message: "Data deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
});

module.exports = router;