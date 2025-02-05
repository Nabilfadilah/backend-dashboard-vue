const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const About = sequelize.define("about", {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  address: { type: DataTypes.STRING, allowNull: false },
  phone: { type: DataTypes.STRING, allowNull: false },
}, { 
  timestamps: true // Sequelize akan otomatis menambahkan createdAt & updatedAt
});

module.exports = About;
