const { Account } = require('../models');
const {validateCreateAccount, validateUpdateAccount}  = require('../validators/accountValidator');

exports.createAccount = async (req, res) => {
  try {
    // Validate request body
    const { error, value } = validateCreateAccount(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const account = await Account.create(value);
    res.status(201).json(account);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllAccounts = async (req, res) => {
  try {
    const accounts = await Account.findAll();
    res.status(200).json(accounts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAccountById = async (req, res) => {
  try {
    const account = await Account.findByPk(req.params.id);
    if (account) {
      res.status(200).json(account);
    } else {
      res.status(404).json({ message: 'Account not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateAccount = async (req, res) => {
  try {
    // Validate request body
    const { error, value } = validateUpdateAccount(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const [updated] = await Account.update(value, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedAccount = await Account.findByPk(req.params.id);
      res.status(200).json(updatedAccount);
    } else {
      res.status(404).json({ message: 'Account not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteAccount = async (req, res) => {
  try {
    const deleted = await Account.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).json({ message: 'Account deleted' });
    } else {
      res.status(404).json({ message: 'Account not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
