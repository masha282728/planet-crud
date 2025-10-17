const express = require("express");
const router = express.Router();
const { Planet } = require("../models/planet");

router.get("/", async (req, res) => {
  try {
    const planets = await Planet.findAll();
    res.json(planets);
  } catch {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const planet = await Planet.findByPk(req.params.id);
    if (!planet) return res.status(404).json({ error: "Planet not found" });
    res.json(planet);
  } catch {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, system, climate, population, surfaceType } = req.body;
    const planet = await Planet.create({ name, system, climate, population, surfaceType });
    res.status(201).json(planet);
  } catch {
    res.status(400).json({ error: "Invalid data" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const planet = await Planet.findByPk(req.params.id);
    if (!planet) return res.status(404).json({ error: "Planet not found" });
    const { name, system, climate, population, surfaceType } = req.body;
    await planet.update({ name, system, climate, population, surfaceType });
    res.json(planet);
  } catch {
    res.status(400).json({ error: "Invalid data" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const planet = await Planet.findByPk(req.params.id);
    if (!planet) return res.status(404).json({ error: "Planet not found" });
    await planet.destroy();
    res.json({ message: "Planet deleted" });
  } catch {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
