# Frontend Environment Setup Guide

## ✅ Your Backend URL

**Backend URL:** `https://evanio.up.railway.app`

## Step 1: Set Local Environment Variable

### Option A: Create .env File Manually

1. Navigate to `evanio-frontend` directory
2. Create a new file named `.env`
3. Add the following content:

```env
VITE_API_URL=https://evanio.up.railway.app/api
```

**Important:** Make sure the URL ends with `/api`

### Option B: Use Command Line (PowerShell)

```powershell
cd evanio-frontend
echo "VITE_API_URL=https://evanio.up.railway.app/api" | Out-File -FilePath .env -Encoding utf8
```

### Option C: Use Command Line (Git Bash / Terminal)

```bash
cd evanio-frontend
echo "VITE_API_URL=https://evanio.up.railway.app/api" > .env
```

## Step 2: Verify the .env File

Your `.env` file should contain:

```
VITE_API_URL=https://evanio.up.railway.app/api
```

## Step 3: Restart Development Server

If your frontend dev server is running:
1. Stop it (Ctrl+C)
2. Restart it:
   ```bash
   npm run dev
   ```

The frontend will now use your Railway backend!

## Step 4: Test the Connection

1. Open your frontend: `http://localhost:5173`
2. Open Browser DevTools (F12) → Console tab
3. You should see: `API URL configured: https://evanio.up.railway.app/api`
4. Try to register/login - API calls should go to your Railway backend

## Step 5: Set for Production (Vercel/Netlify)

### For Vercel:

1. Go to your Vercel project dashboard
2. Click **Settings** → **Environment Variables**
3. Add new variable:
   - **Key:** `VITE_API_URL`
   - **Value:** `https://evanio.up.railway.app/api`
   - **Environment:** Select all (Production, Preview, Development)
4. Click **Save**
5. Go to **Deployments** tab
6. Click **"..."** on latest deployment → **Redeploy**

### For Netlify:

1. Go to your Netlify site dashboard
2. Click **Site settings** → **Environment variables**
3. Click **Add variable**
4. Add:
   - **Key:** `VITE_API_URL`
   - **Value:** `https://evanio.up.railway.app/api`
   - **Scopes:** All scopes
5. Click **Save**
6. Go to **Deployments** tab
7. Click **Trigger deploy** → **Clear cache and deploy site**

## Step 6: Verify Backend is Working

Test your backend health endpoint:

Open in browser:
```
https://evanio.up.railway.app/api/health
```

Expected response:
```json
{
  "message": "Server is running",
  "timestamp": "2025-11-22T...",
  "uptime": 123.456
}
```

## Troubleshooting

### Issue: API calls still going to localhost

**Solution:**
1. Make sure `.env` file is in `evanio-frontend` directory (not root)
2. Restart the dev server after creating/modifying `.env`
3. Check browser console for: `API URL configured: https://evanio.up.railway.app/api`

### Issue: CORS errors

**Solution:**
1. Make sure your backend has `FRONTEND_URL` environment variable set
2. For local dev, set in Railway:
   - `FRONTEND_URL=http://localhost:5173`
3. For production, set:
   - `FRONTEND_URL=https://your-frontend-domain.com`

### Issue: 404 errors on API calls

**Solution:**
1. Make sure URL ends with `/api`
2. Check that backend is actually running (test `/api/health`)
3. Verify the backend URL is correct in `.env`

---

✅ **Once you've set the environment variable, your frontend will connect to your Railway backend!**

