const express = require('express');
const router = express.Router();
const prescriptionController = require('../controllers/prescriptionController');

router.get('/:appointment_id', prescriptionController.getPrescriptionsByAppointment);
router.post('/', prescriptionController.createPrescription);

module.exports = router;