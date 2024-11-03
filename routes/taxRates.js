const express = require('express');
const router = express.Router();
const taxRatesController = require('../controllers/taxRatesController');

router.post('/', taxRatesController.createTaxRate);
router.get('/', taxRatesController.getAllTaxRates);
router.get('/:id', taxRatesController.getTaxRateById);
router.put('/:id', taxRatesController.updateTaxRate);
router.delete('/:id', taxRatesController.deleteTaxRate);

module.exports = router;
