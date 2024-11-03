const express = require('express');
const router = express.Router();
const settingsController = require('../controllers/settingsController');

router.post('/', settingsController.createSettings);
router.get('/', settingsController.getAllSettings);
router.get('/:id', settingsController.getSettingsById);
router.put('/:id', settingsController.updateSettings);
router.delete('/:id', settingsController.deleteSettings);

module.exports = router;
