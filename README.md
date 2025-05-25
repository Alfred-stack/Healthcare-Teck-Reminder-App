# 🏥 Health Tech Follow-Up Reminder System

A comprehensive web application designed to streamline healthcare appointment management and automated reminder notifications for both patients and healthcare providers.

## 🌟 Features

### 📅 Appointment Management
- **Easy Scheduling**: Intuitive form-based appointment creation
- **Real-time Display**: Live view of all upcoming appointments
- **Quick Cancellation**: One-click appointment cancellation with confirmation
- **Smart Validation**: Prevents scheduling appointments in the past

### 📱 Multi-Channel Reminders
- **SMS Notifications**: Text message reminders via Twilio integration
- **WhatsApp Alerts**: WhatsApp Business API notifications
- **Email Reminders**: Professional email notifications
- **Dual Notifications**: Automatic reminders sent to both patients and doctors

### ⏰ Smart Scheduling
- **24-Hour Advance Notice**: Reminder sent 24 hours before appointment
- **1-Hour Final Alert**: Last-minute reminder 1 hour before appointment
- **Automatic Cleanup**: Cancelled appointments remove scheduled reminders

### 💾 Data Management
- **In-Memory Storage**: Fast data access for development
- **Real-time Updates**: Instant UI updates after any changes
- **Data Validation**: Comprehensive form validation and error handling
- **Database Ready**: Easy migration to MongoDB, PostgreSQL, or MySQL

## 🛠️ Technology Stack

### Frontend
- **HTML5**: Semantic markup with accessibility features
- **CSS3**: Modern responsive design with Flexbox
- **Vanilla JavaScript**: ES6+ features, no framework dependencies
- **Fetch API**: Modern HTTP client for API communication

### Backend
- **Node.js**: Server-side JavaScript runtime
- **Express.js**: Fast, unopinionated web framework
- **RESTful API**: Clean API design for appointment management
- **Modular Architecture**: Separated concerns with service layers

### Integrations (Production Ready)
- **Twilio**: SMS and WhatsApp messaging
- **Nodemailer**: Email delivery service
- **Node-Schedule**: Cron-like job scheduling

## 📁 Project Structure

```
health-tech-reminder-system/
├── 📁 public/                # Static assets
│   ├── 📁 html/
│   │   └── index.html        # Main application page
│   ├── 📁 css/
│   │   └── styles.css        # Application styling
│   └── 📁 js/
│       └── main.js           # Frontend logic
├── 📁 services/              # Backend services
│   ├── notificationService.js # Notification handlers
│   └── reminderScheduler.js  # Appointment scheduling
├── 📄 server.js              # Express server
├── 📄 package.json           # Dependencies and scripts
├── 📄 package-lock.json      # Dependency lock file
└── 📄 README.md              # Project documentation
```

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v14 or higher)
- **npm** or **yarn** package manager

### Installation & Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/health-tech-reminder-system.git

# Navigate to project directory
cd health-tech-reminder-system

# Install dependencies
npm install

# Start the development server
npm start
```

The application will be available at `http://localhost:3000`

### Environment Setup (Optional)
For production integrations, create a `.env` file in the root directory:

```env
# Twilio Configuration (for SMS/WhatsApp)
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=your_twilio_number
TWILIO_WHATSAPP_NUMBER=your_whatsapp_number

# Email Configuration (for email notifications)
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
```

### Available Scripts

```bash
# Start the server
npm start

# Start with auto-reload (development)
npm run dev

# Run tests (when implemented)
npm test
```

## 📱 Usage Guide

### Scheduling an Appointment
1. **Patient Information**: Enter patient name and contact details
2. **Doctor Information**: Provide doctor name and contact information
3. **Appointment Details**: Select date, time, and preferred reminder method
4. **Submit**: Click "Schedule Appointment" to save

### Managing Appointments
- **View All**: Appointments are automatically displayed and sorted by date
- **Cancel**: Click the "Cancel" button on any appointment card
- **Automatic Cleanup**: Cancelled appointments remove all scheduled reminders

### Reminder System
- **Automatic Scheduling**: Reminders are scheduled immediately upon appointment creation
- **Multi-Channel**: Choose between SMS, WhatsApp, or Email notifications
- **Dual Recipients**: Both patient and doctor receive reminder notifications
- **Smart Timing**: 24-hour and 1-hour advance notifications

## 🔧 API Documentation

### Endpoints

#### Get All Appointments
```http
GET /api/appointments
```
**Response**: Array of appointment objects

#### Create New Appointment
```http
POST /api/appointments
Content-Type: application/json

{
  "patientName": "John Doe",
  "patientContact": "+1234567890",
  "doctorName": "Dr. Smith",
  "doctorContact": "+0987654321",
  "appointmentDate": "2024-12-25T10:00",
  "reminderType": "sms"
}
```

#### Cancel Appointment
```http
DELETE /api/appointments/:id
```

## 🎨 Customization

### Styling
- Modify `public/css/styles.css` for visual customizations
- Responsive design works on all device sizes
- CSS variables available for easy theme changes

### Functionality
- Extend reminder timing in `services/reminderScheduler.js`
- Add new notification channels in `services/notificationService.js`
- Customize form validation in `public/js/main.js`

## 🚀 Deployment Options

### Heroku
1. Create a Heroku app
2. Connect your GitHub repository
3. Deploy from the main branch

### Vercel
1. Import your GitHub repository
2. Configure build settings (if needed)
3. Deploy automatically

### DigitalOcean/VPS
1. Clone repository on your server
2. Install dependencies with `npm install`
3. Use PM2 for process management
4. Configure reverse proxy with Nginx

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Development Workflow
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style
- Use 2 spaces for indentation
- Follow existing naming conventions
- Add comments for complex logic
- Test your changes before submitting

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Your Name** - *Initial work* - [YourGitHub](https://github.com/yourusername)

## 🙏 Acknowledgments

- Built for healthcare professionals and patients
- Inspired by the need for better appointment management
- Thanks to the open-source community for tools and libraries

## 📞 Support

For support, email your-email@example.com or create an issue in this repository.

---

**Made with ❤️ for better healthcare management**
