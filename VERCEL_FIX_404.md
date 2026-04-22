# Fix Vercel 404 Error

## What Was Fixed

1. **vercel.json** - Changed to point to `src/server.ts` instead of `dist/server.js`
2. **package.json** - Moved TypeScript and types to dependencies
3. **server.ts** - Simplified for serverless deployment

## Deploy the Fix

### Step 1: Commit Changes
```bash
git add .
git commit -m "Fix Vercel deployment configuration"
git push
```

### Step 2: Vercel Will Auto-Deploy
Vercel will automatically detect the push and redeploy.

### Step 3: Wait 1-2 Minutes
Check your Vercel dashboard for deployment status.

### Step 4: Test
```bash
curl https://your-project.vercel.app/api/v1/vehicles
```

## Alternative: Manual Redeploy

If auto-deploy doesn't work:

1. Go to Vercel Dashboard
2. Click on your project
3. Go to "Deployments" tab
4. Click "..." on latest deployment
5. Click "Redeploy"

## Verify Environment Variables

Make sure these are set in Vercel:

```
DATABASE_URL = postgresql://...
JWT_SECRET = your_secret_key
JWT_EXPIRES_IN = 7d
NODE_ENV = production
```

## Still Getting 404?

### Check Vercel Build Logs

1. Go to Vercel Dashboard
2. Click on your project
3. Click on latest deployment
4. Check "Building" tab for errors

### Common Issues

**Issue: TypeScript compilation error**
- Check build logs for syntax errors
- Ensure all imports are correct

**Issue: Missing dependencies**
- Run `npm install` locally
- Commit `package-lock.json`
- Push again

**Issue: Database connection error**
- Verify DATABASE_URL in Vercel settings
- Ensure database allows external connections
- Add `?sslmode=require` to connection string

## Test Endpoints After Fix

```bash
# Set your Vercel URL
export API_URL=https://your-project.vercel.app

# Test public endpoint
curl $API_URL/api/v1/vehicles

# Should return:
# {"success":true,"message":"No vehicles found","data":[]}

# Register user
curl -X POST $API_URL/api/v1/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "test123",
    "phone": "01712345678",
    "role": "customer"
  }'
```

## Need More Help?

Check Vercel function logs:
1. Vercel Dashboard → Your Project
2. Click "Functions" tab
3. View real-time logs
