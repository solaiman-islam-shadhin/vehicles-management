# Vercel Deployment Guide

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **PostgreSQL Database**: You need a hosted PostgreSQL database
   - Recommended: [Neon](https://neon.tech) (Free tier available)
   - Alternative: [Supabase](https://supabase.com), [Railway](https://railway.app), [ElephantSQL](https://www.elephantsql.com)

---

## Step 1: Set Up PostgreSQL Database

### Option A: Neon (Recommended for Vercel)

1. Go to [neon.tech](https://neon.tech)
2. Sign up and create a new project
3. Copy the connection string (looks like):
   ```
   postgresql://username:password@ep-xxx.region.aws.neon.tech/dbname?sslmode=require
   ```

### Option B: Supabase

1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Go to Settings → Database
4. Copy the connection string (URI format)

### Option C: Railway

1. Go to [railway.app](https://railway.app)
2. Create a new project
3. Add PostgreSQL service
4. Copy the connection string from Variables tab

---

## Step 2: Prepare Your Project

### 1. Build the project locally to verify
```bash
npm install
npm run build
```

### 2. Commit all changes to Git
```bash
git init
git add .
git commit -m "Initial commit"
```

### 3. Push to GitHub
```bash
# Create a new repository on GitHub first, then:
git remote add origin https://github.com/yourusername/your-repo.git
git branch -M main
git push -u origin main
```

---

## Step 3: Deploy to Vercel

### Method 1: Vercel Dashboard (Recommended)

1. **Go to [vercel.com](https://vercel.com) and login**

2. **Click "Add New" → "Project"**

3. **Import your GitHub repository**
   - Select your repository
   - Click "Import"

4. **Configure Project**
   - Framework Preset: **Other**
   - Root Directory: `./`
   - Build Command: `npm run vercel-build`
   - Output Directory: `dist`
   - Install Command: `npm install`

5. **Add Environment Variables**
   Click "Environment Variables" and add:
   
   ```
   DATABASE_URL = postgresql://your-connection-string
   JWT_SECRET = your_jwt_secret_key_here_make_it_long_and_random
   JWT_EXPIRES_IN = 7d
   NODE_ENV = production
   ```

6. **Click "Deploy"**

7. **Wait for deployment** (usually 1-2 minutes)

8. **Your API will be live at**: `https://your-project.vercel.app`

---

### Method 2: Vercel CLI

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Login to Vercel**
```bash
vercel login
```

3. **Deploy**
```bash
vercel
```

4. **Follow the prompts**:
   - Set up and deploy? **Y**
   - Which scope? Select your account
   - Link to existing project? **N**
   - What's your project's name? Enter name
   - In which directory is your code located? **.**
   - Want to override settings? **N**

5. **Add environment variables**
```bash
vercel env add DATABASE_URL
vercel env add JWT_SECRET
vercel env add JWT_EXPIRES_IN
vercel env add NODE_ENV
```

6. **Deploy to production**
```bash
vercel --prod
```

---

## Step 4: Verify Deployment

### Test your API endpoints:

1. **Health Check** (if you add one)
```bash
curl https://your-project.vercel.app/api/v1/vehicles
```

2. **Register a user**
```bash
curl -X POST https://your-project.vercel.app/api/v1/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "test123",
    "phone": "01712345678",
    "role": "customer"
  }'
```

3. **Login**
```bash
curl -X POST https://your-project.vercel.app/api/v1/auth/signin \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "test123"
  }'
```

---

## Step 5: Update README.md

Update your README.md with the live URL:

```markdown
## 🌐 Live URL

**Live Deployment:** https://your-project.vercel.app

**GitHub Repository:** https://github.com/yourusername/your-repo
```

---

## Important Notes for Vercel

### 1. Serverless Functions
- Vercel uses serverless functions
- Each request is handled independently
- Database connections are pooled

### 2. Cold Starts
- First request after inactivity may be slower
- Subsequent requests are fast

### 3. Environment Variables
- Set all environment variables in Vercel dashboard
- Never commit `.env` file to Git

### 4. Database Connection
- Use connection pooling (already implemented with `pg.Pool`)
- Ensure your database allows external connections
- Use SSL connection for security

### 5. Logs
- View logs in Vercel dashboard under "Deployments" → "Functions"
- Use `console.log()` for debugging

---

## Troubleshooting

### Issue: "Cannot connect to database"
**Solution**: 
- Verify DATABASE_URL is correct in Vercel environment variables
- Ensure database allows connections from Vercel IPs
- Check if SSL is required (add `?sslmode=require` to connection string)

### Issue: "Module not found"
**Solution**:
- Run `npm install` locally
- Commit `package-lock.json`
- Redeploy

### Issue: "Function timeout"
**Solution**:
- Vercel free tier has 10s timeout
- Optimize database queries
- Consider upgrading Vercel plan

### Issue: "Environment variables not working"
**Solution**:
- Redeploy after adding environment variables
- Check variable names match exactly
- Ensure no extra spaces in values

---

## Vercel Configuration Files

Your project now includes:

1. **vercel.json** - Vercel deployment configuration
2. **Updated package.json** - Added `vercel-build` script
3. **Updated server.ts** - Exports app for serverless

---

## Database Hosting Recommendations

### For Vercel Deployment:

1. **Neon** (Best for Vercel)
   - Free tier: 0.5 GB storage
   - Serverless PostgreSQL
   - Auto-scaling
   - [neon.tech](https://neon.tech)

2. **Supabase**
   - Free tier: 500 MB storage
   - Includes auth and storage
   - [supabase.com](https://supabase.com)

3. **Railway**
   - Free tier: $5 credit/month
   - Easy setup
   - [railway.app](https://railway.app)

---

## Cost

- **Vercel**: Free tier includes:
  - 100 GB bandwidth/month
  - Unlimited deployments
  - Serverless functions

- **Database**: 
  - Neon: Free tier available
  - Supabase: Free tier available
  - Railway: $5 credit/month

**Total Cost**: $0 for small projects!

---

## Next Steps After Deployment

1. ✅ Test all API endpoints
2. ✅ Update README.md with live URL
3. ✅ Create admin user
4. ✅ Add sample vehicles
5. ✅ Test booking flow
6. ✅ Submit assignment with:
   - GitHub repository URL
   - Vercel deployment URL

---

## Useful Commands

```bash
# View deployment logs
vercel logs

# List deployments
vercel ls

# Remove deployment
vercel rm your-project

# Pull environment variables
vercel env pull

# Redeploy
vercel --prod
```

---

## Support

- Vercel Docs: [vercel.com/docs](https://vercel.com/docs)
- Vercel Discord: [vercel.com/discord](https://vercel.com/discord)
- Neon Docs: [neon.tech/docs](https://neon.tech/docs)

---

**Your Vehicle Rental System is now ready for Vercel deployment! 🚀**
