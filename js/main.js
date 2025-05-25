document.addEventListener('DOMContentLoaded', function() {
    const appointmentForm = document.getElementById('appointmentForm');
    const appointmentsList = document.getElementById('appointmentsList');
    
    // Use localStorage for demo purposes (since we can't use a backend on GitHub Pages)
    let appointments = JSON.parse(localStorage.getItem('appointments')) || [];
    let appointmentIdCounter = parseInt(localStorage.getItem('appointmentIdCounter')) || 1;
    
    // Load existing appointments on page load
    displayAppointments();
    
    // Handle form submission
    appointmentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const appointment = {
            _id: appointmentIdCounter++,
            patientName: document.getElementById('patientName').value,
            patientContact: document.getElementById('patientContact').value,
            doctorName: document.getElementById('doctorName').value,
            doctorContact: document.getElementById('doctorContact').value,
            appointmentDate: document.getElementById('appointmentDate').value,
            reminderType: document.getElementById('reminderType').value,
            createdAt: new Date().toISOString()
        };
        
        // Validate appointment date is in the future
        const appointmentDateTime = new Date(appointment.appointmentDate);
        const now = new Date();
        
        if (appointmentDateTime <= now) {
            alert('Please select a future date and time for the appointment.');
            return;
        }
        
        // Add appointment to array
        appointments.push(appointment);
        
        // Save to localStorage
        localStorage.setItem('appointments', JSON.stringify(appointments));
        localStorage.setItem('appointmentIdCounter', appointmentIdCounter.toString());
        
        // Schedule demo reminders (console logs for demo)
        scheduleReminder(appointment);
        
        // Reset form and refresh display
        appointmentForm.reset();
        displayAppointments();
        
        alert('Appointment scheduled successfully! (Demo mode - using local storage)');
    });
    
    // Function to display appointments
    function displayAppointments() {
        appointmentsList.innerHTML = '';
        
        if (appointments.length === 0) {
            appointmentsList.innerHTML = '<p>No upcoming appointments.</p>';
            return;
        }
        
        // Sort appointments by date
        const sortedAppointments = appointments.sort((a, b) => 
            new Date(a.appointmentDate) - new Date(b.appointmentDate)
        );
        
        sortedAppointments.forEach(appointment => {
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
                const id = parseInt(this.getAttribute('data-id'));
                deleteAppointment(id);
            });
        });
    }
    
    // Function to delete an appointment
    function deleteAppointment(id) {
        if (confirm('Are you sure you want to cancel this appointment?')) {
            appointments = appointments.filter(appointment => appointment._id !== id);
            localStorage.setItem('appointments', JSON.stringify(appointments));
            displayAppointments();
            alert('Appointment cancelled successfully!');
        }
    }
    
    // Demo reminder scheduling function
    function scheduleReminder(appointment) {
        const appointmentDate = new Date(appointment.appointmentDate);
        const now = new Date();
        
        // Calculate reminder times
        const reminder24h = new Date(appointmentDate);
        reminder24h.setHours(reminder24h.getHours() - 24);
        
        const reminder1h = new Date(appointmentDate);
        reminder1h.setHours(reminder1h.getHours() - 1);
        
        console.log(`📅 Demo: Scheduled reminders for appointment ${appointment._id}`);
        console.log(`📱 24h reminder: ${reminder24h.toLocaleString()}`);
        console.log(`📱 1h reminder: ${reminder1h.toLocaleString()}`);
        
        // In a real application, these would be actual scheduled notifications
        if (reminder24h > now) {
            console.log(`📧 Would send ${appointment.reminderType} reminder 24 hours before to:`);
            console.log(`   Patient: ${appointment.patientContact}`);
            console.log(`   Doctor: ${appointment.doctorContact}`);
        }
        
        if (reminder1h > now) {
            console.log(`📧 Would send ${appointment.reminderType} reminder 1 hour before to:`);
            console.log(`   Patient: ${appointment.patientContact}`);
            console.log(`   Doctor: ${appointment.doctorContact}`);
        }
    }
    
    // Add demo data button for testing
    const demoButton = document.createElement('button');
    demoButton.textContent = 'Add Demo Data';
    demoButton.style.marginTop = '10px';
    demoButton.style.backgroundColor = '#e74c3c';
    demoButton.style.color = 'white';
    demoButton.style.border = 'none';
    demoButton.style.padding = '10px 15px';
    demoButton.style.borderRadius = '4px';
    demoButton.style.cursor = 'pointer';
    
    demoButton.addEventListener('click', function() {
        const demoAppointment = {
            _id: appointmentIdCounter++,
            patientName: 'John Doe',
            patientContact: '+1-555-0123',
            doctorName: 'Smith',
            doctorContact: '+1-555-0456',
            appointmentDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().slice(0, 16),
            reminderType: 'sms',
            createdAt: new Date().toISOString()
        };
        
        appointments.push(demoAppointment);
        localStorage.setItem('appointments', JSON.stringify(appointments));
        localStorage.setItem('appointmentIdCounter', appointmentIdCounter.toString());
        
        scheduleReminder(demoAppointment);
        displayAppointments();
        
        alert('Demo appointment added!');
    });
    
    document.querySelector('.form-container').appendChild(demoButton);
});
