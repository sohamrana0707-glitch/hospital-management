const db = require('../config/db');

exports.getAllDoctors = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM Doctors');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createDoctor = async (req, res) => {
    const { first_name, last_name, specialization, phone, consultation_fee } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO Doctors (first_name, last_name, specialization, phone, consultation_fee) VALUES (?, ?, ?, ?, ?)',
            [first_name, last_name, specialization, phone, consultation_fee]
        );
        res.status(201).json({ message: 'Doctor added successfully', doctor_id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteDoctor = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM Doctors WHERE doctor_id = ?', [id]);
        res.json({ message: 'Doctor deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};