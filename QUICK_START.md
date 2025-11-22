# Evanio Platform - Quick Start Guide

Quick start guide for running the separated Evanio frontend and backend locally.

## Prerequisites

- Node.js >= 18.0.0
- MongoDB Atlas account (or local MongoDB)
- npm or yarn

## Backend Setup (5 minutes)

### 1. Navigate to Backend
```bash
cd evanio-backend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment
Create `.env` file:
```bash
# Copy example (or create manually)
# On Windows:
copy .env.example .env

# On Mac/Linux:
cp .env.example .env
```

Edit `.env` file:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_ACCESS_SECRET=your_secret_key_min_32_chars
JWT_REFRESH_SECRET=your_refresh_secret_min_32_chars
FRONTEND_URL=http://localhost:5173
```

### 4. Start Backend
```bash
npm run dev
```

Backend will run on `http://localhost:5000`

✅ Test it: Visit `http://localhost:5000/api/health`

## Frontend Setup (5 minutes)

### 1. Navigate to Frontend
```bash
cd evanio-frontend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment
Create `.env` file:
```bash
# Copy example (or create manually)
# On Windows:
copy .env.example .env

# On Mac/Linux:
cp .env.example .env
```

Edit `.env` file:
```env
VITE_API_URL=http://localhost:5000/api
```

### 4. Start Frontend
```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

✅ Open in browser: `http://localhost:5173`

## Verify Setup

1. **Backend is running**
   - Visit: `http://localhost:5000/api/health`
   - Should see: `{"message": "Server is running", ...}`

2. **Frontend is running**
   - Visit: `http://localhost:5173`
   - Should see: Homepage loads

3. **Connection works**
   - Try to register/login
   - Check browser console (F12) for any errors
   - Check Network tab - API calls should go to `http://localhost:5000/api`

## Create Admin User

In a new terminal:
```bash
cd evanio-backend
npm run create-admin
```

Follow prompts to create admin user.

## Troubleshooting

### Backend won't start
- Check MongoDB connection string
- Ensure JWT secrets are set (min 32 characters)
- Check if port 5000 is available

### Frontend can't connect to backend
- Verify backend is running on port 5000
- Check `VITE_API_URL` in `.env` file
- Ensure no CORS errors in browser console
- Backend `FRONTEND_URL` should be `http://localhost:5173`

### MongoDB connection errors
- Verify MongoDB Atlas connection string
- Check network access in MongoDB Atlas (allow all IPs for development)
- Ensure database name is in connection string

### Port already in use
**Windows:**
```powershell
# Find process using port 5000
netstat -ano | findstr :5000

# Kill process (replace PID)
taskkill /PID <PID> /F
```

**Mac/Linux:**
```bash
# Find and kill process
lsof -ti:5000 | xargs kill -9
```

## Next Steps

- Read [README_REBUILD.md](./README_REBUILD.md) for architecture details
- Read [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for deployment instructions
- Check backend README: `evanio-backend/README.md`
- Check frontend README: `evanio-frontend/README.md`

## Development Tips

1. **Backend changes**: Server restarts automatically with nodemon
2. **Frontend changes**: Vite hot-reloads automatically
3. **API testing**: Use Postman or curl to test backend endpoints
4. **Console logs**: Check browser console (F12) for frontend errors
5. **Network tab**: Check browser Network tab to see API calls

## Available Scripts

### Backend
- `npm start` - Start production server
- `npm run dev` - Start development server (with nodemon)
- `npm run create-admin` - Create admin user
- `npm run seed-blog` - Seed blog posts

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Environment Variables Quick Reference

### Backend (.env)
```
MONGODB_URI=required
JWT_ACCESS_SECRET=required (min 32 chars)
JWT_REFRESH_SECRET=required (min 32 chars)
FRONTEND_URL=required (for CORS)
```

### Frontend (.env)
```
VITE_API_URL=required (backend URL with /api)
```

Happy coding! 🚀

