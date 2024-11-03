const { Transactions } = require('../models');
const { validateCreateTransaction, validateUpdateTransaction } = require('../validators/transactionValidator');

exports.createTransaction = async (req, res) => {
  try {
    // Apply validation
    const { error } = validateCreateTransaction(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const transaction = await Transactions.create(req.body);
    res.status(201).json(transaction);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transactions.findAll();
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTransactionById = async (req, res) => {
  try {
    const transaction = await Transactions.findByPk(req.params.id);
    if (transaction) {
      res.json(transaction);
    } else {
      res.status(404).json({ message: 'Transaction not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateTransaction = async (req, res) => {
  try {
    // Apply validation
    const { error } = validateUpdateTransaction(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const [updated] = await Transactions.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedTransaction = await Transactions.findByPk(req.params.id);
      res.json(updatedTransaction);
    } else {
      res.status(404).json({ message: 'Transaction not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteTransaction = async (req, res) => {
  try {
    const deleted = await Transactions.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).json({ message: 'Transaction deleted' });
    } else {
      res.status(404).json({ message: 'Transaction not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
