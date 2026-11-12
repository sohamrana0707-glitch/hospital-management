const db = require('../config/db');

exports.getPrescriptionsByAppointment = async (req, res) => {
    const { appointment_id } = req.params;
    try {
        const [rows] = await db.query('SELECT * FROM Prescriptions WHERE appointment_id = ?', [appointment_id]);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createPrescription = async (req, res) => {
    const { appointment_id, medication, dosage, instructions } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO Prescriptions (appointment_id, medication, dosage, instructions) VALUES (?, ?, ?, ?)',
            [appointment_id, medication, dosage, instructions]
        );
        res.status(201).json({ message: 'Prescription added successfully', prescription_id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};