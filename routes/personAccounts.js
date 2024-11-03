const express = require('express');
const router = express.Router();
const personAccountsController = require('../controllers/personAccountsController');

router.post('/', personAccountsController.createPersonAccount);
router.get('/', personAccountsController.getAllPersonAccounts);
router.get('/:id', personAccountsController.getPersonAccountById);
router.put('/:id', personAccountsController.updatePersonAccount);
router.delete('/:id', personAccountsController.deletePersonAccount);

module.exports = router;
