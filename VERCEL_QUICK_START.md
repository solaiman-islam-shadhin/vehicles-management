# Quick Vercel Deployment Checklist

## ⚡ Fast Track (5 Minutes)

### 1. Database Setup (2 minutes)
- [ ] Go to [neon.tech](https://neon.tech)
- [ ] Sign up (free)
- [ ] Create new project
- [ ] Copy connection string

### 2. GitHub Setup (1 minute)
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/vehicle-rental.git
git push -u origin main
```

### 3. Vercel Deployment (2 minutes)
- [ ] Go to [vercel.com](https://vercel.com)
- [ ] Click "Add New" → "Project"
- [ ] Import your GitHub repo
- [ ] Add environment variables:
  ```
  DATABASE_URL = your_neon_connection_string
  JWT_SECRET = your_random_secret_key_min_32_chars
  JWT_EXPIRES_IN = 7d
  NODE_ENV = production
  ```
- [ ] Click "Deploy"

### 4. Test (30 seconds)
```bash
curl https://your-project.vercel.app/api/v1/vehicles
```

---

## 📋 Environment Variables

Copy these to Vercel:

```
DATABASE_URL=postgresql://user:pass@host.neon.tech/dbname?sslmode=require
JWT_SECRET=your_super_secret_jwt_key_make_it_long_and_random_at_least_32_characters
JWT_EXPIRES_IN=7d
NODE_ENV=production
```

**Generate JWT_SECRET:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## ✅ Post-Deployment

1. **Update README.md** with your Vercel URL
2. **Test signup endpoint**:
   ```bash
   curl -X POST https://your-project.vercel.app/api/v1/auth/signup \
     -H "Content-Type: application/json" \
     -d '{"name":"Admin","email":"admin@test.com","password":"admin123","phone":"01712345678","role":"admin"}'
   ```
3. **Create sample data** using API_TESTING.md examples

---

## 🔧 Troubleshooting

**Database connection error?**
- Ensure connection string includes `?sslmode=require`
- Check Neon project is active
- Verify DATABASE_URL in Vercel settings

**Module not found?**
- Commit `package-lock.json`
- Redeploy from Vercel dashboard

**Function timeout?**
- Check database connection
- Verify environment variables
- Check Vercel function logs

---

## 📱 Vercel Dashboard

Access at: [vercel.com/dashboard](https://vercel.com/dashboard)

- **Deployments**: View deployment history
- **Functions**: Check serverless function logs
- **Settings**: Manage environment variables
- **Domains**: Add custom domain (optional)

---

## 🎯 Final Submission

```
GitHub Repo: https://github.com/yourusername/vehicle-rental
Live Deployment: https://your-project.vercel.app
```

---

**That's it! Your API is live on Vercel! 🚀**

For detailed instructions, see [VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md)
