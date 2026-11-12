const express = require('express');
const router = express.Router();
const billingController = require('../controllers/billingController');

router.get('/:appointment_id', billingController.getBillByAppointment);
router.post('/', billingController.createBill);

module.exports = router;