const express = require('express');
const router = express.Router();
const accountValueController = require('../controllers/accountValueController');

// Create
router.post('/', accountValueController.createAccountValue);

// Read all
router.get('/', accountValueController.getAllAccountValues);

// Read one
router.get('/:id', accountValueController.getAccountValueById);

// Update
router.put('/:id', accountValueController.updateAccountValue);

// Delete
router.delete('/:id', accountValueController.deleteAccountValue);

module.exports = router;
