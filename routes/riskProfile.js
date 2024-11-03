const express = require('express');
const router = express.Router();
const riskProfileController = require('../controllers/riskProfileController');

router.post('/', riskProfileController.createRiskProfile);
router.get('/', riskProfileController.getAllRiskProfiles);
router.get('/:id', riskProfileController.getRiskProfileById);
router.put('/:id', riskProfileController.updateRiskProfile);
router.delete('/:id', riskProfileController.deleteRiskProfile);

module.exports = router;
