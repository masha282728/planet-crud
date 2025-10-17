const express = require("express");
const bodyParser = require("body-parser");
const { sequelize } = require("./models/planet");
const planetRoutes = require("./routes/planetRoutes");

const app = express();
app.use(bodyParser.json());
app.use("/api/planet", planetRoutes);

const PORT = process.env.PORT || 3000;

sequelize.authenticate().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => console.log("DB connection error", err));
