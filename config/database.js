const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
  }
);

(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database Connected!");
  } catch (error) {
    console.error("❌ Database Connection Error:", error);
  }
})();

module.exports = sequelize;
