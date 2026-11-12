const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./config/db');
const patientRoutes = require('./routes/patientRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const prescriptionRoutes = require('./routes/prescriptionRoutes');
const billingRoutes = require('./routes/billingRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Routes
app.use('/api/patients', patientRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/prescriptions', prescriptionRoutes);
app.use('/api/billing', billingRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'Hospital Management System API is running...' });
});

// Auto-create database tables sequentially on startup
async function initDatabase() {
    try {
        await db.query(`
            CREATE TABLE IF NOT EXISTS Patients (
                patient_id INT AUTO_INCREMENT PRIMARY KEY,
                first_name VARCHAR(50) NOT NULL,
                last_name VARCHAR(50) NOT NULL,
                gender VARCHAR(20),
                dob DATE,
                phone VARCHAR(20)
            );
        `);

        await db.query(`
            CREATE TABLE IF NOT EXISTS Doctors (
                doctor_id INT AUTO_INCREMENT PRIMARY KEY,
                first_name VARCHAR(50) NOT NULL,
                last_name VARCHAR(50) NOT NULL,
                specialization VARCHAR(100),
                phone VARCHAR(20),
                consultation_fee DECIMAL(10,2)
            );
        `);

        await db.query(`
            CREATE TABLE IF NOT EXISTS Appointments (
                appointment_id INT AUTO_INCREMENT PRIMARY KEY,
                patient_id INT,
                doctor_id INT,
                appointment_date DATETIME,
                FOREIGN KEY (patient_id) REFERENCES Patients(patient_id) ON DELETE CASCADE,
                FOREIGN KEY (doctor_id) REFERENCES Doctors(doctor_id) ON DELETE CASCADE
            );
        `);

        await db.query(`
            CREATE TABLE IF NOT EXISTS Prescriptions (
                prescription_id INT AUTO_INCREMENT PRIMARY KEY,
                appointment_id INT,
                medication VARCHAR(100),
                dosage VARCHAR(50),
                instructions TEXT,
                FOREIGN KEY (appointment_id) REFERENCES Appointments(appointment_id) ON DELETE CASCADE
            );
        `);

        await db.query(`
            CREATE TABLE IF NOT EXISTS Billing (
                bill_id INT AUTO_INCREMENT PRIMARY KEY,
                appointment_id INT,
                total_amount DECIMAL(10,2),
                payment_status VARCHAR(20),
                FOREIGN KEY (appointment_id) REFERENCES Appointments(appointment_id) ON DELETE CASCADE
            );
        `);

        console.log("All database tables verified/created successfully!");
    } catch (err) {
        console.error("Error creating tables:", err);
    }
}

initDatabase();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
