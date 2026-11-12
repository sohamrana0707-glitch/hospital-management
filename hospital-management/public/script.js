// Switch Between Dashboard Tabs
function switchTab(evt, tabId) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));

    document.getElementById(tabId).classList.add('active');
    evt.currentTarget.classList.add('active');
}

// Search and Filter Tables
function filterTable(tbodyId, query) {
    const rows = document.querySelectorAll(`#${tbodyId} tr`);

    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(query.toLowerCase()) ? '' : 'none';
    });
}

// --- Patients ---

document.getElementById('patientForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = {
        first_name: document.getElementById('p_first').value,
        last_name: document.getElementById('p_last').value,
        gender: document.getElementById('p_gender').value,
        dob: document.getElementById('p_dob').value,
        phone: document.getElementById('p_phone').value
    };

    await fetch('/api/patients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    document.getElementById('patientForm').reset();
    loadPatients();
});

async function loadPatients() {
    const res = await fetch('/api/patients');
    const data = await res.json();

    const tbody = document.getElementById('patientTableBody');
    tbody.innerHTML = '';

    data.forEach(p => {
        tbody.innerHTML += `<tr>
            <td>${p.patient_id}</td>
            <td>${p.first_name} ${p.last_name}</td>
            <td>${p.gender}</td>
            <td>${p.phone}</td>
            <td>
                <button class="delete-btn" onclick="deleteRecord('patients', ${p.patient_id})">
                    Delete
                </button>
            </td>
        </tr>`;
    });
}

// --- Doctors ---

document.getElementById('doctorForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = {
        first_name: document.getElementById('d_first').value,
        last_name: document.getElementById('d_last').value,
        specialization: document.getElementById('d_spec').value,
        phone: document.getElementById('d_phone').value,
        consultation_fee: document.getElementById('d_fee').value
    };

    await fetch('/api/doctors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    document.getElementById('doctorForm').reset();
    loadDoctors();
});

async function loadDoctors() {
    const res = await fetch('/api/doctors');
    const data = await res.json();

    const tbody = document.getElementById('doctorTableBody');
    tbody.innerHTML = '';

    data.forEach(d => {
        tbody.innerHTML += `<tr>
            <td>${d.doctor_id}</td>
            <td>Dr. ${d.first_name} ${d.last_name}</td>
            <td>${d.specialization}</td>
            <td>₹${d.consultation_fee}</td>
            <td>
                <button class="delete-btn" onclick="deleteRecord('doctors', ${d.doctor_id})">
                    Delete
                </button>
            </td>
        </tr>`;
    });
}

// --- Appointments ---

document.getElementById('appointmentForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = {
        patient_id: document.getElementById('a_patient_id').value,
        doctor_id: document.getElementById('a_doctor_id').value,
        appointment_date: document.getElementById('a_date').value.replace('T', ' ') + ':00'
    };

    await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    document.getElementById('appointmentForm').reset();
    loadAppointments();
});

async function loadAppointments() {
    const res = await fetch('/api/appointments');
    const data = await res.json();

    const tbody = document.getElementById('appointmentTableBody');
    tbody.innerHTML = '';

    data.forEach(a => {
        const formattedDate = new Date(a.appointment_date).toLocaleString();

        tbody.innerHTML += `<tr>
            <td>${a.appointment_id}</td>
            <td>${a.patient_name}</td>
            <td>${a.doctor_name}</td>
            <td>${a.specialization}</td>
            <td>${formattedDate}</td>
            <td>
                <button class="delete-btn" onclick="deleteRecord('appointments', ${a.appointment_id})">
                    Delete
                </button>
            </td>
        </tr>`;
    });
}

// --- Prescriptions ---

document.getElementById('prescriptionForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = {
        appointment_id: document.getElementById('rx_apt_id').value,
        medication: document.getElementById('rx_med').value,
        dosage: document.getElementById('rx_dosage').value,
        instructions: document.getElementById('rx_instructions').value
    };

    const res = await fetch('/api/prescriptions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    const result = await res.json();

    alert(result.message || 'Prescription saved!');
    document.getElementById('prescriptionForm').reset();
});

async function loadPrescriptions() {
    const aptId = document.getElementById('lookupAptId').value;

    if (!aptId) {
        alert('Please enter an Appointment ID');
        return;
    }

    const res = await fetch(`/api/prescriptions/${aptId}`);
    const data = await res.json();

    const tbody = document.getElementById('prescriptionTableBody');
    tbody.innerHTML = '';

    if (data.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="4" style="text-align:center;">No prescriptions found</td>
            </tr>`;
        return;
    }

    data.forEach(rx => {
        tbody.innerHTML += `<tr>
            <td>${rx.prescription_id}</td>
            <td><b>${rx.medication}</b></td>
            <td>${rx.dosage}</td>
            <td>${rx.instructions}</td>
        </tr>`;
    });
}

// --- Billing ---

document.getElementById('billingForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = {
        appointment_id: document.getElementById('bill_apt_id').value,
        total_amount: document.getElementById('bill_amount').value,
        payment_status: document.getElementById('bill_status').value
    };

    const res = await fetch('/api/billing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    const result = await res.json();

    alert(result.message || 'Bill generated!');
    document.getElementById('billingForm').reset();
});


async function loadBilling() {
    const aptId = document.getElementById('lookupBillId').value;

    if (!aptId) {
        alert('Please enter an Appointment ID');
        return;
    }

    const res = await fetch(`/api/billing/${aptId}`);
    const data = await res.json();

    const resultDiv = document.getElementById('billResult');

    resultDiv.style.setProperty('background', '#ffffff', 'important');
    resultDiv.style.setProperty('color', '#17243a', 'important');
    resultDiv.style.setProperty('padding', '22px', 'important');
    resultDiv.style.setProperty('border', '1px solid #e2e8f0', 'important');
    resultDiv.style.setProperty('border-radius', '12px', 'important');
    resultDiv.style.setProperty('line-height', '2', 'important');
    resultDiv.style.setProperty('font-size', '14px', 'important');
    resultDiv.style.setProperty('box-shadow', '0 5px 18px rgba(0,0,0,0.04)', 'important');

    if (!data || data.message || data.error) {
        resultDiv.innerHTML = `
            <span style="color:#dc3545; font-weight:600;">
                No bill found for Appointment #${aptId}
            </span>
        `;
        return;
    }

    resultDiv.innerHTML = `
        <div style="color:#17243a !important;">
            <div>
                <b style="color:#64748b;">Bill ID:</b>
                <span style="color:#17243a;">${data.bill_id}</span>
            </div>

            <div>
                <b style="color:#64748b;">Appointment ID:</b>
                <span style="color:#17243a;">${data.appointment_id}</span>
            </div>

            <div>
                <b style="color:#64748b;">Total Amount:</b>
                <span style="color:#17243a; font-weight:700;">
                    ₹${data.total_amount}
                </span>
            </div>

            <div>
                <b style="color:#64748b;">Status:</b>
                <span style="
                    color:${data.payment_status === 'Paid' ? '#16a34a' : '#d97706'};
                    font-weight:800;
                ">
                    ${data.payment_status}
                </span>
            </div>
        </div>
    `;
}

// --- Analytics Charts ---

let genderChartInstance = null;
let overviewChartInstance = null;

async function loadAnalytics() {
    const pRes = await fetch('/api/patients');
    const patients = await pRes.json();

    const dRes = await fetch('/api/doctors');
    const doctors = await dRes.json();

    const aRes = await fetch('/api/appointments');
    const appointments = await aRes.json();

    const males = patients.filter(p => p.gender === 'Male').length;
    const females = patients.filter(p => p.gender === 'Female').length;
    const others = patients.filter(p => p.gender === 'Other').length;

    const ctxGender = document.getElementById('patientGenderChart').getContext('2d');

    if (genderChartInstance) {
        genderChartInstance.destroy();
    }

    genderChartInstance = new Chart(ctxGender, {
        type: 'doughnut',
        data: {
            labels: ['Male', 'Female', 'Other'],
            datasets: [{
                data: [males, females, others],
                backgroundColor: ['#3b82f6', '#ec4899', '#a855f7']
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    labels: { color: '#f8fafc' }
                }
            }
        }
    });

    const ctxOverview = document.getElementById('systemOverviewChart').getContext('2d');

    if (overviewChartInstance) {
        overviewChartInstance.destroy();
    }

    overviewChartInstance = new Chart(ctxOverview, {
        type: 'bar',
        data: {
            labels: ['Patients', 'Doctors', 'Appointments'],
            datasets: [{
                label: 'Total Count',
                data: [patients.length, doctors.length, appointments.length],
                backgroundColor: ['#3b82f6', '#10b981', '#f59e0b']
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    labels: { color: '#f8fafc' }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1,
                        color: '#94a3b8'
                    },
                    grid: { color: '#334155' }
                },
                x: {
                    ticks: { color: '#94a3b8' },
                    grid: { color: '#334155' }
                }
            }
        }
    });
}

// --- Generic Delete Handler ---

async function deleteRecord(endpoint, id) {
    if (confirm('Are you sure you want to delete this record?')) {
        await fetch(`/api/${endpoint}/${id}`, {
            method: 'DELETE'
        });

        if (endpoint === 'patients') loadPatients();
        if (endpoint === 'doctors') loadDoctors();
        if (endpoint === 'appointments') loadAppointments();
    }
}

// --- Initial Load ---

loadPatients();
loadDoctors();
loadAppointments();
