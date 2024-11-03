const { PersonPlan } = require('../models');
const { validatePersonPlanCreate, validatePersonPlanUpdate } = require('../validators/personPlanValidator');

exports.createPersonPlan = async (req, res) => {
  try {
    const { error } = validatePersonPlanCreate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const personPlan = await PersonPlan.create(req.body);
    res.status(200).json(personPlan);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllPersonPlans = async (req, res) => {
  try {
    const personPlans = await PersonPlan.findAll();
    res.json(personPlans);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPersonPlanById = async (req, res) => {
  try {
    const personPlan = await PersonPlan.findByPk(req.params.id);
    if (personPlan) {
      res.json(personPlan);
    } else {
      res.status(404).json({ message: 'PersonPlan not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updatePersonPlan = async (req, res) => {
  try {
    const { error } = validatePersonPlanUpdate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const [updated] = await PersonPlan.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedPersonPlan = await PersonPlan.findByPk(req.params.id);
      res.json(updatedPersonPlan);
    } else {
      res.status(404).json({ message: 'PersonPlan not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deletePersonPlan = async (req, res) => {
  try {
    const deleted = await PersonPlan.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).json({ message: 'PersonPlan deleted' });
    } else {
      res.status(404).json({ message: 'PersonPlan not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
