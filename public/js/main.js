document.addEventListener('DOMContentLoaded', function() {
    const appointmentForm = document.getElementById('appointmentForm');
    const appointmentsList = document.getElementById('appointmentsList');

    // Load existing appointments
    fetchAppointments();

    // Handle form submission
    appointmentForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const appointment = {
            patientName: document.getElementById('patientName').value,
            patientContact: document.getElementById('patientContact').value,
            doctorName: document.getElementById('doctorName').value,
            doctorContact: document.getElementById('doctorContact').value,
            appointmentDate: document.getElementById('appointmentDate').value,
            reminderType: document.getElementById('reminderType').value
        };

        // Validate appointment date is in the future
        const appointmentDateTime = new Date(appointment.appointmentDate);
        const now = new Date();

        if (appointmentDateTime <= now) {
            alert('Please select a future date and time for the appointment.');
            return;
        }

        // Send appointment data to server
        fetch('/api/appointments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(appointment)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                appointmentForm.reset();
                fetchAppointments();
                alert('Appointment scheduled successfully!');
            } else {
                alert('Error scheduling appointment: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while scheduling the appointment.');
        });
    });

    // Function to fetch and display appointments
    function fetchAppointments() {
        fetch('/api/appointments')
        .then(response => response.json())
        .then(appointments => {
            appointmentsList.innerHTML = '';

            if (appointments.length === 0) {
                appointmentsList.innerHTML = '<p>No upcoming appointments.</p>';
                return;
            }

            appointments.forEach(appointment => {
                const appointmentCard = document.createElement('div');
                appointmentCard.className = 'appointment-card';

                const appointmentDate = new Date(appointment.appointmentDate);
                const formattedDate = appointmentDate.toLocaleString();

                appointmentCard.innerHTML = `
                    <h3>${appointment.patientName} with Dr. ${appointment.doctorName}</h3>
                    <p class="appointment-info"><strong>Date:</strong> ${formattedDate}</p>
                    <p class="appointment-info"><strong>Patient Contact:</strong> ${appointment.patientContact}</p>
                    <p class="appointment-info"><strong>Doctor Contact:</strong> ${appointment.doctorContact}</p>
                    <p class="appointment-info"><strong>Reminder Method:</strong> ${appointment.reminderType}</p>
                    <button class="delete-btn" data-id="${appointment._id}">Cancel</button>
                `;

                appointmentsList.appendChild(appointmentCard);
            });

            // Add event listeners to delete buttons
            document.querySelectorAll('.delete-btn').forEach(button => {
                button.addEventListener('click', function() {
                    const id = this.getAttribute('data-id');
                    deleteAppointment(id);
                });
            });
        })
        .catch(error => {
            console.error('Error:', error);
            appointmentsList.innerHTML = '<p>Error loading appointments.</p>';
        });
    }

    // Function to delete an appointment
    function deleteAppointment(id) {
        if (confirm('Are you sure you want to cancel this appointment?')) {
            fetch(`/api/appointments/${id}`, {
                method: 'DELETE'
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    fetchAppointments();
                    alert('Appointment cancelled successfully!');
                } else {
                    alert('Error cancelling appointment: ' + data.message);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred while cancelling the appointment.');
            });
        }
    }
});