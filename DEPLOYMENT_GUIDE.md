# Evanio Platform - Deployment Guide

Complete deployment guide for the separated Evanio Frontend and Backend.

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Prerequisites](#prerequisites)
3. [Backend Deployment](#backend-deployment)
4. [Frontend Deployment](#frontend-deployment)
5. [Environment Variables](#environment-variables)
6. [Post-Deployment](#post-deployment)

## Architecture Overview

The Evanio platform is now split into two separate projects:

- **evanio-backend** - Express.js REST API server
- **evanio-frontend** - React/Vite static site

### Backend Endpoints
- Local: `http://localhost:5000`
- Production: `https://api.evanio.com` (or your backend URL)

### Frontend URLs
- Local: `http://localhost:5173`
- Production: `https://evanio.com` (or your frontend URL)

## Prerequisites

### Backend
- Node.js >= 18.0.0
- MongoDB Atlas account or MongoDB instance
- Railway/Render/VPS account

### Frontend
- Node.js >= 18.0.0
- Vercel account (or any static hosting)

## Backend Deployment

### Option 1: Railway

1. **Create Account**
   - Go to [Railway](https://railway.app)
   - Sign up with GitHub

2. **Create Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose `evanio-backend` directory

3. **Configure Environment Variables**
   ```
   PORT=5000
   NODE_ENV=production
   MONGODB_URI=your_mongodb_atlas_connection_string
   JWT_ACCESS_SECRET=your_jwt_access_secret_min_32_chars
   JWT_REFRESH_SECRET=your_jwt_refresh_secret_min_32_chars
   FRONTEND_URL=https://evanio.com
   STRIPE_SECRET_KEY=sk_live_your_stripe_secret_key
   RESEND_API_KEY=re_your_resend_api_key
   ```

4. **Deploy**
   - Railway automatically detects Node.js
   - Sets build command: `npm install`
   - Sets start command: `npm start`
   - Deploy!

5. **Get Backend URL** ✅
   
   After successful deployment:
   
   **Option A: From Railway Dashboard**
   1. Go to your Railway project dashboard
   2. Click on your deployed service
   3. Look for the "Domains" section or "Settings" tab
   4. You'll see your backend URL, for example:
      ```
      https://evanio-backend-production.up.railway.app
      ```
   5. Copy this URL - you'll need it for the frontend!
   
   **Option B: From Service Settings**
   1. Click on your service in Railway
   2. Go to "Settings" tab
   3. Scroll down to "Domains" section
   4. Click "Generate Domain" if you don't have one
   5. Your backend URL will be shown there
   
   **Option C: From Deployments Log**
   1. Check your latest deployment log
   2. Railway shows the service URL in the deployment output
   
   **✅ Test Your Backend URL:**
   Open in browser or use curl:
   ```
   https://your-backend-url.up.railway.app/api/health
   ```
   Should return: `{"message": "Server is running", ...}`
   
   **📝 Save this URL** - You'll use it in the frontend configuration next!

### Option 2: Render

1. **Create Account**
   - Go to [Render](https://render.com)
   - Sign up with GitHub

2. **Create Web Service**
   - Click "New +" → "Web Service"
   - Connect your repository
   - Select `evanio-backend` directory

3. **Configure Settings**
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Environment:** Node

4. **Set Environment Variables**
   - Same as Railway above

5. **Deploy**
   - Click "Create Web Service"
   - Render will deploy automatically

6. **Get Backend URL** ✅
   
   After successful deployment:
   
   1. Go to your Render dashboard
   2. Click on your deployed service
   3. Look at the top of the service page
   4. You'll see your backend URL in the "URL" section, for example:
      ```
      https://evanio-backend.onrender.com
      ```
   5. Copy this URL - you'll need it for the frontend!
   
   **✅ Test Your Backend URL:**
   Open in browser or use curl:
   ```
   https://your-backend-url.onrender.com/api/health
   ```
   Should return: `{"message": "Server is running", ...}`
   
   **📝 Save this URL** - You'll use it in the frontend configuration next!

### Option 3: VPS (DigitalOcean, AWS EC2, etc.)

1. **SSH into Server**
   ```bash
   ssh user@your-server-ip
   ```

2. **Install Node.js**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

3. **Install MongoDB (or use MongoDB Atlas)**
   ```bash
   # Follow MongoDB installation guide
   # Or use MongoDB Atlas (recommended)
   ```

4. **Clone Repository**
   ```bash
   git clone https://github.com/yourusername/evanio.git
   cd evanio/evanio-backend
   ```

5. **Install Dependencies**
   ```bash
   npm install
   ```

6. **Create .env File**
   ```bash
   cp .env.example .env
   nano .env
   # Add all environment variables
   ```

7. **Install PM2**
   ```bash
   npm install -g pm2
   ```

8. **Start with PM2**
   ```bash
   pm2 start server.js --name evanio-backend
   pm2 save
   pm2 startup
   ```

9. **Configure Nginx (Reverse Proxy)**
   ```nginx
   server {
       listen 80;
       server_name api.evanio.com;

       location / {
           proxy_pass http://localhost:5000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

10. **Set up SSL with Let's Encrypt**
    ```bash
    sudo apt-get install certbot python3-certbot-nginx
    sudo certbot --nginx -d api.evanio.com
    ```

## Frontend Deployment

### Option 1: Vercel (Recommended)

1. **Create Account**
   - Go to [Vercel](https://vercel.com)
   - Sign up with GitHub

2. **Import Project**
   - Click "New Project"
   - Import your repository
   - Select `evanio-frontend` as root directory

3. **Configure Build Settings**
   - **Framework Preset:** Vite
   - **Root Directory:** evanio-frontend
   - **Build Command:** `npm run build`
   - **Output Directory:** dist
   - **Install Command:** `npm install`

4. **Set Environment Variables**
   ```
   VITE_API_URL=https://api.evanio.com/api
   VITE_UPLOADTHING_TOKEN=your_uploadthing_token
   VITE_STRIPE_PUBLISHABLE_KEY=pk_live_your_stripe_key
   ```

5. **Deploy**
   - Click "Deploy"
   - Vercel automatically deploys on every push to main branch

### Option 2: Netlify

1. **Create Account**
   - Go to [Netlify](https://netlify.com)
   - Sign up with GitHub

2. **New Site from Git**
   - Click "New site from Git"
   - Connect repository
   - Select `evanio-frontend` directory

3. **Build Settings**
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`

4. **Environment Variables**
   - Same as Vercel above

5. **Deploy**
   - Click "Deploy site"

### Option 3: Static Hosting (GitHub Pages, Cloudflare Pages, etc.)

1. **Build Locally**
   ```bash
   cd evanio-frontend
   npm install
   npm run build
   ```

2. **Upload dist/ folder**
   - Upload the `dist/` folder contents to your hosting provider
   - Ensure single-page app routing is configured

## Environment Variables

### ⚠️ Important: Setting Environment Variables in Containers

When deploying to containerized environments (Docker, Kubernetes, Railway, Render, etc.), you **MUST** set environment variables in your deployment configuration, not just in a `.env` file.

**The server will now show a clear error message if required environment variables are missing:**
```
❌ Missing required environment variables:
   - MONGODB_URI
💡 Please set these environment variables before starting the server.
   In containers (Docker, Kubernetes, etc.), set them in your deployment configuration.
```

### Setting Environment Variables by Platform:

#### Railway:
1. Go to your project dashboard
2. Click on "Variables" tab
3. Add each environment variable:
   - Key: `MONGODB_URI`
   - Value: `mongodb+srv://username:password@cluster.mongodb.net/dbname`

#### Render:
1. Go to your service dashboard
2. Click on "Environment" tab
3. Add each environment variable using "Add Environment Variable"

#### Docker:
Add to `docker-compose.yml`:
```yaml
services:
  backend:
    environment:
      - MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
      - JWT_ACCESS_SECRET=your_secret
      - JWT_REFRESH_SECRET=your_refresh_secret
```

Or use `-e` flag:
```bash
docker run -e MONGODB_URI="mongodb+srv://..." evanio-backend
```

#### Kubernetes:
Add to your deployment YAML:
```yaml
env:
  - name: MONGODB_URI
    value: "mongodb+srv://username:password@cluster.mongodb.net/dbname"
```

Or use Secrets:
```yaml
env:
  - name: MONGODB_URI
    valueFrom:
      secretKeyRef:
        name: evanio-secrets
        key: mongodb-uri
```

### Backend (.env)

```env
# Server
PORT=5000
NODE_ENV=production

# MongoDB
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/evanio?retryWrites=true&w=majority

# JWT
JWT_ACCESS_SECRET=your_jwt_access_secret_min_32_characters_long
JWT_REFRESH_SECRET=your_jwt_refresh_secret_min_32_characters_long
JWT_SECRET=your_super_secret_jwt_key_here

# Frontend URL (for CORS)
FRONTEND_URL=https://evanio.com

# Stripe
STRIPE_SECRET_KEY=sk_live_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# UploadThing (Optional)
UPLOADTHING_SECRET=sk_live_your_uploadthing_secret
UPLOADTHING_APP_ID=your_uploadthing_app_id

# Resend (Optional - for emails)
RESEND_API_KEY=re_your_resend_api_key
FROM_EMAIL=noreply@evanio.com
```

### Frontend (.env)

```env
# Backend API URL (REQUIRED) - Use your deployed backend URL
# Format: https://your-backend-url/api
VITE_API_URL=https://your-backend-url.up.railway.app/api

# Examples:
# Railway: VITE_API_URL=https://evanio-backend.up.railway.app/api
# Render: VITE_API_URL=https://evanio-backend.onrender.com/api
# Custom domain: VITE_API_URL=https://api.evanio.com/api

# UploadThing (Optional)
VITE_UPLOADTHING_TOKEN=your_uploadthing_token

# Stripe (Optional)
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_your_stripe_publishable_key
```

### 🔄 How to Use Your Backend URL in Frontend

**Step 1: Get Your Backend URL**
- Copy your backend URL from Railway/Render dashboard (see sections above)

**Step 2: Format the URL Correctly**
- Your backend URL should end with `/api`
- Example: If your backend URL is `https://evanio-backend.up.railway.app`
- Then use: `https://evanio-backend.up.railway.app/api`

**Step 3: Set in Frontend Environment**
- **For Vercel/Netlify:** Add as environment variable in dashboard:
  - Key: `VITE_API_URL`
  - Value: `https://your-backend-url.up.railway.app/api`

- **For local development:** Add to `evanio-frontend/.env`:
  ```env
  VITE_API_URL=https://your-backend-url.up.railway.app/api
  ```

**Step 4: Rebuild Frontend**
- After setting the environment variable, rebuild:
  ```bash
  cd evanio-frontend
  npm run build
  ```
- Or redeploy on Vercel/Netlify (they'll pick up the new env var)

## Post-Deployment

### 1. Test Backend ✅

**Get Your Backend URL First:**
- **Railway:** Check dashboard → Service → Settings → Domains
- **Render:** Check dashboard → Service → URL section

**Test the Health Endpoint:**
```bash
curl https://your-backend-url.up.railway.app/api/health
```

Or open in browser:
```
https://your-backend-url.up.railway.app/api/health
```

**Expected Response:**
```json
{
  "message": "Server is running",
  "timestamp": "2025-11-22T...",
  "uptime": 123.456
}
```

**✅ If you see this, your backend is working!**

### 2. Configure Frontend with Backend URL

**Step 1: Copy Your Backend URL**
- From Railway/Render dashboard
- Example: `https://evanio-backend.up.railway.app`

**Step 2: Set Frontend Environment Variable**

**For Vercel:**
1. Go to project dashboard → Settings → Environment Variables
2. Add: `VITE_API_URL` = `https://your-backend-url.up.railway.app/api`
3. Save and redeploy

**For Netlify:**
1. Go to Site settings → Environment variables
2. Add: `VITE_API_URL` = `https://your-backend-url.up.railway.app/api`
3. Save and redeploy

**For Local Development:**
Create `evanio-frontend/.env`:
```env
VITE_API_URL=https://your-backend-url.up.railway.app/api
```

### 3. Test Frontend

- Visit your frontend URL
- Open browser DevTools (F12) → Network tab
- Try logging in/registering
- Verify API calls are going to your backend URL
- Check browser console for errors

**✅ Success Indicators:**
- API calls show your backend URL in Network tab
- Login/Register works
- No CORS errors in console
- Data loads correctly

### 3. Create Admin User

SSH into backend server or use Railway/Render shell:

```bash
cd evanio-backend
npm run create-admin
```

### 4. Verify CORS

Ensure backend `FRONTEND_URL` matches your frontend URL exactly.

### 5. Set up Custom Domains

- **Backend:** `api.evanio.com` → Railway/Render URL
- **Frontend:** `evanio.com` → Vercel/Netlify URL

## Troubleshooting

### CORS Errors
- Ensure `FRONTEND_URL` in backend matches frontend URL exactly
- Include protocol (`https://`) and no trailing slash
- Check browser console for exact error

### 401 Unauthorized
- Check JWT secrets are set correctly
- Verify tokens are being sent in Authorization header
- Check token expiration

### Database Connection Errors
- Verify MongoDB URI is correct
- Check network access in MongoDB Atlas (add IP to whitelist)
- Ensure connection string includes database name

### Build Failures
- Check Node.js version (>= 18.0.0)
- Verify all environment variables are set
- Check build logs for specific errors

## Support

For issues, check:
1. Backend logs (Railway/Render dashboard)
2. Frontend build logs (Vercel/Netlify dashboard)
3. Browser console for frontend errors
4. Network tab for API call failures

