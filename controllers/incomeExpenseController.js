const { IncomeExpense } = require('../models');
const { validateIncomeExpenseCreate, validateIncomeExpenseUpdate } = require('../validators/incomeExpenseValidator');

exports.createIncomeExpense = async (req, res) => {
  try {
    const { error } = validateIncomeExpenseCreate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    
    const incomeExpense = await IncomeExpense.create(req.body);
    res.status(201).json(incomeExpense);
  } catch (error) {
    console.log('error', error)
    res.status(400).json({ error: error.message });
  }
};

exports.getAllIncomeExpenses = async (req, res) => {
  try {
    const incomeExpenses = await IncomeExpense.findAll();
    res.json(incomeExpenses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getIncomeExpenseById = async (req, res) => {
  try {
    const incomeExpense = await IncomeExpense.findByPk(req.params.id);
    if (incomeExpense) {
      res.json(incomeExpense);
    } else {
      res.status(404).json({ message: 'IncomeExpense not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateIncomeExpense = async (req, res) => {
  try {
    const { error } = validateIncomeExpenseUpdate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const [updated] = await IncomeExpense.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedIncomeExpense = await IncomeExpense.findByPk(req.params.id);
      res.json(updatedIncomeExpense);
    } else {
      res.status(404).json({ message: 'IncomeExpense not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteIncomeExpense = async (req, res) => {
  try {
    const deleted = await IncomeExpense.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).json({ message: 'IncomeExpense deleted' });
    } else {
      res.status(404).json({ message: 'IncomeExpense not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
