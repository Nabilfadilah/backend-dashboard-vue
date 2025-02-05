const express = require("express");
const about = require("../models/about");

const router = express.Router();

// Get all About data
router.get("/", async (req, res) => {
  try {
    const aboutList = await about.findAll();
    res.json(aboutList);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Endpoint GET (ambil data by ID)
router.get("/:id", async (req, res) => {
    try {
      const aboutData = await about.findByPk(req.params.id);
      if (!aboutData) {
        return res.status(404).json({ message: "Data not found" });
      }
      res.json(aboutData);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
});

// Add new About data
router.post("/", async (req, res) => {
  try {
    const { name, email, address, phone } = req.body;
    const newAbout = await about.create({ name, email, address, phone });
    res.json(newAbout);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Endpoint PUT (update data)
router.put("/:id", async (req, res) => {
    try {
      const { name, email, address, phone } = req.body;
      const updated = await about.update(
        { name, email, address, phone },
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
      const deleted = await about.destroy({ where: { id: req.params.id } });
      if (!deleted) {
        return res.status(404).json({ message: "Data not found" });
      }
      res.json({ message: "Data deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
});

module.exports = router;
