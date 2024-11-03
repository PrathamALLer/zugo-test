const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');

// Create
router.post('/', accountController.createAccount);

// Read all
router.get('/', accountController.getAllAccounts);

// Read one
router.get('/:id', accountController.getAccountById);

// Update
router.put('/:id', accountController.updateAccount);

// Delete
router.delete('/:id', accountController.deleteAccount);

module.exports = router;
