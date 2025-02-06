const express = require("express");
const peminjaman = require("../models/peminjaman");

const router = express.Router();

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

// add new data
router.post("/", async (req, res) => {
    try {
      const { name, email, address, phone, type_motor, loan_date, loan_end_date, total_paid} = req.body;
      const newPeminjaman = await peminjaman.create({ name, email, address, phone, type_motor, loan_date, loan_end_date, total_paid });
      res.json(newPeminjaman);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
});

// update data
router.put("/:id", async (req, res) => {
    try {
      const { name, email, address, phone, type_motor, loan_date, loan_end_date, total_paid } = req.body;
      const updated = await peminjaman.update(
        { name, email, address, phone, type_motor, loan_date, loan_end_date, total_paid },
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