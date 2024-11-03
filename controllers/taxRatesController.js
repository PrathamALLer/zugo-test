const { TaxRates } = require('../models');
const { validateTaxRatesForCreate, validateTaxRatesForUpdate } = require('../validators/taxRatesValidator');

exports.createTaxRate = async (req, res) => {
  try {
    const { error } = validateTaxRatesForCreate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const taxRate = await TaxRates.create(req.body);
    res.status(201).json(taxRate);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllTaxRates = async (req, res) => {
  try {
    const taxRates = await TaxRates.findAll();
    res.json(taxRates);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTaxRateById = async (req, res) => {
  try {
    const taxRate = await TaxRates.findByPk(req.params.id);
    if (taxRate) {
      res.json(taxRate);
    } else {
      res.status(404).json({ message: 'TaxRate not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateTaxRate = async (req, res) => {
  try {
    const { error } = validateTaxRatesForUpdate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const [updated] = await TaxRates.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedTaxRate = await TaxRates.findByPk(req.params.id);
      res.json(updatedTaxRate);
    } else {
      res.status(404).json({ message: 'TaxRate not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteTaxRate = async (req, res) => {
  try {
    const deleted = await TaxRates.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).json({ message: 'TaxRate deleted' });
    } else {
      res.status(404).json({ message: 'TaxRate not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
