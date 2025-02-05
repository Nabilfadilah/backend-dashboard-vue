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

// Delete data
router.delete("/:id", async (req, res) => {
  try {
    await about.destroy({ where: { id: req.params.id } });
    res.json({ message: "Data deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
