# Evanio - Complete Business Solutions Platform

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

A full-stack business solutions platform offering business formation, website development, branding, payment setup, and comprehensive business growth services.

## 🚀 Features

### Frontend
- **Modern React Application** built with Vite
- **Responsive Design** with Tailwind CSS
- **Dark Mode Support** with system preference detection
- **Multi-language Support** (i18n) - English, Spanish, French, German
- **PWA Ready** - Progressive Web App capabilities
- **Analytics Dashboard** - Comprehensive user analytics
- **Protected Routes** - User and admin authentication
- **Service Pages** - Detailed service information
- **Blog System** - Content management
- **Dashboard** - User and admin dashboards
- **Live Chat** - Real-time customer support
- **Theme Customization** - Dynamic theme settings

### Backend
- **RESTful API** built with Express.js
- **MongoDB Database** with Mongoose ODM
- **JWT Authentication** with access and refresh tokens
- **Two-Factor Authentication** (2FA) support
- **File Upload** support with Multer
- **Email Service** integration
- **Payment Processing** with Stripe
- **Webhook Support** for integrations
- **Analytics Tracking** API
- **Document Generation** with PDFKit
- **Invoice System** - Automated invoicing
- **Ticket System** - Customer support tickets
- **Appointment Scheduling** - Booking system
- **Referral System** - Referral tracking
- **Review System** - Customer reviews
- **Blog Management** - Content management API

## 📋 Prerequisites

- **Node.js** >= 18.0.0
- **MongoDB** (Local or Atlas cloud)
- **npm** or **yarn**

## 🛠️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/hasibur-me/evanio.git
cd evanio
```

### 2. Backend Setup

```bash
cd evanio-backend
npm install
```

Create a `.env` file in `evanio-backend/`:

```env
# Server Configuration
PORT=5000
NODE_ENV=production

# Database
MONGODB_URI=your_mongodb_connection_string

# JWT Secrets
JWT_ACCESS_SECRET=your_access_secret_key
JWT_REFRESH_SECRET=your_refresh_secret_key

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173

# Email Service (Optional)
EMAIL_SERVICE_API_KEY=your_email_service_key

# Stripe (Optional)
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
```

### 3. Frontend Setup

```bash
cd evanio-frontend
npm install
```

Create a `.env` file in `evanio-frontend/`:

```env
VITE_API_URL=http://localhost:5000/api
```

### 4. Start Development Servers

**Backend:**
```bash
cd evanio-backend
npm run dev
```

**Frontend:**
```bash
cd evanio-frontend
npm run dev
```

## 📁 Project Structure

```
evanio/
├── evanio-backend/          # Backend API server
│   ├── src/
│   │   ├── controllers/     # Route controllers
│   │   ├── models/          # MongoDB models
│   │   ├── routes/          # Express routes
│   │   ├── middleware/      # Custom middleware
│   │   ├── utils/           # Utility functions
│   │   └── config/          # Configuration files
│   ├── scripts/             # Utility scripts
│   └── server.js            # Entry point
│
└── evanio-frontend/         # Frontend React application
    ├── src/
    │   ├── components/      # React components
    │   ├── pages/           # Page components
    │   ├── context/         # React Context providers
    │   ├── utils/           # Utility functions
    │   ├── i18n/            # Internationalization
    │   └── assets/          # Static assets
    └── public/              # Public assets
```

## 🔧 Configuration

### Environment Variables

**Backend (.env):**
- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment (development/production)
- `MONGODB_URI` - MongoDB connection string
- `JWT_ACCESS_SECRET` - JWT access token secret
- `JWT_REFRESH_SECRET` - JWT refresh token secret
- `FRONTEND_URL` - Frontend URL for CORS

**Frontend (.env):**
- `VITE_API_URL` - Backend API URL

## 🚢 Deployment

### Backend Deployment

1. Set environment variables on your hosting platform
2. Ensure MongoDB is accessible
3. Build and start:
   ```bash
   npm start
   ```

### Frontend Deployment

1. Set `VITE_API_URL` to your production backend URL
2. Build for production:
   ```bash
   npm run build
   ```
3. Deploy the `dist/` folder to your hosting platform (Vercel, Netlify, etc.)

## 📚 API Documentation

The API documentation is available at `/api/docs` when the backend is running.

### Main Endpoints:

- `/api/auth` - Authentication
- `/api/users` - User management
- `/api/services` - Services
- `/api/orders` - Orders
- `/api/payments` - Payments
- `/api/tickets` - Support tickets
- `/api/documents` - Document management
- `/api/analytics` - Analytics
- `/api/appointments` - Appointments
- `/api/blog` - Blog posts
- `/api/reviews` - Reviews
- `/api/referrals` - Referrals
- `/api/invoices` - Invoices

## 🧪 Testing

```bash
# Backend tests
cd evanio-backend
npm test

# Frontend tests
cd evanio-frontend
npm test
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👥 Authors

- **Hasibur** - [hasibur-me](https://github.com/hasibur-me)

## 🙏 Acknowledgments

- React Team
- Express.js Team
- MongoDB Team
- Vite Team
- Tailwind CSS Team

## 📞 Support

For support, email support@evanio.com or create an issue in the repository.

---

**Made with ❤️ by the Evanio Team**

