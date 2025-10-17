const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const { sequelize } = require("./models/planet");
const planetRoutes = require("./routes/planetRoutes");

const app = express();
app.use(bodyParser.json());
app.use("/api/planet", planetRoutes);

app.use(express.static(path.join(__dirname, "../frontend")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

const PORT = process.env.PORT || 3000;

sequelize.authenticate()
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.log("DB connection error", err));
