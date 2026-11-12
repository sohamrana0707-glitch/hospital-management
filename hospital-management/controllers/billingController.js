const db = require('../config/db');

exports.getBillByAppointment = async (req, res) => {
    const { appointment_id } = req.params;
    try {
        const [rows] = await db.query('SELECT * FROM Billing WHERE appointment_id = ?', [appointment_id]);
        res.json(rows[0] || { message: 'No bill found for this appointment' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createBill = async (req, res) => {
    const { appointment_id, total_amount, payment_status } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO Billing (appointment_id, total_amount, payment_status) VALUES (?, ?, ?)',
            [appointment_id, total_amount, payment_status || 'Pending']
        );
        res.status(201).json({ message: 'Bill generated successfully', bill_id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};