const express = require('express');
const router = express.Router();
const personController = require('../controllers/personController');

// Create
router.post('/', personController.createPerson);

// Read all
router.get('/', personController.getAllPersons);

// Read one
router.get('/:id', personController.getPersonById);

// Update
router.put('/:id', personController.updatePerson);

// Delete
router.delete('/:id', personController.deletePerson);

module.exports = router;
