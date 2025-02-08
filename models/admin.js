// models/Admin.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Admin = sequelize.define("admin", {
  email: { 
    type: DataTypes.STRING, 
    allowNull: false, 
    unique: true 
  },
  // Pastikan password sudah di-hash saat disimpan
  password: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
});

module.exports = Admin;
