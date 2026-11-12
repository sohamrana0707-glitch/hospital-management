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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});