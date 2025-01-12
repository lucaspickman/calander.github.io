document.addEventListener('DOMContentLoaded', () => {
    const calendarGrid = document.getElementById('calendarGrid');
    const appointmentForm = document.getElementById('appointmentForm');
    const nameInput = document.getElementById('name');
    const timeInput = document.getElementById('time');
    const serviceInput = document.getElementById('service');

    // Generate calendar days
    const generateCalendar = () => {
        for (let i = 1; i <= 31; i++) {
            const day = document.createElement('div');
            day.textContent = i;
            day.setAttribute('data-day', i);
            calendarGrid.appendChild(day);
        }
    };

    // Save appointment
    const saveAppointment = (day, name, time, service) => {
        const appointments = JSON.parse(localStorage.getItem('appointments')) || {};
        if (!appointments[day]) {
            appointments[day] = [];
        }
        appointments[day].push({ name, time, service });
        localStorage.setItem('appointments', JSON.stringify(appointments));
    };

    // Load appointments
    const loadAppointments = () => {
        const appointments = JSON.parse(localStorage.getItem('appointments')) || {};
        Object.keys(appointments).forEach(day => {
            const dayDiv = calendarGrid.querySelector(`[data-day="${day}"]`);
            if (dayDiv) {
                dayDiv.style.background = '#3700b3';
                dayDiv.title = `Appointments: ${appointments[day].length}`;
            }
        });
    };

    // Handle form submission
    appointmentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const day = prompt('Enter the day of the month (1-31):');
        if (day && day >= 1 && day <= 31) {
            saveAppointment(day, nameInput.value, timeInput.value, serviceInput.value);
            alert('Appointment saved!');
            loadAppointments();
            appointmentForm.reset();
        } else {
            alert('Invalid day!');
        }
    });

    generateCalendar();
    loadAppointments();
});

