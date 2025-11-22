# Deployment Status

## ✅ Deployment Complete!

### Frontend URL
**Production:** https://evanio.vercel.app/

### Backend URL
**Production:** https://evanio.up.railway.app

### Environment Variables

#### Frontend (Vercel) ⚠️ REQUIRED - Fix 404 Errors

**Current Issue:** Frontend is calling `https://evanio.vercel.app/api` instead of Railway backend.

**Fix Required:** Set environment variable in Vercel and redeploy.

```
VITE_API_URL=https://evanio.up.railway.app/api
```

**Step-by-Step:**

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click on your **evanio** project
3. Click **Settings** → **Environment Variables**
4. Click **Add New**
5. Enter:
   - **Key:** `VITE_API_URL`
   - **Value:** `https://evanio.up.railway.app/api`
   - **Environment:** Select **ALL** (Production, Preview, Development)
6. Click **Save**

**⚠️ CRITICAL: Redeploy After Setting Variable**

7. Go to **Deployments** tab
8. Click **"..."** on latest deployment → **Redeploy**
9. **UNCHECK** "Use existing Build Cache" (important!)
10. Click **Redeploy**

**Why Redeploy?** Vite embeds environment variables at build time, so you must rebuild after setting the variable.

#### Backend (Railway)
Make sure these are set in Railway dashboard:

```
MONGODB_URI=your_mongodb_connection_string
JWT_ACCESS_SECRET=your_jwt_access_secret
JWT_REFRESH_SECRET=your_jwt_refresh_secret
FRONTEND_URL=https://evanio.vercel.app
NODE_ENV=production
PORT=5000
```

### Quick Tests

1. **Frontend:** Visit https://evanio.vercel.app/
   - Should load without errors
   - Check browser console (F12) for any errors

2. **Backend Health:** https://evanio.up.railway.app/api/health
   - Should return: `{"message": "Server is running", ...}`

3. **API Connection:**
   - Open frontend: https://evanio.vercel.app/
   - Open browser DevTools (F12) → Console
   - Should see: `API URL configured: https://evanio.up.railway.app/api`
   - Try to register/login
   - Check Network tab - API calls should go to Railway backend

### Troubleshooting

**Issue: API calls failing**
- Check if `VITE_API_URL` is set correctly in Vercel
- Verify the backend URL is correct: `https://evanio.up.railway.app/api`
- Check browser console for CORS errors
- Make sure backend `FRONTEND_URL` includes `https://evanio.vercel.app`

**Issue: CORS errors**
- In Railway, set `FRONTEND_URL=https://evanio.vercel.app`
- Restart the backend service after changing environment variables

**Issue: 404 errors on API calls**
- Verify backend is running: https://evanio.up.railway.app/api/health
- Check that URL ends with `/api` in `VITE_API_URL`

---

✅ **Your application is now live!**
- Frontend: https://evanio.vercel.app/
- Backend: https://evanio.up.railway.app

