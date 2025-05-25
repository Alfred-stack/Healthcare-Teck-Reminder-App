const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// In-memory storage (replace with a database in production)
let appointments = [];
let appointmentIdCounter = 1;

// Schedule reminders
const reminderScheduler = require('./services/reminderScheduler');

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'html', 'index.html'));
});

// API endpoints
app.get('/api/appointments', (req, res) => {
  res.json(appointments);
});

app.post('/api/appointments', (req, res) => {
  try {
    const newAppointment = {
      _id: appointmentIdCounter++,
      ...req.body,
      createdAt: new Date()
    };

    appointments.push(newAppointment);

    // Schedule reminders for this appointment
    try {
      reminderScheduler.scheduleReminder(newAppointment);
    } catch (reminderError) {
      console.error('Error scheduling reminders:', reminderError);
      // Continue even if reminder scheduling fails
    }

    res.json({ success: true, appointment: newAppointment });
  } catch (error) {
    console.error('Error creating appointment:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

app.delete('/api/appointments/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const index = appointments.findIndex(appointment => appointment._id === id);

    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }

    // Cancel scheduled reminders
    reminderScheduler.cancelReminder(appointments[index]);

    // Remove appointment
    appointments.splice(index, 1);

    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting appointment:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
