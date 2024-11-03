const express = require('express');
const router = express.Router();
const incomeExpenseController = require('../controllers/incomeExpenseController');

router.post('/', incomeExpenseController.createIncomeExpense);
router.get('/', incomeExpenseController.getAllIncomeExpenses);
router.get('/:id', incomeExpenseController.getIncomeExpenseById);
router.put('/:id', incomeExpenseController.updateIncomeExpense);
router.delete('/:id', incomeExpenseController.deleteIncomeExpense);

module.exports = router;
