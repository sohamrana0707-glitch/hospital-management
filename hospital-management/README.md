# 🏥 Clinic & Hospital Management System

A full-stack web application designed for managing hospital operations, including patient registration, doctor directories, appointment scheduling, prescriptions, billing records, and real-time data analytics.

## 🚀 Tech Stack
- **Frontend:** HTML5, CSS3, JavaScript, Chart.js (Dark-mode UI dashboard)
- **Backend:** Node.js, Express.js (MVC Architecture)
- **Database:** MySQL

---

## 📋 Features
- **Patient Management:** Register patients, view demographic records, and manage profiles with real-time keyword search.
- **Doctor Directory:** Add doctors, list specializations, and manage consultation fees.
- **Appointment Scheduling:** Book appointments linking patients and doctors with date-time validations.
- **Prescription Tracking:** Issue and look up medication prescriptions per appointment.
- **Billing System:** Generate consultation bills and track payment statuses (Paid/Pending).
- **Analytics Dashboard:** Interactive Chart.js doughnut and bar charts visualizing gender distribution and system summary counts.
- **CRUD Operations:** Complete Create, Read, Update, and Delete support across all entities.

---

## ⚙️ Local Setup & Installation Instructions

Follow these steps to run the project locally on your machine:

### 1. Clone the Repository
```bash
git clone https://github.com/sohamrana0707-glitch/hospital-management.git
cd hospital-management
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory and add your MySQL credentials:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=hospital_db
PORT=5000
```

### 4. Set Up the MySQL Database
Create the `hospital_db` database in MySQL and run your schema setup to create the `Patients`, `Doctors`, `Appointments`, `Prescriptions`, and `Billing` tables.

### 5. Start the Server
```bash
node server.js
```
Open your browser and go to **`http://localhost:5000`**.
