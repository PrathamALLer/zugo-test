const { PersonAccounts } = require('../models');
const { validateUpdatePersonAccount, validateCreatePersonAccount } = require('../validators/personAccountsValidator');

exports.createPersonAccount = async (req, res) => {
  try {
    const { error } = validateCreatePersonAccount(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    
    const personAccount = await PersonAccounts.create(req.body);
    res.status(201).json(personAccount);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllPersonAccounts = async (req, res) => {
  try {
    const personAccounts = await PersonAccounts.findAll();
    res.json(personAccounts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPersonAccountById = async (req, res) => {
  try {
    const personAccount = await PersonAccounts.findByPk(req.params.id);
    if (personAccount) {
      res.json(personAccount);
    } else {
      res.status(404).json({ message: 'PersonAccount not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updatePersonAccount = async (req, res) => {
  try {
    const { error } = validateUpdatePersonAccount(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const [updated] = await PersonAccounts.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedPersonAccount = await PersonAccounts.findByPk(req.params.id);
      res.status(200).json(updatedPersonAccount);
    } else {
      res.status(404).json({ message: 'PersonAccount not found' });
    }
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: error.message });
  }
};

exports.deletePersonAccount = async (req, res) => {
  try {
    const deleted = await PersonAccounts.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).json({ message: 'PersonAccount deleted' });
    } else {
      res.status(404).json({ message: 'PersonAccount not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
