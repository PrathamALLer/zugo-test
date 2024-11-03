const express = require('express');
const router = express.Router();
const productTaxWrapperTypesController = require('../controllers/productTaxWrapperTypesController');

router.post('/', productTaxWrapperTypesController.createProductTaxWrapperType);
router.get('/', productTaxWrapperTypesController.getAllProductTaxWrapperTypes);
router.get('/:id', productTaxWrapperTypesController.getProductTaxWrapperTypeById);
router.put('/:id', productTaxWrapperTypesController.updateProductTaxWrapperType);
router.delete('/:id', productTaxWrapperTypesController.deleteProductTaxWrapperType);

module.exports = router;
