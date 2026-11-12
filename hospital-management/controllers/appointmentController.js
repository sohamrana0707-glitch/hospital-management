const db = require('../config/db');

exports.getAllAppointments = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM vw_appointment_details');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createAppointment = async (req, res) => {
    const { patient_id, doctor_id, appointment_date } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO Appointments (patient_id, doctor_id, appointment_date) VALUES (?, ?, ?)',
            [patient_id, doctor_id, appointment_date]
        );
        res.status(201).json({ message: 'Appointment scheduled successfully', appointment_id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteAppointment = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM Appointments WHERE appointment_id = ?', [id]);
        res.json({ message: 'Appointment deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};