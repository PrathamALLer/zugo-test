const { ModelPortfolio } = require('../models');
const { validateCreateModelPortfolio, validateUpdateModelPortfolio } = require('../validators/modelPortfolioValidator');

exports.createModelPortfolio = async (req, res) => {
  try {
    const { error } = validateCreateModelPortfolio(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const modelPortfolio = await ModelPortfolio.create(req.body);
    res.status(201).json(modelPortfolio);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllModelPortfolios = async (req, res) => {
  try {
    const modelPortfolios = await ModelPortfolio.findAll();
    res.json(modelPortfolios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getModelPortfolioById = async (req, res) => {
  try {
    const modelPortfolio = await ModelPortfolio.findByPk(req.params.id);
    if (modelPortfolio) {
      res.json(modelPortfolio);
    } else {
      res.status(404).json({ message: 'ModelPortfolio not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateModelPortfolio = async (req, res) => {
  try {
    const { error } = validateUpdateModelPortfolio(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const [updated] = await ModelPortfolio.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedModelPortfolio = await ModelPortfolio.findByPk(req.params.id);
      res.json(updatedModelPortfolio);
    } else {
      res.status(404).json({ message: 'ModelPortfolio not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteModelPortfolio = async (req, res) => {
  try {
    const deleted = await ModelPortfolio.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).json({ message: 'ModelPortfolio deleted' });
    } else {
      res.status(404).json({ message: 'ModelPortfolio not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
