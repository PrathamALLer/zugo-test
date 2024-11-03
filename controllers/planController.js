const { Plan } = require('../models');
const { validateCreatePlan, validateUpdatePlan } = require('../validators/planValidator');

exports.createPlan = async (req, res) => {
  try {
    const { error } = validateCreatePlan(req.body);
    if (error) {
      return res.status(400).json({ error: error});
    }
    const plan = await Plan.create(req.body);
    res.status(201).json(plan);
  } catch (error) {
    console.error(error)
    res.status(400).json({ error: error.message });
  }
};

exports.getAllPlans = async (req, res) => {
  try {
    const plans = await Plan.findAll();
    console.log('plans', plans)
    res.json(plans);
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: error.message });
  }
};

exports.getPlanById = async (req, res) => {
  try {
    const plan = await Plan.findByPk(req.params.id);
    if (plan) {
      res.json(plan);
    } else {
      res.status(404).json({ message: 'Plan not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updatePlan = async (req, res) => {
  try {
    const { error } = validateUpdatePlan(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const [updated] = await Plan.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedPlan = await Plan.findByPk(req.params.id);
      res.json(updatedPlan);
    } else {
      res.status(404).json({ message: 'Plan not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deletePlan = async (req, res) => {
  try {
    const deleted = await Plan.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).json({ message: 'Plan deleted' });
    } else {
      res.status(404).json({ message: 'Plan not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
