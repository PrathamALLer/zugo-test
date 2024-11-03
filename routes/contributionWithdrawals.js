const express = require('express');
const router = express.Router();
const contributionWithdrawalsController = require('../controllers/contributionWithdrawalsController');

// Create
router.post('/', contributionWithdrawalsController.createContributionWithdrawal);

// Read all
router.get('/', contributionWithdrawalsController.getAllContributionWithdrawals);

// Read one
router.get('/:id', contributionWithdrawalsController.getContributionWithdrawalById);

// Update
router.put('/:id', contributionWithdrawalsController.updateContributionWithdrawal);

// Delete
router.delete('/:id', contributionWithdrawalsController.deleteContributionWithdrawal);

module.exports = router;
