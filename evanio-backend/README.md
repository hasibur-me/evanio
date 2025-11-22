# Evanio Backend API

Standalone Express.js backend server for Evanio platform.

## Features

- RESTful API with Express.js
- MongoDB with Mongoose
- JWT Authentication (Access + Refresh Tokens)
- User Management
- Document Management
- Ticket System
- Payment Processing (Stripe)
- Order Management
- Invoice Generation
- Analytics
- Blog Management
- Newsletter
- Reviews & Referrals
- 2FA Support
- Social Authentication
- Email Services
- Webhooks
- Appointment System

## Prerequisites

- Node.js >= 18.0.0
- MongoDB Atlas account or local MongoDB instance
- npm or yarn

## Installation

1. Clone the repository and navigate to backend:
```bash
cd evanio-backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Configure environment variables in `.env`:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_ACCESS_SECRET=your_jwt_access_secret_key_here_min_32_chars
JWT_REFRESH_SECRET=your_jwt_refresh_secret_key_here_min_32_chars
FRONTEND_URL=http://localhost:5173
```

## Running the Server

### Development
```bash
npm run dev
```

### Production
```bash
npm start
```

Server will start on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/refresh` - Refresh access token
- `GET /api/auth/me` - Get current user (protected)

### Other Endpoints
See root endpoint `/` for full list of available endpoints.

## Project Structure

```
evanio-backend/
├── src/
│   ├── config/         # Database configuration
│   ├── controllers/    # Route controllers
│   ├── middleware/     # Express middleware
│   ├── models/         # MongoDB models
│   ├── routes/         # Express routes
│   ├── services/       # Business logic services
│   └── utils/          # Utility functions
├── scripts/            # Utility scripts
├── server.js           # Entry point
└── package.json
```

## Environment Variables

See `.env.example` for all required environment variables.

## Deployment

### Railway
1. Connect your GitHub repository
2. Set environment variables in Railway dashboard
3. Deploy

### Render
1. Create new Web Service
2. Connect repository
3. Set environment variables
4. Deploy

### VPS
1. Install Node.js and MongoDB
2. Clone repository
3. Install dependencies
4. Set up PM2: `pm2 start server.js --name evanio-backend`
5. Configure reverse proxy (nginx)

## Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm run create-admin` - Create admin user
- `npm run seed-blog` - Seed blog posts

## License

ISC

