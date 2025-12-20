# Deployment Guide - Google Sheets Integration

## Setting Up Environment Variables for Production

The Google Sheets integration requires the `VITE_GOOGLE_APPS_SCRIPT_URL` environment variable to be set in your deployment platform.

### For Cloudflare Pages:

**IMPORTANT:** For Vite applications, environment variables need to be available at BUILD TIME, not runtime.

1. Go to your Cloudflare Dashboard: https://dash.cloudflare.com
2. Navigate to **Pages** → Select your project
3. Go to **Settings** → **Environment Variables** (or "Variables and Secrets")
4. Click **"+ Add"** button
5. Configure:
   - **Type**: Choose **"Variable"** (NOT "Secret") - Vite needs build-time access
   - **Name**: `VITE_GOOGLE_APPS_SCRIPT_URL`
   - **Value**: `https://script.google.com/macros/s/AKfycbxLcuFznQGhIFh7eiLDpV-xU4Lr_gP-n64IVYYphuNw9s0lDZBEjUlDe__3N7N4JRHQ9w/exec`
   - **Environment**: Select **Production** (and optionally Preview)
6. **CRITICAL**: After adding/changing, you MUST trigger a NEW BUILD:
   - Go to **Deployments** tab
   - Click **"Retry deployment"** on the latest deployment, OR
   - Push a new commit to trigger a new build
7. Verify: After deployment, check browser console - you should NOT see "⚠️ Using fallback URL" warning

**Alternative: Using Wrangler CLI**

If you prefer using the CLI:

```bash
npx wrangler pages project upload dist --project-name=YOUR_PROJECT_NAME
```

Or set environment variables via wrangler.toml (for Workers/Pages Functions).

### For Other Platforms:

#### Vercel:
1. Go to your project dashboard
2. Settings → Environment Variables
3. Add `VITE_GOOGLE_APPS_SCRIPT_URL` with your script URL
4. Redeploy

#### Netlify:
1. Go to Site settings → Environment variables
2. Add `VITE_GOOGLE_APPS_SCRIPT_URL` with your script URL
3. Redeploy

### Important Notes:

1. **After setting environment variables in Cloudflare Pages, you MUST trigger a new build** for the changes to take effect
2. The code includes a fallback URL (hardcoded), so it will work even without setting the env var, but setting it is recommended for better security and flexibility
3. Environment variables in Vite are embedded at build time, so changes require a rebuild

### Verifying It Works:

After deploying, check the browser console when submitting the form. You should see:
- "📤 Submitting to Google Sheets:" message
- "✅ Request sent to Google Sheets" confirmation
- If you see "⚠️ Using fallback Google Apps Script URL", the env var isn't set yet
