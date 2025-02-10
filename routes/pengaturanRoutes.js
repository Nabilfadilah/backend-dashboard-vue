const express = require("express");
const pengaturan = require("../models/pengaturan");

const router = express.Router();

// Get all pengaturan data
router.get("/", async (req, res) => {
  try {
    const pengaturanList = await pengaturan.findAll();
    res.json(pengaturanList);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Endpoint GET (ambil data by ID)
router.get("/:id", async (req, res) => {
    try {
      const pengaturanData = await pengaturan.findByPk(req.params.id);
      if (!pengaturanData) {
        return res.status(404).json({ message: "Data not found" });
      }
      res.json(pengaturanData);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
});

// Add new pengaturan data
router.post("/", async (req, res) => {
  try {
    const { name, max_borrow_duration, daily_fine_fee, contact_admin, address_rental } = req.body;
    const newpengaturan = await pengaturan.create({ name, max_borrow_duration, daily_fine_fee, contact_admin, address_rental });
    res.json(newpengaturan);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Endpoint PUT (update data)
router.put("/:id", async (req, res) => {
    try {
      const { name, max_borrow_duration, daily_fine_fee, contact_admin, address_rental } = req.body;
      const updated = await pengaturan.update(
        { name, max_borrow_duration, daily_fine_fee, contact_admin, address_rental },
        { where: { id: req.params.id } }
      );
      if (!updated[0]) {
        return res.status(404).json({ message: "Data not found" });
      }
      res.json({ message: "Data updated successfully!" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
});

// Delete data
router.delete("/:id", async (req, res) => {
    try {
      const deleted = await pengaturan.destroy({ where: { id: req.params.id } });
      if (!deleted) {
        return res.status(404).json({ message: "Data not found" });
      }
      res.json({ message: "Data deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
});

module.exports = router;
