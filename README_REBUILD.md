# Evanio Platform - Full Rebuild

This document describes the complete rebuild of the Evanio platform with separated frontend and backend architecture.

## Project Structure

```
EVANIOLTD/
├── evanio-backend/      # Standalone Express.js API server
│   ├── src/
│   │   ├── config/      # Database configuration
│   │   ├── controllers/ # Route controllers
│   │   ├── middleware/  # Express middleware
│   │   ├── models/      # MongoDB models
│   │   ├── routes/      # Express routes
│   │   ├── services/    # Business logic
│   │   └── utils/       # Utility functions
│   ├── scripts/         # Utility scripts
│   ├── server.js        # Entry point
│   └── package.json
│
└── evanio-frontend/     # Standalone React/Vite app
    ├── src/
    │   ├── components/  # React components
    │   ├── pages/       # Page components
    │   ├── context/     # React contexts
    │   ├── utils/       # Utility functions
    │   ├── data/        # Static data
    │   └── i18n/        # Internationalization
    ├── public/          # Static assets
    ├── index.html
    ├── vite.config.js
    └── package.json
```

## What Changed

### Backend

1. **Separated from Serverless Structure**
   - Removed `/api/index.js` serverless wrapper
   - Created standalone Express server (`server.js`)
   - Removed Vercel-specific code

2. **Clean Architecture**
   - All code moved to `src/` directory
   - Proper separation of concerns
   - Modular file structure

3. **JWT Token System**
   - Implemented access tokens (30 days)
   - Implemented refresh tokens (90 days)
   - Added `/api/auth/refresh` endpoint

4. **MongoDB Connection**
   - Clean database connection in `src/config/database.js`
   - Proper connection handling
   - No serverless-specific connection logic

5. **CORS Configuration**
   - Configured for separated frontend
   - Uses `FRONTEND_URL` environment variable

### Frontend

1. **Separated from Monorepo**
   - Standalone React/Vite project
   - No backend code included
   - Clean project structure

2. **API Configuration**
   - Uses `VITE_API_URL` environment variable
   - Points to external backend URL
   - Removed proxy configuration (uses direct API calls)

3. **Refresh Token Support**
   - Stores refresh tokens in localStorage
   - Automatically refreshes access tokens on 401
   - Seamless token refresh handling

4. **Same Design & Features**
   - All pages replicated exactly
   - Same UI/UX
   - Same components
   - Same animations and themes

## Quick Start

### Backend

```bash
cd evanio-backend
npm install
cp .env.example .env
# Edit .env with your configuration
npm run dev
```

### Frontend

```bash
cd evanio-frontend
npm install
cp .env.example .env
# Edit .env with your backend URL
npm run dev
```

## Features Preserved

All original features are preserved:

✅ Authentication (Login, Register, 2FA)
✅ User Management
✅ Document Upload
✅ Ticket System
✅ Payment Processing (Stripe)
✅ Order Management
✅ Invoice Generation
✅ Analytics Dashboard
✅ Blog Management
✅ Newsletter
✅ Reviews & Referrals
✅ Appointment System
✅ Social Authentication
✅ Email Services
✅ Webhooks
✅ Theme Settings
✅ Dark Mode
✅ Internationalization
✅ Admin Panel
✅ User Dashboard

## Deployment

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for complete deployment instructions.

### Quick Deployment

**Backend:**
- Deploy to Railway, Render, or VPS
- Set environment variables
- Get backend URL

**Frontend:**
- Deploy to Vercel or Netlify
- Set `VITE_API_URL` to your backend URL
- Deploy!

## Environment Variables

### Backend Required

- `MONGODB_URI` - MongoDB connection string
- `JWT_ACCESS_SECRET` - JWT access token secret
- `JWT_REFRESH_SECRET` - JWT refresh token secret
- `FRONTEND_URL` - Frontend URL for CORS

### Frontend Required

- `VITE_API_URL` - Backend API URL (e.g., `https://api.evanio.com/api`)

See `.env.example` files in each project for complete list.

## Migration Notes

### From Old Structure

If migrating from the old monorepo structure:

1. **Backend URLs Changed**
   - Old: `/api/*` (proxy)
   - New: Full URL from `VITE_API_URL`

2. **No More Serverless**
   - Backend is now a persistent server
   - Deploy to Railway, Render, or VPS
   - Not for Vercel serverless functions

3. **Environment Variables**
   - Frontend needs `VITE_API_URL`
   - Backend needs `FRONTEND_URL` for CORS

## Support

For deployment help, see [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

For issues, check:
- Backend logs
- Frontend build logs
- Browser console
- Network requests

