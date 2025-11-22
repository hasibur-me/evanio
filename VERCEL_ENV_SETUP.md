# ⚠️ URGENT: Fix Vercel API URL Configuration

## Current Problem

Your console shows:
```
API URL configured: /api
```

This means `VITE_API_URL` is **NOT SET** in Vercel, so the frontend is calling:
- ❌ `https://evanio.vercel.app/api/auth/register` (WRONG - doesn't exist)

Instead of:
- ✅ `https://evanio.up.railway.app/api/auth/register` (CORRECT - your backend)

## ✅ Step-by-Step Fix (5 minutes)

### Step 1: Go to Vercel Dashboard

1. Open: https://vercel.com/dashboard
2. Click on your **evanio** project (the one showing https://evanio.vercel.app/)

### Step 2: Add Environment Variable

1. Click **Settings** (top navigation bar)
2. Click **Environment Variables** (left sidebar)
3. Click **Add New** button (top right)

### Step 3: Configure the Variable

Enter exactly:
- **Key:** `VITE_API_URL`
- **Value:** `https://evanio.up.railway.app/api`
- **Environment:** Select **ALL THREE**:
  - ✅ Production
  - ✅ Preview  
  - ✅ Development

4. Click **Save**

### Step 4: CRITICAL - Redeploy

**⚠️ IMPORTANT:** You MUST redeploy after setting the variable!

1. Click **Deployments** tab (top navigation)
2. Find your latest deployment
3. Click the **"..."** (three dots) menu on the right
4. Click **Redeploy**
5. **UNCHECK** "Use existing Build Cache" (very important!)
6. Click **Redeploy** button

### Step 5: Wait for Deployment

- Wait for the deployment to complete (usually 1-2 minutes)
- You'll see a green checkmark when it's done

### Step 6: Verify It Works

1. Visit: https://evanio.vercel.app/
2. Hard refresh: **Ctrl+Shift+R** (Windows) or **Cmd+Shift+R** (Mac)
3. Open DevTools (F12) → **Console** tab
4. Look for: `API URL configured: https://evanio.up.railway.app/api` ✅
5. Try to register/login - should work now!

## Why This Is Required

Vite environment variables are embedded **at build time**, not runtime. This means:

- ❌ Setting the variable AFTER building doesn't help
- ❌ The old build still has the wrong API URL
- ✅ You MUST rebuild (redeploy) after setting the variable

## Quick Checklist

- [ ] `VITE_API_URL` added in Vercel Settings → Environment Variables
- [ ] Value is exactly: `https://evanio.up.railway.app/api`
- [ ] All environments selected (Production, Preview, Development)
- [ ] Redeployed with **Build Cache DISABLED**
- [ ] Console shows correct API URL after refresh
- [ ] API calls go to Railway backend (check Network tab)

---

**After redeploying with the environment variable set, your frontend will connect to Railway!** ✅

