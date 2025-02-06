const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Peminjaman = sequelize.define("peminjaman", {
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    address: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: false },
    type_motor: {type: DataTypes.STRING, allowNull: false},
    loan_date: {type: DataTypes.DATE, allowNull: false},
    loan_end_date: {type: DataTypes.DATE, allowNull: false},
    total_paid: {type: DataTypes.INTEGER, allowNull: false},
    image: {type: DataTypes.STRING, allowNull: true}
}, { 
    timestamps: true // Sequelize akan otomatis menambahkan createdAt & updatedAt
});

module.exports = Peminjaman;
