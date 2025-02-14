const express = require("express");
const cors = require("cors");
const path = require("path");
const sequelize = require("./config/database");
const aboutRoutes = require("./routes/aboutRoutes");
const peminjamanRoutes = require("./routes/peminjamanRoutes");
const authRoutes = require("./routes/authRoutes");
const motorRoutes = require("./routes/motorRoutes");
const pengaturanRoutes = require("./routes/pengaturanRoutes");

// Import model agar Sequelize mengenali tabel
// const peminjaman = require("./models/peminjaman");

const app = express();
app.use(cors());
app.use(express.json());

// Servis file statis dari folder uploads
app.use("/uploads", express.static("uploads"));
// Konfigurasi penyajian file statis menggunakan path absolut
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/auth", authRoutes);
app.use("/api/about", aboutRoutes);
app.use("/api/loan", peminjamanRoutes);
app.use("/api/motor", motorRoutes);
app.use("/api/setting", pengaturanRoutes);

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
