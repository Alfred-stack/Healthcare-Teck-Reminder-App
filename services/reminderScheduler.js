const notificationService = require('./notificationService');

// Store scheduled timeouts by appointment ID
const scheduledTimeouts = {};

/**
 * Schedule reminders for an appointment
 * @param {Object} appointment - The appointment object
 */
function scheduleReminder(appointment) {
  try {
    const appointmentDate = new Date(appointment.appointmentDate);
    const now = new Date();

    // Schedule reminder for 24 hours before appointment
    const reminder24h = new Date(appointmentDate);
    reminder24h.setHours(reminder24h.getHours() - 24);

    if (reminder24h > now) {
      const timeout24h = setTimeout(() => {
        sendReminder(appointment, '24 hours');
      }, reminder24h.getTime() - now.getTime());

      scheduledTimeouts[`${appointment._id}_24h`] = timeout24h;
    }

    // Schedule reminder for 1 hour before appointment
    const reminder1h = new Date(appointmentDate);
    reminder1h.setHours(reminder1h.getHours() - 1);

    if (reminder1h > now) {
      const timeout1h = setTimeout(() => {
        sendReminder(appointment, '1 hour');
      }, reminder1h.getTime() - now.getTime());

      scheduledTimeouts[`${appointment._id}_1h`] = timeout1h;
    }

    console.log(`Scheduled reminders for appointment ${appointment._id}`);
  } catch (error) {
    console.error('Error scheduling reminder:', error);
  }
}

/**
 * Cancel all reminders for an appointment
 * @param {Object} appointment - The appointment object
 */
function cancelReminder(appointment) {
  try {
    const timeoutKeys = [
      `${appointment._id}_24h`,
      `${appointment._id}_1h`
    ];

    timeoutKeys.forEach(key => {
      if (scheduledTimeouts[key]) {
        clearTimeout(scheduledTimeouts[key]);
        delete scheduledTimeouts[key];
      }
    });

    console.log(`Cancelled reminders for appointment ${appointment._id}`);
  } catch (error) {
    console.error('Error cancelling reminder:', error);
  }
}

/**
 * Send a reminder notification
 * @param {Object} appointment - The appointment object
 * @param {String} timeframe - The timeframe of the reminder (e.g., "24 hours")
 */
function sendReminder(appointment, timeframe) {
  try {
    // Prepare message for patient
    const patientMessage = `Reminder: You have an appointment with Dr. ${appointment.doctorName} in ${timeframe}.`;

    // Prepare message for doctor
    const doctorMessage = `Reminder: You have an appointment with ${appointment.patientName} in ${timeframe}.`;

    // Send notifications based on reminder type
    switch (appointment.reminderType) {
      case 'sms':
        notificationService.sendSMS(appointment.patientContact, patientMessage);
        notificationService.sendSMS(appointment.doctorContact, doctorMessage);
        break;
      case 'whatsapp':
        notificationService.sendWhatsApp(appointment.patientContact, patientMessage);
        notificationService.sendWhatsApp(appointment.doctorContact, doctorMessage);
        break;
      case 'email':
        notificationService.sendEmail(appointment.patientContact, 'Appointment Reminder', patientMessage);
        notificationService.sendEmail(appointment.doctorContact, 'Appointment Reminder', doctorMessage);
        break;
      default:
        console.log(`Unknown reminder type: ${appointment.reminderType}`);
    }

    console.log(`Sent ${timeframe} reminder for appointment ${appointment._id}`);
  } catch (error) {
    console.error('Error sending reminder:', error);
  }
}

module.exports = {
  scheduleReminder,
  cancelReminder
};