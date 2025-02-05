const express = require("express");
const cors = require("cors");
const sequelize = require("./config/database");
const aboutRoutes = require("./routes/aboutRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/about", aboutRoutes);

// sequelize.sync({ force: false }).then(() => {
//     console.log("Database & tables created!");
// });

const PORT = 5001;
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await sequelize.sync();
});
