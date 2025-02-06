const express = require("express");
const cors = require("cors");
const sequelize = require("./config/database");
const aboutRoutes = require("./routes/aboutRoutes");

// Import model agar Sequelize mengenali tabel
const peminjaman = require("./models/peminjaman");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/about", aboutRoutes);

// sequelize.sync({ force: false }).then(() => {
//     console.log("Database & tables created!");
// });

// alter: true → Hanya memperbarui struktur tabel yang berubah (tidak menghapus data).
// force: true → Akan menghapus tabel lama dan membuat ulang (jangan gunakan jika ada

const PORT = 5001;
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  // await sequelize.sync();

  // Membuat atau memperbarui tabel sesuai model
  try {
    await sequelize.sync({ alter: true });
    console.log("Database & tables synced!");
  } catch (error) {
    console.error("Error syncing database:", error);
  }
});
