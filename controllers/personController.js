const { Person } = require('../models');
const { validatePerson } = require('../validators/personValidator');

exports.createPerson = async (req, res) => {
  try {
    const { error } = validatePerson(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const person = await Person.create(req.body);
    res.status(201).json(person);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllPersons = async (req, res) => {
  try {
    const persons = await Person.findAll();
    res.json(persons);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPersonById = async (req, res) => {
  try {
    const person = await Person.findByPk(req.params.id);
    if (person) {
      res.json(person);
    } else {
      res.status(404).json({ message: 'Person not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updatePerson = async (req, res) => {
  try {
    const { error } = validatePerson(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const [updated] = await Person.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedPerson = await Person.findByPk(req.params.id);
      res.json(updatedPerson);
    } else {
      res.status(404).json({ message: 'Person not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deletePerson = async (req, res) => {
  try {
    const deleted = await Person.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).json({ message: 'Person deleted' });
    } else {
      res.status(404).json({ message: 'Person not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
