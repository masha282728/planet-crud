const Planet = require('../models/planet');

exports.getAll = async (_, res) => {
  const planets = await Planet.findAll();
  res.json(planets);
};

exports.getOne = async (req, res) => {
  const p = await Planet.findByPk(req.params.id);
  if (!p) {
    return res.status(404).json({
      timestamp: new Date().toISOString(),
      status: 404,
      error: 'Not Found',
      message: 'Nie znaleziono planety'
    });
  }
  res.json(p);
};

exports.create = async (req, res) => {
  try {
    const { name, system, climate, population } = req.body;

    if (!name || name.length <3 || name.length > 50) {
      return res.status(400).json({
        timestamp: new Date().toISOString(),
        status: 400,
        error: 'Bad Request',
        fieldErrors: [{ field: 'name', code: 'INVALID_LENGTH', message: 'Nazwa musi mieć 3-50 znaków' }]
      });
    }

    if (!system || !climate) {
      return res.status(400).json({
        timestamp: new Date().toISOString(),
        status: 400,
        error: 'Bad Request',
        message: 'System i klimat są wymagane'
      });
    }

    if (isNaN(population) || population <= 0) {
      return res.status(422).json({
        timestamp: new Date().toISOString(),
        status: 422,
        error: 'Unprocessable Entity',
        fieldErrors: [{ field: 'population', code: 'INVALID_VALUE', message: 'Populacja musi być liczbą > 0' }]
      });
    }

    const existing = await Planet.findOne({ where: { name } });
    if (existing) {
      return res.status(409).json({
        timestamp: new Date().toISOString(),
        status: 409,
        error: 'Conflict',
        message: 'Planeta o tej nazwie już istnieje'
      });
    }

    const p = await Planet.create({ name, system, climate, population });
    res.status(201).json(p);

  } catch (e) {
    res.status(500).json({
      timestamp: new Date().toISOString(),
      status: 500,
      error: 'Server Error',
      message: e.message
    });
  }
};

exports.update = async (req, res) => {
  const p = await Planet.findByPk(req.params.id);
  if (!p) {
    return res.status(404).json({
      timestamp: new Date().toISOString(),
      status: 404,
      error: 'Not Found',
      message: 'Nie znaleziono planety'
    });
  }

  const { name, system, climate, population } = req.body;

  if (!name || name.length <3 || name.length > 50) {
    return res.status(400).json({
      timestamp: new Date().toISOString(),
      status: 400,
      error: 'Bad Request',
      fieldErrors: [{ field: 'name', code: 'INVALID_LENGTH', message: 'Nazwa musi mieć 3-50 znaków' }]
    });
  }

  await p.update({ name, system, climate, population });
  res.json(p);
};

exports.delete = async (req, res) => {
  const p = await Planet.findByPk(req.params.id);
  if (!p) {
    return res.status(404).json({
      timestamp: new Date().toISOString(),
      status: 404,
      error: 'Not Found',
      message: 'Nie znaleziono planety'
    });
  }

  await p.destroy();
  res.status(204).send();
}; 