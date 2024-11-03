const { RiskProfile } = require('../models');
const { validateRiskProfile } = require('../validators/riskProfileValidator');

exports.createRiskProfile = async (req, res) => {
  try {
    console.log('creating risk profile', req.body)
    const { error } = validateRiskProfile(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const riskProfile = await RiskProfile.create(req.body);
    res.status(201).json(riskProfile);
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: error.message });
  }
};

exports.getAllRiskProfiles = async (req, res) => {
  try {
    const riskProfiles = await RiskProfile.findAll();
    res.json(riskProfiles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getRiskProfileById = async (req, res) => {
  try {
    const riskProfile = await RiskProfile.findByPk(req.params.id);
    if (riskProfile) {
      res.json(riskProfile);
    } else {
      res.status(404).json({ message: 'RiskProfile not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateRiskProfile = async (req, res) => {
  try {
    const { error } = validateRiskProfile(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const [updated] = await RiskProfile.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedRiskProfile = await RiskProfile.findByPk(req.params.id);
      res.json(updatedRiskProfile);
    } else {
      res.status(404).json({ message: 'RiskProfile not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteRiskProfile = async (req, res) => {
  try {
    const deleted = await RiskProfile.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).json({ message: 'RiskProfile deleted' });
    } else {
      res.status(404).json({ message: 'RiskProfile not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
