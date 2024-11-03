const express = require('express');
const router = express.Router();
const personPlanController = require('../controllers/personPlanController');

router.post('/', personPlanController.createPersonPlan);
router.get('/', personPlanController.getAllPersonPlans);
router.get('/:id', personPlanController.getPersonPlanById);
router.put('/:id', personPlanController.updatePersonPlan);
router.delete('/:id', personPlanController.deletePersonPlan);

module.exports = router;
