const express = require('express');
const router = express.Router();
const modelPortfolioController = require('../controllers/modelPortfolioController');

router.post('/', modelPortfolioController.createModelPortfolio);
router.get('/', modelPortfolioController.getAllModelPortfolios);
router.get('/:id', modelPortfolioController.getModelPortfolioById);
router.put('/:id', modelPortfolioController.updateModelPortfolio);
router.delete('/:id', modelPortfolioController.deleteModelPortfolio);

module.exports = router;
