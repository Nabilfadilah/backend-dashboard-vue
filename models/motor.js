const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Motor = sequelize.define("motor", {
    name: { type: DataTypes.STRING, allowNull: false },
    merk: { type: DataTypes.STRING, allowNull: false },
    year: { type: DataTypes.INTEGER, allowNull: false },
    plat_nomor: { type: DataTypes.STRING(20), allowNull: false },
    status: {type: DataTypes.ENUM('tersedia', 'dipinjam', 'tidak tersedia'), allowNull: false},
    image: {type: DataTypes.STRING, allowNull: true}
}, { 
    timestamps: true // Sequelize akan otomatis menambahkan createdAt & updatedAt
});

module.exports = Motor;
