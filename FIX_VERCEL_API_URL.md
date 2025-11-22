# Fix: Frontend API URL Configuration

## ❌ Current Problem

The frontend is making API calls to:
- ❌ `https://evanio.vercel.app/api/auth/register` (WRONG - Vercel domain)

Instead of:
- ✅ `https://evanio.up.railway.app/api/auth/register` (CORRECT - Railway backend)

## ✅ Solution: Set Environment Variable in Vercel

### Step 1: Go to Vercel Dashboard

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click on your **evanio** project
3. Click on **Settings** (in the top navigation)
4. Click on **Environment Variables** (in the left sidebar)

### Step 2: Add Environment Variable

1. Click **Add New** button
2. Fill in:
   - **Key:** `VITE_API_URL`
   - **Value:** `https://evanio.up.railway.app/api`
   - **Environment:** Select **ALL** (Production, Preview, Development)
3. Click **Save**

### Step 3: Redeploy

**IMPORTANT:** After adding the environment variable, you MUST redeploy:

1. Go to **Deployments** tab
2. Find your latest deployment
3. Click the **"..."** (three dots) menu
4. Click **Redeploy**
5. Make sure **"Use existing Build Cache"** is **UNCHECKED** (to rebuild with new env var)
6. Click **Redeploy**

### Step 4: Verify

After redeployment:

1. Visit: https://evanio.vercel.app/
2. Open Browser DevTools (F12) → **Console** tab
3. You should see: `API URL configured: https://evanio.up.railway.app/api`
4. Try to register/login
5. Check **Network** tab - API calls should go to Railway backend

## Why This Happens

Vite environment variables (prefixed with `VITE_`) are embedded at **build time**, not runtime. This means:

- ❌ If you set the env var AFTER building, it won't work
- ✅ You must set it BEFORE building, or redeploy after setting it

## Quick Checklist

- [ ] `VITE_API_URL` is set in Vercel
- [ ] Value is: `https://evanio.up.railway.app/api`
- [ ] All environments are selected (Production, Preview, Development)
- [ ] Frontend has been redeployed after setting the variable
- [ ] Browser console shows correct API URL
- [ ] API calls go to Railway backend (check Network tab)

---

**After setting the environment variable and redeploying, your frontend will connect to your Railway backend!** ✅

