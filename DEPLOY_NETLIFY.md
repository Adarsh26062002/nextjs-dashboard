# Deploy to Netlify Guide

This guide will help you deploy your Next.js Pokemon Dashboard to Netlify.

## Prerequisites

1. ✅ A [Netlify account](https://app.netlify.com/signup) (free)
2. ✅ Your code pushed to GitHub, GitLab, or Bitbucket
3. ✅ Generate a production `NEXTAUTH_SECRET`

---

## Step 1: Prepare for Deployment

### Generate a Production Secret

Run this command and save the output:

```bash
openssl rand -base64 32
```

**Important:** Use a **different** secret for production than your local development!

---

## Step 2: Create `netlify.toml` Configuration

I'll create this file for you. This configures Netlify to properly build and deploy your Next.js app.

---

## Step 3: Push to GitHub

If you haven't already, push your code to GitHub:

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Next.js Pokemon Dashboard"

# Add your GitHub repository as remote
git remote add origin https://github.com/Adarsh26062002/nextjs-dashboard.git

# Push to GitHub
git push -u origin main
```

---

## Step 4: Deploy to Netlify

### Option A: Using Netlify Web UI (Recommended)

1. Go to [Netlify Dashboard](https://app.netlify.com/)
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose your Git provider (GitHub)
4. Select your repository: `Adarsh26062002/nextjs-dashboard`
5. Configure build settings:
   - **Build command:** `pnpm run build` (or `npm run build`)
   - **Publish directory:** `.next`
   - **Framework:** Next.js (should auto-detect)

6. **Add Environment Variables** (click "Advanced build settings" or add after deployment):
   ```
   NEXTAUTH_URL=https://your-site-name.netlify.app
   NEXTAUTH_SECRET=your-production-secret-from-step-1
   NEXT_PUBLIC_POKEMON_LIST_API_BASE_URL=https://your-site-name.netlify.app/api/
   ```

7. Click **"Deploy site"**

### Option B: Using Netlify CLI

```bash
# Install Netlify CLI globally
npm install -g netlify-cli

# Login to Netlify
netlify login

# Initialize and deploy
netlify init

# Follow the prompts:
# - Create & configure a new site
# - Choose your team
# - Site name: nextjs-pokemon-dashboard (or your choice)
# - Build command: pnpm run build
# - Publish directory: .next

# Set environment variables
netlify env:set NEXTAUTH_URL "https://your-site-name.netlify.app"
netlify env:set NEXTAUTH_SECRET "your-production-secret"
netlify env:set NEXT_PUBLIC_POKEMON_LIST_API_BASE_URL "https://your-site-name.netlify.app/api/"

# Deploy
netlify deploy --prod
```

---

## Step 5: Update Environment Variables

After your first deployment, you'll get your site URL (e.g., `https://your-site-name.netlify.app`).

### Update the environment variables:

1. Go to **Site settings** → **Environment variables**
2. Update these variables with your **actual site URL**:
   - `NEXTAUTH_URL`: `https://your-actual-site-name.netlify.app`
   - `NEXT_PUBLIC_POKEMON_LIST_API_BASE_URL`: `https://your-actual-site-name.netlify.app/api/`

3. **Redeploy** to pick up the changes:
   - Go to **Deploys** → **Trigger deploy** → **Deploy site**

---

## Step 6: Verify Deployment

Once deployed, test your site:

1. ✅ Visit `https://your-site-name.netlify.app`
2. ✅ Login with Username: `Username`, Password: `Password`
3. ✅ Navigate to `/pokemons` and verify data loads
4. ✅ Test language switching
5. ✅ Test theme switching (light/dark)

---

## Important Notes

### ⚠️ Netlify vs Vercel for Next.js

**Recommendation:** While Netlify works, **Vercel** is optimized for Next.js and provides:
- Better Next.js API routes support
- Automatic Edge Network optimization
- Better build performance
- Zero-config deployment

If you encounter any issues with Netlify, consider deploying to Vercel instead (see `DEPLOY_VERCEL.md`).

### 🔒 Security Notes

1. **Never commit `.env.local`** - It's already in `.gitignore`
2. **Use different secrets** for development and production
3. **Update authentication** - Replace hardcoded credentials in `src/app/api/auth/option.ts` with real authentication

### 📦 Build Issues

If build fails, check:

1. **Node.js version**: Netlify uses Node 18 by default. To specify:
   - Add to `netlify.toml`:
     ```toml
     [build.environment]
       NODE_VERSION = "18"
     ```

2. **Package manager**: If using `pnpm`, Netlify might need configuration:
   ```toml
   [build.environment]
     NPM_FLAGS = "--version"  # This enables pnpm
   ```

3. **Dependencies**: Make sure `pnpm-lock.yaml` is committed

---

## Custom Domain (Optional)

### Add Your Own Domain:

1. Go to **Site settings** → **Domain management**
2. Click **"Add custom domain"**
3. Enter your domain (e.g., `pokemon.yourdomain.com`)
4. Follow DNS configuration instructions
5. Update `NEXTAUTH_URL` environment variable to your custom domain
6. Redeploy

---

## Continuous Deployment

Netlify automatically deploys when you push to GitHub:

```bash
# Make changes
git add .
git commit -m "Update Pokemon data"
git push

# Netlify will automatically rebuild and redeploy! 🚀
```

---

## Troubleshooting

### "Failed to compile" error

**Solution:** Check the build logs in Netlify dashboard. Common issues:
- Missing environment variables
- Node version mismatch
- Dependency installation issues

### Pokemon data not loading

**Solution:** Verify environment variables:
- `NEXT_PUBLIC_POKEMON_LIST_API_BASE_URL` must include `https://` and `/api/`
- Must match your actual Netlify site URL
- Redeploy after changing environment variables

### Authentication not working

**Solution:**
- Verify `NEXTAUTH_URL` matches your site URL exactly (no trailing slash)
- Verify `NEXTAUTH_SECRET` is set correctly
- Check browser console for errors

### API routes returning 404

**Solution:** This usually means Next.js isn't properly configured on Netlify
- Verify `netlify.toml` is in the root directory
- Ensure Next.js plugin is installed (should be automatic)
- Check Netlify build logs for errors

---

## Monitoring & Analytics

Enable Netlify Analytics (optional):
1. Go to **Site settings** → **Analytics**
2. Enable analytics to track visitors, page views, etc.

Or use the built-in Google Analytics by setting:
```
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_VERCEL_ANALYTICS=false
```

---

## Need Help?

- [Netlify Next.js Documentation](https://docs.netlify.com/frameworks/next-js/overview/)
- [Netlify Support](https://www.netlify.com/support/)
- [Next.js Deployment Documentation](https://nextjs.org/docs/deployment)

Happy deploying! 🎉

