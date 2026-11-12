const db = require('../config/db');

exports.getAllPatients = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM Patients');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createPatient = async (req, res) => {
    const { first_name, last_name, gender, dob, phone } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO Patients (first_name, last_name, gender, dob, phone) VALUES (?, ?, ?, ?, ?)',
            [first_name, last_name, gender, dob, phone]
        );
        res.status(201).json({ message: 'Patient registered successfully', patient_id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deletePatient = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM Patients WHERE patient_id = ?', [id]);
        res.json({ message: 'Patient deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};