const { AccountValue } = require('../models');
const { validateAccountValue, validateAccountValueCreate, validateAccountValueUpdate } = require('../validators/accountValueValidator');

exports.createAccountValue = async (req, res) => {
  try {
    const { error } = validateAccountValueCreate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const accountValue = await AccountValue.create(req.body);
    res.status(201).json(accountValue);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllAccountValues = async (req, res) => {
  try {
    const accountValues = await AccountValue.findAll();
    res.json(accountValues);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAccountValueById = async (req, res) => {
  try {
    const accountValue = await AccountValue.findByPk(req.params.id);
    if (accountValue) {
      res.json(accountValue);
    } else {
      res.status(404).json({ message: 'AccountValue not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateAccountValue = async (req, res) => {
  try {
    const { error } = validateAccountValueUpdate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const [updated] = await AccountValue.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedAccountValue = await AccountValue.findByPk(req.params.id);
      res.json(updatedAccountValue);
    } else {
      res.status(404).json({ message: 'AccountValue not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteAccountValue = async (req, res) => {
  try {
    const deleted = await AccountValue.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'AccountValue not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
