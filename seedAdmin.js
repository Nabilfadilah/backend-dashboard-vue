// untuk menambahkan data admin email dan password ke database
const bcrypt = require("bcrypt");
const sequelize = require("./config/database");
const Admin = require("./models/admin");

async function createAdmin() {
  try {
    await sequelize.sync();
    const hashedPassword = await bcrypt.hash("admin123", 10); // Ubah password sesuai keinginan
    const admin = await Admin.create({
      email: "admin@gmail.com",
      password: hashedPassword,
    });
    console.log("Admin created:", admin.email);
    process.exit(0);
  } catch (error) {
    console.error("Error creating admin:", error);
    process.exit(1);
  }
}

createAdmin();
