const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Pengaturan = sequelize.define("pengaturan", {
    name: { type: DataTypes.STRING, allowNull: false },
    max_borrow_duration: { type: DataTypes.INTEGER, allowNull: false },
    daily_fine_fee: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    contact_admin: { type: DataTypes.STRING(100), allowNull: false },
    address_rental: {type: DataTypes.TEXT, allowNull: false},
}, { 
    timestamps: true // Sequelize akan otomatis menambahkan createdAt & updatedAt
});

module.exports = Pengaturan;
