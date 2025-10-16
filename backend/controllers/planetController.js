const Planet = require('../models/planet');
exports.getAll = async (_, res) => res.json(await Planet.findAll());
exports.getOne = async (req, res) => {
  const p = await Planet.findByPk(req.params.id);
  if (!p) return res.status(404).json({ error: 'Nie znaleziono planety' });
  res.json(p);
};
exports.create = async (req, res) => {
  try {
    const { name, system, climate, population } = req.body;
    const p = await Planet.create({ name, system, climate, population });
    res.status(201).json(p);
  } catch (e) { res.status(400).json({ error: e.message }); }
};
exports.update = async (req, res) => {
  const p = await Planet.findByPk(req.params.id);
  if (!p) return res.status(404).json({ error: 'Nie znaleziono' });
  await p.update(req.body);
  res.json(p);
};
exports.delete = async (req, res) => {
  const p = await Planet.findByPk(req.params.id);
  if (!p) return res.status(404).json({ error: 'Nie znaleziono' });
  await p.destroy();
  res.status(204).send();
};
